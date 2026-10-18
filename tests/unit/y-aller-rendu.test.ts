import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import type { Brasserie } from '../../src/core/schema'
import { YAller } from '../../src/YAller'
import { LIGNES_REELLES } from './lignes-reelles'

const base = LIGNES_REELLES[0] as unknown as Brasserie
const rendu = (b: Brasserie) => renderToStaticMarkup(createElement(YAller, { brasserie: b }))

describe('« Y aller » dans la fiche (S19, Hugo)', () => {
  it('quatre liens, chacun dans un nouvel onglet, sans adresse d’origine', () => {
    const html = rendu({ ...base, addr: '4 rue X, 69510 Soucieu-en-Jarrest' })
    expect(html.match(/<a /g)).toHaveLength(4)
    expect(html.match(/target="_blank" rel="noopener noreferrer"/g)).toHaveLength(4)
    expect(html).toContain('Google Maps')
    expect(html).not.toContain('Adresse inconnue')
  })

  it('sans adresse, il dit où mène l’itinéraire : le point approximatif de la carte', () => {
    // « Centre de la commune » n'est pas établi pour toutes (revue code S19) :
    // la fiche dit ce que dit la précision (S59 : ni centre ni écart chiffré).
    const html = rendu({ ...base, c: 'Oullins', addr: 'Oullins' })
    expect(html).toContain(
      'Adresse inconnue : l’itinéraire mène au point de la carte, qui n’est pas l’adresse et peut en être à plusieurs kilomètres.',
    )
  })

  it('dit ce qui part, et vers qui', () => {
    expect(rendu(base)).toContain(
      'Le lien ne contient que la destination. Votre position, l’application choisie la prend elle-même si vous le lui permettez.',
    )
  })
})
