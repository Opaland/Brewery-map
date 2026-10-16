import type { Plugin } from 'vite'

/**
 * La Content-Security-Policy de la page publiée (S24). GitHub Pages ne pose
 * aucun en-tête : elle passe par une balise `<meta>`, ajoutée au build
 * seulement (le serveur de développement injecte des scripts en ligne).
 *
 * - `script-src 'self'` : aucun script en ligne ni tiers ;
 * - tuiles OpenStreetMap seulement, en image et en requête (MapLibre les
 *   charge par `fetch`) ;
 * - `worker-src blob:` : MapLibre crée son worker depuis un blob ;
 * - `style-src 'unsafe-inline'` : MapLibre et React posent des attributs
 *   `style` (positions des marqueurs) ; aucun style tiers.
 * `frame-ancestors` n'a pas d'effet en `<meta>` : pas mis, pour ne rien
 * promettre.
 */
export const POLITIQUE = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://tile.openstreetmap.org",
  "connect-src 'self' https://tile.openstreetmap.org",
  "worker-src 'self' blob:",
  "child-src blob:",
  "font-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
].join('; ')

export function politiqueDeSecurite(): Plugin {
  return {
    name: 'mousse-csp',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler: () => [
        {
          tag: 'meta',
          attrs: { 'http-equiv': 'Content-Security-Policy', content: POLITIQUE },
          injectTo: 'head-prepend',
        },
      ],
    },
  }
}
