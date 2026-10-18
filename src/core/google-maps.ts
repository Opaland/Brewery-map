/**
 * La fiche Google Maps d'une brasserie (S267, Cédric le 18/10 : « pour les
 * téléphones, affichez celui de Google Maps »). Le numéro n'est pas recopié
 * dans `data/` : Google Maps ne se lit pas sans navigateur, et ses conditions
 * interdisent d'en extraire les données. La fiche ouvre donc la recherche, où
 * Google affiche le numéro ; elle le dit comme une recherche.
 *
 * Le lien ne porte que le nom et la commune de la brasserie, jamais la
 * position de la personne (CLAUDE.md §0).
 */
export function rechercheGoogleMaps(nom: string, commune: string): string {
  const url = new URL('https://www.google.com/maps/search/')
  url.searchParams.set('api', '1')
  url.searchParams.set('query', `${nom} ${commune}`)
  return url.href
}
