import { describe, expect, it } from 'vitest'
import { destination, liensItineraire } from '../../src/core/itineraire'
import type { Brasserie } from '../../src/core/schema'
import { LIGNES_REELLES } from './lignes-reelles'

const TOUTES = LIGNES_REELLES as unknown as Brasserie[]
const base = TOUTES[0]
const avecAdresse: Brasserie = {
  ...base,
  n: 'Caribrew',
  c: 'Soucieu-en-Jarrest',
  addr: "4 Parc d'Activités d'Arbora, 69510 Soucieu-en-Jarrest",
}
const communeSeule: Brasserie = { ...base, n: 'Bulles d’Orge', c: 'Oullins', addr: 'Oullins', lat: 45.71, lon: 4.81 }

describe('la destination', () => {
  it('est l’adresse écrite quand elle porte un code postal', () => {
    expect(destination(avecAdresse)).toEqual({
      mode: 'adresse',
      adresse: "4 Parc d'Activités d'Arbora, 69510 Soucieu-en-Jarrest",
    })
  })

  it('sinon, le point de la commune — jamais présenté comme l’adresse', () => {
    expect(destination(communeSeule)).toEqual({ mode: 'commune', lat: 45.71, lon: 4.81 })
  })
})

/**
 * Les seuls paramètres permis, par application : la destination et ce qui
 * lance la navigation. Aucun départ (`saddr`, `origin`, `from`…) ne peut
 * s'y glisser sans faire échouer ce test (CLAUDE.md §0 : la position ne
 * quitte pas le navigateur ; Hugo la donne lui-même à l'application qu'il
 * choisit).
 */
const PERMIS: Record<string, readonly string[]> = {
  'www.google.com': ['api', 'destination'],
  'maps.apple.com': ['daddr'],
  'waze.com': ['q', 'll', 'navigate'],
}

describe('les liens « Y aller »', () => {
  it('proposent quatre applications, dans cet ordre', () => {
    expect(liensItineraire(avecAdresse).map((l) => l.appli)).toEqual([
      'Google Maps',
      'Plans (Apple)',
      'Waze',
      'Autre application (Android)',
    ])
  })

  it('ne portent que la destination, pour chaque fiche réelle', () => {
    for (const b of [...TOUTES, avecAdresse, communeSeule]) {
      for (const { url } of liensItineraire(b)) {
        const u = new URL(url)
        if (u.protocol === 'geo:') {
          expect([...u.searchParams.keys()]).toEqual(['q'])
          continue
        }
        expect(u.protocol).toBe('https:')
        const permis = PERMIS[u.hostname]
        expect(permis, u.hostname).toBeDefined()
        for (const cle of u.searchParams.keys()) expect(permis).toContain(cle)
      }
    }
  })

  it('mènent à l’adresse écrite', () => {
    const [google, apple, waze, geo] = liensItineraire(avecAdresse).map((l) => new URL(l.url))
    const adresse = avecAdresse.addr
    expect(google.searchParams.get('destination')).toBe(adresse)
    expect(google.searchParams.get('api')).toBe('1')
    expect(apple.searchParams.get('daddr')).toBe(adresse)
    expect(waze.searchParams.get('q')).toBe(adresse)
    expect(waze.searchParams.get('navigate')).toBe('yes')
    expect(geo.href.startsWith('geo:0,0?q=')).toBe(true)
    expect(geo.searchParams.get('q')).toBe(adresse)
  })

  it('ou au point de la commune, en coordonnées : un nom de commune seul a des homonymes', () => {
    const [google, apple, waze, geo] = liensItineraire(communeSeule).map((l) => new URL(l.url))
    expect(google.searchParams.get('destination')).toBe('45.71,4.81')
    expect(apple.searchParams.get('daddr')).toBe('45.71,4.81')
    expect(waze.searchParams.get('ll')).toBe('45.71,4.81')
    expect(geo.href.startsWith('geo:45.71,4.81?q=')).toBe(true)
  })
})

describe('deCommune', () => {
  it('accorde « de » au nom de la commune', async () => {
    const { deCommune } = await import('../../src/core/itineraire')
    expect(deCommune('Brignais')).toBe('de Brignais')
    expect(deCommune('Oullins')).toBe('d’Oullins')
    expect(deCommune('Échirolles')).toBe('d’Échirolles')
    expect(deCommune('Le Grand-Serre')).toBe('du Grand-Serre')
    expect(deCommune('Les Abrets')).toBe('des Abrets')
    expect(deCommune('La Ravoire')).toBe('de La Ravoire')
  })
})
