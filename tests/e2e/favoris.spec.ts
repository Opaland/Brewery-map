import { type Page } from '@playwright/test'
import { expect, test } from './position'
import { ORDRE_CATEGORIES } from '../../src/core/categories'
import { VERSION_PREFERENCES } from '../../src/core/preferences'
import { attendreGarde, lireGarde } from './garde'
import { attendreSuite, choisirCommune, sansTuiles, ouvrirFiltres } from './reseau'

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
    await expect(page.getByTestId('bouton-favori')).toHaveText(/^★ Retirer de mes favoris /)
    await expect(ligne(page, n).getByTestId('marque-favori')).toHaveCount(1)
    await ouvrirFiltres(page)
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
    await attendreSuite(page)
    const rayon = page.getByTestId('rayon')
    await rayon.fill('100')
    const loin = page.locator('button.ligne').last()
    const nom = (await loin.getAttribute('data-nom')) ?? ''
    await loin.click()
    await page.getByTestId('bouton-favori').click()
    await ouvrirFiltres(page)
    await page.getByTestId('favoris-seulement').check()
    await rayon.fill('5')
    // Avec sa raison (S301) : la distance, et le rayon qui la coupe.
    await expect(page.getByTestId('favoris-caches')).toContainText(`${nom} (≈`)
    await expect(page.getByTestId('favoris-caches')).toContainText('au-delà du rayon de 5 km')
  })

  test('S301 : hors du mode « seulement », un favori hors du rayon est dit, avec sa raison', async ({ page }) => {
    await page.goto('/')
    await attendreSuite(page)
    const rayon = page.getByTestId('rayon')
    await rayon.fill('100')
    const loin = page.locator('button.ligne').last()
    const nom = (await loin.getAttribute('data-nom')) ?? ''
    await loin.click()
    await page.getByTestId('bouton-favori').click()
    await expect(page.getByTestId('favoris-caches')).toHaveCount(0)
    await rayon.fill('5')
    await expect(page.getByTestId('favoris-caches')).toContainText(`${nom} (≈`)
    await expect(page.getByTestId('favoris-caches')).toContainText('au-delà du rayon de 5 km')
  })

  test('retirer un favori', async ({ page }) => {
    await page.goto('/')
    const premiere = page.locator('button.ligne').first()
    await premiere.click()
    await page.getByTestId('bouton-favori').click()
    await page.getByTestId('bouton-favori').click()
    await expect(page.getByTestId('bouton-favori')).toHaveText(/^☆ Ajouter à mes favoris /)
    await expect(page.getByTestId('marque-favori')).toHaveCount(0)
    await expect(page.getByTestId('mes-favoris')).toContainText('mes favoris (0)')
  })
})

// S275 : un geste qui ajoute au carnet demande au navigateur de ne pas vider
// son stockage, une fois par ouverture ; rien d'autre ne le demande — ni un
// réglage, ni l'ouverture, ni le carnet reçu d'un autre onglet (revue
// adverse S275 : tirée de l'état gardé, la demande partait dans ces cas).
test('seul un geste qui ajoute au carnet demande au navigateur de le garder', async ({ context, page }) => {
  await context.addInitScript(() => {
    const w = window as unknown as { __persist: number }
    w.__persist = 0
    StorageManager.prototype.persisted = () => Promise.resolve(false)
    StorageManager.prototype.persist = () => {
      w.__persist++
      return Promise.resolve(true)
    }
  })
  const demandes = (p: Page) => p.evaluate(() => (window as unknown as { __persist: number }).__persist)
  await page.goto('/')
  const passif = await context.newPage()
  await passif.goto('/')
  const [premier, second] = await page.locator('button.ligne').evaluateAll((l) => l.slice(0, 2).map((b) => b.getAttribute('data-nom') ?? ''))
  expect(second).toBeTruthy()
  await page.getByTestId('rayon').fill('40')
  await attendreGarde(page, { rayonKm: 40 })
  expect(await demandes(page)).toBe(0)

  for (const nom of [premier, second]) {
    await ligne(page, nom).click()
    await page.getByTestId('bouton-favori').click()
  }
  await attendreGarde(page, { favoris: [premier, second] })
  expect(await demandes(page)).toBe(1)
  // L'onglet passif a reçu le carnet, sans geste : il ne demande rien.
  await expect(passif.getByTestId('marque-favori')).toHaveCount(2)
  expect(await demandes(passif)).toBe(0)

  // Rouvert avec un carnet : un réglage ne demande rien, une visite oui.
  await page.reload()
  await page.getByTestId('rayon').fill('50')
  await attendreGarde(page, { rayonKm: 50 })
  expect(await demandes(page)).toBe(0)
  await ligne(page, premier).click()
  await page.getByTestId('bouton-visite').click()
  await expect.poll(() => demandes(page)).toBe(1)
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
    // Attente voulue : une demande de position partie à l'ouverture aurait le
    // temps d'échouer et de s'afficher (une absence, sur une fenêtre de temps).
    await page.waitForTimeout(1000)
    // Aucune demande partie : ni erreur de localisation, ni bouton en cours.
    await expect(page.getByTestId('localisation-erreur')).toHaveCount(0)
    await expect(page.getByTestId('autour-de-moi')).toHaveText('Autour de moi')
    await expect(page.getByTestId('depart').locator('legend')).toHaveText('Par où commencer ?')
    // Le choix n'est pas perdu pour autant (revue code S21 : il était effacé
    // du stockage à l'ouverture), et l'écran dit comment le reprendre.
    await expect(page.getByTestId('depart-reprendre')).toHaveText(
      'La dernière fois, vous partiez de votre position : touchez « Autour de moi » pour la reprendre.',
    )
    // Attente voulue : une réécriture du stockage (qui effacerait « autour »)
    // aurait le temps de partir avant la relecture.
    await page.waitForTimeout(800)
    expect(await lireGarde(page)).toMatchObject({ depart: { type: 'autour' } })
    await expect(page.getByTestId('compte')).toContainText('de Brignais')
  })

  test('tout effacer oublie les favoris et remet les réglages d’origine', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('rayon').fill('80')
    await page.locator('button.ligne').first().click()
    await page.getByTestId('bouton-favori').click()
    await attendreGarde(page, { rayonKm: 80 })
    // Replié depuis S24 : on l'ouvre, comme la personne.
    await ouvrirFiltres(page)
    await page.getByTestId('stockage-details').locator('summary').click()
    await ouvrirFiltres(page)
    await page.getByTestId('tout-effacer').click()
    // Un toucher seul n'efface rien : il faut confirmer.
    await expect(page.getByTestId('mes-favoris')).toContainText('mes favoris (1)')
    await ouvrirFiltres(page)
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

  test('ce qu’une version plus récente a gardé n’est jamais réécrit par celle-ci (S238)', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('button.ligne').nth(1)).toBeVisible()
    const noms = await page.locator('button.ligne').evaluateAll((b) => b.slice(0, 2).map((e) => e.getAttribute('data-nom') ?? ''))
    const futur = { version: VERSION_PREFERENCES + 1, favoris: [noms[0]], rayonKm: 40, champVenuDuFutur: 'à garder' }
    await ecrireGarde(page, futur)
    await page.reload()
    // Lu pour ce que cette version comprend : le favori est là.
    await expect(page.getByTestId('compte')).toContainText('40 km')
    // Un geste qui écrirait : l'objet gardé ne bouge pas.
    await ligne(page, noms[1] ?? '').click()
    await page.getByRole('button', { name: /Ajouter à mes favoris/ }).click()
    // Témoin : la même suite, en version 1, écrit bien (voir le test suivant) ;
    // ici on laisse à l'écriture le temps de partir, puis on relit.
    await page.waitForTimeout(800)
    expect(await lireGarde(page)).toEqual(futur)
    // La raison dite est la vraie, et la sauvegarde par fichier reste
    // offerte (revue adverse S238 : « navigation privée », sans issue).
    await ouvrirFiltres(page)
    await expect(page.getByTestId('stockage-texte')).toContainText('Une version plus récente')
    await expect(page.getByTestId('stockage-texte')).not.toContainText('navigation privée')
    await expect(page.getByTestId('enregistrer-sauvegarde')).toBeVisible()
  })

  test('un onglet ouvert avant ne réécrit pas ce qu’une version plus récente garde ensuite (S238)', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('button.ligne').nth(1)).toBeVisible()
    const noms = await page.locator('button.ligne').evaluateAll((b) => b.slice(0, 2).map((e) => e.getAttribute('data-nom') ?? ''))
    await ecrireGarde(page, { version: 1, favoris: [noms[0]], rayonKm: 40 })
    await page.reload()
    await expect(page.getByTestId('compte')).toContainText('40 km')
    // Cet onglet a ouvert son stockage en version 1 ; une version plus
    // récente écrit ensuite, comme depuis une autre fenêtre.
    const futur = { version: VERSION_PREFERENCES + 1, favoris: [noms[0]], rayonKm: 40, champVenuDuFutur: 'à garder' }
    await ecrireGarde(page, futur)
    await ligne(page, noms[1] ?? '').click()
    await page.getByRole('button', { name: /Ajouter à mes favoris/ }).click()
    // Attente voulue : on laisse à une écriture fautive le temps de partir,
    // puis on relit (une absence se constate sur une fenêtre de temps).
    await page.waitForTimeout(800)
    expect(await lireGarde(page)).toEqual(futur)
  })

  test('témoin : en version 1, le même geste écrit (S238)', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('button.ligne').nth(1)).toBeVisible()
    const noms = await page.locator('button.ligne').evaluateAll((b) => b.slice(0, 2).map((e) => e.getAttribute('data-nom') ?? ''))
    await ecrireGarde(page, { version: 1, favoris: [noms[0]], rayonKm: 40 })
    await page.reload()
    await ligne(page, noms[1] ?? '').click()
    await page.getByRole('button', { name: /Ajouter à mes favoris/ }).click()
    await attendreGarde(page, { favoris: [noms[0], noms[1]] })
  })

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
    await ouvrirFiltres(page)
    await page.getByTestId('retirer-orphelins').click()
    await expect(page.getByTestId('favoris-orphelins')).toHaveCount(0)
    await attendreGarde(page, { favoris: [] })
  })
})

test('« seulement mes favoris » sans favori dit comment revoir la liste', async ({ page }) => {
  await page.goto('/')
  await ouvrirFiltres(page)
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
  await ouvrirFiltres(page)
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

test('deux onglets : un favori ajouté dans chacun, les deux restent (S24)', async ({ context, page }) => {
  await page.goto('/')
  const autre = await context.newPage()
  await autre.goto('/')
  const ajouter = async (p: typeof page, rang: number) => {
    const ligneP = p.locator('button.ligne').nth(rang)
    await ligneP.click()
    await p.getByTestId('bouton-favori').click()
    await expect(p.getByTestId('bouton-favori')).toHaveText(/^★ Retirer de mes favoris /)
    return (await ligneP.getAttribute('data-nom')) ?? ''
  }
  const premier = await ajouter(page, 0)
  const second = await ajouter(autre, 1)
  // Un troisième onglet relit ce qui est gardé.
  const relu = await context.newPage()
  await relu.goto('/')
  expect(second).toBeTruthy()
  for (const nom of [premier, second]) {
    await expect(relu.locator(`button.ligne[data-nom="${nom}"]`).getByTestId('marque-favori')).toHaveCount(1)
  }
})

test('deux onglets : « tout effacer » dans l’un n’est pas défait par l’autre (revue S24)', async ({
  context,
  page,
}) => {
  await page.goto('/')
  await page.locator('button.ligne').first().click()
  await page.getByTestId('bouton-favori').click()
  const autre = await context.newPage()
  await autre.goto('/')
  await autre.getByTestId('rayon').fill('80')
  await ouvrirFiltres(page)
  await page.getByTestId('stockage-details').locator('summary').click()
  await ouvrirFiltres(page)
  await page.getByTestId('tout-effacer').click()
  await ouvrirFiltres(page)
  await page.getByTestId('confirmer-effacer').click()
  await expect(page.getByTestId('annonce')).toContainText('effacés')
  // L'autre onglet suit : ses réglages reviennent aux défauts, sans réécrire.
  await expect(autre.getByTestId('rayon')).toHaveValue('30')
  const relu = await context.newPage()
  await relu.goto('/')
  await expect(relu.getByTestId('rayon')).toHaveValue('30')
  await expect(relu.getByTestId('marque-favori')).toHaveCount(0)
})

test('un filtre gardé ouvre le repli « Plus de filtres » dès l’arrivée (S29)', async ({ page }) => {
  await page.goto('/')
  await ouvrirFiltres(page)
  await page.getByTestId('categorie-0').uncheck()
  await attendreGarde(page, { categories: ORDRE_CATEGORIES.filter((c) => c !== 0) })
  await page.reload()
  await expect(page.getByTestId('categorie-0')).toBeVisible()
  await expect(page.getByTestId('plus-de-filtres-resume')).toContainText('1 filtre actif')
})
