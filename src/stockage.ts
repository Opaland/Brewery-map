import { demandeDePersistance } from './core/persistance'
import { gardeParUneVersionFuture, lirePreferences, PREFERENCES_DEFAUT, type Preferences } from './core/preferences'

/**
 * Les préférences dans IndexedDB (S9), sur cet appareil seulement. Une base,
 * un magasin, une clé : il n'y a qu'un objet à garder.
 *
 * IndexedDB peut manquer ou refuser (navigation privée de certains
 * navigateurs, stockage bloqué) : l'application marche alors comme avant,
 * et l'écran dit que rien ne sera gardé.
 */
const BASE = 'mousse-de-poche'
const MAGASIN = 'reglages'
const CLE = 'preferences'

/**
 * Au-delà, on part sans stockage plutôt que de laisser une page blanche :
 * `indexedDB.open` peut ne jamais répondre (revue code S9, cas connu de
 * vieux Safari). 2 s : seuil de présentation tranché au jugement (§2) — il
 * ne change aucun calcul, seulement si les réglages gardés sont relus. Une
 * ouverture normale prend quelques millisecondes ; écartés : 500 ms (risque
 * de perdre les réglages sur un vieux téléphone chargé) et 5 s (une page
 * blanche aussi longue fait croire à une panne).
 */
const DELAI_OUVERTURE_MS = 2000

export interface Stockage {
  disponible: boolean
  /** Ce qui est gardé vient d'une version plus récente (S238) : lu, jamais réécrit. */
  versionFuture: boolean
  initiales: Preferences
  garder: (p: Preferences) => void
  /** Après un geste qui ajoute au carnet : demander au navigateur de le garder (S275). */
  proteger: () => void
  effacer: () => Promise<void>
}

function ouvrir(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(BASE, 1)
    req.onupgradeneeded = () => {
      req.result.createObjectStore(MAGASIN)
    }
    req.onsuccess = () => {
      const db = req.result
      // Une version plus récente ouverte dans un autre onglet : on cède.
      db.onversionchange = () => {
        db.close()
      }
      resolve(db)
    }
    req.onerror = () => {
      reject(req.error ?? new Error('IndexedDB indisponible'))
    }
    // Une autre version ouverte ailleurs : ne pas attendre indéfiniment.
    req.onblocked = () => {
      reject(new Error('IndexedDB bloquée'))
    }
  })
}

function requete<T>(db: IDBDatabase, mode: IDBTransactionMode, faire: (m: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const req = faire(db.transaction(MAGASIN, mode).objectStore(MAGASIN))
    req.onsuccess = () => {
      resolve(req.result)
    }
    req.onerror = () => {
      reject(req.error ?? new Error('IndexedDB : échec'))
    }
  })
}

/**
 * La garde relue au moment d'écrire, dans la même transaction (CLAUDE.md
 * §6quater) : un onglet resté ouvert sur cette version ne réécrit pas ce
 * qu'une version plus récente a gardé entre-temps dans une autre fenêtre
 * (revue adverse S238 : vérifiée à l'ouverture seulement, elle laissait ce
 * cas ouvert).
 */
function garderSaufVersionFuture(db: IDBDatabase, p: Preferences): void {
  try {
    const magasin = db.transaction(MAGASIN, 'readwrite').objectStore(MAGASIN)
    const lecture = magasin.get(CLE)
    lecture.onsuccess = () => {
      if (!gardeParUneVersionFuture(lecture.result)) magasin.put(p, CLE)
    }
  } catch {
    // Base fermée (une version plus récente l'a demandé) : rien n'est écrit.
  }
}

const SANS_STOCKAGE: Stockage = {
  disponible: false,
  versionFuture: false,
  initiales: PREFERENCES_DEFAUT,
  garder: () => undefined,
  proteger: () => undefined,
  effacer: () => Promise.resolve(),
}

export async function ouvrirStockage(): Promise<Stockage> {
  let db: IDBDatabase
  let brut: unknown
  try {
    const lecture = (async () => {
      const d = await ouvrir()
      const b: unknown = await requete<unknown>(d, 'readonly', (m) => m.get(CLE))
      return { d, b }
    })()
    const delai = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error('IndexedDB ne répond pas'))
      }, DELAI_OUVERTURE_MS)
    })
    ;({ d: db, b: brut } = await Promise.race([lecture, delai]))
  } catch {
    return SANS_STOCKAGE
  }
  // Gardé par une version plus récente (S238) : lu, jamais réécrit. L'écran
  // le dit pour ce qu'il est (revue adverse S238), pas comme un stockage bloqué.
  if (gardeParUneVersionFuture(brut)) return { ...SANS_STOCKAGE, versionFuture: true, initiales: lirePreferences(brut) }
  // Absente hors HTTPS (S275).
  const demanderPersistance = demandeDePersistance('storage' in navigator ? navigator.storage : undefined)
  return {
    disponible: true,
    versionFuture: false,
    initiales: lirePreferences(brut),
    // Une écriture ratée (quota) ne casse pas l'écran : la session continue
    // avec ses réglages en mémoire.
    garder: (p) => {
      garderSaufVersionFuture(db, p)
    },
    proteger: () => {
      void demanderPersistance()
    },
    effacer: () => requete(db, 'readwrite', (m) => m.delete(CLE)).then(() => undefined),
  }
}
