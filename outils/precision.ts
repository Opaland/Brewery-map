/**
 * S59 — mesure l'écart entre le point de chaque fiche et le centre de sa
 * commune, tel que le géocodeur de l'IGN le rend, et écrit
 * `docs/PRECISION.md`.
 *
 *   npx tsx outils/precision.ts
 *
 * Seuls des noms de commune partent au géocodeur : jamais une position.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { positionDuGeocodeur } from '../src/core/candidats'
import { distanceKm, kmFr } from '../src/core/distance'
import { repartitionDesEcarts } from '../src/core/precision'
import { validerBrasseries } from '../src/core/schema'
import { geocoder } from './geocodeur'

const PALIERS = [0.5, 1, 2, 5, 10]

const valide = validerBrasseries(JSON.parse(readFileSync('data/breweries.json', 'utf8')))
if (!valide.ok) throw new Error('data/breweries.json invalide')
const fiches = valide.brasseries

const centres = new Map<string, { lat: number; lon: number } | null>()
const mesures = fiches.map((b) => {
  const cle = `${b.d}|${b.c}`
  if (!centres.has(cle)) centres.set(cle, positionDuGeocodeur(geocoder({ q: b.c, type: 'municipality' }).reponse, b.d, b.c, 'commune'))
  const centre = centres.get(cle) ?? null
  return { b, ecart: centre === null ? null : distanceKm(b, centre) }
})

const km = kmFr
const connues = mesures.filter((m) => m.ecart !== null)
const inconnues = mesures.filter((m) => m.ecart === null)
const max = Math.max(...connues.map((m) => m.ecart ?? 0))
const points = new Map<string, Set<string>>()
for (const b of fiches) {
  const cle = `${b.c} (${b.d})`
  points.set(cle, (points.get(cle) ?? new Set()).add(`${String(b.lat)},${String(b.lon)}`))
}
const plusieurs = [...points].filter(([, p]) => p.size > 1).map(([c]) => c).sort()
const date = new Date().toISOString().slice(0, 10)

const md = [
  '# Précision des points des fiches (S59)',
  '',
  "> **Depuis S268 (18/10)**, une fiche sans adresse vérifiée est au centre de sa commune selon l'IGN (précision `centre`) ; 13 fiches gardent leur point d'origine (`commune`), faute de centre trouvé ; les comptes à jour sont dans `docs/DONNEES.md`. La mesure ci-dessous a été faite avant S268, sur les points d'origine du fichier, générés par une IA (Cédric, 18/10) : c'est elle qui a motivé la décision. Relancée aujourd'hui, elle trouverait un écart nul pour les fiches `centre`.",
  '',
  `Mesuré le ${date} par \`npx tsx outils/precision.ts\` (à relancer pour mettre à jour).`,
  '',
  '## Méthode',
  '',
  '- Pour chaque fiche de `data/breweries.json`, le centre de sa commune est demandé au géocodeur de l\'IGN (`type=municipality`), et gardé seulement s\'il est dans le bon département et porte le nom de la commune (`positionDuGeocodeur`, la garde de S52).',
  '- L\'écart est la distance à vol d\'oiseau (haversine, `distanceKm`) entre le point de la fiche et ce centre.',
  '- Seuls des noms de commune partent au géocodeur.',
  '',
  '## Résultat',
  '',
  `${String(fiches.length)} fiches : ${String(connues.length)} mesurées, ${String(inconnues.length)} sans centre trouvé${inconnues.length > 0 ? ` (${inconnues.map((m) => `${m.b.n}, ${m.b.c}`).join(' ; ')})` : ''}.`,
  '',
  '| Écart au centre de la commune | Fiches |',
  '|---|---:|',
  ...repartitionDesEcarts(
    mesures.map((m) => m.ecart),
    PALIERS,
  ).map(({ palier, nombre }) => `| ${km(palier)} km ou moins | ${String(nombre)} |`),
  `| plus de ${km(PALIERS.at(-1) ?? 0)} km | ${String(connues.filter((m) => (m.ecart ?? 0) > (PALIERS.at(-1) ?? 0)).length)} |`,
  '',
  `Écart maximal : ${km(max)} km.`,
  '',
  '**Ce que cela veut dire.** Les points ne sont pas des centres de commune, et le « à environ 2 km près » que l\'application affichait n\'était porté par rien. La fiche dit maintenant ce qui est établi : le point n\'est pas l\'adresse, et il peut en être à plusieurs kilomètres. La mesure ne dit pas où est la brasserie : elle dit que le point et la commune de la fiche ne s\'accordent pas toujours. Quand l\'écart dépasse la taille de la commune, l\'un des deux est faux, et la fiche ne peut rien promettre de mieux que « pas l\'adresse ».',
  '',
  '## Fiches à plus de 5 km du centre de leur commune',
  '',
  '| Fiche | Commune | Écart |',
  '|---|---|---:|',
  ...connues
    .filter((m) => (m.ecart ?? 0) > 5)
    .sort((a, b) => (b.ecart ?? 0) - (a.ecart ?? 0))
    .map((m) => `| ${m.b.n} | ${m.b.c} (${m.b.d}) | ${km(m.ecart ?? 0)} km |`),
  '',
  `## Communes à plusieurs points (${String(plusieurs.length)})`,
  '',
  'Deux fiches d\'une même commune n\'ont pas le même point : ce ne peut pas être, pour les deux, le centre de la commune.',
  '',
  ...plusieurs.map((c) => `- ${c}`),
  '',
  '## Question pour Cédric',
  '',
  'D\'où viennent les points du fichier du 15/10 ? Si ce sont des positions relevées (carte, souvenir de visite), elles valent peut-être mieux que « approximative », fiche par fiche. Seules les propositions de position (lots S54-S55) les changent, avec ton accord.',
  '',
].join('\n')
writeFileSync('docs/PRECISION.md', md)
console.log(`${String(connues.length)} mesurées, ${String(inconnues.length)} sans centre, max ${km(max)} km`)
