import { readFileSync } from 'node:fs'
import { type Page } from '@playwright/test'
import { expect, test } from './position'
import { BRIGNAIS } from '../../src/core/distance'
import { brasseriesDepuisFichierOsm, type FichierOsm } from '../../src/core/osm-france'
import { rechercher } from '../../src/core/recherche'
import type { Brasserie } from '../../src/core/schema'
import { ouvrirFiltres, sansTuiles, versLaCarte } from './reseau'

const FICHIER = JSON.parse(readFileSync('data/breweries.json', 'utf8')) as Brasserie[]
// Toute la France (S25) : la couche OpenStreetMap s'ajoute au fichier, par
// la même conversion que l'application.
const DONNEES = [
  ...FICHIER,
  ...brasseriesDepuisFichierOsm(
    JSON.parse(readFileSync('src/donnees-osm/brasseries-osm.json', 'utf8')) as FichierOsm,
  ),
]

/** Ce que le cœur calcule pour un rayon, toutes catégories : la référence. */
function attendus(rayonKm: number): number {
  return rechercher(DONNEES, { origine: BRIGNAIS, rayonKm, texte: '', categories: [0, 1, 2, 3] })
    .length
}

async function regler(page: Page, rayonKm: number): Promise<void> {
  await page.getByTestId('rayon').fill(String(rayonKm))
}

const lignes = (page: Page) => page.getByTestId('liste').getByRole('listitem')

test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
})

test.describe('trouver une brasserie (Marie)', () => {
  test('par sa commune, sans toucher la carte', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('recherche').fill('oullins')
    await expect(lignes(page)).toHaveCount(1)
    await expect(lignes(page).first()).toContainText("Bulles d'Orge")
    await expect(lignes(page).first()).toContainText('Oullins (69)')
    await expect(page.getByTestId('compte')).toHaveText('1 brasserie toutes distances, comptées depuis Brignais')
  })

  test('« À confirmer » dit pourquoi, dans la liste même', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('recherche').fill('oullins')
    await expect(lignes(page).first()).toContainText(
      'Pourquoi : Aucune source fiable lue pour cette brasserie.',
    )
  })

  test('par son nom, sans accent ni majuscule', async ({ page }) => {
    await page.goto('/')
    await regler(page, 100)
    await page.getByTestId('recherche').fill('ninkasi saint etienne')
    await expect(lignes(page)).toHaveCount(1)
    await expect(lignes(page).first()).toContainText('Ninkasi Saint-Étienne')
  })

  test('le rayon montre ce que le calcul donne', async ({ page }) => {
    await page.goto('/')
    await expect(lignes(page)).toHaveCount(attendus(30))
    await regler(page, 10)
    await expect(lignes(page)).toHaveCount(attendus(10))
    await regler(page, 100)
    await expect(lignes(page)).toHaveCount(attendus(100))
    // Garde-fou : le test perdrait son sens si les trois rayons donnaient
    // le même nombre.
    expect(new Set([attendus(10), attendus(30), attendus(100)]).size).toBe(3)
  })

  test('la liste va de la plus proche à la plus lointaine', async ({ page }) => {
    await page.goto('/')
    // allTextContents n'attend rien : depuis S9 la liste se rend après la
    // lecture d'IndexedDB, et une lecture trop tôt rendait [] (vu en suite).
    await expect(page.locator('.ligne-lieu').first()).toBeVisible()
    const distances = (await page.locator('.ligne-lieu').allTextContents()).map((t) => {
      const m = /≈ (\d+) km|moins de 1 km/.exec(t)
      return m?.[1] === undefined ? 0 : Number(m[1])
    })
    expect(distances.length).toBeGreaterThan(5)
    expect(distances).toEqual([...distances].sort((a, b) => a - b))
  })

  test('les quatre catégories sont nommées en clair et filtrent', async ({ page }) => {
    await page.goto('/')
    await regler(page, 100)
    await ouvrirFiltres(page)
    for (const libelle of [
      'Acheter et consommer sur place',
      'Acheter seulement',
      'Pas de vente',
      'À confirmer',
    ]) {
      await expect(page.getByRole('checkbox', { name: libelle })).toBeChecked()
    }
    for (const cat of [0, 1, 2]) await page.getByTestId(`categorie-${String(cat)}`).uncheck()
    // Dans le rayon réglé, comme la liste (`recherche.ts`) : vu en S341, deux
    // fiches « pas de vente » de Haute-Savoie, à 152 km, le faisaient échouer.
    const n = DONNEES.filter((b) => b.cat === 3 && Math.round(b.km) <= 100).length
    expect(n).toBeGreaterThan(0)
    await expect(lignes(page)).toHaveCount(n)
    await expect(lignes(page).filter({ hasNotText: 'Pas de vente' })).toHaveCount(0)
  })

  test('le filtre par type dit qu’il est vide plutôt que de vider la liste', async ({ page }) => {
    const nbAvecBieres = DONNEES.filter((b) => b.beers.length > 0).length
    test.skip(nbAvecBieres > 0, 'des types sont référencés : ce cas ne se présente plus')
    await page.goto('/')
    await expect(page.getByTestId('type-absent')).toContainText(
      'aucun encore référencé',
    )
    await expect(page.getByTestId('type')).toHaveCount(0)
  })

  // S295, Karim : le parcours entier sur les vraies données. Le test d'avant
  // (le filtre vide) est sauté depuis que des bières sont renseignées.
  test('choisir un type garde les seules brasseries qui en déclarent une', async ({ page }) => {
    await page.goto('/')
    await ouvrirFiltres(page)
    await regler(page, 50)
    await expect(lignes(page)).toHaveCount(attendus(50))
    const avecIpa = rechercher(DONNEES, { origine: BRIGNAIS, rayonKm: 50, texte: '', categories: [0, 1, 2, 3], type: 'ipa' })
    expect(avecIpa.length).toBeGreaterThan(0)
    expect(avecIpa.length).toBeLessThan(attendus(50))
    await page.getByTestId('type').selectOption('ipa')
    await expect(lignes(page)).toHaveCount(avecIpa.length)
    // Chaque ligne restante déclare une IPA dans le fichier.
    const noms = await lignes(page).locator('.ligne-nom').allTextContents()
    const ipa = new Set(DONNEES.filter((b) => b.beers.some((x) => x.type === 'ipa')).map((b) => b.n))
    expect(noms.filter((n) => !ipa.has(n.trim()))).toEqual([])
    await page.getByTestId('type').selectOption('')
    await expect(lignes(page)).toHaveCount(attendus(50))
  })

  test('dit quand rien ne correspond', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('recherche').fill('zzzz')
    await expect(page.getByTestId('compte')).toHaveText('Aucune brasserie ne correspond.')
  })

  test('choisir une ligne la marque comme choisie', async ({ page }) => {
    await page.goto('/')
    const premiere = lignes(page).first().locator('button.ligne')
    await expect(premiere).toHaveAttribute('aria-expanded', 'false')
    await premiere.click()
    await expect(premiere).toHaveAttribute('aria-expanded', 'true')
  })
})

test.describe('sans carte', () => {
  test('sans WebGL, la liste reste entière et le manque est dit', async ({ page }) => {
    await page.addInitScript(() => {
      // On remplace la méthode du prototype, et on la rappelle avec `call` :
      // le `this` est fourni, la règle ne s'applique pas ici.
      // eslint-disable-next-line @typescript-eslint/unbound-method
      const origine = HTMLCanvasElement.prototype.getContext
      HTMLCanvasElement.prototype.getContext = function (
        this: HTMLCanvasElement,
        type: string,
        ...reste: unknown[]
      ) {
        if (type.startsWith('webgl')) return null
        return (origine as (t: string, ...r: unknown[]) => RenderingContext | null).call(
          this,
          type,
          ...reste,
        )
      } as typeof origine
    })
    await page.goto('/')
    await versLaCarte(page, { sansWebGLAttendu: true })
    await expect(page.getByTestId('carte-absente')).toContainText('La liste contient toutes les brasseries')
    await expect(lignes(page)).toHaveCount(attendus(30))
  })

  test('avec WebGL, la carte porte l’attribution OSM', async ({ page }) => {
    await page.goto('/')
    await versLaCarte(page)
    const carte = page.getByTestId('carte')
    const attribution = carte.getByRole('link', { name: 'contributeurs OpenStreetMap' })
    await expect(attribution).toBeVisible()
    // Nouvel onglet, sans adresse d'origine (revue globale S22).
    await expect(attribution).toHaveAttribute('target', '_blank')
    await expect(attribution).toHaveAttribute('rel', 'noopener noreferrer')
  })
})

test.describe('la carte (marqueurs groupés)', () => {
  /*
    Le canvas seul ne prouve rien : le 15/10, il était là sans un seul
    marqueur, et le test qui ne regardait que lui restait vert (§1bis). On
    compte donc les marqueurs, et on vérifie que chaque brasserie de la liste
    est sur la carte, seule ou dans un groupe.
  */
  const marqueurs = (page: Page) => page.getByTestId('carte').locator('.marqueur')

  async function totalSurLaCarte(page: Page): Promise<number> {
    return marqueurs(page).evaluateAll((els) =>
      els.reduce(
        (n, el) => n + (el.classList.contains('marqueur-groupe') ? Number(el.textContent) : 1),
        0,
      ),
    )
  }

  test('chaque brasserie de la liste est sur la carte', async ({ page }) => {
    await page.goto('/')
    await versLaCarte(page)
    await expect.poll(() => totalSurLaCarte(page)).toBe(attendus(30))
    await regler(page, 10)
    await expect.poll(() => totalSurLaCarte(page)).toBe(attendus(10))
  })

  test('deux brasseries au même endroit restent un groupe « 2 »', async ({ page }) => {
    await page.goto('/')
    await versLaCarte(page)
    await page.getByTestId('recherche').fill('sassenage')
    await expect(lignes(page)).toHaveCount(2)
    const groupe = page.getByTestId('carte').locator('.marqueur-groupe')
    await expect(groupe).toHaveText('2')
    await expect(page.getByTestId('carte').locator('.marqueur:not(.marqueur-groupe)')).toHaveCount(0)
    // Zoomer ne les sépare pas : le clic choisit la première, la liste montre l'autre.
    // Un groupe va droit à la liste, même sur téléphone (revue adverse S32).
    await groupe.click()
    await expect(lignes(page).getByRole('button', { expanded: true })).toHaveCount(1)
  })

  test('choisir un marqueur choisit la ligne de la liste', async ({ page }) => {
    await page.goto('/')
    await versLaCarte(page)
    await page.getByTestId('recherche').fill('oullins')
    const point = page.getByTestId('carte').locator('.marqueur:not(.marqueur-groupe)')
    await expect(point).toHaveCount(1)
    await point.click()
    await expect(page.getByTestId('apercu-carte')).toContainText("Bulles d'Orge")
    await expect(point).toHaveAttribute('aria-pressed', 'true')
    await page.getByTestId('apercu-voir-fiche').click()
    await expect(lignes(page).locator('button.ligne', { hasText: /Bulles d'Orge/ })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    await expect(page.getByTestId('fiche')).toBeVisible()
    await expect(point).toHaveAttribute('aria-pressed', 'true')
  })
})
