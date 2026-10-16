import { hoteDeSource, libelleVerification } from './core/fiche'
import { formaterCreneaux, formaterHeure, JOURS, ouvertMaintenant, type Bloc } from './core/horaires'
import type { Brasserie } from './core/schema'

const TITRE: Record<Bloc['nature'], string> = {
  accueil: 'Horaires d’accueil du public',
  vente: 'Horaires de vente',
}

const NATURE: Record<Bloc['nature'], string> = {
  accueil: 'accueil du public',
  vente: 'vente',
}

/**
 * L'état à l'instant de l'ouverture de la fiche (S19, Hugo) : d'après les
 * créneaux publiés, jamais affirmé quand la source ne dit rien du jour.
 */
function Maintenant({ bloc, maintenant }: { bloc: Bloc; maintenant: Date }) {
  const m = ouvertMaintenant([bloc], maintenant, bloc.nature)
  const debut = `Maintenant (${NATURE[bloc.nature]}) : `
  const jusqua = m.jusqua === undefined ? '' : ` jusqu’à ${formaterHeure(m.jusqua)}`
  const texte = {
    ouvert: `ouvert${jusqua}, d’après les horaires publiés.`,
    'sous-reserve': `ouvert${jusqua} selon les créneaux, sous réserve de la remarque ci-dessous.`,
    ferme: 'fermé, d’après les horaires publiés.',
    inconnu: 'la source ne dit pas les heures de ce jour.',
  }[m.etat]
  return (
    <p className="horaires-maintenant" data-testid="horaires-maintenant">
      <strong>{debut}</strong>
      {texte}
    </p>
  )
}

function Tableau({ bloc, maintenant }: { bloc: Bloc; maintenant: Date }) {
  return (
    <div className="horaires-bloc">
      <Maintenant bloc={bloc} maintenant={maintenant} />
      {bloc.remarque !== undefined && (
        <p className="horaires-remarque" data-testid="horaires-remarque">
          <strong>À savoir :</strong> {bloc.remarque}
        </p>
      )}
      <table>
        <caption>{TITRE[bloc.nature]}</caption>
        <tbody>
          {JOURS.map((j) => (
            <tr key={j.cle}>
              <th scope="row">{j.nom}</th>
              <td>{formaterCreneaux(bloc[j.cle])}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="fiche-aide">
        Lus le {libelleVerification(bloc.verifieLe)} sur{' '}
        <a href={bloc.source} target="_blank" rel="noopener noreferrer">
          {hoteDeSource(bloc.source)}
        </a>
        . Ils peuvent avoir changé depuis.
      </p>
    </div>
  )
}

/**
 * Les horaires de la fiche (S6). Structurés seulement quand une source les
 * donne : un bloc par nature (accueil, vente), la remarque au-dessus du
 * tableau. Sinon, la fiche le dit et renvoie à la justification, sans la
 * réinterpréter.
 */
export function Horaires({
  brasserie,
  maintenant = new Date(),
}: {
  brasserie: Brasserie
  /** L'instant de référence ; les tests le fixent. */
  maintenant?: Date
}) {
  const blocs = brasserie.horaires
  if (blocs === undefined) {
    return (
      <p className="fiche-horaires" data-testid="fiche-horaires">
        Horaires : aucun horaire vérifié jour par jour. S’il y en a de connus, ils sont
        cités dans « Ce que dit la source », plus haut.
      </p>
    )
  }
  return (
    <div className="fiche-horaires" data-testid="fiche-horaires">
      {blocs.map((b) => (
        <Tableau key={b.nature} bloc={b} maintenant={maintenant} />
      ))}
    </div>
  )
}
