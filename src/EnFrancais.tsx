import type { ReactNode } from 'react'
import { langueCourante, t } from './i18n'

/**
 * Un texte venu des fiches, donc en français, même quand l'interface est en
 * anglais (S295, Emma et Inès). `lang="fr"` fait lire un lecteur d'écran
 * avec la bonne voix ; en anglais, la mention « (in French) » dit que ce
 * n'est pas un oubli de traduction.
 */
export function EnFrancais({ children, testid }: { children: ReactNode; testid?: string }) {
  if (langueCourante() === 'fr') return <span data-testid={testid}>{children}</span>
  return (
    <>
      <span lang="fr" data-testid={testid}>
        {children}
      </span>
      <span className="en-francais"> {t('(en français)')}</span>
    </>
  )
}
