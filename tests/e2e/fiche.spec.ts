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
    // La première ligne peinte : le centre de la boîte d'un texte coupé sur deux lignes peut tomber dans un blanc (S373).
    const r = cible.getClientRects().item(0) ?? cible.getBoundingClientRect()
    const vu = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)
    return vu !== null && cible.contains(vu)
  })
}

// La ligne elle-même : les boutons de la fiche portent aussi le nom (S295).
const ligne = (page: Page, nom: RegExp) =>
  page.getByTestId('liste').locator('button.ligne').filter({ has: page.locator('.ligne-nom', { hasText: nom }) })

test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
  await page.goto('/')
})

test.describe('la fiche détaillée (Cédric)', () => {
  test('dit d’où vient l’information, et avec quelle confiance', async ({ page }) => {
    await page.getByTestId('recherche').fill('chaussan')
    await ligne(page, /La Bière des Loups/).click()
    const fiche = page.getByTestId('fiche')
    await expect(fiche).toBeVisible()

    const lien = fiche.getByTestId('fiche-source').getByRole('link')
    // Suivi de « (nouvel onglet) », dit au seul lecteur d'écran (S295).
    await expect(lien).toHaveText('montsdulyonnaistourisme.fr (nouvel onglet)')
    // S308 : la provenance tient en une phrase.
    await expect(fiche.getByTestId('fiche-source')).toHaveText('Lu sur montsdulyonnaistourisme.fr (nouvel onglet) le 31 octobre 2026.')
    await expect(lien.locator('.lecteur-seul')).toHaveText(' (nouvel onglet)')
    await expect(lien).toHaveAttribute(
      'href',
      'https://www.montsdulyonnaistourisme.fr/degustation/la-biere-des-loups-chaussan/',
    )
    await expect(lien).toHaveAttribute('rel', 'noopener noreferrer')

    await expect.poll(() => estPeint(page, 'fiche-source')).toBe(true)
    await expect(fiche.getByTestId('fiche-confiance')).toHaveText('La source cite la vente ou l’accueil, avec des réserves ou des manques.')
    // Pas d'horaires : rien à prévenir sur eux (S308).
    await expect(fiche.getByTestId('fiche-avertissement')).toHaveCount(0)
    // S268 : sans position à l'adresse, au centre IGN de sa commune ; dit en
    // une phrase, avec la commune (S308).
    await expect(fiche.getByTestId('fiche-precision')).toHaveText('Sur la carte, le point est le centre de Chaussan, pas la brasserie.')
    await expect(fiche).toContainText("44 chemin de Chavagneux, 69440 Chaussan")
  })

  // La confiance porte sur la catégorie, pas sur les horaires (revue métier
  // S3) : dit en clair, peint, dès qu'il y a des horaires (revue adverse S308).
  test('avec des horaires, l’avertissement se voit sans rien déplier', async ({ page }) => {
    await page.getByTestId('rayon').fill('100')
    await page.getByTestId('recherche').fill('stéphanoise')
    await ligne(page, /Brasserie Stéphanoise/).click()
    const fiche = page.getByTestId('fiche')
    await expect(fiche.getByTestId('fiche-avertissement')).toHaveText(
      'Les horaires ne sont pas garantis : lisez ce que dit la source, et appelez en cas de doute.',
    )
    await expect.poll(() => estPeint(page, 'fiche-avertissement')).toBe(true)
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
    const fiche = page.getByTestId('fiche')
    // S308 : pas de partie « Joindre » vide ; ce qui manque est dit une fois,
    // avec deux recherches dites comme telles : Google Maps (S267), Untappd (S51).
    await expect(fiche.getByTestId('fiche-contact')).toHaveCount(0)
    const manque = fiche.getByTestId('fiche-manque')
    await expect(manque).toContainText('Pas encore dans la fiche : son adresse, son téléphone')
    await expect(manque).toContainText('vérifiez que c’est la bonne brasserie')
    const liens = manque.getByRole('link')
    await expect(liens).toHaveCount(2)
    await expect(liens.nth(0)).toHaveAttribute('href', 'https://www.google.com/maps/search/?api=1&query=Brasserie+Kr%C3%BCger+Solaize')
    await expect(liens.nth(0)).toHaveAttribute('rel', 'noopener noreferrer')
    await expect(liens.nth(1)).toHaveAttribute('href', 'https://untappd.com/search?q=Brasserie+Kr%C3%BCger&type=brewery')
    await expect(fiche.locator('a[href^="tel:"]')).toHaveCount(0)
  })

  // « Un numéro cité dans la source » : prouvé par tests/composants/contact.test.tsx depuis le 21/10
  // (plus aucune fiche réelle n'est dans ce cas).

  test('les mots du métier de la note sont expliqués (S295, Marie)', async ({ page }) => {
    await ligne(page, /Caribrew/).click()
    const lexique = page.getByTestId('fiche').getByTestId('fiche-lexique')
    await expect(lexique).toContainText('« brewpub »')
    await expect(lexique).toContainText('un bar ou un restaurant qui brasse lui-même la bière qu’il sert')
  })

  test('sans bière référencée, la fiche le dit une fois, avec une recherche Untappd dite comme telle (S51, S308)', async ({ page }) => {
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
    const fiche = page.getByTestId('fiche')
    await expect(fiche.getByTestId('fiche-bieres')).toHaveCount(0)
    await expect(fiche.getByTestId('fiche-manque')).toContainText('ses bières')
    const lien = fiche.getByTestId('chercher-untappd')
    await expect(lien).toHaveText(/^Ses bières sur Untappd/)
    await expect(lien).toHaveAttribute('href', /^https:\/\/untappd\.com\/search\?/)
    await expect(lien).toHaveAttribute('target', '_blank')
    await expect(lien).toHaveAttribute('rel', /noreferrer/)
  })

  test('sans horaires vérifiés, la fiche le dit une fois, sans tableau', async ({ page }) => {
    await page.getByTestId('recherche').fill('chaussan')
    await ligne(page, /La Bière des Loups/).click()
    await expect(page.getByTestId('fiche').getByTestId('fiche-horaires')).toHaveCount(0)
    await expect(page.getByTestId('fiche').getByTestId('fiche-manque')).toContainText('ses horaires')
    await expect(page.getByTestId('fiche').locator('table')).toHaveCount(0)
  })

  test('sans source, elle le dit, sans rien inventer', async ({ page }) => {
    await page.getByTestId('recherche').fill('oullins')
    await ligne(page, /Bulles d'Orge/).click()
    const fiche = page.getByTestId('fiche')
    // Et dit à la brasserie quoi envoyer (S295).
    await expect(fiche.getByTestId('fiche-source')).toHaveText(
      'Source : aucune pour l’instant. Si c’est votre brasserie, envoyez le lien de votre site par « Signaler une erreur », plus bas.',
    )
    await expect(fiche.getByTestId('fiche-source').getByRole('link')).toHaveCount(0)
    await expect(fiche.getByTestId('fiche-confiance')).toHaveText('Rien n’établit encore ce qu’on peut y faire.')
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
