import jsQR from 'jsqr'
import { expect, test } from './position'
import { sansTuiles } from './reseau'

/** S38 — l'affichette de comptoir : ce que dit la fiche, et un QR qui l'ouvre. */
test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
  // La boîte d'impression ne s'ouvre pas en test : on compte les appels.
  await page.addInitScript(() => {
    ;(window as unknown as { impressions: number }).impressions = 0
    window.print = () => {
      ;(window as unknown as { impressions: number }).impressions += 1
    }
  })
  await page.goto('/')
})

test('« Imprimer une affichette » imprime la fiche seule, avec un QR qui ouvre sa fiche', async ({ page }) => {
  // Aucun service tiers pour fabriquer le QR. Les fichiers de l'application
  // (polices, communes de la région) se chargent, eux, de toute façon.
  const requetes: string[] = []
  page.on('request', (r) => {
    if (new URL(r.url()).host !== 'localhost:4317' && !/^(blob|data):/.test(r.url())) requetes.push(r.url())
  })
  const ligne = page.locator('button.ligne').first()
  const nom = (await ligne.getAttribute('data-nom')) ?? ''
  await ligne.click()
  await page.getByTestId('imprimer-affichette').click()
  await expect.poll(() => page.evaluate(() => (window as unknown as { impressions: number }).impressions)).toBe(1)
  expect(requetes).toEqual([])

  // À l'écran, rien ne change : l'affichette n'est pas peinte.
  await expect(page.getByTestId('affichette')).toBeHidden()

  // À l'impression, elle seule est peinte (§1bis : ce qui est peint).
  await page.emulateMedia({ media: 'print' })
  const affichette = page.getByTestId('affichette')
  await expect(affichette).toBeVisible()
  await expect(affichette.locator('h2')).toHaveText(nom)
  await expect(page.locator('#root')).toBeHidden()

  // Le QR, relu par un décodeur indépendant, donne le lien de la fiche.
  const image = await page.getByTestId('affichette-qr').evaluate(async (svg) => {
    const xml = new XMLSerializer().serializeToString(svg)
    const img = new Image()
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`
    await img.decode()
    const c = document.createElement('canvas')
    c.width = 400
    c.height = 400
    const ctx = c.getContext('2d')
    if (ctx === null) return null
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(img, 0, 0, 400, 400)
    return Array.from(ctx.getImageData(0, 0, 400, 400).data)
  })
  expect(image).not.toBeNull()
  const lu = jsQR(Uint8ClampedArray.from(image ?? []), 400, 400)
  expect(lu?.data).toBe(`http://localhost:4317/#fiche=${encodeURIComponent(nom)}`)

  // Au moins 3 cm imprimés (CA4) : 6 cm demandés.
  const largeur = await page.getByTestId('affichette-qr').evaluate((e) => e.getBoundingClientRect().width)
  expect(largeur).toBeGreaterThanOrEqual((3 / 2.54) * 96)
})

test('une fiche « À confirmer » le dit sur l’affichette, avec sa raison', async ({ page }) => {
  const ligne = page.locator('button.ligne.cat-0').first()
  await ligne.click()
  await page.getByTestId('imprimer-affichette').click()
  await page.emulateMedia({ media: 'print' })
  await expect(page.getByTestId('affichette')).toContainText('À confirmer')
  await expect(page.getByTestId('affichette')).toContainText('Pourquoi :')
})

test('Ctrl+P sans affichette imprime la page, pas une page blanche (revue adverse S38)', async ({ page }) => {
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('#root')).toBeVisible()
  await expect(page.locator('button.ligne').first()).toBeVisible()
})

test('un second clic sur la même brasserie réimprime', async ({ page }) => {
  await page.locator('button.ligne').first().click()
  await page.getByTestId('imprimer-affichette').click()
  await expect.poll(() => page.evaluate(() => (window as unknown as { impressions: number }).impressions)).toBe(1)
  await page.getByTestId('imprimer-affichette').click()
  await expect.poll(() => page.evaluate(() => (window as unknown as { impressions: number }).impressions)).toBe(2)
})

/** S303 (A1) : un morceau d'affichette disparu ne laisse pas une page blanche. */
test('si l’affichette ne se charge pas, la liste reste et la barre du compte le dit', async ({ page }) => {
  await page.route(/\/assets\/Affichette-[^/]*\.js$/, (route) => route.abort())
  const ligne = page.locator('button.ligne').first()
  await ligne.click()
  await page.getByTestId('imprimer-affichette').click()
  await expect(page.getByTestId('annonce')).toContainText('L’affichette n’a pas pu se charger')
  await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
  await expect.poll(() => page.evaluate(() => (window as unknown as { impressions: number }).impressions)).toBe(0)
})

/**
 * S317 : une annonce redite est un nouveau nœud de la région vivante. À
 * texte égal, le même nœud ne bougeait pas, et le lecteur d'écran ne lisait
 * rien au second échec (revue adverse S303).
 */
test('un second échec de l’affichette est annoncé de nouveau (S317)', async ({ page }) => {
  await page.route(/\/assets\/Affichette-[^/]*\.js$/, (route) => route.abort())
  await page.locator('button.ligne').first().click()
  await page.getByTestId('imprimer-affichette').click()
  const annonce = page.getByTestId('annonce')
  await expect(annonce).toContainText('L’affichette n’a pas pu se charger')
  // Le nœud de la première annonce est marqué ; s'il est encore là après la
  // seconde, rien n'a été ajouté à la région, donc rien n'est lu.
  await annonce.evaluate((e) => {
    e.setAttribute('data-premiere', 'oui')
  })
  await page.getByTestId('imprimer-affichette').click()
  await expect(page.locator('[data-testid="compte"] [data-premiere]')).toHaveCount(0)
  await expect(annonce).toContainText('L’affichette n’a pas pu se charger')
})
