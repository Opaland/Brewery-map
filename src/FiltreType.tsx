import { TYPES_BIERE, type TypeDeBiere } from './core/bieres'

interface Props {
  /** Nombre de brasseries par type, sur tout le fichier. */
  nbParType: ReadonlyMap<TypeDeBiere, number>
  /** Fiches dont les bières sont renseignées, et fiches en tout. */
  nbRenseignees: number
  nbFiches: number
  valeur: TypeDeBiere | undefined
  onChange: (type: TypeDeBiere | undefined) => void
}

/**
 * Le filtre par type de bière (S5). Ne propose que les types qu'au moins une
 * brasserie déclare. Tant qu'aucune n'en déclare, il le dit au lieu d'offrir
 * des choix qui videraient la liste.
 *
 * Le nombre affiché compte les fiches renseignées, et le libellé le dit :
 * « 3 brasseries au total » laissait croire que seules trois brasseries
 * brassent une IPA, quand les autres fiches n'ont simplement rien de
 * renseigné (revue métier S16). La part renseignée est dite sous le menu.
 */
export function FiltreType({ nbParType, nbRenseignees, nbFiches, valeur, onChange }: Props) {
  const presents = TYPES_BIERE.filter((t) => (nbParType.get(t.type) ?? 0) > 0)
  if (presents.length === 0) {
    return (
      <p className="champ-aide" data-testid="type-absent">
        Types de bière : aucun encore référencé, le filtre viendra avec la vérification des fiches.
      </p>
    )
  }
  return (
    <label className="champ">
      <span>Type de bière</span>
      <select
        value={valeur ?? ''}
        onChange={(e) => {
          const choisi = presents.find((t) => t.type === e.target.value)
          onChange(choisi?.type)
        }}
        data-testid="type"
      >
        <option value="">Tous les types</option>
        {presents.map((t) => {
          const n = nbParType.get(t.type) ?? 0
          return (
            <option key={t.type} value={t.type}>
              {t.libelle} — {t.explication} ({n} fiche{n > 1 ? 's' : ''} renseignée
              {n > 1 ? 's' : ''})
            </option>
          )
        })}
      </select>
      <span className="champ-aide" data-testid="type-part">
        Bières renseignées sur {nbRenseignees} fiche
        {nbRenseignees > 1 ? 's' : ''} sur {nbFiches} : les autres brasseries n’apparaissent pas
        avec ce filtre.
      </span>
    </label>
  )
}
