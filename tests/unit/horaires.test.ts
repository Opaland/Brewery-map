import { describe, expect, it } from 'vitest'
import { formaterCreneaux, JOURS, ouvertLe } from '../../src/core/horaires'
import { validerBrasseries } from '../../src/core/schema'
import { LIGNES_REELLES } from './lignes-reelles'

const valide = LIGNES_REELLES[0]
const erreurs = (l: unknown) => {
  const v = validerBrasseries([l])
  return v.ok ? [] : v.erreurs
}
const horaires = {
  nature: 'accueil',
  jeu: [['18:00', '21:30']],
  ven: [['18:00', '21:30']],
  sam: [['15:00', '22:00']],
  dim: [],
  source: 'https://www.montsdulyonnaistourisme.fr/x',
  verifieLe: '2026-10-15',
}

describe('le schéma des horaires', () => {
  it('accepte des créneaux sourcés et datés', () => {
    expect(erreurs({ ...valide, horaires })).toEqual([])
  })

  it('refuse une heure mal écrite ou un créneau à l’envers', () => {
    expect(erreurs({ ...valide, horaires: { ...horaires, sam: [['15h', '22h']] } })).not.toEqual([])
    expect(erreurs({ ...valide, horaires: { ...horaires, sam: [['22:00', '15:00']] } })).not.toEqual([])
    expect(erreurs({ ...valide, horaires: { ...horaires, sam: [['25:00', '26:00']] } })).not.toEqual([])
  })

  it('exige une source et une date', () => {
    const { source: _s, ...sansSource } = horaires
    void _s
    expect(erreurs({ ...valide, horaires: sansSource })).not.toEqual([])
  })
})

describe('ouvertLe', () => {
  it('oui, non, ou inconnu — jamais deviné', () => {
    expect(ouvertLe(horaires as never, 'sam')).toBe('oui')
    expect(ouvertLe(horaires as never, 'dim')).toBe('non')
    expect(ouvertLe(horaires as never, 'lun')).toBe('inconnu')
    expect(ouvertLe(undefined, 'sam')).toBe('inconnu')
  })
})

describe('formaterCreneaux', () => {
  it('écrit les créneaux en clair', () => {
    expect(formaterCreneaux([['15:00', '22:00']])).toBe('15 h – 22 h')
    expect(formaterCreneaux([['09:30', '12:30'], ['15:00', '19:30']])).toBe(
      '9 h 30 – 12 h 30, 15 h – 19 h 30',
    )
    expect(formaterCreneaux([])).toBe('fermé')
    expect(formaterCreneaux(undefined)).toBe('non précisé')
  })

  it('les sept jours, du lundi au dimanche', () => {
    expect(JOURS.map((j) => j.cle)).toEqual(['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'])
  })
})
