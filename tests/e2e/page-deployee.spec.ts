import { readFileSync } from 'node:fs'
import { POLITIQUE } from '../../build/csp'
import { expect, test } from './position'
import { absentsDuCache, promessePrecache } from './precache'

/**
 * La page réellement publiée, et non celle qu'on vient de construire.
 *
 * Repris de Sentiers. La suite locale prouve que `dist/` est juste ; elle ne
 * dit rien de ce que GitHub Pages sert. Entre les deux il y a l'artefact et le
 * cache. Cette sonde ne tourne que dans le workflow de déploiement, qui pose
 * `MOUSSE_URL` : Chromium ne sort pas du conteneur de développement (mesuré
 * sur Sentiers le 27/08). Sautée franchement sinon, plutôt que verte sans
 * avoir rien mesuré.
 *
 * Vue rouge en local le 15/10 : `MOUSSE_URL=http://localhost:4317/nexistepas/`
 * sert le repli 404 de `vite preview` — voir docs/SPRINTS.md, S1.
 */
const URL_PUBLIEE = process.env['MOUSSE_URL']

test.describe('la page publiée', () => {
  test.skip(!URL_PUBLIEE, 'MOUSSE_URL non défini : sonde de déploiement sautée')

  // S334 (revue globale du 19/10, C9) : la page servie est celle de ce
  // commit. Le job calcule l'empreinte de son propre build ; Pages et son
  // cache peuvent tarder, d'où une relecture pendant deux minutes.
  test('sert la version de ce commit', async ({ request }) => {
    const empreinte = process.env['MOUSSE_EMPREINTE'] ?? ''
    // En CI, une empreinte absente est une panne de la sonde, pas une raison de se taire.
    if (process.env['CI'] !== undefined) expect(empreinte, 'MOUSSE_EMPREINTE vide en CI').not.toBe('')
    test.skip(empreinte === '', 'MOUSSE_EMPREINTE non défini')
    await expect
      .poll(
        async () => {
          const r = await request.get(new URL(`sw.js?v=${String(Date.now())}`, URL_PUBLIEE).toString())
          return /const EMPREINTE = '([0-9a-f]+)'/.exec(await r.text())?.[1]
        },
        { timeout: 120_000, intervals: [5_000] },
      )
      .toBe(empreinte)
  })

  test('répond, monte, et ne perd aucun asset', async ({ page }) => {
    const origine = new URL(URL_PUBLIEE as string).origin
    const echecs: string[] = []
    page.on('response', (r) => {
      if (r.status() >= 400 && r.url().startsWith(origine)) {
        echecs.push(`${String(r.status())} ${r.url()}`)
      }
    })
    const erreurs: string[] = []
    page.on('pageerror', (e) => erreurs.push(e.message))

    const reponse = await page.goto(URL_PUBLIEE as string, { timeout: 30_000 })
    expect(reponse?.status(), 'la page publiée ne répond pas 200').toBe(200)
    await expect(
      page.getByRole('heading', { name: 'Mousse de Poche', level: 1 }),
    ).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('mention-alcool')).toBeVisible()
    // La carte ne se charge qu'à l'approche (S20) : la sonde y va, sinon son
    // chunk publié ne serait plus jamais demandé ici.
    await page.getByTestId('carte-en-attente').scrollIntoViewIfNeeded()
    await expect(
      page.locator('[data-testid="carte"], [data-testid="carte-absente"]'),
    ).toBeVisible({ timeout: 20_000 })
    expect(echecs, `requêtes en échec : ${echecs.join(' | ')}`).toEqual([])
    expect(erreurs, `erreurs JavaScript : ${erreurs.join(' | ')}`).toEqual([])
  })

  // S241 : le parcours, sur la page servie par Pages. Une fiche qui a une
  // source, choisie dans les données : « fiche-source » est rendu même sans
  // source (« Aucune source lue… », 58 fiches sur 166), et la première ligne
  // pouvait en être une (revue adverse S241).
  test('une fiche s’ouvre, avec sa source et « Y aller »', async ({ page }) => {
    const avecSource = (JSON.parse(readFileSync('data/breweries.json', 'utf8')) as { n: string; src?: string }[]).find(
      (b) => b.src !== undefined && b.src !== '',
    )
    expect(avecSource, 'une fiche avec source dans les données').toBeDefined()
    const { n, src } = avecSource as { n: string; src: string }
    await page.goto(URL_PUBLIEE as string, { timeout: 30_000 })
    await page.getByTestId('recherche').fill(n)
    const ligne = page.locator(`button.ligne[data-nom="${n}"]`)
    await expect(ligne).toBeVisible({ timeout: 20_000 })
    await ligne.click()
    await expect(ligne).toHaveAttribute('aria-expanded', 'true')
    const fiche = page.getByTestId('fiche')
    await expect(fiche.getByTestId('fiche-source').getByRole('link')).toHaveAttribute('href', src)
    await expect(fiche.getByTestId('fiche-y-aller')).toBeVisible()
  })

  // S241 : la CSP servie est celle qu'on teste en local (securite.spec.ts).
  test('la politique de sécurité publiée est celle du build', async ({ page }) => {
    await page.goto(URL_PUBLIEE as string, { timeout: 30_000 })
    const publiee = await page
      .locator('meta[http-equiv="Content-Security-Policy"]')
      .getAttribute('content')
    expect(publiee).toBe(POLITIQUE)
  })
})

// S241 : hors ligne publié. Le service worker est permis ici seulement ; on
// interroge le cache lui-même (setOffline ne le touche pas, CLAUDE.md §1).
test.describe('la page publiée, hors ligne', () => {
  test.skip(!URL_PUBLIEE, 'MOUSSE_URL non défini : sonde de déploiement sautée')
  test.use({ serviceWorkers: 'allow' })

  test('le service worker publié précache tout ce qu’il promet', async ({ page }) => {
    const sw = await page.request.get(new URL('sw.js', URL_PUBLIEE).href)
    expect(sw.status(), 'sw.js publié').toBe(200)
    const { fichiers, empreinte } = promessePrecache(await sw.text())
    expect(fichiers.length).toBeGreaterThan(8)
    expect(empreinte).toBeDefined()
    await page.goto(URL_PUBLIEE as string, { timeout: 30_000 })
    expect(await absentsDuCache(page, fichiers, empreinte ?? '')).toEqual([])
  })
})
