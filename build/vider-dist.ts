import { rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

/**
 * Vide le dossier de sortie au début du build (W9, S304). Vite le fait
 * déjà, par `fs.rmSync` ; mais sous Node 24 et Windows, `rmSync` ne
 * supprime rien dans un chemin non ASCII et ne lève aucune erreur (mesuré
 * le 20/10 dans `C:\Users\Moretti Cédric\…` : `unlinkSync` et
 * `fs.promises.rm` suppriment, `rmSync` non). Les morceaux d'un build
 * précédent restaient dans `dist/assets`, et le précache du service worker
 * les aurait listés. `fs.promises.rm` est sûr partout.
 */
export function viderDist(): Plugin {
  let sortie = ''
  return {
    name: 'mousse-vider-dist',
    apply: 'build',
    configResolved(config) {
      sortie = resolve(config.root, config.build.outDir)
    },
    async buildStart() {
      if (sortie !== '') await rm(sortie, { recursive: true, force: true })
    },
  }
}
