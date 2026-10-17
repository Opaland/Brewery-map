import { expect, test } from '@playwright/test'
import { sansTuiles, versLaCarte, ouvrirFiltres } from './reseau'

/** S27 — les meilleures idées de la veille concurrentielle (docs/VEILLE-CONCURRENCE.md). */
test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
})

test('parcourir un département : ses brasseries, à toute distance', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('rayon').fill('5')
  await ouvrirFiltres(page)
  await page.getByTestId('departement').selectOption('73')
  await expect(page.getByTestId('compte')).toContainText('dans le département 73 · Savoie')
  const lieux = await page.locator('.ligne-lieu').allTextContents()
  expect(lieux.length).toBeGreaterThan(0)
  expect(lieux.every((t) => t.includes('(73)'))).toBe(true)
})

test('ma tournée : deux favoris, un lien Google Maps sans le départ', async ({ page }) => {
  await page.goto('/')
  for (const rang of [0, 1]) {
    await page.locator('button.ligne').nth(rang).click()
    await page.getByTestId('bouton-favori').click()
    await page.locator('button.ligne').nth(rang).click()
  }
  await ouvrirFiltres(page)
  const lien = page.getByTestId('tournee-lien')
  await expect(lien).toBeVisible()
  const url = new URL((await lien.getAttribute('href')) ?? '')
  expect(url.hostname).toBe('www.google.com')
  expect(url.searchParams.get('origin')).toBeNull()
  expect(url.searchParams.get('destination')).not.toBeNull()
  expect(url.searchParams.get('waypoints')).not.toBeNull()
  await expect(lien).toHaveAttribute('rel', 'noopener noreferrer')
})

test('la carte a sa légende, visible', async ({ page }) => {
  await page.goto('/')
  await versLaCarte(page)
  const legende = page.getByTestId('legende-carte')
  await expect(legende).toContainText('Acheter et consommer sur place')
  await expect(legende).toContainText('Point de départ')
})

test('« Vérifiez avant de partir » près de « Y aller »', async ({ page }) => {
  await page.goto('/')
  await page.locator('button.ligne').first().click()
  await expect(page.getByTestId('verifier-avant')).toContainText('Vérifiez avant de partir')
})

test('un lien partagé ouvre la fiche, même hors du rayon', async ({ page }) => {
  await page.goto('/#fiche=Tom%20%26%20Co')
  await page.getByTestId('rayon').fill('5')
  await expect(page.locator('button.ligne[data-nom="Tom & Co"]')).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByTestId('fiche')).toBeVisible()
})

test.describe('partager sans menu de partage : le lien est copié', () => {
  test.use({ permissions: ['clipboard-read', 'clipboard-write'] })

  test('le lien copié ne porte que le nom', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'share', { value: undefined })
    })
    await page.goto('/')
    await page.locator('button.ligne').first().click()
    await page.getByTestId('bouton-partager').click()
    await expect(page.getByTestId('partage-etat')).toHaveText('Lien copié.')
    const copie = await page.evaluate(() => navigator.clipboard.readText())
    expect(copie).toMatch(/^http:\/\/localhost:4173\/#fiche=[^&?]+$/)
  })
})

test('un département qui n’a que des fiches OSM, puis OSM décoché : le choix tombe, visiblement (revue S27)', async ({
  page,
}) => {
  await page.goto('/')
  await ouvrirFiltres(page)
  await page.getByTestId('departement').selectOption('02')
  await page.getByTestId('avec-osm').uncheck()
  await expect(page.getByTestId('departement')).toHaveValue('')
  await expect(page.getByTestId('compte')).toContainText('à moins de 30 km')
})

test('ni menu de partage ni presse-papiers : l’écran le dit (revue S27)', async ({ page }) => {
  const erreurs: string[] = []
  page.on('pageerror', (e) => erreurs.push(e.message))
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', { value: undefined })
    Object.defineProperty(navigator, 'clipboard', { value: undefined })
  })
  await page.goto('/')
  await page.locator('button.ligne').first().click()
  await page.getByTestId('bouton-partager').click()
  await expect(page.getByTestId('partage-etat')).toHaveText('Copie impossible ici.')
  expect(erreurs).toEqual([])
})
