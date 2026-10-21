import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { NOM_REGION_DU_DEPART } from '../../src/core/decoupage'

/**
 * S331 (revue adverse du 21/10, §4ter) : la région nommée quand la suite des
 * fiches manque est celle que le découpage calcule. Les deux textes, français
 * et anglais, sont relus ici ; changer le département du départ sans eux
 * fait échouer la porte.
 */
describe('la région du premier écran', () => {
  it('le Code officiel géographique la nomme', () => {
    expect(NOM_REGION_DU_DEPART).toBe('Auvergne-Rhône-Alpes')
  })

  it('le texte français et sa traduction nomment la même', () => {
    const app = readFileSync('src/App.tsx', 'utf8')
    const en = readFileSync('src/textes/en.ts', 'utf8')
    const fr = /Les fiches vérifiées hors d(?:’|e )([^’]+?) n’ont pas pu se charger/.exec(app)?.[1]
    const anglais = /"The checked breweries outside (.+?) could not load/.exec(en)?.[1]
    expect(fr).toBe(NOM_REGION_DU_DEPART)
    expect(anglais).toBe(NOM_REGION_DU_DEPART)
  })
})
