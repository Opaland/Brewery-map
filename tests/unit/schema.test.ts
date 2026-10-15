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
      '0.src : une catégorie de vente affirmée (1 à 3) exige une source',
    ])
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

  it('refuse une catégorie hors des quatre', () => {
    expect(erreursDe({ ...valide, cat: 4 })).not.toEqual([])
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
