import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

/**
 * La configuration de Zod (sans eval, CSP) doit précéder tout schéma : un
 * seul module la pose, et les autres importent `z` de lui (revue S38 : posée
 * dans `schema.ts`, elle venait après la construction des schémas de
 * `preferences.ts` dans le nouveau découpage du paquet).
 */
describe('Zod configuré une fois, avant tout schéma (S38)', () => {
  it('aucun module de src/ n’importe « zod » directement, sauf src/core/zod.ts', () => {
    const fautifs: string[] = []
    const parcourir = (dossier: string) => {
      for (const e of readdirSync(dossier, { withFileTypes: true })) {
        const chemin = `${dossier}/${e.name}`
        if (e.isDirectory()) parcourir(chemin)
        else if (/\.(ts|tsx)$/.test(e.name) && chemin !== 'src/core/zod.ts') {
          if (/from 'zod'/.test(readFileSync(chemin, 'utf8'))) fautifs.push(chemin)
        }
      }
    }
    parcourir('src')
    expect(fautifs).toEqual([])
  })
})
