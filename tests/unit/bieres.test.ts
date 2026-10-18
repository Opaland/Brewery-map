import { describe, expect, it } from 'vitest'
import { compterTypes, lienDeBiere, TYPES_BIERE } from '../../src/core/bieres'
import { BRIGNAIS } from '../../src/core/distance'
import { rechercher } from '../../src/core/recherche'
import { typeDeBiereSchema, type Brasserie } from '../../src/core/schema'
import { LIGNES_REELLES } from './lignes-reelles'

const base = LIGNES_REELLES[0] as unknown as Brasserie
const avecBieres = (n: string, beers: Brasserie['beers'], directoryUrl?: string): Brasserie => ({
  ...base,
  n,
  beers,
  ...(directoryUrl === undefined ? {} : { directoryUrl }),
})

describe('lienDeBiere', () => {
  it('préfère la page de la bière', () => {
    const b = avecBieres('A', [], 'https://annuaire.example/a')
    expect(lienDeBiere({ type: 'ipa', url: 'https://a.example/ipa' }, b)).toEqual({
      url: 'https://a.example/ipa',
      nature: 'produit',
    })
  })

  it('se rabat sur la fiche d’annuaire de la brasserie', () => {
    const b = avecBieres('A', [], 'https://annuaire.example/a')
    expect(lienDeBiere({ type: 'ipa' }, b)).toEqual({
      url: 'https://annuaire.example/a',
      nature: 'annuaire',
    })
  })

  it('sinon, rien : « non référencé », jamais une page d’accueil inventée', () => {
    expect(lienDeBiere({ type: 'ipa' }, avecBieres('A', []))).toBeNull()
  })

  // S295, Karim : 89 bières partageaient l'adresse de toutes les autres bières
  // de leur brasserie ; ce lien n'est pas « la page de la bière ».
  it('une adresse que plusieurs bières de la fiche partagent est la page des bières de la brasserie', () => {
    const commune = 'https://a.example/nos-bieres'
    const b = { ...avecBieres('A', []), beers: [{ type: 'ipa', url: commune }, { type: 'blonde', url: commune }, { type: 'stout', url: 'https://a.example/stout' }] } as Brasserie
    expect(lienDeBiere({ type: 'ipa', url: commune }, b)).toEqual({ url: commune, nature: 'catalogue' })
    expect(lienDeBiere({ type: 'stout', url: 'https://a.example/stout' }, b)).toEqual({ url: 'https://a.example/stout', nature: 'produit' })
  })
})

describe('les types', () => {
  it('la liste affichée et le schéma disent les mêmes types, dans le même ordre (§4ter)', () => {
    expect(TYPES_BIERE.map((t) => t.type)).toEqual(typeDeBiereSchema.options)
  })

  it('chaque type du schéma a un libellé et une explication en mots simples', () => {
    for (const t of TYPES_BIERE) {
      expect(t.libelle.length).toBeGreaterThan(0)
      expect(t.explication.length).toBeGreaterThan(0)
    }
  })

  it('compte les brasseries par type, une brasserie une fois par type', () => {
    const lot = [
      avecBieres('A', [{ type: 'ipa' }, { type: 'ipa', libelle: 'NEIPA' }]),
      avecBieres('B', [{ type: 'ipa' }, { type: 'blonde' }]),
      avecBieres('C', []),
    ]
    const n = compterTypes(lot)
    expect(n.get('ipa')).toBe(2)
    expect(n.get('blonde')).toBe(1)
    expect(n.get('stout')).toBe(0)
  })
})

describe('rechercher par type', () => {
  const lot = [
    avecBieres('A', [{ type: 'ipa' }]),
    avecBieres('B', [{ type: 'blonde' }]),
    avecBieres('C', []),
  ]
  const base2 = { origine: BRIGNAIS, rayonKm: 100, texte: '', categories: [0, 1, 2, 3] as const }

  it('sans type choisi, tout passe', () => {
    expect(rechercher(lot, base2)).toHaveLength(3)
  })

  it('un type choisi ne garde que les brasseries qui le proposent', () => {
    expect(rechercher(lot, { ...base2, type: 'ipa' }).map((r) => r.brasserie.n)).toEqual(['A'])
  })
})
