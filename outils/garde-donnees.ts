/**
 * La garde de `data/` (S230), en CI à chaque push et chaque PR :
 *
 *   npx tsx outils/garde-donnees.ts
 *
 * Relit le fichier fourni par Cédric le 15/10 dans l'historique git (son
 * empreinte est fixée ici), rejoue les accords de `curation/accords/` et
 * compare au fichier actuel, à l'octet près. La CI doit cloner l'historique
 * (`fetch-depth: 0`).
 */
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { lireLot } from '../src/core/curation'
import { BASE_DE_DONNEES, verifierDonnees, type AccordLu } from '../src/core/garde-donnees'
import { empreinte, fichiersDeLots, lireTexte } from './lots'



function sortir(message: string, code: number): never {
  ;(code === 0 ? console.log : console.error)(message)
  process.exit(code)
}

const base = execFileSync('git', ['show', `${BASE_DE_DONNEES.commit}:data/breweries.json`], { encoding: 'utf8' })
if (createHash('sha256').update(base).digest('hex') !== BASE_DE_DONNEES.sha256) {
  sortir('le fichier de base relu dans git n’a pas l’empreinte du 15/10', 1)
}

const lots = new Map(
  fichiersDeLots().flatMap((chemin) => {
    const texte = lireTexte(chemin)
    const l = lireLot(JSON.parse(texte), '9999-12-31')
    return l.ok ? [[l.lot.lot, { lot: l.lot, empreinte: empreinte(texte) }] as const] : []
  }),
)

const dossier = 'curation/accords'
const accords: AccordLu[] = existsSync(dossier)
  ? readdirSync(dossier)
      .filter((f) => f.endsWith('.json'))
      .map((nom) => {
        const accord = JSON.parse(readFileSync(`${dossier}/${nom}`, 'utf8')) as { lot?: unknown }
        return { nom, accord, lot: typeof accord.lot === 'string' ? lots.get(accord.lot) : undefined }
      })
  : []

const r = verifierDonnees(base, accords, readFileSync('data/breweries.json', 'utf8'))
if (!r.ok) sortir(`Garde de data/ : refusé.\n${r.erreurs.join('\n')}`, 1)
sortir(`Garde de data/ : conforme (fichier du 15/10 et ${String(accords.length)} accord(s) de Cédric).`, 0)
