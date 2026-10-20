import { type Page } from '@playwright/test'
import { expect, test } from './position'
import { sansTuiles } from './reseau'

const ANSE = { latitude: 45.9367, longitude: 4.7208 }

test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
})

const liensDe = async (page: Page, nom: string) => {
  await page.getByTestId('recherche').fill(nom)
  const ligne = page.locator(`button.ligne[data-nom="${nom}"]`)
  if ((await ligne.getAttribute('aria-expanded')) !== 'true') await ligne.click()
  return page
    .getByTestId('fiche-y-aller')
    .getByRole('link')
    .evaluateAll((liens) => liens.map((a) => a.getAttribute('href') ?? ''))
}

test.describe('« Y aller » (Hugo)', () => {
  test.use({ geolocation: ANSE, permissions: ['geolocation'] })

  /*
    Comparaison structurelle, comme pour le signalement (S10) : les liens
    d'une même brasserie sont identiques au caractère près, qu'on parte de
    Brignais ou de sa position. Ils ne dépendent donc pas de la position.
  */
  test('les liens sont les mêmes avec ou sans « autour de moi »', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('rayon').fill('100')
    const depuisBrignais = await liensDe(page, 'Caribrew')
    // Le Pixel 7 émulé est un Android : trois liens, sans Plans (Apple).
    expect(depuisBrignais).toHaveLength(3)
    await page.getByTestId('autour-de-moi').click()
    await expect(page.getByTestId('compte')).toContainText('depuis votre position')
    expect(await liensDe(page, 'Caribrew')).toEqual(depuisBrignais)
  })

  test('chaque lien part dans un nouvel onglet, sans adresse d’origine', async ({ page }) => {
    await page.goto('/')
    await liensDe(page, 'Caribrew')
    const liens = page.getByTestId('fiche-y-aller').getByRole('link')
    await expect(liens).toHaveCount(3)
    for (const lien of await liens.all()) {
      await expect(lien).toHaveAttribute('target', '_blank')
      await expect(lien).toHaveAttribute('rel', /noreferrer/)
    }
  })

  test('sans adresse, la fiche dit que l’itinéraire mène au point approximatif', async ({ page }) => {
    await page.goto('/')
    await liensDe(page, 'Bulles d\'Orge')
    // S308 : en une phrase (Bulles d'Orge : point d'origine, approximatif).
    await expect(page.getByTestId('fiche-precision')).toHaveText(
      'L’itinéraire mène à un point approximatif, parfois à plusieurs kilomètres de la brasserie.',
    )
  })
})
