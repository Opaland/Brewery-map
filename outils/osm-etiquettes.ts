/**
 * S60 — ce qu'OpenStreetMap dit du téléphone, du site et des horaires des
 * fiches de `data/breweries.json`. Écrit `curation/s60-etiquettes-osm.json`
 * et `.md` : des pistes pour les lots S61 à S63, pas des propositions.
 *
 *   npx tsx outils/osm-etiquettes.ts
 *
 * N'envoie au miroir Overpass que les rectangles des départements des
 * fiches : jamais une position de personne.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import type { Rectangle } from '../src/core/communes'
import { estUnMobile, masquerLesMobiles, rapprocherDuFichier } from '../src/core/osm-etiquettes'
import type { ElementOverpass } from '../src/core/osm-france'
import { brasseriesSchema } from '../src/core/schema'
import { demanderOverpass } from './overpass'

const fichier = brasseriesSchema.parse(JSON.parse(readFileSync('data/breweries.json', 'utf8')))
const rectangles = JSON.parse(readFileSync('public/communes/departements.json', 'utf8')) as Record<string, Rectangle | undefined>
const departements = [...new Set(fichier.map((b) => b.d))].sort()

const vus = new Map<string, ElementOverpass>()
let base = ''
for (const d of departements) {
  const r = rectangles[d]
  if (r === undefined) throw new Error(`département ${d} sans rectangle`)
  const bbox = r.join(',')
  const requete = `[out:json][timeout:120];(nwr["craft"="brewery"](${bbox});nwr["microbrewery"="yes"](${bbox}););out center tags;`
  const { elements, base: b } = await demanderOverpass(requete, `département ${d}`)
  for (const e of elements) vus.set(`${e.type}/${String(e.id)}`, e)
  base = base === '' || b < base ? b : base
  console.log(`${d} : ${String(elements.length)} éléments`)
}

const rapprochees = rapprocherDuFichier([...vus.values()], fichier)
const avec = rapprochees.filter((r) => r.elements.length > 0)
const uniques = avec.filter((r) => !r.ambigue)
const compte = (cle: 'tel' | 'site' | 'horaires') => uniques.filter((r) => r.elements.at(0)?.etiquettes[cle] !== undefined).length
const lien = (osm: string) => `[${osm}](https://www.openstreetmap.org/${osm})`
const cellule = (v: string | undefined) => (v === undefined ? '—' : `\`${v.replaceAll('|', '\\|')}\``)
const telephone = (v: string | undefined) => (v === undefined ? '—' : cellule(masquerLesMobiles(v)))

const sansMobiles = rapprochees.map((r) => ({
  ...r,
  elements: r.elements.map((e) =>
    e.etiquettes.tel === undefined ? e : { ...e, etiquettes: { ...e.etiquettes, tel: masquerLesMobiles(e.etiquettes.tel) } },
  ),
}))
writeFileSync(
  'curation/s60-etiquettes-osm.json',
  `${JSON.stringify({ source: 'overpass.openstreetmap.fr', base_osm: base, rapprochees: sansMobiles }, null, 1)}\n`,
)
writeFileSync(
  'curation/s60-etiquettes-osm.md',
  [
    '# Étiquettes OpenStreetMap des fiches (S60)',
    '',
    `Pour Cédric. **Ce sont des pistes, pas des propositions** : rien n'est écrit dans \`data/\`, et les lots S61 (téléphones), S62 (sites) et S63 (horaires) reliront chaque valeur sur la page de la brasserie avant de te la proposer. Données OpenStreetMap, base du ${base || '?'} ; licence ODbL : l'attribution « © les contributeurs d'OpenStreetMap » est due si une valeur est reprise.`,
    '',
    `Rapprochement : même règle que la couche OSM de la carte (\`designeLaFiche\`, même cœur de nom à moins de 20 km). ${String(vus.size)} éléments OSM lus dans ${String(departements.length)} départements.`,
    '',
    '| | Fiches |',
    '|---|---:|',
    `| rapprochées d'un seul élément | ${String(uniques.length)} |`,
    `| ambiguës (plusieurs éléments, ou élément partagé : aucun choisi) | ${String(avec.length - uniques.length)} |`,
    `| sans élément OSM | ${String(rapprochees.length - avec.length)} |`,
    `| dont avec un téléphone | ${String(compte('tel'))} (dont ${String(uniques.filter((r) => estUnMobile(r.elements.at(0)?.etiquettes.tel ?? '')).length)} mobiles seuls ; les mobiles ne sont pas recopiés) |`,
    `| dont avec un site | ${String(compte('site'))} |`,
    `| dont avec des horaires | ${String(compte('horaires'))} |`,
    '',
    '## Fiches rapprochées',
    '',
    '| Fiche | Élément OSM | Téléphone | Site | Horaires (`opening_hours`) |',
    '|---|---|---|---|---|',
    ...uniques.map((r) => {
      const e = r.elements.at(0)
      return e === undefined ? '' : `| ${r.fiche} | ${lien(e.osm)} (${e.nom}) | ${telephone(e.etiquettes.tel)} | ${cellule(e.etiquettes.site)} | ${cellule(e.etiquettes.horaires)} |`
    }),
    '',
    '## Fiches ambiguës',
    '',
    ...avec.filter((r) => r.ambigue).map((r) => `- ${r.fiche} (${r.raison ?? ''}) : ${r.elements.map((e) => `${lien(e.osm)} (${e.nom})`).join(', ')}`),
    '',
    '## Fiches sans élément OSM',
    '',
    rapprochees.filter((r) => r.elements.length === 0).map((r) => r.fiche).join(', '),
    '',
  ].join('\n'),
)
console.log(`${String(uniques.length)} rapprochées, ${String(avec.length - uniques.length)} ambiguës, ${String(rapprochees.length - avec.length)} sans élément`)
