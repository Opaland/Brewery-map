import { describe, expect, it } from 'vitest'
import { formaterCreneaux, JOURS, ouvertLe, ouvertMaintenant, type Horaires } from '../../src/core/horaires'
import { validerBrasseries, type Brasserie } from '../../src/core/schema'
import { LIGNES_REELLES } from './lignes-reelles'

const valide = LIGNES_REELLES[0]
const erreurs = (l: unknown) => {
  const v = validerBrasseries([l])
  return v.ok ? [] : v.erreurs
}
const accueil = {
  nature: 'accueil',
  jeu: [['18:00', '21:30']],
  ven: [['18:00', '21:30']],
  sam: [['15:00', '22:00']],
  dim: [],
  source: 'https://www.montsdulyonnaistourisme.fr/x',
  verifieLe: '2026-10-15',
}
const avec = (blocs: unknown[]) => ({ ...valide, horaires: blocs })
type H = NonNullable<Brasserie['horaires']>

describe('le schéma des horaires', () => {
  it('accepte des blocs sourcés et datés, vente et accueil séparés (Caribrew)', () => {
    const vente = { ...accueil, nature: 'vente', lun: [['08:00', '18:00']], sam: undefined }
    expect(erreurs(avec([accueil, vente]))).toEqual([])
  })

  it('accepte un créneau qui passe minuit (Platypus « 17h-1h »)', () => {
    expect(erreurs(avec([{ ...accueil, sam: [['17:00', '01:00']] }]))).toEqual([])
    expect(erreurs(avec([{ ...accueil, sam: [['17:00', '00:00']] }]))).toEqual([])
  })

  it('accepte un jour ouvert sans heures connues (« mar-sam »)', () => {
    expect(erreurs(avec([{ ...accueil, mar: 'heures-non-precisees' }]))).toEqual([])
  })

  it('refuse une heure mal écrite, un créneau nul, des créneaux qui se chevauchent', () => {
    expect(erreurs(avec([{ ...accueil, sam: [['15h', '22h']] }]))).not.toEqual([])
    expect(erreurs(avec([{ ...accueil, sam: [['25:00', '26:00']] }]))).not.toEqual([])
    expect(erreurs(avec([{ ...accueil, sam: [['15:00', '15:00']] }]))).not.toEqual([])
    expect(
      erreurs(avec([{ ...accueil, sam: [['10:00', '14:00'], ['12:00', '16:00']] }])),
    ).not.toEqual([])
    expect(
      erreurs(avec([{ ...accueil, sam: [['15:00', '19:00'], ['09:00', '12:00']] }])),
    ).not.toEqual([])
  })

  it('refuse deux blocs de même nature, et une liste vide', () => {
    expect(erreurs(avec([accueil, accueil]))).not.toEqual([])
    expect(erreurs(avec([]))).not.toEqual([])
  })

  it('exige une source et une date', () => {
    const { source: _s, ...sansSource } = accueil
    void _s
    expect(erreurs(avec([sansSource]))).not.toEqual([])
  })
})

describe('ouvertLe', () => {
  const h = [accueil] as unknown as H
  it('oui, non, ou inconnu — jamais deviné', () => {
    expect(ouvertLe(h, 'sam')).toBe('oui')
    expect(ouvertLe(h, 'dim')).toBe('non')
    expect(ouvertLe(h, 'lun')).toBe('inconnu')
    expect(ouvertLe(undefined, 'sam')).toBe('inconnu')
  })

  it('distingue l’accueil de la vente', () => {
    const vente = [{ ...accueil, nature: 'vente' }] as unknown as H
    expect(ouvertLe(vente, 'sam')).toBe('inconnu')
    expect(ouvertLe(vente, 'sam', 'vente')).toBe('oui')
  })

  it('« sous réserve » quand une remarque accompagne les horaires', () => {
    const saison = [{ ...accueil, remarque: 'Fermée d’octobre à mai.' }] as unknown as H
    expect(ouvertLe(saison, 'sam')).toBe('sous-reserve')
    expect(ouvertLe(saison, 'dim')).toBe('non')
  })
})

describe('formaterCreneaux', () => {
  it('écrit les créneaux en clair', () => {
    expect(formaterCreneaux([['15:00', '22:00']])).toBe('15 h – 22 h')
    expect(formaterCreneaux([['09:30', '12:30'], ['15:00', '19:30']])).toBe(
      '9 h 30 – 12 h 30, 15 h – 19 h 30',
    )
    expect(formaterCreneaux([['17:00', '01:00']])).toBe('17 h – 1 h (le lendemain)')
    expect(formaterCreneaux([['17:00', '00:00']])).toBe('17 h – minuit')
    expect(formaterCreneaux('heures-non-precisees')).toBe('ouvert, heures non précisées')
    expect(formaterCreneaux([])).toBe('fermé')
    expect(formaterCreneaux(undefined)).toBe('non précisé')
  })

  it('les sept jours, du lundi au dimanche', () => {
    expect(JOURS.map((j) => j.cle)).toEqual(['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'])
  })
})

/**
 * « Ouvert maintenant » (S19, Hugo), à l'heure de Paris, quel que soit le
 * fuseau du téléphone. Les instants sont écrits en UTC : samedi 17/10/2026
 * à 18 h à Paris = 16:00Z (heure d'été) ; samedi 19/12/2026 à 18 h = 17:00Z.
 */
describe('ouvertMaintenant', () => {
  const h = [accueil] as unknown as Horaires
  const a = (iso: string) => new Date(iso)

  it('ouvert, avec l’heure de fermeture du créneau en cours', () => {
    expect(ouvertMaintenant(h, a('2026-10-17T16:00:00Z'))).toEqual({ etat: 'ouvert', jusqua: '22:00' })
  })

  it('à l’heure de Paris, en été comme en hiver', () => {
    // 21:30Z = 23 h 30 à Paris en octobre (fermé), 22 h 30 en décembre (fermé aussi) ;
    // 20:30Z = 22 h 30 en octobre (fermé), 21 h 30 en décembre (ouvert).
    expect(ouvertMaintenant(h, a('2026-10-17T20:30:00Z')).etat).toBe('ferme')
    expect(ouvertMaintenant(h, a('2026-12-19T20:30:00Z'))).toEqual({ etat: 'ouvert', jusqua: '22:00' })
  })

  it('fermé un jour sans créneau, inconnu un jour que la source ne dit pas', () => {
    expect(ouvertMaintenant(h, a('2026-10-18T12:00:00Z')).etat).toBe('ferme')
    expect(ouvertMaintenant(h, a('2026-10-19T12:00:00Z')).etat).toBe('inconnu')
    expect(ouvertMaintenant(undefined, a('2026-10-17T16:00:00Z')).etat).toBe('inconnu')
  })

  it('un créneau qui passe minuit couvre le début du jour suivant', () => {
    const nuit = [{ ...accueil, sam: [['20:00', '02:00']], dim: [] }] as unknown as Horaires
    // Dimanche 18/10 à 1 h à Paris = samedi 17/10 à 23:00Z.
    expect(ouvertMaintenant(nuit, a('2026-10-17T23:00:00Z'))).toEqual({ etat: 'ouvert', jusqua: '02:00' })
    expect(ouvertMaintenant(nuit, a('2026-10-18T01:00:00Z')).etat).toBe('ferme')
  })

  it('cas limites de minuit et de fin de créneau (revue code S19)', () => {
    // Fin à l'instant exact : fermé. Samedi 22 h Paris = 20:00Z.
    expect(ouvertMaintenant(h, a('2026-10-17T20:00:00Z')).etat).toBe('ferme')
    // « 00:00 » en fin = minuit : ouvert à 23 h 59.
    const jusquaMinuit = [{ ...accueil, sam: [['20:00', '00:00']] }] as unknown as Horaires
    expect(ouvertMaintenant(jusquaMinuit, a('2026-10-17T21:59:00Z'))).toEqual({ etat: 'ouvert', jusqua: '00:00' })
    // Dimanche soir → lundi : la veille d'un lundi est le dimanche.
    const dimanche = [{ ...accueil, dim: [['20:00', '02:00']], lun: [] }] as unknown as Horaires
    expect(ouvertMaintenant(dimanche, a('2026-10-18T20:00:00Z'))).toEqual({ etat: 'ouvert', jusqua: '02:00' })
    expect(ouvertMaintenant(dimanche, a('2026-10-18T23:00:00Z'))).toEqual({ etat: 'ouvert', jusqua: '02:00' })
    expect(ouvertMaintenant(dimanche, a('2026-10-19T00:00:00Z')).etat).toBe('ferme')
    // La veille « heures non précisées » ne déborde pas sur le jour.
    const vagueVeille = [{ ...accueil, sam: 'heures-non-precisees', dim: [] }] as unknown as Horaires
    expect(ouvertMaintenant(vagueVeille, a('2026-10-17T23:00:00Z')).etat).toBe('ferme')
  })

  it('« sous réserve » quand une remarque accompagne les horaires (saison, rendez-vous)', () => {
    const saison = [{ ...accueil, remarque: 'En juillet et août seulement' }] as unknown as Horaires
    expect(ouvertMaintenant(saison, a('2026-10-17T16:00:00Z'))).toEqual({
      etat: 'sous-reserve',
      jusqua: '22:00',
    })
  })

  it('cas limites de minuit et de fin de créneau (revue code S19)', () => {
    // Fin à l'instant exact : fermé. Samedi 22 h Paris = 20:00Z.
    expect(ouvertMaintenant(h, a('2026-10-17T20:00:00Z')).etat).toBe('ferme')
    // « 00:00 » en fin = minuit : ouvert à 23 h 59.
    const jusquaMinuit = [{ ...accueil, sam: [['20:00', '00:00']] }] as unknown as Horaires
    expect(ouvertMaintenant(jusquaMinuit, a('2026-10-17T21:59:00Z'))).toEqual({ etat: 'ouvert', jusqua: '00:00' })
    // Dimanche soir → lundi : la veille d'un lundi est le dimanche.
    const dimanche = [{ ...accueil, dim: [['20:00', '02:00']], lun: [] }] as unknown as Horaires
    expect(ouvertMaintenant(dimanche, a('2026-10-18T20:00:00Z'))).toEqual({ etat: 'ouvert', jusqua: '02:00' })
    expect(ouvertMaintenant(dimanche, a('2026-10-18T23:00:00Z'))).toEqual({ etat: 'ouvert', jusqua: '02:00' })
    expect(ouvertMaintenant(dimanche, a('2026-10-19T00:00:00Z')).etat).toBe('ferme')
    // La veille « heures non précisées » ne déborde pas sur le jour.
    const vagueVeille = [{ ...accueil, sam: 'heures-non-precisees', dim: [] }] as unknown as Horaires
    expect(ouvertMaintenant(vagueVeille, a('2026-10-17T23:00:00Z')).etat).toBe('ferme')
  })

  it('« heures non précisées » ne dit pas si c’est ouvert à cette heure', () => {
    const vague = [{ ...accueil, sam: 'heures-non-precisees' }] as unknown as Horaires
    expect(ouvertMaintenant(vague, a('2026-10-17T16:00:00Z')).etat).toBe('inconnu')
  })

  it('lit la nature demandée, l’accueil par défaut', () => {
    const vente = [{ ...accueil, nature: 'vente' }] as unknown as Horaires
    expect(ouvertMaintenant(vente, a('2026-10-17T16:00:00Z')).etat).toBe('inconnu')
    expect(ouvertMaintenant(vente, a('2026-10-17T16:00:00Z'), 'vente').etat).toBe('ouvert')
  })
})
