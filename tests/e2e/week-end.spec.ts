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
  await expect(page.getByTestId('compte')).toContainText('n’ouvre ce week-end d’après les horaires publiés. Décochez « Ouvertes ce week-end »')
  await page.getByTestId('week-end').uncheck()
  await expect(page.locator('button.ligne', { hasText: 'La Bière des Loups' })).toHaveCount(1)
})
