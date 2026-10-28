import { describe, expect, it } from 'vitest'
import { communesConnues, ORIGINE_DEFAUT } from '../../src/core/origine'
import {
  basculerFavori,
  basculerVisite,
  ecrireNote,
  NOTE_MAX,
  dateDuJour,
  lirePreferences,
  nomsDuCarnet,
  origineDesPreferences,
  PREFERENCES_DEFAUT,
  versStockage,
  VERSION_PREFERENCES,
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
      version: VERSION_PREFERENCES,
      rayonKm: 45,
      categories: [1, 2],
      type: 'ipa',
      depart: { type: 'commune', cle: 'Oullins|69' },
      favoris: ['Nomade Brewery'],
      favorisSeulement: true,
      avecOsm: false,
      visites: [{ nom: 'Caribrew', date: '2026-10-17' }],
      pasVisitees: true,
      carnetSeulement: true,
      notes: [{ nom: 'Caribrew', texte: 'bien' }],
      theme: 'sombre',
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

describe('inclure la couche OpenStreetMap (revue persona S25)', () => {
  it('par défaut oui ; gardé non, relu non ; illisible, le défaut', () => {
    expect(lirePreferences({}).avecOsm).toBe(true)
    expect(lirePreferences({ avecOsm: false }).avecOsm).toBe(false)
    expect(lirePreferences({ avecOsm: 'non' }).avecOsm).toBe(true)
  })
})

describe('mon carnet : les visites (S35)', () => {
  it('par défaut, aucune visite, et le filtre « pas encore visitées » est coupé', () => {
    expect(PREFERENCES_DEFAUT.visites).toEqual([])
    expect(PREFERENCES_DEFAUT.pasVisitees).toBe(false)
  })

  it('une visite garde un nom et une date du jour, rien d’autre', () => {
    const v = basculerVisite([], 'Caribrew', '2026-10-17')
    expect(v).toEqual([{ nom: 'Caribrew', date: '2026-10-17' }])
    expect(basculerVisite(v, 'Caribrew', '2026-10-18')).toEqual([])
  })

  it('relu champ par champ : une visite illisible tombe seule, les favoris restent', () => {
    const p = lirePreferences({
      favoris: ['A'],
      visites: [
        { nom: 'Caribrew', date: '2026-10-17' },
        { nom: 'Sans date' },
        { nom: 'Caribrew', date: '2026-10-18' },
        { nom: 'Avec lieu', date: '2026-10-17', lat: 45 },
        'texte',
      ],
      pasVisitees: 'oui',
    })
    expect(p.favoris).toEqual(['A'])
    expect(p.visites).toEqual([{ nom: 'Caribrew', date: '2026-10-17' }])
    expect(p.pasVisitees).toBe(false)
  })

  it('S350 : « seulement mon carnet », coupé par défaut ; un stockage d’avant se lit sans lui', () => {
    expect(PREFERENCES_DEFAUT.carnetSeulement).toBe(false)
    expect(lirePreferences({ pasVisitees: true }).carnetSeulement).toBe(false)
    expect(lirePreferences({ carnetSeulement: true }).carnetSeulement).toBe(true)
    expect(lirePreferences({ carnetSeulement: 'oui' }).carnetSeulement).toBe(false)
  })

  it('S350 : le carnet, ce sont les visitées et les notées, chacune une fois', () => {
    const carnet = nomsDuCarnet(
      [{ nom: 'Caribrew', date: '2026-10-17' }, { nom: 'Tom & Co', date: '2026-10-18' }],
      [{ nom: 'Caribrew', texte: 'bien' }, { nom: 'Nomade Brewery', texte: 'à revoir' }],
    )
    expect([...carnet].sort()).toEqual(['Caribrew', 'Nomade Brewery', 'Tom & Co'])
    expect(nomsDuCarnet([], []).size).toBe(0)
  })

  it('la date du jour est locale, sans heure', () => {
    expect(dateDuJour(new Date(2026, 9, 17, 23, 59))).toBe('2026-10-17')
    expect(dateDuJour(new Date(2026, 0, 5, 0, 1))).toBe('2026-01-05')
  })
})

describe('mes notes (S36)', () => {
  it('une note s’écrit, se remplace, et se retire quand elle est vidée', () => {
    const a = ecrireNote([], 'Caribrew', 'La blanche était excellente')
    expect(a).toEqual([{ nom: 'Caribrew', texte: 'La blanche était excellente' }])
    expect(ecrireNote(a, 'Caribrew', 'Fermé le lundi en vrai')).toEqual([{ nom: 'Caribrew', texte: 'Fermé le lundi en vrai' }])
    expect(ecrireNote(a, 'Caribrew', '')).toEqual([])
    // Une espace sur tout le texte sélectionné ne l'efface pas (revue adverse S36).
    expect(ecrireNote(a, 'Caribrew', ' ')).toEqual([{ nom: 'Caribrew', texte: ' ' }])
  })

  it('la coupe à 500 ne laisse pas une moitié d’emoji (revue adverse S36)', () => {
    const t = ecrireNote([], 'X', `a${'😀'.repeat(300)}`)[0].texte
    expect(t.length).toBeLessThanOrEqual(500)
    expect(/[\ud800-\udbff]$/.test(t)).toBe(false)
  })

  it('au plus 500 caractères', () => {
    expect(ecrireNote([], 'X', 'a'.repeat(600))[0].texte).toHaveLength(NOTE_MAX)
    expect(NOTE_MAX).toBe(500)
  })

  it('relue note par note : une illisible tombe seule, une trop longue est coupée', () => {
    const p = lirePreferences({
      favoris: ['A'],
      notes: [
        { nom: 'Caribrew', texte: 'bien' },
        { nom: 'Sans texte' },
        { nom: 'Longue', texte: 'b'.repeat(700) },
        { nom: 'Caribrew', texte: 'doublon' },
        { nom: 'Vide', texte: '' },
      ],
    })
    expect(p.favoris).toEqual(['A'])
    expect(p.notes).toEqual([
      { nom: 'Caribrew', texte: 'bien' },
      { nom: 'Longue', texte: 'b'.repeat(500) },
    ])
  })
})

describe('le thème au choix (S45)', () => {
  it('automatique par défaut ; une valeur inconnue reprend le défaut, seule', () => {
    expect(PREFERENCES_DEFAUT.theme).toBe('auto')
    const p = lirePreferences({ favoris: ['A'], theme: 'violet' })
    expect(p.theme).toBe('auto')
    expect(p.favoris).toEqual(['A'])
  })
})
