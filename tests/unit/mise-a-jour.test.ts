import { afterEach, describe, expect, it, vi } from 'vitest'
import { activerNouvelleVersion } from '../../src/miseAJour'

describe('« Recharger » quand plus aucune version n’attend (audit S26, m1)', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('l’autre onglet a déjà activé la version : on recharge la page', async () => {
    const recharger = vi.fn()
    vi.stubGlobal('window', { location: { reload: recharger } })
    vi.stubGlobal('navigator', { serviceWorker: { getRegistration: () => Promise.resolve({ waiting: null }) } })
    activerNouvelleVersion()
    await vi.waitFor(() => {
      expect(recharger).toHaveBeenCalledOnce()
    })
  })

  it('une version attend : on lui demande de s’activer, sans recharger tout de suite', async () => {
    const recharger = vi.fn()
    const poster = vi.fn()
    vi.stubGlobal('window', { location: { reload: recharger } })
    vi.stubGlobal('navigator', {
      serviceWorker: { getRegistration: () => Promise.resolve({ waiting: { postMessage: poster } }) },
    })
    activerNouvelleVersion()
    await vi.waitFor(() => {
      expect(poster).toHaveBeenCalledWith('activer')
    })
    expect(recharger).not.toHaveBeenCalled()
  })
})
