import { CATEGORIES } from './core/categories'
import { adresseDeRue, libelleConfiance, libelleVerification } from './core/fiche'
import { formaterHeure, ouvertMaintenant, phraseProchaine, phraseSousReserve, type Bloc } from './core/horaires'
import type { Brasserie } from './core/schema'
import { useMinute } from './crochets'
import { t } from './i18n'

/**
 * « En bref », en tête de fiche (S295, la fiche face à la concurrence :
 * Google Maps et Untappd ouvrent sur ce qu'on peut faire, l'état et le
 * lieu ; la nôtre ouvrait sur une zone de saisie pour soi). Trois lignes,
 * rien de nouveau calculé : la catégorie et sa confiance, l'état d'après
 * les horaires publiés, l'adresse ou son absence.
 */
export function EnBref({ brasserie, maintenant }: { brasserie: Brasserie; maintenant?: Date }) {
  const horloge = useMinute()
  const instant = maintenant ?? horloge
  return (
    <dl className="fiche-en-bref" data-testid="fiche-en-bref">
      <dt>{t('Ce qu’on peut y faire')}</dt>
      <dd data-testid="en-bref-categorie">
        {t(CATEGORIES[brasserie.cat])}
        {brasserie.cat !== 0 && (
          <span className="fiche-aide">
            {brasserie.verifieLe === undefined
              ? t('Confiance {niveau} ; date de vérification non renseignée.', { niveau: libelleConfiance(brasserie.conf) })
              : t('Confiance {niveau}, fiche vérifiée le {date}.', {
                  niveau: libelleConfiance(brasserie.conf),
                  date: libelleVerification(brasserie.verifieLe),
                })}
          </span>
        )}
      </dd>
      <dt>{t('Maintenant')}</dt>
      <dd data-testid="en-bref-maintenant">{etat(brasserie, instant)}</dd>
      <dt>{t('Où')}</dt>
      <dd data-testid="en-bref-ou">
        {adresseDeRue(brasserie)
          ? brasserie.addr
          : t('Adresse non connue : seulement la commune, {commune}.', { commune: brasserie.c })}
      </dd>
    </dl>
  )
}

/** L'accueil du public d'abord ; sinon la vente. */
function blocPrincipal(b: Brasserie): Bloc | undefined {
  return b.horaires?.find((x) => x.nature === 'accueil') ?? b.horaires?.[0]
}

function etat(b: Brasserie, instant: Date): string {
  const bloc = blocPrincipal(b)
  if (bloc === undefined) return t('Aucun horaire vérifié : voyez « Ce que dit la source ».')
  // Les mêmes phrases que le tableau des horaires (`Horaires.tsx`).
  const debut = bloc.nature === 'accueil' ? t('Accueil du public : ') : t('Vente : ')
  // Tous les blocs de la nature : celui de la saison du jour décide (S299).
  const m = ouvertMaintenant(b.horaires, instant, bloc.nature)
  const jusqua = m.jusqua === undefined ? '' : t(' jusqu’à {heure}', { heure: formaterHeure(m.jusqua) })
  if (m.etat === 'ouvert') return debut + t('ouvert{jusqua}, d’après les horaires publiés.', { jusqua })
  if (m.etat === 'sous-reserve') return debut + phraseSousReserve(m)
  if (m.etat === 'inconnu')
    return debut + (m.horsPeriode === true ? t('la source ne publie pas d’horaires pour cette période de l’année.') : t('la source ne dit pas les heures de ce jour.'))
  return `${debut}${t('fermé, d’après les horaires publiés.')} ${phraseProchaine(b.horaires ?? [bloc], bloc.nature, instant)}`
}
