// @vitest-environment jsdom
import { cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useCarnetEntreOnglets, type Carnet } from '../../src/crochets'

/**
 * S237 : le carnet passe d'un onglet à l'autre (S24, S35). Deux crochets
 * montés font deux onglets : le canal (BroadcastChannel) les relie.
 */
const VIDE: Carnet = { favoris: [], visites: [], notes: [] }

function onglet(initial: Carnet = VIDE) {
  const recu = { favoris: vi.fn(), visites: vi.fn(), notes: vi.fn(), effacement: vi.fn() }
  const h = renderHook((c: Carnet) => useCarnetEntreOnglets(c, recu), { initialProps: initial })
  return { ...h, recu }
}

afterEach(cleanup)

describe('le carnet entre onglets (S237)', () => {
  it('un favori, une visite, une note ajoutés dans un onglet arrivent dans l’autre', async () => {
    const a = onglet()
    const b = onglet()
    a.rerender({
      favoris: ['Caribrew'],
      visites: [{ nom: 'Caribrew', date: '2026-10-17' }],
      notes: [{ nom: 'Caribrew', texte: 'La blanche.' }],
    })
    await waitFor(() => {
      expect(b.recu.favoris).toHaveBeenCalledWith(['Caribrew'])
      expect(b.recu.visites).toHaveBeenCalledWith([{ nom: 'Caribrew', date: '2026-10-17' }])
      expect(b.recu.notes).toHaveBeenCalledWith([{ nom: 'Caribrew', texte: 'La blanche.' }])
    })
  })

  it('ce qui est reçu n’est pas renvoyé (pas d’écho)', async () => {
    const a = onglet()
    const b = onglet()
    a.rerender({ ...VIDE, favoris: ['Caribrew'] })
    await waitFor(() => {
      expect(b.recu.favoris).toHaveBeenCalledWith(['Caribrew'])
    })
    // L'onglet B applique ce qu'il a reçu : il ne doit rien renvoyer à A.
    b.rerender({ ...VIDE, favoris: ['Caribrew'] })
    await new Promise((r) => setTimeout(r, 50))
    expect(a.recu.favoris).not.toHaveBeenCalled()
  })

  it('l’effacement fait dans un onglet arrive dans l’autre', async () => {
    const a = onglet()
    const b = onglet()
    a.result.current.annoncerEffacement()
    await waitFor(() => {
      expect(b.recu.effacement).toHaveBeenCalledTimes(1)
    })
  })
})
