/**
 * S295 — où en sont les fiches, champ par champ et par département, et la
 * liste des « À confirmer » à chercher (demande de Cédric).
 *
 *   npx tsx outils/completude.ts            # affiche le bilan
 *   npx tsx outils/completude.ts --ecrire   # réécrit curation/A-CHERCHER.md
 *
 * Aucune requête : le fichier seul.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { completudeEnMarkdown } from '../src/core/completude'
import { validerBrasseries } from '../src/core/schema'

const valide = validerBrasseries(JSON.parse(readFileSync('data/breweries.json', 'utf8')))
if (!valide.ok) throw new Error('data/breweries.json invalide')
const texte = completudeEnMarkdown(valide.brasseries)
if (process.argv.includes('--ecrire')) {
  writeFileSync('curation/A-CHERCHER.md', `${texte}\n`)
  console.log('curation/A-CHERCHER.md réécrit.')
} else {
  console.log(texte.slice(0, texte.indexOf('## Les « À confirmer »')))
}
