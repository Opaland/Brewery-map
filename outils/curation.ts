/**
 * L'outil de curation (S11), en ligne de commande :
 *
 *   npx tsx outils/curation.ts lot 25
 *     Les 25 fiches « À confirmer » à revoir ensuite (jamais vérifiées
 *     d'abord, puis les plus anciennes ; à égalité, les plus proches de
 *     Brignais).
 *
 *   npx tsx outils/curation.ts signalement "Signalement : Nom (Commune)"
 *     La fiche visée par le titre d'une issue de signalement (S10).
 *
 *   npx tsx outils/curation.ts diff curation/lot-XX.json
 *     Valide le lot et l'affiche en Markdown, numéroté, avec son empreinte :
 *     ce que Cédric lit.
 *
 *   npx tsx outils/curation.ts controler curation/lot-XX.json
 *     Rouvre chaque source : la page répond-elle, le numéro proposé y
 *     figure-t-il ? Ne remplace pas la relecture des extraits.
 *
 *   npx tsx outils/curation.ts appliquer curation/lot-XX.json 1,3,4
 *     Vérifie que les propositions 1, 3 et 4 donnent un fichier valide et
 *     affiche ce qui changerait. **N'écrit rien.**
 *
 *   npx tsx outils/curation.ts appliquer curation/lot-XX.json 1,3,4 --ecrire <empreinte>
 *     Écrit `data/breweries.json`. **Seulement avec l'accord écrit de Cédric,
 *     numéro par numéro** (CLAUDE.md §0). L'empreinte est celle du diff qu'il
 *     a lu : si le lot a changé depuis, l'écriture est refusée (revue code
 *     S11).
 */
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import {
  appliquerLot,
  diffLisible,
  ficheDuSignalement,
  formaterDonnees,
  lireLot,
  lotSuivant,
  numeroSurLaPage,
} from '../src/core/curation'
import { BRIGNAIS } from '../src/core/distance'
import { validerBrasseries } from '../src/core/schema'

const DONNEES = 'data/breweries.json'
const AUJOURDHUI = new Date().toISOString().slice(0, 10)

function sortir(message: string, code: number): never {
  ;(code === 0 ? console.log : console.error)(message)
  process.exit(code)
}

function donnees() {
  const v = validerBrasseries(JSON.parse(readFileSync(DONNEES, 'utf8')))
  if (!v.ok) sortir(`${DONNEES} est invalide :\n${v.erreurs.join('\n')}`, 1)
  return v.brasseries
}

/** Les 12 premiers caractères du SHA-256 du fichier du lot, tel qu'écrit. */
const empreinte = (texte: string) => createHash('sha256').update(texte).digest('hex').slice(0, 12)

function lot(chemin: string | undefined) {
  if (chemin === undefined) sortir('chemin du lot attendu', 2)
  const texte = readFileSync(chemin, 'utf8')
  const l = lireLot(JSON.parse(texte), AUJOURDHUI)
  if (!l.ok) sortir(`${chemin} : lot invalide\n${l.erreurs.join('\n')}`, 1)
  return { lot: l.lot, empreinte: empreinte(texte) }
}

/** « 1,3,4 » et rien d'autre : ni « 0x1 », ni « 1.0 », ni espaces (revue code S11). */
function numeros(texte: string | undefined): number[] {
  if (texte === undefined || !/^\d+(,\d+)*$/.test(texte)) sortir('numéros acceptés attendus, ex. « 1,3,4 »', 2)
  return texte.split(',').map(Number)
}

async function controler(chemin: string | undefined) {
  const { lot: l } = lot(chemin)
  let echecs = 0
  for (const [i, p] of l.propositions.entries()) {
    const pages = new Map<string, string>()
    for (const url of p.sources) {
      try {
        const r = await fetch(url, { redirect: 'follow' })
        pages.set(url, r.ok ? (await r.text()).replace(/<[^>]*>/g, ' ') : '')
        console.log(`${String(i + 1)}. ${p.n} — ${url} : ${String(r.status)}`)
        if (!r.ok) echecs++
      } catch (e) {
        console.log(`${String(i + 1)}. ${p.n} — ${url} : injoignable (${String(e)})`)
        echecs++
      }
    }
    const tel = p.changements.contact?.tel
    if (tel !== undefined) {
      const source = p.changements.contact?.source ?? ''
      const trouve = numeroSurLaPage(tel, pages.get(source) ?? '')
      console.log(`${String(i + 1)}. ${p.n} — ${tel} sur ${source} : ${trouve ? 'trouvé' : 'ABSENT'}`)
      if (!trouve) echecs++
    }
  }
  sortir(echecs === 0 ? 'Contrôle sans écart.' : `${String(echecs)} écart(s) : à revoir avant de présenter le lot.`, echecs === 0 ? 0 : 1)
}

const [commande, ...args] = process.argv.slice(2)

/** Les fiches déjà revues par les lots de `curation/`, avec ou sans proposition. */
function dejaRevues(): Set<string> {
  const noms = new Set<string>()
  let fichiers: string[]
  try {
    fichiers = readdirSync('curation').filter((f) => f.endsWith('.json'))
  } catch {
    return noms
  }
  for (const f of fichiers) {
    const brut = JSON.parse(readFileSync(`curation/${f}`, 'utf8')) as Record<string, unknown>
    // curation/revues.json : { "<lot>": [noms…] } pour les lots d'avant le champ « revues ».
    const listes = f === 'revues.json' ? Object.values(brut) : [brut.revues, (brut.propositions as { n: string }[] | undefined)?.map((p) => p.n)]
    for (const l of listes) if (Array.isArray(l)) for (const n of l) if (typeof n === 'string') noms.add(n)
  }
  return noms
}

if (commande === 'lot') {
  const taille = Number(args[0] ?? '25')
  if (!Number.isInteger(taille) || taille < 1) sortir('taille entière attendue', 2)
  sortir(lotSuivant(donnees(), taille, BRIGNAIS, dejaRevues()).join('\n'), 0)
} else if (commande === 'signalement') {
  const n = ficheDuSignalement(args[0] ?? '', donnees())
  sortir(n ?? 'aucune fiche : titre retouché ou fiche inconnue, à rattacher à la main', n === null ? 1 : 0)
} else if (commande === 'diff') {
  const { lot: l, empreinte: e } = lot(args[0])
  sortir(`${diffLisible(donnees(), l)}\n\nEmpreinte du lot : ${e}`, 0)
} else if (commande === 'controler') {
  await controler(args[0])
} else if (commande === 'appliquer') {
  const { lot: l, empreinte: e } = lot(args[0])
  const acceptes = numeros(args[1])
  // Tout argument en trop est une erreur : « 1 3 » n'appliquait que la 1 (revue S12).
  const options = args.slice(2)
  const ecrire = options[0] === '--ecrire' && options.length <= 2
  if (options.length > 0 && !ecrire) sortir('après les numéros, seulement « --ecrire <empreinte> » ; numéros séparés par des virgules', 2)
  const r = appliquerLot(donnees(), l, new Set(acceptes))
  if (!r.ok) sortir(`refusé :\n${r.erreurs.join('\n')}`, 1)
  const i = args.indexOf('--ecrire')
  if (i !== -1) {
    if (args[i + 1] !== e) sortir(`empreinte attendue après --ecrire : celle du diff lu par Cédric (lot actuel : ${e})`, 1)
    writeFileSync(DONNEES, formaterDonnees(r.brasseries))
    sortir(`${DONNEES} écrit : proposition(s) ${acceptes.join(', ')} du lot ${l.lot} (${e}).`, 0)
  }
  sortir(`${diffLisible(donnees(), l, new Set(acceptes))}\n\n(rien n'est écrit : --ecrire ${e}, après l'accord de Cédric)`, 0)
} else {
  sortir(
    'usage : lot [taille] | signalement "<titre>" | diff <lot> | controler <lot> | appliquer <lot> <1,2,…> [--ecrire <empreinte>]',
    2,
  )
}
