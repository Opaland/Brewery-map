import type { Plugin } from 'vite'

/**
 * Annonce le morceau de la couche « toute la France » dès le HTML (S25) :
 * sans cela, sa requête ne partait qu'après l'exécution du JavaScript
 * principal, et le premier écran attendait ≈ 600 ms de plus en 4G lente
 * simulée (revue adverse S25 : 1,9 s contre 1,3 s).
 */
export function prechargerCoucheOsm(): Plugin {
  return {
    name: 'mousse-precharger-osm',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler: (_html, ctx) => {
        const morceau = Object.values(ctx.bundle ?? {}).find(
          (f) => f.type === 'chunk' && f.fileName.includes('brasseries-osm'),
        )
        if (morceau === undefined) throw new Error('mousse-precharger-osm : morceau de la couche OSM introuvable')
        return [{ tag: 'link', attrs: { rel: 'modulepreload', href: `./${morceau.fileName}` }, injectTo: 'head' }]
      },
    },
  }
}
