import { describe, expect, it } from 'vitest'
import { formaterCreneaux, JOURS, ouvertLe, ouvertMaintenant, etatPourLaListe, phraseProchaine, prochaineOuverture, type Horaires } from '../../src/core/horaires'
import { validerBrasseries, type Brasserie } from '../../src/core/schema'
import { choisirLangue } from '../../src/i18n'
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

describe('prochaineOuverture (S295, la fiche face à la concurrence)', () => {
  const a = (iso: string) => new Date(iso)
  const semaine = [{ ...accueil, lun: [], mar: [], mer: [] }] as unknown as Horaires

  it('plus tard le même jour', () => {
    // Samedi 17/10, 12 h à Paris ; ouverture à 15 h.
    expect(prochaineOuverture(semaine, a('2026-10-17T10:00:00Z'))).toEqual({ etat: 'connue', jour: 'sam', heure: '15:00', dansJours: 0, sousReserve: false })
  })

  it('quelques jours plus loin, en passant les jours fermés', () => {
    // Dimanche 18/10 à midi : fermé dimanche, lundi, mardi, mercredi ; jeudi 18 h.
    expect(prochaineOuverture(semaine, a('2026-10-18T10:00:00Z'))).toEqual({ etat: 'connue', jour: 'jeu', heure: '18:00', dansJours: 4, sousReserve: false })
  })

  it('n’en déduit rien quand un jour d’avant n’est pas dit par la source', () => {
    // Samedi 23 h : dimanche fermé, lundi inconnu : peut-être ouvert.
    const h = [accueil] as unknown as Horaires
    expect(prochaineOuverture(h, a('2026-10-17T21:00:00Z'))).toEqual({ etat: 'inconnue' })
    expect(prochaineOuverture(undefined, a('2026-10-17T21:00:00Z'))).toEqual({ etat: 'inconnue' })
  })

  it('ni quand un jour est ouvert sans heures', () => {
    const h = [{ ...accueil, dim: 'heures-non-precisees', lun: [], mar: [], mer: [] }] as unknown as Horaires
    expect(prochaineOuverture(h, a('2026-10-17T21:00:00Z'))).toEqual({ etat: 'inconnue' })
  })

  it('dit la réserve d’une remarque', () => {
    const h = [{ ...accueil, lun: [], mar: [], mer: [], remarque: 'sur rendez-vous' }] as unknown as Horaires
    expect(prochaineOuverture(h, a('2026-10-17T10:00:00Z'))).toMatchObject({ etat: 'connue', sousReserve: true })
  })

  it('ouvert un seul jour, déjà passé : le même jour, la semaine suivante (revue adverse S295)', () => {
    const h = [{ ...accueil, lun: [], mar: [], mer: [], jeu: [], ven: [], sam: [['10:00', '12:00']], dim: [] }] as unknown as Horaires
    // Samedi 17/10, 15 h à Paris.
    expect(prochaineOuverture(h, a('2026-10-17T13:00:00Z'))).toEqual({ etat: 'connue', jour: 'sam', heure: '10:00', dansJours: 7, sousReserve: false })
  })

  it('une semaine sans aucun créneau : rien à annoncer', () => {
    const h = [{ ...accueil, lun: [], mar: [], mer: [], jeu: [], ven: [], sam: [], dim: [] }] as unknown as Horaires
    expect(prochaineOuverture(h, a('2026-10-17T10:00:00Z'))).toEqual({ etat: 'inconnue' })
  })
})

describe('phraseProchaine', () => {
  const bloc = { ...accueil, lun: [], mar: [], mer: [] } as unknown as Horaires[number]
  it('dit le jour et l’heure, en mots', () => {
    expect(phraseProchaine([bloc], 'accueil', new Date('2026-10-17T10:00:00Z'))).toBe('Prochaine ouverture : aujourd’hui à 15 h.')
    expect(phraseProchaine([bloc], 'accueil', new Date('2026-10-17T21:00:00Z'))).toBe('Prochaine ouverture : jeudi à 18 h.')
    expect(phraseProchaine([bloc], 'accueil', new Date('2026-10-21T10:00:00Z'))).toBe('Prochaine ouverture : demain à 18 h.')
  })

  it('en anglais, le jour garde sa majuscule', () => {
    choisirLangue('en')
    try {
      expect(phraseProchaine([bloc], 'accueil', new Date('2026-10-17T21:00:00Z'))).toBe('Next opening: Thursday at 18:00.')
    } finally {
      choisirLangue('fr')
    }
  })
})

describe('etatPourLaListe (S295, Hugo)', () => {
  const a = (iso: string) => new Date(iso)
  it('dit l’état de l’accueil, ou de la vente, et rien quand la source se tait', () => {
    expect(etatPourLaListe([accueil] as unknown as Horaires, a('2026-10-17T16:00:00Z'))).toBe('Ouvert au public maintenant')
    expect(etatPourLaListe([accueil] as unknown as Horaires, a('2026-10-18T12:00:00Z'))).toBe('Fermé au public maintenant')
    expect(etatPourLaListe([accueil] as unknown as Horaires, a('2026-10-19T12:00:00Z'))).toBeUndefined()
    expect(etatPourLaListe(undefined, a('2026-10-17T16:00:00Z'))).toBeUndefined()
    const vente = [{ ...accueil, nature: 'vente', remarque: 'sur rendez-vous' }] as unknown as Horaires
    expect(etatPourLaListe(vente, a('2026-10-17T16:00:00Z'))).toBe('Vente ouverte maintenant, sous réserve')
  })
})

/**
 * Les horaires d'une saison (S299, issue #51). Samedi 17/10/2026 18 h à
 * Paris = 16:00Z ; samedi 16/01/2027 11 h = 10:00Z ; dimanche 30/08/2026
 * 12 h = 10:00Z.
 */
describe('les horaires d’une saison (S299)', () => {
  const a = (iso: string) => new Date(iso)
  const ete = { ...accueil, lun: [], mar: [], mer: [], jeu: [], ven: [], sam: [['15:00', '22:00']], dim: [], periode: { du: '07-01', au: '08-31' } }
  const hiver = { ...accueil, lun: [], mar: [], mer: [], jeu: [], ven: [], sam: [['10:00', '13:00']], dim: [], periode: { du: '10-01', au: '03-31' } }

  it('CA1 : une période « MM-JJ », qui peut passer le 1er janvier ; une date impossible est refusée', () => {
    expect(erreurs(avec([ete]))).toEqual([])
    expect(erreurs(avec([hiver]))).toEqual([])
    expect(erreurs(avec([{ ...ete, periode: { du: '02-30', au: '08-31' } }]))).not.toEqual([])
    expect(erreurs(avec([{ ...ete, periode: { du: '7-1', au: '08-31' } }]))).not.toEqual([])
  })

  it('CA2 : deux blocs de même nature, seulement avec des périodes qui ne se chevauchent pas', () => {
    expect(erreurs(avec([ete, hiver]))).toEqual([])
    expect(erreurs(avec([ete, { ...hiver, periode: { du: '08-15', au: '09-30' } }]))).not.toEqual([])
    expect(erreurs(avec([ete, accueil]))).not.toEqual([])
  })

  it('CA3 : le bloc de la saison du jour ; hors de toute période, ni ouvert ni fermé', () => {
    const h = [ete, hiver] as unknown as Horaires
    expect(ouvertMaintenant(h, a('2026-10-17T10:00:00Z'))).toEqual({ etat: 'ouvert', jusqua: '13:00' })
    expect(ouvertMaintenant(h, a('2027-01-16T10:00:00Z'))).toEqual({ etat: 'ouvert', jusqua: '13:00' })
    expect(ouvertMaintenant([ete] as unknown as Horaires, a('2026-10-17T16:00:00Z'))).toEqual({ etat: 'inconnu', horsPeriode: true })
  })

  it('CA4 : la prochaine ouverture ne franchit pas la fin d’une période', () => {
    expect(prochaineOuverture([ete] as unknown as Horaires, a('2026-08-30T10:00:00Z'))).toEqual({ etat: 'inconnue' })
    expect(prochaineOuverture([ete] as unknown as Horaires, a('2026-08-23T10:00:00Z')).etat).toBe('connue')
  })

  it('CA6 : la ligne de liste ne dit rien hors période', () => {
    expect(etatPourLaListe([ete] as unknown as Horaires, a('2026-10-17T16:00:00Z'))).toBeUndefined()
    expect(etatPourLaListe([ete, hiver] as unknown as Horaires, a('2026-10-17T10:00:00Z'))).toBe('Ouvert au public maintenant')
  })
})

describe('les saisons : revue adverse S299', () => {
  const a = (iso: string) => new Date(iso)
  const dix = [['10:00', '12:00']]
  it('la prochaine ouverture lit la saison suivante quand elle est publiée', () => {
    const ete = { ...accueil, lun: dix, mar: dix, mer: [], jeu: [], ven: [], sam: [], dim: [], periode: { du: '07-01', au: '08-31' } }
    const hiver = { ...ete, periode: { du: '09-01', au: '06-30' } }
    // Lundi 31/08/2026 à 18 h à Paris : fermé ; mardi 1er septembre, l'hiver.
    expect(phraseProchaine([ete, hiver] as unknown as Horaires, 'accueil', a('2026-08-31T16:00:00Z'))).toBe('Prochaine ouverture : demain à 10 h.')
  })

  it('la veille se compte en jours du calendrier, pas en 24 heures (changement d’heure)', () => {
    // Lundi 30/03/2026 à 0 h 30 à Paris = 29/03 22:30Z ; la veille est le dimanche 29/03.
    const b = { ...accueil, lun: [], dim: [['20:00', '02:00']], periode: { du: '11-01', au: '03-28' } }
    const aa = { ...accueil, lun: [], dim: [['10:00', '12:00']], periode: { du: '03-29', au: '10-31' } }
    expect(ouvertMaintenant([b, aa] as unknown as Horaires, a('2026-03-29T22:30:00Z')).etat).toBe('ferme')
  })

  it('une période qui finit le 28 février couvre aussi le 29', () => {
    const hiver = { ...accueil, mar: dix, periode: { du: '11-01', au: '02-28' } }
    const ete = { ...accueil, mar: dix, periode: { du: '03-01', au: '10-31' } }
    expect(erreurs(avec([hiver, ete]))).toEqual([])
    // Mardi 29/02/2028 à 11 h à Paris.
    expect(ouvertMaintenant([hiver, ete] as unknown as Horaires, a('2028-02-29T10:00:00Z')).etat).toBe('ouvert')
  })
})
