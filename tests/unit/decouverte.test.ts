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
  extratags: { website: 'https://virage7.example/', amenity: 'bar', opening_hours: 'Fr 17:00-22:00', 'contact:phone': '+33 4 00 00 00 00' },
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
      // Les étiquettes qui disent ce qu'est le lieu (revue métier S14 : un
      // « Café Rétro » doit se repérer) ; les autres ne sont pas gardées.
      etiquettes: { amenity: 'bar', opening_hours: 'Fr 17:00-22:00' },
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
  const candidat = (nom: string, commune = 'Soucieu-en-Jarrest', lat = 45.6667, lon = 4.6867): CandidatOsm => ({
    osm: `node/${nom}`,
    nom,
    lat,
    lon,
    commune,
    departement: '69',
    adresse: commune,
  })

  it('même cœur de nom dans la même commune : « déjà dans le fichier »', () => {
    const [c] = classerCandidats([candidat('Microbrasserie Caribrew')], TOUTES)
    expect(c.statut).toBe('present')
    expect(c.fiche).toBe('Caribrew')
  })

  it('même cœur, même commune, même si une autre fiche est plus près du point (revues S14)', () => {
    // Les fiches sont au centre de leur commune : la plus proche du point OSM
    // n'est pas forcément la bonne (La Soyeuse, Pleine Lune… le 16/10).
    const voisine = { ...TOUTES[1], n: 'Voisine', lat: 45.6668, lon: 4.6868 }
    const [c] = classerCandidats([candidat('Caribrew', 'Soucieu-en-Jarrest', 45.6668, 4.6868)], [...TOUTES, voisine])
    expect(c.plusProche?.n).toBe('Voisine')
    expect(c.statut).toBe('present')
  })

  it('le même nom exactement, ailleurs : « homonyme », jamais proposé en ajout', () => {
    const [c] = classerCandidats([candidat('Caribrew', 'Ailleurs', 46.5, 5.5)], TOUTES)
    expect(c.statut).toBe('homonyme')
    expect(c.fiche).toBe('Caribrew')
  })

  it('même cœur dans une autre commune : « ambigu », avec la fiche nommée', () => {
    // « La Fabrique » de Montélimar n'est pas « La Beer Fabrique » de Lyon (137 km).
    const lot = [...TOUTES, { ...TOUTES[1], n: 'La Beer Fabrique', c: 'Lyon 1er' }]
    const [c] = classerCandidats([candidat('Brasserie Artisanale La Fabrique', 'Montélimar', 44.5, 4.7)], lot)
    expect(c.statut).toBe('ambigu')
    expect(c.fiche).toBe('La Beer Fabrique')
  })

  it('un nom contenu : « ambigu », et la fiche citée est celle de la même commune d’abord', () => {
    // « La bonne fabrique (…) » citait « La Beer Fabrique » à 93 km au lieu de
    // « La Bonne Fabrique » de la même commune (revues S14).
    const lot = [
      ...TOUTES,
      { ...TOUTES[1], n: 'La Beer Fabrique', c: 'Lyon 1er', lat: 45.76, lon: 4.83 },
      { ...TOUTES[1], n: 'La Bonne Fabrique', c: 'Soucieu-en-Jarrest', lat: 45.68, lon: 4.69 },
    ]
    const [c] = classerCandidats([candidat('La bonne fabrique (brasserie et atelier bois)')], lot)
    expect(c.statut).toBe('ambigu')
    expect(c.fiche).toBe('La Bonne Fabrique')
  })

  it('« Lyon » d’OSM et « Lyon 1er » du fichier sont la même commune', () => {
    const lot = [...TOUTES, { ...TOUTES[1], n: 'Funky', c: 'Lyon 1er' }]
    const [c] = classerCandidats([candidat('Funky', 'Lyon', 45.77, 4.83)], lot)
    expect(c.statut).toBe('present')
  })

  it('un nom inconnu est « nouveau », avec la fiche la plus proche et sa distance', () => {
    const [c] = classerCandidats([candidat('Virage 7')], TOUTES)
    expect(c.statut).toBe('nouveau')
    expect(c.plusProche?.n).toBe('Caribrew')
    expect(c.plusProche?.km).toBeCloseTo(0, 1)
  })

  it('deux objets OSM au même nom, casse comprise : le second est un « doublon » du premier', () => {
    // « Les brasseurs savoyards » (node) et « Les Brasseurs Savoyards » (way), à 10 m.
    const [a, b] = classerCandidats(
      [candidat('Les brasseurs savoyards'), { ...candidat('Les Brasseurs Savoyards'), osm: 'way/2' }],
      TOUTES,
    )
    expect(a.statut).toBe('nouveau')
    expect(b.statut).toBe('doublon')
    expect(b.fiche).toBe('Les brasseurs savoyards')
  })

  it('le même objet OSM vu deux fois (deux tuiles) ne compte qu’une fois', () => {
    expect(classerCandidats([candidat('Virage 7'), candidat('Virage 7')], TOUTES)).toHaveLength(1)
  })
})

describe('la fiche proposée pour un ajout', () => {
  const c = candidatDepuisNominatim(brut)
  if (c === null) throw new Error('candidat attendu')

  it('est « À confirmer », dit d’où elle vient sans jargon, et passe le schéma', () => {
    const f = ajoutDepuisOsm(c)
    expect(f.cat).toBe(0)
    expect(f.conf).toBe('')
    // La source affichée est l'objet OSM ; la note parle à un parent (revue S14).
    expect(f.src).toBe('https://www.openstreetmap.org/node/123')
    expect(f.note).toContain('OpenStreetMap')
    expect(f.note).not.toMatch(/craft|node\//)
    expect(f.coordPrecision).toBe('osm')
    expect(brasserieSchema.safeParse(f).success).toBe(true)
  })

  it('calcule km depuis Brignais, au dixième, comme le fichier', () => {
    const f = ajoutDepuisOsm(c)
    expect(f.km * 10).toBe(Math.round(f.km * 10))
    expect(f.km).toBeGreaterThan(15)
    expect(f.km).toBeLessThan(25)
  })
})
