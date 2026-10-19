import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

/**
 * S295 (Inès, Léa) : un lien qui quitte le site passe par `LienExterne`, qui
 * dit « nouvel onglet » à qui écoute la page. Un `target="_blank"` posé à la
 * main l'oublierait (§4). Seule exception : l'attribution de la carte, posée
 * par MapLibre dans le DOM, que `Carte.tsx` complète de la même annonce.
 *
 * Les chemins s'écrivent avec « / » : `join` rend `src\Carte.tsx` sous
 * Windows, et les deux exceptions passaient pour fautives (S302, W7).
 */
const fichiers = (dossier: string): string[] =>
  readdirSync(dossier, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? fichiers(`${dossier}/${e.name}`) : /\.tsx?$/.test(e.name) ? [`${dossier}/${e.name}`] : [],
  )

describe('les liens sortants', () => {
  it('ne posent un nouvel onglet que par LienExterne', () => {
    const fautifs = fichiers('src')
      .filter((f) => !['src/LienExterne.tsx', 'src/Carte.tsx'].includes(f))
      .filter((f) => /_blank/.test(readFileSync(f, 'utf8')))
    expect(fautifs).toEqual([])
  })

  it('l’attribution de la carte, ouverte à part, l’annonce aussi', () => {
    const carte = readFileSync('src/Carte.tsx', 'utf8')
    expect(carte).toContain("a.setAttribute('target', '_blank')")
    expect(carte).toContain("t('(nouvel onglet)')")
  })
})
