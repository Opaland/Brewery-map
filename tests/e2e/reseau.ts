import type { Page } from '@playwright/test'

/** Seul hôte tiers autorisé : les tuiles OpenStreetMap. */
export const TUILE_OSM = /^https:\/\/tile\.openstreetmap\.org\/\d+\/\d+\/\d+\.png$/

/**
 * Coupe les tuiles : les tests ne dépendent pas du réseau ni d'un serveur
 * tiers, et l'application doit rester utilisable sans fond de carte.
 */
export async function sansTuiles(page: Page): Promise<void> {
  await page.route(TUILE_OSM, (route) => route.abort())
}
