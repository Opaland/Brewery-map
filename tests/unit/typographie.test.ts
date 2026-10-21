import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

/**
 * S332 (revue globale du 19/10, A32) : un nom entre guillemets français est
 * tenu par des espaces insécables ; sinon « « » restait seul en fin de ligne
 * dans l'annonce.
 */
describe('les guillemets autour d’un nom', () => {
  it.each(['src/App.tsx', 'src/Carte.tsx', 'src/textes/en.ts'])('%s : aucune espace sécable entre « et {nom}', (fichier) => {
    const texte = readFileSync(fichier, 'utf8')
    expect(texte.match(/« \{nom\}|\{nom\} »/g) ?? []).toEqual([])
  })
})
