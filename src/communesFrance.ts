import {
  departementsProches,
  indexerCommunes,
  type CommuneFrance,
  type CommuneIndexee,
  type Rectangle,
} from './core/communes'
import type { Point } from './core/distance'

/**
 * Les communes de France, chargées depuis l'application elle-même (même
 * origine : la commune tapée ne quitte pas le téléphone, CLAUDE.md §0).
 *
 * Deux temps (demande de Cédric du 16/10) : les départements à moins de
 * 100 km du départ d'abord (quelques Ko, recherche quasi instantanée), le
 * fichier entier (≈ 470 Ko compressé) seulement pour chercher plus loin.
 * Le service worker garde chaque fichier une fois lu : hors ligne ensuite.
 */
const BASE = `${import.meta.env.BASE_URL}communes/`
export const RAYON_PRES_KM = 100

let rectangles: Promise<Record<string, Rectangle>> | undefined
const departements = new Map<string, Promise<CommuneFrance[]>>()
let toutes: Promise<CommuneIndexee[]> | undefined

async function json<T>(url: string): Promise<T> {
  const r = await fetch(url)
  if (!r.ok) throw new Error(`${url} : ${String(r.status)}`)
  return (await r.json()) as T
}

function departement(dep: string): Promise<CommuneFrance[]> {
  let p = departements.get(dep)
  if (p === undefined) {
    p = json<[string, number, number][]>(`${BASE}${dep}.json`).then((l) =>
      l.map(([nom, lat, lon]) => [nom, dep, lat, lon] as const),
    )
    // Un échec (connexion) ne reste pas en mémoire : un nouvel essai refait la demande.
    p.catch(() => departements.delete(dep))
    departements.set(dep, p)
  }
  return p
}

/** Les communes à moins de 100 km du point, indexées pour la recherche. */
export async function communesProches(depart: Point): Promise<CommuneIndexee[]> {
  rectangles ??= json<Record<string, Rectangle>>(`${BASE}departements.json`)
  rectangles.catch(() => (rectangles = undefined))
  const deps = departementsProches(await rectangles, depart, RAYON_PRES_KM)
  const listes = await Promise.all(deps.map(departement))
  return indexerCommunes(listes.flat())
}

/** Toutes les communes de France, une seule fois. */
export function communesDeFrance(): Promise<CommuneIndexee[]> {
  toutes ??= json<CommuneFrance[]>(`${import.meta.env.BASE_URL}communes-france.json`).then(
    indexerCommunes,
  )
  toutes.catch(() => (toutes = undefined))
  return toutes
}
