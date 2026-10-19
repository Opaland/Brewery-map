import { hoteDeSource, libelleVerification } from './core/fiche'
import {
  blocDuJour,
  formaterCreneaux,
  formaterHeure,
  heureDeParis,
  JOURS,
  libellePeriode,
  moisJourDeParis,
  ouvertMaintenant,
  phraseProchaine,
  phraseSousReserve,
  type Bloc,
  type Horaires as Blocs,
} from './core/horaires'
import type { Brasserie } from './core/schema'
import { useMinute } from './crochets'
import { t } from './i18n'
import { EnFrancais } from './EnFrancais'
import { LienExterne } from './LienExterne'

const titre = (bloc: Bloc) => {
  const nom = bloc.nature === 'accueil' ? t('Horaires d’accueil du public') : t('Horaires de vente')
  return bloc.periode === undefined ? nom : `${nom}, ${libellePeriode(bloc.periode)}`
}

/**
 * L'état à l'instant de l'ouverture de la fiche (S19, Hugo) : d'après les
 * créneaux publiés, jamais affirmé quand la source ne dit rien du jour.
 */
function Maintenant({ blocs, bloc, maintenant }: { blocs: Blocs; bloc: Bloc; maintenant: Date }) {
  // Tous les blocs de la nature : celui de la saison du jour décide (S299).
  const m = ouvertMaintenant(blocs, maintenant, bloc.nature)
  // L'heure de référence est écrite : une fiche restée ouverte ne prétend
  // pas dire « maintenant » une heure plus tard (revue code S19).
  const heure = formaterHeure(heureDeParis(maintenant))
  const debut =
    bloc.nature === 'accueil'
      ? t('À {heure} (heure de Paris), accueil du public : ', { heure })
      : t('À {heure} (heure de Paris), vente : ', { heure })
  const jusqua = m.jusqua === undefined ? '' : t(' jusqu’à {heure}', { heure: formaterHeure(m.jusqua) })
  const texte = {
    ouvert: t('ouvert{jusqua}, d’après les horaires publiés.', { jusqua }),
    'sous-reserve': phraseSousReserve(m),
    ferme: `${t('fermé, d’après les horaires publiés.')} ${phraseProchaine(blocs, bloc.nature, maintenant)}`,
    inconnu: m.horsPeriode === true
      ? t('la source ne publie pas d’horaires pour cette période de l’année.')
      : t('la source ne dit pas les heures de ce jour.'),
  }[m.etat]
  return (
    <p className="horaires-maintenant" data-testid="horaires-maintenant">
      <strong>{debut}</strong>
      {texte}
    </p>
  )
}

function Tableau({ blocs, bloc, maintenant, avecMaintenant }: { blocs: Blocs; bloc: Bloc; maintenant: Date; avecMaintenant: boolean }) {
  return (
    <div className="horaires-bloc">
      {avecMaintenant && <Maintenant blocs={blocs} bloc={bloc} maintenant={maintenant} />}
      {bloc.remarque !== undefined && (
        <p className="horaires-remarque" data-testid="horaires-remarque">
          <strong>{t('À savoir :')}</strong> <EnFrancais>{bloc.remarque}</EnFrancais>
        </p>
      )}
      <table>
        <caption>{titre(bloc)}</caption>
        <tbody>
          {JOURS.map((j) => (
            <tr key={j.cle}>
              <th scope="row">{t(j.nom)}</th>
              <td>{formaterCreneaux(bloc[j.cle])}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="fiche-aide">
        {t('Lus le {date} sur', { date: libelleVerification(bloc.verifieLe) })}{' '}
        <LienExterne href={bloc.source}>
          {hoteDeSource(bloc.source)}
        </LienExterne>
        {/* La période de validité : la fiche d'Occitanie la donne, la nôtre
            ne la sait pas (S295, la fiche face à la concurrence). */}
        {t('. Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.')}
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
  maintenant,
}: {
  brasserie: Brasserie
  /** L'instant de référence ; les tests le fixent. Sinon, l'horloge. */
  maintenant?: Date
}) {
  const horloge = useMinute()
  const instant = maintenant ?? horloge
  const blocs = brasserie.horaires
  if (blocs === undefined) {
    return (
      <p className="fiche-horaires" data-testid="fiche-horaires">
        {t(
          'Horaires : aucun horaire vérifié jour par jour. S’il y en a de connus, ils sont cités dans « Ce que dit la source », plus haut.',
        )}
      </p>
    )
  }
  return (
    <div className="fiche-horaires" data-testid="fiche-horaires">
      {blocs.map((b, i) => {
        // L'état du moment, une fois par nature : sur le bloc de la saison
        // du jour, ou sur le premier de la nature hors de toute période (S299).
        const { bloc: duJour } = blocDuJour(blocs, b.nature, moisJourDeParis(instant))
        const premier = blocs.findIndex((x) => x.nature === b.nature) === i
        return (
          <Tableau
            key={`${b.nature}-${b.periode?.du ?? 'année'}`}
            blocs={blocs}
            bloc={b}
            maintenant={instant}
            avecMaintenant={duJour === undefined ? premier : duJour === b}
          />
        )
      })}
    </div>
  )
}
