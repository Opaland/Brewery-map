import { execFileSync } from 'node:child_process'
import { curlCompte } from './requetes'
// La même constante que la règle des positions (`estUneRequeteDeCommune`) :
// une seule écriture (S285).
import { GEOCODEUR } from '../src/core/curation'

/** Une requête au géocodeur, avec reprise (le mandataire coupe souvent). */
export function geocoder(params: Record<string, string>): { url: string; reponse: unknown } {
  const url = GEOCODEUR + new URLSearchParams({ ...params, limit: '5' }).toString()
  for (let essai = 1; essai <= 8; essai++) {
    try {
      return { url, reponse: JSON.parse(curlCompte(url, ['-sS', '-f', '-m', '20'])) as unknown }
    } catch {
      if (essai < 8) execFileSync('sleep', [String(2 * essai)])
    }
  }
  throw new Error(`géocodeur injoignable : ${url}`)
}
