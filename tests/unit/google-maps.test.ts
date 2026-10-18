import { describe, expect, it } from 'vitest'
import { rechercheGoogleMaps } from '../../src/core/google-maps'

describe('la fiche Google Maps d’une brasserie (S267)', () => {
  it('cherche le nom et la commune de la brasserie, encodés', () => {
    expect(rechercheGoogleMaps('Brasserie de l’Ours Barbu', 'Saint-Étienne')).toBe(
      'https://www.google.com/maps/search/?api=1&query=Brasserie+de+l%E2%80%99Ours+Barbu+Saint-%C3%89tienne',
    )
  })

  it('ne porte rien d’autre que la requête : ni position, ni coordonnées', () => {
    const url = new URL(rechercheGoogleMaps('Caribrew', 'Soucieu-en-Jarrest'))
    expect(url.origin + url.pathname).toBe('https://www.google.com/maps/search/')
    expect([...url.searchParams.keys()]).toEqual(['api', 'query'])
    expect(url.searchParams.get('query')).toBe('Caribrew Soucieu-en-Jarrest')
  })
})
