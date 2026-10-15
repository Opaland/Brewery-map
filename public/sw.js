/*
  Service worker de Mousse de Poche — écrit à la main (décision du 15/10),
  repris et allégé de celui de Sentiers (`public/sw.js`).

  Ce qu'il garantit, et ce qu'il ne garantit pas :
  - l'application et **toutes les fiches** (les données sont dans le JS)
    sont précachées à l'installation : elles s'ouvrent sans réseau ;
  - les tuiles OSM déjà vues restent en cache (600 au plus) ; celles jamais
    vues ne peuvent pas s'afficher hors ligne — l'interface le dit ;
  - aucune requête vers un tiers n'est faite par lui, hors les tuiles que la
    carte demande déjà.
*/

/** Remplacée au build par l'empreinte des fichiers construits. */
const EMPREINTE = '__EMPREINTE__'
const PREFIXE_APP = 'mousse-app-'
const CACHE_APP = `${PREFIXE_APP}${EMPREINTE}`
const CACHE_TUILES = 'mousse-tuiles-v1'
const MAX_TUILES = 600

/** Remplacée au build par la liste des fichiers construits. */
self.__PRECACHE__ = []

const OPTIONS_MATCH = { ignoreVary: true }

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_APP)
      await Promise.allSettled(self.__PRECACHE__.map((url) => cache.add(url)))
      await self.skipWaiting()
    })(),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Seuls les anciens caches d'application partent ; les tuiles restent.
      const noms = await caches.keys()
      await Promise.all(
        noms
          .filter((nom) => nom.startsWith(PREFIXE_APP) && nom !== CACHE_APP)
          .map((nom) => caches.delete(nom)),
      )
      await self.clients.claim()
    })(),
  )
})

function estTuile(url) {
  return url.hostname === 'tile.openstreetmap.org'
}

async function reseauPuisCache(request, secours) {
  const cache = await caches.open(CACHE_APP)
  try {
    const reponse = await fetch(request)
    if (reponse && reponse.ok) await cache.put(request, reponse.clone())
    return reponse
  } catch (erreur) {
    const enCache =
      (await cache.match(request, OPTIONS_MATCH)) ??
      (secours ? await cache.match(secours, OPTIONS_MATCH) : undefined)
    if (enCache) return enCache
    throw erreur
  }
}

async function limiterTuiles(cache) {
  const entrees = await cache.keys()
  if (entrees.length <= MAX_TUILES) return
  await Promise.all(entrees.slice(0, entrees.length - MAX_TUILES).map((c) => cache.delete(c)))
}

async function cachePuisReseau(request) {
  const cache = await caches.open(CACHE_TUILES)
  const enCache = await cache.match(request, OPTIONS_MATCH)
  if (enCache) return enCache
  const reponse = await fetch(request)
  if (reponse && (reponse.ok || reponse.type === 'opaque')) {
    await cache.put(request, reponse.clone())
    void limiterTuiles(cache)
  }
  return reponse
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (request.mode === 'navigate') {
    event.respondWith(reseauPuisCache(request, './index.html'))
    return
  }
  if (url.origin === self.location.origin) {
    event.respondWith(reseauPuisCache(request))
    return
  }
  if (estTuile(url)) event.respondWith(cachePuisReseau(request))
  // Tout le reste (liens externes ouverts par la personne) : au réseau.
})
