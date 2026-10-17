/**
 * L'outil « département » (S246, epic E25) :
 *
 *   npx tsx outils/departement.ts candidats 50
 *     Lit le registre SIRENE (code 11.05Z, établissements actifs) et la
 *     couche OpenStreetMap du dépôt, fusionne, écarte ce que le fichier a
 *     déjà, et écrit `curation/dep-50-candidats.{json,md}` : les paquets que
 *     les agents `verificateur-de-brasserie` liront (skill lot-de-curation).
 *
 *   npx tsx outils/departement.ts lectures 50 <fichier.json>
 *     Transforme ce que les agents ont lu (tableau d'objets : cle, n, c,
 *     adresse|null, cat, conf, note, src, extrait, beers, choix) en lectures
 *     `curation/dep-50-lectures/*.json` : position du géocodeur de l'IGN,
 *     refusée hors du département ou de la commune, ou sans numéro de voie
 *     (S248), sinon
 *     centre de la commune ; distance à Brignais calculée.
 *
 *   npx tsx outils/departement.ts assembler 50
 *     Rassemble les lectures des agents (`curation/dep-50-lectures/*.json`,
 *     chacune `{ candidat, ajout }`) en lot `curation/dep-50.json`, au format
 *     de `outils/curation.ts` (diff, controler, appliquer). Les lectures
 *     invalides sont listées avec leur raison.
 *
 * Reprise : chaque page de l'API lue est gardée dans `outils/cache/sirene/`
 * (ignoré par git : on y trouve des noms de personnes), avec la
 * correspondance des clés `personne:<n>` ; une relance ne la redemande pas. L'API coupe souvent depuis le conteneur (docs/SIRENE.md).
 *
 * N'écrit jamais `data/` (CLAUDE.md §0).
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { BRIGNAIS, distanceKm } from '../src/core/distance'
import {
  assemblerLot,
  positionDuGeocodeur,
  candidatsDuDepartement,
  classerDuDepartement,
  prefixePostal,
  publiables,
  type CandidatEnCause,
  type EtablissementSirene,
  type Lecture,
} from '../src/core/candidats'
import type { CandidatOsm } from '../src/core/decouverte'
import { validerBrasseries } from '../src/core/schema'

const API = 'https://recherche-entreprises.api.gouv.fr/search'
const CACHE = 'outils/cache/sirene'
let requetes = 0

const pause = (ms: number) =>
  new Promise((r) => {
    setTimeout(r, ms)
  })

/** Une page de l'API, depuis le cache si elle y est ; sinon lue, avec reprise. */
async function page(dep: string, n: number): Promise<{ results: unknown[]; total_pages: number }> {
  const fichier = `${CACHE}/${dep}-${String(n)}.json`
  if (existsSync(fichier)) return JSON.parse(readFileSync(fichier, 'utf8')) as { results: unknown[]; total_pages: number }
  const url = `${API}?activite_principale=11.05Z&departement=${dep}&etat_administratif=A&per_page=25&page=${String(n)}`
  for (let essai = 1; essai <= 12; essai++) {
    requetes++
    try {
      // curl plutôt que fetch : il passe par le mandataire du conteneur.
      const brut = execFileSync('curl', ['-sS', '-f', '-m', '25', url], { encoding: 'utf8' })
      const json = JSON.parse(brut) as { results?: unknown; total_pages?: unknown }
      // Une réponse d'erreur en JSON (« Too many requests ») n'est pas une
      // page : gardée, elle empoisonnait le cache (revue adverse S246).
      if (!Array.isArray(json.results) || typeof json.total_pages !== 'number') throw new Error('réponse sans résultats')
      mkdirSync(CACHE, { recursive: true })
      writeFileSync(fichier, brut)
      await pause(1500)
      return json as { results: unknown[]; total_pages: number }
    } catch {
      await pause(5000 * essai)
    }
  }
  throw new Error(`SIRENE ne répond pas : ${url}`)
}

interface ResultatSirene {
  siren?: string
  nom_complet?: string
  nom_raison_sociale?: string | null
  nature_juridique?: string
  matching_etablissements?: {
    siret?: string
    adresse?: string
    libelle_commune?: string
    code_postal?: string
    latitude?: string
    longitude?: string
    liste_enseignes?: string[] | null
    etat_administratif?: string
  }[]
}

function etablissements(dep: string, resultats: readonly ResultatSirene[]): EtablissementSirene[] {
  const sortie: EtablissementSirene[] = []
  for (const r of resultats) {
    for (const e of r.matching_etablissements ?? []) {
      if (e.etat_administratif !== undefined && e.etat_administratif !== 'A') continue
      if (!(e.code_postal ?? '').startsWith(prefixePostal(dep))) continue
      const lat = Number(e.latitude)
      const lon = Number(e.longitude)
      sortie.push({
        siren: r.siren ?? '',
        siret: e.siret ?? '',
        // Nature inconnue : `undefined`, traité comme une personne (revue adverse S246).
        entrepreneurIndividuel: r.nature_juridique === undefined ? undefined : r.nature_juridique.startsWith('1'),
        raisonSociale: r.nom_raison_sociale ?? r.nom_complet ?? '',
        enseignes: e.liste_enseignes ?? [],
        adresse: e.adresse ?? '',
        commune: e.libelle_commune ?? '',
        codePostal: e.code_postal ?? '',
        ...(Number.isFinite(lat) && Number.isFinite(lon) && e.latitude !== undefined ? { lat, lon } : {}),
      })
    }
  }
  return sortie
}

function osmDuDepartement(dep: string): CandidatOsm[] {
  const couche = JSON.parse(readFileSync('src/donnees-osm/brasseries-osm.json', 'utf8')) as {
    brasseries: [string, string, string, string, number, number, string, string, number][]
  }
  return couche.brasseries
    .filter((b) => b[3] === dep)
    .map(([nom, osm, commune, departement, lat, lon, adresse, site]) => ({
      nom,
      osm,
      commune,
      departement,
      lat,
      lon,
      adresse,
      ...(site === '' ? {} : { site }),
    }))
}

function resume(dep: string, candidats: readonly CandidatEnCause[]): string {
  const par = (s: string) => candidats.filter((c) => c.statut === s)
  const lignes = [
    `# Candidats du département ${dep} (S246)`,
    '',
    `Établis le ${new Date().toISOString().slice(0, 10)} par \`outils/departement.ts\`. Rien n'est écrit dans \`data/\` : chaque candidat sera lu, puis décidé par Cédric ligne par ligne.`,
    '',
    `| Statut | Nombre |`,
    `|---|---:|`,
    ...['nouveau', 'ambigu', 'nom-a-etablir', 'present', 'homonyme', 'doublon'].map((s) => `| ${s} | ${String(par(s).length)} |`),
    '',
    '## À lire',
    '',
    ...candidats
      .filter((c) => ['nouveau', 'ambigu', 'nom-a-etablir'].includes(c.statut))
      .map(
        (c) =>
          `- \`${c.cle}\` — ${c.nom ?? '*nom à établir*'} (${c.communes.join(', ')}) — ${c.sources.join(' + ')}${c.fiche === undefined ? '' : ` — proche de « ${c.fiche} »`}`,
      ),
    '',
    '## Écartés : déjà dans le fichier (présent, homonyme), ou doublon dans la même commune',
    '',
    ...candidats
      .filter((c) => ['present', 'homonyme', 'doublon'].includes(c.statut))
      .map((c) => `- ${c.nom ?? '?'} (${c.communes.join(', ')}) — ${c.statut}${c.fiche === undefined ? '' : ` : « ${c.fiche} »`}`),
    '',
  ]
  return lignes.join('\n')
}

async function candidats(dep: string): Promise<void> {
  const resultats: ResultatSirene[] = []
  const premiere = await page(dep, 1)
  resultats.push(...(premiere.results as ResultatSirene[]))
  for (let n = 2; n <= premiere.total_pages; n++) resultats.push(...((await page(dep, n)).results as ResultatSirene[]))
  const valide = validerBrasseries(JSON.parse(readFileSync('data/breweries.json', 'utf8')))
  if (!valide.ok) throw new Error('data/breweries.json invalide')
  const fiches = valide.brasseries
  const etabs = etablissements(dep, resultats)
  const osm = osmDuDepartement(dep)
  const classes = classerDuDepartement(candidatsDuDepartement(etabs, osm), fiches)
  const { publies, correspondance } = publiables(classes)
  // La correspondance clé publiée → SIREN reste locale (cache ignoré par git).
  writeFileSync(`${CACHE}/${dep}-correspondance.json`, `${JSON.stringify(correspondance, null, 1)}\n`)
  writeFileSync(`curation/dep-${dep}-candidats.json`, `${JSON.stringify(publies, null, 1)}\n`)
  writeFileSync(`curation/dep-${dep}-candidats.md`, resume(dep, publies))
  console.log(
    `${dep} : ${String(etabs.length)} établissements SIRENE, ${String(osm.length)} points OSM → ${String(classes.length)} candidats ; ${String(requetes)} requêtes à l'API.`,
  )
}

interface LectureAgent {
  cle: string
  n: string
  c: string
  adresse: string | null
  cat: number
  conf: string
  note: string
  src: string
  extrait: string
  beers: unknown[]
  choix?: string
}

const GEOCODEUR = 'https://data.geopf.fr/geocodage/search?'

/** Une requête au géocodeur, avec reprise (le mandataire coupe souvent). */
function geocoder(params: Record<string, string>): { url: string; reponse: unknown } {
  const url = GEOCODEUR + new URLSearchParams({ ...params, limit: '5' }).toString()
  for (let essai = 1; essai <= 8; essai++) {
    try {
      return { url, reponse: JSON.parse(execFileSync('curl', ['-sS', '-f', '-m', '20', url], { encoding: 'utf8' })) as unknown }
    } catch {
      if (essai < 8) execFileSync('sleep', [String(2 * essai)])
    }
  }
  throw new Error(`géocodeur injoignable : ${url}`)
}

function lectures(dep: string, fichier: string | undefined): void {
  if (fichier === undefined) {
    console.error('usage : npx tsx outils/departement.ts lectures <dép.> <fichier.json>')
    process.exit(2)
  }
  const dossier = `curation/dep-${dep}-lectures`
  mkdirSync(dossier, { recursive: true })
  const aujourdhui = new Date().toISOString().slice(0, 10)
  for (const l of JSON.parse(readFileSync(fichier, 'utf8')) as LectureAgent[]) {
    let pos = null
    let source: string | undefined
    if (l.adresse !== null) {
      const g = geocoder({ q: l.adresse })
      pos = positionDuGeocodeur(g.reponse, dep, l.c, 'address')
      source = g.url
    }
    if (pos === null) {
      pos = positionDuGeocodeur(geocoder({ q: l.c, type: 'municipality' }).reponse, dep, l.c, 'commune')
      source = undefined
    }
    if (pos === null) {
      console.log(`- ${l.cle} (${l.n}) : ni l'adresse ni la commune ne se géocodent dans le ${dep} — non écrite`)
      continue
    }
    const fiche = {
      n: l.n,
      c: l.c,
      d: dep,
      lat: pos.lat,
      lon: pos.lon,
      km: Math.round(distanceKm(BRIGNAIS, pos) * 10) / 10,
      cat: l.cat,
      conf: l.conf,
      note: l.note,
      addr: l.adresse ?? l.c,
      src: l.src,
      coordPrecision: pos.precision,
      beers: l.beers,
    }
    const ajout = {
      fiche,
      verifieLe: aujourdhui,
      sources: [l.src, ...(source === undefined ? [] : [source])],
      extrait: l.extrait,
      ...(l.choix === undefined ? {} : { choix: l.choix }),
    }
    writeFileSync(`${dossier}/${l.cle.replace(/[:/]/g, '-')}.json`, `${JSON.stringify({ candidat: l.cle, ajout }, null, 1)}\n`)
    console.log(`${l.n} : ${pos.precision} (${String(fiche.km)} km de Brignais)`)
  }
}

function assembler(dep: string): void {
  const dossier = `curation/dep-${dep}-lectures`
  if (!existsSync(dossier)) {
    console.error(`aucune lecture : ${dossier} n'existe pas`)
    process.exit(1)
  }
  const refusFichiers: string[] = []
  const lectures: Lecture[] = []
  for (const f of readdirSync(dossier).filter((x) => x.endsWith('.json'))) {
    try {
      const l = JSON.parse(readFileSync(`${dossier}/${f}`, 'utf8')) as Partial<Lecture>
      if (typeof l.candidat !== 'string') throw new Error('sans « candidat »')
      lectures.push({ candidat: l.candidat, ajout: l.ajout })
    } catch (e) {
      refusFichiers.push(`${f} : ${e instanceof Error ? e.message : String(e)}`)
    }
  }
  const candidats = JSON.parse(readFileSync(`curation/dep-${dep}-candidats.json`, 'utf8')) as CandidatEnCause[]
  const valide = validerBrasseries(JSON.parse(readFileSync('data/breweries.json', 'utf8')))
  if (!valide.ok) throw new Error('data/breweries.json invalide')
  const { lot, refus } = assemblerLot(`dep-${dep}`, lectures, {
    cles: candidats.map((c) => c.cle),
    noms: valide.brasseries.map((b) => b.n),
  })
  writeFileSync(`curation/dep-${dep}.json`, `${JSON.stringify(lot, null, 1)}\n`)
  console.log(`${String(lot.ajouts?.length ?? 0)} ajouts, ${String(refus.length + refusFichiers.length)} lectures refusées`)
  for (const r of refus) console.log(`- ${r.candidat} : ${r.raison}`)
  for (const r of refusFichiers) console.log(`- ${r}`)
}

const args = process.argv.slice(2)
const commande = args.at(0)
const dep = args.at(1)
if (dep === undefined || !/^(\d{2}|2[AB])$/.test(dep)) {
  console.error('usage : npx tsx outils/departement.ts candidats|lectures|assembler <département>')
  process.exit(2)
}
if (commande === 'candidats') await candidats(dep)
else if (commande === 'assembler') assembler(dep)
else if (commande === 'lectures') lectures(dep, args.at(2))
else {
  console.error(`commande inconnue : ${commande ?? ''}`)
  process.exit(2)
}
