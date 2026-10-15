import { expect, test } from '@playwright/test'

/**
 * La page réellement publiée, et non celle qu'on vient de construire.
 *
 * Repris de Sentiers. La suite locale prouve que `dist/` est juste ; elle ne
 * dit rien de ce que GitHub Pages sert. Entre les deux il y a l'artefact et le
 * cache. Cette sonde ne tourne que dans le workflow de déploiement, qui pose
 * `MOUSSE_URL` : Chromium ne sort pas du conteneur de développement (mesuré
 * sur Sentiers le 27/08). Sautée franchement sinon, plutôt que verte sans
 * avoir rien mesuré.
 *
 * Vue rouge en local le 15/10 : `MOUSSE_URL=http://localhost:4173/nexistepas/`
 * sert le repli 404 de `vite preview` — voir docs/SPRINTS.md, S1.
 */
const URL_PUBLIEE = process.env['MOUSSE_URL']

test.describe('la page publiée', () => {
  test.skip(!URL_PUBLIEE, 'MOUSSE_URL non défini : sonde de déploiement sautée')

  test('répond, monte, et ne perd aucun asset', async ({ page }) => {
    const origine = new URL(URL_PUBLIEE as string).origin
    const echecs: string[] = []
    page.on('response', (r) => {
      if (r.status() >= 400 && r.url().startsWith(origine)) {
        echecs.push(`${String(r.status())} ${r.url()}`)
      }
    })
    const erreurs: string[] = []
    page.on('pageerror', (e) => erreurs.push(e.message))

    const reponse = await page.goto(URL_PUBLIEE as string, { timeout: 30_000 })
    expect(reponse?.status(), 'la page publiée ne répond pas 200').toBe(200)
    await expect(
      page.getByRole('heading', { name: 'Mousse de Poche', level: 1 }),
    ).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('mention-alcool')).toBeVisible()
    expect(echecs, `requêtes en échec : ${echecs.join(' | ')}`).toEqual([])
    expect(erreurs, `erreurs JavaScript : ${erreurs.join(' | ')}`).toEqual([])
  })
})
