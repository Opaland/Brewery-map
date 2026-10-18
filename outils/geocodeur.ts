import { execFileSync } from 'node:child_process'

const GEOCODEUR = 'https://data.geopf.fr/geocodage/search?'

/** Une requête au géocodeur, avec reprise (le mandataire coupe souvent). */
export function geocoder(params: Record<string, string>): { url: string; reponse: unknown } {
  const url = GEOCODEUR + new URLSearchParams({ ...params, limit: '5' }).toString()
  for (let essai = 1; essai <= 8; essai++) {
    try {
      return { url, reponse: JSON.parse(execFileSync('curl', ['-sS', '-f', '-m', '20', url], { encoding: 'utf8' })) as unknown }
    } catch {
      if (essai < 8) execFileSync('sleep', [String(2 * essai)])
    }
  }
  throw new Error(`géocodeur injoignable : ${url}`)
}
