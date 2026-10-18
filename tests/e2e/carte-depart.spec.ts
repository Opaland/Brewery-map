import { expect, test } from './position'
import { sansTuiles, versLaCarte } from './reseau'

/** S39 — le point de départ reste visible au-dessus des groupes. */
test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
  await page.goto('/')
  await versLaCarte(page)
  await expect.poll(() => page.locator('.maplibregl-marker.marqueur').count()).toBeGreaterThan(0)
})

test('depuis Brignais, en zoomant, le repère de départ reste peint par-dessus les marqueurs', async ({ page }) => {
  const repere = page.getByTestId('repere-depart')
  await expect(repere).toBeAttached()
  // Mesuré le 17/10 : au zoom d'ouverture + 2, un marqueur de Brignais
  // recouvre le repère (le constat du BACKLOG du 15/10 était au zoom
  // d'ouverture ; la carte a changé de cadrage depuis).
  for (let i = 0; i < 2; i++) {
    await page.getByRole('button', { name: 'Zoomer', exact: true }).click()
    // La carte doit être immobile : pendant le zoom, rien ne recouvre encore
    // le repère, et un `expect.poll` y trouvait un faux vert (§1bis).
    await page.waitForTimeout(800)
  }
  // Ce qui est peint au centre du repère (CLAUDE.md §1bis).
  // Le repère ne capte pas le toucher (`pointer-events: none`), ce
  // qu'`elementFromPoint` ignore : on le rend touchable le temps de lire ce
  // qui est peint au-dessus, puis on le remet.
  const peint = await repere.evaluate((r) => {
    const e = r as HTMLElement
    e.style.pointerEvents = 'auto'
    const b = e.getBoundingClientRect()
    const vu = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2)
    e.style.pointerEvents = ''
    return vu !== null && (vu === e || e.contains(vu))
  })
  expect(peint).toBe(true)
})

test('le repère ne capte pas le toucher : un marqueur dessous reste choisissable', async ({ page }) => {
  const style = await page.getByTestId('repere-depart').evaluate((r) => getComputedStyle(r).pointerEvents)
  expect(style).toBe('none')
})

test.describe('une brasserie choisie dans un groupe (S40)', () => {
  test('le groupe qui la contient le montre, et le dit au lecteur d’écran', async ({ page }) => {
    // « fontaines-sur-saone » (« fontaines » trouve aussi Grandchamp-des-
    // Fontaines depuis S271) : deux brasseries aux mêmes coordonnées, un groupe « 2 »
    // à tout zoom (decouverte.spec.ts).
    await page.getByTestId('recherche').fill('fontaines-sur-saone')
    await expect(page.locator('button.ligne')).toHaveCount(2)
    const nom = (await page.locator('button.ligne').nth(1).getAttribute('data-nom')) ?? ''
    await page.locator('button.ligne').nth(1).click()
    await versLaCarte(page)
    const groupe = page.getByTestId('carte').locator('.marqueur-groupe.contient-choisie')
    await expect(groupe).toHaveCount(1)
    await expect(groupe).toHaveAttribute('aria-label', `2 brasseries ici, voir le détail, dont « ${nom} », choisie`)
    // Refermée, plus rien n'est marqué.
    await page.locator(`button.ligne[data-nom="${nom}"]`).click()
    await expect(page.getByTestId('carte').locator('.contient-choisie')).toHaveCount(0)
  })
})

test('le repère reste sous les contrôles de zoom et l’attribution (revue adverse S39)', async ({ page }) => {
  const z = await page.evaluate(() => {
    const n = (s: string) => Number(getComputedStyle(document.querySelector(s) as Element).zIndex)
    return {
      repere: n('[data-testid="repere-depart"]'),
      zoom: n('.maplibregl-ctrl-top-right'),
      attribution: n('.maplibregl-ctrl-bottom-right'),
    }
  })
  expect(z.repere).toBeGreaterThan(0)
  expect(z.repere).toBeLessThan(z.zoom)
  expect(z.repere).toBeLessThan(z.attribution)
})
