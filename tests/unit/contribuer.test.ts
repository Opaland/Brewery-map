import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { lienAjout } from '../../src/core/signalement'

/**
 * S361 (#213) : ce que la contributrice externe doit trouver depuis le README
 * et `CONTRIBUTING.md`.
 */
const contribuer = readFileSync('CONTRIBUTING.md', 'utf8')

describe('contribuer (S361)', () => {
  it('CONTRIBUTING.md donne un gabarit d’issue de code à copier', () => {
    for (const titre of ['## Constat', '## Scénario reproductible', '## Impact attendu']) {
      expect(contribuer, `CONTRIBUTING.md : le gabarit d'issue de code doit contenir « ${titre} »`).toContain(titre)
    }
  })

  it('pas de dossier de gabarits d’issue : les liens préremplis de l’application doivent ouvrir l’issue directement', () => {
    // Story S361 : avec des gabarits, GitHub peut passer les paramètres
    // d'URL au sélecteur de gabarits ; « Signaler une erreur » et « La
    // signaler » ajouteraient un geste. Le gabarit vit dans CONTRIBUTING.md.
    for (const d of ['.github/ISSUE_TEMPLATE', 'ISSUE_TEMPLATE', 'docs/ISSUE_TEMPLATE']) {
      expect(existsSync(d), `${d} : voir docs/stories/S361.md avant d'ajouter des gabarits`).toBe(false)
    }
  })

  it('CONTRIBUTING.md dit comment proposer une brasserie manquante, comme le lien de l’application', () => {
    const debut = contribuer.indexOf('## Une brasserie manquante')
    expect(debut, 'CONTRIBUTING.md : section « ## Une brasserie manquante » introuvable').toBeGreaterThan(-1)
    const fin = contribuer.indexOf('\n## ', debut + 1)
    const section = contribuer.slice(debut, fin < 0 ? undefined : fin)
    expect(section).toContain('« La signaler »')
    expect(section).toMatch(/annuaire seul/)
    // Ce que le lien prérempli demande, la section le demande aussi.
    const corps = new URL(lienAjout()).searchParams.get('body') ?? ''
    for (const [dansLien, dansSection] of [
      ['Nom', 'nom'],
      ['Commune', 'commune'],
      ['Ce qu’on peut y faire', 'ce qu’on peut y faire'],
      ['Une source', 'une source'],
    ] as const) {
      expect(corps).toContain(dansLien)
      expect(section.toLowerCase().replaceAll('\'', '’'), `CONTRIBUTING.md, brasserie manquante : demander « ${dansSection} », comme lienAjout`).toContain(dansSection)
    }
  })

  it('le README dit qu’il faut un clone complet', () => {
    expect(readFileSync('README.md', 'utf8'), 'README.md : dire « clone complet, pas `--depth 1` »').toMatch(/clone complet, pas `--depth 1`/)
  })

  it('AGENTS.md nomme le modèle de story qui existe', () => {
    expect(readFileSync('AGENTS.md', 'utf8')).toContain('`docs/stories/MODELE.md`')
    expect(existsSync('docs/stories/MODELE.md')).toBe(true)
  })
})
