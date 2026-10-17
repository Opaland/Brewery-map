import { t } from '../i18n'
import type { Brasserie } from './schema'

/**
 * « Y aller » (S19, persona Hugo) : un lien vers l'application de navigation
 * que la personne choisit, avec **la destination seule**. Aucun point de
 * départ : l'application prend la position elle-même, si la personne le
 * lui permet. Rien ici ne reçoit la position (la signature ne prend qu'une
 * fiche), et le test énumère les paramètres permis de chaque lien.
 */

export type Destination =
  | { mode: 'adresse'; adresse: string }
  | { mode: 'commune'; lat: number; lon: number }
  /** Le point posé sur OpenStreetMap par un contributeur (S25). */
  | { mode: 'osm'; lat: number; lon: number }

/**
 * Une adresse est un `addr` qui dit plus que le nom de la commune : 68 fiches
 * sur 166 au 16/10 n'ont que ce nom ; les 98 autres ont une rue, un lieu-dit
 * ou un code postal (le code postal seul en oubliait 4, revue code S19).
 * Sans adresse, le point de la fiche — placé à environ 2 km près — plutôt
 * que le nom de la commune, qui a des homonymes (« Château »,
 * « Montagny ») ; l'écran dit que ce n'est pas l'adresse.
 */
export function destination(b: Brasserie): Destination {
  // Une fiche OSM : son point, posé sur la carte par un contributeur, plutôt
  // qu'une adresse souvent sans commune (« 80 rue des moulins », 123 cas au
  // 16/10), qu'un service de guidage placerait n'importe où (revue S25).
  if (b.coordPrecision === 'osm') return { mode: 'osm', lat: b.lat, lon: b.lon }
  return b.addr.trim() !== b.c.trim()
    ? { mode: 'adresse', adresse: b.addr }
    : { mode: 'commune', lat: b.lat, lon: b.lon }
}

export type Plateforme = 'ios' | 'android' | 'autre'

/**
 * Lu dans l'agent du navigateur, jamais envoyé. iPhone : pas de `geo:` ;
 * Android : Plans (Apple) n'y est qu'une page web (revue Hugo S19). Ailleurs
 * ou en cas de doute, les quatre liens.
 */
export function plateformeDe(agent: string): Plateforme {
  if (/iPhone|iPad|iPod/.test(agent)) return 'ios'
  if (/Android/.test(agent)) return 'android'
  return 'autre'
}

export interface LienItineraire {
  appli: string
  url: string
}

export function liensItineraire(b: Brasserie, plateforme: Plateforme = 'autre'): LienItineraire[] {
  const d = destination(b)
  const point = d.mode === 'adresse' ? '' : `${String(d.lat)},${String(d.lon)}`
  const q = d.mode === 'adresse' ? encodeURIComponent(d.adresse) : point
  const google = { appli: 'Google Maps', url: `https://www.google.com/maps/dir/?api=1&destination=${q}` }
  const apple = { appli: t('Plans (Apple)'), url: `https://maps.apple.com/?daddr=${q}` }
  const waze = {
    appli: 'Waze',
    url:
      d.mode === 'adresse'
        ? `https://waze.com/ul?q=${q}&navigate=yes`
        : `https://waze.com/ul?ll=${q}&navigate=yes`,
  }
  // Android ouvre le choix de ses applications (OsmAnd, Organic Maps…). Sans
  // libellé « (nom) » : un nom à parenthèses le cassait (revue code S19).
  const geo = d.mode === 'adresse' ? `geo:0,0?q=${q}` : `geo:${point}?q=${point}`
  if (plateforme === 'ios') return [apple, google, waze]
  if (plateforme === 'android') return [google, waze, { appli: t('Autre application'), url: geo }]
  return [google, apple, waze, { appli: t('Autre application (Android)'), url: geo }]
}
