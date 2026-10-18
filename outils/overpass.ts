/**
 * Une requête au miroir Overpass français, avec reprises. Partagée par
 * `osm-france.ts` (S25) et `osm-etiquettes.ts` (S60). Le serveur principal
 * coupe la connexion depuis l'environnement (16/10) ; le miroir n'a pas les
 * zones administratives : on lui envoie des rectangles.
 */
import type { ElementOverpass } from '../src/core/osm-france'

const AGENT = 'MousseDePoche/1.0 (https://github.com/Opaland/Brewery-map)'
const SERVEUR = 'https://overpass.openstreetmap.fr/api/interpreter'

export async function demanderOverpass(requete: string, quoi: string): Promise<{ elements: ElementOverpass[]; base: string }> {
  for (let essai = 1; essai <= 4; essai++) {
    const r = await fetch(SERVEUR, {
      method: 'POST',
      headers: { 'User-Agent': AGENT, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `data=${encodeURIComponent(requete)}`,
    })
    if (r.ok) {
      const j = (await r.json()) as { elements: ElementOverpass[]; osm3s?: { timestamp_osm_base?: string }; remark?: string }
      if (j.remark !== undefined) throw new Error(`${quoi} : ${j.remark}`)
      return { elements: j.elements, base: j.osm3s?.timestamp_osm_base ?? '' }
    }
    if (r.status !== 429 && r.status < 500) throw new Error(`${quoi} : HTTP ${String(r.status)}`)
    console.warn(`${quoi} : HTTP ${String(r.status)}, nouvel essai`)
    await new Promise((ok) => setTimeout(ok, 5000 * essai))
  }
  throw new Error(`${quoi} : le serveur ne répond pas`)
}
