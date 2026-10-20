import { t } from '../i18n'
import { distanceKm, formaterDistance, type Point } from './distance'
import type { TypeDeBiere } from './bieres'
import { ouvertLe, type JourDate } from './horaires'
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
  /** Écarter ces noms (« pas encore visitées », S35) ; absent = aucun. */
  exclure?: ReadonlySet<string>
  /** Un département (« 73 ») : ses brasseries, à toute distance (S27). */
  departement?: string
  /** « Ouvertes ce week-end » (S70) : les jours du week-end, à Paris ; absent = pas de filtre. */
  weekEnd?: readonly JourDate[]
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
 * La brasserie la plus proche du départ, sans regarder la distance ni le
 * texte : quand rien n'est à portée (depuis Lille), l'écran dit où est la
 * plus proche plutôt que « aucune » (revue globale S22). Elle passe les
 * filtres et n'est pas fermée : toutes catégories décochées, l'écran
 * nommait une brasserie que la liste ne pouvait pas montrer (revue globale
 * du 19/10, A6).
 */
export function plusProche(brasseries: readonly Brasserie[], origine: Point, filtres: Filtres): Resultat | undefined {
  let meilleure: Resultat | undefined
  for (const brasserie of brasseries) {
    if (brasserie.fermee !== undefined || !passeLesFiltres(brasserie, filtres)) continue
    const d = distanceKm(origine, brasserie)
    if (meilleure === undefined || d < meilleure.distanceKm) meilleure = { brasserie, distanceKm: d }
  }
  return meilleure
}

/** Les filtres qui ne dépendent ni du lieu ni du texte. */
export type Filtres = Pick<Criteres, 'categories' | 'type' | 'seulement' | 'exclure' | 'weekEnd'>

/**
 * Ce qui écarte une brasserie de la liste (S301, issue #53) : la liste dit
 * à Marie pourquoi un favori manque, plutôt que « la distance ou les
 * filtres ».
 */
export type Raison =
  | { type: 'categorie' }
  | { type: 'pas-favori' }
  | { type: 'visitee' }
  | { type: 'type' }
  | { type: 'departement' }
  | { type: 'fermee' }
  | { type: 'texte' }
  | { type: 'distance'; km: number; rayonKm: number }
  | { type: 'couche-osm' }
  | { type: 'week-end'; motif: 'fermee' | 'muette' | 'sans-horaires' }

/** Les raisons des filtres qui ne dépendent ni du lieu ni du texte. */
function raisonsDesFiltres(brasserie: Brasserie, f: Filtres): Raison[] {
  const raisons: Raison[] = []
  if (!f.categories.includes(brasserie.cat)) raisons.push({ type: 'categorie' })
  if (f.seulement !== undefined && !f.seulement.has(brasserie.n)) raisons.push({ type: 'pas-favori' })
  if (f.exclure?.has(brasserie.n) === true) raisons.push({ type: 'visitee' })
  if (f.type !== undefined && !brasserie.beers.some((b) => b.type === f.type)) raisons.push({ type: 'type' })
  if (f.weekEnd !== undefined) {
    const juge = jugeCeWeekEnd(brasserie, f.weekEnd)
    if (juge !== 'ouverte') raisons.push({ type: 'week-end', motif: juge })
  }
  return raisons
}

/**
 * Ce que les horaires publiés disent de ces jours (S70), par l'accueil ou
 * par la vente : « ouverte » l'un d'eux ; « fermee » si chacun est dit
 * fermé ; « muette » s'ils n'en disent rien (des horaires de semaine
 * seuls, une saison qui ne les couvre pas : revue adverse S70) ; « sans
 * horaires ». « Sous réserve » compte ouverte : la fiche dit la remarque,
 * et l'écarter cachait des brasseries ouvertes.
 */
function jugeCeWeekEnd(brasserie: Brasserie, jours: readonly JourDate[]): 'ouverte' | 'fermee' | 'muette' | 'sans-horaires' {
  if ((brasserie.horaires ?? []).length === 0) return 'sans-horaires'
  const parJour = jours.map((j) => (['accueil', 'vente'] as const).map((nature) => ouvertLe(brasserie.horaires, j, nature)))
  if (parJour.some((lus) => lus.some((o) => o === 'oui' || o === 'sous-reserve'))) return 'ouverte'
  // Fermée seulement si chaque jour est dit fermé : un dimanche non dit
  // laisse le week-end inconnu.
  return parJour.every((lus) => lus.includes('non')) ? 'fermee' : 'muette'
}

/** Combien de fiches « ouvertes ce week-end » peut juger : ouvertes ou fermées d'après leurs horaires (S70). */
export function jugeablesCeWeekEnd(brasseries: readonly Brasserie[], jours: readonly JourDate[]): number {
  return brasseries.filter((b) => {
    const juge = jugeCeWeekEnd(b, jours)
    return juge === 'ouverte' || juge === 'fermee'
  }).length
}

/**
 * Une brasserie passe-t-elle les catégories, le type et « seulement mes
 * favoris » ? Une seule garde, lue par la recherche et par le compte des
 * départements (CLAUDE.md §4) : le menu comptait sans les filtres (revue
 * S27, fait en S31).
 */
export function passeLesFiltres(brasserie: Brasserie, f: Filtres): boolean {
  return raisonsDesFiltres(brasserie, f).length === 0
}

/**
 * Toutes les raisons qui écartent une brasserie. `rechercher` la garde si
 * et seulement si la liste est vide : une seule garde (CLAUDE.md §4),
 * tenue par `tests/unit/recherche.test.ts`.
 */
export function raisonsDEcart(brasserie: Brasserie, criteres: Criteres): Raison[] {
  return raisonsAvecMots(brasserie, criteres, motsCherches(criteres.texte))
}

function raisonsAvecMots(brasserie: Brasserie, criteres: Criteres, mots: readonly string[]): Raison[] {
  const raisons = raisonsDesFiltres(brasserie, criteres)
  if (criteres.departement !== undefined && brasserie.d !== criteres.departement) raisons.push({ type: 'departement' })
  // Fermée (décision #35) : hors de la liste, sauf cherchée par son nom.
  if (brasserie.fermee !== undefined && mots.length === 0) raisons.push({ type: 'fermee' })
  if (mots.length > 0) {
    const texte = cible(brasserie)
    if (!mots.every((mot) => trouve(texte, mot))) raisons.push({ type: 'texte' })
  }
  const d = distanceKm(criteres.origine, brasserie)
  if (!rechercherPartout(criteres) && d > criteres.rayonKm) raisons.push({ type: 'distance', km: d, rayonKm: criteres.rayonKm })
  return raisons
}

/**
 * La liste resterait-elle vide sans ce critère ? Alors ce n'est pas lui
 * qu'il faut accuser d'avoir vidé la liste (A11 pour le week-end, S315 pour
 * le carnet). Une règle, nommée une fois (CLAUDE.md §4).
 */
export function videAussiSans(brasseries: readonly Brasserie[], criteres: Criteres, cle: 'exclure' | 'weekEnd'): boolean {
  const sans: Criteres = { ...criteres }
  Reflect.deleteProperty(sans, cle)
  return rechercher(brasseries, sans).length === 0
}

export function rechercher(brasseries: readonly Brasserie[], criteres: Criteres): Resultat[] {
  const mots = motsCherches(criteres.texte)
  const resultats: Resultat[] = []
  for (const brasserie of brasseries) {
    if (raisonsAvecMots(brasserie, criteres, mots).length > 0) continue
    resultats.push({ brasserie, distanceKm: distanceKm(criteres.origine, brasserie) })
  }
  return resultats.sort((a, b) => a.distanceKm - b.distanceKm)
}

/**
 * Les favoris encore dans les données que les critères en cours écartent,
 * chacun avec ses raisons : la liste le dit, plutôt que de laisser croire
 * qu'un favori a disparu (S9), et dit quel filtre le cache (S301). Un
 * favori absent des données n'est pas compté ici, ni un favori fermé
 * (`favorisFermes`). « Pas un favori » n'est jamais une raison donnée.
 */
export function favorisCaches(
  brasseries: readonly Brasserie[],
  favoris: readonly string[],
  criteres: Criteres,
  /** Les noms de la couche OpenStreetMap quand elle est décochée (revue adverse S301). */
  horsCouche: ReadonlySet<string> = new Set(),
): { nom: string; raisons: Raison[] }[] {
  const parNom = new Map(brasseries.filter((b) => b.fermee === undefined).map((b) => [b.n, b]))
  return favoris.flatMap((nom) => {
    const b = parNom.get(nom)
    if (b === undefined) return []
    if (horsCouche.has(nom)) return [{ nom, raisons: [{ type: 'couche-osm' as const }] }]
    const raisons = raisonsDEcart(b, criteres).filter((r) => r.type !== 'pas-favori')
    return raisons.length === 0 ? [] : [{ nom, raisons }]
  })
}

/** Une raison, en mots (S301) : « ≈ 45 km, au-delà du rayon de 20 km ». */
export function libelleRaison(r: Raison): string {
  switch (r.type) {
    case 'distance':
      // Arrondie, la distance pouvait égaler le rayon : « ≈ 20 km, au-delà
      // du rayon de 20 km » (revue adverse S301).
      return Math.round(r.km) <= r.rayonKm
        ? t('à peine plus de {rayon} km, le rayon choisi', { rayon: r.rayonKm })
        : t('{distance}, au-delà du rayon de {rayon} km', { distance: formaterDistance(r.km), rayon: r.rayonKm })
    case 'categorie':
      return t('sa catégorie est décochée')
    case 'type':
      return t('aucune bière connue du type choisi')
    case 'texte':
      return t('ne répond pas au texte cherché')
    case 'departement':
      return t('hors du département choisi')
    case 'visitee':
      return t('déjà visitée')
    case 'fermee':
      return t('fermée')
    case 'pas-favori':
      return t('pas dans vos favoris')
    case 'couche-osm':
      return t('la couche OpenStreetMap est décochée')
    case 'week-end':
      if (r.motif === 'sans-horaires') return t('pas d’horaires publiés')
      return r.motif === 'muette' ? t('ses horaires ne disent rien du week-end') : t('fermée ce week-end d’après ses horaires')
  }
}

/**
 * Les favoris cachés à dire. Hors du mode « seulement mes favoris », un
 * favori que seuls le texte tapé, le département choisi ou « ouvertes ce
 * week-end » écartent ne l'est pas : la personne a demandé ce filtre, et
 * le paragraphe clignotait à chaque frappe (revue adverse S301). Ce qui se dit : la distance, une case
 * décochée, le type, « pas encore visitées », la couche.
 */
/** Les filtres que la personne a demandés à l'instant : ils ne se signalent pas seuls (S301, S70). */
const DEMANDES: ReadonlySet<Raison['type']> = new Set(['texte', 'departement', 'week-end'])

export function favorisASignaler<T extends { raisons: readonly Raison[] }>(caches: readonly T[], modeSeulement: boolean): T[] {
  if (modeSeulement) return [...caches]
  return caches.filter((c) => c.raisons.some((r) => !DEMANDES.has(r.type)))
}

/** Les favoris dont la brasserie est fermée (S31). */
export function favorisFermes(brasseries: readonly Brasserie[], favoris: readonly string[]): string[] {
  const fermees = new Set(brasseries.filter((b) => b.fermee !== undefined).map((b) => b.n))
  return favoris.filter((f) => fermees.has(f))
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
export function compterParDepartement(
  brasseries: readonly Brasserie[],
  filtres?: Filtres,
): Map<string, number> {
  const compte = new Map<string, number>()
  for (const b of brasseries) {
    // Les fermées ne comptent pas : la liste ne les montre pas (revue S27).
    if (b.fermee !== undefined) continue
    if (filtres !== undefined && !passeLesFiltres(b, filtres)) continue
    compte.set(b.d, (compte.get(b.d) ?? 0) + 1)
  }
  return compte
}
