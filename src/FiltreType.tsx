import { TYPES_BIERE, type TypeDeBiere } from './core/bieres'
import { t } from './i18n'

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
  const presents = TYPES_BIERE.filter((ty) => (nbParType.get(ty.type) ?? 0) > 0)
  if (presents.length === 0) {
    return (
      <p className="champ-aide" data-testid="type-absent">
        {t('Types de bière : aucun encore référencé, le filtre viendra avec la vérification des fiches.')}
      </p>
    )
  }
  return (
    <label className="champ">
      <span>{t('Type de bière')}</span>
      <select
        value={valeur ?? ''}
        onChange={(e) => {
          const choisi = presents.find((ty) => ty.type === e.target.value)
          onChange(choisi?.type)
        }}
        data-testid="type"
      >
        <option value="">{t('Tous les types')}</option>
        {presents.map((ty) => {
          const n = nbParType.get(ty.type) ?? 0
          const part = n > 1 ? t('{n} fiches renseignées', { n }) : t('{n} fiche renseignée', { n })
          return (
            <option key={ty.type} value={ty.type}>
              {t(ty.libelle)} — {t(ty.explication)} ({part})
            </option>
          )
        })}
      </select>
      <span className="champ-aide" data-testid="type-part">
        {nbRenseignees > 1
          ? t(
              'Bières renseignées sur {n} fiches sur {total} vérifiées : les autres, et celles d’OpenStreetMap, n’apparaissent pas avec ce filtre.',
              { n: nbRenseignees, total: nbFiches },
            )
          : t(
              'Bières renseignées sur {n} fiche sur {total} vérifiées : les autres, et celles d’OpenStreetMap, n’apparaissent pas avec ce filtre.',
              { n: nbRenseignees, total: nbFiches },
            )}
      </span>
    </label>
  )
}
