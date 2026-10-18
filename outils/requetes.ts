/**
 * S280 — le seul endroit des outils qui parle au réseau. Chaque requête,
 * reprise comprise, est comptée par hôte ; le bilan s'écrit sur la sortie
 * d'erreur quand l'outil se termine. `tests/unit/requetes.test.ts` refuse un
 * `fetch(` ou un `curl` direct ailleurs dans `outils/`.
 */
import { execFileSync } from 'node:child_process'
import { bilanDesRequetes, compterRequete } from '../src/core/requetes'

const COMPTE = new Map<string, number>()

process.on('exit', () => {
  const bilan = bilanDesRequetes(COMPTE)
  if (bilan !== '') console.error(`\n${bilan}`)
})

/** `fetch`, compté. */
export function fetchCompte(url: string | URL, init?: RequestInit): Promise<Response> {
  compterRequete(COMPTE, url.toString())
  return fetch(url, init)
}

/**
 * `curl` (il passe par le mandataire du conteneur, là où `fetch` est coupé),
 * compté. `options` précède l'URL, toujours en dernier.
 */
export function curlCompte(url: string, options: readonly string[]): string {
  compterRequete(COMPTE, url)
  return execFileSync('curl', [...options, url], { encoding: 'utf8' })
}
