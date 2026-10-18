import { describe, expect, it, vi } from 'vitest'
import { aDesDonneesPersonnelles, demandeDePersistance } from '../../src/core/persistance'
import { PREFERENCES_DEFAUT } from '../../src/core/preferences'

/** S275 : demander au navigateur de garder ce que la personne a écrit. */
const AVEC_FAVORI = { ...PREFERENCES_DEFAUT, favoris: ['La Canaille'] }

describe('aDesDonneesPersonnelles', () => {
  it('des réglages seuls ne comptent pas', () => {
    const reglages = { ...PREFERENCES_DEFAUT, rayonKm: 80, theme: 'sombre' as const }
    expect(aDesDonneesPersonnelles(reglages)).toBe(false)
  })
  it('un favori, une visite ou une note comptent', () => {
    expect(aDesDonneesPersonnelles(AVEC_FAVORI)).toBe(true)
    expect(aDesDonneesPersonnelles({ ...PREFERENCES_DEFAUT, visites: [{ nom: 'X', date: '2026-10-18' }] })).toBe(true)
    expect(aDesDonneesPersonnelles({ ...PREFERENCES_DEFAUT, notes: [{ nom: 'X', texte: 'bonne' }] })).toBe(true)
  })
})

const navigateur = (persiste = false) => ({
  persisted: vi.fn(() => Promise.resolve(persiste)),
  persist: vi.fn(() => Promise.resolve(true)),
})

describe('demandeDePersistance', () => {
  // Appelée par un geste qui ajoute au carnet (revue adverse S275 : tirée
  // de l'état gardé, elle partait au changement de rayon dès qu'un favori
  // existait, et dans un onglet qui ne faisait que recevoir le carnet).
  it('le premier geste demande, une fois par ouverture', async () => {
    const s = navigateur()
    const demander = demandeDePersistance(s)
    expect(s.persist).not.toHaveBeenCalled()
    await demander()
    await demander()
    expect(s.persist).toHaveBeenCalledTimes(1)
  })

  it('déjà persistant : aucune demande', async () => {
    const s = navigateur(true)
    await demandeDePersistance(s)()
    expect(s.persist).not.toHaveBeenCalled()
  })

  it('sans l’API, ou si elle rejette, rien ne casse', async () => {
    await expect(demandeDePersistance(undefined)()).resolves.toBeUndefined()
    const rejette = { persisted: () => Promise.reject(new Error('non')), persist: vi.fn(() => Promise.resolve(true)) }
    await expect(demandeDePersistance(rejette)()).resolves.toBeUndefined()
  })
})
