import { describe, expect, it } from 'vitest'
import { BRIGNAIS } from '../../src/core/distance'
import {
  compterParDepartement,
  favorisCaches,
  favorisFermes,
  listeCourte,
  normaliser,
  plusProche,
  rechercher,
  rechercherPartout,
  videAussiSans,
  raisonsDEcart,
  libelleRaison,
  favorisASignaler,
  jugeablesCeWeekEnd,
  type Criteres,
} from '../../src/core/recherche'
import { TYPES_BIERE } from '../../src/core/bieres'
import { prochainWeekEnd } from '../../src/core/horaires'
import type { Brasserie } from '../../src/core/schema'
import { LIGNES_REELLES } from './lignes-reelles'

const TOUTES = LIGNES_REELLES as unknown as Brasserie[]
const TOUTES_CATEGORIES = [0, 1, 2, 3] as const

const base = {
  origine: BRIGNAIS,
  rayonKm: 100,
  texte: '',
  categories: TOUTES_CATEGORIES,
}

describe('normaliser', () => {
  it('décompose les ligatures : « baroeul » trouve Marcq-en-Barœul (S24)', () => {
    expect(normaliser('Marcq-en-Barœul')).toBe('marcq en baroeul')
    expect(normaliser('ÆSIR Cœur')).toBe('aesir coeur')
  })

  it('ignore la casse, les accents et les tirets', () => {
    expect(normaliser('Soucieu-en-Jarrest')).toBe(normaliser('soucieu en jarrest'))
    expect(normaliser('Vénissieux')).toBe('venissieux')
    expect(normaliser("Bulles d'Orge")).toBe(normaliser('bulles d’orge'))
  })
})

describe('rechercher', () => {
  it('trie par distance calculée, la plus proche d’abord', () => {
    const noms = rechercher(TOUTES, base).map((r) => r.brasserie.n)
    expect(noms).toEqual(['Caribrew', "Bulles d'Orge", 'La Beer Fabrique', 'Tom & Co'])
  })

  it('calcule la distance depuis l’origine, sans lire le champ km', () => {
    const faux = TOUTES.map((b) => ({ ...b, km: 999 }))
    const premier = rechercher(faux, base)[0]
    // Caribrew, référence Python (haversine, R = 6371 km) : 5,339 km.
    expect(premier.distanceKm).toBeCloseTo(5.339, 2)
  })

  it('un nom tapé cherche partout, au-delà du rayon (demande de Cédric du 16/10)', () => {
    const loin = rechercher(TOUTES, { ...base, rayonKm: 5, texte: 'tom' }).map((r) => r.brasserie.n)
    expect(loin).toContain('Tom & Co')
    expect(rechercherPartout({ texte: 'tom' })).toBe(true)
    expect(rechercherPartout({ texte: '  ' })).toBe(false)
    // Une ponctuation seule ne cherche rien : elle ne lève pas le rayon
    // (revue globale S22 : « - » donnait 166 brasseries « toutes distances »).
    for (const texte of ['-', "'", ' . ']) expect(rechercherPartout({ texte })).toBe(false)
    expect(rechercher(TOUTES, { ...base, rayonKm: 5, texte: '-' })).toHaveLength(
      rechercher(TOUTES, { ...base, rayonKm: 5, texte: '' }).length,
    )
  })

  it('exclut ce qui est au-delà du rayon', () => {
    const noms = rechercher(TOUTES, { ...base, rayonKm: 10 }).map((r) => r.brasserie.n)
    expect(noms).toEqual(['Caribrew', "Bulles d'Orge"])
  })

  it('trouve par commune, sans accent ni casse', () => {
    const noms = rechercher(TOUTES, { ...base, texte: 'soucieu' }).map((r) => r.brasserie.n)
    expect(noms).toEqual(['Caribrew'])
  })

  it('trouve par nom', () => {
    const noms = rechercher(TOUTES, { ...base, texte: 'beer fab' }).map((r) => r.brasserie.n)
    expect(noms).toEqual(['La Beer Fabrique'])
  })

  it('exige tous les mots, dans le nom ou la commune', () => {
    expect(rechercher(TOUTES, { ...base, texte: 'tom lyon' }).map((r) => r.brasserie.n)).toEqual([
      'Tom & Co',
    ])
    expect(rechercher(TOUTES, { ...base, texte: 'tom oullins' })).toEqual([])
  })

  it('filtre par catégorie de vente', () => {
    const noms = rechercher(TOUTES, { ...base, categories: [0, 2] }).map((r) => r.brasserie.n)
    expect(noms).toEqual(["Bulles d'Orge", 'Tom & Co'])
  })

  it('ne rend rien si aucune catégorie n’est cochée', () => {
    expect(rechercher(TOUTES, { ...base, categories: [] })).toEqual([])
  })
})

describe('rechercher — formes courantes d’un nom', () => {
  const avec = (n: string, c: string): Brasserie => ({ ...TOUTES[0], n, c })
  const ninkasi = avec('Ninkasi Saint-Étienne', 'Saint-Étienne')
  const stephanoise = avec('Brasserie Stéphanoise', 'Saint-Étienne')
  const brassin = avec("Le Brass'in", 'Fontaines-sur-Saône')
  const lot = [ninkasi, stephanoise, brassin]
  const noms = (texte: string) => rechercher(lot, { ...base, texte }).map((r) => r.brasserie.n)

  it('« st » vaut « saint »', () => {
    expect(noms('ninkasi st etienne')).toEqual(['Ninkasi Saint-Étienne'])
  })

  it('un nom à apostrophe se trouve aussi collé', () => {
    expect(noms('brassin')).toEqual(["Le Brass'in"])
    expect(noms("brass'in")).toEqual(["Le Brass'in"])
  })
})

describe('favoris seulement (S9)', () => {
  it('ne garde que les noms demandés, avec les autres filtres', () => {
    const seulement = new Set(['Tom & Co', 'Caribrew'])
    const noms = rechercher(TOUTES, { ...base, seulement }).map((r) => r.brasserie.n)
    expect(noms).toEqual(['Caribrew', 'Tom & Co'])
    expect(rechercher(TOUTES, { ...base, seulement, rayonKm: 10 }).map((r) => r.brasserie.n)).toEqual([
      'Caribrew',
    ])
  })

  it('aucun favori : aucun résultat, pas tout', () => {
    expect(rechercher(TOUTES, { ...base, seulement: new Set() })).toEqual([])
  })
})

describe('favoris cachés par les autres filtres', () => {
  it('compte les favoris des données absents des résultats, pas ceux disparus des données', () => {
    const favoris = ['Tom & Co', 'Caribrew', 'Disparue']
    expect(favorisCaches(TOUTES, favoris, { ...base, rayonKm: 10 }).map((c) => c.nom)).toEqual(['Tom & Co'])
  })

  it('S301 CA2 : dit la raison, et signale aussi hors du mode « seulement »', () => {
    const caches = favorisCaches(TOUTES, ['Tom & Co'], { ...base, rayonKm: 10 })
    expect(caches.at(0)?.raisons).toEqual([{ type: 'distance', km: expect.any(Number) as number, rayonKm: 10 }])
    // En mode « seulement », « pas un favori » n'est jamais donné pour un favori.
    const seul = favorisCaches(TOUTES, ['Tom & Co'], { ...base, rayonKm: 10, seulement: new Set(['Tom & Co']) })
    expect(seul[0]?.raisons.map((r) => r.type)).toEqual(['distance'])
  })
})

describe('S70 CA3 : ouvertes ce week-end, par la garde unique', () => {
  const tom = TOUTES.find((b) => b.n === 'Tom & Co')
  if (tom === undefined) throw new Error('Tom & Co attendue dans lignes-reelles')
  const src = { source: 'https://exemple.fr/h', verifieLe: '2026-10-16' }
  const weekEnd = [
    { cle: 'sam', mmjj: '10-24', annee: 2026 },
    { cle: 'dim', mmjj: '10-25', annee: 2026 },
  ] as const
  const avec = (horaires: Brasserie['horaires']) => ({ ...tom, horaires })
  const raisons = (b: Brasserie) => raisonsDEcart(b, { ...base, weekEnd }).map((r) => r.type)

  it('garde une brasserie ouverte samedi ou dimanche, par l’accueil ou la vente', () => {
    expect(raisons(avec([{ nature: 'accueil', sam: [['15:00', '22:00']], ...src }]))).toEqual([])
    expect(raisons(avec([{ nature: 'vente', dim: 'heures-non-precisees', ...src }]))).toEqual([])
    expect(raisons(avec([{ nature: 'accueil', sam: [['15:00', '22:00']], remarque: 'sur rendez-vous', ...src }]))).toEqual([])
  })

  it('écarte une brasserie fermée ce week-end, ou qui ne publie pas ses horaires, et le dit', () => {
    const fermee = raisonsDEcart(avec([{ nature: 'accueil', sam: [], dim: [], ...src }]), { ...base, weekEnd })
    expect(fermee).toEqual([{ type: 'week-end', motif: 'fermee' }])
    const sans = raisonsDEcart(avec(undefined), { ...base, weekEnd })
    expect(sans).toEqual([{ type: 'week-end', motif: 'sans-horaires' }])
    expect(libelleRaison(fermee[0] ?? { type: 'texte' })).toBe('fermée ce week-end d’après ses horaires')
    expect(libelleRaison(sans[0] ?? { type: 'texte' })).toBe('pas d’horaires publiés')
  })

  it('revue adverse : des horaires de semaine seuls ne disent pas « fermée » le week-end', () => {
    const semaine = raisonsDEcart(avec([{ nature: 'accueil', lun: [['10:00', '18:00']], ...src }]), { ...base, weekEnd })
    expect(semaine).toEqual([{ type: 'week-end', motif: 'muette' }])
    expect(libelleRaison(semaine[0] ?? { type: 'texte' })).toBe('ses horaires ne disent rien du week-end')
    // Fermée le samedi, dimanche non dit : le week-end n'est pas « fermé ».
    const samediSeul = raisonsDEcart(avec([{ nature: 'accueil', sam: [], ...src }]), { ...base, weekEnd })
    expect(samediSeul).toEqual([{ type: 'week-end', motif: 'muette' }])
  })

  it('revue adverse : le filtre compte les fiches qu’il peut juger', () => {
    const ouverte = avec([{ nature: 'accueil', sam: [['15:00', '22:00']], ...src }])
    const fermee = avec([{ nature: 'vente', sam: [], dim: [], ...src }])
    const semaine = avec([{ nature: 'accueil', lun: [['10:00', '18:00']], ...src }])
    expect(jugeablesCeWeekEnd([ouverte, fermee, semaine, avec(undefined)], weekEnd)).toBe(2)
  })

  it('une saison qui ne couvre pas ce week-end ne compte pas', () => {
    expect(raisons(avec([{ nature: 'accueil', sam: [['15:00', '19:00']], periode: { du: '07-01', au: '08-31' }, ...src }]))).toEqual(['week-end'])
  })

  it('rechercher et le compte des départements suivent le filtre', () => {
    const ouverte = avec([{ nature: 'accueil', sam: [['15:00', '22:00']], ...src }])
    const autre = { ...TOUTES[0], n: 'Sans Horaires', horaires: undefined } as Brasserie
    expect(rechercher([ouverte, autre], { ...base, rayonKm: 1000, weekEnd }).map((r) => r.brasserie.n)).toEqual(['Tom & Co'])
    expect(compterParDepartement([ouverte, autre], { categories: base.categories, weekEnd }).get(ouverte.d)).toBe(1)
  })
})

describe('S301, revue adverse', () => {
  it('un favori de la couche OSM décochée est dit, avec cette raison', () => {
    const caches = favorisCaches(TOUTES, ['Tom & Co'], base, new Set(['Tom & Co']))
    expect(caches).toEqual([{ nom: 'Tom & Co', raisons: [{ type: 'couche-osm' }] }])
  })

  it('la distance ne contredit pas le rayon à l’arrondi', () => {
    expect(libelleRaison({ type: 'distance', km: 20.4, rayonKm: 20 })).toBe('à peine plus de 20 km, le rayon choisi')
    expect(libelleRaison({ type: 'distance', km: 44.6, rayonKm: 20 })).toBe('≈ 45 km, au-delà du rayon de 20 km')
  })

  it('hors du mode « seulement », le texte tapé et le département choisi ne sont pas signalés seuls', () => {
    const texte = { nom: 'A', raisons: [{ type: 'texte' as const }] }
    const dep = { nom: 'B', raisons: [{ type: 'departement' as const }] }
    const loin = { nom: 'C', raisons: [{ type: 'texte' as const }, { type: 'categorie' as const }] }
    const weekEnd = { nom: 'D', raisons: [{ type: 'week-end' as const, motif: 'sans-horaires' as const }] }
    expect(favorisASignaler([texte, dep, loin, weekEnd], false).map((c) => c.nom)).toEqual(['C'])
    expect(favorisASignaler([texte, dep, loin], true).map((c) => c.nom)).toEqual(['A', 'B', 'C'])
  })
})

describe('S301 CA1 : les raisons qui écartent une brasserie, une seule garde', () => {
  const tom = TOUTES.find((b) => b.n === 'Tom & Co')
  if (tom === undefined) throw new Error('Tom & Co attendue dans lignes-reelles')
  it('nomme chaque filtre', () => {
    const types = (c: Partial<Criteres>) => raisonsDEcart(tom, { ...base, ...c }).map((r) => r.type)
    expect(types({})).toEqual([])
    expect(types({ rayonKm: 1 })).toEqual(['distance'])
    expect(types({ categories: TOUTES_CATEGORIES.filter((k) => k !== tom.cat) })).toEqual(['categorie'])
    expect(types({ seulement: new Set<string>() })).toEqual(['pas-favori'])
    expect(types({ exclure: new Set([tom.n]) })).toEqual(['visitee'])
    expect(types({ texte: 'zzzzzz' })).toEqual(['texte'])
    expect(types({ departement: '01' })).toEqual(['departement'])
    const absent = TYPES_BIERE.find((x) => !tom.beers.some((b) => b.type === x.type))
    if (absent === undefined) throw new Error('un type de bière absent de Tom & Co attendu')
    expect(types({ type: absent.type })).toEqual(['type'])
  })

  it('rechercher garde une brasserie si et seulement si elle n’a aucune raison', () => {
    const variantes = [
      { ...base },
      { ...base, rayonKm: 8 },
      { ...base, texte: 'brasserie' },
      { ...base, categories: [1, 2] as const },
      { ...base, departement: '69' },
      { ...base, seulement: new Set(['Tom & Co', 'Caribrew']) },
      { ...base, exclure: new Set(['Caribrew']) },
    ]
    for (const c of variantes) {
      const gardees = new Set(rechercher(TOUTES, c).map((r) => r.brasserie.n))
      for (const b of TOUTES) expect(gardees.has(b.n), b.n).toBe(raisonsDEcart(b, c).length === 0)
    }
  })
})

describe('quand rien n’est à portée (revue globale S22)', () => {
  it('nomme la brasserie la plus proche du départ, et sa distance', () => {
    const lille = { lat: 50.633, lon: 3.059 }
    const p = plusProche(TOUTES, lille, { categories: TOUTES_CATEGORIES })
    expect(p).toBeDefined()
    const toutes = TOUTES.map((b) => Math.hypot(b.lat - lille.lat, b.lon - lille.lon))
    expect(p?.brasserie.n).toBe(TOUTES[toutes.indexOf(Math.min(...toutes))]?.n)
    expect(p?.distanceKm).toBeGreaterThan(400)
    expect(plusProche([], lille, { categories: TOUTES_CATEGORIES })).toBeUndefined()
  })

  // S303 (A6) : toutes catégories décochées, l'écran nommait « la plus
  // proche » d'une liste qui n'en garde aucune.
  it('ne nomme qu’une brasserie qui passe les filtres', () => {
    const lille = { lat: 50.633, lon: 3.059 }
    expect(plusProche(TOUTES, lille, { categories: [] })).toBeUndefined()
    const premiere = plusProche(TOUTES, lille, { categories: TOUTES_CATEGORIES })?.brasserie
    expect(premiere).toBeDefined()
    const autreCategorie = TOUTES_CATEGORIES.filter((c) => c !== premiere?.cat)
    const p = plusProche(TOUTES, lille, { categories: autreCategorie })
    expect(p?.brasserie.cat).not.toBe(premiere?.cat)
    const sansElle = plusProche(TOUTES, lille, { categories: TOUTES_CATEGORIES, exclure: new Set([premiere?.n ?? '']) })
    expect(sansElle?.brasserie.n).not.toBe(premiere?.n)
  })

  it('ne nomme pas une brasserie fermée (décision #35)', () => {
    const lille = { lat: 50.633, lon: 3.059 }
    const premiere = plusProche(TOUTES, lille, { categories: TOUTES_CATEGORIES })?.brasserie
    if (premiere === undefined) throw new Error('aucune brasserie')
    const fermee: Brasserie = { ...premiere, fermee: { source: 'https://exemple.fr/', verifieLe: '2026-10-19' } }
    const p = plusProche([fermee, ...TOUTES.filter((b) => b.n !== premiere.n)], lille, { categories: TOUTES_CATEGORIES })
    expect(p?.brasserie.n).not.toBe(premiere.n)
  })
})

describe('listeCourte (S24 : favoris cachés, liste bornée)', () => {
  it('jusqu’à cinq noms : tous', () => {
    expect(listeCourte(['A', 'B'])).toBe('A, B')
  })
  it('au-delà : les cinq premiers, et le compte du reste', () => {
    expect(listeCourte(['A', 'B', 'C', 'D', 'E', 'F', 'G'])).toBe('A, B, C, D, E et 2 autres')
    expect(listeCourte(['A', 'B', 'C', 'D', 'E', 'F'])).toBe('A, B, C, D, E et 1 autre')
  })
})

describe('parcourir par département (S27, idée vue sur biere-tourisme.fr)', () => {
  const reelles = LIGNES_REELLES as unknown as Brasserie[]
  const savoie = { ...reelles[0], n: 'En Savoie', c: 'Chambéry', d: '73', lat: 45.57, lon: 5.92 }
  const toutes = [...reelles, savoie]
  it('un département : toutes ses brasseries, à toute distance', () => {
    const r = rechercher(toutes, {
      origine: BRIGNAIS,
      rayonKm: 5,
      texte: '',
      categories: [0, 1, 2, 3],
      departement: '73',
    })
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((x) => x.brasserie.d === '73')).toBe(true)
    expect(r.some((x) => x.distanceKm > 5)).toBe(true)
    expect(rechercherPartout({ texte: '', departement: '73' })).toBe(true)
  })

  it('le compte par département', () => {
    const c = compterParDepartement(toutes)
    expect(c.get('73')).toBe(toutes.filter((b) => b.d === '73').length)
  })
})

describe('une brasserie fermée (décision #35)', () => {
  const reelles = LIGNES_REELLES as unknown as Brasserie[]
  const fermee = { ...reelles[0], n: 'Porte Close', fermee: { source: 'https://exemple.fr', verifieLe: '2026-10-16' } }
  const criteres = { origine: BRIGNAIS, rayonKm: 100, texte: '', categories: [0, 1, 2, 3] as const }

  it('sort de la liste par défaut', () => {
    expect(rechercher([fermee], { ...criteres, categories: [0, 1, 2, 3] }).map((r) => r.brasserie.n)).toEqual([])
  })
  it('reste trouvable par son nom', () => {
    expect(rechercher([fermee], { ...criteres, categories: [0, 1, 2, 3], texte: 'porte close' })).toHaveLength(1)
  })
})

describe('compte par département sans les fermées (revue S27)', () => {
  it('une fermée ne compte pas', () => {
    const r = (LIGNES_REELLES as unknown as Brasserie[])[0]
    const fermee = { ...r, n: 'Close', fermee: { source: 'https://exemple.fr', verifieLe: '2026-10-16' } }
    expect(compterParDepartement([r, fermee]).get(r.d)).toBe(1)
  })
})

describe('restes de S27 (S31)', () => {
  const reelles = LIGNES_REELLES as unknown as Brasserie[]
  const ouverte = reelles[0]
  const close = { ...reelles[1], n: 'Porte Close', fermee: { source: 'https://exemple.fr', verifieLe: '2026-10-16' } }

  it('un favori fermé n’est pas « caché par les filtres » : il est fermé', () => {
    const favoris = [ouverte.n, close.n]
    const criteres = { origine: BRIGNAIS, rayonKm: 1000, texte: '', categories: [0, 1, 2, 3] as const }
    expect(favorisCaches([ouverte, close], favoris, criteres)).toEqual([])
    expect(favorisFermes([ouverte, close], favoris)).toEqual(['Porte Close'])
  })

  it('les nombres des départements suivent les catégories, le type et « seulement mes favoris »', () => {
    const d = ouverte.d
    const memeDep = reelles.filter((b) => b.d === d)
    const cat = memeDep[0].cat
    expect(compterParDepartement(reelles, { categories: [cat] }).get(d)).toBe(memeDep.filter((b) => b.cat === cat).length)
    // Aucune fiche réelle n'a de bière : une brasserie d'essai en a une, pour
    // prouver qu'elle est comptée, pas seulement que les autres sont exclues
    // (revue adverse S31).
    const houblon: Brasserie = { ...ouverte, n: 'Houblon d’essai', beers: [{ type: 'ipa' }] }
    expect(compterParDepartement([...reelles, houblon], { categories: [0, 1, 2, 3], type: 'ipa' }).get(d)).toBe(1)
    expect(
      compterParDepartement(reelles, { categories: [0, 1, 2, 3], seulement: new Set([ouverte.n]) }).get(d),
    ).toBe(1)
  })
})

describe('pas encore visitées (S35)', () => {
  it('écarte les visitées, par la même garde que les autres filtres', () => {
    const reelles = LIGNES_REELLES as unknown as Brasserie[]
    const tous = rechercher(reelles, { origine: BRIGNAIS, rayonKm: 100, texte: '', categories: [0, 1, 2, 3] })
    const visitee = tous[0].brasserie.n
    const sans = rechercher(reelles, {
      origine: BRIGNAIS,
      rayonKm: 100,
      texte: '',
      categories: [0, 1, 2, 3],
      exclure: new Set([visitee]),
    })
    expect(sans).toHaveLength(tous.length - 1)
    expect(sans.some((r) => r.brasserie.n === visitee)).toBe(false)
  })
})

describe('les fiches qui partagent un point (S268)', () => {
  // Au zoom maximal, la carte choisit la première fiche d'un groupe qu'elle
  // ne peut pas séparer, et dit que les autres la suivent dans la liste
  // (`Carte.tsx`). Depuis S268, les fiches au centre IGN d'une même commune
  // partagent un point : on le vérifie sur le vrai fichier.
  it('se suivent dans la liste, d’où qu’on parte', async () => {
    // Les deux parts, dans l'ordre où l'application les assemble (S294).
    const { FICHES_PREMIER_ECRAN, chargerSuite } = await import('../../src/core/donnees')
    const fiches = [...FICHES_PREMIER_ECRAN, ...(await chargerSuite())]
    for (const origine of [BRIGNAIS, { lat: 45.18, lon: 5.72 }, { lat: 46.2, lon: 5.2 }, { lat: 48.39, lon: -4.49 }]) {
      const points = rechercher(fiches, { ...base, origine, rayonKm: 1000 }).map((r) => `${String(r.brasserie.lat)},${String(r.brasserie.lon)}`)
      const vus = new Set<string>()
      points.forEach((p, i) => {
        if (vus.has(p)) expect(points[i - 1], p).toBe(p)
        vus.add(p)
      })
    }
  })
})

// S315 : un filtre n'est accusé de vider la liste que s'il en est la cause.
describe('videAussiSans', () => {
  const tous = new Set(TOUTES.map((b) => b.n))
  it('carnet vide : la liste vide le reste sans « pas encore visitées » ; le carnet n’est pas la cause', () => {
    const loin = { ...base, rayonKm: 0, exclure: new Set<string>() }
    expect(rechercher(TOUTES, loin)).toHaveLength(0)
    expect(videAussiSans(TOUTES, loin, 'exclure')).toBe(true)
  })
  it('tout est visité : sans le carnet la liste ne serait pas vide ; le carnet est la cause', () => {
    const toutVisite = { ...base, exclure: tous }
    expect(rechercher(TOUTES, toutVisite)).toHaveLength(0)
    expect(videAussiSans(TOUTES, toutVisite, 'exclure')).toBe(false)
  })
  it('le week-end qui vide la liste à lui seul : ce n’est pas « vide aussi sans lui » (A11, revue adverse S315)', () => {
    const ceWeekEnd = { ...base, weekEnd: prochainWeekEnd(new Date('2026-10-14T10:00:00Z')) }
    expect(rechercher(TOUTES, ceWeekEnd)).toHaveLength(0)
    expect(rechercher(TOUTES, base).length).toBeGreaterThan(0)
    expect(videAussiSans(TOUTES, ceWeekEnd, 'weekEnd')).toBe(false)
  })

  it('un critère absent ne change rien : la réponse est celle de la liste elle-même', () => {
    expect(videAussiSans(TOUTES, base, 'weekEnd')).toBe(rechercher(TOUTES, base).length === 0)
  })
})
