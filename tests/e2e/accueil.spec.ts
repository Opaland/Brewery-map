import { expect, test } from '@playwright/test'

test.describe('la page d’accueil', () => {
  test('dit ce qu’elle est, et qu’elle n’est pas encore finie', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Mousse de Poche', level: 1 })).toBeVisible()
    await expect(page.getByTestId('etat-construction')).toBeVisible()
  })

  test('nomme les quatre catégories de vente', async ({ page }) => {
    await page.goto('/')
    for (const libelle of [
      'Acheter et consommer sur place',
      'Acheter seulement',
      'Pas de vente',
      'À confirmer',
    ]) {
      await expect(page.getByRole('listitem').filter({ hasText: libelle })).toBeVisible()
    }
  })

  test('porte la mention sanitaire dans le pied de page', async ({ page }) => {
    await page.goto('/')
    const mention = page.locator('footer').getByTestId('mention-alcool')
    await expect(mention).toHaveText(
      'L’abus d’alcool est dangereux pour la santé, à consommer avec modération.',
    )
    await expect(mention).toBeVisible()
  })

  test('ne fait aucune requête vers un autre domaine', async ({ page }) => {
    const ailleurs: string[] = []
    page.on('request', (r) => {
      if (!r.url().startsWith('http://localhost:4173')) ailleurs.push(r.url())
    })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    expect(ailleurs).toEqual([])
  })
})
