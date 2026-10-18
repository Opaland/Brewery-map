/**
 * S277 — sonde chaque service de `services-sondes.ts`, un à la fois, et
 * écrit le bilan (dans le résumé du run quand GitHub Actions le demande).
 * Sort en 1 si un service est en panne.
 *
 *   npx tsx outils/sonde-services.ts
 */
import { appendFileSync } from 'node:fs'
import { bilanDesSondes, DELAI_DEPASSE, jugerReponse, type Reponse } from '../src/core/sonde'
import { SERVICES } from './services-sondes'

const AGENT = 'MousseDePoche/1.0 (https://github.com/Opaland/Brewery-map)'
// 20 s : une attente de sonde, pas un seuil de l'application ; Overpass et
// Wikidata répondent parfois en plusieurs secondes sans être en panne.
const DELAI_MS = 20_000

async function demander(url: string): Promise<Reponse> {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': AGENT }, signal: AbortSignal.timeout(DELAI_MS) })
    const octets = new Uint8Array(await r.arrayBuffer()).slice(0, 2000)
    return { statut: r.status, debut: new TextDecoder('latin1').decode(octets) }
  } catch (e) {
    if (e instanceof Error && e.name === 'TimeoutError') return { erreur: DELAI_DEPASSE }
    const cause = e instanceof Error && e.cause instanceof Error ? e.cause.message : String(e)
    return { erreur: cause }
  }
}

const resultats = []
for (const service of SERVICES) resultats.push({ service, verdict: jugerReponse(service, await demander(service.url)) })
const { texte, code } = bilanDesSondes(resultats)
console.log(texte)
const resume = process.env['GITHUB_STEP_SUMMARY']
if (resume) appendFileSync(resume, `${texte}\n`)
process.exit(code)
