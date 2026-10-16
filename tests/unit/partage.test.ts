import { describe, expect, it } from 'vitest'
import { ficheDuLien, lienDeFiche } from '../../src/core/partage'

describe('le lien d’une fiche (S27 : chaque partage fait connaître l’application)', () => {
  const base = 'https://opaland.github.io/Brewery-map/'

  it('aller-retour, accents et esperluette compris', () => {
    const url = lienDeFiche(base, 'Tom & Co')
    expect(url).toBe('https://opaland.github.io/Brewery-map/#fiche=Tom%20%26%20Co')
    expect(ficheDuLien(new URL(url).hash)).toBe('Tom & Co')
    expect(ficheDuLien(new URL(lienDeFiche(base, 'Brasserie de l’Œil')).hash)).toBe('Brasserie de l’Œil')
  })

  it('le lien ne porte que le nom : ni position, ni départ', () => {
    expect(lienDeFiche(`${base}?x=1#ancien`, 'A')).toBe(`${base}#fiche=A`)
  })

  it('un fragment étranger ou abîmé : rien', () => {
    expect(ficheDuLien('')).toBeUndefined()
    expect(ficheDuLien('#titre-liste')).toBeUndefined()
    expect(ficheDuLien('#fiche=%E0%A4%A')).toBeUndefined()
    expect(ficheDuLien('#fiche=')).toBeUndefined()
  })
})
