import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { aChercher, bilanCompletude, CHAMPS_COMPLETUDE, completudeEnMarkdown, manques } from '../../src/core/completude'
import type { Brasserie } from '../../src/core/schema'

/** S295 (Cédric) : où en sont les fiches, champ par champ. */
const base: Brasserie = {
  n: 'Exemple',
  c: 'Lyon',
  d: '69',
  lat: 45.75,
  lon: 4.85,
  km: 10,
  cat: 1,
  conf: 'solide',
  note: 'Vente sur place.',
  addr: '1 rue de la Bière, Lyon',
  src: 'https://exemple.fr',
  coordPrecision: 'address',
  beers: [{ type: 'ipa' }],
  verifieLe: '2026-10-18',
  contact: { tel: '04 72 00 00 00', site: 'https://exemple.fr', source: 'https://exemple.fr', verifieLe: '2026-10-18' },
  horaires: [
    {
      nature: 'vente',
      lun: [],
      mar: [],
      mer: [],
      jeu: [],
      ven: [['16:00', '19:00']],
      sam: [],
      dim: [],
      source: 'https://exemple.fr',
      verifieLe: '2026-10-18',
    },
  ],
}

describe('manques', () => {
  it('une fiche où tout est renseigné ne manque de rien', () => {
    expect(manques(base)).toEqual([])
  })

  it('nomme chaque champ absent, dans l’ordre de CHAMPS_COMPLETUDE', () => {
    const vide: Brasserie = { ...base, cat: 0, conf: '', src: '', coordPrecision: 'centre', beers: [], contact: undefined, horaires: undefined }
    expect(manques(vide)).toEqual(CHAMPS_COMPLETUDE.map((c) => c.champ))
  })

  it('compte chaque champ indépendamment des autres', () => {
    for (const { champ } of CHAMPS_COMPLETUDE) {
      const sans: Record<string, Partial<Brasserie>> = {
        source: { src: '' },
        categorie: { cat: 0, conf: '' },
        site: { contact: { ...base.contact, site: undefined } as Brasserie['contact'] },
        adresse: { coordPrecision: 'centre' },
        telephone: { contact: { ...base.contact, tel: undefined } as Brasserie['contact'] },
        horaires: { horaires: undefined },
        bieres: { beers: [] },
      }
      expect(manques({ ...base, ...sans[champ] })).toEqual([champ])
    }
  })
})

describe('bilanCompletude', () => {
  it('compte les fiches complètes et les manques, au total et par département', () => {
    const autre: Brasserie = { ...base, n: 'Autre', d: '14', beers: [], horaires: undefined }
    const b = bilanCompletude([base, autre])
    expect(b.total).toBe(2)
    expect(b.completes).toBe(1)
    expect(b.manquent.bieres).toBe(1)
    expect(b.manquent.horaires).toBe(1)
    expect(b.manquent.site).toBe(0)
    expect(b.parDepartement.map((d) => d.d)).toEqual(['14', '69'])
    expect(b.parDepartement[0]).toMatchObject({ d: '14', total: 1, completes: 0 })
  })

  it('sur le vrai fichier, ses comptes concordent avec un comptage à la main', () => {
    const fiches = JSON.parse(readFileSync('data/breweries.json', 'utf8')) as Brasserie[]
    const b = bilanCompletude(fiches)
    expect(b.total).toBe(fiches.length)
    expect(b.manquent.bieres).toBe(fiches.filter((f) => f.beers.length === 0).length)
    expect(b.manquent.telephone).toBe(fiches.filter((f) => f.contact?.tel === undefined).length)
    expect(b.parDepartement.reduce((s, d) => s + d.total, 0)).toBe(fiches.length)
  })
})

describe('aChercher', () => {
  it('liste les « À confirmer », par département puis par cause, la cause la plus en amont d’abord', () => {
    const fiches: Brasserie[] = [
      { ...base, n: 'B', d: '69', cat: 0, conf: '', src: '' },
      { ...base, n: 'A', d: '69', cat: 0, conf: '' },
      { ...base, n: 'C', d: '14', cat: 0, conf: '', contact: undefined },
      base,
    ]
    expect(aChercher(fiches).map((f) => [f.d, f.cause, f.n])).toEqual([
      ['14', 'site', 'C'],
      ['69', 'source', 'B'],
      ['69', 'categorie', 'A'],
    ])
    // Ce qui reste à chercher, au-delà de la catégorie (revue adverse S295).
    expect(aChercher(fiches).find((f) => f.n === 'C')?.manquent).toEqual(['site', 'telephone'])
    expect(aChercher(fiches).find((f) => f.n === 'A')?.manquent).toEqual([])
  })
})

describe('curation/A-CHERCHER.md', () => {
  it('dit l’état actuel de data/ : sinon, `npx tsx outils/completude.ts --ecrire`', () => {
    const fiches = JSON.parse(readFileSync('data/breweries.json', 'utf8')) as Brasserie[]
    expect(readFileSync('curation/A-CHERCHER.md', 'utf8')).toBe(`${completudeEnMarkdown(fiches)}\n`)
  })
})
