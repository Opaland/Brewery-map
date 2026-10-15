import { expect, test, type Page } from '@playwright/test'
import { sansTuiles } from './reseau'

const ligne = (page: Page, nom: RegExp) =>
  page.getByTestId('liste').getByRole('button', { name: nom })

test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
  await page.goto('/')
})

test.describe('la fiche détaillée (Cédric)', () => {
  test('dit d’où vient l’information, et avec quelle confiance', async ({ page }) => {
    await page.getByTestId('recherche').fill('caribrew')
    await ligne(page, /Caribrew/).click()
    const fiche = page.getByTestId('fiche')
    await expect(fiche).toBeVisible()

    const lien = fiche.getByTestId('fiche-source').getByRole('link')
    await expect(lien).toHaveText('montsdulyonnaistourisme.fr')
    await expect(lien).toHaveAttribute(
      'href',
      'https://www.montsdulyonnaistourisme.fr/degustation/microbrasserie-artisanale-caribrew-soucieu-en-jarrest/',
    )
    await expect(lien).toHaveAttribute('rel', 'noopener noreferrer')

    await expect(fiche.getByTestId('fiche-confiance')).toContainText('élevée')
    await expect(fiche.getByTestId('fiche-precision')).toHaveText(
      'approximative : centre de la commune, à environ 2 km près',
    )
    await expect(fiche.getByTestId('fiche-verification')).toHaveText('non renseignée')
    await expect(fiche).toContainText("4 Parc d'Activités d'Arbora, 69510 Soucieu-en-Jarrest")
  })

  test('la justification est titrée « Ce que dit la source »', async ({ page }) => {
    await page.getByTestId('recherche').fill('caribrew')
    await expect(ligne(page, /Caribrew/)).toContainText(
      'Ce que dit la source : Vente directe lun-ven 8h-18h',
    )
  })

  test('sans source, elle le dit, sans rien inventer', async ({ page }) => {
    await page.getByTestId('recherche').fill('oullins')
    await ligne(page, /Bulles d'Orge/).click()
    const fiche = page.getByTestId('fiche')
    await expect(fiche.getByTestId('fiche-source')).toHaveText(
      'Aucune source lue pour cette brasserie.',
    )
    await expect(fiche.getByTestId('fiche-source').getByRole('link')).toHaveCount(0)
    await expect(fiche.getByTestId('fiche-confiance')).toContainText('non évaluée')
  })

  test('un second toucher referme la fiche', async ({ page }) => {
    await page.getByTestId('recherche').fill('caribrew')
    const bouton = ligne(page, /Caribrew/)
    await bouton.click()
    await expect(page.getByTestId('fiche')).toBeVisible()
    await bouton.click()
    await expect(page.getByTestId('fiche')).toHaveCount(0)
    await expect(bouton).toHaveAttribute('aria-expanded', 'false')
  })
})
