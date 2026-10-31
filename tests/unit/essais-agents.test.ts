import { describe, expect, it } from 'vitest'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { etatDuDepot } from '../../outils/etat-depot'
import {
  argumentShell,
  coutAtteint,
  ecartsDuDepot,
  outilsEmployes,
  outilsInterdits,
  referencesFichiers,
  referencesIntrouvables,
  rubriquesManquantes,
} from '../../src/core/essais-agents'

/** S354 (E37, repris de `scripts/essais_agents.py` d'ISTQBFinder) : les contrôles des essais, sans lancer `claude`. */
describe('les contrôles des essais d’agents', () => {
  it('trouve les rubriques manquantes, en gras ou en titre', () => {
    const reponse = '**Bloquant** : rien.\n\n## Gênant\n- un texte\n'
    expect(rubriquesManquantes(reponse, ['Bloquant', 'Gênant', 'Hypothèses'])).toEqual(['Hypothèses'])
    // Le mot seul, au fil d'une phrase, ne vaut pas rubrique.
    expect(rubriquesManquantes('Rien de bloquant ici.', ['Bloquant'])).toEqual(['Bloquant'])
  })

  it('lit les outils employés dans le transcript, et les interdits', () => {
    const transcript = [
      { message: { content: [{ type: 'tool_use', name: 'Read', input: { file_path: 'a' } }] } },
      { message: { content: 'texte' } },
      { message: { content: [{ type: 'tool_use', name: 'Edit', input: {} }, { type: 'tool_result', content: 'ok' }] } },
      { autre: true },
    ]
    expect(outilsEmployes(transcript)).toEqual(['Read', 'Edit'])
    expect(outilsInterdits(transcript, ['Write', 'Edit'])).toEqual(['Edit'])
  })

  it('relève les références « fichier:ligne » d’une réponse', () => {
    const reponse = 'Voir `src/core/horaires.ts:127` et src/App.tsx:42, puis tests/e2e/carnet.spec.ts (sans ligne) ; https://example.org:443 ne compte pas.'
    expect(referencesFichiers(reponse)).toEqual([
      { chemin: 'src/core/horaires.ts', ligne: 127 },
      { chemin: 'src/App.tsx', ligne: 42 },
    ])
  })

  it('dit les références qui n’existent pas : fichier absent, ou ligne au-delà de la fin', () => {
    const fichiers: Record<string, string> = { 'a.ts': 'un\ndeux\ntrois\n' }
    const lire = (c: string) => fichiers[c]
    expect(
      referencesIntrouvables(
        [
          { chemin: 'a.ts', ligne: 3 },
          { chemin: 'a.ts', ligne: 9 },
          { chemin: 'b.ts', ligne: 1 },
        ],
        lire,
      ),
    ).toEqual(['a.ts:9', 'b.ts:1'])
  })
})

describe('ce qu’un essai a changé dans le dépôt (S375, #216)', () => {
  it('rien de changé, rien à dire', () => {
    expect(ecartsDuDepot(' M a.ts\n', ' M a.ts\n')).toEqual([])
  })

  it('nomme les lignes apparues et disparues, ignore les fins de ligne', () => {
    expect(ecartsDuDepot(' M a.ts\r\n?? b.ts\n', ' M a.ts\n M c.ts\n')).toEqual(['?? b.ts', ' M c.ts'])
  })
})

describe('le plafond de coût de la campagne (S375)', () => {
  it('s’arrête dès que le cumul atteint le plafond', () => {
    expect(coutAtteint([0.5, 0.99], 1.5)).toBe(false)
    expect(coutAtteint([0.5, 1], 1.5)).toBe(true)
  })
})

describe('l’état du dépôt, qui voit une écriture (revue de S375 : `git status` seul ne la voyait pas)', () => {
  function depot() {
    const d = mkdtempSync(join(tmpdir(), 'etat-depot-'))
    const git = (...a: string[]) => execFileSync('git', ['-c', 'user.name=t', '-c', 'user.email=t@t', ...a], { cwd: d })
    git('init', '-q')
    writeFileSync(join(d, 'a.txt'), 'un\n')
    git('add', '.')
    git('commit', '-qm', 'x')
    return d
  }

  it('voit un fichier déjà modifié qu’on modifie encore', () => {
    const d = depot()
    writeFileSync(join(d, 'a.txt'), 'deux\n')
    const avant = etatDuDepot(d)
    writeFileSync(join(d, 'a.txt'), 'trois\n')
    expect(ecartsDuDepot(avant, etatDuDepot(d))).not.toEqual([])
  })

  it('voit un fichier non suivi qu’on réécrit, et rien quand rien ne change', () => {
    const d = depot()
    writeFileSync(join(d, 'b.txt'), 'un\n')
    const avant = etatDuDepot(d)
    expect(ecartsDuDepot(avant, etatDuDepot(d))).toEqual([])
    writeFileSync(join(d, 'b.txt'), 'deux\n')
    expect(ecartsDuDepot(avant, etatDuDepot(d))).not.toEqual([])
  })
})

// Première campagne du 31/10 : sous Windows, `shell: true` coupait les arguments aux espaces.
describe('un argument passé par le shell de Windows', () => {
  it('reste entier sous Windows, intact ailleurs', () => {
    expect(argumentShell('Bash(git log *)', 'win32')).toBe('"Bash(git log *)"')
    expect(argumentShell('Bash(git log *)', 'linux')).toBe('Bash(git log *)')
  })
})
