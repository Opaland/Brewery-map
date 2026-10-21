import { t } from './i18n'
import { useEffect, useState } from 'react'
import { plateformeDe } from './core/itineraire'
import { invitationTot, type InvitationInstallation } from './invitationInstallation'

const dejaInstallee = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true

/**
 * Installer l'application (S21, retour de Cédric du 16/10 : « je n'ai pas de
 * lien pour télécharger et installer sur mon téléphone »). Avant, une seule
 * phrase en pied de page.
 *
 * - Android, Chrome : le navigateur propose l'installation
 *   (`beforeinstallprompt`) ; le bouton la déclenche.
 * - iPhone : Safari n'a pas cet événement ; l'écran dit le geste.
 * - Déjà installée, ou navigateur sans installation : rien, ou le geste du
 *   menu.
 */
export function Installer() {
  const [invitation, setInvitation] = useState<InvitationInstallation | null>(invitationTot)
  const [installee, setInstallee] = useState(dejaInstallee)

  useEffect(() => {
    const garder = (e: Event) => {
      e.preventDefault()
      setInvitation(e as InvitationInstallation)
    }
    const fin = () => {
      setInstallee(true)
      setInvitation(null)
    }
    window.addEventListener('beforeinstallprompt', garder)
    window.addEventListener('appinstalled', fin)
    return () => {
      window.removeEventListener('beforeinstallprompt', garder)
      window.removeEventListener('appinstalled', fin)
    }
  }, [])

  if (installee) return null
  if (invitation !== null) {
    return (
      <div className="installer" data-testid="installer">
        <button
          type="button"
          onClick={() => {
            invitation.prompt().catch(() => undefined)
            void invitation.userChoice.then(({ outcome }) => {
              if (outcome === 'accepted') setInstallee(true)
              setInvitation(null)
            })
          }}
          data-testid="bouton-installer"
        >
          {t('Installer l’application')}
        </button>
        <span className="champ-aide">
          {t('Une icône sur l’écran d’accueil ; les fiches restent lisibles sans réseau.')}
        </span>
      </div>
    )
  }
  // Replié derrière une phrase : déplié, il prenait deux lignes de l'en-tête
  // à chaque visite (revue UI/UX S28).
  return (
    <details className="installer-repli">
      <summary>{t('Installer l’application')}</summary>
      <p className="champ-aide installer" data-testid="installer-geste">
        {plateformeDe(navigator.userAgent) === 'ios'
          ? t('Pour l’installer sur iPhone : bouton Partager du navigateur (Safari, ou Chrome et Firefox récents), puis « Sur l’écran d’accueil ».')
          : t('Pour l’installer : menu du navigateur, puis « Installer l’application » ou « Ajouter à l’écran d’accueil ».')}
      </p>
    </details>
  )
}
