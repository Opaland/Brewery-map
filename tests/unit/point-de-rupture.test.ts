import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { ECRAN_ETROIT, ECRAN_LARGE } from '../../src/core/ecran'

/**
 * S274 (repris de Sentiers, `point-de-rupture.spec.ts`) : la largeur où
 * l'écran passe du téléphone à l'ordinateur est une seule règle. Le CSS ne
 * peut pas importer une constante : ce test tient les deux d'accord (§4ter).
 */
const largeur = (requete: string) => Number(/(\d+)px/.exec(requete)?.[1])

describe('le point de rupture', () => {
  it('l’étroit est le complément exact du large', () => {
    expect(ECRAN_LARGE).toMatch(/^\(min-width: \d+px\)$/)
    expect(ECRAN_ETROIT).toMatch(/^\(max-width: \d+px\)$/)
    expect(largeur(ECRAN_ETROIT)).toBe(largeur(ECRAN_LARGE) - 1)
  })

  it('chaque requête de largeur du CSS est l’une des deux', () => {
    const css = readFileSync('src/index.css', 'utf8')
    const requetes = [...css.matchAll(/\((?:min|max)-width:\s*[^)]*\)/g)].map((m) => m[0])
    expect(requetes.length).toBeGreaterThan(0)
    expect(requetes.filter((r) => r !== ECRAN_LARGE && r !== ECRAN_ETROIT)).toEqual([])
  })

  it('aucun matchMedia de largeur écrit en dur dans src/', () => {
    const fichiers = readdirSync('src', { recursive: true, encoding: 'utf8' }).filter((f) => /\.tsx?$/.test(f))
    const enDur = fichiers.filter((f) => /(?:min|max)-width/.test(readFileSync(join('src', f), 'utf8')))
    expect(enDur).toEqual([join('core', 'ecran.ts')])
  })
})
