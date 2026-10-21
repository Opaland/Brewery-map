// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import type { Brasserie } from '../../src/core/schema'
import { Provenance } from '../../src/Fiche'

afterEach(() => {
  cleanup()
})

/**
 * S331 (revue adverse du 21/10) : une lecture sans date d'un site qui a aussi
 * une lecture datée était omise de « D'où vient la fiche » (7 fiches de
 * `data/` dans ce cas le 21/10).
 */
describe('Provenance', () => {
  it('cite la lecture non datée à côté de la datée, sans lui prêter de date', () => {
    const b = {
      n: 'Essai',
      c: 'Lyon',
      d: '69',
      src: 'https://exemple.fr/',
      contact: { tel: '04 72 00 00 00', source: 'https://exemple.fr/contact', verifieLe: '2026-10-19' },
    } as unknown as Brasserie
    render(<Provenance brasserie={b} />)
    expect(screen.getByTestId('fiche-source').textContent).toBe(
      'Lu sur exemple.fr (nouvel onglet) : les coordonnées (nouvel onglet) le 19 octobre 2026, la fiche (sans date de lecture).',
    )
  })
})
