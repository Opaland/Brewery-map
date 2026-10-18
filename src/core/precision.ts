/**
 * S59 : combien de fiches sont à chaque palier d'écart (km) du centre de
 * leur commune. Un écart inconnu (commune sans centre trouvé) n'est compté
 * nulle part : il se dit à part, il ne se devine pas.
 */
export function repartitionDesEcarts(
  ecarts: (number | null)[],
  paliers: number[],
): { palier: number; nombre: number }[] {
  const connus = ecarts.filter((e): e is number => e !== null)
  return paliers.map((palier) => ({ palier, nombre: connus.filter((e) => e <= palier).length }))
}
