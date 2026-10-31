/**
 * L'état du dépôt, pour voir ce qu'un essai d'agent y a changé (S375, #216).
 * `git status` seul ne voit pas une écriture sur un fichier déjà modifié : on y
 * ajoute l'empreinte du diff et celle du contenu des fichiers non suivis. Les
 * résultats que le harnais écrit lui-même restent hors du compte. Les fichiers
 * ignorés (`dist/`, `node_modules/`) n'y sont pas : limite connue.
 */
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const HORS = ':!eval/essais-resultats'

export function etatDuDepot(dossier = '.'): string {
  const git = (...a: string[]) => execFileSync('git', a, { cwd: dossier, encoding: 'utf8', maxBuffer: 2 ** 28 })
  const empreinte = (t: string | Buffer) => createHash('sha256').update(t).digest('hex').slice(0, 16)
  const nonSuivis = git('ls-files', '--others', '--exclude-standard', '--', '.', HORS)
    .split(/\r?\n/)
    .filter((f) => f !== '')
  return [
    git('status', '--porcelain', '-uall', '--', '.', HORS).trimEnd(),
    `diff ${empreinte(git('diff', 'HEAD', '--', '.', HORS))}`,
    ...nonSuivis.map((f) => `contenu ${f} ${empreinte(readFileSync(join(dossier, f)))}`),
  ].join('\n')
}
