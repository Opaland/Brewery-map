import { readFileSync } from 'node:fs'
import { describe, expect, it, vi } from 'vitest'

/**
 * S283 : `npm audit` dans la CI. Lu sur le texte du workflow (aucune
 * bibliothèque YAML dans le projet) : l'étape bloquante existe, avant le
 * build, sans `continue-on-error`.
 */
// Fins de ligne ramenées à LF : un dépôt sorti sous Windows ne rougit pas le test.
const ci = readFileSync('.github/workflows/ci.yml', 'utf8').replace(/\r\n/g, '\n')
const nuit = readFileSync('.github/workflows/sonde-nuit.yml', 'utf8').replace(/\r\n/g, '\n')

/** Le bloc d'une étape (de son `- name:` au suivant). */
const etape = (texte: string, commande: string) => {
  const i = texte.indexOf(commande)
  if (i === -1) return undefined
  const debut = texte.lastIndexOf('- name:', i)
  const fin = texte.indexOf('- name:', i)
  return texte.slice(debut, fin === -1 ? undefined : fin)
}

// S306 (C4) : `retries: 2` en CI laissait passer vert un test qui ne passe
// qu'au second essai (CLAUDE.md §1bis).
describe('un test instable rougit la CI', () => {
  // La configuration chargée, pas son texte : une ligne en commentaire
  // passait (revue adverse S306).
  it('playwright.config.ts pose failOnFlakyTests en CI, et pas hors CI', async () => {
    const avant = process.env.CI
    try {
      process.env.CI = 'true'
      vi.resetModules()
      const enCi = (await import('../../playwright.config')).default
      expect(enCi.failOnFlakyTests).toBe(true)
      delete process.env.CI
      vi.resetModules()
      const horsCi = (await import('../../playwright.config')).default
      expect(horsCi.failOnFlakyTests).toBe(false)
    } finally {
      if (avant === undefined) delete process.env.CI
      else process.env.CI = avant
    }
  })
})

describe('npm audit dans la CI', () => {
  it('la porte refuse une faille haute dans ce que la page embarque, avant le build', () => {
    const bloc = etape(ci, 'npm audit --omit=dev --audit-level=high')
    expect(bloc).toBeDefined()
    expect(bloc).not.toContain('continue-on-error')
    expect(ci.indexOf('npm audit --omit=dev --audit-level=high')).toBeLessThan(ci.indexOf('npm run build'))
  })

  it('l’arbre entier est audité dans la porte sans la bloquer, et dans le job qui peut rougir', () => {
    expect(etape(ci, 'npm audit --audit-level=high\n')).toContain('continue-on-error: true')
    expect(nuit).toContain('npm audit --audit-level=high')
  })

  // Décision de Cédric du 31/10 (#226) : l'audit tourne seul chaque semaine, la sonde reste à la main.
  it('la planification est hebdomadaire et ne lance que le job audit', () => {
    const texte = nuit.replace(/\r\n/g, '\n')
    const crons = [...texte.matchAll(/cron: '([^']+)'/g)].map((m) => m[1])
    expect(crons).toHaveLength(1)
    expect((crons[0] ?? '').split(' ').slice(2, 4)).toEqual(['*', '*'])
    expect((crons[0] ?? '').split(' ')[4]).toMatch(/^[0-6]$/)
    // L'en-tête de chaque job, jusqu'à ses étapes : l'ordre des clés n'y compte pas.
    const entete = (nom: string): string => texte.split(new RegExp(`^ {2}${nom}:\n`, 'm'))[1]?.split('steps:')[0] ?? ''
    expect(entete('sonde')).toContain("if: github.event_name != 'schedule'")
    expect(entete('audit')).toContain('runs-on')
    expect(entete('audit')).not.toContain('if:')
  })
})

/**
 * Revue globale du 26/10 : la PR #222 a retiré la planification de nuit,
 * mais six textes promettaient encore « chaque nuit » (§3). Les deux
 * workflows ne se lancent qu'à la main, et leurs commentaires le disent.
 * Depuis le 31/10 (#226), `sonde-nuit.yml` a aussi sa planification
 * hebdomadaire, pour son seul job d'audit.
 */
describe('les workflows de nuit, plus de planification de nuit depuis le 25/10', () => {
  it.each([
    ['sonde-nuit.yml', ['workflow_dispatch', 'schedule']],
    ['mutation.yml', ['workflow_dispatch']],
  ])('%s : les déclencheurs attendus, sans « chaque nuit »', (f, attendus) => {
    const texte = readFileSync(`.github/workflows/${f}`, 'utf8').replace(/\r\n/g, '\n')
    // Les clés du bloc `on:` (revue adverse : un `push:` ajouté passait).
    const bloc = /^on:\n((?: {2}.*\n|\n)*)/m.exec(texte)?.[1] ?? ''
    expect([...bloc.matchAll(/^ {2}(\w+):/gm)].map((m) => m[1])).toEqual(attendus)
    expect(texte).not.toMatch(/chaque nuit|le matin/)
  })
})
