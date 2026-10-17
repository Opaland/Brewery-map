import { describe, expect, it } from 'vitest'
import { typeDuStyleUntappd } from '../../src/core/bieres'

/**
 * Le style affiché par Untappd décide du type, pas le nom de la bière (S53,
 * revue adverse : « Ambrée - Loubarde » en Lager - Amber / Red était rangée
 * en lager, contre la note du lot).
 */
describe('typeDuStyleUntappd (S53)', () => {
  it.each([
    ['Lager - Amber / Red', 'ambree'],
    ['Red Ale - American Amber / Red', 'ambree'],
    ['Pilsner - Czech / Bohemian', 'lager'],
    ['Lager - Helles', 'lager'],
    ['Lager - IPL (India Pale Lager)', 'lager'],
    ['Belgian Blonde', 'blonde'],
    ['Blonde / Golden Ale - Other', 'blonde'],
    ['Wheat Beer - Witbier / Blanche', 'blanche'],
    ['Wheat Beer - American Pale Wheat', 'blanche'],
    ['IPA - New England / Hazy', 'ipa'],
    ['IPA - Black / Cascadian Dark Ale', 'ipa'],
    ['Stout - Imperial / Double', 'stout'],
    ['Sour - Fruited Gose', 'sour'],
    ['Porter - Coffee', 'brune'],
    ['Brown Ale - American', 'brune'],
    ['Non-Alcoholic Beer - Pale Ale', 'sans-alcool'],
    ['Pale Ale - American', 'autre'],
    ['Farmhouse Ale - Saison', 'autre'],
    ['Belgian Tripel', 'autre'],
    ['Spiced / Herbed Beer', 'autre'],
  ] as const)('« %s » → %s', (style, type) => {
    expect(typeDuStyleUntappd(style)).toBe(type)
  })
})
