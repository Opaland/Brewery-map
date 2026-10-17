import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { gardeParUneVersionFuture, lirePreferences, PREFERENCES_DEFAUT, VERSION_PREFERENCES } from '../../src/core/preferences'

/**
 * S238 : chaque forme gardée sur un appareil reste lisible par les versions
 * suivantes. Échantillons figés : ne pas les modifier, en ajouter un par
 * nouvelle forme.
 */
const lu = (f: string) => JSON.parse(readFileSync(`tests/unit/fixtures/${f}`, 'utf8')) as unknown

describe('les formes gardées restent lues (S238)', () => {
  it('v1 actuelle : relue à l’identique', () => {
    expect(lirePreferences(lu('preferences-v1.json'))).toEqual(lu('preferences-v1.json'))
  })

  it('v1 d’avant S21 (départ par sa seule clé) : ce qui était gardé l’est encore, le reste prend son défaut', () => {
    expect(lirePreferences(lu('preferences-avant-s21.json'))).toEqual({
      ...PREFERENCES_DEFAUT,
      rayonKm: 20,
      categories: [0, 1, 2, 3],
      depart: { type: 'commune', cle: 'Anse|69' },
      favoris: ['Caribrew'],
    })
  })
})

describe('une version plus récente n’est jamais réécrite (S238)', () => {
  it('reconnaît ce qu’une version future a gardé', () => {
    expect(gardeParUneVersionFuture({ version: VERSION_PREFERENCES + 1 })).toBe(true)
    expect(gardeParUneVersionFuture({ version: VERSION_PREFERENCES })).toBe(false)
    expect(gardeParUneVersionFuture(undefined)).toBe(false)
    expect(gardeParUneVersionFuture({ version: '2' })).toBe(false)
  })
})
