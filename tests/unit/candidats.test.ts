import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  ajoutDeLecture,
  assemblerLot,
  candidatsDuDepartement,
  classerDuDepartement,
  positionDuGeocodeur,
  prefixePostal,
  publiables,
  type EtablissementSirene,
} from '../../src/core/candidats'
import type { CandidatOsm } from '../../src/core/decouverte'
import type { Brasserie } from '../../src/core/schema'

/** S246 : l'outil « département ». Données inventées pour le test seulement. */
const etab = (e: Partial<EtablissementSirene> & Pick<EtablissementSirene, 'siren' | 'siret'>): EtablissementSirene => ({
  entrepreneurIndividuel: false,
  raisonSociale: 'BRASSERIE TEST',
  enseignes: [],
  adresse: '1 rue de la Gare 50200 COUTANCES',
  commune: 'COUTANCES',
  codePostal: '50200',
  lat: 49.05,
  lon: -1.44,
  ...e,
})

const point = (c: Partial<CandidatOsm> & Pick<CandidatOsm, 'osm' | 'nom'>): CandidatOsm => ({
  lat: 49.05,
  lon: -1.44,
  commune: 'Coutances',
  departement: '50',
  adresse: '50200 Coutances',
  ...c,
})

describe('candidatsDuDepartement (S246)', () => {
  it('CA1 : SIRENE et OSM, même commune, même cœur de nom → un seul candidat, deux sources', () => {
    const c = candidatsDuDepartement(
      [etab({ siren: '111', siret: '11100001', raisonSociale: 'BRASSERIE BIFROST', commune: 'SAINT-LO' })],
      [point({ osm: 'node/1', nom: 'Bifrost', commune: 'Saint-Lô' })],
    )
    expect(c).toHaveLength(1)
    expect(c[0]?.sources).toEqual(['sirene', 'osm'])
    expect(c[0]?.osm).toEqual(['node/1'])
    expect(c[0]?.sirets).toEqual(['11100001'])
  })

  it('CA1 (témoin) : même nom, autre commune → deux candidats', () => {
    const c = candidatsDuDepartement(
      [etab({ siren: '111', siret: '11100001', raisonSociale: 'BRASSERIE BIFROST', commune: 'SAINT-LO' })],
      [point({ osm: 'node/1', nom: 'Bifrost', commune: 'Avranches' })],
    )
    expect(c).toHaveLength(2)
  })

  it('CA2 : deux établissements d’une même entreprise → un candidat, deux adresses', () => {
    const c = candidatsDuDepartement(
      [
        etab({ siren: '222', siret: '22200001', raisonSociale: 'ECUME DES FALAISES', commune: 'DONVILLE-LES-BAINS', adresse: 'A' }),
        etab({ siren: '222', siret: '22200002', raisonSociale: 'ECUME DES FALAISES', commune: 'JULLOUVILLE', adresse: 'B' }),
      ],
      [],
    )
    expect(c).toHaveLength(1)
    expect(c[0]?.adresses).toEqual(['A', 'B'])
    expect(c[0]?.communes).toEqual(['DONVILLE-LES-BAINS', 'JULLOUVILLE'])
  })

  it('CA3 : un entrepreneur individuel sans enseigne n’a pas de nom — jamais celui de la personne', () => {
    const c = candidatsDuDepartement(
      [etab({ siren: '333', siret: '33300001', entrepreneurIndividuel: true, raisonSociale: 'JEAN DUPONT' })],
      [],
    )
    expect(c[0]?.nom).toBeNull()
    expect(JSON.stringify(c)).not.toContain('DUPONT')
  })

  it('CA3 : son enseigne, s’il en a une, est son nom', () => {
    const c = candidatsDuDepartement(
      [
        etab({
          siren: '333',
          siret: '33300001',
          entrepreneurIndividuel: true,
          raisonSociale: 'JEAN DUPONT',
          enseignes: ['MALT DE GORGES'],
        }),
      ],
      [],
    )
    expect(c[0]?.nom).toBe('MALT DE GORGES')
    expect(JSON.stringify(c)).not.toContain('DUPONT')
  })
})

const fiche = (n: string, c: string): Brasserie =>
  ({ n, c, d: '50', lat: 49.05, lon: -1.44 }) as unknown as Brasserie

describe('classerDuDepartement (S246)', () => {
  it('CA4 : une brasserie déjà dans le fichier, même commune, est « présente »', () => {
    const c = candidatsDuDepartement([], [point({ osm: 'node/9', nom: 'Brasserie Bifrost', commune: 'Saint-Lô' })])
    const [r] = classerDuDepartement(c, [fiche('Bifrost', 'Saint-Lô')])
    expect(r.statut).toBe('present')
  })

  it('un candidat sans nom n’est pas classé par son nom, et deux sans nom ne sont pas des doublons', () => {
    const c = candidatsDuDepartement(
      [
        etab({ siren: '1', siret: '10001', entrepreneurIndividuel: true, raisonSociale: 'A B' }),
        etab({ siren: '2', siret: '20001', entrepreneurIndividuel: true, raisonSociale: 'C D' }),
      ],
      [],
    )
    const r = classerDuDepartement(c, [])
    expect(r.map((x) => x.statut)).toEqual(['nom-a-etablir', 'nom-a-etablir'])
  })
})

describe('assemblerLot (S246)', () => {
  const ajoutValide = {
    fiche: {
      n: 'Bifrost',
      c: 'Saint-Lô',
      d: '50',
    },
    verifieLe: '2026-10-17',
    sources: ['https://exemple.fr/bifrost'],
    extrait: 'Brasserie artisanale à Saint-Lô.',
  }

  it('CA5 : une lecture valide devient un ajout', () => {
    // Une vraie ligne du fichier, renommée : valide au schéma par construction.
    // La précision est posée : la ligne réelle peut être au centre IGN (S268),
    // qui exige sa requête de commune (S269).
    const [ligne] = (JSON.parse(readFileSync('data/breweries.json', 'utf8')) as Record<string, unknown>[]).map((b) => ({ ...b, coordPrecision: 'commune' }))
    const fiche = Object.fromEntries(
      Object.entries({ ...ligne, n: 'Brasserie de test S246' }).filter(([k]) => k !== 'verifieLe'),
    )
    const ajout = { fiche, verifieLe: '2026-10-17', sources: ['https://exemple.fr/'], extrait: 'Lu sur la page.' }
    const { lot, refus } = assemblerLot('dep-50', [{ candidat: 'node/1', ajout }], { cles: ['node/1'], noms: [] })
    expect(refus).toEqual([])
    expect(lot.ajouts).toHaveLength(1)
  })

  it('CA5 : une lecture invalide est rendue avec sa raison, jamais gardée', () => {
    const { lot, refus } = assemblerLot('dep-50', [{ candidat: 'sirene:111', ajout: { ...ajoutValide, sources: [] } }], {
      cles: ['sirene:111'],
      noms: [],
    })
    expect(lot.ajouts ?? []).toHaveLength(0)
    expect(refus).toHaveLength(1)
    expect(refus[0]?.candidat).toBe('sirene:111')
    expect(refus[0]?.raison).not.toBe('')
  })
})

/** Revue adverse S246 : ce qui se publie, et ce que la fusion manquait. */
describe('revue adverse S246', () => {
  const ei = etab({ siren: '943984534', siret: '94398453400017', entrepreneurIndividuel: true, raisonSociale: 'JEAN DUPONT', lat: 49.2645368571888, lon: -1.38619096362329 })

  it('un candidat sans nom ne publie ni position, ni SIREN, ni SIRET, ni adresse', () => {
    const { publies, correspondance } = publiables(classerDuDepartement(candidatsDuDepartement([ei], []), []))
    const texte = JSON.stringify(publies)
    for (const fuite of ['943984534', '94398453400017', '49.26', '-1.38', 'DUPONT', '1 rue de la Gare']) expect(texte).not.toContain(fuite)
    expect(publies[0]?.cle).toBe('personne:1')
    // La correspondance reste locale (cache ignoré) : la lecture retrouve l'adresse.
    expect(correspondance['personne:1']).toBe('sirene:943984534')
  })

  it('un entrepreneur individuel avec enseigne ne publie ni SIREN ni SIRET', () => {
    const avecEnseigne = { ...ei, enseignes: ['MALT DE GORGES'] }
    const { publies } = publiables(classerDuDepartement(candidatsDuDepartement([avecEnseigne], []), []))
    expect(publies[0]?.nom).toBe('MALT DE GORGES')
    expect(JSON.stringify(publies)).not.toContain('943984534')
  })

  it('sans nature juridique connue, on suppose une personne', () => {
    const inconnu = etab({ siren: '5', siret: '50001', entrepreneurIndividuel: undefined, raisonSociale: 'JEANNE MARTIN' })
    expect(candidatsDuDepartement([inconnu], [])[0]?.nom).toBeNull()
  })

  it('même commune, même adresse : un seul candidat même si les noms diffèrent un peu', () => {
    const c = candidatsDuDepartement(
      [etab({ siren: '844', siret: '84400001', raisonSociale: 'LES TRAVAILLEURS DE LA MER', commune: 'LES PIEUX', adresse: '23 ROUTE DE CHERBOURG 50340 LES PIEUX' })],
      [point({ osm: 'way/1', nom: "Les Travailleurs de l'Amer", commune: 'Les Pieux', adresse: '23 Route de Cherbourg, 50340 Les Pieux' })],
    )
    expect(c).toHaveLength(1)
    expect(c[0]?.osm).toEqual(['way/1'])
  })

  it('deux points OSM d’une même brasserie rejoignent le même candidat', () => {
    const c = candidatsDuDepartement(
      [etab({ siren: '4', siret: '40001', raisonSociale: 'BRASSERIE BIFROST', commune: 'SAINT-LO' })],
      [point({ osm: 'node/1', nom: 'Bifrost', commune: 'Saint-Lô' }), point({ osm: 'way/2', nom: 'Bifrost brasserie', commune: 'Saint-Lô' })],
    )
    expect(c).toHaveLength(1)
    expect(c[0]?.osm).toEqual(['node/1', 'way/2'])
  })

  it('même nom dans deux communes : « ambigu » et proposé, pas écarté comme doublon', () => {
    const c = candidatsDuDepartement(
      [etab({ siren: '441', siret: '44100001', raisonSociale: 'BRASSERIE DE LA BAIE', commune: 'PONTORSON' })],
      [point({ osm: 'node/7', nom: 'Brasserie de la Baie', commune: 'Huisnes-sur-Mer' })],
    )
    const r = classerDuDepartement(c, [])
    expect(r.map((x) => x.statut)).toEqual(['nouveau', 'ambigu'])
  })

  it('un candidat à deux communes est « présent » si la fiche est dans la seconde', () => {
    const c = candidatsDuDepartement(
      [
        etab({ siren: '9', siret: '90001', raisonSociale: 'ECUME', commune: 'DONVILLE-LES-BAINS' }),
        etab({ siren: '9', siret: '90002', raisonSociale: 'ECUME', commune: 'JULLOUVILLE' }),
      ],
      [],
    )
    expect(classerDuDepartement(c, [fiche('Ecume', 'Jullouville')])[0]?.statut).toBe('present')
  })

  it('CA4 : un nom SIRENE en majuscules contre une fiche accentuée est « présent »', () => {
    const c = candidatsDuDepartement([etab({ siren: '1', siret: '10001', raisonSociale: 'BRASSERIE BIFROST', commune: 'SAINT-LO' })], [])
    expect(classerDuDepartement(c, [fiche('Bifrost', 'Saint-Lô')])[0]?.statut).toBe('present')
  })

  it('la Corse : les codes postaux commencent par 20', () => {
    expect(prefixePostal('2A')).toBe('20')
    expect(prefixePostal('2B')).toBe('20')
    expect(prefixePostal('50')).toBe('50')
  })
})

describe('assemblerLot, revue adverse S246', () => {
  // La précision est posée : la ligne réelle peut être au centre IGN (S268),
    // qui exige sa requête de commune (S269).
    const [ligne] = (JSON.parse(readFileSync('data/breweries.json', 'utf8')) as Record<string, unknown>[]).map((b) => ({ ...b, coordPrecision: 'commune' }))
  const ajout = (n: string) => ({
    fiche: Object.fromEntries(Object.entries({ ...ligne, n }).filter(([k]) => k !== 'verifieLe')),
    verifieLe: '2026-10-17',
    sources: ['https://exemple.fr/'],
    extrait: 'Lu sur la page.',
  })

  it('refuse un candidat inconnu, une seconde lecture du même candidat, un nom répété ou déjà dans le fichier', () => {
    const { lot, refus } = assemblerLot(
      'dep-50',
      [
        { candidat: 'sirene:111', ajout: ajout('Une') },
        { candidat: 'sirene:111', ajout: ajout('Deux') },
        { candidat: 'sirene:999', ajout: ajout('Trois') },
        { candidat: 'node/2', ajout: ajout('Une') },
        { candidat: 'node/3', ajout: ajout('Ninkasi Brignais') },
      ],
      { cles: ['sirene:111', 'node/2', 'node/3'], noms: ['Ninkasi Brignais'] },
    )
    expect(lot.ajouts?.map((a) => a.fiche.n)).toEqual(['Une'])
    expect(refus.map((r) => r.candidat)).toEqual(['sirene:111', 'sirene:999', 'node/2', 'node/3'])
  })
})

describe('positionDuGeocodeur (S248)', () => {
  // Raté du 17/10 : « 37 rue Louis Blériot, Martin-Église » géocodé à
  // Bruay-la-Buissière (62). Revue adverse : la commune n'était pas vérifiée
  // (« Sainte-Marguerite » rendait Sainte-Marguerite-sur-Duclair).
  const res = (city: string, context: string, type: string, x = 1.15, y = 49.9, postcode = '76200') => ({
    geometry: { coordinates: [x, y] },
    properties: { city, context, type, postcode },
  })
  const rep = (...features: unknown[]) => ({ features })

  it('accepte un numéro de voie de la bonne commune et du bon département', () => {
    expect(positionDuGeocodeur(rep(res('Martin-Église', '76, Seine-Maritime, Normandie', 'housenumber')), '76', 'Martin-Église')).toEqual({
      lat: 49.9,
      lon: 1.15,
      precision: 'address',
    })
  })
  it('refuse un résultat d’un autre département', () => {
    expect(positionDuGeocodeur(rep(res('Martin-Église', '62, Pas-de-Calais, Hauts-de-France', 'housenumber')), '76', 'Martin-Église')).toBeNull()
  })
  it('refuse une autre commune du même département (noms proches)', () => {
    const r = rep(res('Sainte-Marguerite-sur-Duclair', '76, Seine-Maritime, Normandie', 'municipality'))
    expect(positionDuGeocodeur(r, '76', 'Sainte-Marguerite', 'commune')).toBeNull()
  })
  it('compare les communes sans accents ni casse', () => {
    const r = rep(res('Saint-Lô', '50, Manche, Normandie', 'housenumber'))
    expect(positionDuGeocodeur(r, '50', 'SAINT-LO')).not.toBeNull()
  })
  it('une rue sans numéro n’est pas une position « à l’adresse »', () => {
    expect(positionDuGeocodeur(rep(res('Martin-Église', '76, Seine-Maritime, Normandie', 'street')), '76', 'Martin-Église')).toBeNull()
  })
  it('une commune, demandée comme telle, est une position « commune »', () => {
    const r = rep(res('Martin-Église', '76, Seine-Maritime, Normandie', 'municipality'))
    expect(positionDuGeocodeur(r, '76', 'Martin-Église', 'commune')).toEqual({ lat: 49.9, lon: 1.15, precision: 'commune' })
  })
  it('garde la première réponse qui convient (communes homonymes)', () => {
    const r = rep(
      res('Saint-Arnoult', '76, Seine-Maritime, Normandie', 'municipality', 0.66, 49.54),
      res('Saint-Arnoult', '14, Calvados, Normandie', 'municipality', 0.08, 49.33),
    )
    expect(positionDuGeocodeur(r, '14', 'Saint-Arnoult', 'commune')).toEqual({ lat: 49.33, lon: 0.08, precision: 'commune' })
  })
  it('la Corse : 2A et 2B se distinguent par le contexte, pas par le code postal', () => {
    const r = rep(res('Bastia', '2B, Haute-Corse, Corse', 'housenumber', 9.45, 42.7, '20200'))
    expect(positionDuGeocodeur(r, '2B', 'Bastia')).not.toBeNull()
    expect(positionDuGeocodeur(r, '2A', 'Bastia')).toBeNull()
  })
  it('une réponse vide ou mal formée ne donne rien', () => {
    expect(positionDuGeocodeur({ features: [] }, '76', 'X')).toBeNull()
    expect(positionDuGeocodeur({}, '76', 'X')).toBeNull()
  })
})

describe('ajoutDeLecture (S261)', () => {
  const lecture = {
    cle: 'sirene:1',
    n: 'Brasserie de test',
    c: 'Ploumoguer',
    adresse: null,
    cat: 0,
    conf: '',
    note: 'Rien d’établi.',
    src: 'https://exemple.fr/',
    extrait: 'Brasserie de test',
    beers: [],
  }
  const pos = { lat: 48.4, lon: -4.7, precision: 'commune' as const }

  it('S269 : placée au centre de sa commune, la fiche dit « centre » et cite la requête de commune', () => {
    const mairie = 'https://data.geopf.fr/geocodage/search?q=Ploumoguer&type=municipality&limit=5'
    const { ajout } = ajoutDeLecture(lecture, '29', pos, mairie, '2026-10-17')
    expect(ajout.fiche.coordPrecision).toBe('centre')
    expect(ajout.sources).toEqual(['https://exemple.fr/', mairie])
  })

  it('CA1 : le contact lu entre dans la fiche, daté du jour, et sa source parmi les sources', () => {
    const contact = { tel: '09 81 00 11 08', untappd: 'https://untappd.com/Arvarus', source: 'https://exemple.fr/contact' }
    const { ajout } = ajoutDeLecture({ ...lecture, contact }, '29', pos, undefined, '2026-10-17')
    expect(ajout.fiche.contact).toEqual({ ...contact, verifieLe: '2026-10-17' })
    expect(ajout.sources).toEqual(['https://exemple.fr/', 'https://exemple.fr/contact'])
  })

  it('CA1 : une source de contact déjà citée ne se répète pas ; la requête du géocodeur suit', () => {
    const contact = { site: 'https://exemple.fr/', source: 'https://exemple.fr/' }
    const g = 'https://data.geopf.fr/geocodage/search?q=x'
    const { ajout } = ajoutDeLecture({ ...lecture, contact }, '29', pos, g, '2026-10-17')
    expect(ajout.sources).toEqual(['https://exemple.fr/', g])
  })

  it('CA1 : sans contact, la fiche n’en a pas', () => {
    const { candidat, ajout } = ajoutDeLecture(lecture, '29', pos, undefined, '2026-10-17')
    expect(candidat).toBe('sirene:1')
    expect('contact' in ajout.fiche).toBe(false)
  })
})

describe('ajoutDeLecture : les horaires (S262)', () => {
  const lecture = {
    cle: 'sirene:2',
    n: 'Brasserie de test',
    c: 'Plouguin',
    adresse: null,
    cat: 1,
    conf: 'moyenne',
    note: 'Bar le vendredi.',
    src: 'https://exemple.fr/',
    extrait: 'Bar le vendredi',
    beers: [],
  }
  const pos = { lat: 48.5, lon: -4.6, precision: 'commune' as const }

  it('CA1 : les blocs lus entrent dans la fiche, datés du jour, et leurs sources parmi les sources', () => {
    const horaires = [{ nature: 'accueil' as const, ven: [['16:00', '22:00']] as [string, string][], source: 'https://exemple.fr/horaires' }]
    const { ajout } = ajoutDeLecture({ ...lecture, horaires }, '29', pos, undefined, '2026-10-17')
    expect(ajout.fiche.horaires).toEqual([{ ...horaires[0], verifieLe: '2026-10-17' }])
    expect(ajout.sources).toEqual(['https://exemple.fr/', 'https://exemple.fr/horaires'])
  })

  it('CA1 : sans horaires, la fiche n’en a pas', () => {
    expect('horaires' in ajoutDeLecture(lecture, '29', pos, undefined, '2026-10-17').ajout.fiche).toBe(false)
  })
})
