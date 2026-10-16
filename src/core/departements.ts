import liste from '@etalab/decoupage-administratif/data/departements.json'

/**
 * Les noms des départements (Code officiel géographique de l'INSEE, via le
 * paquet d'Etalab, comme les communes), pour parcourir par département
 * (S27). Seuls le code et le nom entrent dans l'application.
 */
export const NOMS_DEPARTEMENTS: Readonly<Record<string, string>> = Object.fromEntries(
  (liste as readonly { code: string; nom: string }[]).map((d) => [d.code, d.nom]),
)

/** « 73 · Savoie », ou le code seul s'il est inconnu. */
export function libelleDepartement(code: string): string {
  const nom = NOMS_DEPARTEMENTS[code]
  return nom === undefined ? code : `${code} · ${nom}`
}
