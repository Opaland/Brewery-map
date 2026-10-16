/**
 * La découverte (S14) : les brasseries qu'OpenStreetMap connaît en
 * Auvergne-Rhône-Alpes, comparées au fichier, en lot de **fiches nouvelles**
 * à décider par Cédric.
 *
 *   npx tsx outils/decouverte.ts
 *
 * Source : Nominatim (nominatim.openstreetmap.org), recherche « brewery »
 * par tuiles d'un demi-degré, une requête par 1,1 s au plus et un
 * User-Agent qui nomme le projet (politique d'usage de Nominatim : une
 * requête par seconde). Overpass, prévu au plan, était injoignable depuis
 * l'environnement le 16/10 (SPRINTS.md §S14).
 *
 * Écrit `curation/osm-AAAA-MM-JJ.json` (les candidats lus, pour la
 * provenance) et `curation/s14-decouverte.json` (le lot). N'écrit jamais
 * `data/`.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import type { Lot } from '../src/core/curation'
import { lireLot } from '../src/core/curation'
import { ajoutDepuisOsm, candidatDepuisNominatim, classerCandidats, type CandidatOsm } from '../src/core/decouverte'
import { BRIGNAIS, distanceKm } from '../src/core/distance'
import { validerBrasseries } from '../src/core/schema'

const AUJOURDHUI = new Date().toISOString().slice(0, 10)
/** Départements d'Auvergne-Rhône-Alpes. */
const ARA = new Set(['01', '03', '07', '15', '26', '38', '42', '43', '63', '69', '73', '74'])
/** Rectangle qui contient la région (degrés). */
const CADRE = { sud: 44.1, nord: 46.85, ouest: 2.05, est: 7.2 }
const PAS = 0.5
/** Nominatim ne rend pas plus de 50 résultats : au-delà, la tuile est coupée en quatre. */
const LIMITE = 50
const AGENT = 'MousseDePoche-curation/1.0 (https://github.com/Opaland/Brewery-map)'

const pause = (ms: number) =>
  new Promise((r) => {
    setTimeout(r, ms)
  })

let requetes = 0

async function chercher(sud: number, ouest: number, nord: number, est: number): Promise<unknown[]> {
  const url = new URL('https://nominatim.openstreetmap.org/search')
  url.search = new URLSearchParams({
    q: 'brewery',
    format: 'jsonv2',
    limit: String(LIMITE),
    addressdetails: '1',
    extratags: '1',
    bounded: '1',
    viewbox: `${String(ouest)},${String(nord)},${String(est)},${String(sud)}`,
  }).toString()
  await pause(1100)
  requetes++
  const r = await fetch(url, { headers: { 'User-Agent': AGENT } })
  if (!r.ok) throw new Error(`Nominatim ${String(r.status)} pour ${url.toString()}`)
  const brut = (await r.json()) as unknown[]
  if (brut.length < LIMITE) return brut
  const lat = (sud + nord) / 2
  const lon = (ouest + est) / 2
  const quarts = [
    [sud, ouest, lat, lon],
    [sud, lon, lat, est],
    [lat, ouest, nord, lon],
    [lat, lon, nord, est],
  ] as const
  const sous: unknown[] = []
  for (const [s, o, n, e] of quarts) sous.push(...(await chercher(s, o, n, e)))
  return sous
}

const brasseries = (() => {
  const v = validerBrasseries(JSON.parse(readFileSync('data/breweries.json', 'utf8')))
  if (!v.ok) throw new Error(v.erreurs.join('\n'))
  return v.brasseries
})()

/**
 * `--depuis curation/osm-<date>.json` : refaire le lot à partir des candidats
 * déjà lus, sans réinterroger Nominatim (la date de lecture est la leur).
 */
const depuis = process.argv[2] === '--depuis' ? process.argv[3] : undefined
let lu = AUJOURDHUI
const candidats: CandidatOsm[] = []
if (depuis !== undefined) {
  const brut = JSON.parse(readFileSync(depuis, 'utf8')) as { lu: string; requetes: number; candidats: CandidatOsm[] }
  lu = brut.lu
  requetes = brut.requetes
  for (const { osm, nom, lat, lon, commune, departement, adresse, site } of brut.candidats) {
    candidats.push({ osm, nom, lat, lon, commune, departement, adresse, ...(site === undefined ? {} : { site }) })
  }
} else {
  for (let sud = CADRE.sud; sud < CADRE.nord; sud += PAS) {
    for (let ouest = CADRE.ouest; ouest < CADRE.est; ouest += PAS) {
      for (const r of await chercher(sud, ouest, sud + PAS, ouest + PAS)) {
        const c = candidatDepuisNominatim(r as Parameters<typeof candidatDepuisNominatim>[0])
        if (c !== null && ARA.has(c.departement)) candidats.push(c)
      }
    }
  }
}

const classes = classerCandidats(candidats, brasseries)
const kmEntre = (c: CandidatOsm, nom: string) => {
  const f = brasseries.find((b) => b.n === nom)
  return f === undefined ? '?' : `${distanceKm(c, f).toFixed(1).replace('.', ',')} km`
}
writeFileSync(
  `curation/osm-${lu}.json`,
  `${JSON.stringify({ source: 'nominatim.openstreetmap.org, q=brewery, craft=brewery', lu, requetes, candidats: classes }, null, 1)}\n`,
)

const nouveaux = classes
  .filter((c) => c.statut !== 'present')
  .sort((a, b) => distanceKm(BRIGNAIS, a) - distanceKm(BRIGNAIS, b))
const lot: Lot = {
  lot: 's14-decouverte',
  propositions: [],
  revues: [],
  ajouts: nouveaux.map((c) => ({
    fiche: ajoutDepuisOsm(c),
    verifieLe: lu,
    sources: [`https://www.openstreetmap.org/${c.osm}`],
    extrait: [`name=${c.nom}`, 'craft=brewery', `adresse=${c.adresse}`, ...(c.site === undefined ? [] : [`website=${c.site}`])].join(' ; '),
    choix: [
      ...(c.statut === 'ambigu' && c.fiche !== undefined
        ? [`Nom proche d'une fiche du fichier : « ${c.fiche} », à ${kmEntre(c, c.fiche)} — même brasserie ? Sinon, à ajouter.`]
        : []),
      ...(c.plusProche === undefined
        ? []
        : [`Fiche du fichier la plus proche : ${c.plusProche.n}, à ${c.plusProche.km.toFixed(1).replace('.', ',')} km.`]),
    ].join(' '),
  })),
}
const v = lireLot(lot, AUJOURDHUI)
if (!v.ok) throw new Error(`lot invalide :\n${v.erreurs.join('\n')}`)
writeFileSync('curation/s14-decouverte.json', `${JSON.stringify(lot, null, 1)}\n`)
console.log(
  `${String(requetes)} requêtes ; ${String(classes.length)} brasseries OSM en ARA ; ` +
    `${String(classes.length - nouveaux.length)} déjà dans le fichier ; ${String(nouveaux.length)} proposées ` +
    `(dont ${String(classes.filter((c) => c.statut === 'ambigu').length)} au nom proche d'une fiche).`,
)
