/**
 * S325 — les points rendus par Wikidata (`outils/communes.ts`), une ligne
 * CSV par commune : `code INSEE,Point(longitude latitude)`. Rend
 * [latitude, longitude] par code. Un nombre peut s'écrire en notation
 * scientifique (`-2.77777E-4`, près du méridien de Greenwich) : 8 communes
 * restaient sans point tant que cette écriture n'était pas lue (vu le 21/10).
 */
const NOMBRE = String.raw`-?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?`
const LIGNE = new RegExp(String.raw`^([0-9AB]{5}),Point\((${NOMBRE}) (${NOMBRE})\)`)

export function lirePointsWikidata(csv: string): Map<string, [number, number]> {
  const points = new Map<string, [number, number]>()
  for (const ligne of csv.split('\n').slice(1)) {
    const m = LIGNE.exec(ligne.trim())
    if (m?.[1] !== undefined && !points.has(m[1])) points.set(m[1], [Number(m[3]), Number(m[2])])
  }
  return points
}
