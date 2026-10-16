/**
 * L'outil de curation (S11), en ligne de commande :
 *
 *   npx tsx outils/curation.ts lot 25
 *     Les 25 fiches « À confirmer » à revoir ensuite (jamais vérifiées
 *     d'abord, puis les plus anciennes ; à égalité, les plus proches de
 *     Brignais).
 *
 *   npx tsx outils/curation.ts diff curation/lot-XX.json
 *     Valide le lot et l'affiche en Markdown, numéroté : ce que Cédric lit.
 *
 *   npx tsx outils/curation.ts appliquer curation/lot-XX.json 1,3,4
 *     Vérifie que les propositions 1, 3 et 4 donnent un fichier valide et
 *     affiche ce qui changerait. **N'écrit rien.**
 *
 *   npx tsx outils/curation.ts appliquer curation/lot-XX.json 1,3,4 --ecrire
 *     Écrit `data/breweries.json`. **Seulement avec l'accord écrit de Cédric,
 *     numéro par numéro** (CLAUDE.md §0) ; les numéros passés sont ceux
 *     qu'il a acceptés, et eux seuls.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { appliquerLot, diffLisible, formaterDonnees, lireLot, lotSuivant } from '../src/core/curation'
import { BRIGNAIS } from '../src/core/distance'
import { validerBrasseries } from '../src/core/schema'

const DONNEES = 'data/breweries.json'

function sortir(message: string, code: number): never {
  ;(code === 0 ? console.log : console.error)(message)
  process.exit(code)
}

function donnees() {
  const v = validerBrasseries(JSON.parse(readFileSync(DONNEES, 'utf8')))
  if (!v.ok) sortir(`${DONNEES} est invalide :\n${v.erreurs.join('\n')}`, 1)
  return v.brasseries
}

function lot(chemin: string | undefined) {
  if (chemin === undefined) sortir('chemin du lot attendu', 2)
  const l = lireLot(JSON.parse(readFileSync(chemin, 'utf8')))
  if (!l.ok) sortir(`${chemin} : lot invalide\n${l.erreurs.join('\n')}`, 1)
  return l.lot
}

const [commande, ...args] = process.argv.slice(2)

if (commande === 'lot') {
  const taille = Number(args[0] ?? '25')
  if (!Number.isInteger(taille) || taille < 1) sortir('taille entière attendue', 2)
  sortir(lotSuivant(donnees(), taille, BRIGNAIS).join('\n'), 0)
} else if (commande === 'diff') {
  sortir(diffLisible(donnees(), lot(args[0])), 0)
} else if (commande === 'appliquer') {
  const l = lot(args[0])
  const numeros = (args[1] ?? '')
    .split(',')
    .filter((x) => x !== '')
    .map(Number)
  if (numeros.length === 0) sortir('numéros acceptés attendus, ex. « 1,3,4 »', 2)
  const r = appliquerLot(donnees(), l, new Set(numeros))
  if (!r.ok) sortir(`refusé :\n${r.erreurs.join('\n')}`, 1)
  const retenu = { ...l, propositions: l.propositions.filter((_, i) => numeros.includes(i + 1)) }
  if (args.includes('--ecrire')) {
    writeFileSync(DONNEES, formaterDonnees(r.brasseries))
    sortir(`${DONNEES} écrit : ${String(numeros.length)} proposition(s) appliquée(s).`, 0)
  }
  sortir(`${diffLisible(donnees(), retenu)}\n\n(rien n'est écrit : ajouter --ecrire, après l'accord de Cédric)`, 0)
} else {
  sortir('usage : lot [taille] | diff <lot.json> | appliquer <lot.json> <1,2,…> [--ecrire]', 2)
}
