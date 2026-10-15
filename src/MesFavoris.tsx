interface Props {
  nbFavoris: number
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
export function MesFavoris({ nbFavoris, seulement, onSeulement, stockageDisponible, onEffacer }: Props) {
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
      <p className="champ-aide" data-testid="stockage-texte">
        {stockageDisponible
          ? 'Vos favoris et vos réglages (distance, départ, filtres) sont gardés sur cet appareil seulement. Ils ne sont envoyés à personne. « Autour de moi » n’est jamais gardé : il se redemande à chaque visite.'
          : 'Ce navigateur ne permet pas de garder vos favoris et réglages (navigation privée, ou stockage bloqué) : ils seront oubliés en fermant la page.'}
      </p>
      {stockageDisponible && (
        <div className="depart-actions">
          <button type="button" onClick={onEffacer} data-testid="tout-effacer">
            Effacer favoris et réglages
          </button>
        </div>
      )}
    </fieldset>
  )
}
