import { existsSync, readdirSync, readFileSync } from 'node:fs'
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
    // Story S361, par prudence (non vérifiée sans compte) : avec des
    // gabarits, les paramètres d'URL pourraient passer par le sélecteur, et
    // « Signaler une erreur » ou « La signaler » demanderaient un geste de
    // plus. Le gabarit vit dans CONTRIBUTING.md.
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
      ['Nom', 'son nom'],
      ['Commune', 'commune'],
      ['Ce qu’on peut y faire', 'ce qu’on peut y faire'],
      ['Une source', 'une source'],
    ] as const) {
      expect(corps).toContain(dansLien)
      expect(section.toLowerCase().replaceAll('\'', '’'), `CONTRIBUTING.md, brasserie manquante : demander « ${dansSection} », comme lienAjout`).toContain(dansSection)
    }
  })

  it('le README dit qu’il faut un clone complet, et renvoie à CONTRIBUTING.md pour une brasserie manquante', () => {
    const readme = readFileSync('README.md', 'utf8')
    expect(readme, 'README.md : dire « clone complet, pas `--depth 1` »').toMatch(/clone complet, pas `--depth 1`/)
    expect(readme.replace(/\s+/g, ' '), 'README.md : renvoyer à CONTRIBUTING.md pour « une brasserie manquante »').toMatch(/brasserie manquante[^.]*CONTRIBUTING\.md/)
  })

  it('AGENTS.md nomme le modèle de story qui existe', () => {
    expect(readFileSync('AGENTS.md', 'utf8')).toContain('`docs/stories/MODELE.md`')
    expect(existsSync('docs/stories/MODELE.md')).toBe(true)
  })
})

describe('contribuer : une faille, une PR, qui décide, ce que coûte la porte (S364, #227)', () => {
  it('SECURITY.md dit comment signaler une faille sans la publier', () => {
    expect(existsSync('SECURITY.md'), 'SECURITY.md manquant').toBe(true)
    const securite = readFileSync('SECURITY.md', 'utf8')
    expect(securite).toMatch(/sans détail exploitable/)
    expect(securite).toContain('docs/stories/S364.md')
  })

  it('le gabarit de PR rappelle Closes #n, la story, le test vu rouge et data/', () => {
    const gabarit = readFileSync('.github/pull_request_template.md', 'utf8')
    for (const attendu of ['Closes #', 'docs/stories/', 'vu rouge', 'data/']) {
      expect(gabarit, `.github/pull_request_template.md : rappeler « ${attendu} »`).toContain(attendu)
    }
  })

  it('le README dit qui décide', () => {
    expect(readFileSync('README.md', 'utf8').replace(/\s+/g, ' ')).toMatch(/Cédric \(@Opaland\), le mainteneur, décide/)
  })

  it('CONTRIBUTING.md dit où vont les propositions de données', () => {
    expect(contribuer).toContain('`curation/`')
    expect(contribuer).toContain('`curation/accords/`')
  })

  it('docs/PORTE.md est remesurée depuis la dernière revue globale (« à remesurer à chaque revue globale »)', () => {
    const porte = readFileSync('docs/PORTE.md', 'utf8')
    const mesure = /Dernière mesure : (\d{4}-\d{2}-\d{2})/.exec(porte)?.[1]
    expect(mesure, 'docs/PORTE.md : écrire « Dernière mesure : AAAA-MM-JJ »').toBeDefined()
    const revues = readdirSync('docs')
      .map((f) => /^REVUE-GLOBALE-(\d{4}-\d{2}-\d{2})\.md$/.exec(f)?.[1])
      .filter((d): d is string => d !== undefined)
      .sort()
    const derniere = revues.at(-1) ?? ''
    expect(derniere).not.toBe('')
    expect(mesure! >= derniere, `docs/PORTE.md mesurée le ${mesure ?? '?'}, avant la revue globale du ${derniere} : remesurer`).toBe(true)
  })
})
