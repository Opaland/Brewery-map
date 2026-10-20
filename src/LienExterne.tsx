import type { ReactNode } from 'react'
import { t } from './i18n'

/**
 * Un lien qui quitte le site (S295, Inès et Léa) : il s'ouvre dans un nouvel
 * onglet, n'emporte rien de la personne (`noreferrer`), et le dit à qui
 * écoute la page. Le seul composant React qui pose `target="_blank"` ;
 * la carte en pose un aussi, sur le lien d'attribution que MapLibre
 * écrit dans le DOM. `tests/unit/lien-externe.test.ts` refuse tout autre
 * endroit (§4).
 */
export function LienExterne({
  href,
  className,
  testid,
  children,
}: {
  href: string
  className?: string
  testid?: string
  children: ReactNode
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer" data-testid={testid}>
      {children}
      <span className="lecteur-seul"> {t('(nouvel onglet)')}</span>
    </a>
  )
}
