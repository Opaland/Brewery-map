import { describe, expect, it } from 'vitest'
import { LEXIQUE, motsExpliques } from '../../src/core/lexique'

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
