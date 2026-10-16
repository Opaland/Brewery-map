import { brasseriesDepuisFichierOsm, type FichierOsm } from './core/osm-france'
import type { Brasserie } from './core/schema'

/**
 * La couche « toute la France » (S25) : les brasseries repérées sur
 * OpenStreetMap, à part du fichier de Cédric. Chargée après l'écran, dans
 * son propre morceau (≈ 50 Ko compressés) : la liste du fichier n'attend
 * pas. Le même fichier pour tout le monde, gardé par le service worker comme
 * le reste de l'application : rien ne dit au serveur où l'on est.
 *
 * La conversion de type est sûre : le build refuse un fichier invalide
 * (`validerDonneesOsm`, CLAUDE.md §6quater).
 */
let chargement: Promise<{ brasseries: Brasserie[]; extrait: string }> | undefined

export function brasseriesOsm(): Promise<{ brasseries: Brasserie[]; extrait: string }> {
  chargement ??= import('./donnees-osm/brasseries-osm.json').then((m) => {
    const f = m.default as unknown as FichierOsm
    return { brasseries: brasseriesDepuisFichierOsm(f), extrait: f.extrait }
  })
  // Un échec (connexion) ne reste pas en mémoire : un nouvel essai refait la demande.
  chargement.catch(() => (chargement = undefined))
  return chargement
}
