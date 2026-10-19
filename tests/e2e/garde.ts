import { type Page } from '@playwright/test'
import { expect } from './position'

/** Ce que l'application a gardé dans IndexedDB, lu tel quel. */
export const lireGarde = (page: Page) =>
  page.evaluate(
    () =>
      new Promise<unknown>((resolve, reject) => {
        const req = indexedDB.open('mousse-de-poche')
        req.onerror = () => {
          reject(new Error('ouverture'))
        }
        req.onsuccess = () => {
          const db = req.result
          if (!db.objectStoreNames.contains('reglages')) {
            resolve(undefined)
            return
          }
          const get = db.transaction('reglages').objectStore('reglages').get('preferences')
          get.onsuccess = () => {
            resolve(get.result)
          }
        }
      }),
  )

/*
  L'écriture IndexedDB est asynchrone : recharger juste après un geste peut
  partir avant elle. On attend que le stockage dise ce qu'on attend — vu
  échouer au hasard sans cette attente (S9), puis le thème et la couche OSM
  sur le PC fixe sous Windows (S302, 19/10).
*/
export const attendreGarde = (page: Page, attendu: Record<string, unknown>) =>
  expect.poll(() => lireGarde(page)).toMatchObject(attendu)
