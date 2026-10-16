import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { rechercher } from '../../src/core/recherche'
import type { Brasserie } from '../../src/core/schema'
import { choisirCommune, sansTuiles, TUILE_OSM, versLaCarte } from './reseau'

const DONNEES = JSON.parse(readFileSync('data/breweries.json', 'utf8')) as Brasserie[]
/** Une position d'essai à Anse : loin de Brignais, proche de brasseries réelles. */
const ANSE = { latitude: 45.9367, longitude: 4.7208 }

const premiere = (origine: { lat: number; lon: number }) =>
  rechercher(DONNEES, { origine, rayonKm: 30, texte: "", categories: [0, 1, 2, 3] }).at(0)?.brasserie.n

test.describe('« autour de moi » (Léa)', () => {
  test.use({ geolocation: ANSE, permissions: ['geolocation'] })

  test.beforeEach(async ({ page }) => {
    await sansTuiles(page)
  })

  test('rien n’est demandé au chargement ; tout part du toucher du bouton', async ({ page }) => {
    await page.goto('/')
    // Rien de choisi : le bloc propose de commencer (demande de Cédric du 16/10).
    await expect(page.getByTestId('depart').locator('legend')).toHaveText('Par où commencer ?')
    await page.getByTestId('autour-de-moi').click()
    // La commune la plus proche, calculée dans le téléphone (S21).
    await expect(page.getByTestId('depart').locator('legend')).toHaveText(
      'Point de départ : votre position (près de Anse)',
    )
    const attendue = premiere({ lat: ANSE.latitude, lon: ANSE.longitude })
    expect(attendue).toBeDefined()
    await expect(page.getByTestId('liste').getByRole('listitem').first()).toContainText(
      attendue ?? "",
    )
    await expect(page.getByTestId('compte')).toContainText('de votre position')
  })

  /*
    Liste blanche plutôt que recherche des chiffres (revue code S8 : la regex
    sur « 45.93 » ne pouvait voir ni une tuile ni une fuite écrite autrement).
    Tout ce qui part est soit l'application, soit une tuile OSM z/x/y sans
    paramètre, au zoom 14 au plus — ce que dit le texte de confidentialité.
  */
  test('après « autour de moi », rien ne part hors l’application et les tuiles', async ({
    page,
  }) => {
    const urls: string[] = []
    page.on('request', (r) => urls.push(r.url()))
    await page.goto('/')
    await page.getByTestId('autour-de-moi').click()
    await expect(page.getByTestId('compte')).toContainText('de votre position')
    // La carte, chargée à l'approche (S20), demande ses tuiles autour de la
    // position : le test doit l'y voir faire.
    await versLaCarte(page)
    await page.waitForTimeout(1500)
    const tiers = urls.filter(
      (u) => !u.startsWith('http://localhost:4173/') && !u.startsWith('data:'),
    )
    const horsTuiles = tiers.filter((u) => !TUILE_OSM.test(u))
    expect(horsTuiles).toEqual([])
    const zooms = tiers.map((u) => Number(new URL(u).pathname.split('/')[1]))
    expect(zooms.length).toBeGreaterThan(0)
    expect(Math.max(...zooms)).toBeLessThanOrEqual(14)
  })

  test('l’écran dit ce qui reste dans le téléphone, et ce qui part', async ({ page }) => {
    await page.goto('/')
    const texte = page.getByTestId('confidentialite')
    await expect(texte).toContainText('vos coordonnées ne sont envoyées à personne')
    await expect(texte).toContainText('la zone où vous êtes, à quelques kilomètres près')
    // Lu avant le geste : le texte précède le bouton dans le document.
    const avant = await page.evaluate(() => {
      const t = document.querySelector('[data-testid="confidentialite"]')
      const b = document.querySelector('[data-testid="autour-de-moi"]')
      return t !== null && b !== null && (t.compareDocumentPosition(b) & 4) !== 0
    })
    expect(avant).toBe(true)
  })

  test('revenir à Brignais', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('autour-de-moi').click()
    await page.getByTestId('revenir-brignais').click()
    await expect(page.getByTestId('depart').locator('legend')).toHaveText('Par où commencer ?')
  })
})

test.describe('localisation refusée', () => {
  test.use({ permissions: [] })

  test('le dit, et l’application reste utilisable depuis Brignais', async ({ page }) => {
    await sansTuiles(page)
    await page.goto('/')
    await page.getByTestId('autour-de-moi').click()
    await expect(page.getByTestId('localisation-erreur')).toContainText('Rien n’a changé')
    // Comment réautoriser, dit tout de suite (retour de Cédric du 16/10).
    await expect(page.getByTestId('localisation-erreur')).toContainText('réglages du navigateur')
    await expect(page.getByTestId('depart').locator('legend')).toHaveText('Par où commencer ?')
    await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
  })
})

test('partir d’une commune, plus loin que Brignais', async ({ page }) => {
  await sansTuiles(page)
  await page.goto('/')
  await choisirCommune(page, 'tarare', 'Tarare (69)')
  await expect(page.getByTestId('depart').locator('legend')).toHaveText(
    'Point de départ : Tarare (69)',
  )
  await expect(page.getByTestId('liste').getByRole('listitem').first()).toContainText(
    'Ninkasi Fabriques',
  )
})
