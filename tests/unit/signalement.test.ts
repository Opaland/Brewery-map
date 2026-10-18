import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import type { Brasserie } from '../../src/core/schema'
import {
  lienAjout,
  lienSignalement,
  LONGUEUR_MAX_URL,
  SUITE_SIGNALEMENT,
} from '../../src/core/signalement'
import { LIGNES_REELLES } from './lignes-reelles'

const TOUTES = LIGNES_REELLES as unknown as Brasserie[]
const B = TOUTES[0]

const parametres = (lien: string) => new URL(lien).searchParams

describe('le lien « Signaler une erreur »', () => {
  it('ouvre une issue du dépôt, en https, sur github.com', () => {
    const u = new URL(lienSignalement(B))
    expect(u.protocol).toBe('https:')
    expect(u.hostname).toBe('github.com')
    expect(u.pathname).toBe('/Opaland/Brewery-map/issues/new')
  })

  it('nomme la brasserie dans le titre, et la fiche telle qu’affichée dans le corps', () => {
    const p = parametres(lienSignalement(B))
    expect(p.get('title')).toBe(`Signalement : ${B.n} (${B.c})`)
    const corps = p.get('body') ?? ''
    expect(corps).toContain(B.n)
    expect(corps).toContain(`${B.c} (${B.d})`)
    expect(corps).toContain(B.addr)
  })

  it('dit aussi la confiance, le point sur la carte et une fermeture, que la brasserie vient corriger (S295)', () => {
    const fermee: Brasserie = {
      ...B,
      conf: 'faible',
      coordPrecision: 'centre',
      fermee: { source: 'https://exemple.fr/radiee', verifieLe: '2026-10-01' },
    }
    const corps = parametres(lienSignalement(fermee)).get('body') ?? ''
    expect(corps).toContain('- Confiance : faible')
    expect(corps).toContain('- Point sur la carte : au centre de la commune selon l’IGN')
    expect(corps).toContain('- Dite fermée, selon : https://exemple.fr/radiee')
    expect(parametres(lienSignalement({ ...B, fermee: undefined })).get('body')).not.toContain('fermée')
  })

  it('dit dans l’issue ce qui se passe ensuite : qui décide, sans délai promis (revue S10)', () => {
    const corps = parametres(lienSignalement(B)).get('body') ?? ''
    expect(corps).toContain(SUITE_SIGNALEMENT)
    expect(SUITE_SIGNALEMENT).toMatch(/Aucun délai n’est garanti/)
  })

  it('demande ce qui est faux, la bonne information et une source', () => {
    const corps = parametres(lienSignalement(B)).get('body') ?? ''
    expect(corps).toMatch(/Ce qui est faux/)
    expect(corps).toMatch(/La bonne information/)
    expect(corps).toMatch(/Une source/)
  })

  it('n’emporte que ce qui est déjà public dans les données : ni distance, ni départ, ni favoris', () => {
    // La fonction ne reçoit que la ligne du fichier ; ce test fige qu'aucun
    // paramètre n'est ajouté en douce (un « depuis » ou un « km »).
    const p = parametres(lienSignalement(B))
    expect([...p.keys()].sort()).toEqual(['body', 'title'])
    expect(p.get('body')).not.toMatch(/\bkm\b|distance|position|favori/i)
  })

  it('reste sous la longueur d’URL retenue, pour chacune des lignes du fichier', () => {
    const fichier = JSON.parse(readFileSync('data/breweries.json', 'utf8')) as Brasserie[]
    const longueurs = fichier.map((b) => lienSignalement(b).length)
    expect(longueurs.length).toBeGreaterThan(0)
    expect(Math.max(...longueurs)).toBeLessThanOrEqual(LONGUEUR_MAX_URL)
  })

  it('tient sous la longueur retenue même aux champs démesurés, en coupant le plus long d’abord (#54)', () => {
    const long = (x: string, n: number) => x.repeat(n)
    const b: Brasserie = {
      ...B,
      n: `Brasserie ${long('é', 300)}`,
      addr: long('🍺 rue ', 400),
      src: `https://exemple.fr/${long('a', 3000)}`,
      fermee: { source: `https://exemple.fr/${long('z', 3000)}`, verifieLe: '2026-10-01' },
    }
    const u = lienSignalement(b)
    expect(u.length).toBeLessThanOrEqual(LONGUEUR_MAX_URL)
    const corps = parametres(u).get('body') ?? ''
    // Le début de chaque champ reste, pour reconnaître la fiche ; la suite donnée aussi.
    expect(corps).toContain('- Nom : Brasserie é')
    expect(corps).toContain('- Dite fermée, selon : https://exemple.fr/z')
    expect(corps).toContain(SUITE_SIGNALEMENT)
    // Un emoji n'est jamais coupé en deux.
    expect(corps).not.toMatch(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])/)
    // Une fiche ordinaire n'est pas touchée.
    expect(parametres(lienSignalement(B)).get('body')).toContain(`- Adresse : ${B.addr}`)
  })

  it('un nom avec & ou # ne casse pas le lien', () => {
    const p = parametres(lienSignalement({ ...B, n: 'Tom & Co #2' }))
    expect(p.get('title')).toBe(`Signalement : Tom & Co #2 (${B.c})`)
  })
})

describe('le lien « Signaler une brasserie absente »', () => {
  it('ouvre une issue vierge de toute donnée de la personne', () => {
    const p = parametres(lienAjout())
    expect([...p.keys()].sort()).toEqual(['body', 'title'])
    expect(p.get('title')).toBe('Brasserie absente : ')
    expect(p.get('body')).toMatch(/Nom/)
    expect(p.get('body')).toMatch(/Une source/)
  })
})
