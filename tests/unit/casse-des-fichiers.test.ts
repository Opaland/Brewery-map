import { execFileSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

/**
 * S302 CA2 (W6) : sous Windows, `MiseAJour.tsx` et `miseAJour.ts` ne font
 * qu'un pour le disque, et TypeScript essaie `.ts` avant `.tsx` : l'import
 * du composant ouvrait la logique, et lint, tsc, build et e2e rougissaient.
 * Deux modules ne diffèrent donc jamais par la seule casse, extension ôtée.
 */
const MODULE = /\.(tsx?|m?js)$/

describe('les noms de fichiers', () => {
  it('deux modules suivis ne diffèrent jamais par la seule casse', () => {
    const suivis = execFileSync('git', ['ls-files'], { encoding: 'utf8' }).split('\n').filter(Boolean)
    const parCle = new Map<string, string[]>()
    for (const f of suivis) {
      const cle = (MODULE.test(f) ? f.replace(MODULE, '') : f).toLowerCase()
      parCle.set(cle, [...(parCle.get(cle) ?? []), f])
    }
    const collisions = [...parCle.values()].filter((fs) => fs.length > 1)
    expect(collisions).toEqual([])
  })
})
