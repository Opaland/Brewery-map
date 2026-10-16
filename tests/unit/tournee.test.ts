import { describe, expect, it } from 'vitest'
import type { Brasserie } from '../../src/core/schema'
import { ETAPES_MAX, lienTournee, ordonnerTournee } from '../../src/core/tournee'
import { LIGNES_REELLES } from './lignes-reelles'

const base = (LIGNES_REELLES as unknown as Brasserie[])[0]
const b = (n: string, lat: number, lon: number, addr = 'Ville'): Brasserie => ({ ...base, n, c: 'Ville', addr, lat, lon })

describe('ma tournée (S27, idée de la veille : les circuits whisky, la route du cidre)', () => {
  const depart = { lat: 45.0, lon: 4.0 }
  const loin = b('Loin', 45.3, 4.0)
  const pres = b('Près', 45.05, 4.0)
  const milieu = b('Milieu', 45.15, 4.0)

  it('ordonne de proche en proche depuis le départ', () => {
    expect(ordonnerTournee([loin, pres, milieu], depart).map((x) => x.n)).toEqual(['Près', 'Milieu', 'Loin'])
  })

  it('au plus quatre étapes : trois étapes intermédiaires, la limite des navigateurs de téléphone', () => {
    expect(ETAPES_MAX).toBe(4)
    const six = [1, 2, 3, 4, 5, 6].map((i) => b(`B${String(i)}`, 45 + i / 10, 4))
    expect(ordonnerTournee(six, depart)).toHaveLength(4)
  })

  it('le lien ne porte que les étapes : jamais le départ', () => {
    const url = new URL(lienTournee([pres, milieu, loin]))
    expect(url.origin + url.pathname).toBe('https://www.google.com/maps/dir/')
    expect(url.searchParams.get('api')).toBe('1')
    expect(url.searchParams.get('origin')).toBeNull()
    expect(url.searchParams.get('destination')).toBe('45.3,4')
    expect(url.searchParams.get('waypoints')).toBe('45.05,4|45.15,4')
    expect(url.toString()).not.toContain('45,4')
  })

  it('une étape à adresse : l’adresse', () => {
    const avecAdresse = b('Adresse', 45.2, 4.1, '3 rue X, 69000 Lyon')
    expect(new URL(lienTournee([avecAdresse])).searchParams.get('destination')).toBe('3 rue X, 69000 Lyon')
  })
})
