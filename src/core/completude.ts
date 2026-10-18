import { libelleDepartement } from './departements'
import type { Brasserie } from './schema'

/**
 * La complétude des fiches (S295, demande de Cédric : « terminer
 * l'intégralité des fiches »). Ce qui manque à chacune, champ par champ,
 * dans l'ordre où on le cherche : d'abord une source, puis ce qu'on peut y
 * faire, puis le site, l'adresse, le téléphone, les horaires et les bières.
 *
 * « Complète » veut dire ici : aucun de ces champs ne manque. C'est une
 * mesure, pas encore une définition : une brasserie sans accueil n'aura
 * jamais d'horaires d'accueil, et le schéma ne sait pas dire « cherché,
 * introuvable ». La définition reste à Cédric (`docs/DECISIONS.md`).
 */
export const CHAMPS_COMPLETUDE = [
  { champ: 'source', manque: 'sans source', present: (b: Brasserie) => b.src !== '' },
  { champ: 'categorie', manque: 'à confirmer', present: (b: Brasserie) => b.cat !== 0 },
  { champ: 'site', manque: 'sans site', present: (b: Brasserie) => b.contact?.site !== undefined },
  { champ: 'adresse', manque: 'sans adresse vérifiée', present: (b: Brasserie) => b.coordPrecision === 'address' },
  { champ: 'telephone', manque: 'sans téléphone', present: (b: Brasserie) => b.contact?.tel !== undefined },
  { champ: 'horaires', manque: 'sans horaires', present: (b: Brasserie) => b.horaires !== undefined },
  { champ: 'bieres', manque: 'sans bières', present: (b: Brasserie) => b.beers.length > 0 },
] as const

export type ChampCompletude = (typeof CHAMPS_COMPLETUDE)[number]['champ']

export function manques(b: Brasserie): ChampCompletude[] {
  return CHAMPS_COMPLETUDE.filter((c) => !c.present(b)).map((c) => c.champ)
}

export interface Bilan {
  total: number
  completes: number
  manquent: Record<ChampCompletude, number>
}

const vide = (): Bilan => ({
  total: 0,
  completes: 0,
  manquent: Object.fromEntries(CHAMPS_COMPLETUDE.map((c) => [c.champ, 0])) as Record<ChampCompletude, number>,
})

function ajouter(bilan: Bilan, b: Brasserie): void {
  const m = manques(b)
  bilan.total += 1
  if (m.length === 0) bilan.completes += 1
  for (const champ of m) bilan.manquent[champ] += 1
}

/** Le bilan de tout le fichier, et celui de chaque département, dans l'ordre des numéros. */
export function bilanCompletude(fiches: readonly Brasserie[]): Bilan & { parDepartement: (Bilan & { d: string })[] } {
  const total = vide()
  const parD = new Map<string, Bilan>()
  for (const b of fiches) {
    ajouter(total, b)
    const d = parD.get(b.d) ?? vide()
    parD.set(b.d, d)
    ajouter(d, b)
  }
  const parDepartement = [...parD]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([d, bilan]) => ({ d, ...bilan }))
  return { ...total, parDepartement }
}

/**
 * Les fiches « À confirmer » à chercher (S295, Cédric : aucun chemin ne
 * menait d'un « À confirmer » à une fiche complète), par département, puis
 * par cause : ce qui manque, dans l'ordre de la recherche. Une fiche
 * « À confirmer » manque toujours de sa catégorie ; la liste dit le reste
 * (revue adverse S295 : « à confirmer » seul ne disait pas quoi chercher).
 */
export function aChercher(
  fiches: readonly Brasserie[],
): { n: string; c: string; d: string; cause: ChampCompletude; manquent: ChampCompletude[] }[] {
  const rang = (champ: ChampCompletude) => CHAMPS_COMPLETUDE.findIndex((c) => c.champ === champ)
  return fiches
    .filter((b) => b.cat === 0)
    .map((b) => {
      const manquent: ChampCompletude[] = manques(b).filter((m) => m !== 'categorie')
      const cause: ChampCompletude = manquent[0] ?? 'categorie'
      return { n: b.n, c: b.c, d: b.d, cause, manquent }
    })
    .sort((a, b) => a.d.localeCompare(b.d) || rang(a.cause) - rang(b.cause) || a.n.localeCompare(b.n, 'fr'))
}

const pourcent = (n: number, total: number) => (total === 0 ? '—' : `${String(Math.round((100 * n) / total))} %`)
const majuscule = (texte: string) => texte.charAt(0).toUpperCase() + texte.slice(1)
const manqueDe = (champ: ChampCompletude) => CHAMPS_COMPLETUDE.find((c) => c.champ === champ)?.manque ?? champ

/**
 * `curation/A-CHERCHER.md`, écrit par `outils/completude.ts --ecrire`. Le
 * test `completude.test.ts` refuse un fichier qui ne correspond plus à
 * `data/` : une PR de données le régénère, et le bilan suit (§6quater).
 */
export function completudeEnMarkdown(fiches: readonly Brasserie[]): string {
  const b = bilanCompletude(fiches)
  const ligne = (nom: string, x: Bilan) =>
    `| ${nom} | ${String(x.total)} | ${String(x.completes)} (${pourcent(x.completes, x.total)}) | ${CHAMPS_COMPLETUDE.map((c) => String(x.manquent[c.champ])).join(' | ')} |`
  const chercher = aChercher(fiches)
  const parD = new Map<string, typeof chercher>()
  for (const f of chercher) parD.set(f.d, [...(parD.get(f.d) ?? []), f])
  return [
    '# Les fiches à compléter',
    '',
    'Écrit par `npx tsx outils/completude.ts --ecrire` à partir de',
    '`data/breweries.json` ; ne pas modifier à la main (S295). Une PR qui',
    'change `data/` le régénère : `tests/unit/completude.test.ts` le vérifie.',
    '',
    '« Complète » veut dire ici qu’aucun des sept champs ne manque : une',
    'source, ce qu’on peut y faire, le site, une adresse vérifiée, un',
    'téléphone, des horaires et des bières. C’est une mesure, pas encore une',
    'définition : une brasserie sans accueil n’aura jamais d’horaires',
    'd’accueil. La définition revient à Cédric (`docs/DECISIONS.md`).',
    '',
    '## Le bilan',
    '',
    `| | Fiches | Complètes | ${CHAMPS_COMPLETUDE.map((c) => majuscule(c.manque)).join(' | ')} |`,
    `|---|---|---|${CHAMPS_COMPLETUDE.map(() => '---|').join('')}`,
    ligne('**Total**', b),
    ...b.parDepartement.map((d) => ligne(libelleDepartement(d.d), d)),
    '',
    '## Les « À confirmer » à chercher',
    '',
    `${String(chercher.length)} fiches, par département, puis par ce qui manque en premier. Chacune manque de ce qu’on peut y faire ; la ligne dit le reste.`,
    '',
    ...[...parD].flatMap(([d, liste]) => [
      `### ${libelleDepartement(d)}`,
      '',
      ...liste.map((f) => `- ${f.n} (${f.c}) : ${f.manquent.length === 0 ? 'tout est là, sauf ce qu’on peut y faire' : f.manquent.map(manqueDe).join(', ')}`),
      '',
    ]),
  ].join('\n')
}
