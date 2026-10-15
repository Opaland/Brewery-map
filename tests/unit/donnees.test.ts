import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { validerBrasseries } from '../../src/core/schema'

/**
 * Le fichier réel, tel qu'il est dans le dépôt.
 *
 * Le plugin de build ne le valide que lorsque l'application l'importe (S2).
 * D'ici là, ce test garde que le fichier versionné respecte le schéma : une
 * ligne invalide rend la porte rouge dès aujourd'hui.
 */
describe('data/breweries.json', () => {
  it('respecte le schéma, ligne par ligne', () => {
    const contenu: unknown = JSON.parse(readFileSync('data/breweries.json', 'utf8'))
    const verdict = validerBrasseries(contenu)
    expect(verdict.ok ? [] : verdict.erreurs).toEqual([])
  })
})
