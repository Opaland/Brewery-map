import { useState } from 'react'
import type { EtapeImage } from './core/image-tournee'
import { ImageTournee } from './ImageTournee'

interface Props {
  /** Les favoris encore présents dans les données. */
  nbFavoris: number
  /** Les favoris dont le nom n'est plus dans les données. */
  orphelins: readonly string[]
  onRetirerOrphelins: () => void
  seulement: boolean
  onSeulement: (v: boolean) => void
  /** Vrai quand ce navigateur ne laisse rien garder (navigation privée…). */
  stockageDisponible: boolean
  onEffacer: () => void
  /** Ma tournée (S27) : les étapes dans l'ordre, et le lien qui les ouvre. */
  tournee?: { etapes: readonly string[]; image: readonly EtapeImage[]; lien: string; total: number }
  /** Mon carnet (S35) : combien de visites, et le filtre « pas encore visitées ». */
  nbVisites: number
  pasVisitees: boolean
  onPasVisitees: (v: boolean) => void
}

/**
 * Les favoris et ce qui est gardé (S9). La phrase dit où vivent ces choix :
 * sur l'appareil, nulle part ailleurs — et comment les effacer.
 */
export function MesFavoris({
  nbFavoris,
  orphelins,
  onRetirerOrphelins,
  seulement,
  onSeulement,
  stockageDisponible,
  onEffacer,
  tournee,
  nbVisites,
  pasVisitees,
  onPasVisitees,
}: Props) {
  // Effacer se confirme : un toucher de travers ne doit pas coûter tous les
  // favoris (revue Marie S9).
  const [confirmer, setConfirmer] = useState(false)
  return (
    <fieldset className="depart" data-testid="mes-favoris">
      <legend>Mes favoris</legend>
      <label className="case">
        <input
          type="checkbox"
          checked={seulement}
          onChange={(e) => {
            onSeulement(e.target.checked)
          }}
          data-testid="favoris-seulement"
        />
        Afficher seulement mes favoris ({nbFavoris})
      </label>
      <label className="case">
        <input
          type="checkbox"
          checked={pasVisitees}
          onChange={(e) => {
            onPasVisitees(e.target.checked)
          }}
          data-testid="pas-visitees"
        />
        Seulement les brasseries pas encore visitées ({nbVisites} visitée{nbVisites > 1 ? 's' : ''})
      </label>
      {nbFavoris === 0 && (
        <p className="champ-aide">
          Touchez une brasserie de la liste, puis « Ajouter à mes favoris ».
        </p>
      )}
      {/* Ma tournée (S27 ; idée vue sur les circuits des distilleries
          écossaises et la route du cidre). */}
      {tournee !== undefined && tournee.etapes.length >= 2 && (
        <div className="tournee" data-testid="tournee">
          <p className="champ-aide">
            Ma tournée :{' '}
            {tournee.etapes.join(' → ')}
            {tournee.total > tournee.etapes.length
              ? ` (les ${String(tournee.etapes.length)} plus proches sur ${String(tournee.total)} : Google Maps n'en ouvre pas plus d'un coup sur téléphone)`
              : ''}
            .
          </p>
          <a className="bouton-lien" href={tournee.lien} target="_blank" rel="noopener noreferrer" data-testid="tournee-lien">
            Ouvrir la tournée dans Google Maps
          </a>
          {/* L'image de la tournée (S34), composée dans ce téléphone. */}
          <div className="depart-actions">
            <ImageTournee etapes={tournee.image} />
          </div>
          <p className="fiche-aide">
            L’ordre se calcule dans ce téléphone, de proche en proche depuis votre départ. Le
            lien ne contient que les brasseries ; Google Maps part de votre position s’il
            y a accès. Vérifiez avant de partir que chacune vous accueille. L’image ne
            nomme que les étapes, dans l’ordre : elle ne dit pas d’où vous partez, mais la
            première étape est la plus proche de vous.
          </p>
        </div>
      )}
      {orphelins.length > 0 && (
        <div className="champ-aide" data-testid="favoris-orphelins">
          <p>
            {orphelins.length === 1
              ? 'Un favori n’est plus dans la liste des brasseries'
              : `${String(orphelins.length)} favoris ne sont plus dans la liste des brasseries`}{' '}
            (renommée ou retirée) : {orphelins.join(', ')}.
          </p>
          <div className="depart-actions">
            <button type="button" onClick={onRetirerOrphelins} data-testid="retirer-orphelins">
              Les retirer de mes favoris
            </button>
          </div>
        </div>
      )}
      {/* Replié derrière une phrase : déplié, ce bloc faisait 294 px avant la
          liste sur téléphone (S24). Sans stockage, l'avertissement reste
          visible : il change ce que la personne doit savoir. */}
      {stockageDisponible ? (
        <details
          className="confidentialite"
          data-testid="stockage-details"
          // Refermé, il ne garde pas « Oui, tout effacer » prêt à un toucher
          // (revue adverse S24).
          onToggle={(e) => {
            if (!e.currentTarget.open) setConfirmer(false)
          }}
        >
          <summary>Gardés sur cet appareil seulement</summary>
          <p className="champ-aide" data-testid="stockage-texte">
            Vos favoris, votre carnet de visites (le nom et le jour, rien d’autre) et vos
            réglages (distance, départ, filtres) sont gardés sur cet appareil seulement. Ils ne sont envoyés à personne. Pour « Autour de moi », seul ce choix est
            gardé, jamais la position : elle se redemande au retour, sans fenêtre si le navigateur
            l’a déjà permise.
          </p>
          <div className="depart-actions">
            {confirmer ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmer(false)
                    onEffacer()
                  }}
                  data-testid="confirmer-effacer"
                >
                  Oui, tout effacer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmer(false)
                  }}
                >
                  Annuler
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setConfirmer(true)
                }}
                data-testid="tout-effacer"
              >
                Effacer favoris, carnet et réglages
              </button>
            )}
          </div>
        </details>
      ) : (
        <p className="champ-aide" data-testid="stockage-texte">
          Ce navigateur ne permet pas de garder vos favoris, votre carnet et vos réglages
          (navigation privée, ou stockage bloqué) : ils seront oubliés en fermant la page.
        </p>
      )}
    </fieldset>
  )
}
