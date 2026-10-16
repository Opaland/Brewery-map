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
  /**
   * Les étiquettes OSM qui disent ce qu'est le lieu au-delà de « brasserie »
   * (un café, un bar, une enseigne…), recopiées telles quelles pour que
   * Cédric les voie (revue métier S14).
   */
  etiquettes?: Record<string, string>
}

/** Étiquettes gardées : celles qui décrivent le lieu ; liste fermée, montrée telle quelle. */
const ETIQUETTES = ['amenity', 'shop', 'brand', 'cuisine', 'opening_hours', 'microbrewery'] as const

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
  const etiquettes: Record<string, string> = {}
  for (const e of ETIQUETTES) {
    const v = texte(r.extratags?.[e])
    if (v !== undefined) etiquettes[e] = v
  }
  return {
    osm: `${type}/${String(r.osm_id)}`,
    nom,
    lat,
    lon,
    commune,
    departement: cp.slice(0, 2),
    adresse: `${rue === '' ? '' : `${rue}, `}${cp} ${commune}`,
    ...(site === undefined ? {} : { site }),
    ...(Object.keys(etiquettes).length === 0 ? {} : { etiquettes }),
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
  /**
   * - `present` : même cœur de nom qu'une fiche **de la même commune** — pas
   *   proposé (les fiches sont au centre de leur commune : la plus proche du
   *   point n'est pas forcément la bonne, revues S14) ;
   * - `homonyme` : exactement le même nom qu'une fiche d'une autre commune —
   *   pas proposé (le schéma refuse deux fiches de même nom), à vérifier ;
   * - `doublon` : même nom, casse comprise, qu'un candidat déjà vu — pas
   *   proposé ;
   * - `ambigu` : même cœur ailleurs, ou un nom qui contient l'autre — proposé,
   *   avec la fiche en cause nommée ;
   * - `nouveau` : aucun nom proche.
   */
  statut: 'present' | 'homonyme' | 'doublon' | 'ambigu' | 'nouveau'
  /** La fiche (ou le candidat, pour un doublon) en cause. */
  fiche?: string
  plusProche?: { n: string; km: number }
}

/** « Lyon » (OSM) et « Lyon 1er » (fichier) : même commune. */
function memeCommune(a: string, b: string): boolean {
  const x = normaliser(a)
  const y = normaliser(b)
  return x === y || x.startsWith(`${y} `) || y.startsWith(`${x} `)
}

const contient = (a: string, b: string) => ` ${a} `.includes(` ${b} `)

/** Chaque objet OSM une fois, avec son statut et la fiche la plus proche. */
export function classerCandidats(
  candidats: readonly CandidatOsm[],
  brasseries: readonly Brasserie[],
): CandidatClasse[] {
  const vus = new Set<string>()
  const nomsVus = new Map<string, string>()
  const fiches = brasseries.map((b) => ({ b, coeur: coeurDuNom(b.n), nom: normaliser(b.n) }))
  const resultat: CandidatClasse[] = []
  for (const c of candidats) {
    if (vus.has(c.osm)) continue
    vus.add(c.osm)
    let plusProche: { n: string; km: number } | undefined
    for (const b of brasseries) {
      const km = distanceKm(c, b)
      if (plusProche === undefined || km < plusProche.km) plusProche = { n: b.n, km }
    }
    const base = { ...c, ...(plusProche === undefined ? {} : { plusProche }) }
    const nom = normaliser(c.nom)
    const dejaVu = nomsVus.get(nom)
    if (dejaVu !== undefined) {
      resultat.push({ ...base, statut: 'doublon', fiche: dejaVu })
      continue
    }
    nomsVus.set(nom, c.nom)
    const k = coeurDuNom(c.nom)
    // La fiche en cause : même commune d'abord, puis la plus proche du point.
    const rang = (f: (typeof fiches)[number]) => [memeCommune(f.b.c, c.commune) ? 0 : 1, distanceKm(c, f.b)] as const
    const meilleure = (liste: typeof fiches) =>
      [...liste].sort((x, y) => {
        const [a1, a2] = rang(x)
        const [b1, b2] = rang(y)
        return a1 - b1 || a2 - b2
      })[0]
    const egales = k === '' ? [] : fiches.filter((f) => f.coeur === k)
    const egaleIci = egales.find((f) => memeCommune(f.b.c, c.commune))
    const homonyme = fiches.find((f) => f.nom === nom)
    const proches =
      k === '' ? [] : fiches.filter((f) => f.coeur !== '' && f.coeur !== k && (contient(f.coeur, k) || contient(k, f.coeur)))
    if (egaleIci !== undefined) resultat.push({ ...base, statut: 'present', fiche: egaleIci.b.n })
    else if (homonyme !== undefined) resultat.push({ ...base, statut: 'homonyme', fiche: homonyme.b.n })
    else {
      const enCause = meilleure([...egales, ...proches])
      resultat.push(
        enCause === undefined ? { ...base, statut: 'nouveau' } : { ...base, statut: 'ambigu', fiche: enCause.b.n },
      )
    }
  }
  return resultat
}

/**
 * La fiche proposée pour un candidat : « À confirmer » (OSM dit qu'une
 * brasserie existe, pas ce qu'on peut y faire), la raison dans la note, le
 * point OSM (`osm` : ni adresse vérifiée, ni centre de commune). `km` depuis
 * Brignais, au dixième comme le fichier.
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
    note: 'Repérée sur OpenStreetMap (carte collaborative) comme brasserie ; rien d’autre n’est vérifié : ni la vente, ni l’accueil, ni si elle est encore en activité.',
    addr: c.adresse,
    // La catégorie 0 accepte une source : c'est l'objet OSM, que la fiche
    // affiche comme telle (revue métier S14 : le numéro sortait de la note).
    src: `https://www.openstreetmap.org/${c.osm}`,
    coordPrecision: 'osm',
    beers: [],
  }
}
