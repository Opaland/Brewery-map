import { citeUnNumero, hoteDeSource, libelleVerification, lienTelephone } from './core/fiche'
import type { Brasserie } from './core/schema'

/**
 * Joindre la brasserie (S4). Rien d'inventé : sans contact sourcé, la fiche
 * le dit. Les liens externes s'ouvrent à part et n'emportent rien de la
 * personne (`noreferrer`).
 */
export function Contact({ brasserie }: { brasserie: Brasserie }) {
  const contact = brasserie.contact
  const sansTelephone = citeUnNumero(brasserie.note)
    ? 'Téléphone : pas de numéro vérifié. La source en cite un ci-dessus, non revérifié.'
    : 'Téléphone : non renseigné.'
  // Le nom de la brasserie, pour qui écoute la liste des liens.
  const pour = <span className="lecteur-seul"> {brasserie.n}</span>
  if (contact === undefined) {
    return (
      <p className="fiche-contact" data-testid="fiche-contact">
        {sansTelephone}
      </p>
    )
  }
  return (
    <div className="fiche-contact" data-testid="fiche-contact">
      {contact.tel !== undefined && (
        <a className="bouton-appeler" href={lienTelephone(contact.tel)}>
          Appeler le {contact.tel}
        </a>
      )}
      {contact.tel === undefined && <p>{sansTelephone}</p>}
      <p className="fiche-liens">
        {contact.site !== undefined && (
          <a href={contact.site} target="_blank" rel="noopener noreferrer">
            Site de la brasserie
            {pour}
          </a>
        )}
        {contact.untappd !== undefined && (
          <a href={contact.untappd} target="_blank" rel="noopener noreferrer">
            Untappd (avis sur les bières)
            {pour}
          </a>
        )}
      </p>
      <p className="fiche-aide">
        Coordonnées lues le {libelleVerification(contact.verifieLe)} sur{' '}
        <a href={contact.source} target="_blank" rel="noopener noreferrer">
          {hoteDeSource(contact.source)}
        </a>
        .
      </p>
    </div>
  )
}

