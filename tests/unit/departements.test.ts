import { describe, expect, it } from 'vitest'
import { libelleDepartement } from '../../src/core/departements'

describe('libellé d’un département (S27)', () => {
  it('code et nom, Corse comprise ; le code seul s’il est inconnu', () => {
    expect(libelleDepartement('73')).toBe('73 · Savoie')
    expect(libelleDepartement('2A')).toBe('2A · Corse-du-Sud')
    expect(libelleDepartement('99')).toBe('99')
  })
})
