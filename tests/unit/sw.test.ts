import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { afterEach, describe, expect, it, vi } from 'vitest'

/**
 * Le service worker, exécuté tel qu'écrit (`public/sw.js`) dans un contexte
 * isolé, avec un cache et un réseau simulés (revue globale S22).
 */
type Ecouteur = (e: unknown) => void

function charger(reseau: (url: string) => Promise<Response>, { cachePlein = false } = {}) {
  const ecouteurs = new Map<string, Ecouteur>()
  const caches = new Map<string, Map<string, Response>>()
  const ouvrir = (nom: string) => {
    const contenu = caches.get(nom) ?? new Map<string, Response>()
    caches.set(nom, contenu)
    const cle = (r: Request | string) => (typeof r === 'string' ? r : r.url)
    return {
      match: (r: Request | string) => Promise.resolve(contenu.get(cle(r))?.clone()),
      // Comme la spécification : l'entrée remplacée passe en fin de liste.
      put: (r: Request | string, rep: Response) => {
        // Appareil plein (revue globale du 19/10, A3) : l'écriture échoue.
        if (cachePlein) return Promise.reject(new DOMException('plein', 'QuotaExceededError'))
        contenu.delete(cle(r))
        contenu.set(cle(r), rep)
        return Promise.resolve()
      },
      add: async (r: Request) => {
        contenu.set(r.url, await reseau(r.url))
      },
      delete: (r: Request | string) => Promise.resolve(contenu.delete(cle(r))),
      keys: () => Promise.resolve([...contenu.keys()].map((u) => new Request(u))),
    }
  }
  let attente = false
  const self = {
    location: { origin: 'https://exemple.fr', href: 'https://exemple.fr/' },
    addEventListener: (type: string, f: Ecouteur) => ecouteurs.set(type, f),
    skipWaiting: () => {
      attente = true
      return Promise.resolve()
    },
    clients: { claim: () => Promise.resolve() },
    __PRECACHE__: [] as string[],
  }
  runInNewContext(readFileSync('public/sw.js', 'utf8'), {
    self,
    caches: {
      open: (nom: string) => Promise.resolve(ouvrir(nom)),
      keys: () => Promise.resolve([...caches.keys()]),
    },
    fetch: (r: Request) => reseau(r.url),
    // Lu à chaque appel : les minuteurs simulés de vitest s'y appliquent.
    setTimeout: (f: () => void, ms: number) => setTimeout(f, ms),
    // Comme dans un service worker : une adresse relative se lit depuis le site.
    Request: class extends Request {
      constructor(url: string, options?: RequestInit) {
        super(new URL(url, self.location.href), options)
      }
    },
    Response,
    URL,
  })
  const nomApp = () => [...caches.keys()].find((n) => n.startsWith('mousse-app-')) ?? 'mousse-app-__EMPREINTE__'
  const app = () => {
    const nom = nomApp()
    const contenu = caches.get(nom) ?? new Map<string, Response>()
    caches.set(nom, contenu)
    return contenu
  }
  const demander = async (url: string, mode = 'cors') => {
    let reponse: Promise<Response> | undefined
    ecouteurs.get('fetch')?.({
      request: { url, method: 'GET', mode, clone: () => new Request(url) } as unknown as Request,
      respondWith: (p: Promise<Response>) => (reponse = p),
      waitUntil: () => undefined,
    })
    return reponse
  }
  const installer = async (fichiers: string[]) => {
    self.__PRECACHE__ = fichiers
    let fin: Promise<unknown> = Promise.resolve()
    ecouteurs.get('install')?.({ waitUntil: (p: Promise<unknown>) => (fin = p) })
    await fin
  }
  return {
    get contenu() {
      return app()
    },
    caches,
    demander,
    installer,
    ecouteurs,
    aAttendu: () => attente,
  }
}

describe('le service worker', () => {
  it('sert son cache quand le serveur répond 404 : un fichier d’une version remplacée', async () => {
    const sw = charger(() => Promise.resolve(new Response('absent', { status: 404 })))
    sw.contenu.set('https://exemple.fr/assets/Carte-ancien.js', new Response('// carte'))
    const r = await sw.demander('https://exemple.fr/assets/Carte-ancien.js')
    expect(r?.status).toBe(200)
    expect(await r?.text()).toBe('// carte')
  })

  it('rend le 404 du serveur quand le cache n’a rien', async () => {
    const sw = charger(() => Promise.resolve(new Response('absent', { status: 404 })))
    expect((await sw.demander('https://exemple.fr/inconnu.json'))?.status).toBe(404)
  })

  it('prend la version du serveur quand elle répond, et la garde', async () => {
    const sw = charger(() => Promise.resolve(new Response('neuf')))
    sw.contenu.set('https://exemple.fr/a.js', new Response('vieux'))
    expect(await (await sw.demander('https://exemple.fr/a.js'))?.text()).toBe('neuf')
  })

  // S303 (A3) : la page échouait alors que le réseau avait répondu 200.
  it('rend la réponse du réseau quand l’écriture en cache échoue (appareil plein)', async () => {
    const sw = charger(() => Promise.resolve(new Response('neuf')), { cachePlein: true })
    const r = await sw.demander('https://exemple.fr/a.js')
    expect(r?.status).toBe(200)
    expect(await r?.text()).toBe('neuf')
  })

  it('rend la tuile du réseau quand l’écriture en cache échoue (appareil plein)', async () => {
    const sw = charger(() => Promise.resolve(new Response('tuile')), { cachePlein: true })
    const r = await sw.demander('https://tile.openstreetmap.org/14/1/0.png')
    expect(await r?.text()).toBe('tuile')
  })

  it('s’active sur demande de la page (« Recharger » du bandeau), et seulement alors', () => {
    const sw = charger(() => Promise.resolve(new Response('')))
    expect(sw.aAttendu()).toBe(false)
    sw.ecouteurs.get('message')?.({ data: 'autre' })
    expect(sw.aAttendu()).toBe(false)
    sw.ecouteurs.get('message')?.({ data: 'activer' })
    expect(sw.aAttendu()).toBe(true)
  })

  describe('sur un réseau qui se tait (S295, Bernard)', () => {
    afterEach(() => {
      vi.useRealTimers()
    })

    it('sert le cache passé le délai, quand le réseau ne répond pas', async () => {
      vi.useFakeTimers()
      const sw = charger(() => new Promise<Response>(() => undefined))
      sw.contenu.set('https://exemple.fr/index.html', new Response('en cache'))
      const r = sw.demander('https://exemple.fr/index.html')
      await vi.advanceTimersByTimeAsync(4000)
      expect(await (await r)?.text()).toBe('en cache')
    })

    it('attend le réseau quand le cache n’a rien : il n’y a rien d’autre à rendre', async () => {
      vi.useFakeTimers()
      let repondre: (r: Response) => void = () => undefined
      const sw = charger(() => new Promise<Response>((ok) => (repondre = ok)))
      const r = sw.demander('https://exemple.fr/nouveau.json')
      await vi.advanceTimersByTimeAsync(10_000)
      repondre(new Response('enfin'))
      expect(await (await r)?.text()).toBe('enfin')
    })

    it('garde la réponse arrivée après le délai, pour la fois suivante', async () => {
      vi.useFakeTimers()
      let repondre: (r: Response) => void = () => undefined
      const sw = charger(() => new Promise<Response>((ok) => (repondre = ok)))
      sw.contenu.set('https://exemple.fr/a.js', new Response('vieux'))
      const r = sw.demander('https://exemple.fr/a.js')
      await vi.advanceTimersByTimeAsync(4000)
      expect(await (await r)?.text()).toBe('vieux')
      repondre(new Response('neuf'))
      await vi.advanceTimersByTimeAsync(0)
      expect(await sw.contenu.get('https://exemple.fr/a.js')?.text()).toBe('neuf')
    })
  })

  it('évince la tuile la moins récemment vue, pas la plus anciennement mise en cache', async () => {
    const sw = charger((url) => Promise.resolve(new Response(url)))
    const tuile = (i: number) => `https://tile.openstreetmap.org/14/${String(i)}/0.png`
    for (let i = 0; i < 600; i++) await sw.demander(tuile(i))
    // La première, revue : elle repasse en fin de file, sans jamais manquer.
    await sw.demander(tuile(0))
    expect(sw.caches.get('mousse-tuiles-v1')?.has(tuile(0))).toBe(true)
    await new Promise((fin) => setTimeout(fin, 0))
    await sw.demander(tuile(600))
    await new Promise((fin) => setTimeout(fin, 0))
    const restantes = [...(sw.caches.get('mousse-tuiles-v1')?.keys() ?? [])]
    expect(restantes).toHaveLength(600)
    expect(restantes).toContain(tuile(0))
    expect(restantes).not.toContain(tuile(1))
  })

  it('reprend d’une version précédente un fichier haché, sans le redemander au réseau (revue d’architecture S295)', async () => {
    const demandes: string[] = []
    const sw = charger((url) => {
      demandes.push(url)
      return Promise.resolve(new Response(`réseau ${url}`))
    })
    sw.caches.set(
      'mousse-app-ancienne',
      new Map([['https://exemple.fr/assets/Carte-DqKXCFIK.js', new Response('// carte gardée')]]),
    )
    await sw.installer(['./assets/Carte-DqKXCFIK.js', './assets/index-iA5VBH71.js', './index.html'])
    expect(demandes.toSorted()).toEqual(['https://exemple.fr/assets/index-iA5VBH71.js', 'https://exemple.fr/index.html'])
    expect(await sw.contenu.get('https://exemple.fr/assets/Carte-DqKXCFIK.js')?.text()).toBe('// carte gardée')
  })

  it('relit toujours au serveur un fichier sans empreinte, même présent dans une version précédente', async () => {
    const demandes: string[] = []
    const sw = charger((url) => {
      demandes.push(url)
      return Promise.resolve(new Response('neuf'))
    })
    sw.caches.set('mousse-app-ancienne', new Map([['https://exemple.fr/index.html', new Response('ancien')]]))
    await sw.installer(['./index.html'])
    expect(demandes).toEqual(['https://exemple.fr/index.html'])
  })
})
