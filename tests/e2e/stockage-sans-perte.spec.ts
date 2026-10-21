import { type Page } from '@playwright/test'
import { attendreGarde, lireGarde } from './garde'
import { expect, test } from './position'
import { ouvrirFiltres, sansTuiles } from './reseau'

/** S333 — ce qu'on garde sur l'appareil, sans perte (revue globale du 19/10). */
const OSM = /brasseries-osm-.*\.js$/

test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
})

/** Écrit la garde telle quelle, comme une version de l'application l'aurait fait. */
const ecrireGarde = (page: Page, valeur: unknown) =>
  page.evaluate(
    (v) =>
      new Promise<void>((resolve, reject) => {
        const req = indexedDB.open('mousse-de-poche', 1)
        req.onerror = () => {
          reject(new Error('ouverture'))
        }
        req.onsuccess = () => {
          const tx = req.result.transaction('reglages', 'readwrite')
          tx.objectStore('reglages').put(v, 'preferences')
          tx.oncomplete = () => {
            req.result.close()
            resolve()
          }
        }
      }),
    valeur,
  )

test('A15 : deux onglets, l’un change le rayon, l’autre le thème : la garde garde les deux', async ({ page, context }) => {
  await page.goto('/')
  await page.getByTestId('rayon').fill('40')
  await attendreGarde(page, { rayonKm: 40 })
  const autre = await context.newPage()
  await sansTuiles(autre)
  await autre.goto('/')
  await expect(autre.getByTestId('compte')).toContainText('40 km')
  // Le premier onglet change le rayon ; le second, ouvert avant, le thème.
  await page.getByTestId('rayon').fill('80')
  await attendreGarde(page, { rayonKm: 80 })
  await ouvrirFiltres(autre)
  await autre.getByTestId('theme-sombre').check()
  await attendreGarde(page, { theme: 'sombre' })
  expect(await lireGarde(page)).toMatchObject({ rayonKm: 80, theme: 'sombre' })
})

test('A16 : une visite et une note sur une brasserie disparue sont dites, et retirables', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('button.ligne').first()).toBeVisible()
  await ecrireGarde(page, {
    version: 1,
    visites: [{ nom: 'Brasserie disparue', date: '2026-10-01' }],
    notes: [{ nom: 'Brasserie disparue', texte: 'Fermée ?' }],
  })
  await page.reload()
  await ouvrirFiltres(page)
  await expect(page.getByTestId('carnet-orphelins')).toContainText('Brasserie disparue')
  await page.getByTestId('retirer-carnet-orphelins').click()
  await expect(page.getByTestId('carnet-orphelins')).toHaveCount(0)
  await attendreGarde(page, { visites: [], notes: [] })
})

test('A14 : la couche OSM arrivée après l’attente est prise sans recharger', async ({ page }) => {
  await page.route(OSM, async (route) => {
    // La réponse retardée au-delà des 3 s qu'attend `main.tsx` : c'est le cas mesuré, pas une attente du test.
    await new Promise((ok) => setTimeout(ok, 4500))
    await route.continue()
  })
  await page.goto('/')
  // En attendant : elle arrive, pas « n'a pas pu se charger » (revue Bernard S333).
  await expect(page.getByTestId('osm-attente')).toBeVisible()
  await expect(page.getByTestId('osm-absente')).toHaveCount(0)
  await page.getByTestId('recherche').fill('Beerserk')
  await expect(page.locator('button.ligne[data-nom="Beerserk"]')).toHaveCount(1, { timeout: 15000 })
  await expect(page.getByTestId('osm-attente')).toHaveCount(0)
})

test('A19 : une base d’une version plus récente donne « version plus récente », pas « navigation privée »', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('button.ligne').first()).toBeVisible()
  await page.evaluate(
    () =>
      new Promise<void>((resolve, reject) => {
        const req = indexedDB.open('mousse-de-poche', 2)
        req.onerror = () => {
          reject(new Error('ouverture en version 2'))
        }
        req.onsuccess = () => {
          req.result.close()
          resolve()
        }
      }),
  )
  await page.reload()
  await ouvrirFiltres(page)
  await expect(page.getByTestId('stockage-texte')).toContainText('Une version plus récente')
  await expect(page.getByTestId('stockage-texte')).not.toContainText('navigation privée')
})
