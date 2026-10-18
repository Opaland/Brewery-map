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

// Toute condition de largeur, quelle que soit sa forme (revue adverse
// S274) : `min-width`, en capitales comme en minuscules, la syntaxe de plage
// (`width >= 900px`, `900px <= width`) et `innerWidth` ; pas la largeur
// d'un objet mesuré (`ctx.measureText(t).width > max`, `ImageTournee.tsx`).
const CONDITION_DE_LARGEUR = /(?:min|max)-width|(?<![.\w-])width\s*[<>]|[<>]=?\s*width\b|innerWidth/i
const fichiersDeSrc = (extension: RegExp) =>
  readdirSync('src', { recursive: true, encoding: 'utf8' }).filter((f) => extension.test(f))

describe('le point de rupture', () => {
  it('l’étroit est le complément exact du large', () => {
    expect(ECRAN_LARGE).toMatch(/^\(min-width: \d+px\)$/)
    expect(ECRAN_ETROIT).toMatch(/^\(max-width: \d+px\)$/)
    expect(largeur(ECRAN_ETROIT)).toBe(largeur(ECRAN_LARGE) - 1)
  })

  it('chaque requête de largeur du CSS est l’une des deux', () => {
    const requetes = fichiersDeSrc(/\.css$/).flatMap((f) =>
      [...readFileSync(join('src', f), 'utf8').matchAll(/\([^()]*\)/g)]
        .map((m) => m[0])
        .filter((r) => CONDITION_DE_LARGEUR.test(r)),
    )
    expect(requetes.length).toBeGreaterThan(0)
    expect(requetes.filter((r) => r !== ECRAN_LARGE && r !== ECRAN_ETROIT)).toEqual([])
  })

  it('la garde voit toutes les formes d’une condition de largeur', () => {
    for (const forme of ['(min-width:900px)', '(MAX-WIDTH: 899px)', '(width >= 900px)', '(900px <= width)', 'window.innerWidth >= 900'])
      expect(CONDITION_DE_LARGEUR.test(forme), forme).toBe(true)
    for (const autre of ['(prefers-reduced-motion: reduce)', '(max-height: 700px)', '(display-mode: standalone)', 'ctx.measureText(t).width > max'])
      expect(CONDITION_DE_LARGEUR.test(autre), autre).toBe(false)
  })

  it('aucun matchMedia de largeur écrit en dur dans src/', () => {
    const enDur = fichiersDeSrc(/\.tsx?$/).filter((f) => CONDITION_DE_LARGEUR.test(readFileSync(join('src', f), 'utf8')))
    expect(enDur).toEqual([join('core', 'ecran.ts')])
  })
})
