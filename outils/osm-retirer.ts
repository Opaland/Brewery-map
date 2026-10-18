/**
 * S269 — retire de la couche OpenStreetMap (`src/donnees-osm/brasseries-osm.json`)
 * les brasseries devenues des fiches de `data/breweries.json`, sans
 * nouvelle requête Overpass (`retirerCeQuiADesFiches`).
 *
 *   npx tsx outils/osm-retirer.ts
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fichierOsmSchema, retirerCeQuiADesFiches } from '../src/core/osm-france'
import { validerBrasseries } from '../src/core/schema'

const CHEMIN = 'src/donnees-osm/brasseries-osm.json'
const fiches = validerBrasseries(JSON.parse(readFileSync('data/breweries.json', 'utf8')))
if (!fiches.ok) throw new Error('data/breweries.json invalide')
const couche = fichierOsmSchema.parse(JSON.parse(readFileSync(CHEMIN, 'utf8')))
const { couche: nouvelle, retirees } = retirerCeQuiADesFiches(couche, fiches.brasseries)
writeFileSync(CHEMIN, `${JSON.stringify(nouvelle)}\n`)
for (const r of retirees) console.log(`${r.osm} « ${r.nom} » → fiche « ${r.fiche} »`)
console.log(`${String(retirees.length)} retirée(s) ; ${String(nouvelle.brasseries.length)} gardée(s)`)
