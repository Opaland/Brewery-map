import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { Brasserie } from '../../src/core/schema'

/*
  L'outil tourne dans un dossier jetable qui contient une COPIE de
  data/breweries.json : le vrai fichier n'est jamais écrit par ces tests.
*/
const RACINE = resolve('.')
const TSX = join(RACINE, 'node_modules', '.bin', 'tsx')
const OUTIL = join(RACINE, 'outils', 'curation.ts')
const LOT = join(RACINE, 'curation', 's11-exemples-s4.json')

let dossier = ''

let parole = ''
const lancer = (...args: string[]) => {
  try {
    const env = { ...process.env, PAROLE_DE_CEDRIC: parole }
    return { code: 0, sortie: execFileSync(TSX, [OUTIL, ...args], { cwd: dossier, encoding: 'utf8', stdio: 'pipe', env }) }
  } catch (e) {
    const err = e as { status: number; stdout: string; stderr: string }
    return { code: err.status, sortie: err.stdout + err.stderr }
  }
}
const donnees = () => readFileSync(join(dossier, 'data', 'breweries.json'), 'utf8')

beforeEach(() => {
  parole = ''
  dossier = mkdtempSync(join(tmpdir(), 'curation-'))
  mkdirSync(join(dossier, 'data'))
  copyFileSync(join(RACINE, 'data', 'breweries.json'), join(dossier, 'data', 'breweries.json'))
})
afterEach(() => {
  rmSync(dossier, { recursive: true, force: true })
})

const empreinte = () => /Empreinte du lot : ([0-9a-f]{12})/.exec(lancer('diff', LOT).sortie)?.[1] ?? ''

/*
  Chaque lancement démarre tsx (≈ 0,65 s mesuré le 16/10). Les règles des
  numéros sont testées en pur (`lireNumeros`, curation-numeros.test.ts) :
  ici, un seul cas de chaque sortie suffit à prouver que l'outil s'en sert
  (revue lead S295 : ce test en lançait treize, 8 s). 30 s : marge de
  présentation, sans effet sur ce qui est vérifié.
*/
describe('l’outil n’écrit data/ qu’avec l’empreinte du lot lu (revue code S11)', { timeout: 30_000 }, () => {
  it('sans --ecrire, rien n’est écrit', () => {
    const avant = donnees()
    expect(lancer('appliquer', LOT, '1').code).toBe(0)
    expect(donnees()).toBe(avant)
  })

  it('une empreinte absente ou fausse refuse l’écriture', () => {
    const avant = donnees()
    expect(lancer('appliquer', LOT, '1', '--ecrire').code).toBe(1)
    expect(lancer('appliquer', LOT, '1', '--ecrire', '000000000000').code).toBe(1)
    expect(donnees()).toBe(avant)
  })

  it('des numéros mal écrits sont refusés, pas interprétés', () => {
    expect(lancer('appliquer', LOT, '0x1').code).toBe(2)
    // « 1 3 » au lieu de « 1,3 » n'appliquait que la 1, sans un mot (revue S12).
    expect(lancer('appliquer', LOT, '1', '3').code).toBe(2)
    // Une plage écrite par Cédric (S14) passe.
    expect(lancer('appliquer', LOT, '1-3').code).toBe(0)
  })

  it('« lot » ignore les candidats OSM bruts rangés dans curation/ (vu en S15 : il refusait de tourner)', () => {
    mkdirSync(join(dossier, 'curation'))
    writeFileSync(join(dossier, 'curation', 'osm-2026-10-16.json'), JSON.stringify({ source: 'x', lu: '2026-10-16', requetes: 1, candidats: [] }))
    const r = lancer('lot', '3')
    expect(r.code).toBe(0)
    expect(r.sortie.trim().split('\n')).toHaveLength(3)
  })

  it('la découverte n’écrase jamais un lot existant, en attente de Cédric (revue code S15)', () => {
    mkdirSync(join(dossier, 'curation'))
    const brut = join(dossier, 'curation', 'osm-2026-10-16.json')
    copyFileSync(join(RACINE, 'curation', 'osm-2026-10-16.json'), brut)
    const decouvrir = (...a: string[]) => {
      try {
        execFileSync(TSX, [join(RACINE, 'outils', 'decouverte.ts'), '--depuis', brut, ...a], { cwd: dossier, stdio: 'pipe' })
        return 0
      } catch (e) {
        return (e as { status: number }).status
      }
    }
    expect(decouvrir('--lot', 'essai')).toBe(0)
    const premier = readFileSync(join(dossier, 'curation', 'essai.json'), 'utf8')
    expect(decouvrir('--lot', 'essai')).not.toBe(0)
    expect(readFileSync(join(dossier, 'curation', 'essai.json'), 'utf8')).toBe(premier)
  })

  it('sans la parole de Cédric, rien n’est écrit (S230)', () => {
    const avant = donnees()
    expect(lancer('appliquer', LOT, '2', '--ecrire', empreinte()).code).toBe(1)
    expect(donnees()).toBe(avant)
  })

  it('avec la bonne empreinte, seule la fiche acceptée change, et l’accord est enregistré (S230)', () => {
    const e = empreinte()
    expect(e).toMatch(/^[0-9a-f]{12}$/)
    const avant = JSON.parse(donnees()) as Brasserie[]
    parole = 'j’accepte la 2'
    expect(lancer('appliquer', LOT, '2', '--ecrire', e).code).toBe(0)
    const fichiers = readdirSync(join(dossier, 'curation', 'accords'))
    expect(fichiers).toHaveLength(1)
    const accord = JSON.parse(readFileSync(join(dossier, 'curation', 'accords', fichiers[0] ?? ''), 'utf8')) as Record<string, unknown>
    expect(accord).toMatchObject({ lot: 's11-exemples-s4', empreinte: e, acceptees: [2], parole: 'j’accepte la 2' })
    const apres = JSON.parse(donnees()) as Brasserie[]
    expect(apres).toHaveLength(avant.length)
    apres.forEach((b, i) => {
      if (b.n === 'GreDam') expect(b.contact?.tel).toBe('04 78 33 84 95')
      else expect(b).toEqual(avant[i])
    })
  })
})
