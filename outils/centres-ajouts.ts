/**
 * S269 — les fiches nouvelles des lots départementaux placées au centre de
 * leur commune passent en précision `centre` (S268), avec leur requête de
 * commune parmi leurs sources, quand l'IGN confirme le point.
 *
 *   npx tsx outils/centres-ajouts.ts 14 27 50 61 76
 *
 * Réécrit `curation/dep-<dép.>.json`. Une fiche dont l'IGN ne confirme pas
 * le point reste `commune`, et l'outil le dit. Seuls des noms de commune
 * partent au géocodeur.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { centreConfirme } from '../src/core/candidats'
import { lireLot } from '../src/core/curation'
import { geocoder } from './geocodeur'

const deps = process.argv.slice(2)
if (deps.length === 0) {
  console.error('usage : npx tsx outils/centres-ajouts.ts <dép.> [<dép.> …]')
  process.exit(2)
}
for (const dep of deps) {
  const chemin = `curation/dep-${dep}.json`
  const lot = JSON.parse(readFileSync(chemin, 'utf8')) as {
    ajouts?: { fiche: { n: string; c: string; d: string; lat: number; lon: number; coordPrecision: string }; sources: string[] }[]
  }
  let passees = 0
  for (const a of lot.ajouts ?? []) {
    if (a.fiche.coordPrecision !== 'commune') continue
    const { url, reponse } = geocoder({ q: a.fiche.c, type: 'municipality' })
    if (!centreConfirme(reponse, a.fiche, a.fiche)) {
      console.log(`${dep} — ${a.fiche.n} (${a.fiche.c}) : l'IGN ne confirme pas le point, reste « commune »`)
      continue
    }
    a.fiche.coordPrecision = 'centre'
    if (!a.sources.includes(url)) a.sources.push(url)
    passees++
  }
  const lu = lireLot(lot, '9999-12-31')
  if (!lu.ok) throw new Error(`${chemin} invalide après réécriture :\n${lu.erreurs.join('\n')}`)
  writeFileSync(chemin, `${JSON.stringify(lot, null, 1)}\n`)
  console.log(`${chemin} : ${String(passees)} fiche(s) au centre IGN`)
}
