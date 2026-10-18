import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { hotesTiers, POLITIQUE } from '../../build/csp'
import { ELEMENTS_MAX } from '../../src/core/sauvegarde'

/**
 * S285 : des règles écrites à deux endroits, trouvées par l'agent
 * `chasseur-de-jumeaux`, et tenues d'accord ici (CLAUDE.md §4ter).
 */
describe('les règles jumelles', () => {
  it('l’hôte des tuiles est le même pour la carte, le service worker et la politique de sécurité', () => {
    const carte = /tiles: \['https:\/\/([^/]+)\//.exec(readFileSync('src/Carte.tsx', 'utf8'))?.[1]
    const sw = /function estTuile\(url\) \{\s*return url\.hostname === '([^']+)'/.exec(readFileSync('public/sw.js', 'utf8'))?.[1]
    expect(carte).toBeDefined()
    // Changé dans la carte seule, le service worker cesserait en silence
    // de garder les tuiles (la CSP, elle, casserait bruyamment).
    expect(sw).toBe(carte)
    expect(hotesTiers(POLITIQUE)).toContain(carte)
  })

  it('la borne d’une sauvegarde reste bien au-dessus des brasseries de l’application', () => {
    const fiches = (JSON.parse(readFileSync('data/breweries.json', 'utf8')) as unknown[]).length
    const osm = (JSON.parse(readFileSync('src/donnees-osm/brasseries-osm.json', 'utf8')) as { brasseries: unknown[] }).brasseries.length
    expect(fiches + osm).toBeGreaterThan(1000)
    expect(ELEMENTS_MAX).toBeGreaterThan(2 * (fiches + osm))
  })
})
