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
 * provenance), `curation/<lot>.json` (le lot, `--lot`, défaut
 * s14-decouverte), son résumé et la
 * liste de ce qui n'est pas proposé. N'écrit jamais `data/`.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import type { Lot } from '../src/core/curation'
import { appliquerLot, lireLot } from '../src/core/curation'
import {
  ajoutDepuisOsm,
  candidatDepuisNominatim,
  classerCandidats,
  type CandidatClasse,
  type CandidatOsm,
} from '../src/core/decouverte'
import { BRIGNAIS, distanceKm } from '../src/core/distance'
import { validerBrasseries } from '../src/core/schema'
import { fetchCompte } from './requetes'

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
  const r = await fetchCompte(url, { headers: { 'User-Agent': AGENT } })
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
const argument = (nom: string) => {
  const i = process.argv.indexOf(nom)
  return i === -1 ? undefined : process.argv[i + 1]
}
const depuis = argument('--depuis')
/**
 * `--lot <nom>` : le nom du lot et de ses fichiers (défaut : s14-decouverte).
 * Un lot existant n'est **jamais** écrasé — il peut attendre la décision de
 * Cédric, sur une empreinte qu'il a lue (revue code S15) — sauf
 * `--remplacer`, à la demande de Cédric seulement.
 */
const NOM = argument('--lot') ?? 's14-decouverte'
const PREFIXE = NOM.replace(/-decouverte$/, '')
if (existsSync(`curation/${NOM}.json`) && !process.argv.includes('--remplacer')) {
  console.error(`curation/${NOM}.json existe déjà : choisir un autre --lot (il attend peut-être la décision de Cédric).`)
  process.exit(1)
}
let lu = AUJOURDHUI
const candidats: CandidatOsm[] = []
if (depuis !== undefined) {
  const brut = JSON.parse(readFileSync(depuis, 'utf8')) as { lu: string; requetes: number; candidats: CandidatOsm[] }
  lu = brut.lu
  requetes = brut.requetes
  for (const { osm, nom, lat, lon, commune, departement, adresse, site, etiquettes } of brut.candidats) {
    candidats.push({
      osm, nom, lat, lon, commune, departement, adresse,
      ...(site === undefined ? {} : { site }),
      ...(etiquettes === undefined ? {} : { etiquettes }),
    })
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
writeFileSync(
  `curation/osm-${lu}.json`,
  `${JSON.stringify({ source: 'nominatim.openstreetmap.org, q=brewery, craft=brewery', lu, requetes, candidats: classes }, null, 1)}\n`,
)

const km = (a: { lat: number; lon: number }, b: { lat: number; lon: number }) =>
  `${distanceKm(a, b).toFixed(1).replace('.', ',')} km`
const fiche = (n: string) => brasseries.find((b) => b.n === n)

const proposes = classes
  .filter((c) => c.statut === 'nouveau' || c.statut === 'ambigu')
  .sort((a, b) => distanceKm(BRIGNAIS, a) - distanceKm(BRIGNAIS, b))

/** Ce que Cédric doit savoir avant de décider, en phrases (revue métier S14). */
function signaux(c: CandidatClasse, rang: number): string[] {
  const s: string[] = []
  const f = c.fiche === undefined ? undefined : fiche(c.fiche)
  if (c.statut === 'ambigu' && f !== undefined) {
    s.push(`Nom proche de la fiche « ${f.n} » (${f.c}, à ${km(c, f)}) : même brasserie ? Sinon, à ajouter.`)
  }
  const memeAdresse = proposes.findIndex((o, j) => j !== rang && o.adresse === c.adresse && /^\d/.test(c.adresse))
  const autre = memeAdresse === -1 ? undefined : proposes.at(memeAdresse)
  if (autre !== undefined) s.push(`Même adresse que le n° ${String(memeAdresse + 1)} (« ${autre.nom} ») : un seul lieu ?`)
  const e = c.etiquettes ?? {}
  const decrit = (['amenity', 'shop', 'brand'] as const).filter((k) => k in e)
  if (decrit.length > 0) {
    s.push(`OSM la décrit aussi comme : ${decrit.map((k) => `${k}=${e[k] ?? ''}`).join(', ')} — un café, un bar ou une enseigne ?`)
  }
  if (c.plusProche !== undefined) s.push(`Fiche la plus proche : ${c.plusProche.n}, à ${c.plusProche.km.toFixed(1).replace('.', ',')} km.`)
  return s
}

const lot: Lot = {
  lot: NOM,
  propositions: [],
  revues: [],
  ajouts: proposes.map((c, i) => ({
    fiche: ajoutDepuisOsm(c),
    verifieLe: lu,
    sources: [`https://www.openstreetmap.org/${c.osm}`],
    extrait: [
      `name=${c.nom}`,
      'craft=brewery',
      `adresse=${c.adresse}`,
      ...(c.site === undefined ? [] : [`website=${c.site}`]),
      ...Object.entries(c.etiquettes ?? {}).map(([k, v]) => `${k}=${v}`),
    ].join(' ; '),
    choix: signaux(c, i).join(' '),
  })),
}
const v = lireLot(lot, AUJOURDHUI)
if (!v.ok) throw new Error(`lot invalide :\n${v.erreurs.join('\n')}`)
// Tout accepter doit passer avant que le lot soit présenté (revues S14 : 7
// ajouts reprenaient un nom du fichier, et « 1-131 » était refusé).
const tout = appliquerLot(brasseries, lot, new Set(lot.ajouts?.map((_, i) => i + 1)))
if (!tout.ok) throw new Error(`le lot ne s'appliquerait pas en entier :\n${tout.erreurs.join('\n')}`)
writeFileSync(`curation/${NOM}.json`, `${JSON.stringify(lot, null, 1)}\n`)

// Le résumé : une ligne par fiche proposée, ce que Cédric lit d'abord.
const ligne = (c: CandidatClasse, i: number) =>
  `| ${String(i + 1)} | ${c.nom} | ${c.commune} (${c.departement}) | ${km(BRIGNAIS, c)} | ${c.statut === 'ambigu' ? '⚠ nom proche' : ''}${c.etiquettes?.amenity !== undefined || c.etiquettes?.shop !== undefined || c.etiquettes?.brand !== undefined ? ' ⚠ café/bar/enseigne ?' : ''} | ${c.site === undefined ? '' : 'oui'} |`
writeFileSync(
  `curation/${NOM}-resume.md`,
  [
    `# Lot ${NOM} — résumé (${String(proposes.length)} fiches nouvelles)`,
    '',
    `Lu le ${lu} sur nominatim.openstreetmap.org (${String(requetes)} requêtes). Chaque fiche entrerait en « À confirmer », avec l'objet OSM pour source ; rien d'autre n'est vérifié. Détail, sources et empreinte : \`curation/${NOM}.md\`. Réponse attendue : « j'accepte 1-12, 15, … ».`,
    '',
    '| N° | Nom (OSM) | Commune | Depuis Brignais | Signal | Site |',
    '|---:|---|---|---:|---|---|',
    ...proposes.map(ligne),
    '',
  ].join('\n'),
)

// Ce qui n'est pas proposé, et pourquoi.
const ecartes = (statut: CandidatClasse['statut'], titre: string, explication: string) => {
  const liste = classes.filter((c) => c.statut === statut)
  return [
    `## ${titre} (${String(liste.length)})`,
    '',
    explication,
    '',
    '| OSM (objet) | Commune OSM | En cause | Commune | Distance |',
    '|---|---|---|---|---:|',
    ...liste.map((c) => {
      const f = c.fiche === undefined ? undefined : fiche(c.fiche)
      const o = classes.find((x) => x.nom === c.fiche)
      const cible = f ?? o
      const commune = f?.c ?? o?.commune ?? ''
      return `| ${c.nom} ([${c.osm}](https://www.openstreetmap.org/${c.osm})) | ${c.commune} | ${c.fiche ?? ''} | ${commune} | ${cible === undefined ? '' : km(c, cible)} |`
    }),
    '',
  ]
}
writeFileSync(
  `curation/${PREFIXE}-rapprochements.md`,
  [
    `# Lot ${NOM} — brasseries OSM non proposées en ajout`,
    '',
    `Lu le ${lu} (\`curation/osm-${lu}.json\`). Une ligne douteuse se signale : la brasserie passe alors en ajout.`,
    '',
    ...ecartes('present', 'Déjà dans le fichier', 'Même cœur de nom (mots génériques retirés) qu’une fiche **de la même commune**.'),
    ...ecartes('homonyme', 'Homonymes ailleurs — à vérifier', 'Exactement le même nom qu’une fiche d’une **autre** commune : déménagement, second site ou autre brasserie ? Le fichier refuse deux fiches de même nom.'),
    ...ecartes('doublon', 'Doublons dans OSM', 'Même nom, casse comprise, qu’un autre objet OSM déjà retenu.'),
  ].join('\n'),
)

const compte = (st: CandidatClasse['statut']) => String(classes.filter((c) => c.statut === st).length)
console.log(
  `${String(requetes)} requêtes ; ${String(classes.length)} brasseries OSM en ARA : ${String(proposes.length)} proposées ` +
    `(dont ${compte('ambigu')} au nom proche), ${compte('present')} déjà dans le fichier, ${compte('homonyme')} homonymes, ${compte('doublon')} doublons.`,
)
