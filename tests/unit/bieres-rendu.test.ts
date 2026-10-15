import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Bieres } from '../../src/Bieres'
import type { Brasserie } from '../../src/core/schema'
import { LIGNES_REELLES } from './lignes-reelles'

/** Aucune ligne de `data/` n'a encore de bière : l'exemple vit dans le test. */
const base = LIGNES_REELLES[0] as unknown as Brasserie
const rendu = (b: Brasserie) => renderToStaticMarkup(createElement(Bieres, { brasserie: b }))

describe('les bières de la fiche', () => {
  it('sans bière : « non référencés », aucun lien', () => {
    const html = rendu(base)
    expect(html).toContain('Types de bière : non référencés pour l’instant.')
    expect(html).not.toContain('href')
  })

  it('page produit, fiche d’annuaire, ou « non référencé » — dans cet ordre', () => {
    const html = rendu({
      ...base,
      directoryUrl: 'https://annuaire.example/caribrew',
      beers: [
        { type: 'ipa', url: 'https://caribrew.example/ipa' },
        { type: 'blonde' },
        { type: 'autre', libelle: 'Saison' },
      ],
    })
    expect(html).toContain('<a href="https://caribrew.example/ipa"')
    expect(html).toContain('>IPA</a>')
    expect(html).toContain('Blonde (page de la brasserie dans un annuaire, pas de cette bière)</a>')
    expect(html).toContain('Saison (page de la brasserie dans un annuaire, pas de cette bière)</a>')
    expect(html).toContain(' — très houblonnée, souvent amère')
  })

  it('sans annuaire, une bière sans page dit « non référencé »', () => {
    const html = rendu({ ...base, beers: [{ type: 'stout' }] })
    expect(html).toContain('Stout <span class="fiche-aide-inline">(non référencé)</span>')
    expect(html).not.toContain('href')
  })
})
