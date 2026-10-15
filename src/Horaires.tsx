import { libelleVerification, hoteDeSource } from './core/fiche'
import { formaterCreneaux, JOURS } from './core/horaires'
import type { Brasserie } from './core/schema'

/**
 * Les horaires de la fiche (S6). Structurés seulement quand une source les
 * donne ; sinon, la fiche renvoie au texte de la source au lieu de le
 * réinterpréter (revue métier S3 : la confiance ne garantit pas les
 * horaires).
 */
export function Horaires({ brasserie }: { brasserie: Brasserie }) {
  const h = brasserie.horaires
  if (h === undefined) {
    return (
      <p className="fiche-horaires" data-testid="fiche-horaires">
        Horaires : pas d’horaires vérifiés jour par jour. Lisez ce que dit la source, et
        appelez avant de vous déplacer.
      </p>
    )
  }
  return (
    <div className="fiche-horaires" data-testid="fiche-horaires">
      <p className="fiche-titre">
        {h.nature === 'accueil' ? 'Horaires d’accueil du public' : 'Horaires de vente'}
      </p>
      <table>
        <tbody>
          {JOURS.map((j) => (
            <tr key={j.cle}>
              <th scope="row">{j.nom}</th>
              <td>{formaterCreneaux(h[j.cle])}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="fiche-aide">
        Lus le {libelleVerification(h.verifieLe)} sur{' '}
        <a href={h.source} target="_blank" rel="noopener noreferrer">
          {hoteDeSource(h.source)}
        </a>
        . Ils peuvent avoir changé depuis.
      </p>
    </div>
  )
}
