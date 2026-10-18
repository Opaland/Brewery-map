/**
 * S278 (repris de Sentiers, `scripts/audit-e2e.mjs`) — ce qu'une suite e2e
 * verte peut cacher. Lancé dans la porte par `tests/unit/audit-e2e.test.ts`
 * sur `tests/e2e` (CLAUDE.md §6quater : le contrôle vit où l'action se fait).
 *
 * - une attente fixe sans sa raison sur la ligne juste au-dessus : la
 *   plupart constatent une absence sur une fenêtre de temps (§1bis), ce
 *   qu'aucun événement ne remplace, mais la raison doit se lire là ;
 * - un identifiant visé que l'application n'a plus : le sélecteur ne trouve
 *   rien, et le test peut passer pour cela même ;
 * - une assertion nue, `expect(x)` sans comparaison : elle ne vérifie rien,
 *   et le lint ne la refuse pas (mesuré le 18/10).
 */
import ts from 'typescript'

/** Les lignes (à partir de 1) d'un `waitForTimeout` sans commentaire juste au-dessus. */
export function attentesNonJustifiees(texte: string): number[] {
  const lignes = texte.split('\n')
  const relevees: number[] = []
  lignes.forEach((ligne, i) => {
    // `waitForTimeout`, espacé ou non, et `setTimeout` en promesse (revue adverse S278).
    if (!/\.\s*waitForTimeout\s*\(|new Promise\(.*setTimeout/.test(ligne)) return
    const avant = (lignes[i - 1] ?? '').trim()
    if (!avant.startsWith('//') && !avant.endsWith('*/')) relevees.push(i + 1)
  })
  return relevees
}

/**
 * Les identifiants visés par `getByTestId(…)` et `[data-testid=…]`, dans
 * l'ordre, quels que soient les guillemets et les espaces. Restent hors de
 * portée : un identifiant passé à une fonction d'aide (`estPeint(page, 'x')`)
 * et les sélecteurs par préfixe (`^=`, `*=`), absents de la suite le 18/10.
 */
export function identifiantsVises(texte: string): string[] {
  // L'un des deux groupes est vide selon la forme trouvée : le type ne le dit pas.
  return [...texte.matchAll(/getByTestId\(\s*["'`]([^"'`]+)["'`]\s*,?\s*\)|\[data-testid=["']?([^"'\]]+)["']?\]/g)].map(
    (m) => (m[1] as string | undefined) ?? (m[2] as string | undefined) ?? '',
  )
}

const echapper = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Les identifiants absents du code de l'application. Un identifiant
 * construit, `` data-testid={`theme-${valeur}`} ``, compte pour toutes ses
 * formes (`theme-clair`, `theme-sombre`…).
 */
export function identifiantsMorts(ids: readonly string[], src: string): string[] {
  const construits = [...src.matchAll(/data-testid=\{`([^`]+)`\}/g)].map(
    (m) => new RegExp(`^${m[1].split(/\$\{[^}]*\}/).map(echapper).join('[^"\'\\s]+')}$`),
  )
  return ids.filter((id) => !src.includes(`"${id}"`) && !src.includes(`'${id}'`) && !construits.some((r) => r.test(id)))
}

/**
 * Les lignes d'un `expect(x)`, `expect.soft(x)` ou `expect.poll(f)` sans
 * comparaison derrière : seul, après `await` ou `void`, suivi seulement de
 * `.not` ou `.resolves`, ou corps d'une fonction fléchée (revue adverse S278).
 */
export function assertionsNues(texte: string): number[] {
  const fichier = ts.createSourceFile('e2e.ts', texte, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const relevees: number[] = []
  const estExpect = (e: ts.Expression): boolean =>
    ts.isIdentifier(e) ? e.text === 'expect' : ts.isPropertyAccessExpression(e) && estExpect(e.expression)
  // Une chaîne qui part d'`expect(…)` et ne finit par aucun appel de comparaison.
  const nue = (e: ts.Expression): boolean => {
    if (ts.isAwaitExpression(e) || ts.isVoidExpression(e) || ts.isParenthesizedExpression(e)) return nue(e.expression)
    if (ts.isCallExpression(e)) return estExpect(e.expression)
    return ts.isPropertyAccessExpression(e) && nue(e.expression)
  }
  const visiter = (n: ts.Node): void => {
    const e = ts.isExpressionStatement(n) ? n.expression : ts.isArrowFunction(n) && !ts.isBlock(n.body) ? n.body : undefined
    if (e !== undefined && nue(e)) relevees.push(fichier.getLineAndCharacterOfPosition(e.getStart()).line + 1)
    ts.forEachChild(n, visiter)
  }
  visiter(fichier)
  return relevees
}
