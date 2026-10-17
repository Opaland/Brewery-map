import { expect, test } from '@playwright/test'
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
  await expect.poll(() => fond(page)).not.toBe(clair)
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
