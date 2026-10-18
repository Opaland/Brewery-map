import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

/**
 * S284 : les agents qui relisent (revue adverse, promesses, persona) ne
 * modifient rien : leur liste d'outils ne contient ni `Edit` ni `Write`.
 * Seul `verificateur-de-tests` retire un correctif pour voir un test
 * échouer : c'est son métier, et il le remet.
 */
const RELECTEURS = ['relecteur-adverse', 'relecteur-de-persona', 'relecteur-de-promesses']

const outils = (nom: string) => {
  const texte = readFileSync(`.claude/agents/${nom}.md`, 'utf8')
  const ligne = /^tools:\s*(.+)$/m.exec(texte)?.[1] ?? ''
  return ligne.split(',').map((o) => o.trim())
}

describe('les agents de relecture', () => {
  it('existent', () => {
    const presents = readdirSync('.claude/agents').map((f) => f.replace(/\.md$/, ''))
    expect(RELECTEURS.filter((r) => !presents.includes(r))).toEqual([])
  })

  it.each(RELECTEURS)('%s ne peut rien modifier', (nom) => {
    const liste = outils(nom)
    expect(liste.length).toBeGreaterThan(0)
    expect(liste.filter((o) => ['Edit', 'Write', 'NotebookEdit', 'MultiEdit'].includes(o))).toEqual([])
  })
})
