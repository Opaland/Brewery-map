import { describe, expect, it } from 'vitest'
import { validerBrasseries } from '../../src/core/schema'
import { LIGNES_REELLES } from './lignes-reelles'

const valide = LIGNES_REELLES[0]
const aConfirmer = LIGNES_REELLES[3]

function erreursDe(ligne: unknown): string[] {
  const verdict = validerBrasseries([ligne])
  return verdict.ok ? [] : verdict.erreurs
}

describe('le schéma d’une brasserie', () => {
  it('accepte les lignes réelles, une par catégorie', () => {
    const verdict = validerBrasseries(LIGNES_REELLES)
    expect(verdict).toMatchObject({ ok: true })
  })

  it('refuse une vente affirmée sans source', () => {
    expect(erreursDe({ ...valide, src: '' })).toEqual([
      '0.src : une catégorie de vente affirmée (1 à 4) exige une source',
    ])
  })

  it('accepte « Consommer sur place seulement » (4, demande de Cédric du 28/10), avec sa source comme 1 à 3 (S368)', () => {
    expect(erreursDe({ ...valide, cat: 4 })).toEqual([])
    expect(erreursDe({ ...valide, cat: 4, src: '' })).toEqual([
      '0.src : une catégorie de vente affirmée (1 à 4) exige une source',
    ])
    expect(erreursDe({ ...valide, cat: 5 })).toHaveLength(1)
  })

  it('accepte « À confirmer » sans source, mais pas avec une confiance', () => {
    expect(erreursDe(aConfirmer)).toEqual([])
    expect(erreursDe({ ...aConfirmer, conf: 'solide' })).toHaveLength(1)
  })

  it('refuse une confiance vide hors catégorie 0', () => {
    expect(erreursDe({ ...valide, conf: '' })).toHaveLength(1)
  })

  it('refuse un lien qui n’est pas http(s), même déguisé', () => {
    expect(erreursDe({ ...valide, src: 'javascript:alert(1)//https://x' })).not.toEqual([])
    expect(erreursDe({ ...valide, directoryUrl: 'data:text/html,x' })).not.toEqual([])
  })

  it('refuse un champ que personne n’a décrit', () => {
    expect(erreursDe({ ...valide, horaires: 'sam 15h' })).not.toEqual([])
  })

  it('refuse une catégorie hors des cinq', () => {
    expect(erreursDe({ ...valide, cat: 5 })).not.toEqual([])
  })

  it('refuse une précision de coordonnées inconnue', () => {
    expect(erreursDe({ ...valide, coordPrecision: 'gps' })).not.toEqual([])
  })

  it('exige un libellé pour un type de bière « autre »', () => {
    expect(erreursDe({ ...valide, beers: [{ type: 'autre' }] })).not.toEqual([])
    expect(erreursDe({ ...valide, beers: [{ type: 'autre', libelle: 'Saison' }] })).toEqual([])
  })

  it('nomme la ligne et le champ fautifs', () => {
    const verdict = validerBrasseries([valide, { ...valide, lat: 123 }])
    expect(verdict.ok).toBe(false)
    if (!verdict.ok) expect(verdict.erreurs[0]).toMatch(/^1\.lat : /)
  })
})

describe('le fichier entier', () => {
  it('refuse deux brasseries du même nom : la sélection se fait par nom', () => {
    const verdict = validerBrasseries([valide, { ...valide, c: 'Ailleurs' }])
    expect(verdict.ok ? [] : verdict.erreurs).toEqual(['1.n : nom déjà utilisé ligne 0'])
  })
})

describe('la date de vérification', () => {
  it('accepte une date ISO, refuse le reste', () => {
    expect(erreursDe({ ...valide, verifieLe: '2026-10-15' })).toEqual([])
    expect(erreursDe({ ...valide, verifieLe: '15/10/2026' })).not.toEqual([])
    expect(erreursDe({ ...valide, verifieLe: '2026-13-40' })).not.toEqual([])
  })
})

describe('statut « fermée » (décision #35, S27)', () => {
  const ligne = LIGNES_REELLES[0]
  it('accepté avec sa source et sa date', () => {
    const v = validerBrasseries([{ ...ligne, fermee: { source: 'https://untappd.com/b', verifieLe: '2026-10-16' } }])
    expect(v.ok).toBe(true)
  })
  it('refusé sans source', () => {
    const v = validerBrasseries([{ ...ligne, fermee: { verifieLe: '2026-10-16' } }])
    expect(v.ok).toBe(false)
  })
})
