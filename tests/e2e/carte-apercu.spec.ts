import { expect, test } from '@playwright/test'
import { sansTuiles, versLaCarte } from './reseau'

/** S32 — sur téléphone, un marqueur touché montre un aperçu dans la carte. */
test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
  await page.goto('/')
  await page.getByTestId('recherche').fill('oullins')
  await versLaCarte(page)
})

test('l’aperçu est peint dans la carte, sans quitter la carte', async ({ page }) => {
  const point = page.getByTestId('carte').locator('.marqueur:not(.marqueur-groupe)')
  await expect(point).toHaveCount(1)
  await point.click()
  const apercu = page.getByTestId('apercu-carte')
  await expect(apercu).toContainText("Bulles d'Orge")
  await expect(apercu).toContainText('Oullins (69)')
  await expect(apercu).toContainText(/km/)
  // Peint dans le cadre de la carte (§1bis) : le point au centre de l'aperçu
  // est l'aperçu, et la carte reste à l'écran : avant S32, la page remontait
  // à la ligne de la liste, des milliers de pixels plus haut.
  await expect
    .poll(() =>
      apercu.evaluate((a) => {
        const r = a.getBoundingClientRect()
        const vu = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)
        return vu !== null && a.contains(vu)
      }),
    )
    .toBe(true)
  const carte = await page.getByTestId('carte').evaluate((c) => {
    const r = c.getBoundingClientRect()
    return { haut: r.top, bas: r.bottom, ecran: window.innerHeight }
  })
  expect(carte.bas).toBeGreaterThan(0)
  expect(carte.haut).toBeLessThan(carte.ecran)
  await expect(page.locator('button.ligne[aria-expanded="true"]')).toHaveCount(0)
})

test('« Fermer » retire l’aperçu et rend le focus au marqueur', async ({ page }) => {
  const point = page.getByTestId('carte').locator('.marqueur:not(.marqueur-groupe)')
  await point.click()
  await page.getByTestId('apercu-fermer').click()
  await expect(page.getByTestId('apercu-carte')).toHaveCount(0)
  await expect(point).toBeFocused()
})

test('« Voir la fiche » ouvre la fiche dans la liste, focus sur sa ligne', async ({ page }) => {
  await page.getByTestId('carte').locator('.marqueur:not(.marqueur-groupe)').click()
  await page.getByTestId('apercu-voir-fiche').click()
  const ligne = page.locator('button.ligne[data-nom="Bulles d\'Orge"]')
  await expect(ligne).toHaveAttribute('aria-expanded', 'true')
  await expect(ligne).toBeFocused()
  await expect(page.getByTestId('apercu-carte')).toHaveCount(0)
})

test('à 320 px et 200 % de texte, l’aperçu reste dans la carte (revue adverse S32)', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 })
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' })
  await versLaCarte(page)
  // À 200 %, la barre collée du bas peut couvrir le marqueur : on le choisit
  // par son événement, ce qui est mesuré ici est l'aperçu.
  await page.getByTestId('carte').locator('.marqueur:not(.marqueur-groupe)').dispatchEvent('click')
  const apercu = page.getByTestId('apercu-carte')
  await expect(apercu).toBeVisible()
  await expect
    .poll(async () => {
      const a = await apercu.boundingBox()
      const c = await page.getByTestId('carte').boundingBox()
      return a !== null && c !== null && a.y >= c.y && a.y + a.height <= c.y + c.height
    })
    .toBe(true)
})

test('une recherche qui ne la garde plus retire l’aperçu, qui ne revient pas seul', async ({ page }) => {
  await page.getByTestId('carte').locator('.marqueur:not(.marqueur-groupe)').click()
  await expect(page.getByTestId('apercu-carte')).toBeVisible()
  await page.getByTestId('recherche').fill('zzzz')
  await expect(page.getByTestId('apercu-carte')).toHaveCount(0)
  await page.getByTestId('recherche').fill('oullins')
  await expect(page.locator('.marqueur:not(.marqueur-groupe)')).toHaveCount(1)
  await expect(page.getByTestId('apercu-carte')).toHaveCount(0)
})
