/**
 * La campagne départementale (S340, epic E36) : les commandes qui enchaînent
 * les outils existants pour faire entrer un département sur la carte. L'ordre
 * des gestes, agents compris, est dans `.claude/skills/campagne-departement/SKILL.md`.
 *
 *   npx tsx outils/campagne.ts preparer 03 15
 *     Candidats SIRENE et OSM (`departement.ts candidats`), puis les paquets
 *     des agents : `curation/campagne/<dép>-paquets.json` et ce qui n'a rien
 *     à chercher, avec sa raison : `curation/campagne/<dép>-raisons.json`.
 *
 *   npx tsx outils/campagne.ts rendre 03 "l'Allier" S341
 *     Après les agents : les lectures relues sont dans
 *     `curation/campagne/<dép>-lus.json`, les raisons complétées dans
 *     `<dép>-raisons.json`. Géocode (`departement.ts lectures`), assemble le
 *     lot, le contrôle (`curation.ts controler`, arrêt sur un écart) et écrit
 *     `curation/dep-<dép>.md`.
 *
 *   npx tsx outils/campagne.ts relancer 21-r2
 *     (S356) Les candidats du passage précédent (`dep-21`) dont la raison dit
 *     « à relancer » : `curation/dep-21-r2-candidats.json` et ses paquets. La
 *     relance a son lot à elle, `dep-21-r2`, que `rendre` et `appliquer`
 *     prennent comme un département : réécrire `dep-21.json`, déjà appliqué,
 *     ferait rougir la garde de `data/`.
 *
 *   npx tsx outils/campagne.ts appliquer 03 15
 *     Applique chaque lot entier par la règle de Cédric du 21/10, puis retire
 *     de la couche OSM ce qui est devenu une fiche, régénère la complétude et
 *     lance la garde de `data/`. Les chiffres écrits (README, ETAT, « Quoi de
 *     neuf ») restent à mettre à jour : les tests les réclament.
 *
 * N'écrit `data/` que par `curation.ts appliquer`, avec l'accord de la règle.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { candidatsARelancer, compteRenduDuLot, lotDepartemental, paquetsDeCandidats, type LotDepartemental } from '../src/core/campagne'
import type { CandidatEnCause } from '../src/core/candidats'
import { TSX_CLI } from './tsx'

/** Les mots de Cédric qui fondent l'application (`docs/DECISIONS.md`, « Règle de Cédric du 21/10 »). */
export const PAROLE_REGLE_21_10 =
  'Règle de Cédric du 21/10 (docs/DECISIONS.md) : « pour les modifs ou création de fiche » « si tu trouve les infos sur google par exemple ne me demande pas la persommission de la fiche » ; « pour les bières l’info est sur untapp ». Étendue le même jour aux déménagements, fermetures et portables : « tout oui, et ta règle couvre aussi ça ».'

const DOSSIER = 'curation/campagne'
const lancer = (outil: string, args: readonly string[], env: NodeJS.ProcessEnv = process.env): string =>
  execFileSync(process.execPath, [TSX_CLI, outil, ...args], { encoding: 'utf8', env })
const lireJson = (chemin: string): unknown => JSON.parse(readFileSync(chemin, 'utf8'))
const departementValide = (d: string) => lotDepartemental(d)?.dep === d
/** Un département, ou une relance (`21-r2`, S356) : `rendre` et `appliquer` prennent l'un comme l'autre. */
const lotValide = (d: string) => lotDepartemental(d) !== null

function preparer(deps: readonly string[]): void {
  mkdirSync(DOSSIER, { recursive: true })
  for (const dep of deps) {
    lancer('outils/departement.ts', ['candidats', dep])
    const candidats = lireJson(`curation/dep-${dep}-candidats.json`) as CandidatEnCause[]
    const { paquets, sansRecherche } = paquetsDeCandidats(candidats)
    writeFileSync(`${DOSSIER}/${dep}-paquets.json`, `${JSON.stringify(paquets, null, 1)}\n`)
    const raisons = Object.fromEntries(sansRecherche.map((r) => [r.cle, r.raison]))
    writeFileSync(`${DOSSIER}/${dep}-raisons.json`, `${JSON.stringify(raisons, null, 1)}\n`)
    console.log(`${dep} : ${String(candidats.length)} candidats, ${String(paquets.length)} paquets, ${String(sansRecherche.length)} sans rien à chercher`)
  }
}

/** Le passage d'avant : `21` pour `21-r2`, `21-r2` pour `21-r3`. */
function relancer({ dep, id }: LotDepartemental): void {
  // Une relance déjà lancée garde ses raisons, que les agents ont rédigées (revue adverse S356).
  if (existsSync(`curation/dep-${id}-candidats.json`)) throw new Error(`curation/dep-${id}-candidats.json existe déjà : la relance ${id} est commencée`)
  const n = Number(id.slice(-1))
  const avant = n === 2 ? dep : `${dep}-r${String(n - 1)}`
  const candidats = lireJson(`curation/dep-${avant}-candidats.json`) as CandidatEnCause[]
  const raisons = lireJson(`${DOSSIER}/${avant}-raisons.json`) as Record<string, string>
  const lus = (lireJson(`${DOSSIER}/${avant}-lus.json`) as { cle: string }[]).map((l) => l.cle)
  const aRelancer = candidatsARelancer(candidats, raisons, lus)
  const { paquets, sansRecherche } = paquetsDeCandidats(aRelancer)
  writeFileSync(`curation/dep-${id}-candidats.json`, `${JSON.stringify(aRelancer, null, 1)}\n`)
  writeFileSync(`${DOSSIER}/${id}-paquets.json`, `${JSON.stringify(paquets, null, 1)}\n`)
  const raisonsNeuves = Object.fromEntries(sansRecherche.map((r) => [r.cle, r.raison]))
  writeFileSync(`${DOSSIER}/${id}-raisons.json`, `${JSON.stringify(raisonsNeuves, null, 1)}\n`)
  console.log(`${id} : ${String(aRelancer.length)} candidats à relancer, ${String(paquets.length)} paquets`)
}

function rendre(dep: string, nom: string, sprint: string): void {
  const lus = `${DOSSIER}/${dep}-lus.json`
  if (!existsSync(lus)) throw new Error(`${lus} manque : les lectures relues des agents`)
  // Une lecture retirée de `lus` ne doit pas survivre d'un passage précédent
  // (vu en S341 : le Léman, retiré, restait dans le lot). `unlinkSync`, et non
  // `rmSync`, muet dans un chemin accentué sous Node 24 (W9).
  const dossierDesLectures = `curation/dep-${dep}-lectures`
  if (existsSync(dossierDesLectures)) {
    for (const f of readdirSync(dossierDesLectures)) unlinkSync(`${dossierDesLectures}/${f}`)
  }
  lancer('outils/departement.ts', ['lectures', dep, lus])
  lancer('outils/departement.ts', ['assembler', dep])
  const controle = lancer('outils/curation.ts', ['controler', `curation/dep-${dep}.json`])
  if (!controle.includes('Contrôle sans écart')) {
    console.error(controle)
    throw new Error(`dep-${dep} : le contrôle a des écarts, à régler avant le compte rendu`)
  }
  const lectures = lireJson(lus) as { cle: string; cat: number }[]
  const md = compteRenduDuLot({
    dep,
    nomDuDepartement: nom,
    sprint,
    candidats: lireJson(`curation/dep-${dep}-candidats.json`) as CandidatEnCause[],
    lus: lectures.map((l) => l.cle),
    categories: lectures.map((l) => l.cat),
    raisons: lireJson(`${DOSSIER}/${dep}-raisons.json`) as Record<string, string>,
    diff: lancer('outils/curation.ts', ['diff', `curation/dep-${dep}.json`]),
  })
  writeFileSync(`curation/dep-${dep}.md`, md)
  console.log(`curation/dep-${dep}.md écrit ; ${/Empreinte du lot : \w+/.exec(md)?.[0] ?? 'empreinte introuvable'}`)
}

function appliquer(deps: readonly string[]): void {
  const env = { ...process.env, PAROLE_DE_CEDRIC: PAROLE_REGLE_21_10 }
  for (const dep of deps) {
    const lot = lireJson(`curation/dep-${dep}.json`) as { ajouts?: unknown[]; propositions: unknown[] }
    const n = (lot.ajouts?.length ?? 0) + lot.propositions.length
    if (n === 0) {
      console.log(`dep-${dep} : rien à appliquer`)
      continue
    }
    // L'empreinte du compte rendu écrit par `rendre`, celui qu'on a relu : si le
    // lot a bougé depuis, `curation.ts appliquer` refuse (revue adverse S340).
    const md = `curation/dep-${dep}.md`
    if (!existsSync(md)) throw new Error(`${md} manque : lancer \`rendre\` d'abord`)
    const empreinte = /Empreinte du lot : (\w+)/.exec(readFileSync(md, 'utf8'))?.[1]
    if (empreinte === undefined) throw new Error(`${md} : empreinte introuvable`)
    const numeros = Array.from({ length: n }, (_, i) => String(i + 1)).join(',')
    console.log(lancer('outils/curation.ts', ['appliquer', `curation/dep-${dep}.json`, numeros, '--ecrire', empreinte], env).trim())
  }
  console.log(lancer('outils/osm-retirer.ts', []).trim().split('\n').at(-1))
  console.log(lancer('outils/completude.ts', ['--ecrire']).trim())
  console.log(lancer('outils/garde-donnees.ts', []).trim())
}

const [commande, ...args] = process.argv.slice(2)
const relance = lotDepartemental(args[0] ?? '')
if (commande === 'preparer' && args.length > 0 && args.every(departementValide)) preparer(args)
else if (commande === 'relancer' && args.length === 1 && relance !== null && relance.id !== relance.dep) relancer(relance)
else if (commande === 'rendre' && args.length === 3 && lotValide(args[0] ?? '')) rendre(args[0] ?? '', args[1] ?? '', args[2] ?? '')
else if (commande === 'appliquer' && args.length > 0 && args.every(lotValide)) appliquer(args)
else {
  console.error('usage : npx tsx outils/campagne.ts preparer <dép…> | relancer <dép>-r2 | rendre <dép>[-r2] "<nom>" <Sxxx> | appliquer <dép>[-r2]…')
  process.exit(2)
}
