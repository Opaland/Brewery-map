import { describe, expect, it } from 'vitest'
import {
  ajoutDepuisOsm,
  candidatDepuisNominatim,
  classerCandidats,
  coeurDuNom,
  type CandidatOsm,
} from '../../src/core/decouverte'
import { brasserieSchema, type Brasserie } from '../../src/core/schema'
import { LIGNES_REELLES } from './lignes-reelles'

const TOUTES = LIGNES_REELLES as unknown as Brasserie[]

/** Un résultat Nominatim tel que l'API le rend (forme relevée le 16/10, valeurs d'essai). */
const brut = {
  osm_type: 'node',
  osm_id: 123,
  lat: '45.8305948',
  lon: '4.6132644',
  category: 'craft',
  type: 'brewery',
  name: 'Virage 7',
  address: { road: 'Rue de la Gare', house_number: '3', village: 'Lozanne', postcode: '69380' },
  extratags: { website: 'https://virage7.example/' },
}

describe('lire un résultat Nominatim', () => {
  it('garde l’objet OSM, le nom, le point exact, la commune et le département', () => {
    const c = candidatDepuisNominatim(brut)
    expect(c).toEqual({
      osm: 'node/123',
      nom: 'Virage 7',
      lat: 45.8305948,
      lon: 4.6132644,
      commune: 'Lozanne',
      departement: '69',
      adresse: '3 Rue de la Gare, 69380 Lozanne',
      site: 'https://virage7.example/',
    })
  })

  it('écarte ce qui n’est pas craft=brewery, et ce qui n’a pas de nom', () => {
    expect(candidatDepuisNominatim({ ...brut, category: 'amenity', type: 'cafe' })).toBeNull()
    expect(candidatDepuisNominatim({ ...brut, name: '' })).toBeNull()
  })

  it('département corse et commune absente : rien n’est deviné', () => {
    expect(candidatDepuisNominatim({ ...brut, address: { ...brut.address, postcode: '20000' } })).toBeNull()
    expect(candidatDepuisNominatim({ ...brut, address: { postcode: '69380' } })).toBeNull()
  })
})

describe('le cœur d’un nom', () => {
  it('retire les mots génériques, la casse et les accents', () => {
    expect(coeurDuNom('Microbrasserie Caribrew')).toBe('caribrew')
    expect(coeurDuNom('Brasserie de la Loire')).toBe('loire')
    expect(coeurDuNom('Bières des Frères Clavel')).toBe('freres clavel')
  })
})

describe('classer les candidats', () => {
  const candidat = (nom: string, lat = 45.6667, lon = 4.6867): CandidatOsm => ({
    osm: `node/${nom}`,
    nom,
    lat,
    lon,
    commune: 'Soucieu-en-Jarrest',
    departement: '69',
    adresse: 'Soucieu-en-Jarrest',
  })

  it('une brasserie du fichier sous un autre habillage est « déjà dans le fichier »', () => {
    const [c] = classerCandidats([candidat('Microbrasserie Caribrew')], TOUTES)
    expect(c.statut).toBe('present')
    expect(c.fiche).toBe('Caribrew')
  })

  it('un nom inconnu est « nouveau », avec la fiche la plus proche et sa distance', () => {
    const [c] = classerCandidats([candidat('Virage 7')], TOUTES)
    expect(c.statut).toBe('nouveau')
    expect(c.plusProche?.n).toBe('Caribrew')
    expect(c.plusProche?.km).toBeCloseTo(0, 1)
  })

  it('un même objet OSM vu deux fois (deux tuiles) ne compte qu’une fois', () => {
    expect(classerCandidats([candidat('Virage 7'), candidat('Virage 7')], TOUTES)).toHaveLength(1)
  })
})

describe('la fiche proposée pour un ajout', () => {
  const c = candidatDepuisNominatim(brut)
  if (c === null) throw new Error('candidat attendu')

  it('est « À confirmer », dit d’où elle vient, et passe le schéma', () => {
    const f = ajoutDepuisOsm(c)
    expect(f.cat).toBe(0)
    expect(f.conf).toBe('')
    expect(f.src).toBe('')
    expect(f.note).toContain('OpenStreetMap')
    expect(f.note).toContain('node/123')
    expect(f.coordPrecision).toBe('address')
    expect(brasserieSchema.safeParse(f).success).toBe(true)
  })

  it('calcule km depuis Brignais, au dixième, comme le fichier', () => {
    const f = ajoutDepuisOsm(c)
    expect(f.km * 10).toBe(Math.round(f.km * 10))
    expect(f.km).toBeGreaterThan(15)
    expect(f.km).toBeLessThan(25)
  })
})
