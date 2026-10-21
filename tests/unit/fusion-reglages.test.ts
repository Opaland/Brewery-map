import { describe, expect, it } from 'vitest'
import { fusionnerReglages, PREFERENCES_DEFAUT, type Preferences } from '../../src/core/preferences'

/**
 * S333 (revue globale du 19/10, A15) : deux onglets ouverts. Chacun n'écrit
 * que ce qu'il a changé depuis ce qu'il savait ; sinon le dernier qui écrit
 * remettait les réglages de l'autre (le rayon, par exemple).
 */
const base: Preferences = { ...PREFERENCES_DEFAUT, rayonKm: 30, theme: 'auto' }

describe('fusionnerReglages', () => {
  it('un onglet change le thème, l’autre avait changé le rayon : la garde garde les deux', () => {
    const autreOnglet = { ...base, rayonKm: 80 }
    const voulu = { ...base, theme: 'sombre' as const }
    expect(fusionnerReglages(base, voulu, autreOnglet)).toEqual({ ...base, rayonKm: 80, theme: 'sombre' })
  })

  it('le champ changé ici l’emporte sur la garde', () => {
    const autreOnglet = { ...base, rayonKm: 80 }
    const voulu = { ...base, rayonKm: 50 }
    expect(fusionnerReglages(base, voulu, autreOnglet).rayonKm).toBe(50)
  })

  it('rien de gardé (effacé ailleurs, ou premier geste) : ce que veut cet onglet', () => {
    const voulu = { ...base, rayonKm: 50 }
    expect(fusionnerReglages(base, voulu, undefined)).toEqual(voulu)
  })

  it('un champ facultatif retiré ici (le type de bière) est retiré de la garde', () => {
    const avecType = { ...base, type: 'ipa' as const }
    const sansType: Preferences = { ...base }
    const autreOnglet = { ...avecType, rayonKm: 80 }
    expect(fusionnerReglages(avecType, sansType, autreOnglet)).toEqual({ ...sansType, rayonKm: 80 })
  })
})
