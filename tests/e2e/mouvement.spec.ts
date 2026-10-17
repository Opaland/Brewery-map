import { expect, test } from '@playwright/test'
import { sansTuiles } from './reseau'

/** S33 — un peu de mouvement, jamais imposé. */
test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
})

test('la mousse du logo monte une fois, en moins d’une seconde, puis s’arrête', async ({ page }) => {
  await page.goto('/')
  // Lu sur le style calculé : l'animation peut être finie avant la lecture.
  const style = await page.locator('.logo .mousse').evaluate((el) => {
    const c = getComputedStyle(el)
    return { nom: c.animationName, duree: parseFloat(c.animationDuration), fois: c.animationIterationCount }
  })
  expect(style.nom).toBe('mousse-monte')
  expect(style.fois).toBe('1')
  expect(style.duree).toBeLessThan(1)
  // Puis plus rien ne tourne sur le logo.
  await expect.poll(() => page.locator('.logo .mousse').evaluate((el) => el.getAnimations().length)).toBe(0)
})

test('le logo reste décoratif', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.entete svg.logo')).toHaveAttribute('aria-hidden', 'true')
})

test.describe('« moins d’animations » demandé', () => {
  test('rien ne tourne : ni la mousse, ni les transitions au toucher', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.locator('button.ligne').first().click()
    await page.locator('button.ligne').first().click()
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0)
  })
})

test('toucher une ligne l’enfonce un peu', async ({ page }) => {
  await page.goto('/')
  const ligne = page.locator('button.ligne').first()
  const boite = await ligne.boundingBox()
  if (boite === null) throw new Error('ligne absente')
  await page.mouse.move(boite.x + boite.width / 2, boite.y + 20)
  await page.mouse.down()
  await expect.poll(() => ligne.evaluate((e) => getComputedStyle(e).transform)).not.toBe('none')
  await page.mouse.up()
})
