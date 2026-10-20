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
  it('sans bière : rien (dit en tête de fiche, avec la recherche Untappd, S308)', () => {
    expect(rendu(base)).toBe('')
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
    expect(html).toContain('>IPA<span class="lecteur-seul"> (nouvel onglet)</span></a>')
    expect(html).toContain('Blonde (page de la brasserie dans un annuaire, pas de cette bière)<span class="lecteur-seul"> (nouvel onglet)</span></a>')
    expect(html).toContain('Saison (page de la brasserie dans un annuaire, pas de cette bière)<span class="lecteur-seul"> (nouvel onglet)</span></a>')
    expect(html).toContain(' — très houblonnée, souvent amère')
  })

  it('sans annuaire, une bière sans page dit « non référencé »', () => {
    const html = rendu({ ...base, beers: [{ type: 'stout' }] })
    expect(html).toContain('Stout <span class="fiche-aide-inline">(non référencé)</span>')
    // Une piste pour la trouver ailleurs (S295, Karim).
    expect(html).toContain('Chercher ses bières sur Untappd')
    expect(html.match(/href=/g)).toHaveLength(1)
  })

  it('toutes à la même adresse : un seul lien, la page des bières de la brasserie (S295, Karim)', () => {
    const page = 'https://caribrew.example/nos-bieres'
    const html = rendu({ ...base, beers: [{ type: 'ipa', url: page }, { type: 'blonde', url: page }] })
    expect(html).toContain('La page des bières de la brasserie')
    expect(html.match(/href=/g)).toHaveLength(1)
  })

  it('une bière nommée montre aussi son type, sauf « autre » (revue métier S16, Karim)', () => {
    const html = rendu({
      ...base,
      beers: [
        { type: 'blonde', libelle: 'Cluny 4' },
        { type: 'autre', libelle: 'Baye (rouge)' },
      ],
    })
    expect(html).toContain(
      'Cluny 4 · Blonde <span class="fiche-aide-inline">(non référencé)</span>',
    )
    expect(html).toContain(' — claire et légère')
    expect(html).toContain('Baye (rouge) <span class="fiche-aide-inline">(non référencé)</span>')
    expect(html).not.toContain('Baye (rouge) · ')
  })
})
