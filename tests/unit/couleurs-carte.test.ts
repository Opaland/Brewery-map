import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { ORDRE_CATEGORIES } from '../../src/core/categories'

/**
 * S307 (revue globale du 19/10, A8) : les tuiles d'OpenStreetMap restent
 * claires en thème sombre ; les marqueurs y prenaient les couleurs pâles du
 * thème sombre (1,2 à 1,3:1). La carte et sa légende gardent les couleurs
 * du thème clair, qui tiennent 3:1 (WCAG 1.4.11) contre les fonds des
 * tuiles et les routes jusqu'aux principales ; l'autoroute et la voie
 * rapide font exception, plus bas.
 *
 * Les fonds : style openstreetmap-carto, lus le 20/10 —
 * `style/style.mss` (@land-color, @water-color), `style/landcover.mss`
 * (@park, @forest, @grass, @farmland, @residential, @industrial,
 * @commercial, @retail), `style/roads.mss` (@tertiary-fill et
 * @residential-fill blancs) et `style/road-colors-generated.mss`
 * (@primary-fill, @secondary-fill, @trunk-fill, @motorway-fill).
 */
const TUILES = {
  terre: '#f2efe9',
  eau: '#aad3df',
  parc: '#c8facc',
  foret: '#add19e',
  herbe: '#cdebb0',
  champs: '#eef0d5',
  habitat: '#e0dfdf',
  industrie: '#ebdbe8',
  commerce: '#f2dad9',
  boutiques: '#ffd6d1',
  route: '#ffffff',
  'route principale': '#fcd6a4',
  'route secondaire': '#f7fabf',
}

/**
 * L'exception, mesurée et dite (revue adverse S307) : sur l'autoroute et la
 * voie rapide, les catégories font 2,2 à 3,2:1. Y tenir 3:1 demande une
 * palette plus sombre partout (BACKLOG). Le test tient l'écart borné, et
 * rougira le jour où il se creuse.
 */
const GRANDES_ROUTES = { autoroute: '#e892a2', 'voie rapide': '#f9b29c' }
const PLANCHER_GRANDES_ROUTES = 2.2

const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contraste = (a: string, b: string) => {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

const CSS = readFileSync('src/index.css', 'utf8')
/** Les variables d'une règle : `{ nom: valeur }`. */
const variables = (corps: string) =>
  Object.fromEntries([...corps.matchAll(/(--[a-z0-9-]+)\s*:\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]))

const SUR_CARTE = variables(/\.carte, \.legende-carte \{([^}]*)\}/.exec(CSS)?.[1] ?? '')
/** Le premier `:root`, celui du thème clair, qui définit les catégories. */
const CLAIR = variables(/:root \{([^}]*--cat-1[^}]*)\}/.exec(CSS)?.[1] ?? '')

describe('les couleurs sur la carte (S307)', () => {
  it('la carte et sa légende redéfinissent les cinq catégories, l’anneau et le focus', () => {
    expect(Object.keys(SUR_CARTE).sort()).toEqual(['--carte-encre', '--carte-focus', '--cat-0', '--cat-1', '--cat-2', '--cat-3', '--cat-4'])
  })

  it('chacune tient 3:1 contre les fonds des tuiles et les routes jusqu’aux principales', () => {
    for (const [nom, valeur] of Object.entries(SUR_CARTE))
      for (const [fond, couleur] of Object.entries(TUILES))
        expect(contraste(valeur, couleur), `${nom} sur ${fond}`).toBeGreaterThanOrEqual(3)
  })

  it('sur autoroute et voie rapide, l’écart reste borné ; anneau et focus y tiennent 3:1', () => {
    for (const [nom, valeur] of Object.entries(SUR_CARTE))
      for (const [fond, couleur] of Object.entries(GRANDES_ROUTES))
        expect(contraste(valeur, couleur), `${nom} sur ${fond}`).toBeGreaterThanOrEqual(
          nom.startsWith('--carte-') ? 3 : PLANCHER_GRANDES_ROUTES,
        )
  })

  it('les catégories y valent celles du thème clair : deux listes tenues d’accord (§4ter)', () => {
    for (const n of ORDRE_CATEGORIES) expect(SUR_CARTE[`--cat-${String(n)}`]).toBe(CLAIR[`--cat-${String(n)}`])
  })
})
