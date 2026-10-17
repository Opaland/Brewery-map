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
 * origine). Le texte tapé ne part nulle part ; les fichiers demandés, eux,
 * disent au serveur de la page la région du départ choisi — jamais celle
 * d'une position (alors, seul le fichier entier, le même pour tous). Le
 * texte de confidentialité le dit (revue globale S22).
 *
 * Deux temps (demande de Cédric du 16/10) : les départements à moins de
 * 100 km du départ d'abord (quelques Ko, recherche quasi instantanée), le
 * fichier entier (≈ 470 Ko compressé) seulement pour chercher plus loin.
 * Le service worker garde d'avance le fichier entier et la liste des
 * départements (S42) : la recherche marche hors ligne dès l'installation.
 * Si le fichier d'un département manque, `ChoixCommune` cherche dans le
 * fichier entier (son repli « rien près du départ »).
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
