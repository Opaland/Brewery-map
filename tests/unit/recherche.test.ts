import { describe, expect, it } from 'vitest'
import { BRIGNAIS } from '../../src/core/distance'
import {
  favorisCaches,
  listeCourte,
  normaliser,
  plusProche,
  rechercher,
  rechercherPartout,
} from '../../src/core/recherche'
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
  it('décompose les ligatures : « baroeul » trouve Marcq-en-Barœul (S24)', () => {
    expect(normaliser('Marcq-en-Barœul')).toBe('marcq en baroeul')
    expect(normaliser('ÆSIR Cœur')).toBe('aesir coeur')
  })

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

  it('un nom tapé cherche partout, au-delà du rayon (demande de Cédric du 16/10)', () => {
    const loin = rechercher(TOUTES, { ...base, rayonKm: 5, texte: 'tom' }).map((r) => r.brasserie.n)
    expect(loin).toContain('Tom & Co')
    expect(rechercherPartout({ texte: 'tom' })).toBe(true)
    expect(rechercherPartout({ texte: '  ' })).toBe(false)
    // Une ponctuation seule ne cherche rien : elle ne lève pas le rayon
    // (revue globale S22 : « - » donnait 166 brasseries « toutes distances »).
    for (const texte of ['-', "'", ' . ']) expect(rechercherPartout({ texte })).toBe(false)
    expect(rechercher(TOUTES, { ...base, rayonKm: 5, texte: '-' })).toHaveLength(
      rechercher(TOUTES, { ...base, rayonKm: 5, texte: '' }).length,
    )
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

describe('rechercher — formes courantes d’un nom', () => {
  const avec = (n: string, c: string): Brasserie => ({ ...TOUTES[0], n, c })
  const ninkasi = avec('Ninkasi Saint-Étienne', 'Saint-Étienne')
  const stephanoise = avec('Brasserie Stéphanoise', 'Saint-Étienne')
  const brassin = avec("Le Brass'in", 'Fontaines-sur-Saône')
  const lot = [ninkasi, stephanoise, brassin]
  const noms = (texte: string) => rechercher(lot, { ...base, texte }).map((r) => r.brasserie.n)

  it('« st » vaut « saint »', () => {
    expect(noms('ninkasi st etienne')).toEqual(['Ninkasi Saint-Étienne'])
  })

  it('un nom à apostrophe se trouve aussi collé', () => {
    expect(noms('brassin')).toEqual(["Le Brass'in"])
    expect(noms("brass'in")).toEqual(["Le Brass'in"])
  })
})

describe('favoris seulement (S9)', () => {
  it('ne garde que les noms demandés, avec les autres filtres', () => {
    const seulement = new Set(['Tom & Co', 'Caribrew'])
    const noms = rechercher(TOUTES, { ...base, seulement }).map((r) => r.brasserie.n)
    expect(noms).toEqual(['Caribrew', 'Tom & Co'])
    expect(rechercher(TOUTES, { ...base, seulement, rayonKm: 10 }).map((r) => r.brasserie.n)).toEqual([
      'Caribrew',
    ])
  })

  it('aucun favori : aucun résultat, pas tout', () => {
    expect(rechercher(TOUTES, { ...base, seulement: new Set() })).toEqual([])
  })
})

describe('favoris cachés par les autres filtres', () => {
  it('compte les favoris des données absents des résultats, pas ceux disparus des données', () => {
    const favoris = ['Tom & Co', 'Caribrew', 'Disparue']
    const resultats = rechercher(TOUTES, { ...base, rayonKm: 10 })
    expect(favorisCaches(TOUTES, favoris, resultats)).toEqual(['Tom & Co'])
  })
})

describe('quand rien n’est à portée (revue globale S22)', () => {
  it('nomme la brasserie la plus proche du départ, et sa distance', () => {
    const lille = { lat: 50.633, lon: 3.059 }
    const p = plusProche(TOUTES, lille)
    expect(p).toBeDefined()
    const toutes = TOUTES.map((b) => Math.hypot(b.lat - lille.lat, b.lon - lille.lon))
    expect(p?.brasserie.n).toBe(TOUTES[toutes.indexOf(Math.min(...toutes))]?.n)
    expect(p?.distanceKm).toBeGreaterThan(400)
    expect(plusProche([], lille)).toBeUndefined()
  })
})

describe('listeCourte (S24 : favoris cachés, liste bornée)', () => {
  it('jusqu’à cinq noms : tous', () => {
    expect(listeCourte(['A', 'B'])).toBe('A, B')
  })
  it('au-delà : les cinq premiers, et le compte du reste', () => {
    expect(listeCourte(['A', 'B', 'C', 'D', 'E', 'F', 'G'])).toBe('A, B, C, D, E et 2 autres')
    expect(listeCourte(['A', 'B', 'C', 'D', 'E', 'F'])).toBe('A, B, C, D, E et 1 autre')
  })
})
