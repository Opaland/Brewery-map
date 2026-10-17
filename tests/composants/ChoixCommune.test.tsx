// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { indexerCommunes, type CommuneFrance } from '../../src/core/communes'

/**
 * S236 : l'étage « composants ». Les fichiers de communes sont simulés ; on
 * relève qui les demande, pour la règle de confidentialité (S21).
 */
const COMMUNES: CommuneFrance[] = [
  ['Lyon', '69', 45.758, 4.835],
  ['Lyons-la-Forêt', '27', 49.398, 1.476],
  ['Anse', '69', 45.936, 4.72],
]
const appels = vi.hoisted(() => ({ proches: 0, france: 0 }))
vi.mock('../../src/communesFrance', () => ({
  RAYON_PRES_KM: 100,
  communesProches: () => {
    appels.proches++
    return Promise.resolve(indexerCommunes(COMMUNES))
  },
  communesDeFrance: () => {
    appels.france++
    return Promise.resolve(indexerCommunes(COMMUNES))
  },
}))
const { ChoixCommune } = await import('../../src/ChoixCommune')

const DEPUIS = { lat: 45.6745, lon: 4.7545 }

beforeEach(() => {
  appels.proches = 0
  appels.france = 0
  Element.prototype.scrollIntoView = () => undefined
})
afterEach(cleanup)

describe('ChoixCommune au clavier (motif combobox)', () => {
  it('taper propose les communes ; flèche bas puis Entrée choisit l’option soulignée', async () => {
    const choisir = vi.fn()
    render(<ChoixCommune depuis={DEPUIS} depuisPosition={false} onChoisir={choisir} />)
    const champ = screen.getByTestId('commune-depart')
    await userEvent.type(champ, 'lyo')
    const options = await screen.findAllByRole('option')
    expect(options[0]?.textContent).toContain('Lyon')
    await userEvent.keyboard('{ArrowDown}{Enter}')
    // Lyon, puis Lyons-la-Forêt : la flèche descend sur la seconde.
    expect(options).toHaveLength(2)
    expect(choisir).toHaveBeenCalledExactlyOnceWith(COMMUNES[1])
    expect(champ).toHaveProperty('value', '')
  })

  it('Échap referme la liste sans rien choisir', async () => {
    const choisir = vi.fn()
    render(<ChoixCommune depuis={DEPUIS} depuisPosition={false} onChoisir={choisir} />)
    await userEvent.type(screen.getByTestId('commune-depart'), 'lyo')
    await screen.findAllByRole('option')
    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryAllByRole('option')).toHaveLength(0)
    })
    expect(choisir).not.toHaveBeenCalled()
  })
})

describe('la position ne choisit pas les fichiers demandés (S21, CLAUDE.md §0)', () => {
  it('départ = la position : aucun fichier « par département » n’est demandé', async () => {
    render(<ChoixCommune depuis={DEPUIS} depuisPosition={true} onChoisir={() => undefined} />)
    await waitFor(() => {
      expect(appels.france).toBeGreaterThan(0)
    })
    expect(appels.proches).toBe(0)
  })

  it('témoin : départ = une commune, les fichiers proches sont demandés', async () => {
    render(<ChoixCommune depuis={DEPUIS} depuisPosition={false} onChoisir={() => undefined} />)
    await waitFor(() => {
      expect(appels.proches).toBeGreaterThan(0)
    })
  })
})
