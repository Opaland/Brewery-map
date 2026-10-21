import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { supprimerSync } from '../../outils/supprimer'

/**
 * S334 (W9) : la suppression des outils, essayée dans le dépôt lui-même ;
 * sur le PC fixe, son chemin est accentué (`C:\Users\Moretti Cédric\…`).
 */
describe('supprimerSync', () => {
  it('supprime un dossier et son contenu, dans un chemin accentué', () => {
    mkdirSync('node_modules/.tmp', { recursive: true })
    const racine = mkdtempSync(path.join('node_modules/.tmp', 'supprimé-'))
    mkdirSync(path.join(racine, 'sous-dossier'))
    writeFileSync(path.join(racine, 'sous-dossier', 'fichier.txt'), 'x')
    writeFileSync(path.join(racine, 'é.txt'), 'x')
    supprimerSync(racine)
    expect(existsSync(racine)).toBe(false)
  })
  it('un chemin absent ne lève rien', () => {
    expect(() => {
      supprimerSync('node_modules/.tmp/absent-é')
    }).not.toThrow()
  })
})
