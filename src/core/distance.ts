import { t } from '../i18n'
export interface Point {
  lat: number
  lon: number
}

/** Point de départ par défaut (cahier des charges §1.1). */
export const BRIGNAIS: Point = { lat: 45.6745, lon: 4.7545 }

/** Rayon terrestre moyen (km), valeur usuelle de la formule de haversine. */
const RAYON_TERRE_KM = 6371

const radians = (degres: number) => (degres * Math.PI) / 180

/**
 * Distance à vol d'oiseau (grand cercle), calculée dans le navigateur.
 *
 * Elle remplace le champ `km` du fichier (décision de Cédric, 15/10) : `km`
 * ne vaut que depuis Brignais, et deux lignes s'écartaient de plus de 2 km du
 * calcul (BACKLOG D6). Aucune requête réseau : la position ne sort pas.
 */
export function distanceKm(a: Point, b: Point): number {
  const dLat = radians(b.lat - a.lat)
  const dLon = radians(b.lon - a.lon)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radians(a.lat)) * Math.cos(radians(b.lat)) * Math.sin(dLon / 2) ** 2
  return 2 * RAYON_TERRE_KM * Math.asin(Math.min(1, Math.sqrt(h)))
}

/**
 * Une distance au kilomètre près, précédée de « ≈ » : les positions sont
 * approximatives (jusqu'à 14 km d'écart au
 * centre communal, docs/PRECISION.md), une décimale promettrait une précision
 * qui n'existe pas. Choix de présentation (CLAUDE.md §2).
 */
export function formaterDistance(km: number): string {
  return km < 1 ? t('moins de 1 km') : `≈ ${String(Math.round(km))} km`
}
