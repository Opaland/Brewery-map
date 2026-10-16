import { expect, type Page } from '@playwright/test'

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
export async function versLaCarte(page: Page): Promise<void> {
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
    })
    .toBeGreaterThan(0)
  await expect(carte).toBeVisible()
}

/**
 * Choisir une commune de départ (S21) : la taper, puis toucher la ligne
 * proposée. Remplace l'ancienne liste déroulante.
 */
export async function choisirCommune(page: Page, texte: string, libelle: string): Promise<void> {
  await page.getByTestId('commune-depart').fill(texte)
  await page.getByRole('option', { name: libelle, exact: true }).click()
}
