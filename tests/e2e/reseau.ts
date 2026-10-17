import { type Page } from '@playwright/test'
import { expect, test } from './position'

/** Seul hôte tiers autorisé : les tuiles OpenStreetMap. */
export const TUILE_OSM = /^https:\/\/tile\.openstreetmap\.org\/\d+\/\d+\/\d+\.png$/

/**
 * Coupe les tuiles : les tests ne dépendent pas du réseau ni d'un serveur
 * tiers, et l'application doit rester utilisable sans fond de carte.
 */
export async function sansTuiles(page: Page): Promise<void> {
  await page.route(TUILE_OSM, (route) => route.abort())
}

/**
 * La carte ne se charge qu'à l'approche de l'écran (S20) : un test qui en a
 * besoin y va, comme la personne qui fait défiler. Attend la carte montée, ou
 * son repli sans WebGL.
 */
export async function versLaCarte(page: Page, options: { sansWebGLAttendu?: boolean } = {}): Promise<void> {
  const carte = page.locator('[data-testid="carte"], [data-testid="carte-absente"]')
  // On boucle sur l'état voulu (CLAUDE.md §6ter) : l'attente peut ne pas être
  // encore rendue, ou déjà remplacée (grand écran) ; « compter puis faire
  // défiler » tombait entre les deux (échecs intermittents, S20).
  await expect
    .poll(async () => {
      await page.evaluate(() => {
        document.querySelector('[data-testid="carte-en-attente"]')?.scrollIntoView()
      })
      return carte.count()
    }, {
      // Le morceau de la carte (≈ 1 Mo) arrive plus lentement sous WebKit en
      // CI : 5 s par défaut ne suffisaient pas (S234). Attente de test, pas
      // un seuil de l'application.
      timeout: 15_000,
    })
    .toBeGreaterThan(0)
  await expect(carte).toBeVisible()
  // S234 : sans WebGL (Firefox sans écran en CI), la carte dit qu'elle ne
  // peut pas s'afficher — c'est le bon comportement, vérifié par
  // carte-moteurs.spec.ts. Les tests qui ont besoin de la carte dessinée ne
  // portent alors pas sur ce moteur. Le saut se décide sur WebGL lui-même,
  // pas sur le message : `carte-absente` s'affiche sur toute erreur de
  // MapLibre, et un vrai échec de la carte devenait un saut vert (revue
  // adverse S234).
  if (options.sansWebGLAttendu !== true && (await page.getByTestId('carte-absente').count()) > 0) {
    const moteur = page.context().browser()?.browserType().name() ?? '?'
    if (await pageAWebGL(page)) throw new Error(`carte absente sous ${moteur} alors que WebGL y est`)
    if (moteur === 'chromium') throw new Error('carte absente sous Chromium : WebGL devrait y être')
    test.skip(true, `pas de WebGL sous ${moteur} en CI : la carte dit qu'elle ne peut pas s'afficher`)
  }
}

/** La page peut-elle dessiner en WebGL (ce dont MapLibre a besoin) ? */
export function pageAWebGL(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const c = document.createElement('canvas')
    return c.getContext('webgl2') !== null || c.getContext('webgl') !== null
  })
}

/**
 * Choisir une commune de départ (S21) : la taper, puis toucher la ligne
 * proposée. Remplace l'ancienne liste déroulante.
 */
export async function choisirCommune(page: Page, texte: string, libelle: string): Promise<void> {
  await page.getByTestId('commune-depart').fill(texte)
  await page.getByRole('option', { name: libelle, exact: true }).click()
}

/**
 * Déplier « Plus de filtres et mes favoris » (S29 : replié sur téléphone).
 * Ne fait rien s'il est déjà ouvert : on boucle sur l'état voulu (§6ter).
 */
export async function ouvrirFiltres(page: Page): Promise<void> {
  const repli = page.getByTestId('plus-de-filtres')
  await expect
    .poll(async () => {
      if (!(await repli.evaluate((d) => (d as HTMLDetailsElement).open))) {
        await page.getByTestId('plus-de-filtres-resume').click()
      }
      return repli.evaluate((d) => (d as HTMLDetailsElement).open)
    })
    .toBe(true)
}

/**
 * Ce que l'application copie (S234) : relevé à l'appel de
 * `navigator.clipboard.writeText`, sans lire le presse-papiers — WebKit ne
 * connaît pas la permission `clipboard-write`. On vérifie ce qui part, pas
 * le presse-papiers du système.
 */
export async function releverCopies(page: Page): Promise<void> {
  await page.evaluate(() => {
    const copies: string[] = []
    ;(window as unknown as { copies: string[] }).copies = copies
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: (texte: string) => {
          copies.push(texte)
          return Promise.resolve()
        },
      },
    })
  })
}

export const derniereCopie = (page: Page) =>
  page.evaluate(() => (window as unknown as { copies: string[] }).copies.at(-1) ?? '')
