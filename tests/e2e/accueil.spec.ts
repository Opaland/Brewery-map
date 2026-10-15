import { expect, test } from '@playwright/test'
import { sansTuiles, TUILE_OSM } from './reseau'

test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
})

test.describe('la page d’accueil', () => {
  test('se présente', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Mousse de Poche', level: 1 })).toBeVisible()
  })

  test('porte la mention sanitaire dans le pied de page', async ({ page }) => {
    await page.goto('/')
    const mention = page.locator('footer').getByTestId('mention-alcool')
    await expect(mention).toHaveText(
      'L’abus d’alcool est dangereux pour la santé, à consommer avec modération.',
    )
    await expect(mention).toBeVisible()
  })

  test('ne contacte aucun autre hôte que les tuiles OpenStreetMap', async ({ page }) => {
    const ailleurs: string[] = []
    page.on('request', (r) => {
      const url = r.url()
      if (url.startsWith('http://localhost:4173') || url.startsWith('data:')) return
      if (TUILE_OSM.test(url)) return
      ailleurs.push(url)
    })
    await page.goto('/')
    await page.getByTestId('recherche').fill('lyon')
    await expect(page.getByTestId('carte').locator('canvas')).toBeVisible()
    // Une absence se constate sur une fenêtre de temps : `networkidle` n'est
    // jamais atteint ici, MapLibre retentant les tuiles coupées.
    await page.waitForTimeout(2000)
    expect(ailleurs).toEqual([])
  })
})
