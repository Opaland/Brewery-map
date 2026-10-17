import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { DONNEES, NOUVEAUTES } from '../../src/core/nouveautes'

/** S44 — « Quoi de neuf ? » ne ment pas sur les fiches. */
describe('quoi de neuf (S44)', () => {
  it('la phrase sur les fiches correspond au fichier : une fiche changée oblige à la réécrire', () => {
    const empreinte = createHash('sha256').update(readFileSync('data/breweries.json')).digest('hex').slice(0, 16)
    expect(empreinte, 'data/breweries.json a changé : mettre à jour DONNEES dans src/core/nouveautes.ts').toBe(
      DONNEES.empreinte,
    )
  })

  it('les nouveautés sont datées et rangées, les plus récentes d’abord', () => {
    expect(NOUVEAUTES.length).toBeGreaterThan(0)
    for (const n of NOUVEAUTES) expect(n.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    const dates = NOUVEAUTES.map((n) => n.date)
    expect([...dates].sort().reverse()).toEqual(dates)
  })
})
