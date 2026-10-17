import { createHash } from 'node:crypto'
import { readdirSync, readFileSync } from 'node:fs'

/**
 * Ce que `curation.ts` et `garde-donnees.ts` partagent (§4 : une garde, une
 * seule écriture) : l'empreinte d'un lot, et les lots de `curation/`.
 */

/** Les 12 premiers caractères du SHA-256 du fichier du lot, tel qu'écrit. */
export const empreinte = (texte: string) => createHash('sha256').update(texte).digest('hex').slice(0, 12)

/** Les fichiers de lots de `curation/`, hors candidats OSM bruts (`osm-<date>.json`). */
export function fichiersDeLots(): string[] {
  return readdirSync('curation')
    .filter((f) => f.endsWith('.json') && !f.startsWith('osm-'))
    .map((f) => `curation/${f}`)
}

export function lireTexte(chemin: string): string {
  return readFileSync(chemin, 'utf8')
}
