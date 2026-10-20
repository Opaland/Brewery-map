import { Component, type ReactNode } from 'react'

/**
 * Ce qui se charge à la demande (la carte, l'affichette) peut manquer :
 * connexion coupée, ou fichier disparu après un déploiement. Sans limite,
 * React démontait toute la page, liste comprise (revues S20). Une seule
 * classe pour les deux (CLAUDE.md §4) : l'affichette n'en avait pas, et sa
 * demande après un déploiement laissait une page blanche (revue globale du
 * 19/10, A1).
 */
export class LimiteDeChargement extends Component<
  { children: ReactNode; secours: ReactNode; onEchec?: () => void },
  { echec: boolean }
> {
  override state = { echec: false }

  static getDerivedStateFromError(): { echec: boolean } {
    return { echec: true }
  }

  override componentDidCatch() {
    this.props.onEchec?.()
  }

  override render() {
    return this.state.echec ? this.props.secours : this.props.children
  }
}
