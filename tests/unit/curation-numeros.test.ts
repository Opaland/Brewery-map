import { describe, expect, it } from 'vitest'
import { lireNumeros } from '../../src/core/curation'

/** Les numéros acceptés que Cédric écrit (revues S11, S12, S14), en pur depuis S295. */
describe('lireNumeros', () => {
  it('lit une liste et des plages', () => {
    expect(lireNumeros('1,3,4', 5)).toEqual({ ok: true, numeros: [1, 3, 4] })
    expect(lireNumeros('1-3,5', 5)).toEqual({ ok: true, numeros: [1, 2, 3, 5] })
  })

  it('refuse ce qui n’est pas écrit exactement ainsi, plutôt que de l’interpréter', () => {
    for (const n of ['0x1', '1.0', '1e0', ' 2', '1,,2', '', '1-', '-2', '1--3', '1 3']) {
      expect(lireNumeros(n, 5).ok, n).toBe(false)
    }
    expect(lireNumeros(undefined, 5).ok).toBe(false)
  })

  it('refuse une plage à l’envers et ce qui dépasse le lot', () => {
    expect(lireNumeros('3-1', 5)).toEqual({ ok: false, erreur: 'plage à l’envers : « 3-1 »'.replace('’', "'") })
    expect(lireNumeros('6', 5)).toMatchObject({ ok: false, erreur: expect.stringContaining('dépasse le lot') as string })
    // Sans borne, « 1-999999999 » saturait la mémoire (revue code S14).
    expect(lireNumeros('1-999999999', 5).ok).toBe(false)
  })
})
