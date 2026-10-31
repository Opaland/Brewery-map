import type { Page } from '@playwright/test'
import { expect, test } from './position'
import { ORDRE_CATEGORIES } from '../../src/core/categories'
import { attendreSuite, choisirCommune, ouvrirFiltres, sansTuiles, versLaCarte } from './reseau'

/** Revue UI/UX globale du 16/10 (après S23) : ce qui a été corrigé. */
test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
  await page.goto('/')
  await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
})

for (const ecran of [undefined, { width: 360, height: 640 }]) {
test(`le compte se lit depuis le curseur de distance, sans défiler${ecran ? ' (360 × 640, revue adverse S28)' : ''}`, async ({ page }) => {
  if (ecran) await page.setViewportSize(ecran)
  await page.getByTestId('rayon').scrollIntoViewIfNeeded()
  await page.getByTestId('rayon').fill('15')
  // Peint à l'écran, pas seulement présent (CLAUDE.md §1bis).
  await expect
    .poll(() =>
      page.evaluate(() => {
        const c = document.querySelector('[data-testid="compte"]')
        if (c === null) return false
        const r = c.getBoundingClientRect()
        if (r.bottom > window.innerHeight || r.top < 0) return false
        const vu = document.elementFromPoint(r.left + 4, r.top + r.height / 2)
        return vu !== null && c.contains(vu)
      }),
    )
    .toBe(true)
  await expect(page.getByTestId('compte')).toContainText('15 km')
})
}

test('« Refermer la fiche » referme, et rend la main à sa ligne', async ({ page }) => {
  const ligne = page.locator('button.ligne').first()
  await ligne.click()
  await page.getByTestId('refermer-fiche').click()
  await expect(page.getByTestId('fiche')).toHaveCount(0)
  await expect(ligne).toBeFocused()
  await expect(ligne).toBeInViewport()
})

test('les boutons de zoom font 44 px', async ({ page }) => {
  await versLaCarte(page)
  for (const nom of ['Zoomer', 'Dézoomer']) {
    const b = await page.getByRole('button', { name: nom, exact: true }).boundingBox()
    expect(b?.width).toBeGreaterThanOrEqual(44)
    expect(b?.height).toBeGreaterThanOrEqual(44)
  }
})

test('le texte de confidentialité montre qu’il se déplie', async ({ page }) => {
  const affichage = await page
    .locator('[data-testid="depart"] .confidentialite summary')
    .evaluate((s) => getComputedStyle(s).display)
  expect(affichage).toBe('list-item')
})

test('le statut des communes ne dit pas « à moins de 100 km » de communes plus lointaines', async ({
  page,
}) => {
  await page.getByTestId('commune-depart').fill('villefranche')
  await expect(page.getByRole('option', { name: "Villefranche-d'Allier (03)" })).toBeVisible()
  await expect(page.getByTestId('commune-statut')).toContainText('dans les départements à moins de 100 km')
})

test.describe('ordinateur', () => {
  test.use({ viewport: { width: 1280, height: 800 }, isMobile: false, hasTouch: false })
  // Sur chaque moteur : la taille d'écran se pose partout, seul `isMobile`
  // est propre à Chromium (revue adverse S234, le saut disait le contraire).

  // Le nom de la première brasserie est peint au-dessus de la barre collée :
  // « top < 800 » passait avec une ligne à 778 px, sous la barre à 751 px
  // (revue globale du 19/10, A4 ; CLAUDE.md §1bis).
  const nomPeint = (page: Page) =>
    page.locator('button.ligne').first().evaluate((e) => {
      const r = e.getBoundingClientRect()
      const barre = document.querySelector('.barre-compte')?.getBoundingClientRect()
      if (barre === undefined) return 'pas de barre'
      const nom = e.querySelector('.ligne-nom')?.getBoundingClientRect()
      if (nom === undefined) return 'pas de nom'
      const vu = document.elementFromPoint(nom.left + nom.width / 2, nom.top + nom.height / 2)
      return r.top + 44 <= barre.top && vu !== null && e.contains(vu) ? 'peint' : `ligne ${String(Math.round(r.top))}, barre ${String(Math.round(barre.top))}`
    })

  test('une brasserie est dans le premier écran', async ({ page }) => {
    await expect.poll(() => nomPeint(page)).toBe('peint')
  })

  test('après un départ choisi aussi', async ({ page }) => {
    await choisirCommune(page, 'lyon', 'Lyon (69)')
    await page.evaluate(() => {
      window.scrollTo(0, 0)
    })
    await expect.poll(() => nomPeint(page)).toBe('peint')
  })
})

test.describe('le compte collant ne cache aucun focus (WCAG 2.4.11, revue adverse)', () => {
  for (const viewport of [
    { width: 412, height: 839 },
    { width: 320, height: 568 },
  ]) {
    test(`au clavier, ${String(viewport.width)}×${String(viewport.height)}`, async ({ page }) => {
      await page.setViewportSize(viewport)
      const caches: string[] = []
      // Dans les deux sens (revue d'Inès, S379).
      for (const touche of [...Array<string>(40).fill('Tab'), ...Array<string>(40).fill('Shift+Tab')]) {
        await page.keyboard.press(touche)
        // Mesure une fois le défilement fini (CLAUDE.md §1bis).
        await page.waitForTimeout(30)
        const cache = await page.evaluate(() => {
          const f = document.activeElement
          // La barre collée entière (S29 : le compte et le bouton « Carte »).
          const c = document.querySelector('.barre-compte')
          if (!(f instanceof HTMLElement) || c === null || c.contains(f)) return null
          const r = f.getBoundingClientRect()
          if (r.bottom <= 0 || r.top >= window.innerHeight) return null
          const vu = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)
          // Ce qui tient au-dessus de la barre s'y voit en entier, pas seulement son centre (S379).
          const barre = c.getBoundingClientRect().top
          const tient = r.height <= barre
          return (vu !== null && c.contains(vu)) || (tient && r.bottom > barre + 1) ? (f.dataset['testid'] ?? f.tagName) : null
        })
        if (cache !== null) caches.push(cache)
      }
      expect(caches).toEqual([])
    })
  }
})

test('à 320 px, l’option active des communes est peinte, pas sous le compte (revue adverse)', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 })
  const champ = page.getByTestId('commune-depart')
  await champ.fill('lyon')
  await expect(page.getByRole('option').nth(1)).toBeAttached()
  const peinte = () =>
    page.evaluate(() => {
      const o = document.querySelector('[role="option"][aria-selected="true"]')
      if (o === null) return false
      const r = o.getBoundingClientRect()
      const vu = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)
      return vu !== null && o.contains(vu)
    })
  await expect.poll(peinte).toBe(true)
  await champ.press('ArrowDown')
  await champ.press('ArrowDown')
  await expect.poll(peinte).toBe(true)
})

test('un nom tapé cadre la carte sur ce qu’il trouve, même hors du rayon (S24)', async ({ page }) => {
  await page.getByTestId('rayon').fill('5')
  await page.getByTestId('recherche').fill('tom & co')
  await versLaCarte(page)
  const marqueur = page.locator('.maplibregl-marker.marqueur[aria-label^="Tom & Co"]')
  // Peint dans le cadre de la carte (CLAUDE.md §1bis), pas seulement présent.
  await expect
    .poll(async () => {
      const m = await marqueur.boundingBox()
      const c = await page.getByTestId('carte').boundingBox()
      if (m === null || c === null) return false
      const x = m.x + m.width / 2
      const y = m.y + m.height / 2
      return x > c.x && x < c.x + c.width && y > c.y && y < c.y + c.height
    })
    .toBe(true)
})

test('ajouter un favori ne recadre pas la carte (revue adverse S24)', async ({ page }) => {
  // La suite arrivée d'abord (S294) : la liste ne change plus pendant la mesure.
  await attendreSuite(page)
  await page.getByTestId('recherche').fill('tom')
  await versLaCarte(page)
  await page.locator('button.ligne').first().click()
  // Le repère mesuré dans la carte : ce qui se mesure est un recadrage, pas
  // un défilement de la page.
  const repere = () =>
    page.evaluate(() => {
      const r = document.querySelector('.marqueur-origine')?.getBoundingClientRect()
      const c = document.querySelector('[data-testid="carte"]')?.getBoundingClientRect()
      return r === undefined || c === undefined ? null : { x: r.x - c.x, y: r.y - c.y }
    })
  // Le bouton d'abord à l'écran : depuis S295 il est plus bas dans la fiche.
  await page.getByTestId('bouton-favori').scrollIntoViewIfNeeded()
  // La carte s'est posée sur la brasserie choisie, plutôt qu'une attente
  // fixe (§1bis, revue S295) : deux mesures à 500 ms d'écart égales, et sur
  // des pixels entiers — MapLibre pose le marqueur au sous-pixel pendant un
  // mouvement, et l'arrondit à l'arrêt. Sous Windows, un mouvement restait
  // suspendu plus de 500 ms au sous-pixel, puis finissait au clic suivant :
  // « moins d'un pixel en 200 ms » le prenait pour l'arrêt (5 échecs sur 8,
  // `main` compris, le 20/10).
  let avant = await repere()
  await expect
    .poll(async () => {
      const precedente = avant
      avant = await repere()
      return (
        precedente !== null && avant !== null &&
        precedente.x === avant.x && precedente.y === avant.y &&
        Number.isInteger(avant.x) && Number.isInteger(avant.y)
      )
    }, { intervals: [500], timeout: 10_000 })
    .toBe(true)
  await page.getByTestId('bouton-favori').click()
  // Attente voulue : un recadrage de la carte, s'il partait, aurait fini.
  await page.waitForTimeout(800)
  const apres = await repere()
  // À l'arrondi du sous-pixel près : un recadrage déplace le repère de
  // centaines de pixels (mesuré : 140 et 243 px).
  expect(Math.abs((apres?.x ?? 1e6) - (avant?.x ?? 0))).toBeLessThanOrEqual(2)
  expect(Math.abs((apres?.y ?? 1e6) - (avant?.y ?? 0))).toBeLessThanOrEqual(2)
})

test.describe('premier écran sur téléphone (S29)', () => {
  test('la première brasserie se lit dans le premier écran, au-dessus de la barre (Pixel 7)', async ({ page }) => {
    // Mesuré sur la hauteur du Pixel 7 : sur iPhone 13 (664 px utiles), la
    // première ligne passe sous la barre — constat de S234, story à part (BACKLOG).
    test.skip(test.info().project.name !== 'mobile', 'calibré sur le Pixel 7')
    await page.evaluate(() => {
      window.scrollTo(0, 0)
    })
    // Au moins 44 px de la ligne au-dessus de la barre collée : son nom se
    // lit. « Commence dans l'écran » passait avec 12 px visibles (revue
    // adverse S29). Hauteur d'écran du profil, pas innerHeight (§1bis).
    const { ligne, barre } = await page.evaluate(() => ({
      ligne: document.querySelector('button.ligne')?.getBoundingClientRect().top ?? Infinity,
      barre: document.querySelector('.barre-compte')?.getBoundingClientRect().top ?? 0,
    }))
    expect(barre).toBeLessThanOrEqual(839)
    expect(ligne + 44).toBeLessThanOrEqual(barre)
  })

  test('dans la liste, le bouton « Carte » reste à l’écran et y mène ; puis « Liste » en revient', async ({ page }) => {
    await page.evaluate(() => {
      window.scrollTo(0, 3000)
    })
    const bouton = page.getByTestId('vers-carte')
    // Peint, pas seulement présent (§1bis).
    await expect
      .poll(() =>
        bouton.evaluate((b) => {
          const r = b.getBoundingClientRect()
          return document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) === b
        }),
      )
      .toBe(true)
    await bouton.click()
    await expect(page.locator('#titre-carte')).toBeFocused()
    await expect(bouton).toHaveText('Liste')
    await bouton.click()
    await expect(page.locator('#titre-liste')).toBeFocused()
    await expect(bouton).toHaveText('Carte')
  })

  test('les filtres repliés disent ce qu’ils cachent', async ({ page }) => {
    const resume = page.getByTestId('plus-de-filtres-resume')
    await expect(resume).toHaveText('Plus de filtres et mes favoris')
    await expect(page.getByTestId('departement')).toBeHidden()
    await resume.click()
    await page.getByTestId('departement').selectOption('73')
    await resume.click()
    await expect(page.getByTestId('departement')).toBeHidden()
    await expect(resume).toHaveText('Plus de filtres et mes favoris · 1 filtre actif')
  })

})

/** S303 (A6) : toutes catégories décochées, l'écran dit la vraie cause. */
test('toutes catégories décochées : le compte le dit, et « la plus proche » ne nomme personne', async ({ page }) => {
  await ouvrirFiltres(page)
  for (const cat of ORDRE_CATEGORIES) await page.getByTestId(`categorie-${String(cat)}`).uncheck()
  await expect(page.locator('button.ligne')).toHaveCount(0)
  await expect(page.getByTestId('compte')).toContainText('Aucune catégorie n’est cochée')
  // Le paragraphe est bien là : sans lui, « ne contient pas » passerait à
  // vide (revue adverse S303, §1bis).
  await expect(page.getByTestId('plus-proche')).toContainText('Les fiches vérifiées couvrent')
  await expect(page.getByTestId('plus-proche')).not.toContainText('La plus proche')
})

/** S304 (A7) : au-delà d'un quart de l'écran, la barre se décolle. */
test('à 320 × 568 et 200 % de texte, après un favori, la barre ne couvre pas l’écran', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 })
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' })
  // Le cas de la revue : une annonce allonge la barre (59 % de l'écran mesuré).
  await page.locator('button.ligne').first().dispatchEvent('click')
  await page.getByTestId('bouton-favori').first().dispatchEvent('click')
  await expect(page.getByTestId('annonce')).toContainText('ajoutée à vos favoris')
  // Un point à 70 % de la hauteur : sous une barre collée de 59 %, il est à
  // elle (§1bis : ce qui est peint, pas le style calculé).
  await expect
    .poll(() =>
      page.evaluate(() => {
        const vu = document.elementFromPoint(160, Math.round(window.innerHeight * 0.7))
        return vu !== null && document.querySelector('.barre-compte')?.contains(vu) === true
      }),
    )
    .toBe(false)
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--hauteur-compte'))).toBe('0px')
  // Revenue sous le cinquième (texte normal, écran plus haut), elle se recolle.
  await page.addStyleTag({ content: 'html { font-size: 100% !important; }' })
  await page.setViewportSize({ width: 412, height: 839 })
  await expect.poll(() => page.locator('.barre-compte').evaluate((b) => getComputedStyle(b).position)).toBe('sticky')
})

test('sans agrandissement, la barre reste collée (412 × 839)', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 839 })
  await expect.poll(() => page.locator('.barre-compte').evaluate((b) => getComputedStyle(b).position)).toBe('sticky')
})

/** S319 : barre décollée, le focus reste près du geste au lieu d'aller au compte, en fin de page. */
test.describe('barre décollée (320 × 568, texte à 200 %)', () => {
  const peintALEcran = (page: Page) =>
    page.evaluate(() => {
      const el = document.activeElement
      if (!(el instanceof HTMLElement)) return false
      const r = el.getBoundingClientRect()
      const vu = document.elementFromPoint(r.left + r.width / 2, r.top + Math.min(r.height / 2, 10))
      return vu !== null && (el === vu || el.contains(vu) || vu.contains(el))
    })
  const decollee = (page: Page) =>
    expect.poll(() => page.locator('.barre-compte').evaluate((b) => b.hasAttribute('data-decollee'))).toBe(true)
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 })
    await page.addStyleTag({ content: 'html { font-size: 200% !important; } * { transition: none !important; scroll-behavior: auto !important; }' })
  })

  test('effacer la recherche d’un lien partagé : le focus va au champ de recherche', async ({ page }) => {
    // Même document que « / » (beforeEach) : sans recharger, l'ancre ne serait pas lue.
    await page.goto('/#fiche=Tom%20%26%20Co')
    await page.reload()
    await expect(page.getByTestId('lien-partage-aide')).toBeVisible()
    await page.addStyleTag({ content: 'html { font-size: 200% !important; } * { transition: none !important; scroll-behavior: auto !important; }' })
    await decollee(page)
    await page.getByTestId('effacer-recherche').scrollIntoViewIfNeeded()
    await page.getByTestId('effacer-recherche').click()
    await expect(page.getByTestId('recherche')).toBeFocused()
    await expect.poll(() => peintALEcran(page)).toBe(true)
  })

  // Quatre favoris, le deuxième retiré : la page reste longue, et une ligne
  // plus haute que l'écran pouvait recevoir le focus nom coupé en haut
  // (revue adverse S319).
  test('retirer un favori en mode « seulement » : le focus va à la ligne voisine, son haut à l’écran', async ({ page }) => {
    const noms: string[] = []
    for (const i of [0, 1, 2, 3]) {
      const bouton = page.locator('button.ligne').nth(i)
      noms.push((await bouton.getAttribute('data-nom')) ?? '')
      await bouton.dispatchEvent('click')
      await page.getByTestId('bouton-favori').dispatchEvent('click')
      await bouton.dispatchEvent('click')
    }
    await ouvrirFiltres(page)
    await page.getByTestId('favoris-seulement').check()
    await expect(page.locator('button.ligne')).toHaveCount(4)
    const ordre = await page.locator('button.ligne').evaluateAll((bs) => bs.map((b) => b.getAttribute('data-nom') ?? ''))
    await page.locator(`button.ligne[data-nom="${ordre[1]}"]`).dispatchEvent('click')
    await decollee(page)
    await page.getByTestId('bouton-favori').scrollIntoViewIfNeeded()
    await page.getByTestId('bouton-favori').focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('button.ligne')).toHaveCount(3)
    await expect(page.locator(`button.ligne[data-nom="${ordre[2]}"]`)).toBeFocused()
    await expect.poll(() => peintALEcran(page)).toBe(true)
    // Le haut de la ligne, où est son nom, est dans l'écran (à un pixel
    // près : le cadrage tombe sur un sous-pixel, -0,44 mesuré).
    await expect
      .poll(() => page.evaluate(() => { const t = document.activeElement?.getBoundingClientRect().top ?? -9; return t > -1 && t < window.innerHeight }))
      .toBe(true)
  })
})

// S379 : Firefox ne défile pas vers un élément déjà en partie visible ; Tab le demande, un clic non.
test.describe('le défilement vers le focus (S379)', () => {
  const espionner = (page: Page) =>
    page.addInitScript(() => {
      const appels: string[] = []
      ;(window as unknown as { appels: string[] }).appels = appels
      const origine = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollIntoView')?.value as (o?: boolean | ScrollIntoViewOptions) => void
      Element.prototype.scrollIntoView = function (this: Element, o?: boolean | ScrollIntoViewOptions) {
        appels.push(this.closest('.maplibregl-map') === null ? 'page' : 'carte')
        origine.call(this, o)
      }
    })
  const appels = (page: Page) => page.evaluate(() => (window as unknown as { appels: string[] }).appels)

  test('Tab le demande ; un clic dans la recherche, non', async ({ page }) => {
    await espionner(page)
    await page.goto('/')
    await page.getByTestId('recherche').click()
    await expect.poll(() => appels(page)).toEqual([])
    await page.keyboard.press('Tab')
    await expect.poll(async () => (await appels(page)).length).toBeGreaterThan(0)
  })

  test('un marqueur pris au clavier ne fait pas défiler sa carte', async ({ page }) => {
    await espionner(page)
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    await expect(page.locator('.marqueur').first()).toBeVisible()
    await page.locator('.marqueur').first().focus()
    await page.keyboard.press('Tab')
    await expect.poll(() => page.evaluate(() => document.activeElement?.className ?? '')).toContain('marqueur')
    expect(await appels(page)).not.toContain('carte')
  })
})
