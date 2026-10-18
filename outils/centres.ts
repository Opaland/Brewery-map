/**
 * S268 — le lot des fiches à placer au centre IGN de leur commune (Cédric,
 * 18/10 : « Centre de commune IGN » pour toute fiche sans adresse vérifiée).
 *
 *   npx tsx outils/centres.ts
 *
 * Écrit `curation/s268-centres.json` et `.md`. Une proposition par fiche en
 * précision `commune` dont l'IGN rend le centre (garde de
 * `positionDuGeocodeur` : bon département, bonne commune) ; les autres sont
 * listées avec la raison. Seuls des noms de commune partent au géocodeur.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { positionDuGeocodeur } from '../src/core/candidats'
import { lireLot } from '../src/core/curation'
import { distanceKm, kmFr } from '../src/core/distance'
import { validerBrasseries } from '../src/core/schema'
import { geocoder } from './geocodeur'

const valide = validerBrasseries(JSON.parse(readFileSync('data/breweries.json', 'utf8')))
if (!valide.ok) throw new Error('data/breweries.json invalide')
const aujourdhui = new Date().toISOString().slice(0, 10)

const centres = new Map<string, { url: string; centre: { lat: number; lon: number } | null }>()
const propositions = []
const sansCentre: { n: string; c: string; d: string }[] = []
const deplacements: { n: string; c: string; d: string; km: number }[] = []
for (const b of valide.brasseries.filter((f) => f.coordPrecision === 'commune')) {
  const cle = `${b.d}|${b.c}`
  if (!centres.has(cle)) {
    const { url, reponse } = geocoder({ q: b.c, type: 'municipality' })
    centres.set(cle, { url, centre: positionDuGeocodeur(reponse, b.d, b.c, 'commune') })
  }
  const { url, centre } = centres.get(cle) ?? { url: '', centre: null }
  if (centre === null) {
    sansCentre.push({ n: b.n, c: b.c, d: b.d })
    continue
  }
  propositions.push({
    n: b.n,
    changements: { lat: centre.lat, lon: centre.lon, coordPrecision: 'centre' },
    verifieLe: aujourdhui,
    sources: [url],
    extrait: `Centre de la commune ${b.c} (${b.d}) selon le géocodeur de l'IGN (type=municipality) : ${String(centre.lat)}, ${String(centre.lon)}.`,
    choix: 'Fiche sans adresse vérifiée : placée au centre IGN de sa commune (Cédric, 18/10, docs/DECISIONS.md).',
  })
  deplacements.push({ n: b.n, c: b.c, d: b.d, km: distanceKm(b, centre) })
}

const lot = { lot: 's268-centres', propositions }
const lu = lireLot(lot, aujourdhui)
if (!lu.ok) throw new Error(`lot invalide :\n${lu.erreurs.join('\n')}`)
writeFileSync('curation/s268-centres.json', `${JSON.stringify(lot, null, 2)}\n`)

const km = kmFr
const md = [
  '# S268 — Les fiches sans adresse vérifiée au centre IGN de leur commune',
  '',
  `Écrit le ${aujourdhui} par \`npx tsx outils/centres.ts\`. Décision de Cédric du 18/10 (\`docs/DECISIONS.md\`) : « Centre de commune IGN ».`,
  '',
  `- ${String(propositions.length)} fiches placées au centre IGN de leur commune (précision \`centre\`).`,
  `- ${String(sansCentre.length)} fiches sans centre trouvé : elles gardent leur point et le libellé « approximative ».`,
  '',
  '## Fiches sans centre trouvé',
  '',
  'Le géocodeur n\'a pas rendu de commune de ce nom dans ce département (arrondissements de Lyon, communes nouvelles) :',
  '',
  ...sansCentre.map((s) => `- ${s.n}, ${s.c} (${s.d})`),
  '',
  '## Déplacements',
  '',
  '| Fiche | Commune | Déplacement |',
  '|---|---|---:|',
  ...deplacements.sort((a, b) => b.km - a.km).map((x) => `| ${x.n} | ${x.c} (${x.d}) | ${km(x.km)} km |`),
  '',
]
writeFileSync('curation/s268-centres.md', md.join('\n'))
console.log(`${String(propositions.length)} propositions, ${String(sansCentre.length)} sans centre : curation/s268-centres.{json,md}`)
