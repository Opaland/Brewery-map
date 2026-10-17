import { BRIGNAIS, type Point } from './distance'
import { t } from '../i18n'
import type { Brasserie } from './schema'

/**
 * D'où l'on compte les distances (S8). Demande de Cédric du 15/10 :
 * « pouvoir faire plus loin que Brignais ».
 *
 * - `brignais` : le point par défaut du cahier des charges ;
 * - `position` : la position du navigateur, demandée sur action, jamais
 *   envoyée nulle part ;
 * - `commune` : depuis S21, toute commune de France
 *   (`public/communes-france.json`, son point Wikidata) ; avant, une commune
 *   des données, à la moyenne de ses brasseries. La clé est « nom|département ».
 */
export type Origine =
  | { type: 'brignais'; point: Point }
  /** `pres` : la commune la plus proche, calculée dans le téléphone (S21). */
  | { type: 'position'; point: Point; pres?: string }
  | { type: 'commune'; cle: string; nom: string; point: Point }

export const ORIGINE_DEFAUT: Origine = { type: 'brignais', point: BRIGNAIS }

export interface CommuneConnue {
  /** Commune et département : deux communes homonymes ne se confondent pas. */
  cle: string
  nom: string
  point: Point
}

/** Les communes du fichier, une fois chacune, dans l'ordre alphabétique français. */
export function communesConnues(brasseries: readonly Brasserie[]): CommuneConnue[] {
  const groupes = new Map<string, { nom: string; points: Point[] }>()
  for (const b of brasseries) {
    const cle = `${b.c}|${b.d}`
    const groupe = groupes.get(cle) ?? { nom: b.c, points: [] }
    groupe.points.push({ lat: b.lat, lon: b.lon })
    groupes.set(cle, groupe)
  }
  return [...groupes.entries()]
    .map(([cle, { nom, points }]) => ({
      cle,
      nom,
      point: {
        lat: points.reduce((s, p) => s + p.lat, 0) / points.length,
        lon: points.reduce((s, p) => s + p.lon, 0) / points.length,
      },
    }))
    .sort((a, b) => a.nom.localeCompare(b.nom, 'fr') || a.cle.localeCompare(b.cle))
}

export function origineDeCommune(c: CommuneConnue): Origine {
  return { type: 'commune', cle: c.cle, nom: c.nom, point: c.point }
}

export function libelleOrigine(o: Origine): string {
  switch (o.type) {
    case 'brignais':
      return 'Brignais'
    case 'position':
      return o.pres === undefined ? t('votre position') : t('votre position (près de {pres})', { pres: o.pres })
    case 'commune':
      // Le département départage les homonymes : « Château (71) » (S21).
      return `${o.nom} (${o.cle.split('|')[1] ?? ''})`
  }
}
