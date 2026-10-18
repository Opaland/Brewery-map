import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * S59 : la promesse « centre de la commune, à environ 2 km près » est fausse
 * (docs/PRECISION.md). Elle vivait sur plusieurs surfaces (CLAUDE.md §3) ;
 * ce test les lit toutes, plutôt que de compter sur la mémoire.
 */
const PROMESSES = [/à environ 2 km près/i, /centre de la commune/i, /centre de leur commune/i, /≈ 2 km/]

function fichiers(dossier: string): string[] {
  return readdirSync(dossier).flatMap((nom) => {
    const chemin = join(dossier, nom)
    return statSync(chemin).isDirectory() ? fichiers(chemin) : [chemin]
  })
}

describe('la promesse de précision communale (S59)', () => {
  it('ne reste sur aucune surface de src/ ni dans docs/DONNEES.md', () => {
    const surfaces = [...fichiers('src').filter((f) => /\.(ts|tsx)$/.test(f)), 'docs/DONNEES.md', 'index.html']
    const restes = surfaces.flatMap((f) => {
      const texte = readFileSync(f, 'utf8')
      return PROMESSES.filter((p) => p.test(texte)).map((p) => `${f} : ${String(p)}`)
    })
    expect(restes).toEqual([])
  })
})
