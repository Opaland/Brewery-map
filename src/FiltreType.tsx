import { TYPES_BIERE, type TypeDeBiere } from './core/bieres'

interface Props {
  /** Nombre de brasseries par type, sur tout le fichier. */
  nbParType: ReadonlyMap<TypeDeBiere, number>
  valeur: TypeDeBiere | undefined
  onChange: (type: TypeDeBiere | undefined) => void
}

/**
 * Le filtre par type de bière (S5). Ne propose que les types qu'au moins une
 * brasserie déclare. Tant qu'aucune n'en déclare, il le dit au lieu d'offrir
 * des choix qui videraient la liste.
 *
 * Le nombre affiché est un total sur tout le fichier, et le libellé le dit :
 * avec un rayon ou une catégorie, la liste peut en montrer moins (revue code
 * S5).
 */
export function FiltreType({ nbParType, valeur, onChange }: Props) {
  const presents = TYPES_BIERE.filter((t) => (nbParType.get(t.type) ?? 0) > 0)
  if (presents.length === 0) {
    return (
      <p className="champ-aide" data-testid="type-absent">
        Filtre par type de bière : aucune brasserie n’a encore ses types référencés. Il
        se remplira avec la vérification des fiches.
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
              {t.libelle} — {t.explication} ({n} brasserie{n > 1 ? 's' : ''} au total)
            </option>
          )
        })}
      </select>
    </label>
  )
}
