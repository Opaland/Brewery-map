import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import type { Brasserie } from '../../src/core/schema'
import { Horaires } from '../../src/Horaires'
import { LIGNES_REELLES } from './lignes-reelles'

/** Aucune ligne de `data/` n'a d'horaires structurés : l'exemple vit ici. */
const base = LIGNES_REELLES[0] as unknown as Brasserie
const rendu = (b: Brasserie) => renderToStaticMarkup(createElement(Horaires, { brasserie: b }))
const src = { source: 'https://www.montsdulyonnaistourisme.fr/x', verifieLe: '2026-10-15' }

describe('les horaires de la fiche', () => {
  it('sans horaires structurés : renvoie à la justification, n’invente rien', () => {
    const html = rendu(base)
    expect(html).toContain('aucun horaire vérifié jour par jour')
    expect(html).toContain('« Ce que dit la source »')
    expect(html).not.toContain('<table')
  })

  it('un bloc par nature, fermé / non précisé / sans heures distingués', () => {
    const html = rendu({
      ...base,
      horaires: [
        { nature: 'accueil', sam: [['15:00', '22:00']], dim: [], mar: 'heures-non-precisees', ...src },
        { nature: 'vente', lun: [['08:00', '18:00']], ...src },
      ],
    })
    expect(html).toContain('<caption>Horaires d’accueil du public</caption>')
    expect(html).toContain('<caption>Horaires de vente</caption>')
    expect(html).toContain('<th scope="row">Samedi</th><td>15 h – 22 h</td>')
    expect(html).toContain('<th scope="row">Dimanche</th><td>fermé</td>')
    expect(html).toContain('<th scope="row">Mardi</th><td>ouvert, heures non précisées</td>')
    expect(html).toContain('<th scope="row">Lundi</th><td>non précisé</td>')
    expect(html).toContain('Lus le 15 octobre 2026 sur')
  })

  it('la remarque passe avant le tableau', () => {
    const html = rendu({
      ...base,
      horaires: [{ nature: 'accueil', sam: [['14:00', '18:30']], remarque: 'Fermée d’octobre à mai.', ...src }],
    })
    expect(html.indexOf('À savoir :')).toBeGreaterThan(-1)
    expect(html.indexOf('À savoir :')).toBeLessThan(html.indexOf('<table'))
  })
})
