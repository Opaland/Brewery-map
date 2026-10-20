import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import premierEcran from '../../data/breweries.json?premier-ecran'
import suite from '../../data/breweries.json?suite'
import { DEPARTEMENTS_PREMIER_ECRAN } from '../../src/core/decoupage'

/**
 * S294 : `data/breweries.json` découpé au build (AR8), par les imports
 * `?premier-ecran` et `?suite` que résout `build/decouper-donnees.ts` — le
 * même chemin que l'application.
 */
type Fiche = { n: string; d: string }
const FICHIER = JSON.parse(readFileSync('data/breweries.json', 'utf8')) as Fiche[]
const PREMIER = premierEcran as Fiche[]
const SUITE = suite as Fiche[]

describe('le découpage des fiches (S294)', () => {
  it('le premier écran porte la région du départ par défaut (Brignais, Rhône), et elle seule', () => {
    expect(DEPARTEMENTS_PREMIER_ECRAN.has('69')).toBe(true)
    expect([...DEPARTEMENTS_PREMIER_ECRAN].sort()).toEqual(['01', '03', '07', '15', '26', '38', '42', '43', '63', '69', '73', '74'])
    for (const f of PREMIER) expect(DEPARTEMENTS_PREMIER_ECRAN.has(f.d), f.n).toBe(true)
    for (const f of SUITE) expect(DEPARTEMENTS_PREMIER_ECRAN.has(f.d), f.n).toBe(false)
  })

  it('chaque fiche est dans exactement une part, dans l’ordre du fichier', () => {
    expect(PREMIER.length).toBeGreaterThan(0)
    expect(SUITE.length).toBeGreaterThan(0)
    expect(PREMIER.map((f) => f.n)).toEqual(FICHIER.filter((f) => DEPARTEMENTS_PREMIER_ECRAN.has(f.d)).map((f) => f.n))
    expect(SUITE.map((f) => f.n)).toEqual(FICHIER.filter((f) => !DEPARTEMENTS_PREMIER_ECRAN.has(f.d)).map((f) => f.n))
    expect(PREMIER.length + SUITE.length).toBe(FICHIER.length)
  })

  // La validation doit lire le texte brut avant le découpage : dans l'autre
  // ordre, le build refuse même un fichier valide (vu par `build.test.ts`).
  it('vite.config.ts valide les données avant de les découper', () => {
    const config = readFileSync('vite.config.ts', 'utf8')
    const valider = config.indexOf('validerDonnees()')
    expect(valider).toBeGreaterThan(-1)
    expect(config.indexOf('decouperDonnees()')).toBeGreaterThan(valider)
  })

  // Revue adverse S294 (§4ter) : les messages nomment la région en dur ;
  // changer de département de départ les rendrait faux sans ce test.
  it('les messages nomment la région du premier écran', () => {
    const regions = JSON.parse(
      readFileSync('node_modules/@etalab/decoupage-administratif/data/regions.json', 'utf8'),
    ) as { code: string; nom: string }[]
    const departements = JSON.parse(
      readFileSync('node_modules/@etalab/decoupage-administratif/data/departements.json', 'utf8'),
    ) as { code: string; region: string }[]
    const codes = new Set(departements.filter((d) => DEPARTEMENTS_PREMIER_ECRAN.has(d.code)).map((d) => d.region))
    expect(codes.size).toBe(1)
    const nom = regions.find((r) => codes.has(r.code))?.nom ?? ''
    expect(nom).not.toBe('')
    expect(readFileSync('src/App.tsx', 'utf8')).toContain(`hors d’${nom}`)
  })
})
