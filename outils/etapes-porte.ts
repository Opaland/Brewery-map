import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

/**
 * Les étapes de la porte complète (CLAUDE.md §6), en Node : lancées par
 * `npm run porte` (`outils/porte.ts`) et par le crochet avant commit
 * (`outils/crochets-claude.ts`). Écrite en bash, elle
 * ne tournait pas sous PowerShell, et sans `jq` le crochet sortait en 0 sans
 * rien lancer (S302, W2 : vu le 19/10 sur le PC fixe).
 *
 * Chaque outil est lancé par le Node qui tourne, sur son JS : ni `npx`, ni
 * shell, ni `node_modules/.bin` (W3), donc la même chose sous Linux et sous
 * Windows.
 *
 * Mesuré le 17/10 (docs/PORTE.md) : ≈ 258 s en tout, dont 228 s d'e2e
 * (181 tests) ; délai du crochet 600 s, budget 450 s. Au-delà, S234 découpe
 * les e2e — un garde-fou qu'on finit par désactiver ne garde rien.
 */

const RACINE = fileURLToPath(new URL('..', import.meta.url))
const js = (chemin: string) => fileURLToPath(new URL(`../node_modules/${chemin}`, import.meta.url))

export interface Etape {
  nom: string
  args: string[]
}

/**
 * Dans l'ordre. Le build passe avant les e2e : Playwright sert dist/, et un
 * dist/ périmé fait passer au vert ce qui est cassé (§6quater). `tsc -b` et
 * non `tsc --noEmit` : références de projet ; `tsc --noEmit` seul rend 0
 * sans rien vérifier (mesuré sur Sentiers).
 */
export const ETAPES: Etape[] = [
  { nom: 'lint', args: [js('eslint/bin/eslint.js'), '.'] },
  { nom: 'typecheck', args: [js('typescript/bin/tsc'), '-b', '--noEmit'] },
  { nom: 'tests', args: [js('vitest/vitest.mjs'), 'run', '--silent'] },
  // Comme en CI (S306, C3) : une ligne de data/ sans accord rougissait
  // seulement après le push. `npm audit` reste en CI : il demande le
  // registre npm, et une porte qui rougit hors ligne sans faille (S283)
  // apprend à la contourner.
  { nom: 'garde', args: [js('tsx/dist/cli.mjs'), 'outils/garde-donnees.ts'] },
  { nom: 'build', args: [js('typescript/bin/tsc'), '-b'] },
  { nom: 'build', args: [js('vite/bin/vite.js'), 'build'] },
  { nom: 'e2e', args: [js('@playwright/test/cli.js'), 'test'] },
]

export interface Resultat {
  nom: string
  ok: boolean
  sortie: string
}

export type Lanceur = (etape: Etape) => Resultat

/**
 * Lance les étapes ; les e2e ne tournent que si tout ce qui précède est vert.
 * Un build en échec arrête aussi la suite du build : `vite build` après un
 * `tsc -b` rouge produirait un dist/ qu'aucun typecheck n'a vu.
 */
export function lancerPorte(lancer: Lanceur, etapes: Etape[] = ETAPES): Resultat[] {
  const resultats: Resultat[] = []
  for (const etape of etapes) {
    const rouge = resultats.some((r) => !r.ok)
    if (etape.nom === 'e2e' && rouge) continue
    if (etape.nom === 'build' && resultats.some((r) => r.nom === 'build' && !r.ok)) continue
    resultats.push(lancer(etape))
  }
  return resultats
}

/** Les 25 dernières lignes : assez pour lire l'erreur, pas tout le journal. */
const fin = (texte: string) => texte.split('\n').slice(-25).join('\n')

/**
 * Le vrai lanceur. Le Chromium du conteneur cloud (`/opt/pw-browsers`) n'est
 * pris que s'il existe et que rien d'autre n'est posé ; sous Windows,
 * Playwright prend celui de `npx playwright install chromium`.
 */
export const lanceurReel: Lanceur = (etape) => {
  const env = { ...process.env }
  const chromiumCloud = '/opt/pw-browsers/chromium'
  if (env.PW_CHROMIUM_PATH === undefined && existsSync(chromiumCloud)) env.PW_CHROMIUM_PATH = chromiumCloud
  const r = spawnSync(process.execPath, etape.args, { cwd: RACINE, env, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 })
  // Un processus qui n'a pas démarré n'a ni stdout ni stderr. La sortie
  // standard en dernier : c'est là que les outils listent leurs échecs, et
  // seule la fin est gardée (le 19/10, des avertissements de stderr avaient
  // caché la liste des e2e rouges).
  const { stdout, stderr } = r as { stdout: string | null; stderr: string | null }
  const sortie = `${stderr ?? ''}${stdout ?? ''}${r.error ? `\n${r.error.message}` : ''}`
  return { nom: etape.nom, ok: r.status === 0, sortie: fin(sortie) }
}

/** Les étapes en échec, sans doublon, dans l'ordre. */
export const echecs = (resultats: Resultat[]) => [...new Set(resultats.filter((r) => !r.ok).map((r) => r.nom))]
