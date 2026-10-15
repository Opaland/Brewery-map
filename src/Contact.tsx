import { hoteDeSource, libelleVerification, lienTelephone } from './core/fiche'
import type { Brasserie } from './core/schema'

/**
 * Joindre la brasserie (S4). Rien d'inventé : sans contact sourcé, la fiche
 * le dit. Les liens externes s'ouvrent à part et n'emportent rien de la
 * personne (`noreferrer`).
 */
export function Contact({ brasserie }: { brasserie: Brasserie }) {
  const contact = brasserie.contact
  if (contact === undefined) {
    return (
      <p className="fiche-contact" data-testid="fiche-contact">
        Téléphone : non renseigné.
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
      {contact.tel === undefined && <p>Téléphone : non renseigné.</p>}
      <p className="fiche-liens">
        {contact.site !== undefined && (
          <a href={contact.site} target="_blank" rel="noopener noreferrer">
            Site de la brasserie
          </a>
        )}
        {contact.untappd !== undefined && (
          <a href={contact.untappd} target="_blank" rel="noopener noreferrer">
            Page Untappd
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

