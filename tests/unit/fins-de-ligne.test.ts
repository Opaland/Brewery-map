import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

/**
 * S302 CA1 (W1) : Git pour Windows extrait en CRLF par défaut
 * (`core.autocrlf=true`). L'empreinte de `data/breweries.json`, la garde de
 * `data/` et les empreintes des lots changeaient alors, et quatre tests
 * rougissaient sur le PC fixe, le 19/10. Pire : un accord aurait pu viser
 * une empreinte que la CI ne retrouve pas. Le dépôt impose donc LF, quel que
 * soit le réglage du poste.
 */
describe('les fins de ligne', () => {
  it('le dépôt impose LF à l’extraction', () => {
    const regles = readFileSync('.gitattributes', 'utf8').split('\n').map((l) => l.trim())
    expect(regles).toContain('* text=auto eol=lf')
    expect(readFileSync('.editorconfig', 'utf8')).toMatch(/^end_of_line = lf$/m)
  })

  it('aucun fichier suivi n’est en CRLF, ni dans l’index ni sur le disque', () => {
    const crlf = execFileSync('git', ['ls-files', '--eol'], { encoding: 'utf8' })
      .split('\n')
      .filter((l) => /\b[iw]\/(crlf|mixed)\b/.test(l))
    expect(crlf).toEqual([])
  })
})
