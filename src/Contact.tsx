import { citeUnNumero, hoteDeSource, libelleVerification, lienTelephone } from './core/fiche'
import type { Brasserie } from './core/schema'
import { rechercheGoogleMaps } from './core/google-maps'
import { estDeOsm } from './core/osm-france'
import { rechercheUntappd } from './core/untappd'
import { t } from './i18n'

/**
 * Joindre la brasserie (S4). Rien d'inventé : sans contact sourcé, la fiche
 * le dit. Les liens externes s'ouvrent à part et n'emportent rien de la
 * personne (`noreferrer`).
 */
export function Contact({ brasserie }: { brasserie: Brasserie }) {
  const contact = brasserie.contact
  const sansTelephone = citeUnNumero(brasserie.note)
        ? t('Téléphone : pas de numéro vérifié. La source en cite un ci-dessus, non revérifié.')
    : t('Téléphone : non renseigné.')
  // Le nom de la brasserie, pour qui écoute la liste des liens.
    const pour = <span className="lecteur-seul"> {brasserie.n}</span>
  // Sans lien Untappd vérifié, une recherche, dite comme telle (S51).
  const chercher = (
    <p className="fiche-aide" data-testid="chercher-untappd">
      <a href={rechercheUntappd(brasserie.n)} target="_blank" rel="noopener noreferrer">
        {t('Chercher sur Untappd')}
        {pour}
      </a>{' '}
      {t('(une recherche par son nom : pas encore de lien vérifié vers sa page ; Untappd peut demander de se connecter)')}
    </p>
  )
  // Sans téléphone vérifié, celui que montre Google Maps, dit comme une
  // recherche (S267). Pas pour une fiche OpenStreetMap : sa commune est
  // souvent déduite de sa position (601 sur 912 au 18/10, après S270), et la recherche
  // irait ailleurs (revue adverse S267).
  const telephoneMaps = estDeOsm(brasserie) ? null : (
    <p className="fiche-aide" data-testid="telephone-google-maps">
      <a href={rechercheGoogleMaps(brasserie.n, brasserie.c)} target="_blank" rel="noopener noreferrer">
        {t('Voir son téléphone sur Google Maps')}
        {pour}
      </a>{' '}
      {t('(une recherche par son nom et sa commune : vérifiez que c’est la bonne brasserie)')}
    </p>
  )
  if (contact === undefined) {
    return (
      <div className="fiche-contact" data-testid="fiche-contact">
        <p>{sansTelephone}</p>
        {telephoneMaps}
        {chercher}
      </div>
    )
  }
  return (
    <div className="fiche-contact" data-testid="fiche-contact">
      {contact.tel !== undefined && (
        <a className="bouton-appeler" href={lienTelephone(contact.tel)}>
          {t('Appeler le {tel}', { tel: contact.tel })}
        </a>
      )}
      {contact.tel === undefined && <p>{sansTelephone}</p>}
      {contact.tel === undefined && telephoneMaps}
      <p className="fiche-liens">
        {contact.site !== undefined && (
          <a href={contact.site} target="_blank" rel="noopener noreferrer">
                        {t('Site de la brasserie')}
            {pour}
          </a>
        )}
        {contact.untappd !== undefined && (
          <a href={contact.untappd} target="_blank" rel="noopener noreferrer">
                        {t('Untappd (avis sur les bières)')}
            {pour}
          </a>
        )}
            </p>
      {contact.untappd === undefined && chercher}
      <p className="fiche-aide">
        {t('Coordonnées lues le {date} sur', { date: libelleVerification(contact.verifieLe) })}{' '}
        <a href={contact.source} target="_blank" rel="noopener noreferrer">
          {hoteDeSource(contact.source)}
        </a>
        .
      </p>
    </div>
  )
}

