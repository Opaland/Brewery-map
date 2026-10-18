import type { Preferences } from './preferences'

/**
 * S275 (repris de Sentiers) : sans demande, le stockage d'un site est « au
 * mieux » — le navigateur peut l'effacer quand l'appareil manque de place
 * (spécification Storage du WHATWG). Favoris, carnet et notes ne vivent que
 * là : dès le premier, on demande au navigateur de les garder.
 *
 * `persist()` ne parle qu'au navigateur : aucune requête réseau. Chrome
 * accorde ou refuse en silence ; Firefox demande à la personne : la demande
 * part donc d'un geste qui ajoute au carnet (favori, visite, note, sauvegarde
 * reprise), jamais de l'ouverture ni d'une écriture quelconque (revue
 * adverse S275 : tirée de l'état gardé, elle partait au changement de rayon
 * dès qu'un favori existait, et dans un onglet qui ne faisait que recevoir
 * le carnet d'un autre).
 */

/** Un favori, une visite ou une note : ce que la personne perdrait. */
export function aDesDonneesPersonnelles(p: Pick<Preferences, 'favoris' | 'visites' | 'notes'>): boolean {
  return p.favoris.length > 0 || p.visites.length > 0 || p.notes.length > 0
}

type Gestionnaire = Pick<StorageManager, 'persist' | 'persisted'>

/**
 * À appeler par un geste qui ajoute au carnet : demande au plus une fois par
 * ouverture, et seulement si le stockage n'est pas déjà persistant. Une API
 * absente ou qui rejette ne casse rien : on reste « au mieux », comme avant.
 */
export function demandeDePersistance(storage: Gestionnaire | undefined): () => Promise<void> {
  let dejaDemande = false
  return async () => {
    if (dejaDemande || storage === undefined) return
    dejaDemande = true
    try {
      if (!(await storage.persisted())) await storage.persist()
    } catch {
      // Refus ou API partielle : rien à faire de plus.
    }
  }
}
