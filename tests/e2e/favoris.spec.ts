import { expect, test, type Page } from '@playwright/test'
import { sansTuiles } from './reseau'

/** Ce que l'application a gardé dans IndexedDB, lu tel quel. */
const lireGarde = (page: Page) =>
  page.evaluate(
    () =>
      new Promise<unknown>((resolve, reject) => {
        const req = indexedDB.open('mousse-de-poche')
        req.onerror = () => {
          reject(new Error('ouverture'))
        }
        req.onsuccess = () => {
          const db = req.result
          if (!db.objectStoreNames.contains('reglages')) {
            resolve(undefined)
            return
          }
          const get = db.transaction('reglages').objectStore('reglages').get('preferences')
          get.onsuccess = () => {
            resolve(get.result)
          }
        }
      }),
  )

/*
  L'écriture IndexedDB est asynchrone : recharger juste après un geste peut
  partir avant elle. On attend que le stockage dise ce qu'on attend — vu
  échouer au hasard sans cette attente (S9).
*/
const attendreGarde = (page: Page, attendu: Record<string, unknown>) =>
  expect.poll(() => lireGarde(page)).toMatchObject(attendu)

const ligne = (page: Page, nom: string) => page.locator(`button.ligne[data-nom="${nom}"]`)

test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
})

test.describe('les favoris (Marie)', () => {
  test('un favori se garde d’une visite à l’autre, et « seulement mes favoris » aussi', async ({
    page,
  }) => {
    await page.goto('/')
    const nom = await page.locator('button.ligne').nth(2).getAttribute('data-nom')
    expect(nom).not.toBeNull()
    const n = nom ?? ''
    await ligne(page, n).click()
    await page.getByTestId('bouton-favori').click()
    await expect(page.getByTestId('bouton-favori')).toHaveAttribute('aria-pressed', 'true')
    await expect(ligne(page, n).getByTestId('marque-favori')).toHaveCount(1)
    await page.getByTestId('favoris-seulement').check()
    await expect(page.locator('button.ligne')).toHaveCount(1)
    await attendreGarde(page, { favoris: [n], favorisSeulement: true })

    await page.reload()
    await expect(page.getByTestId('favoris-seulement')).toBeChecked()
    await expect(page.locator('button.ligne')).toHaveCount(1)
    await expect(ligne(page, n).getByTestId('marque-favori')).toHaveCount(1)
    await expect(page.getByTestId('mes-favoris')).toContainText('mes favoris (1)')
  })

  test('un favori caché par la distance est dit, pas perdu', async ({ page }) => {
    await page.goto('/')
    const rayon = page.getByTestId('rayon')
    await rayon.fill('100')
    const loin = page.locator('button.ligne').last()
    const nom = (await loin.getAttribute('data-nom')) ?? ''
    await loin.click()
    await page.getByTestId('bouton-favori').click()
    await page.getByTestId('favoris-seulement').check()
    await rayon.fill('5')
    await expect(page.getByTestId('favoris-caches')).toContainText(nom)
  })

  test('retirer un favori', async ({ page }) => {
    await page.goto('/')
    const premiere = page.locator('button.ligne').first()
    await premiere.click()
    await page.getByTestId('bouton-favori').click()
    await page.getByTestId('bouton-favori').click()
    await expect(page.getByTestId('bouton-favori')).toHaveAttribute('aria-pressed', 'false')
    await expect(page.getByTestId('marque-favori')).toHaveCount(0)
    await expect(page.getByTestId('mes-favoris')).toContainText('mes favoris (0)')
  })
})

test.describe('les réglages gardés', () => {
  test('distance et commune de départ se retrouvent au retour', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('rayon').fill('55')
    await page.getByTestId('depart').locator('select').selectOption({ label: 'Tarare' })
    await expect(page.getByTestId('compte')).toContainText('55 km de Tarare')
    await attendreGarde(page, { rayonKm: 55, depart: { type: 'commune' } })
    await page.reload()
    await expect(page.getByTestId('compte')).toContainText('55 km de Tarare')
  })

  test('« autour de moi » n’est jamais gardé : ni rétabli, ni écrit', async ({ page, context }) => {
    await context.grantPermissions(['geolocation'])
    await context.setGeolocation({ latitude: 45.9367, longitude: 4.7208 })
    await page.goto('/')
    await page.getByTestId('autour-de-moi').click()
    await expect(page.getByTestId('compte')).toContainText('de votre position')
    await attendreGarde(page, { depart: { type: 'brignais' } })
    expect(JSON.stringify(await lireGarde(page))).not.toMatch(/45\.9|4\.72/)
    await page.reload()
    await expect(page.getByTestId('compte')).toContainText('de Brignais')
  })

  test('tout effacer oublie les favoris et remet les réglages d’origine', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('rayon').fill('80')
    await page.locator('button.ligne').first().click()
    await page.getByTestId('bouton-favori').click()
    await page.getByTestId('tout-effacer').click()
    await expect(page.getByTestId('compte')).toContainText('30 km de Brignais')
    await expect(page.getByTestId('mes-favoris')).toContainText('mes favoris (0)')
    await attendreGarde(page, { rayonKm: 30, favoris: [] })
    await page.reload()
    await expect(page.getByTestId('compte')).toContainText('30 km de Brignais')
  })
})

test('sans IndexedDB, l’application marche et dit que rien n’est gardé', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'indexedDB', {
      get() {
        throw new Error('bloqué')
      },
    })
  })
  await page.goto('/')
  await expect(page.locator('button.ligne').first()).toBeVisible()
  await expect(page.getByTestId('stockage-texte')).toContainText('ne permet pas de garder')
  await expect(page.getByTestId('tout-effacer')).toHaveCount(0)
})
