/**
 * Fabrique `public/communes-france.json` : toutes les communes de France,
 * pour partir de n'importe laquelle (demande de Cédric du 16/10 : « Je veux
 * pouvoir chercher partout », plus de liste déroulante).
 *
 * - Les communes, leurs noms et départements : `@etalab/decoupage-administratif`
 *   (Code officiel géographique de l'INSEE, licence MIT pour le paquet,
 *   Licence ouverte pour les données), communes actuelles seulement.
 * - Leur point : Wikidata (CC0), propriété P625, rattaché par le code INSEE
 *   (P374), une requête par département (une requête nationale dépasse le
 *   délai du service, vu le 16/10). `geo.api.gouv.fr`, qui donne les centres,
 *   est injoignable depuis l'environnement de développement.
 *
 * Une commune sans point dans Wikidata est écartée, et comptée dans la sortie
 * de l'outil : rien n'est inventé.
 *
 * Usage : `npx tsx outils/communes.ts` (réseau requis ; une requête par
 * seconde environ, quelques minutes).
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

interface CommuneEtalab {
  code: string
  nom: string
  type: string
  departement?: string
  population?: number
}

const AGENT = 'MousseDePoche/1.0 (https://github.com/Opaland/Brewery-map)'
const SORTIE = path.resolve('public/communes-france.json')
const PAR_DEPARTEMENT = path.resolve('public/communes')

async function pointsDuDepartement(dep: string): Promise<Map<string, [number, number]>> {
  const requete = `SELECT ?insee ?coord WHERE { ?item wdt:P31 wd:Q484170 ; wdt:P374 ?insee ; wdt:P625 ?coord . FILTER(STRSTARTS(?insee, "${dep}")) }`
  const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(requete)}`
  for (let essai = 1; essai <= 3; essai++) {
    const r = await fetch(url, { headers: { 'User-Agent': AGENT, Accept: 'text/csv' } })
    if (r.ok) {
      const points = new Map<string, [number, number]>()
      for (const ligne of (await r.text()).split('\n').slice(1)) {
        const m = /^([0-9AB]{5}),Point\(([-\d.]+) ([-\d.]+)\)/.exec(ligne.trim())
        if (m?.[1] !== undefined && !points.has(m[1])) points.set(m[1], [Number(m[3]), Number(m[2])])
      }
      return points
    }
    await new Promise((fin) => setTimeout(fin, 5000 * essai))
  }
  throw new Error(`Wikidata ne répond pas pour le département ${dep}`)
}

/**
 * Seconde passe, par code et sans filtre de type : une commune typée
 * autrement dans Wikidata (commune nouvelle, commune déléguée…) échappait à
 * la première (101 le 16/10). Par paquets de 100 codes.
 */
async function pointsParCode(codes: string[]): Promise<Map<string, [number, number]>> {
  const points = new Map<string, [number, number]>()
  for (let i = 0; i < codes.length; i += 100) {
    const valeurs = codes
      .slice(i, i + 100)
      .map((c) => `"${c}"`)
      .join(' ')
    const requete = `SELECT ?insee ?coord WHERE { VALUES ?insee { ${valeurs} } ?item wdt:P374 ?insee ; wdt:P625 ?coord . }`
    const r = await fetch(`https://query.wikidata.org/sparql?query=${encodeURIComponent(requete)}`, {
      headers: { 'User-Agent': AGENT, Accept: 'text/csv' },
    })
    if (!r.ok) throw new Error(`Wikidata : ${String(r.status)} sur la seconde passe`)
    for (const ligne of (await r.text()).split('\n').slice(1)) {
      const m = /^([0-9AB]{5}),Point\(([-\d.]+) ([-\d.]+)\)/.exec(ligne.trim())
      if (m?.[1] !== undefined && !points.has(m[1])) points.set(m[1], [Number(m[3]), Number(m[2])])
    }
    await new Promise((fin) => setTimeout(fin, 1000))
  }
  return points
}

const arrondi = (x: number) => Math.round(x * 1000) / 1000

async function main() {
  const brut = await readFile(
    path.resolve('node_modules/@etalab/decoupage-administratif/data/communes.json'),
    'utf8',
  )
  const communes = (JSON.parse(brut) as CommuneEtalab[]).filter(
    (c) => c.type === 'commune-actuelle' && c.departement !== undefined,
  )
  const departements = [...new Set(communes.map((c) => c.departement ?? ''))].sort()
  const points = new Map<string, [number, number]>()
  for (const dep of departements) {
    for (const [code, p] of await pointsDuDepartement(dep)) points.set(code, p)
    await new Promise((fin) => setTimeout(fin, 1000))
  }
  const manquants = communes.filter((c) => !points.has(c.code)).map((c) => c.code)
  for (const [code, p] of await pointsParCode(manquants)) points.set(code, p)

  // [nom, département, lat, lon] : compact, trié du plus peuplé au moins
  // peuplé (l'ordre porte la population), pour proposer d'abord les villes
  // les plus connues.
  const triees = [...communes].sort(
    (a, b) => (b.population ?? 0) - (a.population ?? 0) || a.nom.localeCompare(b.nom, 'fr'),
  )
  const sortie: [string, string, number, number][] = []
  const sansPoint: string[] = []
  for (const c of triees) {
    const p = points.get(c.code)
    if (p === undefined) sansPoint.push(`${c.code} ${c.nom}`)
    else sortie.push([c.nom, c.departement ?? '', arrondi(p[0]), arrondi(p[1])])
  }
  await writeFile(SORTIE, JSON.stringify(sortie))
  console.log(`${String(sortie.length)} communes écrites dans ${SORTIE}`)

  // Les mêmes, un fichier par département ([nom, lat, lon], même ordre), et
  // le rectangle de chaque département : l'application charge d'avance ceux
  // à moins de 100 km du départ, pour une recherche quasi instantanée, et
  // le fichier entier seulement pour chercher plus loin (demande de Cédric
  // du 16/10).
  await rm(PAR_DEPARTEMENT, { recursive: true, force: true })
  await mkdir(PAR_DEPARTEMENT, { recursive: true })
  const groupes = new Map<string, [string, number, number][]>()
  for (const [nom, dep, lat, lon] of sortie) {
    const g = groupes.get(dep) ?? []
    g.push([nom, lat, lon])
    groupes.set(dep, g)
  }
  const rectangles: Record<string, [number, number, number, number]> = {}
  for (const [dep, liste] of groupes) {
    await writeFile(path.join(PAR_DEPARTEMENT, `${dep}.json`), JSON.stringify(liste))
    const lats = liste.map((c) => c[1])
    const lons = liste.map((c) => c[2])
    rectangles[dep] = [Math.min(...lats), Math.min(...lons), Math.max(...lats), Math.max(...lons)]
  }
  await writeFile(path.join(PAR_DEPARTEMENT, 'departements.json'), JSON.stringify(rectangles))
  console.log(`${String(groupes.size)} départements écrits dans ${PAR_DEPARTEMENT}`)
  console.log(`${String(sansPoint.length)} sans point dans Wikidata, écartées :`)
  console.log(sansPoint.join('\n'))
}

await main()
