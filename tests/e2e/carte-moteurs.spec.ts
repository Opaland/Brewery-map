import { expect, test } from './position'
import { sansTuiles } from './reseau'

/**
 * S234 : sur chaque moteur, en approchant de la carte, la personne voit la
 * carte ou le message qui dit qu'elle ne peut pas s'afficher — jamais rien.
 * Le message d'échec porte les erreurs de la page, pour qu'un échec en CI
 * se diagnostique sans le moteur sous la main (le conteneur n'a que Chromium).
 */
test('la carte, ou son message, jamais rien', async ({ page }) => {
  const erreurs: string[] = []
  page.on('pageerror', (e) => erreurs.push(`pageerror : ${e.message}`))
  page.on('console', (m) => {
    if (m.type() === 'error') erreurs.push(`console : ${m.text()}`)
  })
  page.on('requestfailed', (r) => erreurs.push(`requête ratée : ${r.url()} (${r.failure()?.errorText ?? '?'})`))
  await sansTuiles(page)
  await page.goto('/')
  const webgl = await page.evaluate(() => {
    const c = document.createElement('canvas')
    return c.getContext('webgl2') !== null || c.getContext('webgl') !== null
  })
  const carte = page.locator('[data-testid="carte"], [data-testid="carte-absente"]')
  await expect
    .poll(
      async () => {
        await page.evaluate(() => {
          document.querySelector('[data-testid="carte-en-attente"]')?.scrollIntoView()
        })
        return carte.count()
      },
      { message: `WebGL : ${String(webgl)} ; erreurs : ${JSON.stringify(erreurs)}`, timeout: 10_000 },
    )
    .toBeGreaterThan(0)
})
