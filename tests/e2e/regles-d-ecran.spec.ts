import { type Page } from '@playwright/test'
import { expect, test } from './position'
import { ouvrirFiltres, sansTuiles } from './reseau'

/**
 * S287 (repris de Sentiers, `regles-d-ecran.spec.ts`) : à quatre largeurs,
 * en texte normal et à 200 %, filtres dépliés et une fiche ouverte (ce qui
 * est replié par défaut est ce qu'une sonde oublie, CLAUDE.md §6quinquies) :
 * rien ne déborde, et deux commandes ne se recouvrent pas.
 */
const LARGEURS = [320, 412, 900, 1280]
const COMMANDES = 'button, a[href], input, select, summary, textarea'

/**
 * Les paires de commandes visibles qui se recouvrent de plus de 2 px.
 * Mis à part, et dits : ce qui est dans la carte (les marqueurs se groupent
 * par conception, S40) et la barre collante du compte, qui passe au-dessus
 * de la liste quand on défile (son focus est gardé par S24, WCAG 2.4.11).
 */
const recouvrements = (page: Page) =>
  page.evaluate((selecteur) => {
    const visibles = [...document.querySelectorAll<HTMLElement>(selecteur)].filter((e) => {
      if (e.closest('.maplibregl-map, .barre-compte, [hidden], details:not([open]) > :not(summary)')) return false
      const r = e.getBoundingClientRect()
      const s = getComputedStyle(e)
      return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'
    })
    const nom = (e: HTMLElement) => e.getAttribute('data-testid') ?? (e.getAttribute('aria-label') ?? e.textContent).trim().slice(0, 40)
    const paires: string[] = []
    visibles.forEach((a, i) => {
      const ra = a.getBoundingClientRect()
      for (const b of visibles.slice(i + 1)) {
        // Une commande dans une autre (un lien dans un résumé) n'est pas un recouvrement.
        if (a.contains(b) || b.contains(a)) continue
        const rb = b.getBoundingClientRect()
        const l = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left)
        const h = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top)
        if (l > 2 && h > 2) paires.push(`« ${nom(a)} » / « ${nom(b)} »`)
      }
    })
    return { vues: visibles.length, paires }
  }, COMMANDES)

for (const largeur of LARGEURS) {
  for (const texte of ['normal', '200 %'] as const) {
    test(`${String(largeur)} px, texte ${texte} : rien ne déborde, aucune commande n'en recouvre une autre`, async ({ page }) => {
      await sansTuiles(page)
      await page.setViewportSize({ width: largeur, height: 800 })
      if (texte === '200 %') {
        await page.addInitScript(() => {
          document.addEventListener('DOMContentLoaded', () => {
            document.documentElement.style.fontSize = '200%'
          })
        })
      }
      await page.goto('/')
      await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
      // Aucune transition ni animation : une mesure prise pendant l'une ne
      // dit rien de l'état final, et un poll s'arrêterait sur la première
      // lecture vide (CLAUDE.md §1bis ; vu ici : un bouton déplacé par
      // `transform` se mesurait encore à sa place).
      await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; animation: none !important; }' })
      await ouvrirFiltres(page)
      await page.locator('button.ligne').first().click()
      await expect(page.getByTestId('fiche')).toBeVisible()

      // Contre la largeur posée, pas `clientWidth` (CLAUDE.md §1bis).
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(largeur)
      if (texte === '200 %') expect(await page.evaluate(() => getComputedStyle(document.documentElement).fontSize)).toBe('32px')
      // Assez de commandes mesurées pour que « aucune paire » veuille dire quelque chose.
      await expect.poll(async () => (await recouvrements(page)).vues).toBeGreaterThan(30)
      if (process.env['REGLES_ROUGE'] === '1') {
        await page.evaluate(() => {
          const boutons = [...document.querySelectorAll<HTMLElement>('[data-testid="fiche"] button')]
          const a = boutons.at(0)
          const b = boutons.at(1)
          if (a !== undefined && b !== undefined) {
            // Un déplacement qui ne change pas le flux (un `position: fixed`
            // se rapportait à un ancêtre, et b remontait à la place de a).
            const ra = a.getBoundingClientRect()
            const rb = b.getBoundingClientRect()
            a.style.transform = `translate(${String(rb.left - ra.left)}px, ${String(rb.top - ra.top)}px)`
          }
        })
      }
      if (process.env['REGLES_ROUGE'] === '2') {
        await page.evaluate(() => {
          document.querySelector<HTMLElement>('[data-testid="fiche"]')?.style.setProperty('min-width', '1000px')
        })
      }
      await expect.poll(async () => (await recouvrements(page)).paires).toEqual([])
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(largeur)
    })
  }
}
