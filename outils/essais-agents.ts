/**
 * S354 (E37, repris de `scripts/essais_agents.py` d'ISTQBFinder) : pose les
 * questions de `eval/essais-agents.json` aux agents par `claude -p --agent`,
 * puis contrôle chaque réponse.
 *
 *     npx tsx outils/essais-agents.ts                 # tous les essais
 *     npx tsx outils/essais-agents.ts A1-defaut-plante
 *
 * Coût indicatif : 0,10 à 0,50 $ par essai. Ne part que sur l'accord de
 * Cédric (AGENTS.md §12) ; la porte ne l'appelle jamais. Résultats :
 * `eval/essais-resultats/<date>/`. Le jugement de fond reste humain
 * (`docs/ESSAIS-AGENTS.md`).
 */
import { spawnSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import {
  argumentShell,
  coutAtteint,
  ecartsDuDepot,
  type Evenement,
  outilsEmployes,
  outilsInterdits,
  referencesFichiers,
  referencesIntrouvables,
  rubriquesManquantes,
} from '../src/core/essais-agents'
import { etatDuDepot } from './etat-depot'

interface Essai {
  id: string
  agent: string
  question: string
  attendu: { rubriques: string[]; contient: string[] }
  interdits: string[]
}

/** Ce que l'essai peut faire sans demander : lire, chercher, git en lecture seule, vitest, le web (revue globale du 22/10 : `git *` permettait d'écrire). */
const OUTILS = ['Read', 'Grep', 'Glob', 'Bash(git log *)', 'Bash(git diff *)', 'Bash(git show *)', 'Bash(git status*)', 'Bash(npx vitest *)', 'WebFetch', 'WebSearch']

/**
 * Le transcript de la session. Son identifiant est imposé (`--session-id`) :
 * lancé depuis une session Claude Code, l'enfant hériterait sinon de celui du
 * parent (piège noté par ISTQBFinder).
 */
function transcript(session: string): Evenement[] {
  const projets = join(homedir(), '.claude', 'projects')
  if (!existsSync(projets)) return []
  for (const d of readdirSync(projets)) {
    const f = join(projets, d, `${session}.jsonl`)
    if (existsSync(f)) {
      return readFileSync(f, 'utf8')
        .split('\n')
        .filter((l) => l.trim() !== '')
        .map((l) => JSON.parse(l) as Evenement)
    }
  }
  return []
}

/** Le haut du coût annoncé à Cédric pour cette campagne (S354, #216). */
const PLAFOND_USD = 1.5
/** Ce qu'une partie déjà lancée de la campagne a coûté : il compte dans le plafond. */
const DEJA_DEPENSE = Number(process.env.ESSAIS_DEJA_DEPENSE_USD ?? 0)

const lireDepot = (chemin: string) => (existsSync(chemin) ? readFileSync(chemin, 'utf8') : undefined)

function lancer(e: Essai, dossier: string, budget: number) {
  const session = randomUUID()
  const avant = etatDuDepot()
  const env = { ...process.env }
  delete env.CLAUDE_CODE_SESSION_ID
  delete env.CLAUDE_CODE_CHILD_SESSION
  const r = spawnSync(
    'claude',
    // La question passe par l'entrée standard : aucun shell ne la coupe ni ne l'interprète.
    ['--agent', e.agent, '-p', '--output-format', 'json', '--session-id', session, '--max-budget-usd', budget.toFixed(2), '--allowedTools', ...OUTILS.map((o) => argumentShell(o, process.platform))],
    { encoding: 'utf8', env, input: e.question, timeout: 900_000, shell: process.platform === 'win32' },
  )
  let res: { result?: string; num_turns?: number; total_cost_usd?: number }
  try {
    res = JSON.parse(r.stdout) as typeof res
  } catch {
    return { id: e.id, erreur: (r.stderr || r.stdout).slice(-800), depotChange: ecartsDuDepot(avant, etatDuDepot()) }
  }
  const reponse = res.result ?? ''
  const evts = transcript(session)
  const bilan = {
    id: e.id,
    agent: e.agent,
    tours: res.num_turns,
    coutUsd: Math.round((res.total_cost_usd ?? 0) * 1000) / 1000,
    outils: outilsEmployes(evts),
    outilsInterdits: outilsInterdits(evts, e.interdits),
    rubriquesManquantes: rubriquesManquantes(reponse, e.attendu.rubriques),
    absents: e.attendu.contient.filter((c) => !reponse.includes(c)),
    referencesIntrouvables: referencesIntrouvables(referencesFichiers(reponse), lireDepot),
    transcriptLu: evts.length > 0,
    depotChange: ecartsDuDepot(avant, etatDuDepot()),
  }
  const ok = bilan.outilsInterdits.length === 0 && bilan.rubriquesManquantes.length === 0 && bilan.absents.length === 0 && bilan.referencesIntrouvables.length === 0 && bilan.depotChange.length === 0
  writeFileSync(
    join(dossier, `${e.id}.md`),
    `# ${e.id} — ${e.agent}\n\n**Question** : ${e.question}\n\n` +
      `**Contrôles automatiques** : ${ok ? 'tous tenus' : 'ÉCART'} · tours ${String(bilan.tours)} · coût ${String(bilan.coutUsd)} $\n` +
      `- outils interdits employés : ${bilan.outilsInterdits.join(', ') || 'aucun'}${bilan.transcriptLu ? '' : ' (transcript introuvable : non vérifié)'}\n` +
      `- rubriques manquantes : ${bilan.rubriquesManquantes.join(', ') || 'aucune'}\n` +
      `- attendus absents : ${bilan.absents.join(', ') || 'aucun'}\n` +
      `- dépôt changé par l'essai : ${bilan.depotChange.join(', ') || 'non'}
` +
      `- références fichier:ligne introuvables : ${bilan.referencesIntrouvables.join(', ') || 'aucune'}\n\n` +
      `## Réponse\n\n${reponse}\n\n## Outils employés\n\n${bilan.outils.map((o) => `- ${o}`).join('\n')}\n`,
  )
  return { ...bilan, ok }
}

const essais = (JSON.parse(readFileSync('eval/essais-agents.json', 'utf8')) as { essais: Essai[] }).essais
const choisis = process.argv.slice(2)
const dossier = join('eval', 'essais-resultats', new Date().toISOString().slice(0, 10))
mkdirSync(dossier, { recursive: true })
const bilans = []
const couts: number[] = [DEJA_DEPENSE]
for (const e of essais.filter((x) => choisis.length === 0 || choisis.includes(x.id))) {
  // Sous un centime, `--max-budget-usd 0.00` n'a pas de sens connu : on s'arrête.
  if (coutAtteint(couts, PLAFOND_USD - 0.01)) {
    console.log(`Arrêt : plafond de ${String(PLAFOND_USD)} $ atteint, ${e.id} non lancé.`)
    break
  }
  console.log(`… ${e.id} (${e.agent})`)
  const b = lancer(e, dossier, PLAFOND_USD - couts.reduce((t, c) => t + c, 0))
  bilans.push(b)
  if (!('coutUsd' in b)) {
    // Un essai en erreur a pu dépenser sans le dire : on ne continue pas à l'aveugle.
    console.log(`  ERREUR : ${b.erreur}\nArrêt : coût de cet essai inconnu.`)
    break
  }
  couts.push(b.coutUsd)
  console.log(`  ${b.ok ? 'tenu' : 'ÉCART'} · ${String(b.tours)} tours · ${String(b.coutUsd)} $`)
}
writeFileSync(join(dossier, 'bilan.json'), `${JSON.stringify(bilans, null, 1)}\n`)
console.log(`Résultats : ${dossier}`)
