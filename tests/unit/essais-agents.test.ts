import { describe, expect, it } from 'vitest'
import { outilsEmployes, outilsInterdits, referencesFichiers, referencesIntrouvables, rubriquesManquantes } from '../../src/core/essais-agents'

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
