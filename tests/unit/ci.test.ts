import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

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

describe('npm audit dans la CI', () => {
  it('la porte refuse une faille haute dans ce que la page embarque, avant le build', () => {
    const bloc = etape(ci, 'npm audit --omit=dev --audit-level=high')
    expect(bloc).toBeDefined()
    expect(bloc).not.toContain('continue-on-error')
    expect(ci.indexOf('npm audit --omit=dev --audit-level=high')).toBeLessThan(ci.indexOf('npm run build'))
  })

  it('l’arbre entier est audité dans la porte sans la bloquer, et chaque nuit', () => {
    expect(etape(ci, 'npm audit --audit-level=high\n')).toContain('continue-on-error: true')
    expect(nuit).toContain('npm audit --audit-level=high')
  })
})
