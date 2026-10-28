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
    // Le témoin date d'avant S350 : « seulement mon carnet » y manque, et
    // prend son défaut sans rien perdre du reste.
    // Gardé en v1 : relu en version courante. Ses catégories ([1, 2, 3])
    // n'étaient pas toutes cochées : la 4 (S368) n'est pas ajoutée.
    expect(lirePreferences(lu('preferences-v1.json'))).toEqual({
      ...(lu('preferences-v1.json') as object),
      version: VERSION_PREFERENCES,
      carnetSeulement: false,
    })
    expect(lirePreferences({ ...(lu('preferences-v1.json') as object), carnetSeulement: true }).carnetSeulement).toBe(true)
  })

  it('v1 d’avant S21 (départ par sa seule clé) : ce qui était gardé l’est encore, le reste prend son défaut', () => {
    expect(lirePreferences(lu('preferences-avant-s21.json'))).toEqual({
      ...PREFERENCES_DEFAUT,
      rayonKm: 20,
      categories: [0, 1, 2, 3, 4],
      depart: { type: 'commune', cle: 'Anse|69' },
      favoris: ['Caribrew'],
    })
  })
})

describe('« Consommer sur place seulement » (S368) chez qui avait déjà ses préférences', () => {
  const v1 = lu('preferences-v1.json') as Record<string, unknown>
  it('toutes les anciennes catégories cochées : la nouvelle l’est aussi', () => {
    expect(lirePreferences({ ...v1, categories: [1, 2, 3, 0] }).categories).toEqual([1, 2, 3, 0, 4])
  })
  it('une catégorie décochée : rien n’est deviné, la nouvelle reste décochée', () => {
    expect(lirePreferences({ ...v1, categories: [1, 2, 3] }).categories).toEqual([1, 2, 3])
  })
  it('gardé par cette version, la 4 décochée le reste', () => {
    expect(lirePreferences({ ...v1, version: VERSION_PREFERENCES, categories: [1, 2, 3, 0] }).categories).toEqual([1, 2, 3, 0])
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
