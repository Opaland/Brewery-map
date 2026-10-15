import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Contact } from '../../src/Contact'
import type { Brasserie } from '../../src/core/schema'
import { LIGNES_REELLES } from './lignes-reelles'

/**
 * Le rendu du bloc contact, sans navigateur. Aucune ligne de `data/` ne porte
 * encore de contact (les exemples attendent l'accord de Cédric) : la
 * brasserie de test vit ici, pas dans les données.
 */
const base = LIGNES_REELLES[0] as unknown as Brasserie
const rendu = (b: Brasserie) => renderToStaticMarkup(createElement(Contact, { brasserie: b }))

describe('le bloc contact', () => {
  it('sans contact : « non renseigné », aucun lien', () => {
    const html = rendu(base)
    expect(html).toContain('Téléphone : non renseigné.')
    expect(html).not.toContain('href')
  })

  it('avec contact : appeler, site, Untappd, et d’où ça vient', () => {
    const html = rendu({
      ...base,
      contact: {
        tel: '04 72 50 88 53',
        site: 'https://www.nomadebiere.fr/',
        untappd: 'https://untappd.com/NomadeBrewery/beer',
        source: 'https://www.nomadebiere.fr/la-taproom/',
        verifieLe: '2026-10-15',
      },
    })
    expect(html).toContain('href="tel:+33472508853"')
    expect(html).toContain('Appeler le 04 72 50 88 53')
    expect(html).toContain('href="https://untappd.com/NomadeBrewery/beer"')
    expect(html).toContain('Coordonnées lues le 15 octobre 2026 sur')
    expect(html).toContain('>nomadebiere.fr</a>')
    // Chaque lien http(s) part dans un nouvel onglet et sans référent —
    // compté sur tous les liens, pas seulement ceux qui ont déjà `target`
    // (revue code S4), et quel que soit l'ordre des attributs.
    const liens = html.match(/<a [^>]*>/g) ?? []
    const externes = liens.filter((a) => /href="https?:/.test(a))
    expect(externes.length).toBe(3)
    for (const a of externes) {
      expect(a).toContain('target="_blank"')
      expect(a).toContain('rel="noopener noreferrer"')
    }
    // Le nom de la brasserie est dans le nom accessible des liens.
    expect(html).toContain('Site de la brasserie<span class="lecteur-seul"> Caribrew</span>')
    expect(html).toContain('Untappd (avis sur les bières)<span class="lecteur-seul"> Caribrew</span>')
  })

  it('un numéro cité dans la justification est signalé, pas ignoré', () => {
    const html = rendu({ ...base, note: 'Horaires non publiés (tél. 04 75 85 47 19).' })
    expect(html).toContain(
      'Téléphone : pas de numéro vérifié. La source en cite un ci-dessus, non revérifié.',
    )
    expect(html).not.toContain('tel:')
  })

  it('un contact sans téléphone le dit, sans bouton', () => {
    const html = rendu({
      ...base,
      contact: { site: 'https://gredambrasserie.com/', source: 'https://gredambrasserie.com/', verifieLe: '2026-10-15' },
    })
    expect(html).toContain('Téléphone : non renseigné.')
    expect(html).not.toContain('tel:')
  })
})
