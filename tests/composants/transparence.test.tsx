// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { hotesTiers, NOMS_DES_HOTES, POLITIQUE } from '../../build/csp'
import { choisirLangue } from '../../src/i18n'
import { ORIGINE_DEFAUT } from '../../src/core/origine'
import { PointDeDepart } from '../../src/PointDeDepart'

/**
 * S273 (repris de Sentiers, `transparence.spec.ts`) : la politique de
 * sécurité et le texte « Ce qui part sur le réseau » disent la même chose.
 * Un hôte ajouté à la politique sans être nommé fait échouer la porte.
 */
afterEach(() => {
  cleanup()
  choisirLangue('fr')
})

describe('hotesTiers', () => {
  it('lit les hôtes https de chaque directive, sans doublon', () => {
    expect(hotesTiers("img-src 'self' https://a.example; connect-src 'self' https://a.example https://b.example")).toEqual([
      'a.example',
      'b.example',
    ])
  })
  it('lit aussi les autres schémas (revue S273 : `wss://`, `http://`), sans le port', () => {
    expect(hotesTiers("connect-src 'self' wss://ws.example http://b.example:8080")).toEqual(['ws.example', 'b.example'])
  })
  it('ignore les mots-clés et les schémas sans hôte', () => {
    expect(hotesTiers("default-src 'self'; img-src data: blob:")).toEqual([])
  })
})

describe('la politique publiée', () => {
  it('chaque hôte tiers a le nom de son service', () => {
    const hotes = hotesTiers(POLITIQUE)
    expect(hotes.length).toBeGreaterThan(0)
    expect(hotes.filter((h) => NOMS_DES_HOTES[h] === undefined)).toEqual([])
  })

  it.each(['fr', 'en'] as const)('chaque service est nommé dans le texte de confidentialité (%s)', (langue) => {
    choisirLangue(langue)
    render(<PointDeDepart origine={ORIGINE_DEFAUT} onChange={() => undefined} />)
    const texte = screen.getByTestId('confidentialite').textContent
    // Le texte est bien dans la langue voulue : le nom du service étant le
    // même dans les deux, le cas anglais passerait sinon sur le français.
    expect(texte.includes('téléphone')).toBe(langue === 'fr')
    const absents = hotesTiers(POLITIQUE)
      .map((h) => NOMS_DES_HOTES[h] ?? h)
      .filter((nom) => !texte.includes(nom))
    expect(absents).toEqual([])
  })
})
