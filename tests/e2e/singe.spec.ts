import { type Page } from '@playwright/test'
import { expect, test } from './position'
import { TUILE_OSM } from './reseau'

/**
 * S286 (repris de Sentiers, `monkey.spec.ts`, et d'ÉtapeForge,
 * `scripts/monkey.js`) : un singe touche au hasard ce qui est visible et
 * actif. Hors de la porte (lent, aléatoire) : il ne tourne que si
 * `SINGE=1`.
 *
 *   SINGE=1 SINGE_GRAINE=7 SINGE_GESTES=300 PW_CHROMIUM_PATH=/opt/pw-browsers/chromium \
 *     npx playwright test tests/e2e/singe.spec.ts
 *
 * Une graine donne toujours la même suite de gestes : un échec se rejoue.
 * Rien ne part hors du site : les tuiles sont coupées, un autre hôte fait
 * échouer le passage ; les liens sortants ne sont pas suivis.
 */
const ACTIF = process.env['SINGE'] === '1'
const GRAINE = Number(process.env['SINGE_GRAINE'] ?? '1')
const GESTES = Number(process.env['SINGE_GESTES'] ?? '200')

/** mulberry32 : rejouable. */
function hasard(graine: number) {
  let a = graine >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Ce qu'on peut toucher : visible, actif, et qui ne quitte pas le site (les
 * liens vers un autre site, ou dans un nouvel onglet, ne sont pas suivis ;
 * le sélecteur de fichier non plus).
 */
const CIBLES = [
  'button:not([disabled])',
  'a[href^="#"]',
  'summary',
  'input[type="checkbox"]:not([disabled])',
  'input[type="radio"]:not([disabled])',
  'input[type="range"]:not([disabled])',
  'input[type="search"], input[type="text"]',
  'select:not([disabled])',
].join(', ')

const MOTS = ['lyon', 'a', 'brasserie', 'zz', '', 'é', 'Caen', '69', '🍺']

async function unPassage(page: Page, graine: number, gestes: number) {
  const tirer = hasard(graine)
  const journal: string[] = []
  const erreurs: string[] = []
  const ailleurs: string[] = []
  const site = new URL(page.url() === 'about:blank' ? 'http://localhost:4173/' : page.url()).origin
  page.on('pageerror', (e) => erreurs.push(`pageerror : ${e.message}`))
  page.on('console', (m) => {
    if (m.type() === 'error') erreurs.push(`console : ${m.text()}`)
  })
  await page.route('**/*', async (route) => {
    const url = route.request().url()
    if (url.startsWith(site) || url.startsWith('data:') || url.startsWith('blob:')) return route.continue()
    if (!TUILE_OSM.test(url)) ailleurs.push(url)
    return route.abort()
  })
  // Une erreur des tuiles coupées n'est pas une erreur de l'application.
  const ignorer = (e: string) => /net::ERR_FAILED|Failed to load resource/.test(e)
  await page.goto('/')
  await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()

  for (let i = 0; i < gestes; i++) {
    const cibles = page.locator(CIBLES).filter({ visible: true })
    const n = await cibles.count()
    if (n === 0) continue
    const k = Math.floor(tirer() * n)
    const cible = cibles.nth(k)
    const info = await cible.evaluate((e) => {
      const el = e as HTMLInputElement
      return {
        balise: el.tagName.toLowerCase(),
        type: el.type,
        nom: el.getAttribute('data-testid') ?? el.getAttribute('aria-label') ?? el.textContent.trim().slice(0, 30),
      }
    })
    const geste = `${String(i)} ${info.balise}${info.type ? `[${info.type}]` : ''} « ${info.nom} »`
    journal.push(geste)
    try {
      if (info.type === 'range') await cible.fill(String(5 * (1 + Math.floor(tirer() * 20))))
      else if (info.type === 'search' || info.type === 'text') await cible.fill(MOTS[Math.floor(tirer() * MOTS.length)])
      else if (info.balise === 'select') {
        const options = await cible.locator('option').count()
        await cible.selectOption({ index: Math.floor(tirer() * Math.max(1, options)) })
      } else await cible.click({ timeout: 2000 })
    } catch {
      // Recouvert ou disparu entre le compte et le geste : le singe passe.
      journal.push(`${String(i)} (manqué)`)
    }
    if (tirer() < 0.1) await page.mouse.wheel(0, (tirer() - 0.5) * 2000)
  }
  // La page répond encore.
  await expect(page.locator('body')).toBeVisible()
  return { journal, erreurs: erreurs.filter((e) => !ignorer(e)), ailleurs }
}

test.describe('le singe (S286)', () => {
  test.skip(!ACTIF, 'SINGE=1 pour lancer le singe (hors de la porte)')
  test.setTimeout(10 * 60_000)

  test(`graine ${String(GRAINE)}, ${String(GESTES)} gestes : aucune erreur, rien ne part`, async ({ page }) => {
    if (process.env['SINGE_ROUGE'] === '1') {
      // Vu rouge (§1) : une erreur jetée au premier bouton touché.
      await page.addInitScript(() => {
        document.addEventListener('click', (e) => {
          if ((e.target as Element | null)?.closest('button')) setTimeout(() => {
            throw new Error('erreur injectée par le singe')
          })
        })
      })
    }
    const { journal, erreurs, ailleurs } = await unPassage(page, GRAINE, GESTES)
    test.info().annotations.push({ type: 'gestes', description: journal.join('\n') })
    expect(erreurs, `graine ${String(GRAINE)}\n${journal.slice(-15).join('\n')}`).toEqual([])
    expect(ailleurs, `graine ${String(GRAINE)}`).toEqual([])
  })

  // La graine fixe les gestes choisis ; qu'un toucher manque sa cible (elle
  // bouge encore, une animation la couvre) dépend du temps : ces lignes-là
  // ne se comparent pas.
  test('même graine, mêmes gestes', async ({ browser }) => {
    const journaux: string[][] = []
    for (let i = 0; i < 2; i++) {
      const contexte = await browser.newContext()
      const page = await contexte.newPage()
      journaux.push((await unPassage(page, GRAINE, 25)).journal.filter((g) => !g.endsWith('(manqué)')))
      await contexte.close()
    }
    expect(journaux[1]).toEqual(journaux[0])
  })
})
