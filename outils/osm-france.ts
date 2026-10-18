/**
 * Fabrique `src/donnees-osm/brasseries-osm.json` : les brasseries de toute la France
 * connues d'OpenStreetMap (S25, demande de Cédric du 16/10 : « ouvrir toute
 * la France »). Une couche **à part** de `data/` : celle-ci n'est pas
 * modifiée (CLAUDE.md §0).
 *
 * - Source : Overpass, miroir français (`overpass.openstreetmap.fr`) ; le
 *   serveur principal coupe la connexion depuis l'environnement (16/10), et
 *   le miroir n'a pas les zones administratives : une requête par
 *   rectangle (métropole et Corse, puis chaque DROM), filtrée ensuite par
 *   `rattacher` (communes françaises, codes postaux).
 * - Doublons avec le fichier retirés par `classerCandidats` (S14).
 * - Licence : ODbL — attribution et partage à l'identique ; le fichier
 *   publié le dit.
 *
 * Usage : `npx tsx outils/osm-france.ts` (réseau requis, une minute ou deux).
 */
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { CommuneFrance, Rectangle } from '../src/core/communes'
import { classerCandidats, type CandidatOsm } from '../src/core/decouverte'
import { distanceKm } from '../src/core/distance'
import { normaliser } from '../src/core/recherche'
import {
  dejaDansLeFichier,
  lireElementOverpass,
  nomsUniques,
  raisonDEcarter,
  rattacher,
  type BrasserieOsmBrute,
  type ElementOverpass,
} from '../src/core/osm-france'
import { brasseriesSchema } from '../src/core/schema'
import { demanderOverpass } from './overpass'
import { fetchCompte } from './requetes'

const AGENT = 'MousseDePoche/1.0 (https://github.com/Opaland/Brewery-map)'
const SORTIE = path.resolve('src/donnees-osm/brasseries-osm.json')

/** sud, ouest, nord, est */
const RECTANGLES_REQUETE: Record<string, [number, number, number, number]> = {
  'métropole et Corse': [41.3, -5.3, 51.2, 9.7],
  Guadeloupe: [15.8, -61.9, 16.6, -61.0],
  Martinique: [14.3, -61.3, 14.95, -60.7],
  Guyane: [2.0, -54.7, 5.9, -51.5],
  'La Réunion': [-21.45, 55.1, -20.8, 55.9],
  Mayotte: [-13.1, 44.9, -12.6, 45.4],
}

async function demander(rect: [number, number, number, number], quoi: string): Promise<{ elements: ElementOverpass[]; base: string }> {
  return demanderOverpass(`[out:json][timeout:170];nwr["craft"="brewery"](${rect.join(',')});out center tags;`, quoi)
}

const communes = JSON.parse(await readFile('public/communes-france.json', 'utf8')) as CommuneFrance[]
const rectangles = JSON.parse(await readFile('public/communes/departements.json', 'utf8')) as Record<string, Rectangle>
const fichier = brasseriesSchema.parse(JSON.parse(await readFile('data/breweries.json', 'utf8')))

const lus: BrasserieOsmBrute[] = []
let base = ''
let sansNom = 0
const ecartesAuNom = new Map<string, number>()
for (const [quoi, rect] of Object.entries(RECTANGLES_REQUETE)) {
  const r = await demander(rect, quoi)
  base = base === '' || r.base < base ? r.base : base
  for (const e of r.elements) {
    const b = lireElementOverpass(e)
    if (b === null) {
      sansNom++
      continue
    }
    const raison = raisonDEcarter(b.nom, e.tags ?? {})
    if (raison !== undefined) {
      ecartesAuNom.set(raison, (ecartesAuNom.get(raison) ?? 0) + 1)
      continue
    }
    lus.push(b)
  }
  console.log(`${quoi} : ${String(r.elements.length)} éléments`)
}

/**
 * Le pays d'un point dont la commune est déduite (sans code postal ni ville),
 * lu par Nominatim (`reverse`, `zoom=3`). Revue adverse S25 : 28 des 649
 * premiers étaient à l'étranger (Orval, Westvleteren…), rattachés à une
 * commune française voisine. Gardé dans `outils/cache/pays-osm.json` : une
 * requête par point et par lancement au plus, une par seconde (règle
 * d'usage de Nominatim).
 */
const CACHE_PAYS = path.resolve('outils/cache/pays-osm.json')
const pays: Partial<Record<string, string>> = existsSync(CACHE_PAYS)
  ? (JSON.parse(await readFile(CACHE_PAYS, 'utf8')) as Record<string, string>)
  : {}
async function paysDe(osm: string, lat: number, lon: number): Promise<string> {
  const deja = pays[osm]
  if (deja !== undefined) return deja
  await new Promise((ok) => setTimeout(ok, 1100))
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=3&lat=${String(lat)}&lon=${String(lon)}`
  const r = await fetchCompte(url, { headers: { 'User-Agent': AGENT } })
  if (!r.ok) throw new Error(`Nominatim ${String(r.status)} pour ${osm}`)
  const j = (await r.json()) as { address?: { country_code?: string } }
  const code = j.address?.country_code ?? '?'
  pays[osm] = code
  return code
}

const exclus = new Map<string, number>()
const candidats: (CandidatOsm & { deduite: boolean })[] = []
let plusLoin = 0
for (const b of lus) {
  const r = rattacher(b, communes, rectangles)
  if ('exclu' in r) {
    exclus.set(r.exclu, (exclus.get(r.exclu) ?? 0) + 1)
    continue
  }
  if (r.deduite && (await paysDe(b.osm, b.lat, b.lon)) !== 'fr') {
    exclus.set('à l’étranger selon Nominatim', (exclus.get('à l’étranger selon Nominatim') ?? 0) + 1)
    continue
  }
  const proche = communes.reduce((m, c) => Math.min(m, distanceKm(b, { lat: c[2], lon: c[3] })), Infinity)
  plusLoin = Math.max(plusLoin, proche)
  candidats.push({
    osm: b.osm,
    nom: b.nom,
    lat: b.lat,
    lon: b.lon,
    commune: r.commune,
    departement: r.dep,
    adresse: b.adresse,
    ...(b.site === undefined ? {} : { site: b.site }),
    deduite: r.deduite,
  })
}

// Le même lieu dessiné deux fois (un point et un bâtiment) : le même nom à
// moins d'un kilomètre ne compte qu'une fois.
const classes = classerCandidats(candidats, fichier)
const gardes: typeof candidats = []
let deja = 0
let memeLieu = 0
for (const c of classes) {
  if (c.statut === 'present' || c.statut === 'homonyme' || dejaDansLeFichier(c, fichier) !== undefined) {
    deja++
    continue
  }
  const original = candidats.find((x) => x.osm === c.osm)
  if (original === undefined) continue
  if (gardes.some((g) => normaliser(g.nom) === normaliser(c.nom) && distanceKm(g, c) < 1)) {
    memeLieu++
    continue
  }
  gardes.push(original)
}

await mkdir(path.dirname(CACHE_PAYS), { recursive: true })
await writeFile(
  CACHE_PAYS,
  `${JSON.stringify(Object.fromEntries(Object.entries(pays).sort(([a], [b]) => a.localeCompare(b))), null, 1)}\n`,
)

gardes.sort((a, b) => a.osm.localeCompare(b.osm))
const uniques = nomsUniques(
  gardes.map((g) => ({ ...g, n: g.nom, c: g.commune })),
  new Set(fichier.map((b) => b.n)),
)

const arrondi = (x: number) => Math.round(x * 1e5) / 1e5
await writeFile(
  SORTIE,
  `${JSON.stringify({
    source: 'OpenStreetMap, craft=brewery, via overpass.openstreetmap.fr',
    licence: 'ODbL 1.0 — © contributeurs OpenStreetMap, https://www.openstreetmap.org/copyright',
    extrait: base,
    // [nom affiché, objet OSM, commune, département, lat, lon, adresse, site, commune déduite (1) ou lue (0)]
    brasseries: uniques.map((u) => [
      u.n,
      u.osm,
      u.commune,
      u.departement,
      arrondi(u.lat),
      arrondi(u.lon),
      u.adresse,
      u.site ?? '',
      u.deduite ? 1 : 0,
    ]),
  })}\n`,
)

console.log(`lus : ${String(lus.length)} nommés, ${String(sansNom)} sans nom (écartés)`)
for (const [raison, n] of ecartesAuNom) console.log(`écartés au nom ou aux étiquettes, ${raison} : ${String(n)}`)
for (const [raison, n] of exclus) console.log(`écartés, ${raison} : ${String(n)}`)
console.log(`déjà dans le fichier : ${String(deja)} ; même lieu dessiné deux fois : ${String(memeLieu)}`)
console.log(`gardés : ${String(uniques.length)} ; commune déduite : ${String(uniques.filter((u) => u.deduite).length)}`)
console.log(`plus grande distance d'un point gardé à une commune : ${plusLoin.toFixed(1)} km`)
console.log(`extrait OSM du ${base} → ${SORTIE}`)
