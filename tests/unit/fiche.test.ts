import { describe, expect, it } from 'vitest'
import { citeUnNumero, hoteDeSource, libelleConfiance, libellePrecision, libelleVerification } from '../../src/core/fiche'

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
  it('un point OpenStreetMap n’est pas une adresse vérifiée (revue code S14)', () => {
    expect(libellePrecision('osm')).toBe('point placé sur OpenStreetMap, non vérifié sur place')
  })

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

describe('citeUnNumero', () => {
  it('reconnaît les deux numéros cités dans le fichier, et rien d’autre', () => {
    expect(citeUnNumero('Horaires non publiés (tél. 04 75 85 47 19).')).toBe(true)
    expect(citeUnNumero('Contact : 06 95 10 82 98.')).toBe(true)
    expect(citeUnNumero('Ouvert depuis 2022, sam 15h-22h.')).toBe(false)
    expect(citeUnNumero('1932 route de Villefranche, 69480 Anse')).toBe(false)
  })
})
