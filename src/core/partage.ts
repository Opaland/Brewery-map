/**
 * Le lien d'une fiche (S27) : « regarde, on peut y boire sur place ». Il ne
 * porte que le nom de la brasserie, dans le fragment (`#fiche=…`), que le
 * navigateur n'envoie même pas au serveur de la page. Ni position, ni point
 * de départ, ni réglage (CLAUDE.md §0).
 */
const CLE = '#fiche='

export function lienDeFiche(adresseDeLaPage: string, nom: string): string {
  const u = new URL(adresseDeLaPage)
  return `${u.origin}${u.pathname}${CLE}${encodeURIComponent(nom)}`
}

/** Le nom porté par un fragment `#fiche=…`, ou `undefined`. */
export function ficheDuLien(fragment: string): string | undefined {
  if (!fragment.startsWith(CLE)) return undefined
  try {
    const nom = decodeURIComponent(fragment.slice(CLE.length))
    return nom === '' ? undefined : nom
  } catch {
    return undefined
  }
}
