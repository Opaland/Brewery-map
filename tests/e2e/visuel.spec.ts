import { type Page } from '@playwright/test'
import { expect, test } from './position'
import { ouvrirFiltres, sansTuiles, versLaCarte } from './reseau'

/**
 * S240 : ce qui est peint, sur cinq écrans figés. Hors de la porte
 * (`PW_VISUEL=1` seulement, voir playwright.config.ts).
 *
 * Les références sont celles du runner CI (workflow « Références
 * visuelles ») : produites dans le conteneur, elles différaient d'environ
 * 10 % des pixels en CI (polices, lissage ; mesuré le 17/10). En local, ce
 * test échoue donc par construction : on le lance en CI.
 *
 * Figé : heure posée (« ouvert maintenant » et la date du carnet en
 * dépendent), thème clair, animations coupées, aucune tuile.
 */
const INSTANT = new Date('2026-10-17T15:00:00+02:00')

// Comparaison exacte : la tolérance par défaut de Playwright (0,2 d'écart de
// couleur par pixel) laissait passer une couleur de texte changée
// (#5a6b5d → #5a6b6d, vu vert). Les références venant de la même machine
// que la comparaison, aucune tolérance n'est nécessaire (S240, §2).
const EXACT = { threshold: 0, maxDiffPixels: 0 }

async function ouvrir(page: Page): Promise<void> {
  await page.clock.setFixedTime(INSTANT)
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' })
  await sansTuiles(page)
  await page.goto('/')
  await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
  await page.evaluate(() => document.fonts.ready)
}

test('la liste', async ({ page }) => {
  await ouvrir(page)
  await expect(page).toHaveScreenshot('liste.png', EXACT)
})

test('une fiche ouverte', async ({ page }) => {
  await ouvrir(page)
  const ligneCaribrew = page.locator('button.ligne', { hasText: 'Caribrew' })
  await ligneCaribrew.click()
  await expect(ligneCaribrew).toHaveAttribute('aria-expanded', 'true')
  // L'écran tel que la personne le voit, fiche en haut : capturer l'élément
  // seul le faisait défiler sous le compte collant, qui le coupait au milieu.
  await ligneCaribrew.evaluate((e) => {
    e.scrollIntoView({ block: 'start' })
  })
  await expect(page).toHaveScreenshot('fiche.png', EXACT)
})

test('la carte sans tuiles', async ({ page }) => {
  await ouvrir(page)
  await versLaCarte(page)
  const carte = page.getByTestId('carte')
  await expect(carte.locator('.maplibregl-marker').first()).toBeVisible()
  await expect(carte).toHaveScreenshot('carte.png', EXACT)
})

test('le carnet', async ({ page }) => {
  await ouvrir(page)
  await page.locator('button.ligne').first().click()
  await page.getByTestId('bouton-visite').click()
  await page.getByTestId('bouton-favori').click()
  await ouvrirFiltres(page)
  await expect(page.getByTestId('mes-favoris')).toContainText('mes favoris (1)')
  await expect(page.getByTestId('mes-favoris')).toHaveScreenshot('carnet.png', EXACT)
})

test('la liste à 200 % de texte', async ({ page }) => {
  await ouvrir(page)
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' })
  await expect(page).toHaveScreenshot('liste-200.png', EXACT)
})
