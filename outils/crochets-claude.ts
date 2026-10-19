import { echecs, type Resultat } from './etapes-porte'

/**
 * Ce que décident les crochets de Claude Code (`.claude/settings.json`), en
 * fonctions pures ; `outils/crochet.ts` les branche sur stdin, git, gh et la
 * porte. Ils étaient en bash et lisaient la commande par `jq … || echo ""` :
 * sans `jq`, la commande lue était vide, et la porte avant commit sortait en
 * 0 sans rien lancer ni rien dire (S302, W2 : vu le 19/10 sur le PC fixe).
 */

type Sortie = Record<string, unknown>

/** La commande que Claude Code s'apprête à lancer ; vide si l'entrée est illisible. */
export function lireCommande(entree: string): string {
  try {
    const json = JSON.parse(entree) as { tool_input?: { command?: unknown } }
    const commande = json.tool_input?.command
    return typeof commande === 'string' ? commande : ''
  } catch {
    return ''
  }
}

const refuser = (raison: string): Sortie => ({
  hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: raison },
})

/**
 * Porte avant commit. Le filtre `if` de settings.json n'est pas honoré
 * partout : on relit la commande. Sans cela la porte se déclencherait sur
 * chaque commande et rendrait le TDD impossible (rouge-puis-vert est la
 * méthode). `null` : rien à dire, la commande passe.
 */
export function deciderCommit(commande: string, porte: () => Resultat[]): Sortie | null {
  if (!/git\s+commit/.test(commande)) return null
  const resultats = porte()
  const rouges = echecs(resultats)
  if (rouges.length === 0) {
    return { systemMessage: 'Porte avant commit : lint, typecheck, tests unitaires, build et e2e au vert.' }
  }
  const sorties = resultats
    .filter((r) => !r.ok)
    .map((r) => `\n=== ${r.nom} ===\n${r.sortie}`)
    .join('')
  return refuser(`Porte avant commit : ${rouges.join(' ')} en échec. Corriger avant de committer.${sorties}`)
}

/**
 * Refuse de lancer Playwright sur un `dist/` périmé (le raté du 23 au 24/08,
 * trois fois : un test vert qui prouvait le contraire de ce qu'on lui
 * demandait). Rien à juger contre la page publiée (`MOUSSE_URL`), en bash
 * comme en PowerShell (`$env:MOUSSE_URL = …`).
 */
export function deciderPlaywright(
  commande: string,
  mousseUrl: string | undefined,
  pourquoiDistPerime: () => string | null,
): Sortie | null {
  if (!commande.includes('playwright test')) return null
  if (/MOUSSE_URL\s*=/.test(commande) || (mousseUrl ?? '') !== '') return null
  const raison = pourquoiDistPerime()
  return raison === null ? null : refuser(raison)
}

export interface Execution {
  name: string
  conclusion: string | null
}

const auDemarrage = (message: string): Sortie => ({
  hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: message },
})

/**
 * L'état du dernier déploiement de main, au démarrage : une consigne qu'on
 * peut oublier finit par être oubliée. `null` : gh absent ; `[]` ou
 * illisible : état indisponible.
 */
export function messageDeploiement(executions: Execution[] | null | 'indisponible'): Sortie {
  if (executions === null) {
    return auDemarrage(
      'Déploiement de main : non vérifié au démarrage (gh absent). Le vérifier via les outils GitHub avant de committer — c’est l’étape que j’ai sautée pendant toute une session.',
    )
  }
  if (executions === 'indisponible' || executions.length === 0) {
    return auDemarrage('Déploiement de main : état indisponible. À vérifier à la main.')
  }
  const resume = executions.map((e) => `${e.name}: ${e.conclusion ?? 'en cours'}`).join(' · ')
  const rouge = executions.some((e) => e.conclusion !== null && e.conclusion !== 'success')
  return auDemarrage(
    rouge
      ? `⚠ Déploiement de main EN ÉCHEC — ${resume}. Ne rien empiler dessus : corriger d’abord (voir CLAUDE.md, « ce qui vaut arrêt »).`
      : `Déploiement de main : ${resume}`,
  )
}

/** `Opaland/Brewery-map` depuis l'URL du dépôt distant, en https comme en ssh. */
export function depotDe(url: string): string | null {
  const m = /github\.com[:/]([^/]+\/[^/.]+?)(\.git)?\/?$/.exec(url.trim())
  return m ? m[1] : null
}

/**
 * Les arguments de `gh run list`, ou `null` s'il n'y a pas de dépôt distant
 * (rien à dire). Une URL qui n'est pas github.com (un mandataire, dans le
 * conteneur cloud) ne fait pas taire le crochet : gh devine alors le dépôt,
 * et s'il échoue, l'état est dit indisponible (revue adverse S302 : le
 * crochet bash parlait dans ce cas, et le portage s'était tu).
 */
export function argumentsGh(url: string): string[] | null {
  if (url.trim() === '') return null
  const depot = depotDe(url)
  return [
    'run',
    'list',
    ...(depot === null ? [] : ['--repo', depot]),
    '--branch',
    'main',
    '--limit',
    '3',
    '--json',
    'name,conclusion,headSha,createdAt',
  ]
}
