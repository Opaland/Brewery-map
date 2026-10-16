import { describe, expect, it } from 'vitest'
import type { CommuneFrance, Rectangle } from '../../src/core/communes'
import {
  brasseriesDepuisFichierOsm,
  dejaDansLeFichier,
  estDeOsm,
  noteDeLigne,
  siteOsm,
  lireElementOverpass,
  nomsUniques,
  raisonDEcarter,
  rattacher,
  validerFichierOsm,
  type FichierOsm,
} from '../../src/core/osm-france'

const COMMUNES: CommuneFrance[] = [
  ['Lille', '59', 50.6365, 3.0635],
  ['Wattrelos', '59', 50.7, 3.217],
  ['Porcelette', '57', 49.157, 6.655],
  ['Strasbourg', '67', 48.5734, 7.7521],
]
const RECTANGLES: Record<string, Rectangle> = {
  '59': [50.0, 2.0, 51.1, 4.2],
  '57': [48.5, 5.9, 49.5, 7.6],
  '67': [48.1, 6.9, 49.1, 8.2],
}

describe('lireElementOverpass (S25)', () => {
  it('un nœud nommé : position, adresse, site', () => {
    const c = lireElementOverpass({
      type: 'node',
      id: 42,
      lat: 50.63,
      lon: 3.06,
      tags: {
        craft: 'brewery',
        name: 'Brasserie du Nord',
        'addr:housenumber': '3',
        'addr:street': 'rue de la Bière',
        'addr:postcode': '59000',
        'addr:city': 'Lille',
        website: 'https://exemple.fr',
      },
    })
    expect(c).toEqual({
      osm: 'node/42',
      nom: 'Brasserie du Nord',
      lat: 50.63,
      lon: 3.06,
      cp: '59000',
      ville: 'Lille',
      adresse: '3 rue de la Bière, 59000 Lille',
      site: 'https://exemple.fr',
    })
  })

  it('un chemin : son centre', () => {
    const c = lireElementOverpass({
      type: 'way',
      id: 7,
      center: { lat: 49.1, lon: 6.6 },
      tags: { craft: 'brewery', name: 'Ma Brasserie' },
    })
    expect(c?.lat).toBe(49.1)
    expect(c?.osm).toBe('way/7')
  })

  it('sans nom, ou un site qui n’est pas http(s) : écarté ou ignoré', () => {
    expect(lireElementOverpass({ type: 'node', id: 1, lat: 1, lon: 1, tags: { craft: 'brewery' } })).toBeNull()
    const c = lireElementOverpass({
      type: 'node',
      id: 2,
      lat: 1,
      lon: 1,
      tags: { craft: 'brewery', name: 'X', website: 'javascript:alert(1)' },
    })
    expect(c?.site).toBeUndefined()
  })
})

describe('rattacher à une commune française (S25)', () => {
  it('ville et code postal donnés : gardés, département du code', () => {
    const r = rattacher(
      { osm: 'node/1', nom: 'A', lat: 50.63, lon: 3.06, cp: '59000', ville: 'Lille', adresse: '' },
      COMMUNES,
      RECTANGLES,
    )
    expect(r).toEqual({ commune: 'Lille', dep: '59', deduite: false })
  })

  it('sans ville : la commune la plus proche, dite déduite', () => {
    const r = rattacher({ osm: 'node/1', nom: 'A', lat: 49.16, lon: 6.66, adresse: '' }, COMMUNES, RECTANGLES)
    expect(r).toEqual({ commune: 'Porcelette', dep: '57', deduite: true })
  })

  it('code postal belge (4 chiffres) : hors de France', () => {
    const r = rattacher(
      { osm: 'node/1', nom: 'A', lat: 50.72, lon: 3.25, cp: '7700', ville: 'Mouscron', adresse: '' },
      COMMUNES,
      RECTANGLES,
    )
    expect(r).toEqual({ exclu: 'code postal étranger' })
  })

  it('code postal allemand à 5 chiffres : loin de son « département », hors de France', () => {
    // 66111 Sarrebruck se lirait « 66 », les Pyrénées-Orientales.
    const r = rattacher(
      { osm: 'node/1', nom: 'A', lat: 49.23, lon: 6.99, cp: '66111', ville: 'Saarbrücken', adresse: '' },
      COMMUNES,
      { ...RECTANGLES, '66': [42.3, 1.7, 42.9, 3.2] },
    )
    expect(r).toEqual({ exclu: 'code postal étranger' })
  })

  it('pays indiqué autre que la France : écarté', () => {
    const r = rattacher(
      { osm: 'node/1', nom: 'A', lat: 50.7, lon: 3.2, pays: 'BE', adresse: '' },
      COMMUNES,
      RECTANGLES,
    )
    expect(r).toEqual({ exclu: 'pays étranger' })
  })

  it('à plus de 10 km de toute commune : écarté (mer, étranger)', () => {
    const r = rattacher({ osm: 'node/1', nom: 'A', lat: 51.5, lon: 1.0, adresse: '' }, COMMUNES, RECTANGLES)
    expect(r).toEqual({ exclu: 'loin de toute commune française' })
  })
})

describe('nomsUniques (S25 : les favoris et la sélection tiennent au nom)', () => {
  it('deux homonymes : la commune entre parenthèses ; puis l’objet OSM', () => {
    expect(
      nomsUniques([
        { n: 'Brasserie artisanale', c: 'Rennes', osm: 'node/1' },
        { n: 'Brasserie artisanale', c: 'Brest', osm: 'node/2' },
        { n: 'Brasserie artisanale', c: 'Brest', osm: 'node/3' },
        { n: 'Unique', c: 'Lyon', osm: 'node/4' },
      ]).map((x) => x.n),
    ).toEqual([
      'Brasserie artisanale (Rennes)',
      'Brasserie artisanale (Brest, node/2)',
      'Brasserie artisanale (Brest, node/3)',
      'Unique',
    ])
  })

  it('un nom déjà pris par le fichier : distingué aussi', () => {
    expect(nomsUniques([{ n: 'Ninkasi', c: 'Paris', osm: 'node/9' }], new Set(['Ninkasi'])).map((x) => x.n)).toEqual([
      'Ninkasi (Paris)',
    ])
  })
})

describe('le fichier OSM devient des fiches « À confirmer » (S25)', () => {
  const fichier: FichierOsm = {
    source: 'OpenStreetMap',
    licence: 'ODbL 1.0',
    extrait: '2026-10-16T21:53:51Z',
    brasseries: [
      ['Brasserie du Nord', 'node/42', 'Lille', '59', 50.63, 3.06, '3 rue de la Bière, 59000 Lille', 'https://exemple.fr', 0],
      ['Brasserie des Champs', 'way/7', 'Porcelette', '57', 49.16, 6.66, '', '', 1],
    ],
  }

  it('valide : catégorie 0, la source est l’objet OSM, le point est celui d’OSM', () => {
    const v = validerFichierOsm(fichier, new Set())
    expect(v.ok).toBe(true)
    const [nord, champs] = brasseriesDepuisFichierOsm(fichier)
    expect(nord).toMatchObject({
      n: 'Brasserie du Nord',
      c: 'Lille',
      d: '59',
      cat: 0,
      src: 'https://www.openstreetmap.org/node/42',
      coordPrecision: 'osm',
      addr: '3 rue de la Bière, 59000 Lille',
    })
    // La commune déduite est dite, pas affirmée.
    expect(champs.note).toContain('commune est déduite')
    expect(nord.note).not.toContain('commune est déduite')
    // Sans adresse : la commune, comme les fiches du fichier.
    expect(champs.addr).toBe('Porcelette')
  })

  it('refuse un nom déjà pris par le fichier, un doublon, un objet OSM mal formé', () => {
    expect(validerFichierOsm(fichier, new Set(['Brasserie du Nord'])).ok).toBe(false)
    const doublon = { ...fichier, brasseries: [fichier.brasseries[0], fichier.brasseries[0]] }
    expect(validerFichierOsm(doublon, new Set()).ok).toBe(false)
    const malForme = { ...fichier, brasseries: [['X', 'javascript:alert(1)', 'Lille', '59', 50, 3, '', '', 0]] }
    expect(validerFichierOsm(malForme, new Set()).ok).toBe(false)
    const siteDouteux = { ...fichier, brasseries: [['X', 'node/1', 'Lille', '59', 50, 3, '', 'javascript:alert(1)', 0]] }
    expect(validerFichierOsm(siteDouteux, new Set()).ok).toBe(false)
  })
})

describe('dejaDansLeFichier (S25 : un même lieu sous deux noms voisins)', () => {
  const fiche = (n: string, lat: number, lon: number) =>
    ({ n, c: 'X', d: '69', lat, lon }) as unknown as import('../../src/core/schema').Brasserie
  const fichier = [fiche('Caribrew', 45.67, 4.7), fiche('Brasserie Georges', 45.75, 4.83)]

  it('« Microbrasserie Caribrew » à 7 km de « Caribrew » : la même', () => {
    expect(dejaDansLeFichier({ nom: 'Microbrasserie Caribrew', lat: 45.67, lon: 4.79 }, fichier)).toBe('Caribrew')
  })

  it('« Chez Georges » à 400 km de « Brasserie Georges » : une autre', () => {
    expect(dejaDansLeFichier({ nom: 'Chez Georges', lat: 48.2, lon: 7.8 }, fichier)).toBeUndefined()
  })
})

describe('raisonDEcarter (revue persona S25 : « brasserie » est aussi un restaurant)', () => {
  it('un nom de restauration l’emporte, sauf s’il dit aussi la bière', () => {
    expect(raisonDEcarter('Tutti Pizza', { product: 'beer' })).toBe('restauration')
    expect(raisonDEcarter("Restaurant de l'Etoile", {})).toBe('restauration')
    expect(raisonDEcarter('Brasserie-Restaurant du Lac', {})).toBeUndefined()
  })
  it('un café, un bar, un restaurant selon OSM, sans rien qui dise qu’il brasse : écarté', () => {
    expect(raisonDEcarter('Le Gambetta', { amenity: 'restaurant' })).toBe('restauration')
    expect(raisonDEcarter('Le Gambetta', { amenity: 'restaurant', microbrewery: 'yes' })).toBeUndefined()
    expect(raisonDEcarter('Kataclysm', {})).toBeUndefined()
  })
  it('un nom qui dit « ancienne », « incertaine », « fermée » : écarté', () => {
    expect(raisonDEcarter('Ancienne brasserie-malterie de la Lys', {})).toBe('fermée ou incertaine')
    expect(raisonDEcarter('Arvarus, brasserie incertaine', {})).toBe('fermée ou incertaine')
  })
})

describe('lireElementOverpass : noms multiples', () => {
  it('« Maison PIP;Maison Pip » : le premier', () => {
    const c = lireElementOverpass({ type: 'node', id: 3, lat: 1, lon: 1, tags: { name: 'Maison PIP;Maison Pip' } })
    expect(c?.nom).toBe('Maison PIP')
  })
})

describe('affichage d’une fiche OSM (revue persona S25)', () => {
  const f: FichierOsm = {
    source: '',
    licence: '',
    extrait: '',
    brasseries: [['Brasserie du Nord', 'node/42', 'Lille', '59', 50.63, 3.06, '', 'https://exemple.fr', 1]],
  }
  const [b] = brasseriesDepuisFichierOsm(f)

  it('se reconnaît, garde son site, a une note courte pour la liste', () => {
    expect(estDeOsm(b)).toBe(true)
    expect(siteOsm(b)).toBe('https://exemple.fr')
    expect(noteDeLigne(b)).toBe('Repérée sur OpenStreetMap ; rien d’autre n’est vérifié. Commune déduite de sa position.')
  })
})
