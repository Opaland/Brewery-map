import { expect, test } from './position'
import { ouvrirFiltres, sansTuiles } from './reseau'

/** S332 — les finitions d'écran de la revue globale du 19/10 (A20, A23, A25, A31). */
test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
})

test('A20 : l’option active de la liste des communes se voit sans la couleur seule', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('commune-depart').pressSequentially('lyo', { delay: 30 })
  await expect(page.getByRole('option').nth(1)).toBeVisible()
  await page.getByTestId('commune-depart').press('ArrowDown')
  const active = page.locator('.choix-commune-liste li.active')
  await expect(active).toHaveCount(1)
  const style = (sel: string) =>
    page.locator(sel).first().evaluate((el) => {
      const s = getComputedStyle(el)
      return { bord: s.borderLeftWidth, graisse: s.fontWeight }
    })
  const voisine = await style('.choix-commune-liste li:not(.active)')
  const choisie = await style('.choix-commune-liste li.active')
  expect(choisie.bord).toBe('3px')
  expect(voisine.bord).toBe('0px')
  expect(Number(choisie.graisse)).toBeGreaterThan(Number(voisine.graisse))
})

test('A23 : à 320 px, aucun mot d’une catégorie n’est coupé entre deux lignes', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 })
  await page.goto('/')
  await ouvrirFiltres(page)
  await expect(page.locator('.categories .case').first()).toBeVisible()
  // Ce qui est peint : chaque mot, mesuré par un Range ; un mot coupé a deux rectangles.
  const coupes = await page.evaluate(() => {
    const sortie: string[] = []
    for (const caseEl of document.querySelectorAll('.categories .case')) {
      const marche = document.createTreeWalker(caseEl, NodeFilter.SHOW_TEXT)
      for (let n = marche.nextNode(); n !== null; n = marche.nextNode()) {
        const texte = n.textContent ?? ''
        for (const m of texte.matchAll(/\S+/g)) {
          const r = document.createRange()
          r.setStart(n, m.index)
          r.setEnd(n, m.index + m[0].length)
          const lignes = new Set([...r.getClientRects()].map((x) => Math.round(x.top)))
          if (lignes.size > 1) sortie.push(m[0])
        }
      }
    }
    return sortie
  })
  expect(coupes).toEqual([])
})

test('A25 : l’annonce d’un favori se vide au changement de critères suivant', async ({ page }) => {
  await page.goto('/')
  await page.locator('button.ligne').first().click()
  await page.getByTestId('bouton-favori').click()
  await expect(page.getByTestId('annonce')).toContainText('ajoutée à vos favoris')
  await page.getByTestId('rayon').fill('50')
  await expect(page.getByTestId('annonce')).toHaveCount(0)
})

test('A31 : une case dont l’étiquette fait deux lignes n’est pas écrasée', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 })
  await page.goto('/')
  await ouvrirFiltres(page)
  const tailles = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLInputElement>('.case input[type="checkbox"]')]
      .filter((i) => i.offsetParent !== null)
      .map((i) => {
        const r = i.getBoundingClientRect()
        const etiquette = i.closest('.case')
        const deuxLignes = etiquette !== null && etiquette.getBoundingClientRect().height > 2 * r.height + 4
        return { l: Math.round(r.width), h: Math.round(r.height), deuxLignes }
      }),
  )
  expect(tailles.some((t) => t.deuxLignes)).toBe(true)
  for (const t of tailles) expect(t.l).toBe(t.h)
})
