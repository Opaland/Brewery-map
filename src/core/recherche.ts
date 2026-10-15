import { distanceKm, type Point } from './distance'
import type { Brasserie, Categorie } from './schema'

export interface Criteres {
  origine: Point
  rayonKm: number
  /** Mots à trouver dans le nom ou la commune ; vide = tout. */
  texte: string
  categories: readonly Categorie[]
}

export interface Resultat {
  brasserie: Brasserie
  distanceKm: number
}

/**
 * Forme comparable d'un texte : sans casse, sans accents, et sans la
 * ponctuation qui sépare les mots (tirets de « Soucieu-en-Jarrest »,
 * apostrophes droites ou typographiques).
 */
export function normaliser(texte: string): string {
  return texte
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

/**
 * Les brasseries qui répondent aux critères, de la plus proche à la plus
 * lointaine. 166 lignes : le calcul tient en une fraction de milliseconde, un
 * Web Worker n'apporterait que de la complexité (mesure dans docs/SPRINTS.md,
 * S2).
 */
export function rechercher(brasseries: readonly Brasserie[], criteres: Criteres): Resultat[] {
  const mots = normaliser(criteres.texte).split(' ').filter((m) => m !== '')
  const categories = new Set(criteres.categories)
  const resultats: Resultat[] = []
  for (const brasserie of brasseries) {
    if (!categories.has(brasserie.cat)) continue
    if (mots.length > 0) {
      const cible = normaliser(`${brasserie.n} ${brasserie.c}`)
      if (!mots.every((mot) => cible.includes(mot))) continue
    }
    const d = distanceKm(criteres.origine, brasserie)
    if (d > criteres.rayonKm) continue
    resultats.push({ brasserie, distanceKm: d })
  }
  return resultats.sort((a, b) => a.distanceKm - b.distanceKm)
}
