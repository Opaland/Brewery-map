import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { Plugin } from 'vite'
import { validerFichierOsm } from '../src/core/osm-france.ts'
import { validerBrasseries } from '../src/core/schema.ts'

/**
 * Fait échouer `vite build` si un fichier de brasseries importé ne respecte
 * pas le schéma.
 *
 * La validation vit **là où les données entrent dans le bundle**, et non dans
 * un script qu'il faudrait penser à lancer avant : un contrôle qu'il faut
 * penser à lancer ne garde rien (CLAUDE.md §6quater). Tant que l'application
 * n'importe pas le fichier, il n'y a rien à garder ; dès qu'elle l'importe,
 * il ne peut plus entrer invalide.
 *
 * `enforce: 'pre'` : le contenu est encore le texte JSON brut, avant que le
 * plugin JSON de Vite ne le transforme en module.
 */
export const MOTIF_DONNEES = /[\\/]data[\\/]breweries\.json$/

export function validerDonnees(motif: RegExp = MOTIF_DONNEES): Plugin {
  return {
    name: 'mousse-valider-donnees',
    enforce: 'pre',
    transform(code, id) {
      if (!motif.test(id.split('?')[0] ?? id)) return null
      let contenu: unknown
      try {
        contenu = JSON.parse(code)
      } catch (e) {
        this.error(`${id} : JSON illisible — ${String(e)}`)
      }
      const verdict = validerBrasseries(contenu)
      if (!verdict.ok) {
        const extrait = verdict.erreurs.slice(0, 20).join('\n  ')
        const reste = verdict.erreurs.length > 20 ? `\n  … et ${String(verdict.erreurs.length - 20)} autres` : ''
        this.error(`${id} : ${String(verdict.erreurs.length)} erreur(s) de schéma\n  ${extrait}${reste}`)
      }
      return null
    },
  }
}

export const MOTIF_OSM = /[\\/]src[\\/]donnees-osm[\\/]brasseries-osm\.json$/

/**
 * Le même garde pour la couche OpenStreetMap (S25) : son schéma, des noms
 * uniques, aucun nom repris du fichier de Cédric.
 */
export function validerDonneesOsm(motif: RegExp = MOTIF_OSM): Plugin {
  return {
    name: 'mousse-valider-donnees-osm',
    enforce: 'pre',
    async transform(code, id) {
      if (!motif.test(id.split('?')[0] ?? id)) return null
      let contenu: unknown
      try {
        contenu = JSON.parse(code)
      } catch (e) {
        this.error(`${id} : JSON illisible — ${String(e)}`)
      }
      const fichier = JSON.parse(await readFile(path.resolve('data/breweries.json'), 'utf-8')) as { n: string }[]
      const verdict = validerFichierOsm(contenu, new Set(fichier.map((b) => b.n)))
      if (!verdict.ok) {
        this.error(`${id} : ${String(verdict.erreurs.length)} erreur(s)\n  ${verdict.erreurs.slice(0, 20).join('\n  ')}`)
      }
      return null
    },
  }
}
