import { hoteDeSource, libelleVerification } from './core/fiche'
import { formaterCreneaux, JOURS, type Bloc } from './core/horaires'
import type { Brasserie } from './core/schema'

const TITRE: Record<Bloc['nature'], string> = {
  accueil: 'Horaires d’accueil du public',
  vente: 'Horaires de vente',
}

function Tableau({ bloc }: { bloc: Bloc }) {
  return (
    <div className="horaires-bloc">
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
export function Horaires({ brasserie }: { brasserie: Brasserie }) {
  const blocs = brasserie.horaires
  if (blocs === undefined) {
    return (
      <p className="fiche-horaires" data-testid="fiche-horaires">
        Horaires : aucun horaire vérifié jour par jour. Seuls ceux cités dans « Ce que
        dit la source », plus haut, sont connus.
      </p>
    )
  }
  return (
    <div className="fiche-horaires" data-testid="fiche-horaires">
      {blocs.map((b) => (
        <Tableau key={b.nature} bloc={b} />
      ))}
    </div>
  )
}
