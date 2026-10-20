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

/** Les options de git qui prennent la valeur suivante : `-C <dossier>`, `-c <clé=valeur>`… */
const OPTIONS_A_VALEUR = new Set(['-C', '-c', '--git-dir', '--work-tree', '--namespace', '--exec-path', '--config-env'])

/** Un mot de commande, et s'il était entre guillemets. */
interface Mot {
  texte: string
  cite: boolean
}

/**
 * Les mots d'une commande, guillemets compris : `echo "git commit"` n'en
 * fait que deux. Les parenthèses, accolades et accents graves collés à un
 * mot (`(git`, `$(git`, `` `git ``) sont retirés : un sous-shell lance aussi
 * la commande (revue adverse S306).
 */
function mots(segment: string): Mot[] {
  return [...segment.matchAll(/"[^"]*"|'[^']*'|\S+/g)].map((m) => {
    const brut = m[0]
    if (/^(["']).*\1$/s.test(brut)) return { texte: brut.slice(1, -1), cite: true }
    return { texte: brut.replace(/^(\$\(|[({`"'])+/, '').replace(/[)}`"']+$/, ''), cite: false }
  })
}

/** Un interpréteur qui lance la commande qu'on lui passe entre guillemets. */
const INTERPRETE = /(^|[/\\])((ba|z|da)?sh|pwsh|powershell|cmd)(\.exe)?$/i

/**
 * La commande lance-t-elle `git commit` ? Dans chaque morceau d'une chaîne
 * (`;`, `&`, `&&`, `||`, `|`, retour à la ligne), le premier mot qui est
 * git (`git`, `git.exe`, ou un chemin vers lui), ses options sautées : la
 * sous-commande est-elle `commit` ? Le texte cité après un interpréteur
 * (`bash -c "…"`, `pwsh -Command "…"`) est lu de la même façon.
 * `git -C . commit` et `git -c a=b commit` passaient sans porte (revue
 * globale du 19/10, C2), le motif `/git\s+commit/` ne les voyant pas ;
 * `git add . & git commit` et `bash -c "git commit"` passaient encore
 * (revue adverse S306). Un faux positif (une ligne `git commit` dans un
 * heredoc) lance la porte pour rien : c'est le côté sûr.
 */
export function estUnCommit(commande: string): boolean {
  return commande.split(/&&|\|\||[;&|\n]/).some((segment) => {
    const m = mots(segment)
    if (m.some((mot) => INTERPRETE.test(mot.texte)) && m.some((mot) => mot.cite && estUnCommit(mot.texte))) return true
    let i = m.findIndex((mot) => !mot.cite && /(^|[/\\])git(\.exe)?$/i.test(mot.texte))
    if (i === -1) i = m.findIndex((mot) => mot.cite && /(^|[/\\])git(\.exe)?$/i.test(mot.texte))
    if (i === -1) return false
    for (i += 1; i < m.length; i++) {
      const mot = m[i]?.texte ?? ''
      if (!mot.startsWith('-')) return mot === 'commit'
      if (OPTIONS_A_VALEUR.has(mot)) i += 1
    }
    return false
  })
}

/**
 * Porte avant commit. Lancé sur chaque commande (S306 : le filtre `if` de
 * settings.json laissait passer `git -C . commit`), il relit la commande :
 * sans cela la porte se déclencherait sur chaque commande et rendrait le
 * TDD impossible (rouge-puis-vert est la méthode). `null` : rien à dire,
 * la commande passe.
 */
export function deciderCommit(commande: string, porte: () => Resultat[]): Sortie | null {
  if (!estUnCommit(commande)) return null
  const resultats = porte()
  const rouges = echecs(resultats)
  if (rouges.length === 0) {
    return { systemMessage: 'Porte avant commit : lint, typecheck, tests unitaires, garde de data/, build et e2e au vert.' }
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
    // La CI seule (S306, C1) : tous workflows confondus, une sonde de nuit
    // rouge déclenchait l'arrêt §9 à tort, et trois nuits vertes cachaient
    // une CI rouge.
    '--workflow',
    'ci.yml',
    '--limit',
    '3',
    '--json',
    'name,conclusion,headSha,createdAt',
  ]
}
