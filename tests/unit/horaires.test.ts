import { describe, expect, it } from 'vitest'
import { formaterCreneaux, JOURS, ouvertLe } from '../../src/core/horaires'
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
