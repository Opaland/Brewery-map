/**
 * S354 (E37, repris de `scripts/essais_agents.py` d'ISTQBFinder) : les
 * contrôles automatiques des essais de bout en bout des agents. Fonctions
 * pures, testées sans lancer `claude` (`tests/unit/essais-agents.test.ts`) ;
 * le jugement de fond reste humain (`docs/ESSAIS-AGENTS.md`).
 */

/** Les rubriques attendues absentes : en gras (« **Bloquant** ») ou en titre (« ## Bloquant »). */
export function rubriquesManquantes(reponse: string, rubriques: readonly string[]): string[] {
  return rubriques.filter((r) => !reponse.includes(`**${r}**`) && !new RegExp(`^#{1,6} ${r}\\b`, 'm').test(reponse))
}

interface Bloc {
  type?: string
  name?: string
}
/** Une ligne du transcript JSONL de Claude Code, lue sans confiance. */
export type Evenement = Record<string, unknown>

/** Les outils réellement appelés par l'agent, dans l'ordre. */
export function outilsEmployes(transcript: readonly Evenement[]): string[] {
  const noms: string[] = []
  for (const e of transcript) {
    const message = e.message as { content?: unknown } | undefined
    if (!Array.isArray(message?.content)) continue
    for (const b of message.content as Bloc[]) if (b.type === 'tool_use' && typeof b.name === 'string') noms.push(b.name)
  }
  return noms
}

/** Les outils interdits que l'agent a quand même appelés (sans doublon). */
export function outilsInterdits(transcript: readonly Evenement[], interdits: readonly string[]): string[] {
  return [...new Set(outilsEmployes(transcript).filter((o) => interdits.includes(o)))]
}

export interface Reference {
  chemin: string
  ligne: number
}

/** Les références « chemin/fichier.ext:ligne » d'une réponse ; une URL n'en est pas une. */
export function referencesFichiers(reponse: string): Reference[] {
  const refs: Reference[] = []
  for (const m of reponse.matchAll(/(?<![\w/:.])((?:[\w.-]+\/)*[\w.-]+\.[a-z]{1,5}):(\d+)\b/g)) {
    const [, chemin, ligne] = m
    if (chemin !== undefined && ligne !== undefined) refs.push({ chemin, ligne: Number(ligne) })
  }
  return refs
}

/** Les références introuvables : fichier absent, ou ligne au-delà de sa fin. */
export function referencesIntrouvables(refs: readonly Reference[], lire: (chemin: string) => string | undefined): string[] {
  return refs
    .filter((r) => {
      const texte = lire(r.chemin)
      return texte === undefined || r.ligne < 1 || r.ligne > texte.split('\n').length
    })
    .map((r) => `${r.chemin}:${String(r.ligne)}`)
}

/**
 * Ce qu'un essai a changé dans le dépôt : les lignes de `git status --porcelain`
 * apparues ou disparues entre avant et après (S375, #216). Les relecteurs ont
 * `Bash`, qui peut écrire : seule la consigne les retient.
 */
export function ecartsDuDepot(avant: string, apres: string): string[] {
  const lignes = (t: string) => t.split(/\r?\n/).filter((l) => l !== '')
  const a = lignes(avant)
  const b = lignes(apres)
  return [...a.filter((l) => !b.includes(l)), ...b.filter((l) => !a.includes(l))]
}

/** Le coût cumulé a-t-il atteint le plafond ? Alors on ne lance pas l'essai suivant (S375). */
export function coutAtteint(couts: readonly number[], plafond: number): boolean {
  return couts.reduce((total, c) => total + c, 0) >= plafond
}

/**
 * Un argument pour `spawnSync` avec `shell: true` : sous Windows, `claude` est un
 * `.cmd`, le shell y est obligatoire et il coupe aux espaces. La première campagne
 * (31/10) n'a envoyé aux agents que le premier mot de leur question.
 */
export function argumentShell(argument: string, plateforme: string): string {
  return plateforme === 'win32' ? `"${argument}"` : argument
}
