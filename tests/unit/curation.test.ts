import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  appliquerLot,
  diffLisible,
  ficheDuSignalement,
  formaterDonnees,
  lireLot,
  lotSuivant,
  numeroSurLaPage,
  extraitSurLaPage,
  ajoutSchema,
  contactSurLaPage,
  revuesDesFichiers,
  type Lot,
} from '../../src/core/curation'
import { BRIGNAIS } from '../../src/core/distance'
import type { Brasserie } from '../../src/core/schema'
import { LIGNES_REELLES } from './lignes-reelles'

const TOUTES = LIGNES_REELLES as unknown as Brasserie[]
const A_CONFIRMER = TOUTES.find((b) => b.cat === 0)
if (A_CONFIRMER === undefined) throw new Error('lignes-reelles doit contenir une catégorie 0')
const NOM = A_CONFIRMER.n

const proposition = {
  n: NOM,
  changements: {
    contact: {
      tel: '04 72 50 88 53',
      source: 'https://exemple.fr/contact',
      verifieLe: '2026-10-16',
    },
  },
  verifieLe: '2026-10-16',
  sources: ['https://exemple.fr/contact'],
  extrait: 'Téléphone : 04 72 50 88 53',
}

const lot: Lot = { lot: 'essai', propositions: [proposition] }
const AUJOURDHUI = '2026-10-16'

describe('lire un lot de propositions', () => {
  it('accepte une proposition sourcée et datée', () => {
    expect(lireLot(lot, AUJOURDHUI).ok).toBe(true)
  })

  it('refuse une proposition sans source, sans date ou sans extrait', () => {
    for (const manque of ['sources', 'verifieLe', 'extrait'] as const) {
      const sans: Record<string, unknown> = { ...proposition }
      Reflect.deleteProperty(sans, manque)
      expect(lireLot({ lot: 'x', propositions: [sans] }, AUJOURDHUI).ok).toBe(false)
    }
    expect(lireLot({ lot: 'x', propositions: [{ ...proposition, sources: [] }] }, AUJOURDHUI).ok).toBe(false)
  })

  it('refuse un champ qui n’existe pas dans une fiche, et un changement vide', () => {
    // Un champ valide à côté : sans lui, le refus pourrait venir du « changement vide ».
    const inconnu = { ...proposition, changements: { note: 'Une note', horairesDuBar: 'tous les jours' } }
    expect(lireLot({ lot: 'x', propositions: [inconnu] }, AUJOURDHUI).ok).toBe(false)
    expect(lireLot({ lot: 'x', propositions: [{ ...proposition, changements: {} }] }, AUJOURDHUI).ok).toBe(false)
  })

  it('refuse de changer le nom : une proposition vise une fiche, elle ne la renomme pas', () => {
    const renomme = { ...proposition, changements: { n: 'Autre nom' } }
    expect(lireLot({ lot: 'x', propositions: [renomme] }, AUJOURDHUI).ok).toBe(false)
  })
})

describe('ce qu’une proposition ne peut pas changer (revue code S11)', () => {
  it('ni l’identité, ni un morceau de position : nom, commune, département, km, coordonnée seule', () => {
    for (const changements of [
      { n: 'Autre' },
      { c: 'Ailleurs' },
      { d: '01' },
      { lat: 45 },
      { lon: 4 },
      { km: 3 },
      { coordPrecision: 'address' },
      { lat: 45, lon: 4 },
    ]) {
      expect(lireLot({ lot: 'x', propositions: [{ ...proposition, changements }] }, AUJOURDHUI).ok).toBe(
        false,
      )
    }
  })

  it('ni sa date de vérification à part : c’est celle de la proposition qui s’écrit', () => {
    const date = { ...proposition, changements: { note: 'x', verifieLe: '2020-01-01' } }
    expect(lireLot({ lot: 'x', propositions: [date] }, AUJOURDHUI).ok).toBe(false)
  })

  it('une source écrite dans la fiche est une des sources lues, à la date lue', () => {
    const autreSource = {
      ...proposition,
      changements: { contact: { ...proposition.changements.contact, source: 'https://autre.fr/' } },
    }
    const autreDate = {
      ...proposition,
      changements: { contact: { ...proposition.changements.contact, verifieLe: '2001-01-01' } },
    }
    const srcAilleurs = { ...proposition, changements: { src: 'https://ailleurs.fr/' } }
    for (const p of [autreSource, autreDate, srcAilleurs]) {
      expect(lireLot({ lot: 'x', propositions: [p] }, AUJOURDHUI).ok).toBe(false)
    }
    const srcLue = { ...proposition, changements: { src: 'https://exemple.fr/contact' } }
    expect(lireLot({ lot: 'x', propositions: [srcLue] }, AUJOURDHUI).ok).toBe(true)
  })

  it('pas de vérification datée du futur', () => {
    expect(lireLot(lot, '2026-10-15').ok).toBe(false)
  })
})

describe('proposer une position (S52, Cédric le 17/10 : « la localisation ne correspond pas à l’adresse »)', () => {
  const POSITION = { lat: 45.7, lon: 4.8, coordPrecision: 'address' as const }
  const GEOCODEUR = 'https://data.geopf.fr/geocodage/search?limit=1&q=1%20rue%20Exemple'
  const deplacement = { ...proposition, changements: POSITION, sources: [GEOCODEUR] }

  it('accepte les trois ensemble : latitude, longitude, précision', () => {
    expect(lireLot({ lot: 'x', propositions: [deplacement] }, AUJOURDHUI).ok).toBe(true)
  })

  it('refuse « osm » : cette précision est réservée aux fiches venues d’OpenStreetMap (revue adverse S54)', () => {
    const osm = { ...proposition, changements: { ...POSITION, coordPrecision: 'osm' } }
    expect(lireLot({ lot: 'x', propositions: [osm] }, AUJOURDHUI).ok).toBe(false)
  })

  it('« address » exige le géocodeur parmi les sources lues (revue adverse S54)', () => {
    const sansGeocodeur = { ...deplacement, sources: ['https://example.com/'] }
    expect(lireLot({ lot: 'x', propositions: [sansGeocodeur] }, AUJOURDHUI).ok).toBe(false)
  })

  it('refuse de ramener une fiche au centre de sa commune', () => {
    const recul = { ...proposition, changements: { ...POSITION, coordPrecision: 'commune' } }
    expect(lireLot({ lot: 'x', propositions: [recul] }, AUJOURDHUI).ok).toBe(false)
  })

  it('recalcule km depuis Brignais : un km périmé ne reste pas dans le fichier', () => {
    const r = appliquerLot(TOUTES, { lot: 'x', propositions: [deplacement] }, new Set([1]))
    if (!r.ok) throw new Error(r.erreurs.join('\n'))
    const fiche = r.brasseries.find((b) => b.n === NOM)
    expect(fiche?.lat).toBe(45.7)
    expect(fiche?.lon).toBe(4.8)
    expect(fiche?.coordPrecision).toBe('address')
    // 4,53 km de Brignais (45,6745 ; 4,7545) à (45,7 ; 4,8), arrondi au dixième
    // comme les 166 lignes fournies.
    expect(fiche?.km).toBe(4.5)
  })

  it('une position seule ne date pas la fiche : sa catégorie n’a pas été revue', () => {
    const r = appliquerLot(TOUTES, { lot: 'x', propositions: [deplacement] }, new Set([1]))
    if (!r.ok) throw new Error(r.erreurs.join('\n'))
    expect(r.brasseries.find((b) => b.n === NOM)?.verifieLe).toBe(A_CONFIRMER.verifieLe)
  })

  it('le diff dit de combien la fiche bouge sur la carte', () => {
    const texte = diffLisible(TOUTES, { lot: 'x', propositions: [deplacement] })
    expect(texte).toMatch(/déplacement sur la carte : \d+,\d km/)
  })
})

describe('appliquer les propositions acceptées, et elles seules', () => {
  it('n’applique que les numéros acceptés', () => {
    const r = appliquerLot(TOUTES, lot, new Set())
    expect(r.ok && r.brasseries).toEqual(TOUTES)
    const r1 = appliquerLot(TOUTES, lot, new Set([1]))
    expect(r1.ok).toBe(true)
    const apres = r1.ok ? r1.brasseries.find((b) => b.n === NOM) : undefined
    expect(apres?.contact?.tel).toBe('04 72 50 88 53')
    expect(apres?.contact?.verifieLe).toBe('2026-10-16')
  })

  it('une proposition de contact seul ne date pas toute la fiche : le contact porte sa date (revue S11)', () => {
    const r = appliquerLot(TOUTES, lot, new Set([1]))
    const apres = r.ok ? r.brasseries.find((b) => b.n === NOM) : undefined
    expect(apres?.contact?.verifieLe).toBe('2026-10-16')
    expect(apres?.verifieLe).toBe(A_CONFIRMER.verifieLe)
  })

  it('une proposition qui touche le statut ou la note date la fiche', () => {
    const note = { lot: 'x', propositions: [{ ...proposition, changements: { note: 'Nouvelle note' } }] }
    const r = appliquerLot(TOUTES, note, new Set([1]))
    expect(r.ok ? r.brasseries.find((b) => b.n === NOM)?.verifieLe : undefined).toBe('2026-10-16')
  })

  it('ne touche à aucune autre ligne, et garde l’ordre du fichier', () => {
    const r = appliquerLot(TOUTES, lot, new Set([1]))
    if (!r.ok) throw new Error(r.erreurs.join('\n'))
    expect(r.brasseries.map((b) => b.n)).toEqual(TOUTES.map((b) => b.n))
    r.brasseries.forEach((b, i) => {
      if (b.n !== NOM) expect(b).toBe(TOUTES[i])
    })
  })

  it('refuse une fiche inconnue et un numéro accepté qui n’existe pas', () => {
    const inconnue = { lot: 'x', propositions: [{ ...proposition, n: 'Personne' }] }
    expect(appliquerLot(TOUTES, inconnue, new Set([1])).ok).toBe(false)
    expect(appliquerLot(TOUTES, lot, new Set([2])).ok).toBe(false)
  })

  it('refuse deux propositions acceptées sur la même fiche : la seconde écraserait la première', () => {
    const double = { lot: 'x', propositions: [proposition, { ...proposition, extrait: 'autre' }] }
    expect(appliquerLot(TOUTES, double, new Set([1, 2])).ok).toBe(false)
    expect(appliquerLot(TOUTES, double, new Set([2])).ok).toBe(true)
  })

  it('refuse un résultat que le schéma refuserait : catégorie affirmée sans source', () => {
    const sansSource = {
      lot: 'x',
      propositions: [{ ...proposition, changements: { cat: 1 as const, conf: 'moyenne' as const, src: '' } }],
    }
    const r = appliquerLot(TOUTES, sansSource, new Set([1]))
    expect(r.ok).toBe(false)
  })
})

describe('le diff lisible, pour la décision de Cédric', () => {
  it('nomme chaque champ changé, l’avant, l’après, la source et l’extrait', () => {
    const texte = diffLisible(TOUTES, lot)
    expect(texte).toContain(`### 1. ${NOM}`)
    expect(texte).toContain('contact.tel : (vide) → 04 72 50 88 53')
    expect(texte).toContain('https://exemple.fr/contact')
    expect(texte).toContain('« Téléphone : 04 72 50 88 53 »')
    expect(texte).toContain('vérifiée le 2026-10-16')
  })

  it('nomme les catégories en clair, pas seulement par leur code (revue S12)', () => {
    const cat = { lot: 'x', propositions: [{ ...proposition, changements: { cat: 2 as const, conf: 'faible' as const, src: 'https://exemple.fr/contact' } }] }
    expect(diffLisible(TOUTES, cat)).toContain('cat : 0 (À confirmer) → 2 (Acheter seulement)')
  })

  it('garde la numérotation du lot quand on n’en montre qu’une partie (revue S12)', () => {
    const deux = { lot: 'x', propositions: [proposition, { ...proposition, n: TOUTES[0].n }] }
    const texte = diffLisible(TOUTES, deux, new Set([2]))
    expect(texte).toContain(`### 2. ${TOUTES[0].n}`)
    expect(texte).not.toContain('### 1.')
  })

  it('montre le choix du vérificateur et le signalement d’origine quand il y en a', () => {
    const avecChoix = {
      lot: 'x',
      propositions: [{ ...proposition, choix: 'Fixe retenu ; mobile 06 00 00 00 00 écarté.', signalement: 12 }],
    }
    expect(lireLot(avecChoix, AUJOURDHUI).ok).toBe(true)
    const texte = diffLisible(TOUTES, avecChoix)
    expect(texte).toContain('Choix du vérificateur : Fixe retenu ; mobile 06 00 00 00 00 écarté.')
    expect(texte).toContain('Signalement : https://github.com/Opaland/Brewery-map/issues/12')
  })

  it('ne liste pas un champ dont la valeur ne change pas', () => {
    const memeCat = {
      lot: 'x',
      propositions: [{ ...proposition, changements: { cat: A_CONFIRMER.cat, note: 'Nouvelle note' } }],
    }
    const texte = diffLisible(TOUTES, memeCat)
    expect(texte).not.toMatch(/^- cat :/m)
    expect(texte).toMatch(/^- note : /m)
  })
})

describe('le diff ne cache rien (revue code S11)', () => {
  const avecContact = TOUTES.map((b) =>
    b.n === NOM
      ? { ...b, contact: { tel: '04 00 00 00 00', site: 'https://exemple.fr/', source: 'https://exemple.fr/contact', verifieLe: '2026-01-01' } }
      : b,
  )

  it('montre un champ retiré', () => {
    const texte = diffLisible(avecContact, lot)
    expect(texte).toContain('contact.site : https://exemple.fr/ → (vide)')
  })

  it('montre un tableau élément par élément, et un jour d’horaires comme la fiche l’affiche', () => {
    const horaires = {
      ...proposition,
      changements: {
        horaires: [
          { nature: 'accueil' as const, sam: [['15:00', '20:00'] as [string, string]], source: 'https://exemple.fr/contact', verifieLe: '2026-10-16' },
        ],
      },
    }
    const texte = diffLisible(TOUTES, { lot: 'x', propositions: [horaires] })
    expect(texte).toContain('horaires.0.nature : (vide) → accueil')
    // Un jour se lit comme sur la fiche, en une ligne (revue métier S12).
    expect(texte).toContain('horaires.0.sam : (vide) → 15 h – 20 h')
  })
})

describe('le lot suivant', () => {
  // Trois « À confirmer » à des distances croissantes de Brignais (45,6745 ;
  // 4,7545) : l'échantillon réel n'en a qu'un, l'ordre n'y serait pas testé.
  const pres = { ...A_CONFIRMER, n: 'Près', lat: 45.68, lon: 4.76 }
  const moyen = { ...A_CONFIRMER, n: 'Moyen', lat: 45.8, lon: 4.85 }
  const loin = { ...A_CONFIRMER, n: 'Loin', lat: 46.2, lon: 5.2 }
  const vendue = TOUTES.find((b) => b.cat === 1)
  if (vendue === undefined) throw new Error('il faut une catégorie 1')
  const lignes = [loin, vendue, pres, moyen]

  it('ne prend que les « À confirmer », du plus proche au plus lointain', () => {
    expect(lotSuivant(lignes, 25, BRIGNAIS)).toEqual(['Près', 'Moyen', 'Loin'])
  })

  it('passe les fiches déjà revues dans un lot, même sans proposition (S13)', () => {
    expect(lotSuivant(lignes, 25, BRIGNAIS, new Set(['Près']))).toEqual(['Moyen', 'Loin'])
  })

  it('un lot dit toutes les fiches revues, et elles contiennent celles qu’il propose', () => {
    expect(lireLot({ ...lot, revues: [NOM, 'Autre'] }, AUJOURDHUI).ok).toBe(true)
    expect(lireLot({ ...lot, revues: ['Autre'] }, AUJOURDHUI).ok).toBe(false)
    // Deux propositions, une seule dans « revues » : refusé (revue code S13,
    // « every » remplacé par « some » survivait).
    const deux = { lot: 'x', propositions: [proposition, { ...proposition, n: 'Autre' }] }
    expect(lireLot({ ...deux, revues: [NOM] }, AUJOURDHUI).ok).toBe(false)
    expect(lireLot({ ...deux, revues: [NOM, 'Autre'] }, AUJOURDHUI).ok).toBe(true)
  })

  it('mode normal : une fiche revue reste passée, même datée (revue code S15)', () => {
    const datee = { ...pres, verifieLe: '2026-02-01' }
    expect(lotSuivant([datee, moyen], 25, BRIGNAIS, new Set(['Près']))).toEqual(['Moyen'])
  })

  it('veille (S15) : les catégories 1 à 3 seulement, jamais datées d’abord, catégorie 1 en tête', () => {
    // Les « À confirmer » restent au lot normal : pas de doublon entre les deux
    // (revue métier S15). Sans date, l'ordre est la catégorie (1 : consommer sur
    // place, le critère de Cédric), puis la distance ; ensuite la date.
    const achat = TOUTES.find((b) => b.cat === 2)
    if (achat === undefined) throw new Error('il faut une catégorie 2')
    const verifiee = { ...vendue, n: 'Vendue vérifiée', verifieLe: '2026-01-01' }
    const recente = { ...vendue, n: 'Vendue récente', verifieLe: '2026-10-01' }
    const jamais = { ...vendue, n: 'Vendue jamais vérifiée' }
    const achatProche = { ...achat, n: 'Achat proche', lat: pres.lat, lon: pres.lon }
    const noms = lotSuivant([recente, verifiee, achatProche, jamais, pres], 25, BRIGNAIS, new Set(), { toutes: true })
    expect(noms).toEqual(['Vendue jamais vérifiée', 'Achat proche', 'Vendue vérifiée', 'Vendue récente'])
  })

  it('veille : une fiche revue sans résultat est passée, une fiche datée revient à son tour', () => {
    const datee = { ...vendue, n: 'Datée', verifieLe: '2026-02-01' }
    const sansDate = { ...vendue, n: 'Sans date' }
    expect(lotSuivant([datee, sansDate], 25, BRIGNAIS, new Set(['Datée', 'Sans date']), { toutes: true })).toEqual(['Datée'])
  })

  it('coupe à la taille demandée', () => {
    expect(lotSuivant(lignes, 2, BRIGNAIS)).toEqual(['Près', 'Moyen'])
  })

  it('passe après les jamais vérifiés les fiches déjà vérifiées, la plus ancienne d’abord', () => {
    const verifiees = [
      { ...pres, verifieLe: '2026-09-01' },
      { ...moyen, verifieLe: '2026-01-01' },
      loin,
    ]
    expect(lotSuivant(verifiees, 25, BRIGNAIS)).toEqual(['Loin', 'Moyen', 'Près'])
  })
})

describe('le format du fichier de données', () => {
  it('relire puis réécrire data/breweries.json redonne le fichier à l’octet près', () => {
    const texte = readFileSync('data/breweries.json', 'utf8')
    expect(formaterDonnees(JSON.parse(texte) as Brasserie[])).toBe(texte)
  })
})

describe('du signalement à la fiche (revue métier S11)', () => {
  it('retrouve la fiche par le titre de l’issue préremplie', () => {
    expect(ficheDuSignalement(`Signalement : ${NOM} (${A_CONFIRMER.c})`, TOUTES)).toBe(NOM)
  })

  it('ne devine pas : titre modifié, nom inconnu ou commune différente → aucune fiche', () => {
    expect(ficheDuSignalement(`Signalement : ${NOM}`, TOUTES)).toBeNull()
    expect(ficheDuSignalement('Signalement : Personne (Lyon)', TOUTES)).toBeNull()
    expect(ficheDuSignalement(`Signalement : ${NOM} (Ailleurs)`, TOUTES)).toBeNull()
  })
})

describe('un numéro proposé se lit sur sa source (revue code S11)', () => {
  it('trouve le numéro quelle que soit son écriture sur la page', () => {
    for (const page of [
      'Tél : 04 72 50 88 53',
      'tel:0472508853',
      'Appelez le 04.72.50.88.53 !',
      '+33 4 72 50 88 53',
      // Vu sur la page de Brasserie Kachmar (16/10) : le numéro de rue suit.
      'Tél : 04 72 50 88 53 1932 Route de Villefranche',
      // Vu sur la page de Brasserie Georges (16/10).
      'Tel : +33 (0)4 72 50 88 53',
      // Écritures mesurées par la revue code S12.
      '+33-4-72-50-88-53',
      '+33.4.72.50.88.53',
      '(+33)4 72 50 88 53',
      '00 33 4 72 50 88 53',
      '04  72 50 88 53',
      '+330472508853',
    ]) {
      expect(numeroSurLaPage('04 72 50 88 53', page)).toBe(true)
    }
  })

  it('ne le trouve pas s’il n’y est pas, même à un chiffre près', () => {
    expect(numeroSurLaPage('04 72 50 88 53', 'Foodtruck : 04 70 50 88 53')).toBe(false)
    expect(numeroSurLaPage('04 72 50 88 53', '')).toBe(false)
  })
})

describe('les fiches déjà revues, lues dans curation/ (revue code S13)', () => {
  const noms = new Set(TOUTES.map((b) => b.n))
  const lotJson = { lot: 'x', propositions: [proposition], revues: [NOM, TOUTES[0].n] }

  it('réunit les « revues » des lots et de revues.json', () => {
    const r = revuesDesFichiers(
      [
        { nom: 'a.json', contenu: lotJson },
        { nom: 'revues.json', contenu: { '_lisez-moi': 'texte', s12: [TOUTES[1].n] } },
      ],
      noms,
    )
    expect(r.ok && [...r.revues].sort()).toEqual([NOM, TOUTES[0].n, TOUTES[1].n].sort())
  })

  it('un lot sans « revues » compte ses propositions', () => {
    const r = revuesDesFichiers([{ nom: 'a.json', contenu: { lot: 'x', propositions: [proposition] } }], noms)
    expect(r.ok && [...r.revues]).toEqual([NOM])
  })

  it('échoue en nommant le fichier : contenu mal formé, ou nom absent des données', () => {
    const cas: unknown[] = [
      { 'revues.json': { s12: 'oops' } },
      { 'a.json': { ...lotJson, revues: 'une chaîne' } },
      { 'a.json': null },
      { 'revues.json': { s12: ['Brasserie qui n’existe pas'] } },
      { 'a.json': { ...lotJson, revues: [NOM, 'Faute de frappe'] } },
    ]
    for (const c of cas) {
      const [nom, contenu] = Object.entries(c as Record<string, unknown>)[0] ?? ['', null]
      const r = revuesDesFichiers([{ nom, contenu }], noms)
      expect(r.ok).toBe(false)
      expect(r.ok ? '' : r.erreurs.join('\n')).toContain(nom)
    }
  })
})

describe('les ajouts de fiches (S14)', () => {
  const nouvelle: Brasserie = {
    ...A_CONFIRMER,
    n: 'Virage 7',
    c: 'Lozanne',
    note: 'Listée dans OpenStreetMap comme brasserie (craft=brewery, node/1) ; rien d’autre n’est vérifié.',
    coordPrecision: 'address',
  }
  const ajout = {
    fiche: nouvelle,
    verifieLe: '2026-10-16',
    sources: ['https://www.openstreetmap.org/node/1'],
    extrait: 'name=Virage 7 ; craft=brewery',
  }
  const avecAjout: Lot = { lot: 'x', propositions: [proposition], ajouts: [ajout] }

  it('un ajout se numérote après les propositions, et ne s’applique qu’accepté', () => {
    expect(lireLot(avecAjout, AUJOURDHUI).ok).toBe(true)
    const sans = appliquerLot(TOUTES, avecAjout, new Set([1]))
    expect(sans.ok && sans.brasseries).toHaveLength(TOUTES.length)
    const avec = appliquerLot(TOUTES, avecAjout, new Set([2]))
    expect(avec.ok && avec.brasseries.map((b) => b.n)).toEqual([...TOUTES.map((b) => b.n), 'Virage 7'])
    expect(avec.ok ? avec.brasseries.at(-1)?.verifieLe : undefined).toBe('2026-10-16')
  })

  it('un ajout qui reprend un nom du fichier est refusé, et le refus cite le numéro du lot', () => {
    const doublon = { ...avecAjout, ajouts: [{ ...ajout, fiche: { ...nouvelle, n: TOUTES[0].n } }] }
    const r = appliquerLot(TOUTES, doublon, new Set([2]))
    expect(r.ok).toBe(false)
    // « 4.n : nom déjà utilisé » ne disait rien à Cédric (revues S14).
    expect(r.ok ? '' : r.erreurs.join('\n')).toContain(`proposition 2 (${TOUTES[0].n})`)
  })

  it('un ajout porte une fiche entière et valide, sans date à part', () => {
    const invalide = { ...avecAjout, ajouts: [{ ...ajout, fiche: { ...nouvelle, cat: 1 } }] }
    expect(lireLot(invalide, AUJOURDHUI).ok).toBe(false)
    const datee = { ...avecAjout, ajouts: [{ ...ajout, fiche: { ...nouvelle, verifieLe: '2020-01-01' } }] }
    expect(lireLot(datee, AUJOURDHUI).ok).toBe(false)
  })

  it('le diff montre un ajout comme une fiche nouvelle, numérotée après les propositions', () => {
    const texte = diffLisible(TOUTES, avecAjout)
    expect(texte).toContain('### 2. Virage 7 — fiche nouvelle')
    expect(texte).toContain('- c : (vide) → Lozanne')
    expect(texte).toContain('- cat : (vide) → 0 (À confirmer)')
  })

  it('les fiches ajoutées comptent parmi les fiches revues', () => {
    const r = revuesDesFichiers(
      [{ nom: 'a.json', contenu: { ...avecAjout, revues: [NOM] } }],
      new Set(TOUTES.map((b) => b.n)),
    )
    expect(r.ok && [...r.revues].sort()).toEqual([NOM])
  })
})

describe('extraitSurLaPage (S247)', () => {
  // Une fiche nouvelle n'avait aucun contrôle : « controler » ne lisait que
  // les propositions et répondait « sans écart » sur un lot d'ajouts.
  it('trouve l’extrait malgré les balises, les entités, les accents et les espaces', () => {
    const page = '<p>D&eacute;gustation au   bar, <b>vente</b> &agrave; emporter</p>'
    expect(extraitSurLaPage('Dégustation au bar, vente à emporter', page)).toBe(true)
  })
  it('ne le trouve pas s’il n’y est pas', () => {
    expect(extraitSurLaPage('Dégustation au bar', '<p>Vente à emporter</p>')).toBe(false)
  })
  it('un extrait vide ne prouve rien', () => {
    expect(extraitSurLaPage('  ', '<p>tout</p>')).toBe(false)
  })
})


describe('les contacts d’une fiche nouvelle (S261)', () => {
  // Une vraie ligne du fichier, renommée : valide au schéma par construction.
  const [ligne] = JSON.parse(readFileSync('data/breweries.json', 'utf8')) as Record<string, unknown>[]
  const fiche = Object.fromEntries(Object.entries({ ...ligne, n: 'Brasserie de test S261' }).filter(([k]) => k !== 'verifieLe' && k !== 'contact'))
  const source = 'https://exemple.fr/contact'
  const ajout = (contact: Record<string, unknown>, sources = ['https://exemple.fr/', source]) => ({
    fiche: { ...fiche, contact },
    verifieLe: '2026-10-17',
    sources,
    extrait: 'Lu sur la page.',
  })

  it('CA2 : un contact lu sur une des sources, à la date de l’ajout, passe', () => {
    expect(ajoutSchema.safeParse(ajout({ tel: '02 98 93 00 70', source, verifieLe: '2026-10-17' })).success).toBe(true)
  })

  it('CA2 : un contact dont la source n’est pas une des sources est refusé', () => {
    const r = ajoutSchema.safeParse(ajout({ tel: '02 98 93 00 70', source: 'https://ailleurs.fr/', verifieLe: '2026-10-17' }))
    expect(r.success).toBe(false)
  })

  it('CA2 : un contact daté d’un autre jour que l’ajout est refusé', () => {
    const r = ajoutSchema.safeParse(ajout({ tel: '02 98 93 00 70', source, verifieLe: '2026-10-16' }))
    expect(r.success).toBe(false)
  })

  it('CA3 : le téléphone et le lien Untappd sont cherchés sur la page du contact', () => {
    const page = '<p>Tél. : +33 (0)2 98 93 00 70</p><a href="https://untappd.com/Arvarus">Untappd</a>'
    expect(contactSurLaPage({ tel: '02 98 93 00 70', untappd: 'https://untappd.com/Arvarus', source }, page)).toEqual([])
  })

  it('CA3 : un téléphone ou un lien absent de la page est un écart', () => {
    const page = '<p>Tél. : 02 98 93 00 71</p><a href="https://untappd.com/Autre">Untappd</a>'
    expect(contactSurLaPage({ tel: '02 98 93 00 70', untappd: 'https://untappd.com/Arvarus', source }, page)).toEqual(['tel', 'untappd'])
  })

  it('CA3 : un lien Untappd lu sur sa propre page vaut sans y figurer (casse et barre finale ignorées)', () => {
    expect(contactSurLaPage({ untappd: 'https://untappd.com/brasserie_smash/', source: 'https://untappd.com/Brasserie_Smash' }, '<title>Smash</title>')).toEqual([])
  })

  it('CA3 : le site vaut s’il est la page lue, ou cité sur elle', () => {
    expect(contactSurLaPage({ site: 'https://exemple.fr/', source: 'https://exemple.fr/contact' }, '')).toEqual([])
    expect(contactSurLaPage({ site: 'https://autre.fr/', source }, '<p>exemple</p>')).toEqual(['site'])
    expect(contactSurLaPage({ site: 'https://autre.fr/', source }, '<a href="https://www.autre.fr">site</a>')).toEqual([])
  })
})
