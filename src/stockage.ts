import { lirePreferences, PREFERENCES_DEFAUT, type Preferences } from './core/preferences'

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
  initiales: Preferences
  garder: (p: Preferences) => void
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

const SANS_STOCKAGE: Stockage = {
  disponible: false,
  initiales: PREFERENCES_DEFAUT,
  garder: () => undefined,
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
  return {
    disponible: true,
    initiales: lirePreferences(brut),
    // Une écriture ratée (quota) ne casse pas l'écran : la session continue
    // avec ses réglages en mémoire.
    garder: (p) => {
      requete(db, 'readwrite', (m) => m.put(p, CLE)).catch(() => undefined)
    },
    effacer: () => requete(db, 'readwrite', (m) => m.delete(CLE)).then(() => undefined),
  }
}
