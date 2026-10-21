import { attendreGarde, lireGarde } from './garde'
import { expect, test } from './position'
import { choisirCommune, ouvrirFiltres, sansTuiles } from './reseau'

/**
 * S330 — ce que l'écran disait encore de faux (revue adverse du 21/10 ;
 * revue globale du 19/10, A2, A12, A13, A17).
 */
const SUITE = /\/assets\/breweries-[^/]+\.js$/
const OSM = /brasseries-osm-.*\.js$/
/** Un point de la couche OpenStreetMap, sans fiche dans `data/` (S324). */
const POINT_OSM = 'Beerserk'

test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
})

test('sans la suite des fiches, l’écran ne donne ni « la plus proche » ni un nombre de départements', async ({ page }) => {
  await page.route(SUITE, (route) => route.abort())
  await page.route(OSM, (route) => route.abort())
  await page.goto('/')
  await expect(page.getByTestId('suite-absente')).toBeVisible()
  await expect(page.getByTestId('osm-absente')).toBeVisible()
  // Lille : rien à portée parmi les fiches de la région chargées.
  await choisirCommune(page, 'lille', 'Lille (59)')
  await expect(page.getByTestId('compte')).toContainText('Aucune brasserie')
  await expect(page.getByTestId('plus-proche')).toHaveCount(0)
  await expect(page.getByTestId('osm-absente')).not.toContainText(/\d+ départements/)
})

test('la couche OSM décochée, un lien vers un point OSM l’ouvre quand même', async ({ page }) => {
  await page.goto('/')
  await ouvrirFiltres(page)
  await page.getByTestId('avec-osm').uncheck()
  await attendreGarde(page, { avecOsm: false })
  await page.goto('about:blank')
  await page.goto(`/#fiche=${encodeURIComponent(POINT_OSM)}`)
  await expect(page.locator(`button.ligne[data-nom="${POINT_OSM}"]`)).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByTestId('fiche')).toBeVisible()
})

test('le stockage effacé mais pas le fond de carte : la phrase dit ce qui l’a été', async ({ page }) => {
  await page.addInitScript(() => {
    if (typeof caches !== 'undefined') caches.delete = () => Promise.reject(new Error('refus'))
  })
  await page.goto('/')
  await page.getByTestId('rayon').fill('80')
  await attendreGarde(page, { rayonKm: 80 })
  await ouvrirFiltres(page)
  await page.getByTestId('stockage-details').locator('summary').click()
  await page.getByTestId('tout-effacer').click()
  await page.getByTestId('confirmer-effacer').click()
  await expect(page.getByTestId('annonce')).toHaveText(
    'Favoris, carnet, notes et réglages effacés de cet appareil ; le fond de carte gardé n’a pas pu l’être : recommencez l’effacement.',
  )
  await expect(page.getByTestId('compte')).toContainText('30 km de Brignais')
})

test('ouvert par le raccourci « Mes favoris », « Tout effacer » ne regarde plus les seuls favoris', async ({ page }) => {
  // A13 : pendant une vue ouverte par le raccourci, l'application garde la
  // valeur de départ de « seulement mes favoris » ; vraie au départ, elle
  // était réécrite juste après l'effacement.
  await page.goto('/')
  await ouvrirFiltres(page)
  await page.getByTestId('favoris-seulement').check()
  await attendreGarde(page, { favorisSeulement: true })
  await page.goto('/?raccourci=favoris')
  await expect(page.getByTestId('favoris-seulement')).toBeChecked()
  await ouvrirFiltres(page)
  await page.getByTestId('stockage-details').locator('summary').click()
  await page.getByTestId('tout-effacer').click()
  await page.getByTestId('confirmer-effacer').click()
  await expect(page.getByTestId('annonce')).toHaveText(/effacés de cet appareil/)
  await expect(page.getByTestId('favoris-seulement')).not.toBeChecked()
  // Effacé veut dire absent : rien n'est réécrit par-dessus.
  await expect.poll(() => lireGarde(page)).toBeUndefined()
})

test('un lien de fiche collé dans l’onglet déjà ouvert ouvre la fiche', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('button.ligne').first()).toBeVisible()
  await page.evaluate(() => {
    window.location.hash = `#fiche=${encodeURIComponent('Tom & Co')}`
  })
  await expect(page.locator('button.ligne[data-nom="Tom & Co"]')).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByTestId('lien-partage-aide')).toBeVisible()
})
