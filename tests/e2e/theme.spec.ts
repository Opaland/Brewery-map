import { attendreGarde } from './garde'
import { expect, test } from './position'
import { sansTuiles, versLaCarte } from './reseau'

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
  await attendreGarde(page, { theme: 'sombre' })
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

/** S307 (A8, A9) : la carte reste claire ; ses marqueurs gardent les couleurs qui s'y lisent. */
test.describe('les marqueurs en thème sombre', () => {
  // Les couleurs sur carte, celles du thème clair, par numéro de catégorie.
  const SUR_CARTE = ['rgb(163, 82, 0)', 'rgb(46, 125, 50)', 'rgb(29, 95, 154)', 'rgb(95, 99, 104)', 'rgb(106, 61, 154)']

  test.beforeEach(async ({ page }) => {
    await sansTuiles(page)
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    await page.getByTestId('recherche').fill('oullins')
    await versLaCarte(page)
  })

  test('un marqueur et la légende ont la couleur sur carte de leur catégorie', async ({ page }) => {
    const marqueur = page.getByTestId('carte').locator('.marqueur:not(.marqueur-groupe)')
    await expect(marqueur).toHaveCount(1)
    const lu = await marqueur.evaluate((m) => ({
      cat: Number(/cat-(\d)/.exec(m.getAttribute('class') ?? '')?.[1]),
      fond: getComputedStyle(m).backgroundColor,
    }))
    expect(lu.fond).toBe(SUR_CARTE[lu.cat])
    const legende = await page.getByTestId('legende-carte').locator('li[class^="cat-"]').evaluateAll((lis) =>
      lis.map((li) => ({
        cat: Number(/cat-(\d)/.exec(li.getAttribute('class') ?? '')?.[1]),
        fond: getComputedStyle(li.querySelector('.pastille') ?? li).backgroundColor,
      })),
    )
    expect(legende).toHaveLength(SUR_CARTE.length)
    for (const { cat, fond } of legende) expect(fond, `légende cat-${String(cat)}`).toBe(SUR_CARTE[cat])
  })

  test('un marqueur choisi et focalisé au clavier se distingue d’un marqueur seulement choisi', async ({ page }) => {
    const marqueur = page.getByTestId('carte').locator('.marqueur:not(.marqueur-groupe)')
    await marqueur.click()
    await expect(marqueur).toHaveAttribute('aria-pressed', 'true')
    const contour = () => marqueur.evaluate((m) => `${getComputedStyle(m).outlineColor} | ${getComputedStyle(m).boxShadow}`)
    await marqueur.evaluate((m) => {
      m.blur()
    })
    const choisi = await contour()
    // Retour au marqueur par le clavier : le focus y est « visible ».
    await marqueur.focus()
    await page.keyboard.press('Tab')
    await page.keyboard.press('Shift+Tab')
    await expect(marqueur).toBeFocused()
    await expect.poll(() => marqueur.evaluate((m) => m.matches(':focus-visible'))).toBe(true)
    await expect(marqueur).toHaveAttribute('aria-pressed', 'true')
    expect(await contour()).not.toBe(choisi)
  })
})
