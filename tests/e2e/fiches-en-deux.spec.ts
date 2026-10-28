import { type Page } from '@playwright/test'
import { attendreGarde } from './garde'
import { expect, test } from './position'
import { ORDRE_CATEGORIES } from '../../src/core/categories'
import { ouvrirFiltres, sansTuiles } from './reseau'

/**
 * S294 : les fiches en deux temps. Celles d'Auvergne-Rhône-Alpes sont dans
 * le premier écran ; les autres arrivent juste après, dans un seul fichier,
 * le même pour tout le monde (AR3). « Brasserie An Alarc'h » (La Feuillée,
 * Finistère) est dans la suite.
 */
const SUITE = /\/assets\/breweries-[^/]+\.js$/
const BRETONNE = "Brasserie An Alarc'h"
const ligneBretonne = (page: Page) => page.locator('button.ligne', { hasText: BRETONNE })

/** La suite retenue jusqu'à ce que le test la libère. */
async function retenirLaSuite(page: Page): Promise<() => void> {
  let liberer: () => void = () => undefined
  const liberee = new Promise<void>((ok) => (liberer = ok))
  await page.route(SUITE, async (route) => {
    await liberee
    await route.continue()
  })
  return liberer
}

test('une fiche de la suite se trouve une fois la suite arrivée ; avant, le compte dit qu’elle arrive', async ({ page }) => {
  await sansTuiles(page)
  const liberer = await retenirLaSuite(page)
  await page.goto('/')
  await page.getByTestId('recherche').fill('an alarc')
  await expect(page.getByTestId('compte')).toHaveText('Chargement des fiches des autres régions…')
  await expect(page.getByTestId('compte')).not.toContainText('Aucune')
  await expect(ligneBretonne(page)).toHaveCount(0)
  liberer()
  await expect(ligneBretonne(page)).toHaveCount(1)
  await expect(page.getByTestId('compte')).toContainText('1 brasserie')
})

test('un lien partagé vers une fiche de la suite l’ouvre et l’amène à l’écran quand elle arrive', async ({ page }) => {
  await sansTuiles(page)
  // Retenue : la fiche arrive après le premier rendu, comme en 4G lente.
  const liberer = await retenirLaSuite(page)
  await page.goto(`/#fiche=${encodeURIComponent(BRETONNE)}`)
  await expect(page.getByTestId('compte')).toHaveText('Chargement des fiches des autres régions…')
  liberer()
  await expect(ligneBretonne(page)).toHaveAttribute('aria-expanded', 'true')
  // Peinte à l'écran, pas seulement ouverte (revue adverse S294, §1bis).
  await expect
    .poll(() =>
      ligneBretonne(page).evaluate((b) => {
        const r = b.getBoundingClientRect()
        const vu = document.elementFromPoint(r.left + 20, Math.max(r.top, 0) + 10)
        return r.top >= -1 && r.top < window.innerHeight && vu !== null && b.contains(vu)
      }),
    )
    .toBe(true)
})

test('sans la suite (hors ligne, sans cache), la liste de la région reste, et l’écran le dit', async ({ page }) => {
  await sansTuiles(page)
  await page.route(SUITE, (route) => route.abort())
  await page.goto('/')
  await expect(page.getByTestId('suite-absente')).toBeVisible()
  await expect(page.locator('button.ligne').first()).toBeVisible()
  await page.getByTestId('recherche').fill('an alarc')
  await expect(page.getByTestId('compte')).toContainText('Aucune brasserie')
})

test('un favori de la suite n’est pas dit disparu avant qu’elle arrive', async ({ page }) => {
  await sansTuiles(page)
  await page.goto('/')
  await page.getByTestId('recherche').fill('an alarc')
  await ligneBretonne(page).click()
  await page.getByTestId('bouton-favori').click()
  await attendreGarde(page, { favoris: [BRETONNE] })
  const liberer = await retenirLaSuite(page)
  await page.reload()
  await expect(page.locator('button.ligne').first()).toBeVisible()
  await expect(page.getByTestId('favoris-orphelins')).toHaveCount(0)
  liberer()
  await page.getByTestId('recherche').fill('an alarc')
  await expect(ligneBretonne(page)).toHaveCount(1)
  await expect(page.getByTestId('favoris-orphelins')).toHaveCount(0)
})

// Revue adverse S294 : « Chargement » ne doit pas masquer une cause qui ne
// dépend pas de la suite.
test('en attendant la suite, aucune catégorie cochée ou aucun favori se disent quand même', async ({ page }) => {
  await sansTuiles(page)
  const liberer = await retenirLaSuite(page)
  await page.goto('/?raccourci=favoris')
  await expect(page.getByTestId('compte')).toContainText('Vous n’avez pas encore de favori')
  await page.goto('/')
  await ouvrirFiltres(page)
  for (const cat of ORDRE_CATEGORIES) await page.getByTestId(`categorie-${String(cat)}`).uncheck()
  await expect(page.getByTestId('compte')).toContainText('Aucune catégorie n’est cochée')
  liberer()
})

// Revue adverse S294 : sans la suite, la tournée oubliait ses favoris sans le dire.
test('la tournée attend la suite : elle ne paraît qu’avec tous les favoris', async ({ page }) => {
  await sansTuiles(page)
  await page.goto('/')
  // Deux favoris de la région : sans la garde, une tournée de deux étapes
  // paraîtrait déjà, sans la bretonne (une seule n'en fait pas).
  const noms: string[] = []
  for (const i of [0, 1]) {
    const ligne = page.locator('button.ligne').nth(i)
    noms.push((await ligne.getAttribute('data-nom')) ?? '')
    await ligne.click()
    await page.getByTestId('bouton-favori').first().click()
  }
  await page.getByTestId('recherche').fill('an alarc')
  await ligneBretonne(page).click()
  await page.getByTestId('bouton-favori').first().click()
  await attendreGarde(page, { favoris: [...noms, BRETONNE] })
  const liberer = await retenirLaSuite(page)
  await page.reload()
  await expect(page.locator('button.ligne').first()).toBeVisible()
  await ouvrirFiltres(page)
  await expect(page.getByTestId('tournee')).toHaveCount(0)
  liberer()
  await expect(page.getByTestId('tournee')).toBeVisible()
  await expect(page.getByTestId('tournee')).toContainText(BRETONNE)
})

// Revue adverse S294 : un départ gardé à l'ancien format (S8 à S20 : la clé
// seule, sans coordonnées) dans le 71, déjà au fichier du 15/10, retombait
// sur Brignais, puis était écrasé.
test('un départ gardé à l’ancien format hors de la région est relu à l’arrivée de la suite', async ({ page }) => {
  await sansTuiles(page)
  await page.goto('/')
  await expect(page.locator('button.ligne').first()).toBeVisible()
  await page.evaluate(
    () =>
      new Promise<void>((ok, ko) => {
        const req = indexedDB.open('mousse-de-poche')
        req.onerror = () => {
          ko(new Error('ouverture'))
        }
        req.onsuccess = () => {
          const magasin = req.result.transaction('reglages', 'readwrite').objectStore('reglages')
          const lu = magasin.get('preferences')
          lu.onsuccess = () => {
            const garde = { ...(lu.result as Record<string, unknown>), depart: { type: 'commune', cle: 'Tournus|71' } }
            const ecrit = magasin.put(garde, 'preferences')
            ecrit.onsuccess = () => {
              ok()
            }
          }
        }
      }),
  )
  await attendreGarde(page, { depart: { type: 'commune', cle: 'Tournus|71' } })
  const liberer = await retenirLaSuite(page)
  await page.reload()
  await expect(page.locator('button.ligne').first()).toBeVisible()
  liberer()
  await expect(page.getByText(/Distance maximale depuis Tournus/)).toBeVisible()
})

/**
 * AR3 (`docs/ARCHITECTURE.md` §4) : avec « Autour de moi », les fichiers
 * demandés au site ne dépendent pas de la position. Deux positions loin
 * l'une de l'autre, dans deux contextes neufs : mêmes requêtes. L'ordre
 * d'arrivée de requêtes parallèles varie d'un essai à l'autre, même à
 * position égale : la liste est comparée triée, et la suite, elle, est
 * demandée sans condition (`App.tsx`).
 */
test('« Autour de moi » à Lyon et à Brest : les mêmes fichiers demandés au site', async ({ browser }) => {
  const requetesDepuis = async (latitude: number, longitude: number) => {
    const contexte = await browser.newContext({ geolocation: { latitude, longitude }, permissions: ['geolocation'] })
    const page = await contexte.newPage()
    await sansTuiles(page)
    const vues: string[] = []
    page.on('request', (r) => {
      const u = new URL(r.url())
      // Chemin et paramètres : une position glissée dans l'adresse se verrait.
      if (u.host === 'localhost:4317') vues.push(u.pathname + u.search)
    })
    await page.goto('/')
    await page.getByTestId('autour-de-moi').click()
    await expect(page.locator('button.ligne').first()).toBeVisible()
    await expect(page.getByTestId('compte')).not.toContainText('Chargement')
    await page.waitForLoadState('networkidle')
    await contexte.close()
    return [...vues].sort()
  }
  const lyon = await requetesDepuis(45.764, 4.836)
  const brest = await requetesDepuis(48.39, -4.486)
  expect(lyon.some((p) => SUITE.test(p))).toBe(true)
  expect(brest).toEqual(lyon)
})
