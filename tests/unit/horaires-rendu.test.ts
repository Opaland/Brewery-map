import { createElement, Fragment } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import type { Brasserie } from '../../src/core/schema'
import { EnBref } from '../../src/EnBref'
import { Horaires } from '../../src/Horaires'
import { LIGNES_REELLES } from './lignes-reelles'

/** Aucune ligne de `data/` n'a d'horaires structurés : l'exemple vit ici. */
const base = LIGNES_REELLES[0] as unknown as Brasserie
const rendu = (b: Brasserie) => renderToStaticMarkup(createElement(Horaires, { brasserie: b }))
const src = { source: 'https://www.montsdulyonnaistourisme.fr/x', verifieLe: '2026-10-15' }
/**
 * La fiche telle qu'on la voit : « En bref » puis le tableau. Depuis S312,
 * l'état du moment de la nature en tête est dit par « En bref » seulement.
 */
const vue = (b: Brasserie, maintenant: Date) =>
  renderToStaticMarkup(
    createElement(Fragment, null, createElement(EnBref, { brasserie: b, maintenant }), createElement(Horaires, { brasserie: b, maintenant })),
  ).replace(/<[^>]+>/g, '')

describe('les horaires de la fiche', () => {
  it('sans horaires structurés : rien, ni tableau ni phrase (dit en tête de fiche, S308)', () => {
    expect(rendu(base)).toBe('')
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
    // D'où et quand : dans la provenance de la fiche (S312).
    expect(html).not.toContain('Lus le')
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

describe('« Maintenant » (S19, Hugo)', () => {
  // Samedi 17/10/2026, 18 h à Paris.
  const samedi18h = new Date('2026-10-17T16:00:00Z')
  // Le texte lu, sans les balises (le début est en gras).
  const renduA = vue
  const accueil = { nature: 'accueil' as const, sam: [['15:00', '22:00'] as [string, string]], dim: [], ...src }

  it('dit ouvert et jusqu’à quand, d’après les horaires publiés', () => {
    const html = renduA({ ...base, horaires: [accueil] }, samedi18h)
    expect(html).toContain('À 18 h (heure de Paris), accueil du public : ouvert jusqu’à 22 h, d’après les horaires publiés.')
  })

  it('fermé un jour sans créneau ; rien d’affirmé un jour que la source ne dit pas', () => {
    expect(renduA({ ...base, horaires: [accueil] }, new Date('2026-10-18T12:00:00Z'))).toContain(
      'À 14 h (heure de Paris), accueil du public : fermé, d’après les horaires publiés.',
    )
    expect(renduA({ ...base, horaires: [accueil] }, new Date('2026-10-19T12:00:00Z'))).toContain(
      'À 14 h (heure de Paris), accueil du public : la source ne dit pas les heures de ce jour.',
    )
  })

  it('sous réserve quand une remarque nuance les créneaux', () => {
    const html = renduA({ ...base, horaires: [{ ...accueil, remarque: 'En juillet et août seulement' }] }, samedi18h)
    expect(html).toContain(
      'À 18 h (heure de Paris), accueil du public : ouvert jusqu’à 22 h selon les créneaux, sous réserve de la remarque ci-dessous.',
    )
  })

  it('sans horaires, aucun état affirmé', () => {
    expect(renduA(base, samedi18h)).not.toContain('heure de Paris')
  })

  it('S312 CA4 : l’état du moment est dit une fois par nature, l’accueil en tête', () => {
    const fois = (texte: string) => texte.split('heure de Paris').length - 1
    expect(fois(renduA({ ...base, horaires: [accueil] }, samedi18h))).toBe(1)
    const vente = { nature: 'vente' as const, sam: [['09:00', '12:00'] as [string, string]], ...src }
    const deux = renduA({ ...base, horaires: [vente, accueil] }, samedi18h)
    expect(fois(deux)).toBe(2)
    expect(deux.indexOf('accueil du public : ouvert')).toBeLessThan(deux.indexOf('vente : fermé'))
  })
})

describe('les horaires d’une saison à l’écran (S299)', () => {
  const ete = { nature: 'accueil' as const, sam: [['15:00', '22:00']] as [string, string][], periode: { du: '07-01', au: '08-31' }, ...src }
  it('CA5 : la période dans le titre du tableau ; hors période, la fiche le dit', () => {
    const html = renderToStaticMarkup(
      createElement(Horaires, { brasserie: { ...base, horaires: [ete] }, maintenant: new Date('2026-10-17T16:00:00Z') }),
    ) + vue({ ...base, horaires: [ete] }, new Date('2026-10-17T16:00:00Z'))
    expect(html).toContain('<caption>Horaires d’accueil du public, du 1er juillet au 31 août</caption>')
    expect(html).toContain('la source ne publie pas d’horaires pour cette période de l’année')
    expect(html).not.toContain('fermé, d’après les horaires publiés')
  })
})

describe('S91 CA4 : un jour férié, la fiche le dit', () => {
  // Samedi 15 août 2026, 18 h à Paris.
  const quinzeAout = new Date('2026-08-15T16:00:00Z')
  const accueil = { nature: 'accueil' as const, sam: [['15:00', '22:00'] as [string, string]], dim: [], ...src }

  it('dans le tableau et dans « En bref », sans parler d’une remarque absente', () => {
    const b = { ...base, horaires: [accueil] }
    const fiche = vue(b, quinzeAout)
    expect(fiche).toContain(
      'accueil du public : ouvert jusqu’à 22 h selon les créneaux, mais c’est un jour férié (15 août) : la source ne dit pas si ses horaires valent ce jour-là.',
    )
    expect(fiche).not.toContain('remarque ci-dessous')
  })

  it('avec une remarque, les deux sont dites', () => {
    const b = { ...base, horaires: [{ ...accueil, remarque: 'Sur réservation.' }] }
    expect(vue(b, quinzeAout)).toContain('jour férié (15 août) : la source ne dit pas si ses horaires valent ce jour-là. Voyez aussi la remarque ci-dessous.')
  })

  it('revue adverse : un créneau commencé la veille lit la remarque de son bloc, pas celle du jour', () => {
    // Jeudi 12 novembre 2026, 1 h à Paris : le créneau a commencé le 11, férié.
    const nuit = new Date('2026-11-12T00:00:00Z')
    const automne = { nature: 'accueil' as const, mer: [['20:00', '02:00'] as [string, string]], periode: { du: '10-01', au: '11-11' }, ...src }
    const hiver = { nature: 'accueil' as const, jeu: [['10:00', '18:00'] as [string, string]], periode: { du: '11-12', au: '09-30' }, ...src }
    const rendre = (blocs: Brasserie['horaires']) => vue({ ...base, horaires: blocs }, nuit)
    expect(rendre([{ ...automne, remarque: 'Sur réservation.' }, hiver])).toContain('Voyez aussi la remarque ci-dessous.')
    expect(rendre([automne, { ...hiver, remarque: 'Autre saison.' }])).not.toContain('Voyez aussi la remarque')
  })
})

