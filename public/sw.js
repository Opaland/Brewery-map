/*
  Service worker de Mousse de Poche — écrit à la main (décision du 15/10),
  repris et allégé de celui de Sentiers (`public/sw.js`).

  Ce qu'il garantit, et ce qu'il ne garantit pas :
  - l'application et **toutes les fiches** (les données sont dans le JS)
    sont précachées à l'installation : elles s'ouvrent sans réseau ;
  - les tuiles OSM déjà affichées sur l'appareil restent en cache (600 au
    plus ; au-delà, les moins récemment vues partent : chaque lecture
    remet la tuile en fin de file, S295 ; choix de stockage
    tranché au jugement : de l'ordre de quelques méga-octets, sans mesure) ; celles jamais affichées ne peuvent pas
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

/*
  Un fichier de `assets/` porte l'empreinte de son contenu dans son nom :
  même nom, même contenu. S'il est déjà dans le cache d'une version
  précédente, on le reprend sans réseau (S295, revue d'architecture : chaque
  accord sur les données retéléchargeait tout, de l'ordre du méga-octet).
  Les autres fichiers (`index.html`, les communes, les icônes) n'ont pas
  d'empreinte : ils sont toujours relus au serveur.
*/
const HACHE = /\/assets\/[^/]+-[A-Za-z0-9_-]{8,}\.[a-z0-9]+$/

async function depuisUneVersionPrecedente(url) {
  if (!HACHE.test(new URL(url, self.location.href).pathname)) return undefined
  const noms = (await caches.keys()).filter((nom) => nom.startsWith(PREFIXE_APP) && nom !== CACHE_APP)
  for (const nom of noms) {
    const garde = await (await caches.open(nom)).match(new URL(url, self.location.href).href, OPTIONS_MATCH)
    if (garde) return garde
  }
  return undefined
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_APP)
      await Promise.all(
        self.__PRECACHE__.map(async (url) => {
          const ancien = await depuisUneVersionPrecedente(url)
          if (ancien) return cache.put(new URL(url, self.location.href).href, ancien)
          return cache.add(new Request(url, { cache: 'reload' }))
        }),
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

  **Ou se tait trop longtemps** (S295, Bernard) : sur une 4G qui rame, le
  navigateur se croit en ligne et le `fetch` ne finit pas ; une page déjà en
  cache attendait sa fin. Passé `DELAI_RESEAU`, le cache répond, et la
  réponse du réseau, si elle arrive, met le cache à jour pour la fois
  suivante. Sans copie en cache, on attend le réseau : il n'y a rien
  d'autre à rendre. Seuil de présentation, tranché au jugement (§2) :
  4 s, le temps au-delà duquel une page blanche passe pour une panne ;
  écartés : 1 s (une 3G correcte servirait l'ancienne version à chaque
  ouverture) et 10 s (déjà l'abandon).
*/
const DELAI_RESEAU = 4000

async function reseauPuisCache(event, request, secours) {
  const cache = await caches.open(CACHE_APP)
  const enCache = async () =>
    (await cache.match(request, OPTIONS_MATCH)) ??
    (secours ? await cache.match(secours, OPTIONS_MATCH) : undefined)
  // Une écriture en cache qui échoue (appareil plein) ne perd pas la réponse
  // du réseau : la page échouait alors qu'il avait répondu 200 (revue
  // globale du 19/10, A3).
  const reseau = fetch(request).then(async (reponse) => {
    if (reponse && reponse.ok) await cache.put(request, reponse.clone()).catch(() => undefined)
    return reponse
  })
  const garde = await enCache()
  if (!garde) return reseau
  // Le réseau perdant la course ne doit pas laisser de rejet sans suite, et
  // le service worker doit vivre jusqu'à sa mise en cache (revue adverse S295).
  event.waitUntil(reseau.catch(() => undefined))
  const attente = new Promise((fin) => setTimeout(() => fin(undefined), DELAI_RESEAU))
  try {
    const reponse = await Promise.race([reseau, attente])
    return reponse && reponse.ok ? reponse : garde
  } catch {
    return garde
  }
}

async function limiterTuiles(cache) {
  const entrees = await cache.keys()
  if (entrees.length <= MAX_TUILES) return
  await Promise.all(entrees.slice(0, entrees.length - MAX_TUILES).map((c) => cache.delete(c)))
}

async function cachePuisReseau(event, request) {
  const cache = await caches.open(CACHE_TUILES)
  const enCache = await cache.match(request, OPTIONS_MATCH)
  if (enCache) {
    // Remise en fin de file : l'éviction part de la tuile la moins
    // récemment vue, pas de la plus anciennement mise en cache (S295,
    // Bernard : la zone qu'on consulte souvent partait quand même).
    // Un `put` seul, pas `delete` puis `put` : l'entrée est remplacée et
    // ajoutée en fin de liste d'un même geste (spécification Cache, « batch
    // cache operations »), sans instant où la tuile manque (revue adverse
    // S295). Coût : une écriture par tuile lue.
    event.waitUntil(cache.put(request, enCache.clone()).catch(() => undefined))
    return enCache
  }
  const reponse = await fetch(request)
  if (reponse && (reponse.ok || reponse.type === 'opaque')) {
    await cache.put(request, reponse.clone()).catch(() => undefined)
    void limiterTuiles(cache)
  }
  return reponse
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (request.mode === 'navigate') {
    event.respondWith(reseauPuisCache(event, request, './index.html'))
    return
  }
  if (url.origin === self.location.origin) {
    event.respondWith(reseauPuisCache(event, request))
    return
  }
  if (estTuile(url)) event.respondWith(cachePuisReseau(event, request))
  // Tout le reste (liens externes ouverts par la personne) : au réseau.
})
