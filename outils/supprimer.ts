/**
 * Supprimer un fichier ou un dossier, synchrone (W9, S334). Sous Node 24 et
 * Windows, `fs.rmSync` ne supprime rien dans un chemin non ASCII et ne lève
 * aucune erreur (mesuré le 20/10 dans `C:\Users\Moretti Cédric\…`, S304).
 * `unlinkSync` et `rmdirSync` suppriment : on descend le dossier soi-même.
 * Absent : rien à faire, comme `force: true`.
 */
import { lstatSync, readdirSync, rmdirSync, unlinkSync, type Stats } from 'node:fs'
import path from 'node:path'

export function supprimerSync(chemin: string): void {
  // `lstat` et non `existsSync`, qui suit les liens : un lien pendant restait (revue adverse S334).
  let etat: Stats
  try {
    etat = lstatSync(chemin)
  } catch {
    return
  }
  if (etat.isDirectory()) {
    for (const nom of readdirSync(chemin)) supprimerSync(path.join(chemin, nom))
    rmdirSync(chemin)
  } else unlinkSync(chemin)
}
