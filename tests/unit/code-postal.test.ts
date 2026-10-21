import { describe, expect, it } from 'vitest'
import { departementDuCodePostal } from '../../src/core/code-postal'

/** S331 : le département d'un code postal, une seule règle (§4ter). */
describe('departementDuCodePostal', () => {
  it.each([
    ['69530', '69'],
    ['01000', '01'],
    ['20000', '2A'],
    ['20190', '2A'],
    ['20200', '2B'],
    ['20600', '2B'],
    ['97400', '974'],
    ['98000', '980'],
  ])('%s → %s', (cp, dep) => {
    expect(departementDuCodePostal(cp)).toBe(dep)
  })
})

describe('un code postal d’outre-mer dans un lot', () => {
  it('donne un département que le schéma des fiches refuse, plutôt que « 97 », qui n’en est aucun', async () => {
    const { brasserieObjetSchema } = await import('../../src/core/schema')
    const d = brasserieObjetSchema.shape.d
    expect(d.safeParse(departementDuCodePostal('97400')).success).toBe(false)
    expect(d.safeParse(departementDuCodePostal('69530')).success).toBe(true)
    expect(d.safeParse(departementDuCodePostal('20200')).success).toBe(true)
  })
})
