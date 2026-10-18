import { type Page } from '@playwright/test'
import { expect, test } from './position'
import { readFileSync } from 'node:fs'
import type { Brasserie } from '../../src/core/schema'
import { sansTuiles, versLaCarte } from './reseau'

const DONNEES = JSON.parse(readFileSync('data/breweries.json', 'utf8')) as Brasserie[]

/**
 * La fiche est-elle **peinte**, et pas seulement présente ? `toBeVisible`
 * accepte un élément écrêté par un ancêtre qui défile (CLAUDE.md §1bis,
 * revue code S3). On demande donc ce qui est au centre de l'élément, après
 * l'avoir amené à l'écran.
 */
async function estPeint(page: Page, testId: string): Promise<boolean> {
  const el = page.getByTestId(testId)
  await el.scrollIntoViewIfNeeded()
  return el.evaluate((cible) => {
    const r = cible.getBoundingClientRect()
    const vu = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)
    return vu !== null && cible.contains(vu)
  })
}

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

    await expect.poll(() => estPeint(page, 'fiche-source')).toBe(true)
    // Le libellé lui-même, sans l'aide qui le suit (§1bis : `toContainText`
    // lirait aussi l'aide).
    await expect(fiche.getByTestId('fiche-confiance')).toHaveText(/^élevée/)
    await expect(fiche.getByTestId('fiche-avertissement')).toHaveText(
      // Caribrew n'a aucun numéro connu : pas d'« appelez » (revue métier S17).
      'La confiance ne garantit pas les horaires : lisez ce que dit la source. Aucun téléphone n’est encore connu pour les vérifier.',
    )
    await expect(fiche.getByTestId('fiche-precision')).toHaveText(
      'approximative : ce point n’est pas l’adresse de la brasserie, et peut en être à plusieurs kilomètres',
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

  // Caribrew a reçu son site le 18/10 (S266) : le cas « sans contact » se lit sur une fiche qui n'en a pas.
  test('sans contact sourcé, pas de numéro inventé', async ({ page }) => {
    await page.getByTestId('recherche').fill('krüger')
    await ligne(page, /Brasserie Krüger/).click()
    const contact = page.getByTestId('fiche').getByTestId('fiche-contact')
        await expect(contact.locator('p').first()).toHaveText('Téléphone : non renseigné.')
    // Aucun lien d'appel ni de site : seulement la recherche Untappd (S51).
    await expect(contact.getByRole('link')).toHaveCount(1)
    await expect(contact.getByRole('link')).toHaveAttribute('href', 'https://untappd.com/search?q=Brasserie+Kr%C3%BCger&type=brewery')
  })

  test('sans lien Untappd vérifié, la fiche offre une recherche, dite comme telle (S51)', async ({ page }) => {
    await page.getByTestId('recherche').fill('caribrew')
    await ligne(page, /Caribrew/).click()
    const chercher = page.getByTestId('fiche').getByTestId('chercher-untappd')
    await expect(chercher).toContainText('Chercher sur Untappd')
    await expect(chercher).toContainText('pas encore de lien vérifié')
    const lien = chercher.getByRole('link')
    await expect(lien).toHaveAttribute('target', '_blank')
    await expect(lien).toHaveAttribute('rel', /noreferrer/)
  })

  test('un numéro cité dans la source n’est pas contredit par « non renseigné »', async ({ page }) => {
    await page.getByTestId('recherche').fill('animus')
    await ligne(page, /Brasserie Animus/).click()
        await expect(page.getByTestId('fiche').getByTestId('fiche-contact').locator('p').first()).toHaveText(
      'Téléphone : pas de numéro vérifié. La source en cite un ci-dessus, non revérifié.',
    )
  })

  test('sans bière référencée, la fiche le dit', async ({ page }) => {
    // Une brasserie sans bière, prise dans les données réelles plutôt que
    // codée en dur : le test ne casse pas le jour où Caribrew en reçoit une
    // (revue code S5).
    const sansBiere = DONNEES.find((b) => b.beers.length === 0 && b.n === 'Caribrew')
      ?? DONNEES.find((b) => b.beers.length === 0)
    test.skip(sansBiere === undefined, 'toutes les brasseries ont des bières')
    const nom = (sansBiere as Brasserie).n
    await page.getByTestId('rayon').fill('100')
    await page.getByTestId('recherche').fill(nom)
    await ligne(page, new RegExp(nom.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))).first().click()
    await expect(page.getByTestId('fiche').getByTestId('fiche-bieres')).toHaveText(
      'Types de bière : non référencés pour l’instant. La recherche Untappd, plus haut, peut en montrer.',
    )
  })

  test('sans horaires vérifiés, la fiche renvoie à la source', async ({ page }) => {
    await page.getByTestId('recherche').fill('caribrew')
    await ligne(page, /Caribrew/).click()
    await expect(page.getByTestId('fiche').getByTestId('fiche-horaires')).toContainText(
      'aucun horaire vérifié jour par jour',
    )
    await expect(page.getByTestId('fiche').locator('table')).toHaveCount(0)
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

  test('choisie sur la carte, sa fiche s’ouvre et vient à l’écran', async ({ page }) => {
    await versLaCarte(page)
    await page.getByTestId('recherche').fill('oullins')
    await page.getByTestId('carte').locator('.marqueur:not(.marqueur-groupe)').click()
    // Sur téléphone, l'aperçu d'abord (S32).
    await page.getByTestId('apercu-voir-fiche').click()
    await expect(page.getByTestId('fiche')).toHaveCount(1)
    await expect.poll(() => page.getByTestId('fiche').evaluate((el) => {
      const r = el.getBoundingClientRect()
      return r.top < window.innerHeight && r.bottom > 0
    })).toBe(true)
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
