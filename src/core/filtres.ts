import type { TypeDeBiere } from './bieres'
import { ORDRE_CATEGORIES } from './categories'
import type { Categorie } from './schema'

/**
 * Les filtres repliés sous « Plus de filtres » sur téléphone (S29) : la
 * première brasserie y était à 2,1 écrans, sous le département, les
 * catégories, le type et les favoris. Repliés, ils doivent dire ce qu'ils
 * cachent : un filtre actif qu'on ne voit plus filtre en silence.
 */
export interface EtatFiltres {
  departement?: string
  categories: readonly Categorie[]
  type?: TypeDeBiere
  favorisSeulement: boolean
  /** La couche OpenStreetMap décochée alors qu'elle est là. */
  sansOsm: boolean
}

export function filtresActifs(f: EtatFiltres): string[] {
  const actifs: string[] = []
  if (f.departement !== undefined) actifs.push('département')
  if (!ORDRE_CATEGORIES.every((c) => f.categories.includes(c))) actifs.push('ce qu’on peut y faire')
  if (f.type !== undefined) actifs.push('type de bière')
  if (f.favorisSeulement) actifs.push('seulement mes favoris')
  if (f.sansOsm) actifs.push('sans OpenStreetMap')
  return actifs
}

export function resumeDesFiltres(f: EtatFiltres, nbFavoris: number): string {
  const n = filtresActifs(f).length
  const morceaux = ['Plus de filtres et mes favoris']
  if (n > 0) morceaux.push(n === 1 ? '1 filtre actif' : `${String(n)} filtres actifs`)
  if (nbFavoris > 0) morceaux.push(nbFavoris === 1 ? '1 favori' : `${String(nbFavoris)} favoris`)
  return morceaux.join(' · ')
}
