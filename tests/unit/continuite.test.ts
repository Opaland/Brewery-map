import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { SERVICES } from '../../outils/services-sondes'

/**
 * S281 : chaque service sondé par `sonde-nuit.yml` (S277) a sa ligne dans
 * `docs/CONTINUITE.md` — ce qui casse s'il tombe. Deux listes qui disent la
 * même chose, tenues d'accord par ce test (CLAUDE.md §4ter).
 */
describe('docs/CONTINUITE.md', () => {
  const texte = readFileSync('docs/CONTINUITE.md', 'utf8')
  const lignes = texte.split('\n').filter((l) => l.startsWith('| ') && !l.startsWith('| Service'))

  it('chaque hôte sondé a sa ligne', () => {
    const hotes = SERVICES.map((s) => new URL(s.url).hostname)
    expect(hotes.filter((h) => !lignes.some((l) => l.includes(`\`${h}\``)))).toEqual([])
  })
})
