import { readdirSync, readFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { expect, test } from './position'

/**
 * S235 : budgets de poids (octets gzip, niveau 9), mesurés le 17/10 et
 * tranchés au jugé (docs/stories/S235.md). Le premier écran se lit dans
 * dist/index.html, pas dans une liste recopiée (§4ter).
 *
 * S271 : le premier écran porte `data/breweries.json`, passé de 166 à 358
 * fiches par la règle de Cédric (+27 Ko gzip pour les données, −6 Ko pour
 * la couche OSM épurée). Mesuré à 198 785 octets, budget refixé par la
 * même règle que S235 (mesure + environ 10 %) : 219 000. S293 a mesuré
 * le premier écran à 358, 1 000 et 2 000 fiches (`docs/PREMIER-ECRAN.md`) :
 * S294 chargera les fiches par département.
 */
const BUDGETS = { premierEcran: 219_000, carte: 310_000, travailleur: 158_000 }

const gz = (fichier: string) => gzipSync(readFileSync(`dist/${fichier}`), { level: 9 }).length

function premierEcran(): string[] {
  const html = readFileSync('dist/index.html', 'utf8')
  return [...html.matchAll(/(?:src|href)="\.\/(assets\/[^"]+\.(?:js|css))"/g)].map((m) => m[1])
}

function seul(prefixe: string): string {
  const trouves = readdirSync('dist/assets').filter((f) => f.startsWith(prefixe) && f.endsWith('.js'))
  expect(trouves, `un seul fichier ${prefixe}*.js`).toHaveLength(1)
  return `assets/${trouves[0] ?? ''}`
}

test('le premier écran tient son budget', () => {
  const fichiers = premierEcran()
  // La lecture de index.html a trouvé le paquet principal et sa feuille de
  // style. Le nombre de fichiers dépend du découpage de Vite : S70 a fondu
  // un morceau partagé dans le paquet principal (4 fichiers → 3).
  expect(fichiers.some((f) => /^assets\/index-[^/]+\.js$/.test(f))).toBe(true)
  expect(fichiers.some((f) => /^assets\/index-[^/]+\.css$/.test(f))).toBe(true)
  const total = fichiers.reduce((s, f) => s + gz(f), 0)
  expect(total, `premier écran : ${String(total)} octets gzip (${fichiers.join(', ')})`).toBeLessThanOrEqual(BUDGETS.premierEcran)
})

test('la carte et son travailleur tiennent leur budget', () => {
  expect(gz(seul('Carte-'))).toBeLessThanOrEqual(BUDGETS.carte)
  expect(gz(seul('maplibre-gl-worker-'))).toBeLessThanOrEqual(BUDGETS.travailleur)
})
