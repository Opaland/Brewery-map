import { t } from './i18n'
import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react'
import type CarteType from './Carte'

type PropsCarte = ComponentProps<typeof CarteType>

/** Appelée une fois, à l'initialisation de l'état : pas pendant chaque rendu. */
const charger = () => lazy(() => import('./Carte'))

/**
 * La carte ne se charge qu'à l'approche de l'écran (S20, persona Bernard).
 * Mesuré le 16/10 (Lighthouse 13.5, mobile simulé, processeur ralenti 4×) :
 * son chunk prenait 3,8 s du fil principal dès l'ouverture, alors que sur un
 * téléphone elle commence sous l'écran (1 289 px pour 839 px de haut sur le
 * Pixel 7 des tests). La liste, elle, est là tout de suite.
 *
 * Marge de 300 px : la carte démarre un peu avant d'être vue, pour être prête
 * quand on y arrive. Chiffre de présentation, tranché au jugé (CLAUDE.md §2) :
 * 0 la ferait apparaître vide un instant ; un écran entier (≈ 800 px) la
 * chargerait presque toujours, ce qu'on veut éviter.
 *
 * Sans IntersectionObserver (très vieux navigateur), elle se charge tout de
 * suite, comme avant.
 */
export function CarteDifferee(props: PropsCarte) {
  const repere = useRef<HTMLDivElement>(null)
  const [proche, setProche] = useState(() => typeof IntersectionObserver === 'undefined')
  const [Carte] = useState(charger)

  useEffect(() => {
    if (proche || repere.current === null) return
    const obs = new IntersectionObserver(
      (entrees) => {
        if (entrees.some((e) => e.isIntersecting)) setProche(true)
      },
      { rootMargin: '300px' },
    )
    obs.observe(repere.current)
    return () => {
      obs.disconnect()
    }
  }, [proche])

  if (!proche) {
    return (
      <div ref={repere} className="carte carte-attente" data-testid="carte-en-attente">
        {t('Carte : elle se charge quand vous faites défiler jusqu’ici.')}
      </div>
    )
  }
  return (
    <LimiteCarte>
      <Suspense fallback={<div className="carte carte-attente">{t('Chargement de la carte…')}</div>}>
        <Carte {...props} />
      </Suspense>
    </LimiteCarte>
  )
}

/**
 * Si la carte ne peut pas se charger (connexion coupée, fichier disparu après
 * un déploiement), elle seule s'efface : sans cette limite, React démontait
 * toute la page, liste comprise (revues S20).
 */
class LimiteCarte extends Component<{ children: ReactNode }, { echec: boolean }> {
  override state = { echec: false }

  static getDerivedStateFromError(): { echec: boolean } {
    return { echec: true }
  }

  override render() {
    if (!this.state.echec) return this.props.children
    return (
      <div className="carte carte-absente" role="note" data-testid="carte-echec">
        <p>
          {t('La carte n’a pas pu se charger (connexion ?). La liste reste complète, avec les mêmes informations.')}
        </p>
        {/* Recharger, pas réimporter : le navigateur garde en mémoire l'échec
            d'un import dynamique et le rendrait tel quel (vu au test, S20). */}
        <button
          type="button"
          onClick={() => {
            window.location.reload()
          }}
        >
          {t('Recharger la page')}
        </button>
      </div>
    )
  }
}
