import { expect, test } from '@playwright/test'
import { choisirCommune, sansTuiles, versLaCarte } from './reseau'

/** S26 — corrections de l'audit applicatif (docs/AUDIT.md). */
test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
})

for (const largeur of [320, 412]) {
  test(`M1 — texte à 200 %, ${String(largeur)} px : aucun défilement horizontal (WCAG 1.4.4, 1.4.10)`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: largeur, height: 800 })
    // Comme l'audit : la taille de texte doublée avant le premier rendu,
    // l'interface étant en rem ; la liste par défaut, fiches OSM comprises.
    await page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        document.documentElement.style.fontSize = '200%'
      })
    })
    await page.goto('/')
    await expect(page.getByTestId('badge-osm').first()).toBeAttached()
    // Contre la largeur de l'écran, pas `innerWidth` : sur téléphone, le
    // navigateur élargit la fenêtre de mise en page au contenu (544 px pour
    // 320), et la différence restait nulle — test faux (CLAUDE.md §1bis).
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
      .toBeLessThanOrEqual(largeur)
  })
}

test('M2 — depuis Paris, « Lyon » propose Lyon sans toucher « toute la France »', async ({ page }) => {
  await page.goto('/')
  await choisirCommune(page, 'paris', 'Paris (75)')
  await page.getByTestId('commune-depart').fill('lyon')
  await expect(page.getByRole('option', { name: 'Lyon (69)', exact: true })).toBeVisible()
})

test('m3 — zoomer à fond ne demande pas de tuile plus fine que le zoom 14 (« à quelques km près »)', async ({
  page,
}) => {
  const niveaux: number[] = []
  page.on('request', (r) => {
    const m = /tile\.openstreetmap\.org\/(\d+)\//.exec(r.url())
    if (m?.[1] !== undefined) niveaux.push(Number(m[1]))
  })
  await page.goto('/')
  await versLaCarte(page)
  const zoomer = page.getByRole('button', { name: 'Zoomer', exact: true })
  for (let i = 0; i < 10; i++) {
    await zoomer.click()
    await page.waitForTimeout(150)
  }
  await page.waitForTimeout(800)
  expect(niveaux.length).toBeGreaterThan(0)
  expect(Math.max(...niveaux)).toBeLessThanOrEqual(14)
})

test('m5 — un lien partagé a son titre et sa description ; l’icône répond', async ({ page, request }) => {
  await page.goto('/')
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Mousse de Poche/)
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /sans traceur/)
  expect((await request.get('/favicon.ico')).status()).toBe(200)
})

test.describe('thème sombre', () => {
  test.use({ colorScheme: 'dark' })

  test('m2 — la pastille « Plusieurs brasseries » de la légende a un bord clair (WCAG 1.4.11)', async ({ page }) => {
    await page.goto('/')
    await versLaCarte(page)
    const pastille = page.getByTestId('legende-carte').locator('.pastille-groupe')
    // Le fond #1e2b23 sur le papier sombre faisait 1,17:1 ; le bord blanc, bien plus.
    await expect(pastille).toHaveCSS('border-top-color', 'rgb(255, 255, 255)')
    await expect(pastille).toHaveCSS('border-top-width', '2px')
  })
})
