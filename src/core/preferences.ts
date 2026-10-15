import { z } from 'zod'
import { ORDRE_CATEGORIES } from './categories'
import { ORIGINE_DEFAUT, origineDeCommune, type CommuneConnue, type Origine } from './origine'
import { categorieSchema, typeDeBiereSchema } from './schema'

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

const preferencesSchema = z
  .object({
    version: z.literal(1),
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
  })
  .strict()

export type Preferences = z.infer<typeof preferencesSchema>

export const PREFERENCES_DEFAUT: Preferences = {
  version: 1,
  rayonKm: RAYON.initial,
  categories: [...ORDRE_CATEGORIES],
  depart: { type: 'brignais' },
  favoris: [],
  favorisSeulement: false,
}

/**
 * Relit ce qui a été gardé. Tout ou rien : un contenu qui ne passe pas le
 * schéma (version ancienne, stockage abîmé ou modifié à la main) rend les
 * réglages par défaut, plutôt qu'un mélange deviné champ par champ.
 */
export function lirePreferences(brut: unknown): Preferences {
  const r = preferencesSchema.safeParse(brut)
  return r.success ? r.data : PREFERENCES_DEFAUT
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
