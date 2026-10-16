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

  it('un champ périmé ne coûte que lui-même : les favoris restent (revue code S9)', () => {
    const base = versStockage(PREFERENCES_DEFAUT)
    const p = lirePreferences({ ...base, rayonKm: 40, type: 'sour_inconnu', favoris: ['Nomade Brewery'] })
    expect(p.favoris).toEqual(['Nomade Brewery'])
    expect(p.rayonKm).toBe(40)
    expect(p.type).toBeUndefined()
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
    expect(lirePreferences({ ...base, rayonKm: 150 }).rayonKm).toBe(PREFERENCES_DEFAUT.rayonKm)
    expect(lirePreferences({ ...base, rayonKm: 33 }).rayonKm).toBe(PREFERENCES_DEFAUT.rayonKm)
  })
})

describe('la position ne se garde jamais (Léa, S8) — le choix « autour de moi », si (S21)', () => {
  it('« autour de moi » est gardé comme un choix, sans coordonnées', () => {
    // Retour de Cédric du 16/10 : « il faut redemander » à chaque ouverture.
    // Le choix se garde ; les coordonnées, jamais.
    const p = versStockage({
      ...PREFERENCES_DEFAUT,
      depart: { type: 'position', point: { lat: 45.9367, lon: 4.7208 } },
    })
    expect(p.depart).toEqual({ type: 'autour' })
    expect(JSON.stringify(p)).not.toMatch(/45\.93|4\.72/)
  })

  it('une position écrite à la main dans le stockage est refusée', () => {
    const base = versStockage(PREFERENCES_DEFAUT)
    for (const depart of [
      { type: 'position', lat: 45.9, lon: 4.7 },
      { type: 'autour', lat: 45.9, lon: 4.7 },
    ]) {
      expect(lirePreferences({ ...base, depart }).depart).toEqual({ type: 'brignais' })
    }
  })

  it('« autour de moi » gardé repart de Brignais, le temps de relocaliser', () => {
    expect(origineDesPreferences({ type: 'autour' }, COMMUNES)).toEqual(ORIGINE_DEFAUT)
  })
})

describe('retrouver le point de départ gardé', () => {
  it('une commune encore dans les données redevient le départ', () => {
    const o = origineDesPreferences({ type: 'commune', cle: 'Oullins|69' }, COMMUNES)
    expect(o.type).toBe('commune')
    expect(o.type === 'commune' ? o.nom : '').toBe('Oullins')
  })

  it('une commune de France choisie se garde avec son point, et se retrouve telle quelle (S21)', () => {
    const brest = { type: 'commune', cle: 'Brest|29', nom: 'Brest', point: { lat: 48.39, lon: -4.486 } } as const
    const p = versStockage({ ...PREFERENCES_DEFAUT, depart: brest })
    expect(p.depart).toEqual({ type: 'commune', cle: 'Brest|29', nom: 'Brest', lat: 48.39, lon: -4.486 })
    expect(lirePreferences(p).depart).toEqual(p.depart)
    expect(origineDesPreferences(p.depart, COMMUNES)).toEqual(brest)
  })

  it('un point de commune hors de la Terre est refusé', () => {
    const base = versStockage(PREFERENCES_DEFAUT)
    const faux = { type: 'commune', cle: 'X|01', nom: 'X', lat: 200, lon: 4 }
    expect(lirePreferences({ ...base, depart: faux }).depart).toEqual({ type: 'brignais' })
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

  it('des favoris en double ou illisibles sont nettoyés, pas perdus', () => {
    const base = versStockage(PREFERENCES_DEFAUT)
    expect(lirePreferences({ ...base, favoris: ['A', 'A', 3, '', 'B'] }).favoris).toEqual(['A', 'B'])
  })
})
