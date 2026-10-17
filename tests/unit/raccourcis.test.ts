import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { lireRaccourci, RACCOURCIS } from '../../src/core/raccourcis'

/** S46 — les raccourcis de l'application installée. */
describe('raccourcis (S46)', () => {
  it('lit le raccourci de l’adresse, et rien d’autre', () => {
    expect(lireRaccourci('?raccourci=autour')).toBe('autour')
    expect(lireRaccourci('?raccourci=favoris')).toBe('favoris')
    expect(lireRaccourci('?raccourci=inconnu')).toBeUndefined()
    expect(lireRaccourci('')).toBeUndefined()
  })

  it('le manifeste déclare exactement les raccourcis que l’application comprend', () => {
    const manifeste = JSON.parse(readFileSync('public/manifest.webmanifest', 'utf8')) as {
      shortcuts?: { url: string }[]
    }
    const urls = (manifeste.shortcuts ?? []).map((s) => lireRaccourci(new URL(s.url, 'https://x/').search))
    expect(urls).toEqual([...RACCOURCIS])
  })
})
