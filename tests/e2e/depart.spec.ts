import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { rechercher } from '../../src/core/recherche'
import type { Brasserie } from '../../src/core/schema'
import { sansTuiles } from './reseau'

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
    await expect(page.getByTestId('depart').locator('legend')).toHaveText(
      'Point de départ : Brignais',
    )
    await page.getByTestId('autour-de-moi').click()
    await expect(page.getByTestId('depart').locator('legend')).toHaveText(
      'Point de départ : votre position',
    )
    const attendue = premiere({ lat: ANSE.latitude, lon: ANSE.longitude })
    expect(attendue).toBeDefined()
    await expect(page.getByTestId('liste').getByRole('listitem').first()).toContainText(
      attendue ?? "",
    )
    await expect(page.getByTestId('compte')).toContainText('de votre position')
  })

  test('la position ne part dans aucune requête', async ({ page }) => {
    const urls: string[] = []
    page.on('request', (r) => urls.push(r.url()))
    await page.goto('/')
    await page.getByTestId('autour-de-moi').click()
    await expect(page.getByTestId('compte')).toContainText('de votre position')
    await page.waitForTimeout(1500)
    const fuites = urls.filter((u) => /45[.,]93|4[.,]72/.test(u))
    expect(fuites).toEqual([])
    expect(urls.length).toBeGreaterThan(3)
  })

  test('l’écran dit ce qui reste dans le téléphone, et ce qui part', async ({ page }) => {
    await page.goto('/')
    const texte = page.getByTestId('confidentialite')
    await expect(texte).toContainText('elle n’est envoyée à personne')
    await expect(texte).toContainText('OpenStreetMap')
  })

  test('revenir à Brignais', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('autour-de-moi').click()
    await page.getByTestId('revenir-brignais').click()
    await expect(page.getByTestId('depart').locator('legend')).toHaveText(
      'Point de départ : Brignais',
    )
  })
})

test.describe('localisation refusée', () => {
  test.use({ permissions: [] })

  test('le dit, et l’application reste utilisable depuis Brignais', async ({ page }) => {
    await sansTuiles(page)
    await page.goto('/')
    await page.getByTestId('autour-de-moi').click()
    await expect(page.getByTestId('localisation-erreur')).toContainText('Rien n’a changé')
    await expect(page.getByTestId('depart').locator('legend')).toHaveText(
      'Point de départ : Brignais',
    )
    await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
  })
})

test('partir d’une commune des données, plus loin que Brignais', async ({ page }) => {
  await sansTuiles(page)
  await page.goto('/')
  await page.getByTestId('commune-depart').selectOption('Tarare')
  await expect(page.getByTestId('depart').locator('legend')).toHaveText(
    'Point de départ : Tarare (centre approché)',
  )
  await expect(page.getByTestId('liste').getByRole('listitem').first()).toContainText(
    'Ninkasi Fabriques',
  )
})
