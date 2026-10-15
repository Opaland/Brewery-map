import { describe, expect, it } from 'vitest'
import { BRIGNAIS } from '../../src/core/distance'
import { communesConnues, libelleOrigine, origineDeCommune } from '../../src/core/origine'
import type { Brasserie } from '../../src/core/schema'
import { LIGNES_REELLES } from './lignes-reelles'

const TOUTES = LIGNES_REELLES as unknown as Brasserie[]

describe('les communes de départ', () => {
  it('une par commune, triées, sans doublon', () => {
    const lot = [...TOUTES, { ...TOUTES[1], n: 'Autre à Lyon 1er' }]
    const c = communesConnues(lot)
    expect(c.map((x) => x.nom)).toEqual(['Lyon 1er', 'Oullins', 'Soucieu-en-Jarrest'])
  })

  it('la position d’une commune est la moyenne de ses brasseries — approchée, et dit comme tel', () => {
    const lot = [
      { ...TOUTES[1], lat: 45.0, lon: 4.0 },
      { ...TOUTES[2], lat: 45.2, lon: 4.2 },
    ]
    const o = origineDeCommune(communesConnues(lot)[0])
    expect(o.point.lat).toBeCloseTo(45.1, 6)
    expect(o.point.lon).toBeCloseTo(4.1, 6)
    expect(libelleOrigine(o)).toBe('Lyon 1er (centre approché)')
  })
})

describe('libelleOrigine', () => {
  it('nomme le point de départ', () => {
    expect(libelleOrigine({ type: 'brignais', point: BRIGNAIS })).toBe('Brignais')
    expect(libelleOrigine({ type: 'position', point: { lat: 45, lon: 4 } })).toBe('votre position')
  })
})
