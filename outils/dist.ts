import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

/**
 * `dist/` est-il plus vieux que les sources ? Une seule réponse (§4), lue à
 * deux instants : par le crochet avant `playwright test`
 * (`outils/crochets-claude.ts`), et au démarrage de Playwright
 * (`tests/e2e/dist-a-jour.ts`, qui dit pourquoi il faut les deux).
 *
 * Il ne construit pas à votre place : construire en silence masquerait un
 * build cassé derrière un test lent — le même défaut, déplacé.
 */

/** Les racines dont une modification rend `dist/` périmé. */
const SOURCES = ['src', 'build', 'data', 'public', 'index.html', 'vite.config.ts', 'package.json']

/** L'horodatage du fichier le plus récent d'une arborescence. */
function plusRecent(chemin: string): number {
  if (!existsSync(chemin)) return 0
  const infos = statSync(chemin)
  if (infos.isFile()) return infos.mtimeMs
  let max = 0
  for (const entree of readdirSync(chemin)) max = Math.max(max, plusRecent(join(chemin, entree)))
  return max
}

/** La raison de refuser, ou `null` si `dist/` est à jour. */
export function pourquoiDistPerime(racine = '.'): string | null {
  const ici = (s: string) => join(racine, s)
  if (!existsSync(ici('dist'))) {
    return 'Playwright sert dist/, qui n’existe pas. Lancer `npm run build` — et lire sa sortie.'
  }
  const construit = plusRecent(ici('dist'))
  if (construit === 0) return 'dist/ est vide. Lancer `npm run build`.'
  const tsconfigs = readdirSync(racine).filter((f) => /^tsconfig.*\.json$/.test(f))
  const coupables = [...SOURCES, ...tsconfigs].filter((s) => plusRecent(ici(s)) > construit)
  if (coupables.length === 0) return null
  return (
    `dist/ est plus vieux que les sources : Playwright testerait une version périmée, ` +
    `et passerait au vert en prouvant le contraire de ce qu’on lui demande ` +
    `(CLAUDE.md §6 et §6quater). Modifiés depuis le dernier build : ` +
    `${coupables.join(', ')}. Lancer \`npm run build\` et vérifier « ✓ built ».`
  )
}
