import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { lirePreferences, type Note, type Visite } from './core/preferences'

/*
  Les crochets sortis d'`App.tsx` (S237, revue d'architecture) : ce qui ne
  dépend pas du reste de l'écran, testé à l'étage « composants ».
*/

/** En ligne, et prête hors ligne (un service worker actif : précache complet, public/sw.js). */
export function useConnexion(): { enLigne: boolean; pretHorsLigne: boolean } {
  const [enLigne, setEnLigne] = useState(() => navigator.onLine)
  const [pretHorsLigne, setPretHorsLigne] = useState(false)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    let vivant = true
    void navigator.serviceWorker.ready.then(() => {
      if (vivant) setPretHorsLigne(true)
    })
    return () => {
      vivant = false
    }
  }, [])

  useEffect(() => {
    const maj = () => {
      setEnLigne(navigator.onLine)
    }
    window.addEventListener('online', maj)
    window.addEventListener('offline', maj)
    // L'état initial est lu au rendu, l'écoute s'attache après : un passage
    // hors ligne entre les deux était perdu, et le bandeau ne venait jamais
    // (échec intermittent de hors-ligne.spec.ts en S17 et S18). On relit
    // donc l'état une fois l'écoute en place.
    maj()
    return () => {
      window.removeEventListener('online', maj)
      window.removeEventListener('offline', maj)
    }
  }, [])

  return { enLigne, pretHorsLigne }
}

/** La carte à l'écran : le bouton de la barre ramène alors à la liste. */
export function useCarteEnVue(): { titreCarte: RefObject<HTMLHeadingElement>; carteEnVue: boolean } {
  const titreCarte = useRef<HTMLHeadingElement>(null)
  const [carteEnVue, setCarteEnVue] = useState(false)
  useEffect(() => {
    const zone = titreCarte.current?.parentElement ?? null
    if (zone === null || typeof IntersectionObserver === 'undefined') return
    // « À l'écran » : dans la moitié haute. Seuil de présentation, au jugé
    // (§2) : plus bas, le bouton changeait alors que la liste remplissait
    // encore l'écran.
    const obs = new IntersectionObserver(
      (entrees) => {
        setCarteEnVue(entrees.some((e) => e.isIntersecting))
      },
      { rootMargin: '0px 0px -50% 0px' },
    )
    obs.observe(zone)
    return () => {
      obs.disconnect()
    }
  }, [])
  return { titreCarte, carteEnVue }
}

/**
 * Le compte collé au bas de l'écran couvrait le focus clavier (WCAG 2.4.11,
 * revue adverse UI/UX : une case sur Pixel 7, cinq contrôles à 320 px). Sa
 * hauteur, qui varie avec le retour à la ligne, devient la marge de
 * défilement du bas : le navigateur amène le focus au-dessus.
 */
export function useHauteurBarre(): RefObject<HTMLDivElement> {
  const barre = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const p = barre.current
    if (p === null || typeof ResizeObserver === 'undefined') return
    const racine = document.documentElement
    const suivre = new ResizeObserver(() => {
      racine.style.setProperty('--hauteur-compte', `${String(p.offsetHeight)}px`)
    })
    suivre.observe(p)
    return () => {
      suivre.disconnect()
    }
  }, [])
  return barre
}

const lireVisitesRecues = (brut: unknown) => lirePreferences({ visites: brut }).visites
const lireNotesRecues = (brut: unknown) => lirePreferences({ notes: brut }).notes

export interface Carnet {
  favoris: readonly string[]
  visites: readonly Visite[]
  notes: readonly Note[]
}

/**
 * Deux onglets ouverts s'écrasaient : chacun réécrivait l'objet entier depuis
 * sa mémoire, et un favori ajouté dans l'un disparaissait (revue code S9,
 * fait en S24). Les favoris, les visites et les notes passent d'un onglet à
 * l'autre (revue adverse S35) ; l'effacement aussi (revue adverse S24). Un
 * message reçu n'est pas renvoyé : on retient ce qui a été partagé.
 */
export function useCarnetEntreOnglets(
  carnet: Carnet,
  recevoir: {
    favoris: (f: string[]) => void
    visites: (v: Visite[]) => void
    notes: (n: Note[]) => void
    effacement: () => void
  },
): { annoncerEffacement: () => void; tenirPourPartage: (c: Carnet) => void } {
  const { favoris, visites, notes } = carnet
  const canal = useRef<BroadcastChannel | null>(null)
  const favorisPartages = useRef(JSON.stringify(favoris))
  const visitesPartagees = useRef(JSON.stringify(visites))
  const notesPartagees = useRef(JSON.stringify(notes))
  // Le canal s'ouvre une fois ; il appelle les réceptions par une référence.
  const recevoirRef = useRef(recevoir)
  useEffect(() => {
    recevoirRef.current = recevoir
  })

  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return
    const c = new BroadcastChannel('mousse-de-poche-favoris')
    c.onmessage = (e: MessageEvent<unknown>) => {
      const m = e.data as { type?: unknown; favoris?: unknown } | null
      if (m?.type === 'effacer') {
        recevoirRef.current.effacement()
        return
      }
      if (m?.type === 'notes') {
        const recues = lireNotesRecues((m as { notes?: unknown }).notes)
        notesPartagees.current = JSON.stringify(recues)
        recevoirRef.current.notes(recues)
        return
      }
      if (m?.type === 'visites') {
        const recues = lireVisitesRecues((m as { visites?: unknown }).visites)
        visitesPartagees.current = JSON.stringify(recues)
        recevoirRef.current.visites(recues)
        return
      }
      if (m?.type !== 'favoris' || !Array.isArray(m.favoris)) return
      const recus = m.favoris.filter((x): x is string => typeof x === 'string')
      favorisPartages.current = JSON.stringify(recus)
      recevoirRef.current.favoris(recus)
    }
    canal.current = c
    return () => {
      c.close()
      canal.current = null
    }
  }, [])
  useEffect(() => {
    const texte = JSON.stringify(favoris)
    if (texte === favorisPartages.current) return
    favorisPartages.current = texte
    canal.current?.postMessage({ type: 'favoris', favoris: [...favoris] })
  }, [favoris])
  useEffect(() => {
    const texte = JSON.stringify(visites)
    if (texte === visitesPartagees.current) return
    visitesPartagees.current = texte
    canal.current?.postMessage({ type: 'visites', visites: [...visites] })
  }, [visites])
  useEffect(() => {
    const texte = JSON.stringify(notes)
    if (texte === notesPartagees.current) return
    notesPartagees.current = texte
    canal.current?.postMessage({ type: 'notes', notes: [...notes] })
  }, [notes])

  const annoncerEffacement = useCallback(() => {
    canal.current?.postMessage({ type: 'effacer' })
  }, [])
  // Après un effacement : ce qui suit n'est pas une nouveauté à envoyer.
  const tenirPourPartage = useCallback((c: Carnet) => {
    favorisPartages.current = JSON.stringify(c.favoris)
    visitesPartagees.current = JSON.stringify(c.visites)
    notesPartagees.current = JSON.stringify(c.notes)
  }, [])
  return { annoncerEffacement, tenirPourPartage }
}

/**
 * L'heure, remise à jour chaque minute : une fiche restée ouverte pendant
 * la pause disait encore « ouvert » passé la fermeture (S295, Hugo).
 */
export function useMinute(): Date {
  const [instant, setInstant] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => {
      setInstant(new Date())
    }, 60_000)
    return () => {
      window.clearInterval(id)
    }
  }, [])
  return instant
}
