import { describe, expect, it } from 'vitest'
import { themeAuChoix } from '../../build/theme'

/** S45 — un thème au choix, tiré des blocs sombres de la feuille, sans les recopier. */
describe('thème au choix (S45)', () => {
  it('un bloc sombre s’applique en automatique sauf « clair », et toujours en « sombre »', () => {
    const css = `a{color:red}
@media (prefers-color-scheme: dark) {
  :root { --papier: #000; }
  .x .y { color: #fff; }
}
b{color:blue}`
    const sortie = themeAuChoix(css)
    expect(sortie).toContain(`@media (prefers-color-scheme: dark) {
:root:not([data-theme='clair']) { --papier: #000; }
:root:not([data-theme='clair']) .x .y { color: #fff; }
}`)
    expect(sortie).toContain(`:root[data-theme='sombre'] { --papier: #000; }
:root[data-theme='sombre'] .x .y { color: #fff; }`)
    expect(sortie.startsWith('a{color:red}')).toBe(true)
    expect(sortie.trimEnd().endsWith('b{color:blue}')).toBe(true)
  })

  it('une condition combinée garde son autre partie', () => {
    const sortie = themeAuChoix(`@media (hover: hover) and (prefers-color-scheme: dark) {
  .b:hover { background: red; }
}`)
    expect(sortie).toContain(`@media (hover: hover) and (prefers-color-scheme: dark) {
:root:not([data-theme='clair']) .b:hover { background: red; }
}`)
    expect(sortie).toContain(`@media (hover: hover) {
:root[data-theme='sombre'] .b:hover { background: red; }
}`)
  })

  it('les sélecteurs multiples et les commentaires', () => {
    const sortie = themeAuChoix(`@media (prefers-color-scheme: dark) {
  /* note */
  :root, .z { --a: 1; }
}`)
    expect(sortie).toContain(`:root:not([data-theme='clair']), :root:not([data-theme='clair']) .z { --a: 1; }`)
    expect(sortie).toContain(`:root[data-theme='sombre'], :root[data-theme='sombre'] .z { --a: 1; }`)
  })

  it('un bloc sombre illisible fait échouer, plutôt que d’être oublié (§6quater)', () => {
    expect(() => themeAuChoix(`@media (prefers-color-scheme: dark) { @supports (x: y) { a { b: c } } }`)).toThrow()
  })
})
