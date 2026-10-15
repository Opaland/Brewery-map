import { describe, expect, it } from 'vitest'
import { hoteDeSource, libelleConfiance, libellePrecision, libelleVerification } from '../../src/core/fiche'

describe('libelleConfiance', () => {
  it('dit « élevée » pour « solide » (décision de Cédric, 15/10)', () => {
    expect(libelleConfiance('solide')).toBe('élevée')
    expect(libelleConfiance('moyenne')).toBe('moyenne')
    expect(libelleConfiance('faible')).toBe('faible')
  })

  it('ne dit rien de faux quand rien n’est évalué', () => {
    expect(libelleConfiance('')).toBe('non évaluée (aucune preuve retenue)')
  })
})

describe('libellePrecision', () => {
  it('avoue l’approximation communale', () => {
    expect(libellePrecision('commune')).toBe(
      'approximative : centre de la commune, à environ 2 km près',
    )
    expect(libellePrecision('address')).toBe('à l’adresse vérifiée')
  })
})

describe('hoteDeSource', () => {
  it('rend le site, sans « www. »', () => {
    expect(hoteDeSource('https://www.nomadebiere.fr/la-taproom/')).toBe('nomadebiere.fr')
    expect(hoteDeSource('https://brasseriedulion.com/pages/le-bar-dulion')).toBe(
      'brasseriedulion.com',
    )
  })

  it('rend null sans source', () => {
    expect(hoteDeSource('')).toBeNull()
  })
})

describe('libelleVerification', () => {
  it('écrit une date ISO en français', () => {
    expect(libelleVerification('2026-10-15')).toBe('15 octobre 2026')
  })

  it('ne la remplace jamais par une date inventée', () => {
    expect(libelleVerification(undefined)).toBe('non renseignée')
  })
})
