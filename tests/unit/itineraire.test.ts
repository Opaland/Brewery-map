import { describe, expect, it } from 'vitest'
import { destination, liensItineraire, plateformeDe } from '../../src/core/itineraire'
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

  it('sinon, le point de la fiche — jamais présenté comme l’adresse', () => {
    expect(destination(communeSeule)).toEqual({ mode: 'commune', lat: 45.71, lon: 4.81 })
  })

  it('une rue sans code postal est une adresse (4 fiches réelles, revue code S19)', () => {
    for (const addr of [
      '520 route de Combe Boiron, Saint-Maurice-sur-Dargoire',
      'Casino JOA, Montrond-les-Bains',
      '15 chemin de Pontardieu, Saint-Agrève',
    ]) {
      expect(destination({ ...base, c: 'Chabanière', addr })).toEqual({ mode: 'adresse', adresse: addr })
    }
  })
  it('le code postal et la commune seuls ne sont pas une adresse (S295 : Brasserie du Bugey)', () => {
    const bugey = { ...base, c: 'Hauteville-Lompnes', addr: '01110 Hauteville-Lompnes', lat: 45.97, lon: 5.6, coordPrecision: 'commune' as const }
    expect(destination(bugey)).toEqual({ mode: 'commune', lat: 45.97, lon: 5.6 })
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
  it('proposent quatre applications, dans cet ordre, quand l’appareil est inconnu', () => {
    expect(liensItineraire(avecAdresse).map((l) => l.appli)).toEqual([
      'Google Maps',
      'Plans (Apple)',
      'Waze',
      'Autre application (Android)',
    ])
  })

  it('ne montrent pas un lien qui ne marche pas sur ce téléphone (revue Hugo S19)', () => {
    // iPhone : pas de `geo:` ; Android : Plans (Apple) n'est qu'une page web.
    expect(liensItineraire(avecAdresse, 'ios').map((l) => l.appli)).toEqual([
      'Plans (Apple)',
      'Google Maps',
      'Waze',
    ])
    expect(liensItineraire(avecAdresse, 'android').map((l) => l.appli)).toEqual([
      'Google Maps',
      'Waze',
      'Autre application',
    ])
  })

  it('reconnaît le téléphone à son agent, sans rien envoyer', () => {
    expect(plateformeDe('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)')).toBe('ios')
    expect(plateformeDe('Mozilla/5.0 (Linux; Android 14; Pixel 7)')).toBe('android')
    expect(plateformeDe('Mozilla/5.0 (X11; Linux x86_64)')).toBe('autre')
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
    // Sans libellé : un nom à parenthèses (« La Gaudine (Brasserie de la
    // Semène) ») cassait le `q=lat,lon(nom)` (revue code S19).
    expect(geo.href).toBe('geo:45.71,4.81?q=45.71,4.81')
  })
})

describe('une fiche OpenStreetMap (revue persona S25)', () => {
  const osm: Brasserie = {
    ...base,
    n: 'Karnotzet',
    c: 'Brignais',
    addr: '80 rue des moulins',
    lat: 45.649,
    lon: 4.73051,
    coordPrecision: 'osm',
  }

  it('va toujours au point posé sur OSM, jamais à une adresse sans commune', () => {
    expect(destination(osm)).toEqual({ mode: 'osm', lat: 45.649, lon: 4.73051 })
    const google = liensItineraire(osm, 'android').find((l) => l.appli === 'Google Maps')
    expect(google?.url).toContain('destination=45.649,4.73051')
  })
})
