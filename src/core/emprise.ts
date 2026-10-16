import type { Point } from './distance'

/** Un rectangle [[ouest, sud], [est, nord]], dans l'ordre de MapLibre. */
export type Emprise = [[number, number], [number, number]]

const KM_PAR_DEGRE = 111.32

/**
 * Le rectangle qui contient des points, avec une marge (S24 : avec un nom
 * tapé, la carte se cadre sur les brasseries trouvées, pas sur le rayon).
 * 2 km de marge : un point seul reste lisible dans son quartier — seuil de
 * présentation (CLAUDE.md §2) ; 0 donnait un zoom maximal sans repère, 5 km
 * noyait le point dans la vallée.
 */
export function empriseDesPoints(points: readonly Point[], margeKm = 2): Emprise | undefined {
  const premier = points[0]
  if (premier === undefined) return undefined
  let [ouest, sud, est, nord] = [premier.lon, premier.lat, premier.lon, premier.lat]
  for (const p of points) {
    ouest = Math.min(ouest, p.lon)
    est = Math.max(est, p.lon)
    sud = Math.min(sud, p.lat)
    nord = Math.max(nord, p.lat)
  }
  const dLat = margeKm / KM_PAR_DEGRE
  const dLon = margeKm / (KM_PAR_DEGRE * Math.cos((((sud + nord) / 2) * Math.PI) / 180))
  return [
    [ouest - dLon, sud - dLat],
    [est + dLon, nord + dLat],
  ]
}
