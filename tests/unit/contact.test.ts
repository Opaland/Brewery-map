import { describe, expect, it } from 'vitest'
import { lienTelephone } from '../../src/core/fiche'
import { validerBrasseries } from '../../src/core/schema'
import { LIGNES_REELLES } from './lignes-reelles'

const valide = LIGNES_REELLES[0]
const erreurs = (ligne: unknown) => {
  const v = validerBrasseries([ligne])
  return v.ok ? [] : v.erreurs
}
const contact = {
  tel: '04 72 50 88 53',
  site: 'https://www.nomadebiere.fr/',
  untappd: 'https://untappd.com/NomadeBrewery/beer',
  source: 'https://www.nomadebiere.fr/la-taproom/',
  verifieLe: '2026-10-15',
}

describe('le contact', () => {
  it('accepte un contact complet et sourcé', () => {
    expect(erreurs({ ...valide, contact })).toEqual([])
  })

  it('exige une source et une date : un numéro sans origine ne passe pas', () => {
    const { source: _s, ...sansSource } = contact
    void _s
    expect(erreurs({ ...valide, contact: sansSource })).not.toEqual([])
    const { verifieLe: _v, ...sansDate } = contact
    void _v
    expect(erreurs({ ...valide, contact: sansDate })).not.toEqual([])
  })

  it('n’accepte qu’un numéro français écrit en paires', () => {
    expect(erreurs({ ...valide, contact: { ...contact, tel: '0472508853' } })).not.toEqual([])
    expect(erreurs({ ...valide, contact: { ...contact, tel: '+33 4 72 50 88 53' } })).not.toEqual([])
    expect(erreurs({ ...valide, contact: { ...contact, tel: '00 72 50 88 53' } })).not.toEqual([])
  })

  it('refuse les numéros spéciaux en 08 (souvent surtaxés)', () => {
    expect(erreurs({ ...valide, contact: { ...contact, tel: '08 99 12 34 56' } })).not.toEqual([])
    expect(erreurs({ ...valide, contact: { ...contact, tel: '09 81 94 27 79' } })).toEqual([])
  })

  it('refuse un contact qui ne contient aucun moyen de joindre', () => {
    expect(
      erreurs({ ...valide, contact: { source: contact.source, verifieLe: contact.verifieLe } }),
    ).not.toEqual([])
  })

  it('n’accepte comme lien Untappd qu’une page d’untappd.com', () => {
    expect(
      erreurs({ ...valide, contact: { ...contact, untappd: 'https://untappd.fake.com/x' } }),
    ).not.toEqual([])
    expect(
      erreurs({ ...valide, contact: { ...contact, untappd: 'https://www.untappd.com/x' } }),
    ).toEqual([])
  })
})

describe('lienTelephone', () => {
  it('rend un lien tel: international', () => {
    expect(lienTelephone('04 72 50 88 53')).toBe('tel:+33472508853')
    expect(lienTelephone('06 64 34 13 57')).toBe('tel:+33664341357')
  })
})
