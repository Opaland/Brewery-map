import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * S59 : la promesse « centre de la commune, à environ 2 km près » est fausse
 * (docs/PRECISION.md). Elle vivait sur plusieurs surfaces (CLAUDE.md §3) ;
 * ce test lit tout ce que voit la personne (code, `public/`, README,
 * `docs/DONNEES.md`). `outils/` en est exclu : l'outil de S59 y mesure
 * justement l'écart au centre de la commune, et le géocodage d'un lot s'y
 * replie vraiment sur ce centre.
 */
// `\s` couvre l'espace insécable.
// S268 : « au centre de la commune selon l'IGN » est vrai pour la précision
// `centre` ; la formule reste interdite sans « selon l'IGN ».
// La forme sans article (« ni un centre de commune ») n'est pas visée : elle
// sert aux négations et à citer Cédric (revue adverse S268). Le libellé de
// `commune` est gardé à part (`fiche.test.ts`).
const PROMESSES = [/environ\s+2\s*km/i, /centre\s+de\s+(la|leur|sa)\s+commune(?!\s+selon\s+l.IGN)/i, /≈\s*2\s*km/]

function fichiers(dossier: string): string[] {
  return readdirSync(dossier).flatMap((nom) => {
    const chemin = join(dossier, nom)
    return statSync(chemin).isDirectory() ? fichiers(chemin) : [chemin]
  })
}

describe('la promesse de précision communale (S59)', () => {
  it('ne reste sur aucune surface publiée ni dans le code', () => {
    const surfaces = [
      ...fichiers('src').filter((f) => /\.(ts|tsx)$/.test(f)),
      ...fichiers('public').filter((f) => /\.(js|json|webmanifest|html)$/.test(f) && !f.includes('communes')),
      'index.html',
      'README.md',
      'docs/DONNEES.md',
    ]
    const restes = surfaces.flatMap((f) => {
      const texte = readFileSync(f, 'utf8')
      return PROMESSES.filter((p) => p.test(texte)).map((p) => `${f} : ${String(p)}`)
    })
    expect(restes).toEqual([])
  })
})
