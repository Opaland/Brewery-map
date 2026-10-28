import AxeBuilder from '@axe-core/playwright'
import { type Page } from '@playwright/test'
import { expect, test } from './position'
import { sansTuiles, versLaCarte } from './reseau'

/**
 * Accessibilité (S18, persona Inès) : ce qui se mesure se mesure
 * (CLAUDE.md §6sexies).
 *
 * Seuils, empruntés à WCAG 2.2 et nommés :
 * - hors de la carte, une cible fait au moins 44 × 44 px : WCAG 2.5.5
 *   (niveau AAA), le seuil que le plan v2 a choisi pour S18 ; exception de la
 *   norme gardée : un lien **dans une phrase** (« inline ») ;
 * - dans la carte, 24 × 24 px : WCAG 2.5.8 (niveau AA). La carte n'est pas
 *   tenue aux 44 px parce que la liste fait la même chose (exception
 *   « equivalent » de 2.5.5) : un marqueur ouvre la fiche, comme la ligne.
 *   Pistes écartées : agrandir les marqueurs à 44 px (ils se chevauchent
 *   davantage et cachent la carte), ou les ôter du lecteur d'écran (Inès
 *   n'aurait plus rien à y lire).
 */
const CIBLE = 44
const CIBLE_CARTE = 24

// La ligne elle-même : les boutons de la fiche portent aussi le nom (S295).
const ligne = (page: Page, nom: RegExp) =>
  page.getByTestId('liste').locator('button.ligne').filter({ has: page.locator('.ligne-nom', { hasText: nom }) })

async function ouvrir(page: Page, schema: 'light' | 'dark' = 'light') {
  await page.emulateMedia({ colorScheme: schema })
  await sansTuiles(page)
  await page.goto('/')
  await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
}

/**
 * axe-core, règles WCAG 2.2 A et AA. Les marqueurs de la carte sont sortis
 * du balayage : groupés, ils se chevauchent, et axe le compte contre 2.5.8
 * (espacement) — l'exception « equivalent » ci-dessus, qu'axe ne connaît
 * pas. Leur nom accessible est vérifié à part.
 */
async function violations(page: Page) {
  // La fiche s'ouvre en fondu (`fiche-ouvre`, 180 ms) : mesuré pendant le
  // fondu, tout son texte manque de contraste. Sur le PC fixe sous Windows,
  // axe passait avant la fin, et les quatre balayages rougissaient à chaque
  // fois (S302, 19/10). On attend donc la fin des animations qui en ont une.
  await page.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .filter((a) => a.effect?.getComputedTiming().iterations !== Infinity)
        // Une animation annulée rejette `finished` : elle ne peint plus rien.
        .map((a) => a.finished.catch(() => undefined)),
    ),
  )
  const r = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .exclude('.maplibregl-marker')
    .analyze()
  return r.violations.map((v) => `${v.id} : ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)
}

for (const schema of ['light', 'dark'] as const) {
  test(`aucune violation WCAG A/AA relevée par axe (thème ${schema === 'light' ? 'clair' : 'sombre'})`, async ({
    page,
  }) => {
    await ouvrir(page, schema)
    // La carte comprise : chargée à l'approche (S20), elle n'était plus
    // balayée sur téléphone (revue code S20).
    await carteChargee(page)
    expect(await violations(page)).toEqual([])
    await ligne(page, /Caribrew/).click()
    await expect(page.getByTestId('fiche')).toBeVisible()
    expect(await violations(page)).toEqual([])
  })
}

test('les marqueurs de la carte ont un nom lisible au lecteur d’écran', async ({ page }) => {
  await ouvrir(page)
  await versLaCarte(page)
  const marqueurs = page.locator('.maplibregl-marker')
  // Le repère de départ arrive le premier : attendre les brasseries, sinon
  // le test passe sur le seul repère (vu au test de mutation, §1).
  await expect.poll(() => page.locator('.maplibregl-marker.marqueur').count()).toBeGreaterThan(0)
  // Un nom non vide ne suffit pas : MapLibre pose « Map marker » sur tout
  // marqueur qui n'en a pas (vu au test de mutation, §1). Chaque marqueur dit
  // la brasserie et sa catégorie, le nombre d'un groupe, ou le point de départ.
  const muets = await marqueurs.evaluateAll((els) =>
    els
      .map((e) => e.getAttribute('aria-label') ?? '')
      .filter(
        (nom) =>
          !/^.+ — (À confirmer|Acheter et consommer sur place|Acheter seulement|Pas de vente)$/.test(nom) &&
          !/^\d+ brasseries ici, voir le détail$/.test(nom) &&
          !/^Point de départ : .+$/.test(nom),
      ),
  )
  expect(muets).toEqual([])
})

/**
 * Mesure chaque cible visible, marqueurs de la carte compris (ils étaient
 * sautés : des marqueurs de 10 px passaient, revue code S18). Une case à
 * cocher se mesure par son libellé, qui la coche aussi. Un lien dans une
 * phrase est l'exception « inline » de la norme.
 */
async function ciblesTropPetites(page: Page, min: number, minCarte: number) {
  return page.evaluate(
    ({ min, minCarte }) => {
      const trop: string[] = []
      for (const e of document.querySelectorAll<HTMLElement>(
        'button, a[href], input, select, summary, [role=button]',
      )) {
        const style = getComputedStyle(e)
        let r = e.getBoundingClientRect()
        if (r.width === 0 || style.visibility === 'hidden') continue
        if (e instanceof HTMLInputElement && (e.type === 'checkbox' || e.type === 'radio')) {
          const libelle = e.closest('label')
          if (libelle !== null) r = libelle.getBoundingClientRect()
        }
        const dansCarte = e.closest('.maplibregl-map') !== null
        // « Dans une phrase » : le paragraphe du lien contient d'autres mots
        // que le lien lui-même. Pas un écart de longueur au jugé : « © » seul
        // devant l'attribution n'en fait pas une phrase (revue code S18).
        if (e instanceof HTMLAnchorElement && !dansCarte) {
          const autour = (e.parentElement?.textContent ?? '').replace(e.textContent, '')
          if (/\p{L}{2,}/u.test(autour)) continue
        }
        const seuil = dansCarte ? minCarte : min
        if (r.width < seuil - 0.5 || r.height < seuil - 0.5) {
          const nom = (e.getAttribute('aria-label') ?? e.textContent).trim().slice(0, 40)
          trop.push(`${e.tagName} « ${nom} » ${String(Math.round(r.width))}×${String(Math.round(r.height))}`)
        }
      }
      return trop
    },
    { min, minCarte },
  )
}

/**
 * La carte est chargée à part, ses marqueurs après elle : mesurer avant,
 * c'est mesurer une page sans marqueurs. Un `expect.poll(…).toEqual([])`
 * passait ainsi dès la première mesure, prise trop tôt (vu à la mutation,
 * §1bis) : on attend les contrôles **et** les marqueurs, puis on mesure une
 * fois.
 */
async function carteChargee(page: Page) {
  await versLaCarte(page)
  await expect(page.getByRole('button', { name: 'Zoomer', exact: true })).toBeVisible()
  await expect.poll(() => page.locator('.maplibregl-marker.marqueur').count()).toBeGreaterThan(0)
}

test('cibles : 44 px hors carte, 24 px dans la carte (WCAG 2.5.5 et 2.5.8)', async ({ page }) => {
  await ouvrir(page)
  await carteChargee(page)
  expect(await ciblesTropPetites(page, CIBLE, CIBLE_CARTE)).toEqual([])
  await ligne(page, /Caribrew/).click()
  await expect(page.getByTestId('fiche')).toBeVisible()
  expect(await ciblesTropPetites(page, CIBLE, CIBLE_CARTE)).toEqual([])
})

/**
 * Le focus se voit (WCAG 2.4.7) : un contour, ou une ombre **qui n'est pas
 * là sans le focus**. Les marqueurs portent une ombre permanente : la
 * compter comme focus laissait passer un marqueur sans aucun indicateur
 * (revue code S18, vu à la mutation).
 */
const focusVisible = (page: Page) =>
  page.evaluate(() => {
    const e = document.activeElement
    if (!(e instanceof HTMLElement) || e === document.body) return 'aucun focus'
    const s = getComputedStyle(e)
    const contour = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0
    const ombre = s.boxShadow
    e.blur()
    const ombreSans = getComputedStyle(e).boxShadow
    e.focus({ preventScroll: true })
    return contour || (ombre !== 'none' && ombre !== ombreSans)
      ? 'visible'
      : `invisible : ${e.tagName} « ${(e.getAttribute('aria-label') ?? e.textContent).trim().slice(0, 40)} »`
  })

test('au clavier, chaque arrêt montre où est le focus, carte et pied compris (WCAG 2.4.7)', async ({
  page,
}) => {
  await ouvrir(page)
  await versLaCarte(page)
  await expect(page.getByRole('button', { name: 'Zoomer', exact: true })).toBeVisible()
  await expect.poll(() => page.locator('.maplibregl-marker.marqueur').count()).toBeGreaterThan(0)
  // Depuis le haut : la carte, venue après la liste (S29), aurait fait
  // partir la tabulation de là où l'on a défilé.
  await page.evaluate(() => {
    window.scrollTo(0, 0)
    document.querySelector<HTMLElement>('.entete summary, .entete button')?.focus()
  })
  const invisibles: string[] = []
  const vus = new Set<string>()
  // Du haut de la page jusqu'au dernier lien du pied : filtres, liste,
  // carte et marqueurs, pied (la liste passe avant la carte depuis S29).
  for (let i = 0; i < 300 && !vus.has('Code source'); i++) {
    await page.keyboard.press('Tab')
    const etat = await focusVisible(page)
    if (etat !== 'visible') invisibles.push(etat)
    const quoi = await page.evaluate(() => {
      const e = document.activeElement
      return e?.getAttribute('data-nom') ?? (e?.classList.contains('marqueur') ? 'marqueur' : e?.textContent.trim()) ?? ''
    })
    vus.add(quoi)
  }
  // Le parcours a bien traversé ce qu'il prétend garder.
  expect([...vus]).toEqual(expect.arrayContaining(['marqueur', 'Caribrew', 'Code source']))
  expect(invisibles).toEqual([])
})

/**
 * Le critère d'Inès : trouver une brasserie, lire sa fiche, au clavier seul,
 * sans passer par la carte. L'appel, dernière étape, a son test juste après
 * (S295 : 47 fiches ont désormais un téléphone).
 */
test('Inès : chercher, ouvrir la fiche et la parcourir au clavier seul', async ({ page }) => {
  await ouvrir(page)
  const recherche = page.getByTestId('recherche')
  for (let i = 0; i < 10 && !(await recherche.evaluate((e) => e === document.activeElement)); i++) {
    await page.keyboard.press('Tab')
  }
  await expect(recherche).toBeFocused()
  await page.keyboard.type('caribrew')
  // Le compte, région « status », annonce le résultat sans déplacer le focus.
  const compte = page.getByTestId('compte')
  await expect(compte).toHaveAttribute('role', 'status')
  await expect(compte).toHaveText(/^1 brasserie /)
  await expect(recherche).toBeFocused()

  const bouton = ligne(page, /Caribrew/)
  for (let i = 0; i < 20 && !(await bouton.evaluate((e) => e === document.activeElement)); i++) {
    await page.keyboard.press('Tab')
  }
  await expect(bouton).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(bouton).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByTestId('fiche')).toBeVisible()

  // La fiche suit la ligne dans l'ordre du clavier (S295) : d'abord
  // joindre la brasserie, puis les horaires, « Y aller », les bières, la
  // source, ce qui est pour soi (favori, visite, partage, note), puis
  // « Signaler ».
  await page.keyboard.press('Tab')
  await expect.poll(() => page.evaluate(() => document.activeElement?.closest('[data-testid="fiche"]') !== null)).toBe(true)
  const vus: string[] = []
  const signaler = page.getByRole('link', { name: /^Signaler une erreur sur cette fiche/ })
  for (let i = 0; i < 30 && !(await signaler.evaluate((e) => e === document.activeElement)); i++) {
    vus.push(await page.evaluate(() => document.activeElement?.getAttribute('data-testid') ?? ''))
    await page.keyboard.press('Tab')
  }
  await expect(signaler).toBeFocused()
  // Le favori est en chemin, après ce qui sert à y aller.
  expect(vus).toContain('bouton-favori')
  expect(vus.indexOf('bouton-favori')).toBeGreaterThan(0)
  // La fiche a ses titres : un lecteur d'écran saute de l'une à l'autre
  // (S295). Une partie sans contenu n'a pas de titre (S308) : Caribrew n'a
  // pas encore de bière, « Ses bières » n'y est pas.
  await expect(page.getByTestId('fiche').getByRole('heading', { level: 4 })).toHaveText([
    'Joindre la brasserie',
    'Horaires',
    'Y aller',
    'D’où vient cette fiche',
    'Pour moi',
  ])
  await expect(page.getByRole('region', { name: 'Fiche de Caribrew' })).toHaveCount(1)

  // Échap n'est pas promis : la ligne se referme comme elle s'est ouverte.
  await bouton.focus()
  await page.keyboard.press('Enter')
  await expect(bouton).toHaveAttribute('aria-expanded', 'false')
})

test('Inès : depuis la fiche, « Appeler » se joint au clavier et dit le numéro (S295)', async ({ page }) => {
  await ouvrir(page)
  await page.getByTestId('recherche').fill('gredam')
  const bouton = ligne(page, /GreDam/)
  await bouton.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByTestId('fiche')).toBeVisible()
  // Le nom dit l'action et le numéro ; le lien compose l'indicatif (#47).
  const appeler = page.getByRole('link', { name: 'Appeler le 04 78 33 84 95' })
  await expect(appeler).toHaveAttribute('href', 'tel:+33478338495')
  for (let i = 0; i < 12 && !(await appeler.evaluate((e) => e === document.activeElement)); i++) {
    await page.keyboard.press('Tab')
  }
  await expect(appeler).toBeFocused()
  // Les liens qui quittent le site le disent à qui écoute (S295).
  await expect(page.getByTestId('fiche').getByRole('link', { name: /Signaler une erreur sur cette fiche \(nouvel onglet\)/ })).toHaveCount(1)
  await expect(page.getByTestId('bouton-partager')).toHaveAccessibleName('Partager GreDam')
})

/**
 * Les pastilles de catégorie ne sont pas du texte : axe ne les mesure pas.
 * WCAG 1.4.11 (contraste des éléments graphiques) : 3:1 contre ce qui les
 * entoure, dans les deux thèmes. Le libellé en clair les accompagne toujours.
 */
for (const schema of ['light', 'dark'] as const) {
  test(`pastilles de catégorie : contraste d’au moins 3:1 (WCAG 1.4.11, thème ${schema === 'light' ? 'clair' : 'sombre'})`, async ({
    page,
  }) => {
    await ouvrir(page, schema)
    const mesures = await page.evaluate(() => {
      const rgb = (c: string) => (c.match(/[\d.]+/g) ?? []).map(Number)
      const lum = (c: number[]) => {
        const [r, g, b] = c.slice(0, 3).map((v) => {
          const x = v / 255
          return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
        })
        return 0.2126 * r + 0.7152 * g + 0.0722 * b
      }
      const fond = (e: Element | null): string => {
        for (let x = e; x !== null; x = x.parentElement) {
          const c = getComputedStyle(x).backgroundColor
          const canaux = rgb(c)
          // rgba(…, 0) est transparent ; rgb(…) n'a pas de 4e canal.
          if (canaux.length < 4 || canaux[3] > 0) return c
        }
        return getComputedStyle(document.body).backgroundColor
      }
      // Toutes les pastilles, chacune sur son fond réel (filtre sur le
      // papier, liste sur la carte blanche) : le pire ratio par catégorie.
      const pire = new Map<string, number>()
      for (const p of document.querySelectorAll('.pastille')) {
        const cat = p.closest('[class*="cat-"]')?.className.match(/cat-\d/)?.[0] ?? '?'
        const a = lum(rgb(getComputedStyle(p).backgroundColor))
        const b = lum(rgb(fond(p.parentElement)))
        const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
        pire.set(cat, Math.min(pire.get(cat) ?? Infinity, ratio))
      }
      return [...pire.entries()].sort().map(([c, r]) => [c, r.toFixed(2)] as const)
    })
    expect(mesures.map(([c]) => c)).toEqual(['cat-0', 'cat-1', 'cat-2', 'cat-3', 'cat-4'])
    for (const [cat, ratio] of mesures) expect(Number(ratio), cat).toBeGreaterThanOrEqual(3)
  })
}

test('repères : une région principale et un titre par partie (lecteur d’écran)', async ({ page }) => {
  await ouvrir(page)
  await expect(page.getByRole('main')).toHaveCount(1)
  const titres = await page.getByRole('heading', { level: 2 }).allTextContents()
  expect(titres).toEqual(['Rechercher et filtrer', 'Brasseries', 'Carte'])
})

test('au clavier, un lien évite la liste et mène à la carte (S29)', async ({ page }) => {
  await ouvrir(page)
  const eviter = page.getByRole('link', { name: 'Aller à la carte' })
  for (let i = 0; i < 30 && !(await eviter.evaluate((e) => e === document.activeElement)); i++) {
    await page.keyboard.press('Tab')
  }
  await expect(eviter).toBeFocused()
  // Caché tant qu'il n'a pas le focus, mais peint quand il l'a (§1bis).
  await expect
    .poll(() =>
      eviter.evaluate((e) => {
        const r = e.getBoundingClientRect()
        return document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) === e
      }),
    )
    .toBe(true)
  await page.keyboard.press('Enter')
  await expect(page.locator('#titre-carte')).toBeFocused()
  await expect(page.locator('[data-testid="carte"], [data-testid="carte-absente"]')).toBeVisible()
})

test('choisir un marqueur porte le focus sur la ligne ouverte', async ({ page }) => {
  await ouvrir(page)
  await versLaCarte(page)
  const seul = page.locator('.maplibregl-marker.marqueur:not(.marqueur-groupe)').first()
  await expect(seul).toBeVisible()
  const nom = await seul.getAttribute('data-nom')
  await seul.focus()
  await page.keyboard.press('Enter')
  // Sur téléphone, l'aperçu prend le focus (S32) ; Échap le ferme et rend
  // le focus au marqueur ; « Voir la fiche » le porte sur la ligne.
  await expect(page.locator('#apercu-titre')).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(page.getByTestId('apercu-carte')).toHaveCount(0)
  await expect(seul).toBeFocused()
  await page.keyboard.press('Enter')
  await page.getByTestId('apercu-voir-fiche').click()
  const ligneOuverte = page.locator(`.ligne[data-nom="${String(nom)}"]`)
  await expect(ligneOuverte).toHaveAttribute('aria-expanded', 'true')
  await expect(ligneOuverte).toBeFocused()
})

test.describe('ordinateur : la liste est à côté, pas d’aperçu (S32)', () => {
  test.use({ viewport: { width: 1280, height: 800 }, isMobile: false, hasTouch: false })
  test('choisir un marqueur porte le focus sur la ligne ouverte', async ({ page }) => {
    await ouvrir(page)
    await versLaCarte(page)
    const seul = page.locator('.maplibregl-marker.marqueur:not(.marqueur-groupe)').first()
    await expect(seul).toBeVisible()
    const nom = await seul.getAttribute('data-nom')
    await seul.focus()
    await page.keyboard.press('Enter')
    await expect(page.getByTestId('apercu-carte')).toHaveCount(0)
    const ligneOuverte = page.locator(`.ligne[data-nom="${String(nom)}"]`)
    await expect(ligneOuverte).toHaveAttribute('aria-expanded', 'true')
    await expect(ligneOuverte).toBeFocused()
  })
})

test('la carte parle français ; la distance dit son unité', async ({ page }) => {
  await ouvrir(page)
  await versLaCarte(page)
  await expect(page.getByRole('button', { name: 'Zoomer', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Dézoomer', exact: true })).toBeVisible()
  await expect(page.getByRole('region', { name: 'Carte interactive' })).toHaveCount(1)
  await expect(page.getByTestId('rayon')).toHaveAttribute('aria-valuetext', '30 km')
})

test('le nom lu d’une ligne marque des pauses entre ses parties', async ({ page }) => {
  // Sans horloge, le verdict suivait l'heure de la porte (S349, 22/10).
  // Vendredi 23/10, 19 h à Paris : le brewpub de Caribrew est ouvert.
  await page.clock.setFixedTime(new Date('2026-10-23T17:00:00Z'))
  await ouvrir(page)
  await expect(ligne(page, /Caribrew/)).toHaveAccessibleName(
    /^Caribrew ?, Soucieu-en-Jarrest \(69\) · .+ km ?, Ouvert au public maintenant, sous réserve ?, Acheter et consommer sur place ?, Ce que dit la source : /,
  )
})

test('à 320 px de large (zoom 400 %), rien ne déborde à l’horizontale (WCAG 1.4.10)', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 640 })
  await ouvrir(page)
  await ligne(page, /Caribrew/).click()
  await expect(page.getByTestId('fiche')).toBeVisible()
  // Contre 320, pas `clientWidth` : sur téléphone, la fenêtre de mise en
  // page s'élargit au contenu, et la différence restait nulle même quand la
  // page débordait (vu à l'audit S26 : 544 px pour 320 ; CLAUDE.md §1bis).
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320)
})

test('sur grand écran aussi : axe et cibles (1280 × 800)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await ouvrir(page)
  await carteChargee(page)
  expect(await violations(page)).toEqual([])
  expect(await ciblesTropPetites(page, CIBLE, CIBLE_CARTE)).toEqual([])
})

/**
 * S47 — seconde passe : les écrans venus depuis S29, dépliés, en clair et en
 * sombre (CLAUDE.md §6quinquies : ce qui est replié par défaut est ce
 * qu'une sonde oublie). Axe, et les cibles de 44 px.
 */
for (const schema of ['light', 'dark'] as const) {
  test(`écrans nouveaux dépliés : axe et cibles (thème ${schema === 'light' ? 'clair' : 'sombre'}, S47)`, async ({
    page,
  }) => {
    await ouvrir(page, schema)
    // Plus de filtres, le carnet, la sauvegarde, « Quoi de neuf ? », l'apparence.
    await page.getByTestId('plus-de-filtres-resume').click()
    await page.getByTestId('stockage-details').locator('summary').click()
    await page.getByTestId('quoi-de-neuf').locator('summary').click()
    // Une fiche avec une visite et une note.
    await ligne(page, /Caribrew/).click()
    await page.getByTestId('bouton-visite').click()
    await page.getByTestId('ma-note').fill('note')
    expect(await violations(page)).toEqual([])
    expect(await ciblesTropPetites(page, CIBLE, CIBLE_CARTE)).toEqual([])
    // L'aperçu de la carte.
    await page.getByTestId('recherche').fill('oullins')
    await carteChargee(page)
    await page.getByTestId('carte').locator('.marqueur:not(.marqueur-groupe)').first().click()
    await expect(page.getByTestId('apercu-carte')).toBeVisible()
    expect(await violations(page)).toEqual([])
    expect(await ciblesTropPetites(page, CIBLE, CIBLE_CARTE)).toEqual([])
  })
}

test('thème forcé à l’inverse du système : axe sans violation (S47)', async ({ page }) => {
  await ouvrir(page, 'light')
  await page.getByTestId('theme-sombre').check()
  await ligne(page, /Caribrew/).click()
  expect(await violations(page)).toEqual([])
})
