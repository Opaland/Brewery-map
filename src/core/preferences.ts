import { z } from 'zod'
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
 * Le départ gardé. **Jamais la position** : « autour de moi » se redemande à
 * chaque visite, et le stockage n'en garde aucune trace (Léa, S8). Une
 * commune se garde par sa clé, et se retrouve dans les données au retour.
 */
const departSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('brignais') }).strict(),
  z.object({ type: z.literal('commune'), cle: z.string().min(1) }).strict(),
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
}

export interface Preferences {
  version: 1
  rayonKm: number
  categories: Categorie[]
  type?: TypeDeBiere
  depart: DepartGarde
  favoris: string[]
  favorisSeulement: boolean
}

export const PREFERENCES_DEFAUT: Preferences = {
  version: 1,
  rayonKm: RAYON.initial,
  categories: [...ORDRE_CATEGORIES],
  depart: { type: 'brignais' },
  favoris: [],
  favorisSeulement: false,
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
    version: 1,
    rayonKm: lire(CHAMPS.rayonKm, g.rayonKm, d.rayonKm),
    categories: lire(CHAMPS.categories, g.categories, d.categories),
    ...(type === undefined ? {} : { type }),
    depart: lire(CHAMPS.depart, g.depart, d.depart),
    favoris,
    favorisSeulement: lire(CHAMPS.favorisSeulement, g.favorisSeulement, d.favorisSeulement),
  }
}

/** La forme gardée : le départ y perd toujours ses coordonnées. */
export function versStockage(
  p: Omit<Preferences, 'depart'> & { depart: Origine | DepartGarde },
): Preferences {
  const depart: DepartGarde =
    p.depart.type === 'commune' ? { type: 'commune', cle: p.depart.cle } : { type: 'brignais' }
  return { ...p, depart }
}

/** Le départ gardé, retrouvé dans les communes des données ; disparue → Brignais. */
export function origineDesPreferences(
  depart: DepartGarde,
  communes: readonly CommuneConnue[],
): Origine {
  if (depart.type === 'brignais') return ORIGINE_DEFAUT
  const c = communes.find((x) => x.cle === depart.cle)
  return c === undefined ? ORIGINE_DEFAUT : origineDeCommune(c)
}

export function basculerFavori(favoris: readonly string[], nom: string): string[] {
  return favoris.includes(nom) ? favoris.filter((f) => f !== nom) : [...favoris, nom]
}
