import { describe, expect, it } from 'vitest'
import type { Lot } from '../../src/core/curation'
import { sansLesAppliquees, trierParRegle } from '../../src/core/regle'

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

  it('montre une proposition qui écrit un téléphone mobile : il peut être le numéro d’une personne (S266)', () => {
    const r = trierParRegle([
      lot('c', [
        prop('Brasserie X', { contact: contact('https://x.fr/', J1, '06 64 34 13 57') }, ['https://x.fr/']),
        prop('Brasserie Y', { contact: contact('https://y.fr/', J1, '+33 7 68 86 84 62') }, ['https://y.fr/']),
        prop('Brasserie Z', { contact: contact('https://z.fr/', J1, '04 78 33 84 95') }, ['https://z.fr/']),
      ]),
    ])
    expect(r.acceptees).toEqual({ c: [3] })
    expect(r.aMontrer.map((m) => [m.numero, m.raison])).toEqual([
      [1, 'téléphone mobile : peut être le numéro d’une personne'],
      [2, 'téléphone mobile : peut être le numéro d’une personne'],
    ])
  })

  it('accepte le centre IGN de la commune venu du géocodeur seul (Cédric, 18/10 : « Centre de commune IGN »), pas une adresse (S268)', () => {
    const mairie = 'https://data.geopf.fr/geocodage/search?q=Maizilly&type=municipality&limit=5'
    const position = (coordPrecision: string) => ({ lat: 46.1, lon: 4.2, coordPrecision })
    const r = trierParRegle([
      lot('centres', [
        prop('Brasserie X', position('centre'), [mairie, 'https://www.openstreetmap.org/node/1']),
        prop('Brasserie Y', position('centre'), [mairie, 'https://annuaire.fr/y']),
        prop('Brasserie Z', position('address'), ['https://data.geopf.fr/geocodage/search?q=1+rue+Exemple&limit=1']),
        prop('Brasserie W', position('centre'), ['https://data.geopf.fr/geocodage/search?q=1+rue+Exemple&limit=1']),
      ]),
    ])
    expect(r.acceptees).toEqual({ centres: [1] })
    expect(r.aMontrer.map((m) => [m.numero, m.raison])).toEqual([
      [2, 'aucun site officiel connu pour la fiche'],
      [3, 'aucun site officiel connu pour la fiche'],
      [4, 'aucun site officiel connu pour la fiche'],
    ])
  })

  it('un centre IGN n’emporte que la position : une catégorie ou une note dans la même proposition la fait montrer (revue adverse S268)', () => {
    const mairie = 'https://data.geopf.fr/geocodage/search?q=Brignais&type=municipality&limit=5'
    const r = trierParRegle([lot('c', [prop('Ninkasi Brignais', { lat: 45.67, lon: 4.75, coordPrecision: 'centre', cat: 3, note: 'x' }, [mairie])])])
    expect(r.acceptees).toEqual({})
    expect(r.aMontrer.map((m) => m.raison)).toEqual(['aucun site officiel connu pour la fiche'])
  })

  it('une adresse vérifiée l’emporte sur un centre IGN, même plus ancienne (revue adverse S268)', () => {
    const mairie = 'https://data.geopf.fr/geocodage/search?q=Brignais&type=municipality&limit=5'
    const adresse = 'https://data.geopf.fr/geocodage/search?q=1+rue+Exemple&limit=1'
    const r = trierParRegle(
      [
        lot('adresses', [prop('Brasserie X', { lat: 45.6, lon: 4.7, coordPrecision: 'address' }, ['https://x.fr/', adresse], J1)]),
        lot('centres', [prop('Brasserie X', { lat: 45.67, lon: 4.75, coordPrecision: 'centre' }, [mairie], J2)]),
      ],
      [{ n: 'Brasserie X', contact: { site: 'https://x.fr/', source: 'https://x.fr/', verifieLe: J1 } }],
    )
    expect(r.acceptees).toEqual({ adresses: [1] })
    expect(r.aMontrer).toEqual([{ lot: 'centres', numero: 1, n: 'Brasserie X', raison: 'concurrente de adresses n° 1 (position), plus précise' }])
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


describe('sansLesAppliquees (S272 : ce qu’un accord a fait entrer ne se décide plus)', () => {
  it('retire des deux listes les numéros d’un accord à la même empreinte, et les compte ; un accord à une autre empreinte ne compte pas', () => {
    const r = sansLesAppliquees(
      { a: [1, 2, 3], b: [1] },
      [
        { lot: 'a', numero: 4, n: 'X', raison: 'r' },
        { lot: 'b', numero: 2, n: 'Y', raison: 'r' },
      ],
      [
        { lot: 'a', empreinte: 'aaaaaaaaaaaa', acceptees: [1, 2, 4] },
        { lot: 'b', empreinte: 'ancienneeeee', acceptees: [1, 2] },
      ],
      new Map([
        ['a', 'aaaaaaaaaaaa'],
        ['b', 'bbbbbbbbbbbb'],
      ]),
    )
    expect(r.acceptees).toEqual({ a: [3], b: [1] })
    expect(r.aMontrer).toEqual([{ lot: 'b', numero: 2, n: 'Y', raison: 'r' }])
    expect(r.appliquees).toEqual({ a: [1, 2, 4] })
  })
})
