import { z } from './zod'
import { ORDRE_CATEGORIES } from './categories'
import { ORIGINE_DEFAUT, origineDeCommune, type CommuneConnue, type Origine } from './origine'
import type { TypeDeBiere } from './bieres'
import { categorieSchema, typeDeBiereSchema, type Categorie } from './schema'

/**
 * Ce que l'application garde sur l'appareil (S9) : réglages de recherche et
 * favoris. Rien ne part sur le réseau — c'est le seul endroit où ces choix
 * existent, et les effacer est un bouton.
 */

/**
 * Réglette de distance. 30 km à l'ouverture : choix de présentation tranché
 * au jugement (CLAUDE.md §2) — il ne change aucun calcul. Écartés : 100 km
 * (les 166 lignes d'un coup, la plus lointaine à 99,8 km) et 10 km (trop peu
 * pour « près de Lyon » depuis Brignais).
 */
export const RAYON = { min: 5, max: 100, pas: 5, initial: 30 } as const

/**
 * Le départ gardé. **Jamais la position** (Léa, S8) : depuis S21, le *choix*
 * « autour de moi » se garde (`autour`, sans rien d'autre), parce qu'il
 * fallait le redemander à chaque ouverture (retour de Cédric du 16/10) ; la
 * position est redemandée au navigateur, sans fenêtre si elle est déjà
 * permise. Une commune de France se garde avec son nom et son point, une
 * donnée publique (`public/communes-france.json`) ; une commune gardée par
 * une version d'avant S21 (clé seule) se retrouve dans les données.
 */
const departSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('brignais') }).strict(),
  z.object({ type: z.literal('autour') }).strict(),
  z
    .object({
      type: z.literal('commune'),
      cle: z.string().min(1),
      nom: z.string().min(1).optional(),
      lat: z.number().min(-90).max(90).optional(),
      lon: z.number().min(-180).max(180).optional(),
    })
    .strict(),
])
export type DepartGarde = z.infer<typeof departSchema>

const sansDoublon = (liste: readonly unknown[]) => new Set(liste).size === liste.length

const CHAMPS = {
  rayonKm: z
    .number()
    .int()
    .min(RAYON.min)
    .max(RAYON.max)
    .refine((r) => r % RAYON.pas === 0),
  categories: z.array(categorieSchema).refine(sansDoublon),
  type: typeDeBiereSchema.optional(),
  depart: departSchema,
  /** Par nom : les noms sont uniques (`brasseriesSchema`). */
  favoris: z.array(z.string().min(1)).refine(sansDoublon),
  favorisSeulement: z.boolean(),
  /** Les brasseries repérées sur OpenStreetMap, montrées ou non (S25). */
  avecOsm: z.boolean(),
  /** « Seulement les pas encore visitées » (S35). */
  pasVisitees: z.boolean(),
  /** Le thème au choix (S45) : celui du système, ou forcé. */
  theme: z.enum(['auto', 'clair', 'sombre']),
}

/**
 * Une visite du carnet (S35) : le nom et le jour, rien d'autre — ni heure,
 * ni lieu. `.strict()` : une visite qui porterait autre chose est écartée.
 */
const visiteSchema = z.object({ nom: z.string().min(1), date: z.iso.date() }).strict()
export type Visite = z.infer<typeof visiteSchema>

/**
 * Une note personnelle (S36) : pour soi, sur l'appareil. 500 caractères au
 * plus — de quoi « la blanche était excellente, fermé le lundi en vrai » ;
 * borne de présentation et de stockage (§2), pas un calcul.
 */
export const NOTE_MAX = 500
const noteSchema = z.object({ nom: z.string().min(1), texte: z.string() }).strict()
export type Note = z.infer<typeof noteSchema>

/** La forme gardée que cette version écrit (S238). */
export const VERSION_PREFERENCES = 1

/**
 * Gardé par une version plus récente de l'application (S238) : on le lit
 * pour ce qu'on comprend, mais on ne le réécrit jamais — un onglet resté sur
 * l'ancienne version effaçait sinon ce que la nouvelle savait garder.
 */
export function gardeParUneVersionFuture(brut: unknown): boolean {
  if (typeof brut !== 'object' || brut === null) return false
  const v = (brut as Record<string, unknown>).version
  return typeof v === 'number' && v > VERSION_PREFERENCES
}

export interface Preferences {
  version: typeof VERSION_PREFERENCES
  rayonKm: number
  categories: Categorie[]
  type?: TypeDeBiere
  depart: DepartGarde
  favoris: string[]
  favorisSeulement: boolean
  avecOsm: boolean
  visites: Visite[]
  pasVisitees: boolean
  notes: Note[]
  theme: Theme
}

/** Tiré du schéma : une valeur ajoutée à l'un l'est à l'autre (S285). */
export type Theme = z.infer<typeof CHAMPS.theme>

export const PREFERENCES_DEFAUT: Preferences = {
  version: VERSION_PREFERENCES,
  rayonKm: RAYON.initial,
  categories: [...ORDRE_CATEGORIES],
  depart: { type: 'brignais' },
  favoris: [],
  favorisSeulement: false,
  avecOsm: true,
  visites: [],
  pasVisitees: false,
  notes: [],
  theme: 'auto',
}

const lire = <S extends z.ZodType>(schema: S, valeur: unknown, defaut: z.infer<S>): z.infer<S> => {
  const r = schema.safeParse(valeur)
  return r.success ? r.data : defaut
}

/**
 * Relit ce qui a été gardé, **champ par champ** : un champ illisible (type
 * de bière retiré des données, valeur écrite par une autre version, stockage
 * abîmé) reprend sa valeur par défaut, et lui seul. Revue code S9 : relu
 * tout ou rien, un seul champ périmé coûtait tous les favoris. Rien n'est
 * deviné : un champ vaut ce qui était gardé, ou son défaut. Les favoris en
 * double sont dédoublonnés plutôt que perdus.
 */
export function lirePreferences(brut: unknown): Preferences {
  if (typeof brut !== 'object' || brut === null) return PREFERENCES_DEFAUT
  const g = brut as Record<string, unknown>
  const d = PREFERENCES_DEFAUT
  const favoris = Array.isArray(g.favoris)
    ? [...new Set(g.favoris.filter((f): f is string => typeof f === 'string' && f !== ''))]
    : d.favoris
  const type = lire(CHAMPS.type, g.type, undefined)
  return {
    version: VERSION_PREFERENCES,
    rayonKm: lire(CHAMPS.rayonKm, g.rayonKm, d.rayonKm),
    categories: lire(CHAMPS.categories, g.categories, d.categories),
    ...(type === undefined ? {} : { type }),
    depart: lire(CHAMPS.depart, g.depart, d.depart),
    favoris,
    favorisSeulement: lire(CHAMPS.favorisSeulement, g.favorisSeulement, d.favorisSeulement),
    avecOsm: lire(CHAMPS.avecOsm, g.avecOsm, d.avecOsm),
    visites: lireVisites(g.visites),
    pasVisitees: lire(CHAMPS.pasVisitees, g.pasVisitees, d.pasVisitees),
    notes: lireNotes(g.notes),
    theme: lire(CHAMPS.theme, g.theme, d.theme),
  }
}

/** Note par note : une illisible ou vide tombe seule ; une trop longue est coupée. */
function lireNotes(brut: unknown): Note[] {
  if (!Array.isArray(brut)) return []
  const vues = new Set<string>()
  const notes: Note[] = []
  for (const n of brut) {
    const r = noteSchema.safeParse(n)
    if (!r.success || r.data.texte === '' || vues.has(r.data.nom)) continue
    vues.add(r.data.nom)
    notes.push({ nom: r.data.nom, texte: couperNote(r.data.texte) })
  }
  return notes
}

/**
 * Coupe à `NOTE_MAX` unités, sans laisser une moitié d'emoji (revue
 * adverse S36 : `slice` laissait un « \ud83d » seul).
 */
function couperNote(texte: string): string {
  if (texte.length <= NOTE_MAX) return texte
  const coupe = texte.slice(0, NOTE_MAX)
  return /[\ud800-\udbff]$/.test(coupe) ? coupe.slice(0, -1) : coupe
}

/**
 * Écrire, remplacer ou retirer la note d'une brasserie. Seul un champ vidé
 * la retire : une espace tapée sur tout le texte sélectionné l'effaçait
 * (revue adverse S36).
 */
export function ecrireNote(notes: readonly Note[], nom: string, texte: string): Note[] {
  const autres = notes.filter((n) => n.nom !== nom)
  if (texte === '') return autres
  const nouvelle = { nom, texte: couperNote(texte) }
  const i = notes.findIndex((n) => n.nom === nom)
  return i === -1 ? [...notes, nouvelle] : notes.map((n) => (n.nom === nom ? nouvelle : n))
}

/** Visite par visite : une illisible tombe seule ; un nom en double garde la première. */
function lireVisites(brut: unknown): Visite[] {
  if (!Array.isArray(brut)) return []
  const vues = new Set<string>()
  const visites: Visite[] = []
  for (const v of brut) {
    const r = visiteSchema.safeParse(v)
    if (!r.success || vues.has(r.data.nom)) continue
    vues.add(r.data.nom)
    visites.push(r.data)
  }
  return visites
}

/** Marquer ou démarquer une visite, à la date donnée (celle du jour). */
export function basculerVisite(visites: readonly Visite[], nom: string, date: string): Visite[] {
  return visites.some((v) => v.nom === nom) ? visites.filter((v) => v.nom !== nom) : [...visites, { nom, date }]
}

/** Le jour local, AAAA-MM-JJ : la date d'une visite, sans heure. */
export function dateDuJour(d: Date): string {
  const deux = (n: number) => String(n).padStart(2, '0')
  return `${String(d.getFullYear())}-${deux(d.getMonth() + 1)}-${deux(d.getDate())}`
}

/** La forme gardée : une position y devient le seul choix `autour`, sans coordonnées. */
export function versStockage(
  p: Omit<Preferences, 'depart'> & { depart: Origine | DepartGarde },
): Preferences {
  const d = p.depart
  let depart: DepartGarde
  if (d.type === 'position' || d.type === 'autour') depart = { type: 'autour' }
  else if (d.type === 'commune' && 'point' in d)
    depart = { type: 'commune', cle: d.cle, nom: d.nom, lat: d.point.lat, lon: d.point.lon }
  else if (d.type === 'commune') depart = d
  else depart = { type: 'brignais' }
  return { ...p, depart }
}

/** Le départ gardé, retrouvé dans les communes des données ; disparue → Brignais. */
export function origineDesPreferences(
  depart: DepartGarde,
  communes: readonly CommuneConnue[],
): Origine {
  if (depart.type !== 'commune') return ORIGINE_DEFAUT
  if (depart.nom !== undefined && depart.lat !== undefined && depart.lon !== undefined) {
    return { type: 'commune', cle: depart.cle, nom: depart.nom, point: { lat: depart.lat, lon: depart.lon } }
  }
  const c = communes.find((x) => x.cle === depart.cle)
  return c === undefined ? ORIGINE_DEFAUT : origineDeCommune(c)
}

export function basculerFavori(favoris: readonly string[], nom: string): string[] {
  return favoris.includes(nom) ? favoris.filter((f) => f !== nom) : [...favoris, nom]
}
