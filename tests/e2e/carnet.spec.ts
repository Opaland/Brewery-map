import { attendreGarde } from './garde'
import { expect, test } from './position'
import { derniereCopie, ouvrirFiltres, releverCopies, sansTuiles } from './reseau'

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
  // Le nom de la brasserie suit, pour un lecteur d'écran seulement (S295).
  await expect(bouton).toHaveText(/^J’y suis allé·e /)
  await bouton.click()
  await expect(bouton).toHaveText(/^✓ Visitée le 17 octobre 2026 — retirer du carnet /)
  // Lu par le lecteur d'écran, pas seulement une coche.
  await expect(page.locator(`button.ligne[data-nom="${nom}"]`)).toHaveAccessibleName(
    /\(visitée le 17 octobre 2026\)/,
  )
  await bouton.click()
  await expect(page.getByTestId('marque-visite')).toHaveCount(0)
})

test('le carnet se retrouve au retour', async ({ page }) => {
  const ligne = page.locator('button.ligne').first()
  const nom = (await ligne.getAttribute('data-nom')) ?? ''
  await ligne.click()
  await page.getByTestId('bouton-visite').click()
  await expect(page.getByTestId('marque-visite')).toHaveCount(1)
  // L'écriture IndexedDB est asynchrone : recharger avant elle perdait la
  // visite, et la boucle de rechargements ne la retrouvait jamais (5 échecs
  // sur 15 sous Windows, mesuré le 20/10). On attend qu'elle soit gardée.
  await attendreGarde(page, { visites: [{ nom, date: '2026-10-17' }] })
  await page.reload()
  await expect(page.getByTestId('marque-visite')).toHaveCount(1)
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

test('« seulement mon carnet » montre les visitées et les notées, et rien d’autre (S350, A26)', async ({ page }) => {
  const lignes = page.locator('button.ligne')
  const avant = await lignes.count()
  expect(avant).toBeGreaterThan(3)
  await ouvrirFiltres(page)
  const caseCarnet = page.getByTestId('carnet-seulement')
  // Carnet vide : le compte dit pourquoi la liste l'est, et comment le remplir.
  await caseCarnet.check()
  await expect(lignes).toHaveCount(0)
  await expect(page.getByTestId('compte')).toContainText('Votre carnet est vide')
  await caseCarnet.uncheck()
  await expect(lignes).toHaveCount(avant)
  const visitee = (await lignes.nth(0).getAttribute('data-nom')) ?? ''
  const notee = (await lignes.nth(2).getAttribute('data-nom')) ?? ''
  await lignes.nth(0).click()
  await page.getByTestId('bouton-visite').click()
  await page.locator(`button.ligne[data-nom="${notee}"]`).click()
  await page.getByTestId('ma-note').fill('À revoir')
  await expect(caseCarnet).toHaveAccessibleName(/\(2\)$/)
  await caseCarnet.check()
  await expect(lignes).toHaveCount(2)
  await expect(page.locator(`button.ligne[data-nom="${visitee}"]`)).toHaveCount(1)
  await expect(page.locator(`button.ligne[data-nom="${notee}"]`)).toHaveCount(1)
  await expect(page.getByTestId('compte')).toContainText('(de votre carnet)')
  await expect(page.getByTestId('plus-de-filtres-resume')).toContainText('1 filtre actif')
  // Avec « pas encore visitées » : la notée seule.
  await page.getByTestId('pas-visitees').check()
  await expect(lignes).toHaveCount(1)
  await expect(page.locator(`button.ligne[data-nom="${notee}"]`)).toHaveCount(1)
  await page.getByTestId('pas-visitees').uncheck()
  // Effacer sa note pour la réécrire : la fiche ouverte reste, le champ
  // garde le focus (revue adverse S350).
  const ligneNotee = page.locator(`button.ligne[data-nom="${notee}"]`)
  if ((await ligneNotee.getAttribute('aria-expanded')) !== 'true') await ligneNotee.click()
  const note = page.getByTestId('ma-note')
  await note.fill('')
  await expect(page.locator(`button.ligne[data-nom="${notee}"]`)).toHaveCount(1)
  await expect(note).toBeFocused()
  await note.fill('À revoir, vraiment')
  await expect(caseCarnet).toHaveAccessibleName(/\(2\)$/)
  await caseCarnet.uncheck()
  await expect(lignes).toHaveCount(avant)
})

test('« tout effacer » efface aussi le carnet', async ({ page }) => {
  await page.locator('button.ligne').first().click()
  await page.getByTestId('bouton-visite').click()
  await ouvrirFiltres(page)
  await page.getByTestId('stockage-details').locator('summary').click()
  await expect(page.getByTestId('stockage-texte')).toContainText(
    'carnet de visites (le nom et le jour, rien d’autre)',
  )
  // Une tuile gardée, comme le service worker l'aurait fait (S295, Léa).
  await page.evaluate(async () => {
    const cache = await caches.open('mousse-tuiles-v1')
    await cache.put('https://tile.openstreetmap.org/14/1/1.png', new Response('tuile'))
  })
  await expect(page.getByTestId('stockage-texte')).toContainText('« Effacer » le retire avec le reste')
  await page.getByTestId('tout-effacer').click()
  await page.getByTestId('confirmer-effacer').click()
  await expect(page.getByTestId('marque-visite')).toHaveCount(0)
  await expect(page.getByTestId('pas-visitees')).toHaveAccessibleName(/\(0 visitée\)/)
  await expect.poll(() => page.evaluate(() => caches.has('mousse-tuiles-v1'))).toBe(false)
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

test('la date d’une visite ne part ni dans le signalement ni dans le partage (CA6)', async ({ page }) => {
  await releverCopies(page)
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
  const copie = await derniereCopie(page)
  expect(copie).toContain('#fiche=')
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

// S315 : le carnet n'est accusé que s'il vide la liste.
test('carnet vide et liste vide : le compte n’accuse pas le carnet (S315)', async ({ page }) => {
  await ouvrirFiltres(page)
  await page.getByTestId('pas-visitees').check()
  await page.getByTestId('recherche').fill('zzqxw')
  await expect(page.locator('button.ligne')).toHaveCount(0)
  await expect(page.getByTestId('compte')).toHaveText('Aucune brasserie ne correspond.')
})

test('tout le rayon visité : le carnet est la cause, et la plus proche est dite « pas encore visitée » (S315)', async ({ page }) => {
  await page.getByTestId('rayon').fill('5')
  await ouvrirFiltres(page)
  await page.getByTestId('pas-visitees').check()
  // Chaque visite sort la ligne de la liste ; on boucle sur l'état voulu (§6ter).
  const lignes = page.locator('button.ligne')
  for (let i = 0; i < 20 && (await lignes.count()) > 0; i++) {
    const avant = await lignes.count()
    await lignes.first().click()
    await page.getByTestId('bouton-visite').click()
    await expect(lignes).toHaveCount(avant - 1)
  }
  await expect(lignes).toHaveCount(0)
  await expect(page.getByTestId('compte')).toContainText('Toutes celles qui correspondent sont dans votre carnet.')
  await expect(page.getByTestId('plus-proche')).toContainText('La plus proche pas encore visitée : ')
})

test.describe('mes notes (S36)', () => {
  test('une note s’écrit dans la fiche, se garde et se relit au retour', async ({ page }) => {
    const ligne = page.locator('button.ligne').first()
    const nom = (await ligne.getAttribute('data-nom')) ?? ''
    await ligne.click()
    const note = page.getByTestId('ma-note')
    await expect(note).toHaveAccessibleName('Ma note (sur cet appareil seulement)')
    await note.fill('La blanche était excellente')
    // La ligne dit qu'il y a une note, sans ouvrir la fiche (revue adverse S36).
    await expect(page.locator(`button.ligne[data-nom="${nom}"]`)).toHaveAccessibleName(/\(avec ma note\)/)
    await expect
      .poll(async () => {
        await page.reload()
        await page.locator(`button.ligne[data-nom="${nom}"]`).click()
        return page.getByTestId('ma-note').inputValue()
      })
      .toBe('La blanche était excellente')
  })

  test('une note ne part pas : ni dans le signalement, ni dans le lien copié', async ({ page }) => {
    await releverCopies(page)
    await page.locator('button.ligne').first().click()
    await page.getByTestId('ma-note').fill('secret-de-bernard')
    const signaler = await page.getByRole('link', { name: 'Signaler une erreur sur cette fiche' }).getAttribute('href')
    expect(decodeURIComponent(signaler ?? '')).not.toContain('secret-de-bernard')
    await page.evaluate(() => {
      Object.defineProperty(navigator, 'share', { value: undefined, configurable: true })
    })
    await page.getByTestId('bouton-partager').click()
    await expect(page.getByTestId('partage-etat')).toHaveText('Lien copié.')
    expect(decodeURIComponent(await derniereCopie(page))).not.toContain(
      'secret-de-bernard',
    )
  })

  test('« tout effacer » efface les notes', async ({ page }) => {
    const ligne = page.locator('button.ligne').first()
    await ligne.click()
    await page.getByTestId('ma-note').fill('à effacer')
    await ouvrirFiltres(page)
    await page.getByTestId('stockage-details').locator('summary').click()
    await expect(page.getByTestId('stockage-texte')).toContainText('vos notes')
    await page.getByTestId('tout-effacer').click()
    await page.getByTestId('confirmer-effacer').click()
    await expect(page.getByTestId('ma-note')).toHaveValue('')
  })

  test('une note n’excède pas 500 caractères', async ({ page }) => {
    await page.locator('button.ligne').first().click()
    await page.getByTestId('ma-note').fill('x'.repeat(600))
    expect((await page.getByTestId('ma-note').inputValue()).length).toBe(500)
  })
})

test.describe('sauvegarder et transférer (S37)', () => {
  test('enregistrer puis ouvrir sur un autre appareil : tout revient, sans requête réseau', async ({ page, browser }) => {
    const ligne = page.locator('button.ligne').first()
    const nom = (await ligne.getAttribute('data-nom')) ?? ''
    await ligne.click()
    await page.getByTestId('bouton-favori').click()
    await page.getByTestId('bouton-visite').click()
    await page.getByTestId('ma-note').fill('à reprendre')
    await ouvrirFiltres(page)
    await page.getByTestId('stockage-details').locator('summary').click()
    const requetes: string[] = []
    const noter = (r: { url: () => string }) => {
      if (!/^(blob|data):/.test(r.url())) requetes.push(r.url())
    }
    page.on('request', noter)
    const telechargement = page.waitForEvent('download')
    await page.getByTestId('enregistrer-sauvegarde').click()
    const fichier = await telechargement
    expect(fichier.suggestedFilename()).toBe('mousse-de-poche-sauvegarde.json')
    const chemin = await fichier.path()
    const { readFileSync } = await import('node:fs')
    const contenu = readFileSync(chemin, 'utf8')
    // Jamais la position (CLAUDE.md §0).
    expect(contenu).not.toMatch(/"lat"|"lon"|latitude|position/)
    expect(requetes).toEqual([])

    // Un autre appareil : un contexte neuf, sans rien de gardé.
    const autre = await browser.newContext()
    const p2 = await autre.newPage()
    await p2.route(/tile\.openstreetmap/, (r) => r.abort())
    await p2.goto('/')
    await ouvrirFiltres(p2)
    await p2.getByTestId('stockage-details').locator('summary').click()
    // L'ouverture non plus ne demande rien au réseau (revue adverse S37).
    p2.on('request', noter)
    await p2.getByTestId('fichier-sauvegarde').setInputFiles(chemin)
    await expect(p2.getByTestId('sauvegarde-etat')).toContainText('1 favori(s), 1 visite(s) et 1 note(s) en plus')
    const ligne2 = p2.locator(`button.ligne[data-nom="${nom}"]`)
    await expect(ligne2.getByTestId('marque-favori')).toHaveCount(1)
    await expect(ligne2.getByTestId('marque-visite')).toHaveCount(1)
    expect(requetes).toEqual([])
    await ligne2.click()
    await expect(p2.getByTestId('ma-note')).toHaveValue('à reprendre')
    await autre.close()
  })

  test('un fichier qui n’est pas une sauvegarde est refusé, avec la raison, sans rien changer', async ({ page }) => {
    await ouvrirFiltres(page)
    await page.getByTestId('stockage-details').locator('summary').click()
    await page.getByTestId('fichier-sauvegarde').setInputFiles({
      name: 'autre.json',
      mimeType: 'application/json',
      buffer: Buffer.from('{"application":"autre"}'),
    })
    await expect(page.getByTestId('sauvegarde-etat')).toHaveText('Ce fichier ne vient pas de Mousse de Poche.')
  })
})
