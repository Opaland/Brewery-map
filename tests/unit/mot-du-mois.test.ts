import { describe, expect, it } from 'vitest'
import { ecarts, faitsDuMois, nombresInconnus, nomsInconnus } from '../../src/core/mot-du-mois'

/** S380 : le code calcule les faits, Claude n'écrit que le texte. */

const fiche = (n: string, c: string, d: string, verifieLe: string) => ({ n, c, d, verifieLe })
const fiches = [
  fiche('Brasserie La Moujasse', 'Vivonne', '86', '2026-11-11'),
  fiche('Pirates du Clain', 'Ligugé', '86', '2026-11-11'),
  fiche('La Gabarde', 'Clessé', '79', '2026-11-10'),
  fiche('Brasserie du Rhin', 'Morschwiller-le-Bas', '68', '2026-11-03'),
  fiche('Brasserie Ancienne', 'Lyon', '69', '2026-10-21'),
]
const nouveautes = [
  { date: '2026-11-11', texte: '4 brasseries de plus dans la Vienne.' },
  { date: '2026-11-10', texte: '3 brasseries de plus dans les Deux-Sèvres.' },
  { date: '2026-10-27', texte: '59 brasseries ajoutées en Provence.' },
]

describe('les faits du mois (CA1)', () => {
  const f = faitsDuMois(fiches, nouveautes, '2026-11')

  it('compte les fiches et les départements de toute la carte', () => {
    expect(f.mois).toBe('2026-11')
    expect(f.fichesEnTout).toBe(5)
    expect(f.departementsEnTout).toBe(4)
  })

  it('ne garde que les nouveautés et les fiches vérifiées de ce mois, triées', () => {
    expect(f.nouveautes.map((n) => n.date)).toEqual(['2026-11-10', '2026-11-11'])
    expect(f.fichesDuMois).toEqual([
      { nom: 'Brasserie du Rhin', commune: 'Morschwiller-le-Bas', departement: '68' },
      { nom: 'Brasserie La Moujasse', commune: 'Vivonne', departement: '86' },
      { nom: 'La Gabarde', commune: 'Clessé', departement: '79' },
      { nom: 'Pirates du Clain', commune: 'Ligugé', departement: '86' },
    ])
    expect(f.fichesDuMoisEnTout).toBe(4)
  })

  it('un mois sans rien donne des listes vides, pas une erreur', () => {
    const vide = faitsDuMois(fiches, nouveautes, '2026-09')
    expect(vide.nouveautes).toEqual([])
    expect(vide.fichesDuMois).toEqual([])
    expect(vide.fichesDuMoisEnTout).toBe(0)
  })
})

describe('les nombres du texte (CA2)', () => {
  const f = faitsDuMois(fiches, nouveautes, '2026-11')

  it('accepte les nombres des faits, les jours du mois et l’année', () => {
    expect(nombresInconnus('5 fiches dans 4 départements, dont 3 et 4 ajoutées les 10 et 11 novembre 2026.', f)).toEqual([])
  })

  it('rend un nombre absent des faits', () => {
    expect(nombresInconnus('Déjà 812 fiches, et 40 nouvelles.', f)).toEqual(['812', '40'])
  })

  it('lit les nombres écrits avec une espace ou une virgule', () => {
    const grand = { ...f, fichesEnTout: 1200 }
    expect(nombresInconnus('1 200 fiches, 1,5 de plus.', grand)).toEqual(['1,5'])
  })
})

describe('les noms du texte (CA3)', () => {
  const f = faitsDuMois(fiches, nouveautes, '2026-11')

  it('accepte une brasserie des faits du mois', () => {
    expect(nomsInconnus('Pirates du Clain rejoint la carte.', f, fiches)).toEqual([])
  })

  it('rend une brasserie de la carte absente des faits du mois', () => {
    expect(nomsInconnus('Comme Brasserie Ancienne en octobre.', f, fiches)).toEqual(['Brasserie Ancienne'])
  })

  it('ecarts réunit les deux listes', () => {
    expect(ecarts('Brasserie Ancienne et 999 fiches.', f, fiches)).toEqual({
      nombres: ['999'],
      noms: ['Brasserie Ancienne'],
    })
  })
})

describe('revue adverse S380', () => {
  const f = faitsDuMois(fiches, nouveautes, '2026-11')

  it('une fiche sans verifieLe ne fait pas planter les faits (78 fiches de data/ en sont là)', () => {
    const sans = [...fiches, { n: 'Sans Date', c: 'Taluyers', d: '69' }]
    expect(faitsDuMois(sans, nouveautes, '2026-11').fichesEnTout).toBe(6)
  })

  it('les vraies données donnent des faits sans planter', async () => {
    const { readFileSync } = await import('node:fs')
    const vraies = JSON.parse(readFileSync('data/breweries.json', 'utf8')) as Parameters<typeof faitsDuMois>[0]
    expect(faitsDuMois(vraies, nouveautes, '2026-11').fichesEnTout).toBe(vraies.length)
  })

  it('un compte inventé de 31 ou moins est refusé hors d’une date', () => {
    expect(nombresInconnus('17 nouvelles brasseries, plus de 31 fiches.', f)).toEqual(['17', '31'])
    expect(nombresInconnus('Le 1er novembre, puis les 10 et 11 novembre.', f)).toEqual([])
  })

  it('un code de département ou un morceau de date des faits ne légitime pas un compte', () => {
    expect(nombresInconnus('86 brasseries en un mois.', f)).toEqual(['86'])
  })

  it('le point décimal est lu comme un seul nombre', () => {
    expect(nombresInconnus('1.5 million, 12.31 litres.', f)).toEqual(['1.5', '12.31'])
  })

  it('un nom est reconnu sans tenir compte de la casse ni des accents, et pas dans un autre mot', () => {
    expect(nomsInconnus('BRASSERIE ANCIENNE, et la brasserie ancienne.', f, fiches)).toEqual(['Brasserie Ancienne'])
    const courtes = [...fiches, { n: 'Banz', c: 'Lautenbach', d: '68', verifieLe: '2026-10-01' }]
    expect(nomsInconnus('Un Banzaï retentit.', f, courtes)).toEqual([])
  })

  it('un nom contenu dans un nom permis présent dans le texte n’est pas un écart', () => {
    const avecPoule = [
      ...fiches,
      { n: 'La Poule Rousse', c: 'X', d: '86', verifieLe: '2026-11-02' },
      { n: 'La Poule', c: 'Y', d: '69', verifieLe: '2026-10-02' },
    ]
    const g = faitsDuMois(avecPoule, nouveautes, '2026-11')
    expect(nomsInconnus('La Poule Rousse arrive.', g, avecPoule)).toEqual([])
  })
})
