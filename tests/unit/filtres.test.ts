import { describe, expect, it } from 'vitest'
import { ORDRE_CATEGORIES } from '../../src/core/categories'
import { filtresActifs, resumeDesFiltres } from '../../src/core/filtres'

/** S29 : les filtres repliés sur téléphone disent ce qu'ils cachent. */
describe('filtres repliés (S29)', () => {
  const aucun = { categories: [...ORDRE_CATEGORIES], favorisSeulement: false, sansOsm: false }

  it('rien d’actif par défaut', () => {
    expect(filtresActifs(aucun)).toEqual([])
    expect(resumeDesFiltres(aucun, 0)).toBe('Plus de filtres et mes favoris')
  })

  it('chaque filtre réglé se nomme', () => {
    expect(
      filtresActifs({
        departement: '73',
        categories: [1],
        type: 'ipa',
        favorisSeulement: true,
        sansOsm: true,
      }),
    ).toEqual(['département', 'ce qu’on peut y faire', 'type de bière', 'seulement mes favoris', 'sans OpenStreetMap'])
  })

  it('S70 : « ouvertes ce week-end » se nomme', () => {
    expect(filtresActifs({ ...aucun, ceWeekEnd: true })).toEqual(['ouvertes ce week-end'])
  })

  it('le résumé compte les filtres actifs et les favoris', () => {
    expect(resumeDesFiltres({ ...aucun, departement: '73' }, 0)).toBe('Plus de filtres et mes favoris · 1 filtre actif')
    expect(resumeDesFiltres({ ...aucun, departement: '73', favorisSeulement: true }, 3)).toBe(
      'Plus de filtres et mes favoris · 2 filtres actifs · 3 favoris',
    )
    expect(resumeDesFiltres(aucun, 1)).toBe('Plus de filtres et mes favoris · 1 favori')
  })

  it('l’ordre des catégories cochées ne compte pas', () => {
    expect(filtresActifs({ ...aucun, categories: [...ORDRE_CATEGORIES].reverse() })).toEqual([])
  })
})

describe('pas encore visitées (S35)', () => {
  it('se nomme parmi les filtres actifs', () => {
    expect(
      filtresActifs({ categories: [...ORDRE_CATEGORIES], favorisSeulement: false, sansOsm: false, pasVisitees: true }),
    ).toEqual(['pas encore visitées'])
  })
})

describe('seulement mon carnet (S350)', () => {
  it('se nomme parmi les filtres actifs', () => {
    expect(
      filtresActifs({ categories: [...ORDRE_CATEGORIES], favorisSeulement: false, sansOsm: false, carnetSeulement: true }),
    ).toEqual(['seulement mon carnet'])
  })
})
