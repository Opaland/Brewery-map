import { test as base, expect } from '@playwright/test'

/**
 * La position ne quitte jamais le navigateur (CLAUDE.md §0), vérifié par
 * chaque test de bout en bout (S232, revue d'architecture). Tous les specs
 * importent `test` d'ici ; la fixture relève la position donnée au
 * navigateur et échoue si une requête de la page la contient, dans son URL
 * ou son corps, à trois décimales.
 */
export { expect }

type Coordonnees = { latitude: number; longitude: number }

/** Les écritures d'un nombre qu'une requête pourrait porter : arrondi et tronqué à 3 décimales. */
function ecritures(x: number): string[] {
  const tronque = Math.trunc(x * 1000) / 1000
  return [...new Set([x.toFixed(3), tronque.toFixed(3)])]
}

export const test = base.extend<{ gardePosition: undefined }>({
  gardePosition: [
    async ({ page, geolocation }, use) => {
      const positions: Coordonnees[] = geolocation === undefined ? [] : [geolocation]
      const contexte = page.context()
      const poser = contexte.setGeolocation.bind(contexte)
      contexte.setGeolocation = async (g) => {
        if (g !== null) positions.push(g)
        await poser(g)
      }
      const requetes: string[] = []
      page.on('request', (r) => {
        requetes.push(`${r.url()} ${r.postData() ?? ''}`)
      })
      await use(undefined)
      for (const p of positions) {
        const lat = ecritures(p.latitude)
        const lon = ecritures(p.longitude)
        const fautives = requetes.filter((q) => lat.some((l) => q.includes(l)) || lon.some((l) => q.includes(l)))
        expect(fautives, 'une requête emporte la position de la personne (CLAUDE.md §0)').toEqual([])
      }
    },
    { auto: true },
  ],
})
