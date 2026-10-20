import type { Plugin } from 'vite'
import { partDesFiches, type Part } from '../src/core/decoupage.ts'

/**
 * Découpe `data/breweries.json` au build (S294, AR8) : `breweries.json?premier-ecran`
 * et `breweries.json?suite` rendent chacun une part du fichier, en module.
 *
 * Placé **après** `validerDonnees` dans `vite.config.ts` : celui-ci lit le
 * texte brut de chaque import du fichier, paramètre compris, et fait échouer
 * le build sur une ligne invalide (§6quater). Le découpage ne voit donc que
 * des données déjà validées.
 */
const MOTIF = /[\\/]data[\\/]breweries\.json\?(premier-ecran|suite)$/

export function decouperDonnees(): Plugin {
  return {
    name: 'mousse-decouper-donnees',
    enforce: 'pre',
    transform(code, id) {
      const part = MOTIF.exec(id)?.[1] as Part | undefined
      if (part === undefined) return null
      const fiches = JSON.parse(code) as { d: string }[]
      // Un module JavaScript, déclaré comme tel : avec un paramètre dans
      // l'adresse, Vite 8 ne traite plus le fichier comme du JSON, et le
      // texte rendu était lu comme un module vide (vu au test, S294).
      // `JSON.parse` d'une chaîne : plus rapide à lire qu'un littéral objet.
      const texte = JSON.stringify(JSON.stringify(partDesFiches(fiches, part)))
      return { code: `export default JSON.parse(${texte})`, map: null, moduleType: 'js' }
    },
  }
}
