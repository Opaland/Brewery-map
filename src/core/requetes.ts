/**
 * S280 (repris d'ÉtapeForge, `apiUsage.js`) — compter les requêtes des
 * outils de curation par hôte, pour voir venir un quota avant qu'il tombe au
 * milieu d'un lot (S250). Pur : `outils/requetes.ts` envoie et compte.
 */

/** Ajoute une requête à l'hôte de l'URL ; une URL illisible compte sous son texte. */
export function compterRequete(compte: Map<string, number>, url: string): void {
  let hote = url
  try {
    hote = new URL(url).hostname
  } catch {
    // Pas une URL : on garde le texte, plutôt que de faire tomber l'outil.
  }
  compte.set(hote, (compte.get(hote) ?? 0) + 1)
}

/**
 * Le bilan, du plus demandé au moins demandé ; vide s'il n'y a rien eu.
 * Chaque ligne finit par « requête(s) », jamais par un nombre : `curation.ts
 * trier` lit la sortie de `controler`, bilan compris, et y prend une ligne
 * finie par « : 404 » pour un écart (revue adverse S280).
 */
export function bilanDesRequetes(compte: ReadonlyMap<string, number>): string {
  if (compte.size === 0) return ''
  const total = [...compte.values()].reduce((a, b) => a + b, 0)
  const lignes = [...compte].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([h, n]) => `- ${h} : ${String(n)} ${n === 1 ? 'requête' : 'requêtes'}`)
  return [`Requêtes envoyées : ${String(total)}`, ...lignes].join('\n')
}
