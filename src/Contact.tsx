import { lienTelephone, numerosAppelables } from './core/fiche'
import type { Brasserie } from './core/schema'
import { t } from './i18n'
import { LienExterne } from './LienExterne'

/**
 * Joindre la brasserie (S4). Rien d'inventé : seulement ce qui est sourcé.
 * Ce qui manque (le téléphone, et où le chercher) est dit une fois en tête
 * de fiche, pas ici ; sans rien à dire, la partie ne s'affiche pas (S308). Les liens externes s'ouvrent à part et
 * n'emportent rien de la personne (`noreferrer`).
 */
export function Contact({ brasserie }: { brasserie: Brasserie }) {
  const contact = brasserie.contact
  // Un numéro cité par la source, sans téléphone vérifié (revue métier S4) :
  // un lien « Appeler », qui dit qu'il n'est pas revérifié (S382, #288).
  const cites = contact?.tel === undefined ? numerosAppelables(brasserie.note) : []
  const numeroCite =
    cites.length > 0 ? (
      <>
        {cites.map((tel) => (
          <a key={tel} className="bouton-appeler" href={lienTelephone(tel)}>
            {t('Appeler le {tel} (numéro cité par la source, non revérifié)', { tel })}
          </a>
        ))}
      </>
    ) : null
  // Le nom de la brasserie, pour qui écoute la liste des liens.
  const pour = <span className="lecteur-seul"> {brasserie.n}</span>
  const titre = <h4 className="fiche-titre">{t('Joindre la brasserie')}</h4>
  if (contact === undefined) {
    if (numeroCite === null) return null
    return (
      <div className="fiche-contact" data-testid="fiche-contact">
        {titre}
        {numeroCite}
      </div>
    )
  }
  return (
    <div className="fiche-contact" data-testid="fiche-contact">
      {titre}
      {contact.tel !== undefined && (
        <a className="bouton-appeler" href={lienTelephone(contact.tel)}>
          {t('Appeler le {tel}', { tel: contact.tel })}
        </a>
      )}
      {numeroCite}
      {(contact.site !== undefined || contact.untappd !== undefined) && (
        <p className="fiche-liens">
          {contact.site !== undefined && (
            <LienExterne href={contact.site}>
              {t('Site de la brasserie')}
              {pour}
            </LienExterne>
          )}
          {contact.untappd !== undefined && (
            <LienExterne href={contact.untappd}>
              {t('Untappd (avis sur les bières)')}
              {pour}
            </LienExterne>
          )}
        </p>
      )}
      {/* D'où viennent ces coordonnées, et quand : dit dans la provenance,
          une fois par site (S312). */}
    </div>
  )
}
