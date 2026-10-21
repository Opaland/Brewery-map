import { createHash } from 'node:crypto'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { Plugin } from 'vite'

/**
 * Inscrit dans `dist/sw.js` la liste des fichiers construits et l'empreinte
 * qui en dérive (repris de Sentiers, `vite.config.ts`).
 *
 * Sans la liste, la première visite ne met rien en cache : le service worker
 * ne contrôle pas encore la page quand elle charge ses scripts, et la
 * consultation hors ligne serait vide (persona Bernard). L'empreinte vient
 * des noms hachés et du contenu des autres fichiers (`empreinteDuPrecache`).
 *
 * Bruyant plutôt que silencieux : un marqueur non remplacé fait échouer le
 * build (CLAUDE.md §6quater).
 */
/**
 * L'empreinte du précache : les noms hachés, et le contenu de chaque fichier
 * qui n'a pas de nom haché. Un build identique ne purge rien ; une nouvelle
 * liste de communes purge l'ancienne copie (S333, revue globale A18 : seuls
 * les noms comptaient).
 */
export function empreinteDuPrecache(
  assets: readonly string[],
  nonHaches: readonly { nom: string; contenu: string | Uint8Array }[],
): string {
  const h = createHash('sha256').update(assets.join('\n'))
  for (const f of nonHaches) h.update(`\n${f.nom}\n`).update(f.contenu)
  return h.digest('hex').slice(0, 12)
}

export function precacheServiceWorker(): Plugin {
  return {
    name: 'mousse-precache-sw',
    apply: 'build',
    async closeBundle() {
      const dist = path.resolve('dist')
      const assets = (await readdir(path.join(dist, 'assets'))).sort()
      const fichiers = [
        './',
        './index.html',
        './manifest.webmanifest',
        './icon.svg',
        './favicon.ico',
        './icon-192.png',
        './icon-512.png',
        './icon-maskable-512.png',
        './theme-precoce.js',
        // Les communes de France, gardées d'avance (S42) : 469 ko compressé,
        // une fois par version. Sans elles, chercher une commune de départ
        // hors ligne échouait si l'on n'avait jamais cherché en ligne.
        './communes-france.json',
        './communes/departements.json',
        ...assets.map((nom) => `./assets/${nom}`),
      ]
      // Les fichiers sans nom haché (pages, icônes, communes) : leur contenu
      // entre dans l'empreinte (A18).
      const nonHaches = await Promise.all(
        fichiers
          .filter((f) => f !== './' && !f.startsWith('./assets/'))
          .map(async (nom) => ({ nom, contenu: await readFile(path.join(dist, nom)) })),
      )
      const empreinte = empreinteDuPrecache(assets, nonHaches)
      const swPath = path.join(dist, 'sw.js')
      const source = await readFile(swPath, 'utf-8')
      const reecrit = source
        .replace('self.__PRECACHE__ = []', `self.__PRECACHE__ = ${JSON.stringify(fichiers)}`)
        .replace("const EMPREINTE = '__EMPREINTE__'", `const EMPREINTE = '${empreinte}'`)
      if (reecrit.includes('__EMPREINTE__') || reecrit.includes('__PRECACHE__ = []')) {
        throw new Error('mousse-precache-sw : un marqueur de public/sw.js n’a pas été remplacé.')
      }
      await writeFile(swPath, reecrit)
    },
  }
}
