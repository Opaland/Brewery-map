import { distanceKm, type Point } from './distance'
import { destination } from './itineraire'
import type { Brasserie } from './schema'

/**
 * « Ma tournée » (S27 ; idée de la veille concurrentielle : les circuits
 * tout faits des distilleries écossaises, la route du cidre) : les favoris
 * mis bout à bout, ouverts d'un geste dans Google Maps.
 *
 * Quatre étapes au plus : trois étapes intermédiaires (`waypoints`) et une
 * destination, la limite des navigateurs de téléphone selon la
 * documentation de Google Maps (lue le 16/10 : « up to three waypoints
 * supported on mobile browsers »).
 */
export const ETAPES_MAX = 4

/**
 * De proche en proche depuis le départ, calculé dans le téléphone. Le
 * départ ne sort pas d'ici : le lien n'en porte rien (`lienTournee`).
 */
export function ordonnerTournee(etapes: readonly Brasserie[], depart: Point): Brasserie[] {
  const reste = [...etapes]
  const ordre: Brasserie[] = []
  let ici: Point = depart
  while (reste.length > 0 && ordre.length < ETAPES_MAX) {
    let meilleur = 0
    for (let i = 1; i < reste.length; i++) {
      const candidat = reste[i]
      const actuel = reste[meilleur]
      if (candidat !== undefined && actuel !== undefined && distanceKm(ici, candidat) < distanceKm(ici, actuel)) {
        meilleur = i
      }
    }
    const [suivante] = reste.splice(meilleur, 1)
    if (suivante === undefined) break
    ordre.push(suivante)
    ici = suivante
  }
  return ordre
}

function lieu(b: Brasserie): string {
  const d = destination(b)
  return d.mode === 'adresse' ? d.adresse : `${String(d.lat)},${String(d.lon)}`
}

/**
 * Le lien Google Maps : les étapes seules, sans `origin` — Google part alors
 * de la position de l'appareil, qu'il demande lui-même ; ce site ne
 * l'envoie pas (CLAUDE.md §0).
 */
export function lienTournee(etapes: readonly Brasserie[]): string {
  const url = new URL('https://www.google.com/maps/dir/')
  url.searchParams.set('api', '1')
  const derniere = etapes[etapes.length - 1]
  if (derniere !== undefined) url.searchParams.set('destination', lieu(derniere))
  const intermediaires = etapes.slice(0, -1).map(lieu)
  if (intermediaires.length > 0) url.searchParams.set('waypoints', intermediaires.join('|'))
  return url.toString()
}
