import { describe, expect, it } from 'vitest'
import { empriseDesPoints } from '../../src/core/emprise'

describe('empriseDesPoints (S24 : cadrer la carte sur les résultats d’un nom)', () => {
  it('aucun point : rien à cadrer', () => {
    expect(empriseDesPoints([])).toBeUndefined()
  })

  it('contient chaque point, avec une marge', () => {
    const e = empriseDesPoints([
      { lat: 45.76, lon: 4.83 },
      { lat: 45.67, lon: 4.75 },
    ])
    if (e === undefined) throw new Error('emprise attendue')
    const [[ouest, sud], [est, nord]] = e
    expect(ouest).toBeLessThan(4.75)
    expect(est).toBeGreaterThan(4.83)
    expect(sud).toBeLessThan(45.67)
    expect(nord).toBeGreaterThan(45.76)
  })

  it('un seul point : un cadre de quelques kilomètres, pas un point', () => {
    const e = empriseDesPoints([{ lat: 45.76, lon: 4.83 }])
    if (e === undefined) throw new Error('emprise attendue')
    const [[ouest, sud], [est, nord]] = e
    // 2 km de marge de chaque côté : environ 0,036° de latitude au total.
    expect(nord - sud).toBeCloseTo(4 / 111.32, 3)
    expect(est - ouest).toBeGreaterThan(0)
  })
})
