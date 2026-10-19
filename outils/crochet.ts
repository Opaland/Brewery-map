import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  argumentsGh,
  deciderCommit,
  deciderPlaywright,
  lireCommande,
  messageDeploiement,
  type Execution,
} from './crochets-claude'
import { pourquoiDistPerime } from './dist'
import { lancerPorte, lanceurReel } from './etapes-porte'

/**
 * Les crochets de `.claude/settings.json`, lancés par
 * `.claude/hooks/crochet.mjs <nom>` (S302, W2). Ce qu'ils décident est dans
 * `crochets-claude.ts` ; ici, seulement ce qu'ils lisent et écrivent.
 */
const RACINE = fileURLToPath(new URL('..', import.meta.url))
const ecrire = (sortie: Record<string, unknown> | null) => {
  if (sortie !== null) process.stdout.write(`${JSON.stringify(sortie)}\n`)
}
const lireEntree = () => {
  try {
    return readFileSync(0, 'utf8')
  } catch {
    return ''
  }
}

const nom = process.argv.at(2)
if (nom === 'porte-avant-commit') {
  ecrire(deciderCommit(lireCommande(lireEntree()), () => lancerPorte(lanceurReel)))
} else if (nom === 'dist-a-jour') {
  ecrire(deciderPlaywright(lireCommande(lireEntree()), process.env.MOUSSE_URL, () => pourquoiDistPerime(RACINE)))
} else if (nom === 'etat-deploiement') {
  let url = ''
  try {
    url = execFileSync('git', ['config', '--get', 'remote.origin.url'], { cwd: RACINE, encoding: 'utf8' })
  } catch {
    // Pas de dépôt distant : rien à dire.
  }
  const args = argumentsGh(url)
  if (args !== null) {
    let executions: Execution[] | null | 'indisponible'
    try {
      const json = execFileSync('gh', args, { cwd: RACINE, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
      executions = JSON.parse(json) as Execution[]
    } catch (e) {
      // gh n'est pas disponible partout (l'environnement distant ne l'a pas) :
      // sans lui, on le dit au lieu de laisser croire que tout va bien.
      executions = (e as { code?: string }).code === 'ENOENT' ? null : 'indisponible'
    }
    ecrire(messageDeploiement(executions))
  }
} else {
  console.error(`crochet inconnu : ${nom ?? '(aucun)'}`)
  process.exit(1)
}
