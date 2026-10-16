import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { describe, expect, it } from 'vitest'

/**
 * Le service worker, exécuté tel qu'écrit (`public/sw.js`) dans un contexte
 * isolé, avec un cache et un réseau simulés (revue globale S22).
 */
type Ecouteur = (e: unknown) => void

function charger(reseau: (url: string) => Promise<Response>) {
  const ecouteurs = new Map<string, Ecouteur>()
  const contenu = new Map<string, Response>()
  let attente = false
  const cache = {
    match: (r: Request | string) =>
      Promise.resolve(contenu.get(typeof r === 'string' ? r : r.url)?.clone()),
    put: (r: Request, rep: Response) => {
      contenu.set(r.url, rep)
      return Promise.resolve()
    },
  }
  const self = {
    location: { origin: 'https://exemple.fr' },
    addEventListener: (type: string, f: Ecouteur) => ecouteurs.set(type, f),
    skipWaiting: () => {
      attente = true
      return Promise.resolve()
    },
    clients: { claim: () => Promise.resolve() },
  }
  runInNewContext(readFileSync('public/sw.js', 'utf8'), {
    self,
    caches: { open: () => Promise.resolve(cache), keys: () => Promise.resolve([]) },
    fetch: (r: Request) => reseau(r.url),
    Request,
    Response,
    URL,
  })
  const demander = async (url: string, mode = 'cors') => {
    let reponse: Promise<Response> | undefined
    ecouteurs.get('fetch')?.({
      request: { url, method: 'GET', mode, clone: () => new Request(url) } as unknown as Request,
      respondWith: (p: Promise<Response>) => (reponse = p),
    })
    return reponse
  }
  return { contenu, demander, ecouteurs, aAttendu: () => attente }
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

  it('s’active sur demande de la page (« Recharger » du bandeau), et seulement alors', () => {
    const sw = charger(() => Promise.resolve(new Response('')))
    expect(sw.aAttendu()).toBe(false)
    sw.ecouteurs.get('message')?.({ data: 'autre' })
    expect(sw.aAttendu()).toBe(false)
    sw.ecouteurs.get('message')?.({ data: 'activer' })
    expect(sw.aAttendu()).toBe(true)
  })
})
