import { expect, test } from '@playwright/test'
import { sansTuiles } from './reseau'

const ANSE = { latitude: 45.9367, longitude: 4.7208 }

test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
})

test.describe('« Signaler une erreur » (Une brasserie)', () => {
  test.use({ geolocation: ANSE, permissions: ['geolocation'] })

  /*
    Comparaison structurelle (revue code S10) : chercher des fragments
    (« ≈ 3 km », « 45.93 ») laissait passer « 3,2 km » ou « 46.0 N ». Le lien
    d'une même brasserie doit être identique au caractère près, qu'on parte
    de Brignais ou de sa position : il ne dépend donc pas de la position.
  */
  test('le lien d’une fiche est le même avec ou sans « autour de moi »', async ({ page }) => {
    const lienDe = async (nom: string) => {
      await page.getByTestId('recherche').fill(nom)
      const ligne = page.locator(`button.ligne[data-nom="${nom}"]`)
      if ((await ligne.getAttribute('aria-expanded')) !== 'true') await ligne.click()
      return (await page.getByTestId('fiche-signaler').getByRole('link').getAttribute('href')) ?? ''
    }
    await page.goto('/')
    await page.getByTestId('rayon').fill('100')
    const nom = (await page.locator('button.ligne').first().getAttribute('data-nom')) ?? ''
    const depuisBrignais = await lienDe(nom)
    expect(new URL(depuisBrignais).searchParams.get('title')).toContain(nom)

    await page.getByTestId('autour-de-moi').click()
    await expect(page.getByTestId('compte')).toContainText('depuis votre position')
    expect(await lienDe(nom)).toBe(depuisBrignais)
  })

  test('le lien part dans un nouvel onglet, sans adresse d’origine', async ({ page }) => {
    await page.goto('/')
    await page.locator('button.ligne').first().click()
    for (const lien of [
      page.getByTestId('fiche-signaler').getByRole('link'),
      page.getByTestId('signaler-absente').getByRole('link'),
    ]) {
      await expect(lien).toHaveAttribute('target', '_blank')
      await expect(lien).toHaveAttribute('rel', /noreferrer/)
      const u = new URL((await lien.getAttribute('href')) ?? '')
      expect(u.origin + u.pathname).toBe('https://github.com/Opaland/Brewery-map/issues/new')
    }
  })

  test('l’écran dit qu’il faut un compte GitHub et que le signalement est public', async ({
    page,
  }) => {
    await page.goto('/')
    await page.locator('button.ligne').first().click()
    const aide = page.getByTestId('fiche-signaler')
    await expect(aide).toContainText('compte GitHub')
    await expect(aide).toContainText('sera public')
    await expect(aide).toContainText('pas d’autre moyen pour l’instant')
    await expect(aide).toContainText('Aucun délai n’est garanti')
  })

  test('une brasserie absente se signale depuis le pied de page', async ({ page }) => {
    await page.goto('/')
    const lien = page.getByTestId('signaler-absente').getByRole('link')
    const href = (await lien.getAttribute('href')) ?? ''
    expect(new URL(href).searchParams.get('title')).toBe('Brasserie absente : ')
    await expect(page.getByTestId('signaler-absente')).toContainText('signalement public')
  })
})
