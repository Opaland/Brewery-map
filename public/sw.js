/*
  Service worker de Mousse de Poche — écrit à la main (décision du 15/10),
  repris et allégé de celui de Sentiers (`public/sw.js`).

  Ce qu'il garantit, et ce qu'il ne garantit pas :
  - l'application et **toutes les fiches** (les données sont dans le JS)
    sont précachées à l'installation : elles s'ouvrent sans réseau ;
  - les tuiles OSM déjà affichées sur l'appareil restent en cache (600 au
    plus ; au-delà, les plus anciennes mises en cache partent, même
    revues depuis : l'ordre est celui de l'insertion ; choix de stockage tranché au jugement : de l'ordre de quelques
    méga-octets, sans mesure) ; celles jamais affichées ne peuvent pas
    s'afficher hors ligne — l'interface le dit ;
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

/*
  Tout ou rien (revue code S7) : un seul fichier en échec fait échouer
  l'installation, et l'ancien service worker — avec son cache complet —
  reste en place. `Promise.allSettled` laissait s'installer un cache partiel,
  puis l'activation effaçait l'ancien : plus de hors ligne, sans que rien ne
  le dise.

  `cache: 'reload'` : chaque fichier est relu au serveur, pas dans le cache
  HTTP du navigateur, qui pourrait rendre un `index.html` d'avant le
  déploiement pointant vers d'anciens fichiers.

  Pas de `skipWaiting` d'office : le nouveau service worker attend que les
  onglets ouverts sur l'ancienne version se ferment. Les activer de force
  cassait la carte de ces onglets, qui demandaient un fichier haché que le
  serveur n'avait plus. Il s'active quand la personne le demande : le
  bandeau « Nouvelle version » de la page envoie « activer » (revue globale
  S22 : sans cela, une application installée gardait l'ancienne version
  sans rien dire).
*/
self.addEventListener('message', (event) => {
  if (event.data === 'activer') void self.skipWaiting()
})

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_APP)
      await Promise.all(
        self.__PRECACHE__.map((url) => cache.add(new Request(url, { cache: 'reload' }))),
      )
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

/*
  Le réseau d'abord ; le cache si le réseau échoue **ou répond une erreur**
  (404, 5xx, portail captif). Revue globale S22 : un 404 était rendu tel
  quel alors que le cache avait le fichier — après un déploiement, la carte
  d'un onglet resté ouvert demandait un fichier haché que le serveur n'avait
  plus, et tombait.
*/
async function reseauPuisCache(request, secours) {
  const cache = await caches.open(CACHE_APP)
  const enCache = async () =>
    (await cache.match(request, OPTIONS_MATCH)) ??
    (secours ? await cache.match(secours, OPTIONS_MATCH) : undefined)
  let reponse
  try {
    reponse = await fetch(request)
  } catch (erreur) {
    const garde = await enCache()
    if (garde) return garde
    throw erreur
  }
  if (reponse && reponse.ok) {
    await cache.put(request, reponse.clone())
    return reponse
  }
  return (await enCache()) ?? reponse
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
