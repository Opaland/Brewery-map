import { describe, expect, it } from 'vitest'
import { LEXIQUE, LEXIQUE_BIERES, motsDesBieres, motsExpliques } from '../../src/core/lexique'

/** S295, Marie : les notes emploient des mots du métier sans les expliquer. */
describe('motsExpliques', () => {
  it('trouve les mots du métier d’une note, une fois chacun, dans l’ordre du texte', () => {
    expect(motsExpliques('Taproom ouvert le samedi ; vente directe et taproom en été.').map((m) => m.mot)).toEqual(['taproom', 'vente directe'])
  })

  it('reconnaît les variantes d’écriture', () => {
    expect(motsExpliques('Une micro-brasserie').map((m) => m.mot)).toEqual(['microbrasserie'])
    expect(motsExpliques('microbrasserie artisanale').map((m) => m.mot)).toEqual(['microbrasserie'])
    expect(motsExpliques('Commande en click & collect').map((m) => m.mot)).toEqual(['click and collect'])
    expect(motsExpliques('BREWPUB jeu-ven').map((m) => m.mot)).toEqual(['brewpub'])
  })

  it('ne prend pas un mot dans un autre', () => {
    // « affût » n'est pas un fût.
    expect(motsExpliques('à l’affût des nouveautés')).toEqual([])
  })

  it('rien dans une note sans mot du métier', () => {
    expect(motsExpliques('Vente sur place le samedi matin.')).toEqual([])
  })

  it('chaque mot a un sens en langue courante', () => {
    for (const m of LEXIQUE) expect(m.sens.length).toBeGreaterThan(10)
  })
})

// S316 : les libellés des bières emploient aussi des mots du métier.
describe('motsDesBieres', () => {
  it('CA1 : trouve chaque style une fois, dans l’ordre des bières', () => {
    const libelles = ['L’Ébariole (tourbée)', 'Croix perdue (Bière triple)', 'Sulfureuse (Belgian Tripel)', 'Combe Noire (porter)']
    expect(motsDesBieres(libelles).map((m) => m.mot)).toEqual(['tourbée', 'triple', 'porter'])
  })

  it('reconnaît les variantes : peated, weissbier, hefeweizen, pale ale', () => {
    expect(motsDesBieres(['Le p’tit Brùnaidh (Peated Scotch Ale)']).map((m) => m.mot)).toEqual(['tourbée', 'scotch ale'])
    // Fumée n'est pas tourbée (revue adverse S316).
    expect(motsDesBieres(['Blonde Fumée (fumée au bois de hêtre)']).map((m) => m.mot)).toEqual(['fumée'])
    expect(motsDesBieres(['Weissbier', 'La Hefeweizen']).map((m) => m.mot)).toEqual(['bière de blé allemande'])
    expect(motsDesBieres(['Globalement inoffensive (Pale Ale)']).map((m) => m.mot)).toEqual(['pale ale'])
  })

  it('ne prend pas un mot dans un autre, et rien sans style nommé', () => {
    // « Triplette » n'est pas une triple ; « Saisonnière » n'est pas une saison.
    expect(motsDesBieres(['La Triplette', 'Saisonnière'])).toEqual([])
    expect(motsDesBieres(['Blonde', 'Bananaslip'])).toEqual([])
  })

  it('chaque style a un sens en langue courante', () => {
    for (const m of LEXIQUE_BIERES) expect(m.sens.length).toBeGreaterThan(10)
  })
})
