import { expect, test } from '@playwright/test'
import { sansTuiles } from './reseau'

/** S46 — les raccourcis de l'application installée. */
test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
})

test.describe('« Autour de moi » sans permission donnée d’avance', () => {
  test.use({ geolocation: { latitude: 45.909, longitude: 4.708 }, permissions: [] })

  test('le raccourci demande la position, c’est le geste de la personne (revue adverse S46)', async ({ page }) => {
    await page.addInitScript(() => {
      ;(window as unknown as { demandes: number }).demandes = 0
      const avant = navigator.geolocation.getCurrentPosition.bind(navigator.geolocation)
      navigator.geolocation.getCurrentPosition = (...a: Parameters<typeof avant>) => {
        ;(window as unknown as { demandes: number }).demandes += 1
        avant(...a)
      }
    })
    await page.goto('/?raccourci=autour')
    await expect.poll(() => page.evaluate(() => (window as unknown as { demandes: number }).demandes)).toBe(1)
  })
})

test.describe('« Autour de moi »', () => {
  test.use({ geolocation: { latitude: 45.909, longitude: 4.708 }, permissions: ['geolocation'] })

  test('le raccourci part de la position, puis l’adresse redevient propre', async ({ page }) => {
    await page.goto('/?raccourci=autour')
    await expect(page.getByTestId('compte')).toContainText('de votre position')
    expect(await page.evaluate(() => window.location.search)).toBe('')
  })
})

test('« Mes favoris » ouvre sur les seuls favoris, sans changer le lancement suivant', async ({ page }) => {
  await page.goto('/?raccourci=favoris')
  await expect(page.getByTestId('favoris-seulement')).toBeChecked()
  await expect(page.getByTestId('favoris-seulement')).toBeVisible()
  expect(await page.evaluate(() => window.location.search)).toBe('')
  // Une vue, pas un réglage (revue adverse S46).
  await page.waitForTimeout(500)
  await page.goto('/')
  await expect(page.getByTestId('compte')).toContainText('à moins de 30 km de Brignais')
})

test('une adresse sans raccourci ne change rien', async ({ page }) => {
  await page.goto('/?raccourci=inconnu')
  await expect(page.getByTestId('compte')).toContainText('à moins de 30 km de Brignais')
})
