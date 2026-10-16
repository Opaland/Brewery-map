import { expect, test } from '@playwright/test'
import { choisirCommune, sansTuiles, versLaCarte } from './reseau'

/**
 * S21 — retours de Cédric du 16/10 : « Je veux pouvoir chercher partout »,
 * plus de liste déroulante, chercher d'abord à 100 km, l'installation.
 */
test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
})

test.describe('chercher une commune de départ, partout en France', () => {
  test('près du départ : réponse sans charger toute la France', async ({ page }) => {
    const demandes: string[] = []
    page.on('request', (r) => demandes.push(new URL(r.url()).pathname))
    await page.goto('/')
    await page.getByTestId('commune-depart').fill('brign')
    await expect(page.getByRole('option').first()).toHaveText('Brignais (69)')
    await expect(page.getByTestId('commune-statut')).toContainText('à moins de 100 km')
    expect(demandes.some((p) => p.endsWith('/communes-france.json'))).toBe(false)
    expect(demandes.some((p) => p.endsWith('/communes/69.json'))).toBe(true)
  })

  test('rien à 100 km (Lille depuis Brignais) : toute la France', async ({ page }) => {
    await page.goto('/')
    await choisirCommune(page, 'lille', 'Lille (59)')
    await expect(page.getByTestId('depart').locator('legend')).toHaveText(
      'Point de départ : Lille (59)',
    )
    // Aucune brasserie du fichier à moins de 30 km de Lille : le compte dit
    // d'où et jusqu'où.
    await expect(page.getByTestId('compte')).toHaveText('Aucune brasserie à moins de 30 km de Lille (59).')
    // Et où chercher : la plus proche, et ce que couvre le fichier (revue globale S22).
    const ailleurs = page.getByTestId('plus-proche')
    await expect(ailleurs).toContainText('La plus proche du fichier :')
    await expect(ailleurs).toContainText('Le fichier couvre 9 départements : 01, 07, 26, 38, 42, 43, 69, 71, 73.')
  })

  test('« Chercher dans toute la France » élargit sur demande', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('commune-depart').fill('saint-etienne')
    await expect(page.getByRole('option').first()).toBeVisible()
    await page.getByTestId('chercher-partout').click()
    await expect(page.getByTestId('commune-statut')).toContainText('en France')
  })

  test('le texte tapé ne quitte pas le téléphone ; rien ne part chez un tiers', async ({ page }) => {
    const urls: string[] = []
    page.on('request', (r) => urls.push(r.url()))
    await page.goto('/')
    await choisirCommune(page, 'lille', 'Lille (59)')
    // Rien d'autre que l'application elle-même, et aucune requête qui porte
    // le texte tapé (CLAUDE.md §0 : la commune vaut une position).
    const tiers = urls.filter((u) => !u.startsWith('http://localhost:4173/') && !u.startsWith('data:'))
    expect(tiers).toEqual([])
    expect(urls.filter((u) => /lille/i.test(u))).toEqual([])
  })

  test('au clavier : flèches puis Entrée', async ({ page }) => {
    await page.goto('/')
    const champ = page.getByTestId('commune-depart')
    await champ.fill('bri')
    const options = page.getByRole('option')
    await expect(options.nth(1)).toBeVisible()
    await expect(champ).toHaveAttribute('aria-expanded', 'true')
    // La flèche déplace l'option active, annoncée par aria-activedescendant.
    await champ.press('ArrowDown')
    const deuxieme = (await options.nth(1).getAttribute('id')) ?? ''
    await expect(champ).toHaveAttribute('aria-activedescendant', deuxieme)
    await expect(options.nth(1)).toHaveAttribute('aria-selected', 'true')
    await champ.press('ArrowUp')
    await expect(options.nth(0)).toHaveAttribute('aria-selected', 'true')
    const nom = (await options.nth(0).textContent()) ?? ''
    await champ.press('Enter')
    await expect(page.getByTestId('depart').locator('legend')).toHaveText(`Point de départ : ${nom}`)
  })
})

test('un nom de brasserie tapé la trouve à toute distance', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('rayon').fill('5')
  await page.getByTestId('recherche').fill('tom')
  await expect(page.locator('button.ligne[data-nom="Tom & Co"]')).toBeVisible()
  await expect(page.getByTestId('compte')).toContainText('toutes distances')
})

test.describe('installer l’application', () => {
  test('Android, Chrome : un bouton déclenche l’installation proposée par le navigateur', async ({
    page,
  }) => {
    await page.goto('/')
    await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
    // L'événement du navigateur, simulé : Chromium headless ne le donne pas.
    await page.evaluate(() => {
      const e = new Event('beforeinstallprompt') as Event & Record<string, unknown>
      e.prompt = () => {
        ;(window as unknown as Record<string, boolean>).__invite = true
        return Promise.resolve()
      }
      e.userChoice = Promise.resolve({ outcome: 'accepted' })
      window.dispatchEvent(e)
    })
    await page.getByTestId('bouton-installer').click()
    expect(await page.evaluate(() => (window as unknown as Record<string, boolean>).__invite)).toBe(true)
    await expect(page.getByTestId('bouton-installer')).toHaveCount(0)
  })

  test.describe('iPhone', () => {
    test.use({
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    })

    test('l’écran dit le geste de Safari', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByTestId('installer-geste')).toHaveText(
        'Pour l’installer sur iPhone : bouton Partager du navigateur (Safari, ou Chrome et Firefox récents), puis « Sur l’écran d’accueil ».',
      )
    })
  })
})

test.describe('« Autour de moi » ne demande rien qui dépende de la position (revues S21)', () => {
  const BREST = { latitude: 48.39, longitude: -4.486 }
  test.use({ geolocation: BREST, permissions: ['geolocation'] })

  test('ni fichier de département, ni texte : seulement le fichier commun à tous', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
    // Les fichiers du départ par défaut (Brignais), les mêmes pour tous,
    // partent à l'ouverture : on attend qu'ils soient passés, pour ne compter
    // que ce que la localisation déclenche.
    await page.waitForLoadState('networkidle')
    const apres: string[] = []
    page.on('request', (r) => apres.push(new URL(r.url()).pathname))
    await page.getByTestId('autour-de-moi').click()
    await expect(page.getByTestId('depart').locator('legend')).toHaveText(
      'Point de départ : votre position (près de Brest)',
    )
    await page.getByTestId('commune-depart').fill('quimper')
    await expect(page.getByRole('option').first()).toHaveText('Quimper (29)')
    // Les fichiers par département désigneraient la zone de la personne au
    // serveur de la page ; le fichier entier est le même pour tout le monde.
    expect(apres.filter((p) => /\/communes\/[^/]+\.json$/.test(p))).toEqual([])
  })
})

test.describe('une localisation tardive n’écrase pas une commune choisie (revue code S21)', () => {
  test.use({ geolocation: { latitude: 45.9367, longitude: 4.7208 }, permissions: ['geolocation'] })

  test('le dernier geste l’emporte', async ({ page }) => {
    // Le GPS répond en 3 s, comme celui d'un vieux téléphone.
    await page.addInitScript(() => {
      const vrai = navigator.geolocation.getCurrentPosition.bind(navigator.geolocation)
      navigator.geolocation.getCurrentPosition = (ok, ko, o) => {
        setTimeout(() => {
          vrai(ok, ko, o)
        }, 3000)
      }
    })
    await page.goto('/')
    await page.getByTestId('autour-de-moi').click()
    await choisirCommune(page, 'tarare', 'Tarare (69)')
    await page.waitForTimeout(4500)
    await expect(page.getByTestId('depart').locator('legend')).toHaveText(
      'Point de départ : Tarare (69)',
    )
  })
})

test('une nouvelle version s’annonce, avec un bouton pour recharger (revue globale S22)', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
  await expect(page.getByTestId('mise-a-jour')).toHaveCount(0)
  // Ce que fait `surveillerMiseAJour` quand une version attend (le service
  // worker est bloqué dans ces tests ; sa partie est testée en unitaire).
  await page.evaluate(() => window.dispatchEvent(new Event('mousse:nouvelle-version')))
  await expect(page.getByTestId('mise-a-jour')).toContainText('nouvelle version')
  await expect(page.getByTestId('recharger-version')).toBeVisible()
})

test('aucune erreur JavaScript au chargement ni en allant à la carte', async ({ page }) => {
  // La sonde de la page publiée l'a vue avant la suite locale (main, 16/10) :
  // ici, avec le service worker bloqué, `register()` rend `undefined`.
  const erreurs: string[] = []
  page.on('pageerror', (e) => erreurs.push(e.message))
  await page.goto('/')
  await page.waitForLoadState('load')
  await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
  await versLaCarte(page)
  expect(erreurs).toEqual([])
})
