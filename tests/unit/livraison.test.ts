import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

/**
 * S279 : la liste à dérouler sur un vrai téléphone (`docs/LIVRAISON.md`).
 * Chaque geste dit ce qu'on doit voir, pourquoi l'émulation ne le prouve
 * pas, et le code concerné — un fichier qui existe encore.
 */
const lignes = readFileSync('docs/LIVRAISON.md', 'utf8')
  .split('\n')
  .filter((l) => /^\| *\d+ *\|/.test(l))
  .map((l) => l.split('|').slice(1, -1).map((c) => c.trim()))

describe('docs/LIVRAISON.md', () => {
  it('liste des gestes', () => {
    expect(lignes.length).toBeGreaterThanOrEqual(10)
  })

  it('chaque geste a ses cinq cases remplies (numéro, geste, attendu, pourquoi, code)', () => {
    expect(lignes.filter((cases) => cases.length !== 5 || cases.some((c) => c === ''))).toEqual([])
  })

  it('chaque geste cite au moins un fichier, et chaque fichier cité existe', () => {
    const parLigne = lignes.map((cases) => [...(cases[4] ?? '').matchAll(/`([\w./-]+\.\w+)`/g)].map((m) => m[1]))
    expect(parLigne.filter((chemins) => chemins.length === 0)).toEqual([])
    expect(parLigne.flat().filter((c) => !existsSync(c))).toEqual([])
  })
})
