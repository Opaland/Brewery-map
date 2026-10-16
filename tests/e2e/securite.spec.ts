import { expect, test, type Page } from '@playwright/test'
import { choisirCommune, sansTuiles, versLaCarte } from './reseau'

/**
 * S24 — une Content-Security-Policy en balise `<meta>` (GitHub Pages ne pose
 * pas d'en-tête) : seuls ce site et les tuiles OpenStreetMap sont permis.
 */
test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
  await page.addInitScript(() => {
    const w = window as unknown as { __violations: string[] }
    w.__violations = []
    document.addEventListener('securitypolicyviolation', (e) => {
      w.__violations.push(`${e.violatedDirective} ${e.blockedURI}`)
    })
  })
})

const violations = (page: Page) =>
  page.evaluate(() => (window as unknown as { __violations: string[] }).__violations)

test('la politique bloque une ressource tierce', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
  await page.evaluate(() => {
    const i = document.createElement('img')
    i.src = 'https://tiers.example/pixel.png'
    document.body.append(i)
  })
  await expect.poll(() => violations(page)).toContainEqual(expect.stringContaining('tiers.example'))
})

test('l’application entière tient dans la politique : aucune violation', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
  await choisirCommune(page, 'lyon', 'Lyon (69)')
  await page.locator('button.ligne').first().click()
  await expect(page.getByTestId('fiche')).toBeVisible()
  await versLaCarte(page)
  await expect(page.locator('.maplibregl-marker.marqueur').first()).toBeAttached()
  expect(await violations(page)).toEqual([])
})
