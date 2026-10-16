import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  appliquerLot,
  diffLisible,
  formaterDonnees,
  lireLot,
  lotSuivant,
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

describe('lire un lot de propositions', () => {
  it('accepte une proposition sourcée et datée', () => {
    expect(lireLot(lot).ok).toBe(true)
  })

  it('refuse une proposition sans source, sans date ou sans extrait', () => {
    for (const manque of ['sources', 'verifieLe', 'extrait'] as const) {
      const sans: Record<string, unknown> = { ...proposition }
      Reflect.deleteProperty(sans, manque)
      expect(lireLot({ lot: 'x', propositions: [sans] }).ok).toBe(false)
    }
    expect(lireLot({ lot: 'x', propositions: [{ ...proposition, sources: [] }] }).ok).toBe(false)
  })

  it('refuse un champ qui n’existe pas dans une fiche, et un changement vide', () => {
    const inconnu = { ...proposition, changements: { horairesDuBar: 'tous les jours' } }
    expect(lireLot({ lot: 'x', propositions: [inconnu] }).ok).toBe(false)
    expect(lireLot({ lot: 'x', propositions: [{ ...proposition, changements: {} }] }).ok).toBe(false)
  })

  it('refuse de changer le nom : une proposition vise une fiche, elle ne la renomme pas', () => {
    const renomme = { ...proposition, changements: { n: 'Autre nom' } }
    expect(lireLot({ lot: 'x', propositions: [renomme] }).ok).toBe(false)
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
    expect(apres?.verifieLe).toBe('2026-10-16')
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
