import { expect, test } from '@playwright/test'
import { choisirCommune, sansTuiles, versLaCarte } from './reseau'

/** Revue UI/UX globale du 16/10 (après S23) : ce qui a été corrigé. */
test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
  await page.goto('/')
  await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
})

test('le compte se lit depuis le curseur de distance, sans défiler', async ({ page }) => {
  await page.getByTestId('rayon').scrollIntoViewIfNeeded()
  await page.getByTestId('rayon').fill('15')
  // Peint à l'écran, pas seulement présent (CLAUDE.md §1bis).
  await expect
    .poll(() =>
      page.evaluate(() => {
        const c = document.querySelector('[data-testid="compte"]')
        if (c === null) return false
        const r = c.getBoundingClientRect()
        if (r.bottom > window.innerHeight || r.top < 0) return false
        const vu = document.elementFromPoint(r.left + 4, r.top + r.height / 2)
        return vu !== null && c.contains(vu)
      }),
    )
    .toBe(true)
  await expect(page.getByTestId('compte')).toContainText('15 km')
})

test('« Refermer la fiche » referme, et rend la main à sa ligne', async ({ page }) => {
  const ligne = page.locator('button.ligne').first()
  await ligne.click()
  await page.getByTestId('refermer-fiche').click()
  await expect(page.getByTestId('fiche')).toHaveCount(0)
  await expect(ligne).toBeFocused()
  await expect(ligne).toBeInViewport()
})

test('les boutons de zoom font 44 px', async ({ page }) => {
  await versLaCarte(page)
  for (const nom of ['Zoomer', 'Dézoomer']) {
    const b = await page.getByRole('button', { name: nom, exact: true }).boundingBox()
    expect(b?.width).toBeGreaterThanOrEqual(44)
    expect(b?.height).toBeGreaterThanOrEqual(44)
  }
})

test('le texte de confidentialité montre qu’il se déplie', async ({ page }) => {
  const affichage = await page
    .locator('.confidentialite summary')
    .evaluate((s) => getComputedStyle(s).display)
  expect(affichage).toBe('list-item')
})

test('le statut des communes ne dit pas « à moins de 100 km » de communes plus lointaines', async ({
  page,
}) => {
  await page.getByTestId('commune-depart').fill('villefranche')
  await expect(page.getByRole('option', { name: "Villefranche-d'Allier (03)" })).toBeVisible()
  await expect(page.getByTestId('commune-statut')).toContainText('dans les départements à moins de 100 km')
})

test.describe('ordinateur', () => {
  test.use({ viewport: { width: 1280, height: 800 }, isMobile: false, hasTouch: false })

  test('une brasserie est dans le premier écran', async ({ page }) => {
    const haut = await page.locator('button.ligne').first().evaluate((e) => e.getBoundingClientRect().top)
    expect(haut).toBeLessThan(800)
  })

  test('après un départ choisi aussi', async ({ page }) => {
    await choisirCommune(page, 'lyon', 'Lyon (69)')
    await page.evaluate(() => {
      window.scrollTo(0, 0)
    })
    const haut = await page.locator('button.ligne').first().evaluate((e) => e.getBoundingClientRect().top)
    expect(haut).toBeLessThan(800)
  })
})
