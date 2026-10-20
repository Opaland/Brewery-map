import { describe, expect, it } from 'vitest'
import { lecturesDeLaFiche } from '../../src/core/fiche'
import { natureEnTete } from '../../src/core/horaires'
import type { Brasserie } from '../../src/core/schema'

/**
 * S312 : une fiche riche dit ses dates une fois (revue Marie S308 : sur
 * Brasserie Stéphanoise, le même site cité trois fois, à trois dates).
 * Valeurs d'exemple, pas une brasserie réelle.
 */
const SITE = 'https://exemple.test/'
const base = {
  src: SITE,
  verifieLe: '2026-10-17',
  contact: { tel: '04 00 00 00 00', source: `${SITE}contact`, verifieLe: '2026-10-16' },
  horaires: [{ nature: 'vente' as const, sam: [['10:00', '18:00']] as [string, string][], source: `${SITE}horaires`, verifieLe: '2026-10-18' }],
} satisfies Partial<Brasserie>

describe('lecturesDeLaFiche', () => {
  it('CA1 : un même site, trois dates : un groupe, le site une fois, chaque date avec ce qu’elle date', () => {
    expect(lecturesDeLaFiche(base)).toEqual([
      {
        hote: 'exemple.test',
        url: SITE,
        lectures: [
          { quoi: 'fiche', url: SITE, date: '2026-10-17' },
          { quoi: 'coordonnees', url: `${SITE}contact`, date: '2026-10-16' },
          { quoi: 'horaires', url: `${SITE}horaires`, date: '2026-10-18' },
        ],
      },
    ])
  })

  it('CA2 : deux sites, deux groupes, dans l’ordre de la fiche', () => {
    const g = lecturesDeLaFiche({ ...base, contact: { ...base.contact, source: 'https://autre.test/c' } })
    expect(g.map((x) => x.hote)).toEqual(['exemple.test', 'autre.test'])
    expect(g[1]?.lectures).toEqual([{ quoi: 'coordonnees', url: 'https://autre.test/c', date: '2026-10-16' }])
  })

  it('CA2 : plusieurs blocs d’horaires lus le même jour sur le même site ne comptent qu’une fois', () => {
    const deux = [...base.horaires, { ...base.horaires[0], nature: 'accueil' as const }]
    const g = lecturesDeLaFiche({ ...base, horaires: deux })
    expect(g[0]?.lectures.filter((l) => l.quoi === 'horaires')).toHaveLength(1)
  })

  it('CA2 : une fiche sans date garde sa source, sans date inventée ; sans source, rien', () => {
    expect(lecturesDeLaFiche({ src: SITE })).toEqual([{ hote: 'exemple.test', url: SITE, lectures: [{ quoi: 'fiche', url: SITE }] }])
    expect(lecturesDeLaFiche({ src: '' })).toEqual([])
  })
})

describe('natureEnTete (une seule règle : la liste, « En bref », le tableau)', () => {
  it('l’accueil du public d’abord, sinon la première nature, sinon rien', () => {
    expect(natureEnTete([{ ...base.horaires[0] }, { ...base.horaires[0], nature: 'accueil' }])).toBe('accueil')
    expect(natureEnTete(base.horaires)).toBe('vente')
    expect(natureEnTete(undefined)).toBeUndefined()
  })
})
