import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { sansTuiles } from './reseau'

/**
 * Hors ligne (Bernard). `context.setOffline` ne s'applique pas aux requêtes
 * du service worker (leçon de Sentiers, CLAUDE.md §1) : un test « je coupe le
 * réseau et je recharge » passerait avec et sans précache. On interroge donc
 * **le cache lui-même**.
 */
test.describe('le service worker', () => {
  test.use({ serviceWorkers: 'allow' })

  test('précache l’application entière, données comprises', async ({ page }) => {
    const sw = readFileSync('dist/sw.js', 'utf8')
    const liste = JSON.parse(/self\.__PRECACHE__ = (\[[^\]]*\])/.exec(sw)?.[1] ?? '[]') as string[]
    expect(liste.length).toBeGreaterThan(8)
    expect(liste.some((f) => /\/assets\/Carte-.*\.js$/.test(f))).toBe(true)

    await page.goto('/')
    await page.evaluate(() => navigator.serviceWorker.ready)
    const manquants = await page.evaluate(async (fichiers) => {
      const absents: string[] = []
      for (const f of fichiers) {
        const url = new URL(f, location.href).href
        if (!(await caches.match(url))) absents.push(f)
      }
      return absents
    }, liste)
    expect(manquants).toEqual([])
  })
})

test.describe('sans réseau, l’interface le dit', () => {
  test.beforeEach(async ({ page }) => {
    await sansTuiles(page)
  })

  test('fond de carte absent : la carte le dit, la liste reste', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('fond-absent')).toContainText('Fond de carte indisponible')
    await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
  })

  test('hors connexion : un bandeau prévient que les fiches restent consultables', async ({
    page,
    context,
  }) => {
    await page.goto('/')
    await expect(page.getByTestId('hors-ligne')).toHaveCount(0)
    await context.setOffline(true)
    await expect(page.getByTestId('hors-ligne')).toContainText('toutes les fiches restent consultables')
    await context.setOffline(false)
    await expect(page.getByTestId('hors-ligne')).toHaveCount(0)
  })
})

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
