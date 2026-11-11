import type Anthropic from '@anthropic-ai/sdk'
import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { faitsDuMois, type FicheDuMois } from '../../src/core/mot-du-mois'
import { NOUVEAUTES } from '../../src/core/nouveautes'
import { BETA_REPLI, MODELE, rediger, type Creer } from '../../outils/mot-du-mois-redaction'
import { TSX_CLI } from '../../outils/tsx'

/** S380 : l'outil qui fait écrire le mot du mois, avec un faux client. */

const fiches = [
  { n: 'Pirates du Clain', c: 'Ligugé', d: '86', verifieLe: '2026-11-11' },
  { n: 'Brasserie Ancienne', c: 'Lyon', d: '69', verifieLe: '2026-10-21' },
]
const faits = faitsDuMois(fiches, [{ date: '2026-11-11', texte: '1 brasserie de plus dans la Vienne.' }], '2026-11')

const message = (texte: string, stop: Anthropic.Beta.BetaStopReason = 'end_turn') =>
  ({
    model: MODELE,
    stop_reason: stop,
    stop_details: stop === 'refusal' ? { type: 'refusal', category: 'cyber', explanation: null } : null,
    content: [{ type: 'text', text: texte, citations: null }],
    usage: { input_tokens: 1000, output_tokens: 200, cache_read_input_tokens: 0 },
  }) as unknown as Anthropic.Beta.BetaMessage

function fauxClient(...reponses: Anthropic.Beta.BetaMessage[]) {
  const appels: Anthropic.Beta.MessageCreateParamsNonStreaming[] = []
  const creer: Creer = (p) => {
    appels.push(structuredClone(p))
    const r = reponses.shift()
    if (!r) return Promise.reject(new Error('plus de réponse'))
    return Promise.resolve(r)
  }
  return { creer, appels }
}

describe('rediger (CA4, CA5, CA7)', () => {
  it('un texte sans écart est gardé, vérifié, en une requête', async () => {
    const { creer, appels } = fauxClient(message('Pirates du Clain rejoint la carte : 2 fiches en tout.'))
    const r = await rediger(creer, faits, fiches)
    expect(r.statut).toBe('ecrit')
    if (r.statut !== 'ecrit') return
    expect(r.verifie).toBe(true)
    expect(appels).toHaveLength(1)
  })

  it('CA4 : un écart déclenche une seule réécriture qui le cite', async () => {
    const { creer, appels } = fauxClient(
      message('Déjà 812 fiches, comme Brasserie Ancienne.'),
      message('Pirates du Clain rejoint la carte.'),
    )
    const r = await rediger(creer, faits, fiches)
    expect(appels).toHaveLength(2)
    const relance = JSON.stringify(appels[1]?.messages.at(-1))
    expect(relance).toContain('812')
    expect(relance).toContain('Brasserie Ancienne')
    expect(r.statut === 'ecrit' && r.verifie).toBe(true)
  })

  it('CA4 : un écart qui reste après la réécriture garde verifie: false, sans troisième requête', async () => {
    const { creer, appels } = fauxClient(message('Déjà 812 fiches.'), message('Toujours 812 fiches.'))
    const r = await rediger(creer, faits, fiches)
    expect(appels).toHaveLength(2)
    expect(r.statut).toBe('ecrit')
    if (r.statut !== 'ecrit') return
    expect(r.verifie).toBe(false)
    expect(r.ecartsRestants.nombres).toEqual(['812'])
  })

  it('CA5 : un refus ne rend aucun texte', async () => {
    const { creer } = fauxClient(message('', 'refusal'))
    const r = await rediger(creer, faits, fiches)
    expect(r).toMatchObject({ statut: 'refus', raison: 'cyber' })
  })

  it('CA7 : l’appel nomme le modèle, l’effort et le repli côté serveur ; l’usage et le coût sont comptés', async () => {
    const { creer, appels } = fauxClient(message('Pirates du Clain rejoint la carte.'))
    const r = await rediger(creer, faits, fiches)
    expect(appels[0]).toMatchObject({
      model: 'claude-opus-5-5',
      betas: [BETA_REPLI],
      fallbacks: 'default',
      output_config: { effort: 'medium' },
    })
    expect(r.usage).toEqual({ requetes: 1, jetonsEntree: 1000, jetonsSortie: 200, jetonsCacheLus: 0, coutUsd: 0.008 })
  })
})

describe('le lancement (CA6)', () => {
  it('sans clé, l’outil s’arrête sans erreur et dit où l’ajouter', () => {
    const env = { ...process.env }
    delete env.ANTHROPIC_API_KEY
    const sortie = execFileSync(process.execPath, [TSX_CLI, 'outils/mot-du-mois.ts', '2026-11'], {
      encoding: 'utf8',
      env,
    })
    expect(sortie).toContain('Pas de clé ANTHROPIC_API_KEY')
    expect(sortie).toContain('Secrets and variables')
  }, 30_000)

  it('--valider refuse un chemin hors de curation/ia', () => {
    let code = 0
    try {
      execFileSync(process.execPath, [TSX_CLI, 'outils/mot-du-mois.ts', '--valider', 'data/breweries.json'], {
        encoding: 'utf8',
        stdio: 'pipe',
      })
    } catch (e) {
      code = (e as { status: number }).status
    }
    expect(code).toBe(1)
  }, 30_000)
  it('--valider recalcule les faits et refuse un « verifie: true » que le texte dément', () => {
    const dossier = mkdtempSync(join(tmpdir(), 'mot-du-mois-'))
    try {
      mkdirSync(join(dossier, 'data'))
      mkdirSync(join(dossier, 'curation', 'ia'), { recursive: true })
      copyFileSync('data/breweries.json', join(dossier, 'data', 'breweries.json'))
      const vraies = JSON.parse(readFileSync('data/breweries.json', 'utf8')) as FicheDuMois[]
      const fichier = (texte: string, verifie: boolean) => ({
        mois: '2026-11',
        genereLe: '2026-11-11T08:00:00.000Z',
        modele: 'claude-opus-5-5',
        redigePar: 'IA (Claude), relu par Cédric avant toute publication',
        texte,
        verifie,
        ecartsRestants: { nombres: [], noms: [] },
        faits: faitsDuMois(vraies, NOUVEAUTES, '2026-11'),
        usage: { requetes: 1, jetonsEntree: 1, jetonsSortie: 1, jetonsCacheLus: 0, coutUsd: 0 },
      })
      const valider = (contenu: object) => {
        writeFileSync(join(dossier, 'curation/ia/mot-du-mois-2026-11.json'), JSON.stringify(contenu))
        try {
          execFileSync(process.execPath, [TSX_CLI, resolve('outils/mot-du-mois.ts'), '--valider', 'curation/ia/mot-du-mois-2026-11.json'], {
            cwd: dossier,
            encoding: 'utf8',
            stdio: 'pipe',
          })
          return 0
        } catch (e) {
          return (e as { status: number }).status
        }
      }
      expect(valider(fichier('Un mois de plus sur la carte.', true))).toBe(0)
      expect(valider(fichier('Déjà 99999 brasseries !', true))).toBe(1)
      expect(valider(fichier('Déjà 99999 brasseries !', false))).toBe(0)
    } finally {
      rmSync(dossier, { recursive: true, force: true })
    }
    // Trois lancements de tsx : jusqu'à 3 s chacun quand la machine est chargée.
  }, 60_000)
})
