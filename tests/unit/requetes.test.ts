import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { bilanDesRequetes, compterRequete } from '../../src/core/requetes'

/** Un appel réseau direct, sur une ou plusieurs lignes (revue adverse S280). */
const APPEL_DIRECT = /\bfetch\s*\(|['"`]curl['"`]|['"]node:https?['"]/
const sansCommentaires = (code: string) => code.replace(/\/\*[\s\S]*?\*\/|^\s*\/\/.*$/gm, '')

/** S280 (repris d'ÉtapeForge, `apiUsage.js`) : les requêtes des outils, par hôte. */
describe('compterRequete et bilanDesRequetes', () => {
  it('aucune requête : aucun bilan', () => {
    expect(bilanDesRequetes(new Map())).toBe('')
  })

  it('compte par hôte, trie du plus demandé au moins demandé, et totalise', () => {
    const compte = new Map<string, number>()
    // L'ordre alphabétique est l'inverse de l'ordre par nombre : un tri par
    // nom seul se verrait.
    for (const url of [
      'https://overpass.openstreetmap.fr/api/interpreter?a',
      'https://data.geopf.fr/geocodage/search?q=a',
      'https://overpass.openstreetmap.fr/api/interpreter?b',
      'https://overpass.openstreetmap.fr/api/interpreter?c',
    ])
      compterRequete(compte, url)
    expect(bilanDesRequetes(compte)).toBe(
      ['Requêtes envoyées : 4', '- overpass.openstreetmap.fr : 3 requêtes', '- data.geopf.fr : 1 requête'].join('\n'),
    )
  })

  // `curation.ts trier` lit la sortie de `controler`, bilan compris, et prend
  // une ligne qui finit par « : 404 » pour un écart (revue adverse S280).
  it('aucune ligne du bilan ne finit par un nombre qu’on prendrait pour un statut HTTP', () => {
    const compte = new Map([['a.example', 404], ['b.example', 503]])
    expect(bilanDesRequetes(compte).split('\n').filter((l) => /: [45]\d\d$/.test(l))).toEqual([])
  })

  it('une URL illisible compte sous son texte, sans faire tomber l’outil', () => {
    const compte = new Map<string, number>()
    compterRequete(compte, 'pas une url')
    expect(compte.get('pas une url')).toBe(1)
  })
})

describe('les outils', () => {
  it('aucun appel réseau direct hors de outils/requetes.ts (fetchCompte, curlCompte)', () => {
    const directs = readdirSync('outils')
      .filter((f) => f.endsWith('.ts') && f !== 'requetes.ts')
      .filter((f) => APPEL_DIRECT.test(sansCommentaires(readFileSync(`outils/${f}`, 'utf8'))))
    expect(directs).toEqual([])
  })

  it('la garde voit un appel écrit sur plusieurs lignes, et http(s) de Node', () => {
    for (const code of ['await fetch\n(url)', "execFileSync(\n  'curl',\n  [url])", "import https from 'node:https'"])
      expect(APPEL_DIRECT.test(code), code).toBe(true)
    expect(APPEL_DIRECT.test('await fetchCompte(url)')).toBe(false)
    expect(APPEL_DIRECT.test(sansCommentaires('// fetch(url) dans un commentaire'))).toBe(false)
  })
})
