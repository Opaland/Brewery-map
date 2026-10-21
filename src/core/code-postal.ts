/**
 * Le département d'un code postal : les deux premiers chiffres ; trois pour
 * l'outre-mer (97x, 98x) ; en Corse, 200 et 201 pour la Corse-du-Sud (2A),
 * 202 à 206 pour la Haute-Corse (2B) — « 20000 » ne désignait aucun
 * département (revue code S21). Une seule règle, partagée par la recherche
 * de communes, la couche OSM, la découverte, les candidats et les lots
 * (S331 : elle était écrite cinq fois, et deux copies la disaient autrement).
 */
export function departementDuCodePostal(cp: string): string {
  if (cp.startsWith('97') || cp.startsWith('98')) return cp.slice(0, 3)
  if (cp.startsWith('20')) return cp < '20200' ? '2A' : '2B'
  return cp.slice(0, 2)
}
