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

  it('l’arbre entier est audité dans la porte sans la bloquer, et dans la sonde lancée à la main', () => {
    expect(etape(ci, 'npm audit --audit-level=high\n')).toContain('continue-on-error: true')
    expect(nuit).toContain('npm audit --audit-level=high')
  })
})

/**
 * Revue globale du 26/10 : la PR #222 a retiré la planification de nuit,
 * mais six textes promettaient encore « chaque nuit » (§3). Les deux
 * workflows ne se lancent qu'à la main, et leurs commentaires le disent.
 */
describe('les workflows de nuit, à la main depuis le 25/10', () => {
  it.each(['sonde-nuit.yml', 'mutation.yml'])('%s : workflow_dispatch seul, sans « chaque nuit »', (f) => {
    const texte = readFileSync(`.github/workflows/${f}`, 'utf8').replace(/\r\n/g, '\n')
    // Les clés du bloc `on:` (revue adverse : un `push:` ajouté passait).
    const bloc = /^on:\n((?: {2}.*\n|\n)*)/m.exec(texte)?.[1] ?? ''
    expect([...bloc.matchAll(/^ {2}(\w+):/gm)].map((m) => m[1])).toEqual(['workflow_dispatch'])
    expect(texte).not.toMatch(/chaque nuit|le matin/)
  })
})
