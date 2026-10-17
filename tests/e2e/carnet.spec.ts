import { expect, test } from '@playwright/test'
import { ouvrirFiltres, sansTuiles } from './reseau'

/** S35 — mon carnet : les brasseries visitées, sur l'appareil. */
test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
  await page.clock.setFixedTime(new Date('2026-10-17T15:00:00'))
  await page.goto('/')
})

test('« J’y suis allé·e » note la visite du jour ; la ligne le dit ; un second toucher la retire', async ({ page }) => {
  const ligne = page.locator('button.ligne').first()
  const nom = (await ligne.getAttribute('data-nom')) ?? ''
  await ligne.click()
  const bouton = page.getByTestId('bouton-visite')
  await expect(bouton).toHaveText('J’y suis allé·e')
  await bouton.click()
  await expect(bouton).toHaveText('✓ Visitée le 17 octobre 2026 — retirer du carnet')
  // Lu par le lecteur d'écran, pas seulement une coche.
  await expect(page.locator(`button.ligne[data-nom="${nom}"]`)).toHaveAccessibleName(
    /\(visitée le 17 octobre 2026\)/,
  )
  await bouton.click()
  await expect(page.getByTestId('marque-visite')).toHaveCount(0)
})

test('le carnet se retrouve au retour', async ({ page }) => {
  await page.locator('button.ligne').first().click()
  await page.getByTestId('bouton-visite').click()
  await expect(page.getByTestId('marque-visite')).toHaveCount(1)
  // L'écriture IndexedDB est asynchrone : on boucle sur l'état voulu (§6ter).
  await expect
    .poll(async () => {
      await page.reload()
      return page.getByTestId('marque-visite').count()
    })
    .toBe(1)
})

test('« pas encore visitées » écarte les visitées ; le compte et le résumé le disent', async ({ page }) => {
  const ligne = page.locator('button.ligne').first()
  const nom = (await ligne.getAttribute('data-nom')) ?? ''
  const avant = await page.locator('button.ligne').count()
  await ligne.click()
  await page.getByTestId('bouton-visite').click()
  await ouvrirFiltres(page)
  await page.getByTestId('pas-visitees').check()
  await expect(page.locator('button.ligne')).toHaveCount(avant - 1)
  await expect(page.locator(`button.ligne[data-nom="${nom}"]`)).toHaveCount(0)
  await expect(page.getByTestId('compte')).toContainText('(pas encore visitées)')
  await expect(page.getByTestId('plus-de-filtres-resume')).toContainText('1 filtre actif')
})

test('« tout effacer » efface aussi le carnet', async ({ page }) => {
  await page.locator('button.ligne').first().click()
  await page.getByTestId('bouton-visite').click()
  await ouvrirFiltres(page)
  await page.getByTestId('stockage-details').locator('summary').click()
  await expect(page.getByTestId('stockage-texte')).toContainText(
    'carnet de visites (le nom et le jour, rien d’autre)',
  )
  await page.getByTestId('tout-effacer').click()
  await page.getByTestId('confirmer-effacer').click()
  await expect(page.getByTestId('marque-visite')).toHaveCount(0)
  await expect(page.getByTestId('pas-visitees')).toHaveAccessibleName(/\(0 visitée\)/)
})

test('deux onglets : une visite notée dans chacun, les deux restent (revue adverse S35)', async ({ context, page }) => {
  const autre = await context.newPage()
  await autre.goto('/')
  const noter = async (p: typeof page, rang: number) => {
    const ligne = p.locator('button.ligne').nth(rang)
    await ligne.click()
    await p.getByTestId('bouton-visite').click()
    await expect(p.getByTestId('bouton-visite')).toContainText('Visitée le')
    return (await ligne.getAttribute('data-nom')) ?? ''
  }
  const premiere = await noter(page, 0)
  // L'autre onglet, ouvert avant, change un réglage : il réécrit tout.
  await autre.getByTestId('rayon').fill('35')
  const seconde = await noter(autre, 1)
  const relu = await context.newPage()
  await relu.goto('/')
  for (const nom of [premiere, seconde]) {
    await expect(relu.locator(`button.ligne[data-nom="${nom}"]`).getByTestId('marque-visite')).toHaveCount(1)
  }
})

test('la date d’une visite ne part ni dans le signalement ni dans le partage (CA6)', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.locator('button.ligne').first().click()
  await page.getByTestId('bouton-visite').click()
  const signaler = await page.getByRole('link', { name: 'Signaler une erreur sur cette fiche' }).getAttribute('href')
  expect(decodeURIComponent(signaler ?? '')).not.toMatch(/2026-10-17|17 octobre|visit|carnet/i)
  // Sans menu de partage, le lien est copié : on lit ce qui part vraiment.
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'share', { value: undefined, configurable: true })
  })
  await page.getByTestId('bouton-partager').click()
  await expect(page.getByTestId('partage-etat')).toHaveText('Lien copié.')
  const copie = await page.evaluate(() => navigator.clipboard.readText())
  expect(decodeURIComponent(copie)).not.toMatch(/2026-10-17|17 octobre|visit|carnet/i)
})

test('tout visité : le compte dit que c’est le filtre « pas encore visitées » (revue adverse S35)', async ({ page }) => {
  await page.getByTestId('recherche').fill('caribrew')
  await page.locator('button.ligne').first().click()
  await page.getByTestId('bouton-visite').click()
  await ouvrirFiltres(page)
  await page.getByTestId('pas-visitees').check()
  await expect(page.getByTestId('compte')).toContainText('Toutes celles qui correspondent sont dans votre carnet.')
})
