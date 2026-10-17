import { t } from './i18n'
import { useEffect, useState } from 'react'
import { activerNouvelleVersion, EVENEMENT_NOUVELLE_VERSION } from './miseAJour'

/** Le bandeau « nouvelle version » (revue globale S22). */
export function MiseAJour() {
  const [prete, setPrete] = useState(false)
  useEffect(() => {
    const voir = () => {
      setPrete(true)
    }
    window.addEventListener(EVENEMENT_NOUVELLE_VERSION, voir)
    return () => {
      window.removeEventListener(EVENEMENT_NOUVELLE_VERSION, voir)
    }
  }, [])
  if (!prete) return null
  return (
    <div className="bandeau-mise-a-jour" role="status" data-testid="mise-a-jour">
      <span>{t('Une nouvelle version de Mousse de Poche est prête.')}</span>
      <button type="button" onClick={activerNouvelleVersion} data-testid="recharger-version">
        {t('Recharger')}
      </button>
    </div>
  )
}
