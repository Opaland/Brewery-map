import { distanceKm, type Point } from './distance'
import type { TypeDeBiere } from './bieres'
import type { Brasserie, Categorie } from './schema'

export interface Criteres {
  origine: Point
  rayonKm: number
  /** Mots à trouver dans le nom ou la commune ; vide = tout. */
  texte: string
  categories: readonly Categorie[]
  /** Un type de bière proposé ; absent = tous. */
  type?: TypeDeBiere
  /** Ne garder que ces noms (« mes favoris seulement », S9) ; absent = tous. */
  seulement?: ReadonlySet<string>
  /** Un département (« 73 ») : ses brasseries, à toute distance (S27). */
  departement?: string
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
    // NFD ne décompose pas les ligatures : « baroeul » doit trouver
    // Marcq-en-Barœul, comme on l'écrit au clavier (S24).
    .replace(/œ/gu, 'oe')
    .replace(/æ/gu, 'ae')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

export const APOSTROPHES = /['’]/gu

/**
 * Abréviations d'usage en toponymie française. Une liste fermée, pas un
 * seuil : elle ne change que les mots tapés, jamais les données.
 */
export const ABREVIATIONS: Readonly<Record<string, string>> = { st: 'saint', ste: 'sainte' }

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
/**
 * Un nom ou une commune tapés cherchent partout, sans le rayon (demande de
 * Cédric du 16/10 : « Je veux pouvoir chercher partout ») : chercher
 * « Ninkasi » depuis Brest doit le trouver. Le compte le dit (`App.tsx`).
 * Une seule fonction, lue par la recherche et par le compte (CLAUDE.md §4).
 */
/** Un nom tapé ou un département choisi cherche à toute distance. */
export function rechercherPartout(criteres: Pick<Criteres, 'texte' | 'departement'>): boolean {
  return motsCherches(criteres.texte).length > 0 || criteres.departement !== undefined
}

/**
 * Les mots tapés, sous forme comparable. Une ponctuation seule n'en donne
 * aucun : elle ne cherche rien et ne lève pas le rayon (revue globale S22).
 * L'apostrophe tapée est collée : « brass'in » cherche « brassin », que
 * `cible` contient. La séparer en ferait un mot « in » trouvé partout.
 */
function motsCherches(texte: string): string[] {
  return normaliser(texte.replace(APOSTROPHES, ''))
    .split(' ')
    .filter((m) => m !== '')
}

/**
 * La brasserie du fichier la plus proche du départ, quels que soient les
 * filtres : quand rien n'est à portée (depuis Lille), l'écran dit où est la
 * plus proche plutôt que « aucune » (revue globale S22).
 */
export function plusProche(brasseries: readonly Brasserie[], origine: Point): Resultat | undefined {
  let meilleure: Resultat | undefined
  for (const brasserie of brasseries) {
    const d = distanceKm(origine, brasserie)
    if (meilleure === undefined || d < meilleure.distanceKm) meilleure = { brasserie, distanceKm: d }
  }
  return meilleure
}

export function rechercher(brasseries: readonly Brasserie[], criteres: Criteres): Resultat[] {
  const mots = motsCherches(criteres.texte)
  const categories = new Set(criteres.categories)
  const resultats: Resultat[] = []
  for (const brasserie of brasseries) {
    if (!categories.has(brasserie.cat)) continue
    if (criteres.seulement !== undefined && !criteres.seulement.has(brasserie.n)) continue
    if (criteres.type !== undefined && !brasserie.beers.some((b) => b.type === criteres.type)) continue
    if (criteres.departement !== undefined && brasserie.d !== criteres.departement) continue
    // Fermée (décision #35) : hors de la liste, sauf cherchée par son nom.
    if (brasserie.fermee !== undefined && mots.length === 0) continue
    if (mots.length > 0) {
      const texte = cible(brasserie)
      if (!mots.every((mot) => trouve(texte, mot))) continue
    }
    const d = distanceKm(criteres.origine, brasserie)
    if (!rechercherPartout(criteres) && d > criteres.rayonKm) continue
    resultats.push({ brasserie, distanceKm: d })
  }
  return resultats.sort((a, b) => a.distanceKm - b.distanceKm)
}

/**
 * Les favoris encore dans les données que les filtres en cours cachent : la
 * liste le dit, plutôt que de laisser croire qu'un favori a disparu (S9).
 * Un favori absent des données n'est pas compté ici.
 */
export function favorisCaches(
  brasseries: readonly Brasserie[],
  favoris: readonly string[],
  resultats: readonly Resultat[],
): string[] {
  const connus = new Set(brasseries.map((b) => b.n))
  const montres = new Set(resultats.map((r) => r.brasserie.n))
  return favoris.filter((f) => connus.has(f) && !montres.has(f))
}

/**
 * Des noms, bornés à cinq : la liste des favoris cachés grandissait sans
 * limite (revue Marie S9, fait en S24). Cinq tiennent sur deux lignes de
 * téléphone — seuil de présentation (CLAUDE.md §2).
 */
export function listeCourte(noms: readonly string[], max = 5): string {
  if (noms.length <= max) return noms.join(', ')
  const reste = noms.length - max
  return `${noms.slice(0, max).join(', ')} et ${String(reste)} autre${reste > 1 ? 's' : ''}`
}

/** Le nombre de brasseries par département, pour les parcourir (S27). */
export function compterParDepartement(brasseries: readonly Brasserie[]): Map<string, number> {
  const compte = new Map<string, number>()
  // Les fermées ne comptent pas : la liste ne les montre pas (revue S27).
  for (const b of brasseries) if (b.fermee === undefined) compte.set(b.d, (compte.get(b.d) ?? 0) + 1)
  return compte
}
