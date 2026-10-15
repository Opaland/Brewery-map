import { describe, expect, it } from 'vitest'
import { BRIGNAIS } from '../../src/core/distance'
import { normaliser, rechercher } from '../../src/core/recherche'
import type { Brasserie } from '../../src/core/schema'
import { LIGNES_REELLES } from './lignes-reelles'

const TOUTES = LIGNES_REELLES as unknown as Brasserie[]
const TOUTES_CATEGORIES = [0, 1, 2, 3] as const

const base = {
  origine: BRIGNAIS,
  rayonKm: 100,
  texte: '',
  categories: TOUTES_CATEGORIES,
}

describe('normaliser', () => {
  it('ignore la casse, les accents et les tirets', () => {
    expect(normaliser('Soucieu-en-Jarrest')).toBe(normaliser('soucieu en jarrest'))
    expect(normaliser('Vénissieux')).toBe('venissieux')
    expect(normaliser("Bulles d'Orge")).toBe(normaliser('bulles d’orge'))
  })
})

describe('rechercher', () => {
  it('trie par distance calculée, la plus proche d’abord', () => {
    const noms = rechercher(TOUTES, base).map((r) => r.brasserie.n)
    expect(noms).toEqual(['Caribrew', "Bulles d'Orge", 'La Beer Fabrique', 'Tom & Co'])
  })

  it('calcule la distance depuis l’origine, sans lire le champ km', () => {
    const faux = TOUTES.map((b) => ({ ...b, km: 999 }))
    const premier = rechercher(faux, base)[0]
    // Caribrew, référence Python (haversine, R = 6371 km) : 5,339 km.
    expect(premier.distanceKm).toBeCloseTo(5.339, 2)
  })

  it('exclut ce qui est au-delà du rayon', () => {
    const noms = rechercher(TOUTES, { ...base, rayonKm: 10 }).map((r) => r.brasserie.n)
    expect(noms).toEqual(['Caribrew', "Bulles d'Orge"])
  })

  it('trouve par commune, sans accent ni casse', () => {
    const noms = rechercher(TOUTES, { ...base, texte: 'soucieu' }).map((r) => r.brasserie.n)
    expect(noms).toEqual(['Caribrew'])
  })

  it('trouve par nom', () => {
    const noms = rechercher(TOUTES, { ...base, texte: 'beer fab' }).map((r) => r.brasserie.n)
    expect(noms).toEqual(['La Beer Fabrique'])
  })

  it('exige tous les mots, dans le nom ou la commune', () => {
    expect(rechercher(TOUTES, { ...base, texte: 'tom lyon' }).map((r) => r.brasserie.n)).toEqual([
      'Tom & Co',
    ])
    expect(rechercher(TOUTES, { ...base, texte: 'tom oullins' })).toEqual([])
  })

  it('filtre par catégorie de vente', () => {
    const noms = rechercher(TOUTES, { ...base, categories: [0, 2] }).map((r) => r.brasserie.n)
    expect(noms).toEqual(["Bulles d'Orge", 'Tom & Co'])
  })

  it('ne rend rien si aucune catégorie n’est cochée', () => {
    expect(rechercher(TOUTES, { ...base, categories: [] })).toEqual([])
  })
})
