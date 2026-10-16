import { useState } from 'react'

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
      {nbFavoris === 0 && (
        <p className="champ-aide">
          Touchez une brasserie de la liste, puis « Ajouter à mes favoris ».
        </p>
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
      <p className="champ-aide" data-testid="stockage-texte">
        {stockageDisponible
          ? 'Vos favoris et vos réglages (distance, départ, filtres) sont gardés sur cet appareil seulement. Ils ne sont envoyés à personne. Pour « Autour de moi », seul ce choix est gardé, jamais la position : elle se redemande au retour, sans fenêtre si le navigateur l’a déjà permise.'
          : 'Ce navigateur ne permet pas de garder vos favoris et réglages (navigation privée, ou stockage bloqué) : ils seront oubliés en fermant la page.'}
      </p>
      {stockageDisponible && (
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
              Effacer favoris et réglages
            </button>
          )}
        </div>
      )}
    </fieldset>
  )
}
