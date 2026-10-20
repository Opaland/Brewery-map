import { type Page } from '@playwright/test'
import { expect, test } from './position'
import { sansTuiles } from './reseau'

/**
 * S50 — l'interface en anglais, pour une visiteuse étrangère (epic E10).
 * Les fiches restent des citations françaises de leurs sources ; tout le
 * reste parle la langue du navigateur.
 */

/** Ce qui est peint, sans les notes citées (françaises par nature). */
async function texteSansCitations(page: Page, testId: string): Promise<string> {
  return page.getByTestId(testId).evaluate((el) => {
    const copie = el.cloneNode(true) as HTMLElement
    copie.querySelectorAll('.ligne-note').forEach((n) => {
      n.remove()
    })
    return copie.innerText
  })
}

/** Des mots français d'interface, qui ne doivent pas rester en anglais. */
const FRANCAIS = /\b(vous|votre|vos|les|des|une|pas|avec|sans|pour|sur|dans|brasseries?|fiche|carte)\b|[éèàùç]/i

test.describe('navigateur en anglais', () => {
  test.use({ locale: 'en-US' })

  test.beforeEach(async ({ page }) => {
    await sansTuiles(page)
    await page.goto('/')
  })

  test('l’écran principal parle anglais', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page).toHaveTitle('Mousse de Poche — craft breweries')
    await expect(page.getByTestId('autour-de-moi')).toHaveText(/Around me/)
    await expect(page.getByTestId('compte')).toContainText(/breweries? /)
  })

  test('une fiche parle anglais, hors citations de la source', async ({ page }) => {
    await page.locator('button.ligne').first().click()
    const fiche = page.getByTestId('fiche')
    await expect(fiche).toContainText('Get there')
    // La confiance dite en phrase anglaise (S320), une des quatre.
    await expect(fiche.getByTestId('fiche-confiance')).toHaveText(
      /^(The source describes precisely what you can do there.|The source mentions sales or visits, with caveats or gaps.|What you can do there is likely, not established by the source: .* before you go.|Nothing establishes yet what you can do there.)$/,
    )
    const texte = await texteSansCitations(page, 'fiche')
    // Le nom de la brasserie et sa commune sont des noms propres.
    const nom = (await page.locator('button.ligne').first().getAttribute('data-nom')) ?? ''
    const reste = texte.split(nom).join('').replace(/\b(Brignais|Mousse de Poche)\b/g, '')
    expect(reste.match(FRANCAIS)).toBeNull()
  })

  test('une fiche OpenStreetMap dit en anglais ce qui n’est pas vérifié', async ({ page }) => {
    const ligne = page.locator('button.ligne', { hasText: 'Found on OpenStreetMap' }).first()
    await ligne.click()
    await expect(page.getByTestId('fiche-note-osm')).toContainText('Found on OpenStreetMap (a collaborative map)')
  })

  test('l’attribution de la carte suit la langue (revue adverse S50)', async ({ page }) => {
    await page.getByTestId('carte-en-attente').scrollIntoViewIfNeeded()
    await expect(page.locator('.maplibregl-ctrl-attrib')).toContainText('OpenStreetMap contributors')
  })
})

test.describe('navigateur dans une autre langue', () => {
  test.use({ locale: 'de-DE' })

  test('une langue qu’on ne parle pas donne le français', async ({ page }) => {
    await sansTuiles(page)
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
    await expect(page.getByTestId('autour-de-moi')).toHaveText(/Autour de moi/)
  })
})
