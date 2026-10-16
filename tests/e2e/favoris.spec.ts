import { expect, test, type Page } from '@playwright/test'
import { choisirCommune, sansTuiles } from './reseau'

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
    await expect(page.getByTestId('bouton-favori')).toHaveText('★ Retirer de mes favoris')
    await expect(ligne(page, n).getByTestId('marque-favori')).toHaveCount(1)
    await page.getByTestId('favoris-seulement').check()
    await expect(page.locator('button.ligne')).toHaveCount(1)
    await expect(page.getByTestId('compte')).toContainText('Seulement vos favoris : 1')
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
    await expect(page.getByTestId('bouton-favori')).toHaveText('☆ Ajouter à mes favoris')
    await expect(page.getByTestId('marque-favori')).toHaveCount(0)
    await expect(page.getByTestId('mes-favoris')).toContainText('mes favoris (0)')
  })
})

test.describe('les réglages gardés', () => {
  test('distance et commune de départ se retrouvent au retour', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('rayon').fill('55')
    await choisirCommune(page, 'tarare', 'Tarare (69)')
    await expect(page.getByTestId('compte')).toContainText('55 km de Tarare')
    await attendreGarde(page, { rayonKm: 55, depart: { type: 'commune' } })
    await page.reload()
    await expect(page.getByTestId('compte')).toContainText('55 km de Tarare')
  })

  test('« autour de moi » se garde comme choix, jamais la position ; au retour, elle est redemandée sans fenêtre', async ({
    page,
    context,
  }) => {
    await context.grantPermissions(['geolocation'])
    await context.setGeolocation({ latitude: 45.9367, longitude: 4.7208 })
    await page.goto('/')
    await page.getByTestId('autour-de-moi').click()
    await expect(page.getByTestId('compte')).toContainText('de votre position')
    // Un réglage témoin changé après le clic : quand il est écrit, l'état
    // « autour de moi » l'est aussi (revue code S9).
    await page.getByTestId('rayon').fill('55')
    // Retour de Cédric du 16/10 (« il faut redemander ») : le choix se garde,
    // les coordonnées jamais.
    await attendreGarde(page, { rayonKm: 55, depart: { type: 'autour' } })
    expect(JSON.stringify(await lireGarde(page))).not.toMatch(/45\.9|4\.72/)
    await page.reload()
    // La permission étant déjà donnée, la position revient sans geste.
    await expect(page.getByTestId('compte')).toContainText('de votre position')
  })

  test('« autour de moi » gardé, sans permission : rien n’est demandé à l’ouverture', async ({
    page,
    context,
  }) => {
    await context.grantPermissions(['geolocation'])
    await context.setGeolocation({ latitude: 45.9367, longitude: 4.7208 })
    await page.goto('/')
    await page.getByTestId('autour-de-moi').click()
    await page.getByTestId('rayon').fill('55')
    await attendreGarde(page, { rayonKm: 55, depart: { type: 'autour' } })
    await context.clearPermissions()
    await page.reload()
    await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
    await page.waitForTimeout(1000)
    // Aucune demande partie : ni erreur de localisation, ni bouton en cours.
    await expect(page.getByTestId('localisation-erreur')).toHaveCount(0)
    await expect(page.getByTestId('autour-de-moi')).toHaveText('Autour de moi')
    await expect(page.getByTestId('depart').locator('legend')).toHaveText('Par où commencer ?')
    await expect(page.getByTestId('compte')).toContainText('de Brignais')
  })

  test('tout effacer oublie les favoris et remet les réglages d’origine', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('rayon').fill('80')
    await page.locator('button.ligne').first().click()
    await page.getByTestId('bouton-favori').click()
    await attendreGarde(page, { rayonKm: 80 })
    await page.getByTestId('tout-effacer').click()
    // Un toucher seul n'efface rien : il faut confirmer.
    await expect(page.getByTestId('mes-favoris')).toContainText('mes favoris (1)')
    await page.getByTestId('confirmer-effacer').click()
    await expect(page.getByTestId('compte')).toContainText('30 km de Brignais')
    await expect(page.getByTestId('annonce')).toHaveText(/effacés de cet appareil/)
    await expect(page.getByTestId('mes-favoris')).toContainText('mes favoris (0)')
    // Effacé veut dire absent, pas réécrit avec les valeurs par défaut.
    await page.waitForTimeout(500)
    expect(await lireGarde(page)).toBeUndefined()
    await page.reload()
    await expect(page.getByTestId('compte')).toContainText('30 km de Brignais')
  })
})

test.describe('un stockage qui ne correspond plus aux données', () => {
  const ecrireGarde = (page: Page, valeur: unknown) =>
    page.evaluate(
      (v) =>
        new Promise<void>((resolve, reject) => {
          const req = indexedDB.open('mousse-de-poche', 1)
          req.onupgradeneeded = () => {
            req.result.createObjectStore('reglages')
          }
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

  test('un champ périmé ne coûte pas les favoris', async ({ page }) => {
    await page.goto('/')
    const nom = (await page.locator('button.ligne').first().getAttribute('data-nom')) ?? ''
    await ecrireGarde(page, {
      version: 1,
      rayonKm: 40,
      categories: [0, 1, 2, 3],
      type: 'style-retire',
      depart: { type: 'brignais' },
      favoris: [nom],
      favorisSeulement: false,
    })
    await page.reload()
    await expect(page.getByTestId('compte')).toContainText('40 km de Brignais')
    await expect(page.getByTestId('mes-favoris')).toContainText('mes favoris (1)')
    // Relire n'est pas réécrire : le stockage reste tel quel tant que rien ne change.
    await page.waitForTimeout(500)
    expect(await lireGarde(page)).toMatchObject({ type: 'style-retire', favoris: [nom] })
  })

  test('un favori disparu des données est dit, et se retire', async ({ page }) => {
    await page.goto('/')
    await ecrireGarde(page, {
      version: 1,
      rayonKm: 30,
      categories: [0, 1, 2, 3],
      depart: { type: 'brignais' },
      favoris: ['Brasserie disparue'],
      favorisSeulement: true,
    })
    await page.reload()
    await expect(page.getByTestId('favoris-orphelins')).toContainText('Brasserie disparue')
    await expect(page.getByTestId('mes-favoris')).toContainText('mes favoris (0)')
    await expect(page.getByTestId('compte')).toContainText('pas encore de favori')
    await page.getByTestId('retirer-orphelins').click()
    await expect(page.getByTestId('favoris-orphelins')).toHaveCount(0)
    await attendreGarde(page, { favoris: [] })
  })
})

test('« seulement mes favoris » sans favori dit comment revoir la liste', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('favoris-seulement').check()
  await expect(page.getByTestId('compte')).toContainText('Décochez « Afficher seulement mes favoris »')
})

test('retirer un favori en mode « seulement » : le focus va au compte, qui le dit', async ({
  page,
}) => {
  await page.goto('/')
  const nom = (await page.locator('button.ligne').first().getAttribute('data-nom')) ?? ''
  await ligne(page, nom).click()
  await page.getByTestId('bouton-favori').click()
  await page.getByTestId('favoris-seulement').check()
  await page.getByTestId('bouton-favori').focus()
  await page.keyboard.press('Enter')
  await expect(page.getByTestId('annonce')).toHaveText(`« ${nom} » retirée de vos favoris.`)
  await expect
    .poll(() => page.evaluate(() => document.activeElement?.getAttribute('data-testid')))
    .toBe('compte')
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
