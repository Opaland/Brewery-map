import { describe, expect, it } from 'vitest'
import { BRIGNAIS, distanceKm, formaterDistance } from '../../src/core/distance'

describe('distanceKm (grand cercle, rayon terrestre moyen)', () => {
  it('vaut zéro sur place', () => {
    expect(distanceKm(BRIGNAIS, BRIGNAIS)).toBe(0)
  })

  it('rend la distance Brignais → place Bellecour', () => {
    // Bellecour : 45.7578, 4.8320. Référence calculée à part, en Python
    // (haversine, R = 6371 km) le 15/10 : 11,045 km.
    expect(distanceKm(BRIGNAIS, { lat: 45.7578, lon: 4.832 })).toBeCloseTo(11.045, 2)
  })

  it('est symétrique', () => {
    const a = { lat: 45.9367, lon: 4.7208 }
    expect(distanceKm(BRIGNAIS, a)).toBe(distanceKm(a, BRIGNAIS))
  })

  it('tient compte de la longitude réduite avec la latitude', () => {
    // Un degré de longitude à 45° vaut cos(45°) fois un degré de latitude.
    const nord = distanceKm({ lat: 45, lon: 4 }, { lat: 46, lon: 4 })
    const est = distanceKm({ lat: 45, lon: 4 }, { lat: 45, lon: 5 })
    expect(est / nord).toBeCloseTo(Math.cos(Math.PI / 4), 2)
  })
})

describe('formaterDistance', () => {
  it('arrondit au kilomètre et dit que c’est approché', () => {
    expect(formaterDistance(5.339)).toBe('≈ 5 km')
    expect(formaterDistance(11.6)).toBe('≈ 12 km')
    expect(formaterDistance(0.4)).toBe('moins de 1 km')
  })
})
