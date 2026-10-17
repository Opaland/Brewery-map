import { describe, expect, it } from 'vitest'
import { rechercheUntappd } from '../../src/core/untappd'

describe('rechercheUntappd (S51)', () => {
  it('cherche la brasserie par son nom sur untappd.com', () => {
    const url = new URL(rechercheUntappd('La Canute Lyonnaise'))
    expect(url.origin).toBe('https://untappd.com')
    expect(url.pathname).toBe('/search')
    expect(url.searchParams.get('q')).toBe('La Canute Lyonnaise')
    expect(url.searchParams.get('type')).toBe('brewery')
  })

  it('ne porte que le nom : aucun autre paramètre (CLAUDE.md §0)', () => {
    const url = new URL(rechercheUntappd('Tom & Co'))
    expect([...url.searchParams.keys()].sort()).toEqual(['q', 'type'])
    expect(url.searchParams.get('q')).toBe('Tom & Co')
  })
})
