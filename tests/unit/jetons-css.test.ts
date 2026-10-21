import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * S332 (revue globale du 19/10, A22 et A27) : les règles du CSS que l'œil ne
 * voit pas en relisant, tenues par un test.
 */
const css = readdirSync('src', { recursive: true, encoding: 'utf8' })
  .filter((f) => f.endsWith('.css'))
  .map((f) => readFileSync(join('src', f), 'utf8'))
  .join('\n')
const sansCommentaires = css.replace(/\/\*[\s\S]*?\*\//g, '')

describe('les jetons CSS', () => {
  it('chaque jeton utilisé est défini (A22 : `--espace-1` ne l’était pas)', () => {
    const definis = new Set([...sansCommentaires.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]))
    const utilises = new Set([...sansCommentaires.matchAll(/var\((--[\w-]+)\)/g)].map((m) => m[1]))
    expect([...utilises].filter((j) => !definis.has(j))).toEqual([])
  })
})

/** Les règles de premier niveau et celles d'une @media, avec la condition qui les entoure. */
function regles(source: string): { selecteur: string; condition: string }[] {
  const sortie: { selecteur: string; condition: string }[] = []
  const pile: string[] = []
  let tampon = ''
  for (const c of source) {
    if (c === '{') {
      const tete = tampon.trim()
      if (tete.startsWith('@')) pile.push(tete)
      else {
        sortie.push({ selecteur: tete, condition: pile.join(' ') })
        pile.push('')
      }
      tampon = ''
    } else if (c === '}') {
      pile.pop()
      tampon = ''
    } else if (c === ';' && pile.at(-1) !== undefined && pile.at(-1) !== '' ) {
      tampon = ''
    } else tampon += c
  }
  return sortie
}

describe('les survols et les appuis (A27)', () => {
  const toutes = regles(sansCommentaires)
  it('un survol ne s’applique que sous `(hover: hover)` : au doigt, il restait coloré après le toucher', () => {
    const horsHover = toutes.filter((r) => r.selecteur.includes(':hover') && !r.condition.includes('(hover: hover)'))
    expect(horsHover.map((r) => r.selecteur)).toEqual([])
  })
  it('une mise à l’échelle au toucher ne s’applique pas quand moins d’animations est demandé', () => {
    const echelles = [...sansCommentaires.matchAll(/([^{}]*:active[^{}]*)\{[^}]*transform:\s*scale/g)].map((m) => m[1].trim())
    const mal = toutes.filter(
      (r) => echelles.includes(r.selecteur) && !r.condition.includes('(prefers-reduced-motion: no-preference)'),
    )
    expect(mal.map((r) => r.selecteur)).toEqual([])
  })
  it('un bouton désactivé a son style', () => {
    expect(toutes.some((r) => /button:disabled|:disabled/.test(r.selecteur))).toBe(true)
  })
})
