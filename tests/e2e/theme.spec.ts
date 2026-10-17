import { expect, test } from './position'
import { sansTuiles } from './reseau'

/** S45 — le thème au choix, clair, sombre ou comme le téléphone. */
const fond = (page: import('@playwright/test').Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor)

test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
})

test('« Sombre » assombrit un téléphone réglé en clair, et se garde au retour', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  const clair = await fond(page)
  await page.getByTestId('theme-sombre').check()
  // Le papier sombre du design system v2 (#15110d), pas « autre chose ».
  await expect.poll(() => fond(page)).toBe('rgb(21, 17, 13)')
  expect(clair).not.toBe('rgb(21, 17, 13)')
  await expect.poll(async () => {
    await page.reload()
    return page.evaluate(() => document.documentElement.dataset['theme'])
  }).toBe('sombre')
  await expect.poll(() => fond(page)).not.toBe(clair)
})

test('« Claire » éclaircit un téléphone réglé en sombre', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/')
  const sombre = await fond(page)
  await page.getByTestId('theme-clair').check()
  await expect.poll(() => fond(page)).not.toBe(sombre)
  await page.getByTestId('theme-auto').check()
  await expect.poll(() => fond(page)).toBe(sombre)
})

test('le thème choisi est posé avant le premier rendu (revue adverse S45)', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  await page.getByTestId('theme-sombre').check()
  // Au rechargement, le code de l'application bloqué : seul le petit script
  // du <head> peut poser le thème. S'il ne le fait pas, rien d'autre ne le
  // fera, et le test échoue (§1).
  await page.route(/\/assets\/index-[^/]*\.js$/, (route) => route.abort())
  await page.reload({ waitUntil: 'domcontentloaded' })
  expect(await page.evaluate(() => document.documentElement.dataset['theme'])).toBe('sombre')
})

test('« tout effacer » remet l’apparence du téléphone', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('theme-sombre').check()
  await page.getByTestId('plus-de-filtres-resume').click()
  await page.getByTestId('stockage-details').locator('summary').click()
  await page.getByTestId('tout-effacer').click()
  await page.getByTestId('confirmer-effacer').click()
  await expect(page.getByTestId('theme-auto')).toBeChecked()
  expect(await page.evaluate(() => document.documentElement.dataset['theme'])).toBeUndefined()
})
