import { readFileSync } from 'node:fs'
import { expect, test } from './position'
import { absentsDuCache, promessePrecache } from './precache'
import { sansTuiles, versLaCarte } from './reseau'

/**
 * Hors ligne (Bernard). `context.setOffline` ne s'applique pas aux requêtes
 * du service worker (leçon de Sentiers, CLAUDE.md §1) : un test « je coupe le
 * réseau et je recharge » passerait avec et sans précache. On interroge donc
 * **le cache lui-même**.
 */
test.describe('le service worker', () => {
  test.use({ serviceWorkers: 'allow' })

  test('précache l’application entière, données comprises', async ({ page }) => {
    const { fichiers: liste, empreinte } = promessePrecache(readFileSync('dist/sw.js', 'utf8'))
    expect(liste.length).toBeGreaterThan(8)
    expect(liste.some((f) => /\/assets\/Carte-.*\.js$/.test(f))).toBe(true)
    expect(empreinte).toBeDefined()

    await page.goto('/')
    // L'icône masquable, que la page ne demande jamais, ne peut être dans le
    // cache que par l'installation.
    const manquants = await absentsDuCache(page, liste, empreinte ?? '')
    expect(liste).toContain('./icon-maskable-512.png')
    // Les communes, d'avance (S42) : hors ligne sans recherche préalable.
    expect(liste).toEqual(expect.arrayContaining(['./communes-france.json', './communes/departements.json']))
    expect(manquants).toEqual([])
    await expect(page.getByTestId('etat-hors-ligne')).toContainText(
      'Prête pour une utilisation hors connexion',
    )
  })
})

test.describe('sans réseau, l’interface le dit', () => {
  test.beforeEach(async ({ page }) => {
    await sansTuiles(page)
  })

  test('fond de carte absent : la carte le dit, la liste reste', async ({ page }) => {
    await page.goto('/')
    await versLaCarte(page)
    await expect(page.getByTestId('fond-absent')).toContainText(
      'Fond de carte incomplet ou indisponible',
    )
    await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
  })

  test('hors connexion : un bandeau prévient que les fiches restent consultables', async ({
    page,
    context,
  }) => {
    await page.goto('/')
    // L'application montée d'abord : couper le réseau avant revenait à
    // tester la course entre le rendu et l'écoute, pas le bandeau (S18).
    await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
    await expect(page.getByTestId('hors-ligne')).toHaveCount(0)
    await context.setOffline(true)
    await expect(page.getByTestId('hors-ligne')).toContainText('toutes les fiches restent consultables')
    await context.setOffline(false)
    await expect(page.getByTestId('hors-ligne')).toHaveCount(0)
  })
})

// S240 (suite) : la mention de la carte peignait par-dessus la fin du
// message de repli ; posé en haut, il cachait ensuite les marqueurs et
// débordait à 200 % (revue adverse S248). Il est donc hors de la carte :
// on vérifie qu'il ne croise pas la carte, à toutes ces tailles.
for (const [largeur, texte] of [
  [412, 100],
  [320, 100],
  [320, 200],
] as const) {
  test(`fond absent, ${String(largeur)} px, texte ${String(texte)} % : le message ne couvre pas la carte`, async ({ page }) => {
    await page.setViewportSize({ width: largeur, height: 839 })
    await sansTuiles(page)
    await page.goto('/')
    if (texte !== 100) await page.addStyleTag({ content: `html { font-size: ${String(texte)}% !important; }` })
    await versLaCarte(page)
    const message = page.getByTestId('fond-absent')
    await expect(message).toBeVisible()
    const carte = page.getByTestId('carte')
    await expect
      .poll(async () => {
        const [a, b] = await Promise.all([message.boundingBox(), carte.boundingBox()])
        if (a === null || b === null) return 'sans cadre'
        const croise = a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height
        return croise ? 'se croisent' : 'séparés'
      })
      .toBe('séparés')
    // Ce qui est peint aux deux bouts du message est le message (§1bis).
    await message.scrollIntoViewIfNeeded()
    const peint = await message.evaluate((m) => {
      const r = m.getBoundingClientRect()
      return [
        [r.left + 12, r.top + 8],
        [r.right - 12, r.bottom - 8],
      ].every(([x, y]) => m.contains(document.elementFromPoint(x, y)))
    })
    expect(peint).toBe(true)
  })
}

test('le manifeste rend l’application installable', async ({ request }) => {
  const m = (await (await request.get('/manifest.webmanifest')).json()) as {
    name: string
    display: string
    start_url: string
    icons: { src: string; sizes: string }[]
  }
  expect(m.display).toBe('standalone')
  expect(m.start_url).toBe('.')
  for (const taille of ['192x192', '512x512']) {
    const icone = m.icons.find((i) => i.sizes === taille)
    expect(icone, `icône ${taille}`).toBeDefined()
    expect((await request.get(`/${icone?.src ?? ''}`)).status()).toBe(200)
  }
})

test('sans le fichier d’un département, une commune se trouve par le fichier entier (repli de ChoixCommune, gardé d’avance depuis S42)', async ({ page }) => {
  await sansTuiles(page)
  await page.route(/\/communes\/\d[\dAB]\.json$/, (route) => route.abort())
  await page.goto('/')
  await page.getByTestId('commune-depart').fill('lyon')
  await expect(page.getByRole('option', { name: 'Lyon (69)', exact: true })).toBeVisible()
})
