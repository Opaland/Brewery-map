import { CATEGORIES } from './core/categories'
import { adresseDeRue } from './core/fiche'
import { formaterHeure, heureDeParis, natureEnTete, ouvertMaintenant, phraseProchaine, phraseSousReserve, type Bloc } from './core/horaires'
import type { Brasserie } from './core/schema'
import { useMinute } from './crochets'
import { t } from './i18n'

/**
 * « En bref », en tête de fiche (S295, la fiche face à la concurrence :
 * Google Maps et Untappd ouvrent sur ce qu'on peut faire, l'état et le
 * lieu ; la nôtre ouvrait sur une zone de saisie pour soi). Au plus trois
 * lignes, rien de nouveau calculé : la catégorie, l'état d'après les
 * horaires publiés, l'adresse — chacune seulement si elle est connue (S308).
 */
export function EnBref({ brasserie, maintenant }: { brasserie: Brasserie; maintenant?: Date }) {
  const horloge = useMinute()
  const instant = maintenant ?? horloge
  const bloc = blocPrincipal(brasserie)
  return (
    <dl className="fiche-en-bref" data-testid="fiche-en-bref">
      <dt>{t('Ce qu’on peut y faire')}</dt>
      {/* Une catégorie déduite ne s'affirme pas en tête (revue Marie S308) :
          la réserve est là, pas seulement dans la provenance en bas. */}
      <dd data-testid="en-bref-categorie">
        {t(CATEGORIES[brasserie.cat])}
        {brasserie.conf === 'faible' && t(' (à vérifier)')}
      </dd>
      {/* S308 : ce qui n'est pas connu n'a pas de ligne ; la fiche le dit
          une fois, juste dessous (`CeQuiManque`). */}
      {bloc !== undefined && (
        <>
          <dt>{t('Maintenant')}</dt>
          <dd data-testid="en-bref-maintenant">{etat(brasserie, bloc, instant)}</dd>
        </>
      )}
      {adresseDeRue(brasserie) && (
        <>
          <dt>{t('Adresse')}</dt>
          <dd data-testid="en-bref-ou">{brasserie.addr}</dd>
        </>
      )}
    </dl>
  )
}

/** Le bloc de la nature en tête (`natureEnTete` : l'accueil, sinon la vente). */
function blocPrincipal(b: Brasserie): Bloc | undefined {
  const nature = natureEnTete(b.horaires)
  return b.horaires?.find((x) => x.nature === nature)
}

function etat(b: Brasserie, bloc: Bloc, instant: Date): string {

  // Les mêmes phrases que le tableau des horaires (`Horaires.tsx`).
  // L'heure de référence est écrite : une fiche restée ouverte ne prétend
  // pas dire « maintenant » une heure plus tard (revue code S19). Le tableau
  // des horaires ne redit pas cet état (S312).
  const heure = formaterHeure(heureDeParis(instant))
  const debut =
    bloc.nature === 'accueil'
      ? t('À {heure} (heure de Paris), accueil du public : ', { heure })
      : t('À {heure} (heure de Paris), vente : ', { heure })
  // Tous les blocs de la nature : celui de la saison du jour décide (S299).
  const m = ouvertMaintenant(b.horaires, instant, bloc.nature)
  const jusqua = m.jusqua === undefined ? '' : t(' jusqu’à {heure}', { heure: formaterHeure(m.jusqua) })
  if (m.etat === 'ouvert') return debut + t('ouvert{jusqua}, d’après les horaires publiés.', { jusqua })
  if (m.etat === 'sous-reserve') return debut + phraseSousReserve(m)
  if (m.etat === 'inconnu')
    return debut + (m.horsPeriode === true ? t('la source ne publie pas d’horaires pour cette période de l’année.') : t('la source ne dit pas les heures de ce jour.'))
  return `${debut}${t('fermé, d’après les horaires publiés.')} ${phraseProchaine(b.horaires ?? [bloc], bloc.nature, instant)}`
}
