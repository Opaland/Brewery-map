import { expect, test } from './position'
import { ouvrirFiltres, sansTuiles } from './reseau'

/**
 * S70, Hugo : « ouvertes ce week-end » ne garde que les brasseries dont les
 * horaires publiés ouvrent samedi ou dimanche, et dit combien de fiches il
 * peut juger. Brasserie Stéphanoise : vente le samedi, 14 h – 18 h 30. La
 * Bière des Loups : aucun horaire publié.
 */
test('le filtre garde une brasserie ouverte samedi, écarte une fiche sans horaires, et le dit', async ({ page }) => {
  await sansTuiles(page)
  // Lundi 19/10, midi à Paris : le week-end à venir est celui du 24-25/10.
  await page.clock.setFixedTime(new Date('2026-10-19T10:00:00Z'))
  await page.goto('/')
  await ouvrirFiltres(page)
  await expect(page.getByTestId('week-end-aide')).toHaveText(/^Seules \d+ brasseries sur \d+ disent leurs horaires du week-end\.$/)
  const recherche = page.getByTestId('recherche')
  await recherche.fill('stéphanoise')
  await expect(page.locator('button.ligne', { hasText: 'Brasserie Stéphanoise' })).toHaveCount(1)
  await page.getByTestId('week-end').check()
  await expect(page.locator('button.ligne', { hasText: 'Brasserie Stéphanoise' })).toHaveCount(1)
  await recherche.fill('bière des loups')
  await expect(page.locator('button.ligne')).toHaveCount(0)
  // La liste vide dit la cause, et comment en sortir (revue adverse S70).
  await expect(page.getByTestId('compte')).toContainText('n’annonce d’ouverture ce week-end dans ses horaires publiés. Décochez « Ouvertes ce week-end »')
  await page.getByTestId('week-end').uncheck()
  await expect(page.locator('button.ligne', { hasText: 'La Bière des Loups' })).toHaveCount(1)
})

/** S303 (A11) : le week-end n'est accusé que s'il vide la liste à lui seul. */
test('une liste vide pour une autre raison ne parle pas du week-end', async ({ page }) => {
  await sansTuiles(page)
  await page.goto('/')
  await ouvrirFiltres(page)
  await page.getByTestId('week-end').check()
  await page.getByTestId('recherche').fill('zzzzqx')
  await expect(page.locator('button.ligne')).toHaveCount(0)
  await expect(page.getByTestId('compte')).toHaveText(/Aucune brasserie/)
  await expect(page.getByTestId('compte')).not.toContainText('week-end')
})

/** S303 (A10) : les cases longues prennent la ligne entière de la grille. */
test('les cases longues (couche OSM, week-end) prennent toute la largeur', async ({ page }) => {
  await sansTuiles(page)
  await page.goto('/')
  await ouvrirFiltres(page)
  await expect(page.getByTestId('case-osm')).toBeVisible()
  for (const cas of [page.getByTestId('case-osm'), page.getByTestId('filtre-week-end')]) {
    await expect
      .poll(() =>
        cas.evaluate((c) => {
          const grille = c.closest('fieldset')
          if (grille === null) return null
          const g = getComputedStyle(grille)
          const interieur =
            grille.getBoundingClientRect().width -
            parseFloat(g.paddingLeft) -
            parseFloat(g.paddingRight) -
            parseFloat(g.borderLeftWidth) -
            parseFloat(g.borderRightWidth)
          return Math.abs(c.getBoundingClientRect().width - interieur) <= 1
        }),
      )
      .toBe(true)
  }
})
