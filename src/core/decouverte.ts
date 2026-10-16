import { BRIGNAIS, distanceKm } from './distance'
import { normaliser } from './recherche'
import type { Brasserie } from './schema'

/**
 * La découverte (S14) : les brasseries qu'OpenStreetMap connaît et que le
 * fichier n'a pas — y compris au-delà des 100 km de Brignais, demande de
 * Cédric du 15/10. Ce module ne lit pas le réseau : il lit des résultats
 * Nominatim déjà récupérés (`outils/decouverte.ts`) et propose. Rien
 * n'entre dans `data/` sans l'accord de Cédric, ligne par ligne.
 */

export interface CandidatOsm {
  /** « node/123 », « way/456 » : l'objet OSM, retrouvable sur openstreetmap.org. */
  osm: string
  nom: string
  lat: number
  lon: number
  commune: string
  departement: string
  adresse: string
  site?: string
}

interface NominatimBrut {
  osm_type?: unknown
  osm_id?: unknown
  lat?: unknown
  lon?: unknown
  category?: unknown
  type?: unknown
  name?: unknown
  address?: Record<string, unknown>
  extratags?: Record<string, unknown> | null
}

const texte = (v: unknown): string | undefined => (typeof v === 'string' && v.trim() !== '' ? v.trim() : undefined)

/**
 * Un résultat Nominatim (`format=jsonv2&addressdetails=1&extratags=1`) en
 * candidat, ou `null`. Seuls les objets `craft=brewery` nommés, avec une
 * commune et un code postal de métropole hors Corse, passent : rien n'est
 * deviné (le département de la Corse ne se lit pas sur « 20… »).
 */
export function candidatDepuisNominatim(r: NominatimBrut): CandidatOsm | null {
  if (r.category !== 'craft' || r.type !== 'brewery') return null
  const nom = texte(r.name)
  const a = r.address ?? {}
  const commune = texte(a.city) ?? texte(a.town) ?? texte(a.village) ?? texte(a.municipality)
  const cp = texte(a.postcode)
  const type = texte(r.osm_type)
  const lat = Number(r.lat)
  const lon = Number(r.lon)
  if (nom === undefined || commune === undefined || cp === undefined || type === undefined) return null
  if (!/^\d{5}$/.test(cp) || cp.startsWith('20')) return null
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || typeof r.osm_id !== 'number') return null
  const rue = [texte(a.house_number), texte(a.road)].filter((x) => x !== undefined).join(' ')
  const site = texte(r.extratags?.website)
  return {
    osm: `${type}/${String(r.osm_id)}`,
    nom,
    lat,
    lon,
    commune,
    departement: cp.slice(0, 2),
    adresse: `${rue === '' ? '' : `${rue}, `}${cp} ${commune}`,
    ...(site === undefined ? {} : { site }),
  }
}

/**
 * Mots qui ne distinguent pas une brasserie d'une autre. Liste fermée, pas un
 * seuil : elle ne sert qu'à rapprocher « Microbrasserie Caribrew » de
 * « Caribrew », et chaque rapprochement est montré à Cédric.
 */
const GENERIQUES = new Set([
  'brasserie',
  'microbrasserie',
  'micro',
  'brasseur',
  'brasseurs',
  'brewery',
  'brewing',
  'brewpub',
  'biere',
  'bieres',
  'beer',
  'artisanale',
  'la',
  'le',
  'les',
  'l',
  'de',
  'du',
  'des',
  'd',
  'et',
])

export function coeurDuNom(nom: string): string {
  return normaliser(nom)
    .split(' ')
    .filter((m) => m !== '' && !GENERIQUES.has(m))
    .join(' ')
}

export interface CandidatClasse extends CandidatOsm {
  /** `present` : un nom du fichier a le même cœur, ou le contient, ou y est contenu. */
  statut: 'present' | 'nouveau'
  fiche?: string
  plusProche?: { n: string; km: number }
}

/** Chaque objet OSM une fois, avec son statut et la fiche la plus proche. */
export function classerCandidats(
  candidats: readonly CandidatOsm[],
  brasseries: readonly Brasserie[],
): CandidatClasse[] {
  const vus = new Set<string>()
  const coeurs = brasseries.map((b) => ({ n: b.n, coeur: coeurDuNom(b.n) }))
  const resultat: CandidatClasse[] = []
  for (const c of candidats) {
    if (vus.has(c.osm)) continue
    vus.add(c.osm)
    const k = coeurDuNom(c.nom)
    const meme = k === '' ? undefined : coeurs.find((f) => f.coeur !== '' && (f.coeur === k || ` ${f.coeur} `.includes(` ${k} `) || ` ${k} `.includes(` ${f.coeur} `)))
    let plusProche: { n: string; km: number } | undefined
    for (const b of brasseries) {
      const km = distanceKm(c, b)
      if (plusProche === undefined || km < plusProche.km) plusProche = { n: b.n, km }
    }
    resultat.push({
      ...c,
      statut: meme === undefined ? 'nouveau' : 'present',
      ...(meme === undefined ? {} : { fiche: meme.n }),
      ...(plusProche === undefined ? {} : { plusProche }),
    })
  }
  return resultat
}

/**
 * La fiche proposée pour un candidat : « À confirmer », sans source de vente
 * (OSM dit qu'une brasserie existe, pas ce qu'on peut y faire), la raison dans
 * la note, le point OSM (`address` : c'est l'objet, pas le centre de la
 * commune). `km` depuis Brignais, au dixième comme le fichier.
 */
export function ajoutDepuisOsm(c: CandidatOsm): Brasserie {
  return {
    n: c.nom,
    c: c.commune,
    d: c.departement,
    lat: c.lat,
    lon: c.lon,
    km: Math.round(distanceKm(BRIGNAIS, c) * 10) / 10,
    cat: 0,
    conf: '',
    note: `Listée dans OpenStreetMap comme brasserie (craft=brewery, ${c.osm}) ; rien d'autre n'est vérifié : ni la vente, ni l'accueil, ni l'activité.`,
    addr: c.adresse,
    src: '',
    coordPrecision: 'address',
    beers: [],
  }
}
