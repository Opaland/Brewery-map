import { expect, test } from './position'
import { sansTuiles, versLaCarte } from './reseau'

/**
 * S274 (repris de Sentiers) : à 899 px, l'écran d'un téléphone ; à 900 px,
 * celui d'un ordinateur. La mise en page (CSS), le repli des filtres
 * (`App.tsx`) et le bouton « Carte » changent au même pixel.
 */
for (const largeur of [899, 900]) {
  const ordinateur = largeur >= 900
  test.describe(`${String(largeur)} px`, () => {
    test.use({ viewport: { width: largeur, height: 800 }, isMobile: false, hasTouch: false })

    test(ordinateur ? 'filtres ouverts, carte à côté de la liste' : 'filtres repliés, carte sous la liste', async ({ page }) => {
      await sansTuiles(page)
      await page.goto('/')
      await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()

      await expect(page.getByTestId('plus-de-filtres')).toHaveJSProperty('open', ordinateur)
      if (ordinateur) await expect(page.getByTestId('vers-carte')).toBeHidden()
      else await expect(page.getByTestId('vers-carte')).toBeVisible()

      // Comparées l'une à l'autre, les deux colonnes, mesurées après coup.
      await expect
        .poll(() =>
          page.evaluate(() => {
            const l = document.querySelector('.liste-conteneur')?.getBoundingClientRect()
            const c = document.querySelector('.carte-conteneur')?.getBoundingClientRect()
            if (l === undefined || c === undefined) return 'absentes'
            if (c.left >= l.right - 1) return 'à côté'
            if (c.top >= l.bottom - 1) return 'dessous'
            return 'chevauchées'
          }),
        )
        .toBe(ordinateur ? 'à côté' : 'dessous')
    })

    // `Carte.tsx` (revue adverse S274) : un marqueur touché montre un aperçu
    // sur téléphone ; sur ordinateur, il ouvre la ligne de la liste, à côté.
    test(ordinateur ? 'un marqueur ouvre la ligne' : 'un marqueur montre l’aperçu', async ({ page }) => {
      await sansTuiles(page)
      await page.goto('/')
      await page.getByTestId('recherche').fill('oullins')
      await versLaCarte(page)
      const point = page.getByTestId('carte').locator('.marqueur:not(.marqueur-groupe)')
      await expect(point).toHaveCount(1)
      await point.click()
      if (ordinateur) {
        await expect(page.locator('button.ligne[aria-expanded="true"]')).toHaveCount(1)
        await expect(page.getByTestId('apercu-carte')).toHaveCount(0)
      } else {
        await expect(page.getByTestId('apercu-carte')).toContainText("Bulles d'Orge")
        await expect(page.locator('button.ligne[aria-expanded="true"]')).toHaveCount(0)
      }
    })
  })
}
