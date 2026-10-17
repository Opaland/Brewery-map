import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

/**
 * S232 : tous les specs passent par la fixture qui vérifie qu'aucune requête
 * n'emporte la position (`tests/e2e/position.ts`). Un spec qui importerait
 * `test` de `@playwright/test` y échapperait sans bruit (§4ter).
 */
describe('la garde de la position couvre tous les e2e (S232)', () => {
  it('aucun spec n’importe test ou expect de @playwright/test', () => {
    const fautifs = readdirSync('tests/e2e')
      .filter((f) => f.endsWith('.spec.ts'))
      .filter((f) => {
        const texte = readFileSync(`tests/e2e/${f}`, 'utf8')
        return /import\s*\{[^}]*\b(test|expect)\b[^}]*\}\s*from\s*'@playwright\/test'/.test(texte)
      })
    expect(fautifs).toEqual([])
  })
})
