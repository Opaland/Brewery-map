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
  it('ni l’identité ni la position d’une fiche : nom, commune, département, coordonnées, km', () => {
    for (const changements of [
      { n: 'Autre' },
      { c: 'Ailleurs' },
      { d: '01' },
      { lat: 45 },
      { lon: 4 },
      { km: 3 },
      { coordPrecision: 'address' },
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
