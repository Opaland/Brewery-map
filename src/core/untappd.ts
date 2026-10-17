/**
 * Une recherche Untappd au nom d'une brasserie (S51, Cédric le 17/10 :
 * « lien vers Untappd absent »). Tant que la fiche n'a pas de lien Untappd
 * vérifié (`contact.untappd`, lu et accepté par lot), la fiche offre cette
 * recherche, dite comme une recherche : rien ne garantit que la première
 * réponse soit la bonne brasserie.
 *
 * Le lien ne porte que le nom de la brasserie : ni sa commune, ni la
 * position de la personne (CLAUDE.md §0).
 */
export function rechercheUntappd(nom: string): string {
  const url = new URL('https://untappd.com/search')
  url.searchParams.set('q', nom)
  url.searchParams.set('type', 'brewery')
  return url.href
}
