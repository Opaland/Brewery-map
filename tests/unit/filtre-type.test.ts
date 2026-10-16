import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { TYPES_BIERE, type TypeDeBiere } from '../../src/core/bieres'
import { FiltreType } from '../../src/FiltreType'

/**
 * Le filtre rempli n'existe pas encore dans les données réelles (aucune
 * bière) : son rendu est prouvé ici, avec des nombres de test (revue code S5).
 */
const rendu = (n: [TypeDeBiere, number][]) =>
  renderToStaticMarkup(
    createElement(FiltreType, {
      nbParType: new Map(n),
      nbRenseignees: 4,
      nbFiches: 166,
      valeur: undefined,
      onChange: () => undefined,
    }),
  )

describe('le filtre par type', () => {
  it('vide : il le dit, sans menu', () => {
    const html = rendu([])
    expect(html).toContain('aucune brasserie n’a encore ses types référencés')
    expect(html).not.toContain('<select')
  })

  it('rempli : seulement les types présents, comptés en fiches renseignées (revue métier S16)', () => {
    const html = rendu([
      ['ipa', 3],
      ['stout', 1],
      ['blonde', 0],
    ])
    expect(html).toMatch(/<option value=""[^>]*>Tous les types<\/option>/)
    expect(html).toContain('IPA — très houblonnée, souvent amère (3 fiches renseignées)')
    expect(html).toContain('Stout — noire, café et chocolat (1 fiche renseignée)')
    expect(html).not.toContain('value="blonde"')
    expect(html).toContain('Bières renseignées sur 4 fiches sur 166')
    expect(html).not.toContain('au total')
  })
})

describe('les explications affichées', () => {
  it('sont relues ici, mot pour mot (revue métier S5)', () => {
    expect(Object.fromEntries(TYPES_BIERE.map((t) => [t.type, t.explication]))).toEqual({
      blonde: 'claire et légère',
      lager: 'blonde nette et désaltérante',
      blanche: 'au blé, souvent trouble et rafraîchissante',
      ipa: 'très houblonnée, souvent amère',
      ambree: 'cuivrée, notes de caramel',
      brune: 'foncée, notes torréfiées',
      stout: 'noire, café et chocolat',
      sour: 'acidulée, souvent fruitée',
      'sans-alcool': 'pas ou très peu d’alcool',
      autre: 'un style précisé sur la fiche',
    })
  })
})
