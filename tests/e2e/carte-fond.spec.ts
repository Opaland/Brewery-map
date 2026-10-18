import { expect, test } from './position'
import { TUILE_OSM, versLaCarte } from './reseau'

/** S41 — le repli « fond de carte indisponible » ne clignote plus. */
// Une tuile PNG de 1 × 1 pixel, valide.
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
)

test('une seule tuile en échec, les autres là : le repli ne s’allume jamais', async ({ page }) => {
  let premiere = true
  await page.route(TUILE_OSM, (route) => {
    if (premiere) {
      premiere = false
      return route.abort()
    }
    return route.fulfill({ status: 200, contentType: 'image/png', body: PNG })
  })
  // Un clignotement dure un instant : on note toute apparition, même brève.
  await page.addInitScript(() => {
    ;(window as unknown as { vuFond: boolean }).vuFond = false
    new MutationObserver(() => {
      if (document.querySelector('[data-testid="fond-absent"]')) {
        ;(window as unknown as { vuFond: boolean }).vuFond = true
      }
    }).observe(document, { childList: true, subtree: true })
  })
  await page.goto('/')
  await versLaCarte(page)
  await expect(page.locator('.maplibregl-marker.marqueur').first()).toBeAttached()
  // Attente voulue : une absence (le repli ne clignote pas) se constate sur
  // une fenêtre de temps ; l'observateur ci-dessus note toute apparition.
  await page.waitForTimeout(2500)
  expect(await page.evaluate(() => (window as unknown as { vuFond: boolean }).vuFond)).toBe(false)
})

test('toutes les tuiles en échec : le repli s’allume', async ({ page }) => {
  await page.route(TUILE_OSM, (route) => route.abort())
  await page.goto('/')
  await versLaCarte(page)
  await expect(page.getByTestId('fond-absent')).toBeVisible()
})
