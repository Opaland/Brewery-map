import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { bilanCompletude } from '../../src/core/completude'
import { BASE_DE_DONNEES } from '../../src/core/garde-donnees'
import { DONNEES } from '../../src/core/nouveautes'
import type { Brasserie } from '../../src/core/schema'

/**
 * S305 (revue globale du 19/10, T1, T2, T6) : les chiffres écrits dans la
 * doc et dans « Quoi de neuf » sont ceux des données. Après les 10 fiches
 * retirées en S298, le README disait encore 358 fiches pour 348 : rien ne
 * les tenait d'accord (CLAUDE.md §4ter).
 */
const FICHES = JSON.parse(readFileSync('data/breweries.json', 'utf8')) as Brasserie[]
const OSM = (JSON.parse(readFileSync('src/donnees-osm/brasseries-osm.json', 'utf8')) as { brasseries: unknown[] }).brasseries
const COMMUNES = JSON.parse(readFileSync('public/communes-france.json', 'utf8')) as unknown[]
const DEPARTEMENTS = [...new Set(FICHES.map((b) => b.d))].sort()

/** Le texte d'un fichier, toute suite d'espaces (retours à la ligne, insécables : `\s` les couvre) ramenée à une espace. */
const lire = (fichier: string) => readFileSync(fichier, 'utf8').replace(/\s+/g, ' ')
/** Un nombre écrit à la française (« 34 960 »). */
const nombre = (texte: string) => Number(texte.replace(/ /g, ''))

/** Chaque nombre capturé par le motif, dans l'ordre ; le motif doit trouver au moins une fois. */
function captures(texte: string, motif: RegExp): string[][] {
  const trouves = [...texte.matchAll(new RegExp(motif.source, 'g'))].map((m) => m.slice(1))
  expect(trouves.length, `${motif.source} introuvable`).toBeGreaterThan(0)
  return trouves
}

describe('les chiffres écrits disent les données', () => {
  it('README : fiches, départements et leur liste, brasseries OSM, communes', () => {
    const t = lire('README.md')
    for (const [n, d, liste] of captures(t, /(?<!\d\s?)(\d+) fiches vérifiées dans (\d+) départements \(([^)]+)\)/)) {
      expect(Number(n)).toBe(FICHES.length)
      expect(Number(d)).toBe(DEPARTEMENTS.length)
      expect(liste.split(', ')).toEqual(DEPARTEMENTS)
    }
    for (const [n] of captures(t, /(\d+) brasseries repérées sur OpenStreetMap/)) expect(Number(n)).toBe(OSM.length)
    for (const [n] of captures(t, /les (\d[\d ]*\d) communes de France/)) expect(nombre(n)).toBe(COMMUNES.length)
    // La même grandeur que « Quoi de neuf » : écrite deux fois, tenue deux fois (revue adverse S305).
    for (const [n] of captures(t, /(\d+) sont aujourd'hui placées au centre de leur commune/))
      expect(Number(n)).toBe(FICHES.filter((b) => b.coordPrecision === 'centre').length)
  })

  for (const fichier of ['docs/LINKEDIN.md', 'docs/MARKETING.md']) {
    it(`${fichier} : fiches et brasseries OSM`, () => {
      const t = lire(fichier)
      for (const [n] of captures(t, /(?<!\d\s?)(\d+) fiches vérifiées/)) expect(Number(n)).toBe(FICHES.length)
      for (const [n] of captures(t, /(\d+) brasseries repérées sur OpenStreetMap/)) expect(Number(n)).toBe(OSM.length)
    })
  }

  // S358 (#210) : MARKETING disait « 24 départements » pour 39.
  it('docs/MARKETING.md : les départements vérifiés', () => {
    for (const [n] of captures(lire('docs/MARKETING.md'), /(\d+) départements vérifiés/)) expect(Number(n)).toBe(DEPARTEMENTS.length)
  })

  // S358 (#210) : ETAT gardait « S1 → S328 » des jours après.
  it('docs/ETAT.md : le dernier sprint cité est le dernier de SPRINTS.md', () => {
    const titres = readFileSync('docs/SPRINTS.md', 'utf8')
      .split('\n')
      .filter((l) => l.startsWith('## S'))
    const dernier = Math.max(...titres.flatMap((l) => [...l.matchAll(/S(\d+)/g)].map((m) => Number(m[1]))))
    for (const [n] of captures(lire('docs/ETAT.md'), /\(S1 → S(\d+)\)/)) expect(Number(n)).toBe(dernier)
  })

  it('docs/ETAT.md : fiches, points OSM, et le bilan de complétude', () => {
    const t = lire('docs/ETAT.md')
    for (const [n] of captures(t, /(\d+) fiches dans `data\/`/)) expect(Number(n)).toBe(FICHES.length)
    for (const [n] of captures(t, /(\d+) points OpenStreetMap/)) expect(Number(n)).toBe(OSM.length)
    const bilan = bilanCompletude(FICHES)
    const [[completes, total, aConfirmer, sansBieres, sansTel, sansHoraires] = []] = captures(
      t,
      /\*\*(\d+) fiches complètes sur (\d+)\*\* ; (\d+) « À confirmer » ; (\d+) sans bières, (\d+) sans téléphone, (\d+) sans horaires/,
    )
    expect([completes, total, aConfirmer, sansBieres, sansTel, sansHoraires].map(Number)).toEqual([
      bilan.completes,
      bilan.total,
      bilan.manquent.categorie,
      bilan.manquent.bieres,
      bilan.manquent.telephone,
      bilan.manquent.horaires,
    ])
  })

  // S358 (#210) : les brasseries ajoutées sont les fiches absentes du fichier
  // du 15/10, relu dans git comme le fait la garde de `data/`.
  it('« Quoi de neuf » : les brasseries ajoutées depuis le fichier du 15/10', () => {
    const base = JSON.parse(
      execFileSync('git', ['show', `${BASE_DE_DONNEES.commit}:data/breweries.json`], { encoding: 'utf8' }),
    ) as Brasserie[]
    const nomsDeBase = new Set(base.map((b) => b.n))
    const [[n] = []] = captures(DONNEES.phrase, /(\d+) brasseries ajoutées/)
    expect(Number(n)).toBe(FICHES.filter((b) => !nomsDeBase.has(b.n)).length)
  })

  it('« Quoi de neuf » : les fiches placées au centre de leur commune', () => {
    const [[n] = []] = captures(DONNEES.phrase, /(\d+) placées au centre de leur commune/)
    expect(Number(n)).toBe(FICHES.filter((b) => b.coordPrecision === 'centre').length)
  })
})
