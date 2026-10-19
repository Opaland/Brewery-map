import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

/**
 * S302 (W8) : le 19/10, sur le PC fixe, `vite preview` de Sentiers (dépôt
 * frère) tenait déjà le port par défaut de Vite, 4173. Playwright, qui
 * réutilise un serveur déjà lancé hors CI, a testé Sentiers : 209 e2e rouges
 * sur 222, pour rien. Mousse de Poche sert donc sur un port à elle, et
 * `--strictPort` refuse de démarrer ailleurs plutôt que de glisser au port
 * suivant. Un seul port, écrit partout pareil.
 */
const PORT = '4317'

describe('le port local', () => {
  it('vite preview le prend, et refuse de démarrer s’il est pris', () => {
    const scripts = (JSON.parse(readFileSync('package.json', 'utf8')) as { scripts: Record<string, string> }).scripts
    expect(scripts.preview).toBe(`vite preview --port ${PORT} --strictPort`)
  })

  it('le code et les tests n’écrivent que ce port', () => {
    const ecrits = execFileSync(
      'git',
      ['grep', '-h', '-o', '-E', 'localhost:[0-9]+', '--', 'outils', 'tests', 'src', 'playwright.config.ts', 'README.md', 'CONTRIBUTING.md'],
      { encoding: 'utf8' },
    )
      .split('\n')
      .filter(Boolean)
    expect(ecrits.length).toBeGreaterThan(0)
    expect([...new Set(ecrits)]).toEqual([`localhost:${PORT}`])
  })
})
