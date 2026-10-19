// Lance un crochet de Claude Code : `node .claude/hooks/crochet.mjs <nom>`.
//
// Les crochets étaient en bash et lisaient leur entrée par `jq` ; sous
// PowerShell, sans `jq`, la porte avant commit sortait en 0 sans rien lancer
// (S302, W2 : vu le 19/10 sur le PC fixe). Ils sont en TypeScript
// (`outils/crochet.ts`, `outils/crochets-claude.ts`) ; ce lanceur, sans
// aucune dépendance, les démarre par le Node qui tourne et tsx.
//
// Une porte qui ne démarre pas ne laisse rien passer : si l'outil manque ou
// plante pendant un commit, le commit est refusé, avec la raison.
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const nom = process.argv[2] ?? ''
const racine = fileURLToPath(new URL('../..', import.meta.url))
const tsx = fileURLToPath(new URL('../../node_modules/tsx/dist/cli.mjs', import.meta.url))
const outil = fileURLToPath(new URL('../../outils/crochet.ts', import.meta.url))

let entree = ''
try {
  entree = readFileSync(0, 'utf8')
} catch {
  // Pas d'entrée (SessionStart) : rien à lire.
}

const refuserLeCommit = (raison) => {
  if (nom === 'porte-avant-commit' && /git\s+commit/.test(entree)) {
    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: raison },
      }) + '\n',
    )
  }
  process.exit(0)
}

if (!existsSync(tsx) || !existsSync(outil)) {
  refuserLeCommit('Porte avant commit : impossible de la lancer, node_modules/tsx est absent. Lancer `npm ci`.')
}

const r = spawnSync(process.execPath, [tsx, outil, nom], {
  cwd: racine,
  input: entree,
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
})
if (r.status !== 0) {
  // Hors commit, un crochet qui plante (ou un nom mal écrit dans
  // settings.json) le dit sur stderr et sort en 1 : Claude Code l'affiche,
  // au lieu d'un crochet muet (revue adverse S302).
  if (nom !== 'porte-avant-commit') {
    process.stderr.write(`Crochet « ${nom} » en échec (code ${r.status}).\n${(r.stderr ?? '').slice(-2000)}`)
    process.exit(1)
  }
  refuserLeCommit(`Porte avant commit : le crochet a planté (code ${r.status}).\n${r.error?.message ?? ''}${(r.stderr ?? '').slice(-2000)}`)
}
process.stdout.write(r.stdout ?? '')
