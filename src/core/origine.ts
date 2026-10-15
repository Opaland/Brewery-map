import { BRIGNAIS, type Point } from './distance'
import type { Brasserie } from './schema'

/**
 * D'où l'on compte les distances (S8). Demande de Cédric du 15/10 :
 * « pouvoir faire plus loin que Brignais ».
 *
 * - `brignais` : le point par défaut du cahier des charges ;
 * - `position` : la position du navigateur, demandée sur action, jamais
 *   envoyée nulle part ;
 * - `commune` : une commune **des données**, sans recherche en ligne — sa
 *   position est la moyenne de celles de ses brasseries (elles-mêmes au
 *   centre de la commune, BACKLOG D3).
 */
export type Origine =
  | { type: 'brignais'; point: Point }
  | { type: 'position'; point: Point }
  | { type: 'commune'; nom: string; point: Point }

export const ORIGINE_DEFAUT: Origine = { type: 'brignais', point: BRIGNAIS }

export interface CommuneConnue {
  nom: string
  point: Point
}

/** Les communes du fichier, une fois chacune, dans l'ordre alphabétique français. */
export function communesConnues(brasseries: readonly Brasserie[]): CommuneConnue[] {
  const groupes = new Map<string, Point[]>()
  for (const b of brasseries) {
    const liste = groupes.get(b.c) ?? []
    liste.push({ lat: b.lat, lon: b.lon })
    groupes.set(b.c, liste)
  }
  return [...groupes.entries()]
    .map(([nom, points]) => ({
      nom,
      point: {
        lat: points.reduce((s, p) => s + p.lat, 0) / points.length,
        lon: points.reduce((s, p) => s + p.lon, 0) / points.length,
      },
    }))
    .sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
}

export function origineDeCommune(c: CommuneConnue): Origine {
  return { type: 'commune', nom: c.nom, point: c.point }
}

export function libelleOrigine(o: Origine): string {
  switch (o.type) {
    case 'brignais':
      return 'Brignais'
    case 'position':
      return 'votre position'
    case 'commune':
      return `${o.nom} (centre approché)`
  }
}
