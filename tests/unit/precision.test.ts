import { describe, expect, it } from 'vitest'
import { repartitionDesEcarts } from '../../src/core/precision'

describe('repartitionDesEcarts (S59)', () => {
  it('compte les écarts à chaque palier, bornes comprises', () => {
    expect(repartitionDesEcarts([0.2, 0.5, 1.4, 2, 7.9, 14.4], [0.5, 2, 10])).toEqual([
      { palier: 0.5, nombre: 2 },
      { palier: 2, nombre: 4 },
      { palier: 10, nombre: 5 },
    ])
  })

  it('ne compte pas un écart inconnu (commune sans centre trouvé)', () => {
    expect(repartitionDesEcarts([1, null, 3], [2])).toEqual([{ palier: 2, nombre: 1 }])
  })
})
