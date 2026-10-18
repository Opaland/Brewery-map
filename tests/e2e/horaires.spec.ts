import { expect, test } from './position'
import { sansTuiles } from './reseau'

/**
 * S295, Hugo : l'état « maintenant » d'une fiche restée ouverte suit
 * l'heure ; quand c'est fermé, la fiche dit quand ça rouvre (la fiche face
 * à la concurrence, RF3). Brasserie Stéphanoise : vente vendredi et samedi,
 * 14 h – 18 h 30, avec une remarque.
 */
test('une fiche restée ouverte passe d’« ouvert » à « fermé » à l’heure dite', async ({ page }) => {
  await sansTuiles(page)
  // Vendredi 16/10, 18 h 29 à Paris.
  await page.clock.install({ time: new Date('2026-10-16T16:29:00Z') })
  await page.goto('/')
  await page.getByTestId('recherche').fill('stéphanoise')
  await page.locator('button.ligne', { hasText: 'Brasserie Stéphanoise' }).click()
  const etat = page.getByTestId('horaires-maintenant')
  await expect(etat).toContainText('À 18 h 29 (heure de Paris), vente : ouvert jusqu’à 18 h 30')
  // La ligne le dit aussi, sans ouvrir la fiche (S295, Hugo).
  const surLaLigne = page.locator('button.ligne', { hasText: 'Brasserie Stéphanoise' }).getByTestId('ligne-ouvert')
  await expect(surLaLigne).toHaveText('Vente ouverte maintenant, sous réserve')
  await page.clock.runFor('02:00')
  await expect(surLaLigne).toHaveText('Vente fermée maintenant')
  await expect(etat).toContainText('À 18 h 31 (heure de Paris), vente : fermé')
  // Et quand ça rouvre, en tête de fiche comme dans le tableau (RF3).
  await expect(etat).toContainText('Prochaine ouverture : demain à 14 h, sous réserve.')
  await expect(page.getByTestId('en-bref-maintenant')).toHaveText(
    'Vente : fermé, d’après les horaires publiés. Prochaine ouverture : demain à 14 h, sous réserve.',
  )
})

test('« En bref » dit ce qu’on peut y faire, et une adresse qui n’est que la commune', async ({ page }) => {
  await sansTuiles(page)
  await page.goto('/')
  await page.getByTestId('recherche').fill('oullins')
  await page.locator('button.ligne', { hasText: 'Bulles d’Orge' }).or(page.locator('button.ligne', { hasText: "Bulles d'Orge" })).first().click()
  const bref = page.getByTestId('fiche-en-bref')
  await expect(bref.getByTestId('en-bref-categorie')).toHaveText('À confirmer')
  await expect(bref.getByTestId('en-bref-ou')).toHaveText('Adresse non connue : seulement la commune, Oullins.')
  await expect(bref.getByTestId('en-bref-maintenant')).toHaveText('Aucun horaire vérifié : voyez « Ce que dit la source ».')
  // « En bref » vient avant tout le reste de la fiche, et avant la note pour soi.
  const ordre = await page.getByTestId('fiche').evaluate((f) =>
    ['fiche-en-bref', 'fiche-contact', 'ma-note'].map((id) => [...f.querySelectorAll('[data-testid]')].findIndex((e) => e.getAttribute('data-testid') === id)),
  )
  expect(ordre).toEqual([...ordre].sort((a, b) => a - b))
  expect(ordre.every((i) => i >= 0)).toBe(true)
})

