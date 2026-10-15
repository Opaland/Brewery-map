import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import type { Brasserie } from '../../src/core/schema'
import { Horaires } from '../../src/Horaires'
import { LIGNES_REELLES } from './lignes-reelles'

/** Aucune ligne de `data/` n'a d'horaires structurés : l'exemple vit ici. */
const base = LIGNES_REELLES[0] as unknown as Brasserie
const rendu = (b: Brasserie) => renderToStaticMarkup(createElement(Horaires, { brasserie: b }))

describe('les horaires de la fiche', () => {
  it('sans horaires structurés : renvoie à la source, n’invente rien', () => {
    const html = rendu(base)
    expect(html).toContain('pas d’horaires vérifiés jour par jour')
    expect(html).not.toContain('<table')
  })

  it('avec horaires : les sept jours, fermé et non précisé distingués, source datée', () => {
    const html = rendu({
      ...base,
      horaires: {
        nature: 'accueil',
        sam: [['15:00', '22:00']],
        dim: [],
        source: 'https://www.montsdulyonnaistourisme.fr/x',
        verifieLe: '2026-10-15',
      },
    })
    expect(html).toContain('Horaires d’accueil du public')
    expect(html).toContain('<th scope="row">Samedi</th><td>15 h – 22 h</td>')
    expect(html).toContain('<th scope="row">Dimanche</th><td>fermé</td>')
    expect(html).toContain('<th scope="row">Lundi</th><td>non précisé</td>')
    expect(html).toContain('Lus le 15 octobre 2026 sur')
    expect(html).toContain('rel="noopener noreferrer"')
  })
})
