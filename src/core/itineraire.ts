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

/**
 * Une adresse se reconnaît à son code postal : sans lui, `addr` n'est que le
 * nom de la commune (68 fiches sur 166 au 16/10). Les coordonnées du fichier
 * sont toutes celles du centre de la commune : l'adresse écrite mène plus
 * près. Sans adresse, le point de la commune plutôt que son nom, qui a des
 * homonymes (« Château », « Montagny »). L'écran dit alors que ce n'est pas
 * l'adresse.
 */
export function destination(b: Brasserie): Destination {
  return /\b\d{5}\b/.test(b.addr)
    ? { mode: 'adresse', adresse: b.addr }
    : { mode: 'commune', lat: b.lat, lon: b.lon }
}

export interface LienItineraire {
  appli: string
  url: string
}

export function liensItineraire(b: Brasserie): LienItineraire[] {
  const d = destination(b)
  const point = d.mode === 'commune' ? `${String(d.lat)},${String(d.lon)}` : ''
  const cible = d.mode === 'adresse' ? d.adresse : point
  const q = encodeURIComponent(cible)
  return [
    {
      appli: 'Google Maps',
      url: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
    },
    { appli: 'Plans (Apple)', url: `https://maps.apple.com/?daddr=${q}` },
    {
      appli: 'Waze',
      url:
        d.mode === 'adresse'
          ? `https://waze.com/ul?q=${q}&navigate=yes`
          : `https://waze.com/ul?ll=${q}&navigate=yes`,
    },
    {
      // Android ouvre le choix de ses applications (OsmAnd, Organic Maps…).
      appli: 'Autre application (Android)',
      url:
        d.mode === 'adresse'
          ? `geo:0,0?q=${q}`
          : `geo:${point}?q=${q}(${encodeURIComponent(b.n)})`,
    },
  ]
}

/**
 * « de » devant un nom de commune, accordé : « de Brignais », « d’Oullins »,
 * « du Grand-Serre », « des Abrets ». La liste des cas est fermée : une
 * commune qui commence par « La » garde « de La ».
 */
export function deCommune(c: string): string {
  if (c.startsWith('Le ')) return `du ${c.slice(3)}`
  if (c.startsWith('Les ')) return `des ${c.slice(4)}`
  if (/^[AEIOUYÀÂÉÈÊÎÔH]/i.test(c)) return `d’${c}`
  return `de ${c}`
}
