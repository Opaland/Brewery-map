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

/**
 * Le nom, tel que le dit le texte « Ce qui part sur le réseau »
 * (`PointDeDepart.tsx`), de chaque service tiers de la politique (S273).
 * Un hôte ajouté à `POLITIQUE` sans nom, ou dont le nom manque au texte,
 * fait échouer `tests/composants/transparence.test.tsx`.
 */
export const NOMS_DES_HOTES: Readonly<Partial<Record<string, string>>> = {
  'tile.openstreetmap.org': 'OpenStreetMap',
}

/** Les hôtes que la politique permet (tout schéma `xxx://`), lus sur elle, sans port ni doublon. */
export function hotesTiers(politique: string): string[] {
  const hotes = politique
    .split(/[;\s]+/)
    .filter((mot) => /^[a-z][a-z0-9+.-]*:\/\//.test(mot))
    .map((mot) => new URL(mot).hostname)
  return [...new Set(hotes)]
}

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
