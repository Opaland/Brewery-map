/** L'événement de Chrome et d'Android, absent des types du DOM. */
export interface InvitationInstallation extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

/**
 * L'invitation reçue avant le premier rendu (S333, A29) : Chrome peut
 * l'envoyer pendant que la page attend le stockage et la couche OSM, avant
 * que le composant écoute. `main.tsx` appelle `ecouterInvitationTot` tout de
 * suite ; le composant la reprend à son montage.
 */
let invitation: InvitationInstallation | null = null
export function ecouterInvitationTot(): void {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    invitation = e as InvitationInstallation
  })
}

/** L'invitation reçue jusqu'ici, ou rien. */
export function invitationTot(): InvitationInstallation | null {
  return invitation
}
