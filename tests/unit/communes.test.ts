import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  chercherCommunes,
  communeLaPlusProche,
  departementsProches,
  indexerCommunes,
  type CommuneFrance,
} from '../../src/core/communes'

/** L'ordre du fichier est celui de la population (outils/communes.ts). */
const LISTE: CommuneFrance[] = [
  ['Lyon', '69', 45.768, 4.835],
  ['Saint-Étienne', '42', 45.434, 4.39],
  ['Brignais', '69', 45.674, 4.754],
  ['Lyons-la-Forêt', '27', 49.398, 1.476],
  ['Château', '71', 46.427, 4.602],
  ['Château', '05', 44.63, 6.5],
  ['Saint-Étienne-de-Saint-Geoirs', '38', 45.339, 5.341],
  ["L'Abergement-Clémenciat", '01', 46.156, 4.926],
  ['Villefranche-sur-Saône', '69', 45.989, 4.719],
]
const INDEX = indexerCommunes(LISTE)
const noms = (t: string, max?: number) => chercherCommunes(INDEX, t, max).map((c) => `${c[0]} (${c[1]})`)

describe('chercher une commune de France', () => {
  it('par le début du nom, la plus peuplée d’abord', () => {
    expect(noms('lyo')).toEqual(['Lyon (69)', 'Lyons-la-Forêt (27)'])
  })

  it('sans accents, tirets ni apostrophes, et « st » pour « saint »', () => {
    expect(noms('st etienne')).toEqual(['Saint-Étienne (42)', 'Saint-Étienne-de-Saint-Geoirs (38)'])
    expect(noms('labergement')).toEqual(["L'Abergement-Clémenciat (01)"])
    expect(noms('villefranche sur saone')).toEqual(['Villefranche-sur-Saône (69)'])
  })

  it('les homonymes se départagent par le département ou le code postal', () => {
    expect(noms('chateau')).toEqual(['Château (71)', 'Château (05)'])
    expect(noms('chateau 71')).toEqual(['Château (71)'])
    expect(noms('chateau 05000')).toEqual(['Château (05)'])
  })

  it('un mot au milieu du nom trouve aussi, après les débuts de nom', () => {
    expect(noms('saone')).toEqual(['Villefranche-sur-Saône (69)'])
    expect(noms('geoirs')).toEqual(['Saint-Étienne-de-Saint-Geoirs (38)'])
  })

  it('rien pour un texte vide ou d’une lettre ; au plus « max » réponses', () => {
    expect(noms('')).toEqual([])
    expect(noms('l')).toEqual([])
    expect(noms('ch', 1)).toEqual(['Château (71)'])
  })
})

describe('le vrai fichier des communes', () => {
  const vraies = JSON.parse(readFileSync('public/communes-france.json', 'utf8')) as CommuneFrance[]
  const index = indexerCommunes(vraies)

  it('couvre la France : plus de 34 000 communes, chacune avec un point plausible', () => {
    expect(vraies.length).toBeGreaterThan(34_000)
    for (const [nom, dep, lat, lon] of vraies) {
      expect(nom.length, dep).toBeGreaterThan(0)
      expect(Math.abs(lat), nom).toBeLessThanOrEqual(90)
      expect(Math.abs(lon), nom).toBeLessThanOrEqual(180)
    }
  })

  it('trouve des communes de partout, loin de Brignais', () => {
    expect(chercherCommunes(index, 'brest', 1)[0]?.[0]).toBe('Brest')
    expect(chercherCommunes(index, 'ajaccio', 1)[0]?.[1]).toBe('2A')
    expect(chercherCommunes(index, 'brignais', 1)[0]?.slice(0, 2)).toEqual(['Brignais', '69'])
  })
})

describe('chercher d’abord près du départ (demande de Cédric du 16/10)', () => {
  const RECTANGLES = {
    '69': [45.45, 4.24, 46.31, 5.16],
    '42': [45.23, 3.69, 46.28, 4.76],
    '59': [50.02, 2.07, 51.09, 4.23],
  } as Record<string, [number, number, number, number]>
  const LYON = { lat: 45.768, lon: 4.835 }

  it('les départements à moins de 100 km du départ, et eux seuls', () => {
    expect(departementsProches(RECTANGLES, LYON, 100).sort()).toEqual(['42', '69'])
    expect(departementsProches(RECTANGLES, { lat: 50.63, lon: 3.06 }, 100)).toEqual(['59'])
  })

  it('près du départ, la plus proche d’abord', () => {
    const proches = indexerCommunes([
      ['Bron', '69', 45.738, 4.913],
      ['Brignais', '69', 45.674, 4.754],
      ['Brindas', '69', 45.72, 4.795],
    ])
    expect(chercherCommunes(proches, 'bri', 8, LYON).map((c) => c[0])).toEqual(['Brindas', 'Brignais'])
  })

  it('la commune la plus proche d’une position, calculée dans le téléphone', () => {
    const tassin = { lat: 45.762, lon: 4.78 }
    expect(communeLaPlusProche(LISTE, tassin)?.[0]).toBe('Lyon')
    expect(communeLaPlusProche([], tassin)).toBeUndefined()
  })
})
