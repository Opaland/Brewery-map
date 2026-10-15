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

const APOSTROPHES = /['’]/gu

/**
 * Abréviations d'usage en toponymie française. Une liste fermée, pas un
 * seuil : elle ne change que les mots tapés, jamais les données.
 */
const ABREVIATIONS: Readonly<Record<string, string>> = { st: 'saint', ste: 'sainte' }

/**
 * Le texte où chercher : la forme normale, plus la forme où les apostrophes
 * sont collées (« Le Brass'in » se trouve par « brassin » comme par
 * « brass in »). Revue adverse du 15/10.
 */
function cible(brasserie: Brasserie): string {
  const brut = `${brasserie.n} ${brasserie.c}`
  return `${normaliser(brut)} ${normaliser(brut.replace(APOSTROPHES, ''))}`
}

/** Un mot tapé est trouvé tel quel, ou par sa forme développée (« st » → « saint »). */
function trouve(texte: string, mot: string): boolean {
  if (texte.includes(mot)) return true
  const developpe = ABREVIATIONS[mot]
  return developpe !== undefined && texte.includes(developpe)
}

/**
 * Les brasseries qui répondent aux critères, de la plus proche à la plus
 * lointaine. 166 lignes : le calcul tient en une fraction de milliseconde, un
 * Web Worker n'apporterait que de la complexité (mesure dans docs/SPRINTS.md,
 * S2).
 */
export function rechercher(brasseries: readonly Brasserie[], criteres: Criteres): Resultat[] {
  // L'apostrophe tapée est collée : « brass'in » cherche « brassin », que
  // `cible` contient. La séparer en ferait un mot « in » trouvé partout.
  const mots = normaliser(criteres.texte.replace(APOSTROPHES, ''))
    .split(' ')
    .filter((m) => m !== '')
  const categories = new Set(criteres.categories)
  const resultats: Resultat[] = []
  for (const brasserie of brasseries) {
    if (!categories.has(brasserie.cat)) continue
    if (mots.length > 0) {
      const texte = cible(brasserie)
      if (!mots.every((mot) => trouve(texte, mot))) continue
    }
    const d = distanceKm(criteres.origine, brasserie)
    if (d > criteres.rayonKm) continue
    resultats.push({ brasserie, distanceKm: d })
  }
  return resultats.sort((a, b) => a.distanceKm - b.distanceKm)
}
