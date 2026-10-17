import { type Page } from '@playwright/test'

/**
 * Ce que `sw.js` promet de précacher, lu dans son texte (S7) : la liste et
 * l'empreinte de version. Partagé par le test local (hors-ligne.spec.ts) et
 * la sonde publiée (page-deployee.spec.ts, S241) — une seule lecture (§4).
 */
export function promessePrecache(sw: string): { fichiers: string[]; empreinte: string | undefined } {
  const fichiers = JSON.parse(/self\.__PRECACHE__ = (\[[^\]]*\])/.exec(sw)?.[1] ?? '[]') as string[]
  const empreinte = /const EMPREINTE = '([a-f0-9]+)'/.exec(sw)?.[1]
  return { fichiers, empreinte }
}

/**
 * Les fichiers promis absents du cache de CETTE version (pas « n'importe
 * quel cache », revue code S7). On interroge le cache lui-même :
 * `setOffline` ne s'applique pas au service worker (CLAUDE.md §1).
 */
export async function absentsDuCache(page: Page, fichiers: string[], empreinte: string): Promise<string[]> {
  await page.evaluate(() => navigator.serviceWorker.ready)
  return page.evaluate(
    async ({ fichiers, nom }) => {
      const cache = await caches.open(nom)
      const absents: string[] = []
      for (const f of fichiers) {
        if (!(await cache.match(new URL(f, location.href).href))) absents.push(f)
      }
      return absents
    },
    { fichiers, nom: `mousse-app-${empreinte}` },
  )
}
