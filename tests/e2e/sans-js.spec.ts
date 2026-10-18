import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { expect, test } from './position'

/**
 * S276 (repris de Sentiers) : sans JavaScript, la page dit ce qu'elle est et
 * quoi faire, plutôt qu'une page blanche. Le bloc `<noscript>` d'`index.html`
 * est une surface de texte qu'on oublie (CLAUDE.md §3) : ce test l'ouvre.
 */
const TEXTES = ['Mousse de Poche', 'activez JavaScript', 'à consommer avec modération']

test.describe('JavaScript coupé', () => {
  test.use({ javaScriptEnabled: false })

  test('le bloc d’accueil s’affiche, et rien ne part hors du site', async ({ page }) => {
    const demandes: string[] = []
    page.on('request', (r) => demandes.push(r.url()))
    await page.goto('/')
    for (const texte of TEXTES) await expect(page.locator('main').getByText(texte)).toBeVisible()
    const site = new URL(page.url()).origin
    expect(demandes.filter((u) => new URL(u).origin !== site)).toEqual([])
  })
})

/**
 * JavaScript coupé, Playwright ne peut rien évaluer dans la page : ni
 * `elementFromPoint` (§1bis), ni axe. On sert donc le même `index.html`
 * construit, bloc `<noscript>` déplié et script de l'application retiré :
 * mêmes balises, même feuille de style, même politique de sécurité. Seul
 * `theme-precoce.js` (classique, pas un module) y tourne encore : il pose le
 * thème, que la feuille de style suit déjà par `prefers-color-scheme`.
 */
async function blocDeplie(page: Page) {
  await page.route(
    (url) => url.pathname === '/' || url.pathname.endsWith('/index.html'),
    async (route) => {
      const reponse = await route.fetch()
      const html = (await reponse.text())
        .replace(/<\/?noscript>/g, '')
        .replace(/<script\b[^>]*type="module"[^>]*><\/script>/g, '')
      await route.fulfill({ response: reponse, body: html })
    },
  )
  await page.goto('/')
}

for (const schema of ['light', 'dark'] as const) {
  test(`le bloc sans JavaScript est peint et accessible (thème ${schema === 'light' ? 'clair' : 'sombre'})`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: schema })
    await blocDeplie(page)
    // C'est bien le bloc déplié qu'on mesure, sans l'application : des faits
    // du document servi, pas une absence qui pourrait n'être qu'un retard.
    expect(await page.locator('script[type="module"]').count()).toBe(0)
    expect(await page.locator('noscript').count()).toBe(0)
    expect(await page.locator('link[rel="stylesheet"]').count()).toBeGreaterThan(0)
    for (const texte of TEXTES) {
      const el = page.locator('main').getByText(texte)
      await expect
        .poll(() =>
          el.evaluate((e) => {
            const r = e.getBoundingClientRect()
            const vu = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)
            return vu !== null && (e.contains(vu) || vu.contains(e))
          }),
        )
        .toBe(true)
    }
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
    expect(r.violations.map((v) => `${v.id} : ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([])
  })
}
