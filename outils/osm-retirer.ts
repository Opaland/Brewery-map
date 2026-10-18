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

/**
 * Les objets OSM qu'un lot a dits être une fiche, sous un nom que la règle
 * ne rapproche pas. Chacun cite la ligne qui l'établit.
 */
const MEMES = new Map([
  // curation/dep-29-candidats.md : SIRENE « PENN AR BATZ - LA PAB (ILE-DE-BATZ) » ; même île, 0,2 km (revue adverse S270).
  ['node/9954771298', 'Microbrasserie PAB'],
])
const fiches = validerBrasseries(JSON.parse(readFileSync('data/breweries.json', 'utf8')))
if (!fiches.ok) throw new Error('data/breweries.json invalide')
const couche = fichierOsmSchema.parse(JSON.parse(readFileSync(CHEMIN, 'utf8')))
const { couche: nouvelle, retirees } = retirerCeQuiADesFiches(couche, fiches.brasseries, MEMES)
writeFileSync(CHEMIN, `${JSON.stringify(nouvelle)}\n`)
for (const r of retirees) console.log(`${r.osm} « ${r.nom} » → fiche « ${r.fiche} »`)
console.log(`${String(retirees.length)} retirée(s) ; ${String(nouvelle.brasseries.length)} gardée(s)`)
