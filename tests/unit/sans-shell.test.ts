import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

/**
 * S302 CA4 (W3) : sous Windows, `npx` est `npx.cmd`, et `execFileSync` sans
 * shell refuse de le lancer (EINVAL depuis Node 22) ; `node_modules/.bin/tsx`
 * est un script shell, que Windows ne lance pas non plus. Le 19/10, sur le
 * PC fixe, la commande `diff` de la curation cassait, et huit tests de
 * `outil-curation` rougissaient. Un outil Node se relance donc par
 * `process.execPath`, sur le JS de l'outil.
 */
const fichiers = (dossier: string): string[] =>
  readdirSync(dossier, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? fichiers(`${dossier}/${e.name}`) : /\.(ts|mjs)$/.test(e.name) ? [`${dossier}/${e.name}`] : [],
  )

describe('les processus relancés', () => {
  it('ne passent ni par npx ni par node_modules/.bin', () => {
    const fautifs = [...fichiers('outils'), ...fichiers('tests'), ...fichiers('.claude/hooks')]
      .filter((f) => f !== 'tests/unit/sans-shell.test.ts')
      .filter((f) => /exec(File)?Sync\(\s*'npx'|spawn(Sync)?\(\s*'npx'|'\.bin'/.test(readFileSync(f, 'utf8')))
    expect(fautifs).toEqual([])
  })
})
