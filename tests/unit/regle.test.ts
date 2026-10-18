import { describe, expect, it } from 'vitest'
import type { Lot } from '../../src/core/curation'
import { trierParRegle } from '../../src/core/regle'

const J1 = '2026-10-17'
const J2 = '2026-10-18'
const contact = (site: string, j: string, tel?: string) => ({ site, source: site, verifieLe: j, ...(tel === undefined ? {} : { tel }) })
const prop = (n: string, changements: Record<string, unknown>, sources: string[], verifieLe = J1) =>
  ({ n, changements, verifieLe, sources, extrait: 'lu' }) as unknown as Lot['propositions'][number]
const lot = (nom: string, propositions: Lot['propositions'], ajouts: unknown[] = []): { nom: string; lot: Lot } => ({
  nom,
  lot: { lot: nom, propositions, ...(ajouts.length > 0 ? { ajouts: ajouts as Lot['ajouts'] } : {}) },
})

describe('trierParRegle (S265, règle de Cédric du 18/10)', () => {
  it('accepte une proposition dont chaque source est le site officiel de la fiche', () => {
    const r = trierParRegle([lot('a', [prop('Brasserie X', { contact: contact('https://x.fr/', J1) }, ['https://x.fr/'])])])
    expect(r.acceptees).toEqual({ a: [1] })
    expect(r.aMontrer).toEqual([])
  })

  it('reconnaît le site officiel proposé par un autre lot (horaires, positions)', () => {
    const r = trierParRegle([
      lot('contacts', [prop('Brasserie X', { contact: contact('https://www.x.fr/', J1) }, ['https://www.x.fr/'])]),
      lot('horaires', [
        prop('Brasserie X', { horaires: [] }, ['https://x.fr/boutique', 'https://www.openstreetmap.org/node/1', 'https://data.geopf.fr/geocodage/search?q=x']),
      ]),
    ])
    expect(r.acceptees).toEqual({ contacts: [1], horaires: [1] })
  })

  it('montre, avec sa raison, ce qui repose sur une autre source, une confiance faible ou une fiche sans site officiel', () => {
    const r = trierParRegle([
      lot('b', [
        prop('Brasserie X', { contact: contact('https://x.fr/', J1) }, ['https://x.fr/', 'https://www.office-tourisme.fr/x']),
        prop('Brasserie Y', { cat: 1, conf: 'faible', contact: contact('https://y.fr/', J1) }, ['https://y.fr/']),
        prop('Brasserie Z', { beers: [] }, ['https://annuaire.fr/z']),
        prop('Brasserie W', { contact: { untappd: 'https://untappd.com/W', source: 'https://untappd.com/W', verifieLe: J1 } }, ['https://untappd.com/W']),
      ]),
    ])
    expect(r.acceptees).toEqual({})
    expect(r.aMontrer.map((m) => [m.numero, m.raison])).toEqual([
      [1, 'source hors du site officiel : office-tourisme.fr'],
      [2, 'confiance « faible »'],
      [3, 'aucun site officiel connu pour la fiche'],
      [4, 'aucun site officiel connu pour la fiche'],
    ])
  })

  it('garde la plus récente de deux propositions qui changent un même champ, et dit laquelle est écartée (Brasserie Stéphanoise)', () => {
    const r = trierParRegle([
      lot('s11', [prop('Brasserie Stéphanoise', { contact: contact('https://www.labrasseriestephanoise.com/', J1, '09 81 94 27 79') }, ['https://www.labrasseriestephanoise.com/'], J1)]),
      lot('s61', [prop('Brasserie Stéphanoise', { contact: contact('https://labrasseriestephanoise.com/', J2) }, ['https://labrasseriestephanoise.com/'], J2)]),
    ])
    expect(r.acceptees).toEqual({ s61: [1] })
    expect(r.aMontrer).toEqual([{ lot: 's11', numero: 1, n: 'Brasserie Stéphanoise', raison: 'concurrente de s61 n° 1 (contact), plus récente' }])
  })

  it('accepte toutes les fiches nouvelles des lots départementaux, et montre celles de la découverte OSM', () => {
    const fiche = { fiche: { n: 'Nouvelle' }, verifieLe: J1, sources: ['https://annuaire.fr/n'], extrait: 'lu' }
    const r = trierParRegle([lot('dep-29', [], [fiche, fiche]), lot('s14-decouverte', [], [fiche])])
    expect(r.acceptees).toEqual({ 'dep-29': [1, 2] })
    expect(r.aMontrer).toEqual([{ lot: 's14-decouverte', numero: 1, n: 'Nouvelle', raison: 'fiche nouvelle hors des lots départementaux : pas dans la règle' }])
  })

  it('montre une proposition dont aucune source n’est sur le site officiel, même si toutes sont neutres (revue adverse S265)', () => {
    const r = trierParRegle([
      lot('a', [
        prop('Brasserie X', { contact: contact('https://x.fr/', J1) }, ['https://x.fr/']),
        prop('Brasserie X', { lat: 45, lon: 4, coordPrecision: 'address' }, ['https://data.geopf.fr/geocodage/search?q=1+rue']),
      ]),
    ])
    expect(r.acceptees).toEqual({ a: [1] })
    expect(r.aMontrer.map((m) => [m.numero, m.raison])).toEqual([[2, 'aucune source sur le site officiel']])
  })

  it('ne prend pas un office de tourisme ou un annuaire proposé comme site pour le site officiel (revue adverse S265)', () => {
    const r = trierParRegle([
      lot('a', [prop('Brasserie X', { contact: contact('https://www.roannais-tourisme.com/x', J1) }, ['https://www.roannais-tourisme.com/x'])]),
    ])
    expect(r.acceptees).toEqual({})
    expect(r.aMontrer.map((m) => m.raison)).toEqual(['aucun site officiel connu pour la fiche'])
  })
})

