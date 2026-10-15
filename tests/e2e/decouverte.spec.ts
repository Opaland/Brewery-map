import { readFileSync } from 'node:fs'
import { expect, test, type Page } from '@playwright/test'
import { BRIGNAIS } from '../../src/core/distance'
import { rechercher } from '../../src/core/recherche'
import type { Brasserie } from '../../src/core/schema'
import { sansTuiles } from './reseau'

const DONNEES = JSON.parse(readFileSync('data/breweries.json', 'utf8')) as Brasserie[]

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
    await expect(page.getByTestId('compte')).toHaveText('1 brasserie à moins de 30 km')
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
    for (const libelle of [
      'Acheter et consommer sur place',
      'Acheter seulement',
      'Pas de vente',
      'À confirmer',
    ]) {
      await expect(page.getByRole('checkbox', { name: libelle })).toBeChecked()
    }
    for (const cat of [0, 1, 2]) await page.getByTestId(`categorie-${String(cat)}`).uncheck()
    const n = DONNEES.filter((b) => b.cat === 3).length
    await expect(lignes(page)).toHaveCount(n)
    await expect(lignes(page).filter({ hasNotText: 'Pas de vente' })).toHaveCount(0)
  })

  test('dit quand rien ne correspond', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('recherche').fill('zzzz')
    await expect(page.getByTestId('compte')).toHaveText('Aucune brasserie ne correspond.')
  })

  test('choisir une ligne la marque comme choisie', async ({ page }) => {
    await page.goto('/')
    const premiere = lignes(page).first().getByRole('button')
    await expect(premiere).toHaveAttribute('aria-pressed', 'false')
    await premiere.click()
    await expect(premiere).toHaveAttribute('aria-pressed', 'true')
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
    await expect(page.getByTestId('carte-absente')).toContainText('La liste contient toutes les brasseries')
    await expect(lignes(page)).toHaveCount(attendus(30))
  })

  test('avec WebGL, la carte porte l’attribution OSM', async ({ page }) => {
    await page.goto('/')
    const carte = page.getByTestId('carte')
    await expect(carte.getByRole('link', { name: 'contributeurs OpenStreetMap' })).toBeVisible()
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
    await expect.poll(() => totalSurLaCarte(page)).toBe(attendus(30))
    await regler(page, 10)
    await expect.poll(() => totalSurLaCarte(page)).toBe(attendus(10))
  })

  test('deux brasseries au même endroit restent un groupe « 2 »', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('recherche').fill('fontaines')
    await expect(lignes(page)).toHaveCount(2)
    const groupe = page.getByTestId('carte').locator('.marqueur-groupe')
    await expect(groupe).toHaveText('2')
    await expect(page.getByTestId('carte').locator('.marqueur:not(.marqueur-groupe)')).toHaveCount(0)
    // Zoomer ne les sépare pas : le clic choisit la première, la liste montre l'autre.
    await groupe.click()
    await expect(lignes(page).getByRole('button', { pressed: true })).toHaveCount(1)
  })

  test('choisir un marqueur choisit la ligne de la liste', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('recherche').fill('oullins')
    const point = page.getByTestId('carte').locator('.marqueur:not(.marqueur-groupe)')
    await expect(point).toHaveCount(1)
    await point.click()
    await expect(lignes(page).getByRole('button', { name: /Bulles d'Orge/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    await expect(point).toHaveAttribute('aria-pressed', 'true')
  })
})
