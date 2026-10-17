import { readdirSync, readFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { expect, test } from './position'

/**
 * S235 : budgets de poids (octets gzip, niveau 9), mesurés le 17/10 et
 * tranchés au jugé (docs/stories/S235.md). Le premier écran se lit dans
 * dist/index.html, pas dans une liste recopiée (§4ter).
 */
const BUDGETS = { premierEcran: 195_000, carte: 310_000, travailleur: 158_000 }

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
  expect(fichiers.length).toBeGreaterThan(3)
  const total = fichiers.reduce((s, f) => s + gz(f), 0)
  expect(total, `premier écran : ${String(total)} octets gzip (${fichiers.join(', ')})`).toBeLessThanOrEqual(BUDGETS.premierEcran)
})

test('la carte et son travailleur tiennent leur budget', () => {
  expect(gz(seul('Carte-'))).toBeLessThanOrEqual(BUDGETS.carte)
  expect(gz(seul('maplibre-gl-worker-'))).toBeLessThanOrEqual(BUDGETS.travailleur)
})
