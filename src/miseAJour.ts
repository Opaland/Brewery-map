/**
 * Une nouvelle version de l'application attend (revue globale S22) : les
 * données sont dans le JS, une fiche corrigée n'arrivait sur un téléphone
 * qu'une fois tous ses onglets fermés, sans que rien ne le dise.
 */
export const EVENEMENT_NOUVELLE_VERSION = 'mousse:nouvelle-version'

let activationDemandee = false

export function surveillerMiseAJour(reg: ServiceWorkerRegistration | undefined): void {
  // Un navigateur rend toujours un enregistrement ; Playwright, service
  // worker bloqué, rend `undefined` — l'erreur a fait rougir la sonde de la
  // page publiée le 16/10 (test « aucune erreur JavaScript », partout.spec).
  if (reg === undefined) return
  // Une version qui attend ne s'annonce que s'il y a déjà une version en
  // service : à la première visite, il n'y a rien à remplacer.
  const annoncer = () => {
    if (reg.waiting !== null && navigator.serviceWorker.controller !== null) {
      window.dispatchEvent(new Event(EVENEMENT_NOUVELLE_VERSION))
    }
  }
  annoncer()
  reg.addEventListener('updatefound', () => {
    const nouveau = reg.installing
    nouveau?.addEventListener('statechange', () => {
      if (nouveau.state === 'installed') annoncer()
    })
  })
  // Recharger seulement si la personne l'a demandé : `clients.claim()` de la
  // toute première installation déclenche aussi `controllerchange`.
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (activationDemandee) window.location.reload()
  })
}

export function activerNouvelleVersion(): void {
  activationDemandee = true
  void navigator.serviceWorker.getRegistration().then((reg) => {
    reg?.waiting?.postMessage('activer')
  })
}
