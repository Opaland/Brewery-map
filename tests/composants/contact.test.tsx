// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Contact } from '../../src/Contact'
import type { Brasserie } from '../../src/core/schema'

afterEach(() => {
  cleanup()
})

/**
 * Un numéro cité par la source, sans téléphone vérifié (revue métier S4).
 * Repris de `tests/e2e/fiche.spec.ts` le 21/10 : la dernière fiche réelle
 * dans ce cas (Animus) a reçu sa nouvelle adresse et une note sans numéro ;
 * le comportement reste, la preuve passe sur une fiche d'essai.
 */
describe('Contact', () => {
  const base = { n: 'Essai', c: 'Lyon', d: '69', src: 'https://exemple.fr/' }

  it('une note qui cite un numéro, sans téléphone vérifié : la fiche renvoie à la source', () => {
    render(<Contact brasserie={{ ...base, note: 'Contact : 04 72 00 00 00.' } as unknown as Brasserie} />)
    expect(screen.getByText('La source cite un numéro, non revérifié : voyez « Ce que dit la source », plus haut.')).toBeTruthy()
  })

  it('avec un téléphone vérifié, la phrase ne paraît pas', () => {
    const b = {
      ...base,
      note: 'Contact : 04 72 00 00 00.',
      contact: { tel: '04 72 00 00 00', source: 'https://exemple.fr/', verifieLe: '2026-10-21' },
    } as unknown as Brasserie
    render(<Contact brasserie={b} />)
    expect(screen.queryByText(/La source cite un numéro/)).toBeNull()
  })
})
