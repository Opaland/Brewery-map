import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
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

const lancer = (...args: string[]) => {
  try {
    return { code: 0, sortie: execFileSync(TSX, [OUTIL, ...args], { cwd: dossier, encoding: 'utf8', stdio: 'pipe' }) }
  } catch (e) {
    const err = e as { status: number; stdout: string; stderr: string }
    return { code: err.status, sortie: err.stdout + err.stderr }
  }
}
const donnees = () => readFileSync(join(dossier, 'data', 'breweries.json'), 'utf8')

beforeEach(() => {
  dossier = mkdtempSync(join(tmpdir(), 'curation-'))
  mkdirSync(join(dossier, 'data'))
  copyFileSync(join(RACINE, 'data', 'breweries.json'), join(dossier, 'data', 'breweries.json'))
})
afterEach(() => {
  rmSync(dossier, { recursive: true, force: true })
})

const empreinte = () => /Empreinte du lot : ([0-9a-f]{12})/.exec(lancer('diff', LOT).sortie)?.[1] ?? ''

describe('l’outil n’écrit data/ qu’avec l’empreinte du lot lu (revue code S11)', () => {
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
    for (const n of ['0x1', '1.0', '1e0', ' 2', '1,,2', '']) {
      expect(lancer('appliquer', LOT, n).code).toBe(2)
    }
  })

  it('avec la bonne empreinte, seule la fiche acceptée change', () => {
    const e = empreinte()
    expect(e).toMatch(/^[0-9a-f]{12}$/)
    const avant = JSON.parse(donnees()) as Brasserie[]
    expect(lancer('appliquer', LOT, '2', '--ecrire', e).code).toBe(0)
    const apres = JSON.parse(donnees()) as Brasserie[]
    expect(apres).toHaveLength(avant.length)
    apres.forEach((b, i) => {
      if (b.n === 'GreDam') expect(b.contact?.tel).toBe('04 78 33 84 95')
      else expect(b).toEqual(avant[i])
    })
  })
})
