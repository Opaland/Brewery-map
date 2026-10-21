import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

/** S339 (#34) : la licence des fiches, nommée partout où on la cherche. */
describe('la licence des fiches', () => {
  it('data/LICENCE.md nomme l’ODbL 1.0', () => {
    expect(existsSync('data/LICENCE.md')).toBe(true)
    expect(readFileSync('data/LICENCE.md', 'utf8')).toMatch(/Open Database License \(ODbL\) 1\.0/)
  })
  it('le README ne la dit plus « à préciser », et la nomme', () => {
    const r = readFileSync('README.md', 'utf8')
    expect(r).not.toMatch(/à\s+préciser par Cédric/)
    expect(r).toMatch(/\*\*ODbL 1\.0\*\* \(`data\/LICENCE\.md`\)/)
  })
  it('le pied de page la dit, en français et en anglais', () => {
    expect(readFileSync('src/App.tsx', 'utf8')).toMatch(/Fiches vérifiées : Mousse de Poche, licence ODbL 1\.0/)
    expect(readFileSync('src/textes/en.ts', 'utf8')).toMatch(/ODbL 1\.0 licence/)
  })
})
