import { describe, expect, it } from 'vitest'
import { communesConnues, ORIGINE_DEFAUT } from '../../src/core/origine'
import {
  basculerFavori,
  lirePreferences,
  origineDesPreferences,
  PREFERENCES_DEFAUT,
  versStockage,
} from '../../src/core/preferences'
import type { Brasserie } from '../../src/core/schema'
import { LIGNES_REELLES } from './lignes-reelles'

const TOUTES = LIGNES_REELLES as unknown as Brasserie[]
const COMMUNES = communesConnues(TOUTES)

describe('relire les préférences gardées', () => {
  it('rien de gardé : les réglages par défaut', () => {
    expect(lirePreferences(undefined)).toEqual(PREFERENCES_DEFAUT)
  })

  it('un contenu illisible ne casse rien : les réglages par défaut', () => {
    expect(lirePreferences('n’importe quoi')).toEqual(PREFERENCES_DEFAUT)
    expect(lirePreferences({ version: 99 })).toEqual(PREFERENCES_DEFAUT)
  })

  it('un contenu valide est relu tel quel', () => {
    const gardees = {
      version: 1,
      rayonKm: 45,
      categories: [1, 2],
      type: 'ipa',
      depart: { type: 'commune', cle: 'Oullins|69' },
      favoris: ['Nomade Brewery'],
      favorisSeulement: true,
    }
    expect(lirePreferences(gardees)).toEqual(gardees)
  })

  it('un rayon hors de la réglette est refusé, pas deviné', () => {
    const base = versStockage(PREFERENCES_DEFAUT)
    expect(lirePreferences({ ...base, rayonKm: 150 })).toEqual(PREFERENCES_DEFAUT)
    expect(lirePreferences({ ...base, rayonKm: 33 })).toEqual(PREFERENCES_DEFAUT)
  })
})

describe('la position ne se garde jamais (Léa, S8)', () => {
  it('« autour de moi » est gardé comme Brignais, sans coordonnées', () => {
    const p = versStockage({
      ...PREFERENCES_DEFAUT,
      depart: { type: 'position', point: { lat: 45.9367, lon: 4.7208 } },
    })
    expect(p.depart).toEqual({ type: 'brignais' })
    expect(JSON.stringify(p)).not.toMatch(/45\.93|4\.72/)
  })

  it('une position écrite à la main dans le stockage est refusée', () => {
    const base = versStockage(PREFERENCES_DEFAUT)
    const triche = { ...base, depart: { type: 'position', lat: 45.9, lon: 4.7 } }
    expect(lirePreferences(triche)).toEqual(PREFERENCES_DEFAUT)
  })
})

describe('retrouver le point de départ gardé', () => {
  it('une commune encore dans les données redevient le départ', () => {
    const o = origineDesPreferences({ type: 'commune', cle: 'Oullins|69' }, COMMUNES)
    expect(o.type).toBe('commune')
    expect(o.type === 'commune' ? o.nom : '').toBe('Oullins')
  })

  it('une commune disparue des données ramène à Brignais', () => {
    expect(origineDesPreferences({ type: 'commune', cle: 'Disparue|01' }, COMMUNES)).toEqual(
      ORIGINE_DEFAUT,
    )
  })
})

describe('les favoris', () => {
  it('basculer ajoute puis retire, sans doublon', () => {
    const un = basculerFavori([], 'Nomade Brewery')
    expect(un).toEqual(['Nomade Brewery'])
    expect(basculerFavori(un, 'GreDam')).toEqual(['Nomade Brewery', 'GreDam'])
    expect(basculerFavori(un, 'Nomade Brewery')).toEqual([])
  })

  it('des favoris en double dans le stockage sont refusés', () => {
    const base = versStockage(PREFERENCES_DEFAUT)
    expect(lirePreferences({ ...base, favoris: ['A', 'A'] })).toEqual(PREFERENCES_DEFAUT)
  })
})
