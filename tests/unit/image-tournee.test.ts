import { describe, expect, it } from 'vitest'
import { couper, planTournee } from '../../src/core/image-tournee'

/** S34 — l'image de la tournée ne dit que les étapes, jamais le départ. */
describe('image de la tournée (S34)', () => {
  const etapes = [
    { nom: 'Caribrew', commune: 'Soucieu-en-Jarrest', departement: '69' },
    { nom: 'Tom & Co', commune: 'Lyon', departement: '69' },
  ]

  it('ne porte que la marque, les étapes numérotées et l’adresse de l’application', () => {
    const plan = planTournee(etapes)
    expect(plan.textes.map((t) => t.texte)).toEqual([
      'Ma tournée',
      '1. Caribrew',
      'Soucieu-en-Jarrest (69)',
      '2. Tom & Co',
      'Lyon (69)',
      'Mousse de Poche',
      'opaland.github.io/Brewery-map',
    ])
  })

  it('aucun texte ne parle du départ ni d’une distance', () => {
    const tout = planTournee(etapes).textes.map((t) => t.texte).join(' ')
    expect(tout).not.toMatch(/départ|km|position|autour/i)
  })

  it('les textes restent dans l’image', () => {
    const plan = planTournee([...etapes, ...etapes])
    for (const t of plan.textes) {
      expect(t.x).toBeGreaterThanOrEqual(0)
      expect(t.y).toBeLessThanOrEqual(plan.hauteur)
    }
  })

  it('un nom trop long est coupé, avec des points de suspension', () => {
    const long = 'Brasserie artisanale de la vallée du Gier et des monts du Pilat réunis'
    expect(couper(long, 28)).toBe('Brasserie artisanale de la…')
    expect(couper('Court', 28)).toBe('Court')
    const plan = planTournee([{ nom: long, commune: 'Rive-de-Gier', departement: '42' }, etapes[0]])
    expect(plan.textes[1].texte.length).toBeLessThanOrEqual(31)
  })
})
