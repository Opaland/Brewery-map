/**
 * L'outil de curation (S11), en ligne de commande :
 *
 *   npx tsx outils/curation.ts lot 25 [--veille]
 *     Les 25 fiches « À confirmer » à revoir ensuite (jamais vérifiées
 *     d'abord, puis les plus anciennes ; à égalité, les plus proches de
 *     Brignais). Avec --veille (S15) : toutes catégories.
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
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import {
  appliquerLot,
  diffLisible,
  extraitSurLaPage,
  ficheDuSignalement,
  formaterDonnees,
  lireLot,
  lotSuivant,
  numeroSurLaPage,
  contactSurLaPage,
  revuesDesFichiers,
} from '../src/core/curation'
import { BRIGNAIS } from '../src/core/distance'
import { validerBrasseries } from '../src/core/schema'

import { empreinte } from './lots'
import { nomDAccord } from '../src/core/garde-donnees'

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



function lot(chemin: string | undefined) {
  if (chemin === undefined) sortir('chemin du lot attendu', 2)
  const texte = readFileSync(chemin, 'utf8')
  const l = lireLot(JSON.parse(texte), AUJOURDHUI)
  if (!l.ok) sortir(`${chemin} : lot invalide\n${l.erreurs.join('\n')}`, 1)
  return { lot: l.lot, empreinte: empreinte(texte) }
}

/**
 * « 1,3,4 » ou « 1-12,15 » et rien d'autre : ni « 0x1 », ni « 1.0 », ni
 * espaces (revue code S11) ; une plage va du plus petit au plus grand (S14 :
 * un lot de découverte compte des dizaines de fiches).
 */
function numeros(texte: string | undefined, total: number): number[] {
  const morceau = '\\d+(?:-\\d+)?'
  if (texte === undefined || !new RegExp(`^${morceau}(?:,${morceau})*$`).test(texte)) {
    sortir('numéros acceptés attendus, ex. « 1,3,4 » ou « 1-12,15 »', 2)
  }
  return texte.split(',').flatMap((m) => {
    const [debut = 0, fin = debut] = m.split('-').map(Number)
    if (fin < debut) sortir(`plage à l'envers : « ${m} »`, 2)
    // Bornée au lot : « 1-999999999 » saturait la mémoire (revue code S14).
    if (fin > total) sortir(`« ${m} » dépasse le lot, qui compte ${String(total)} numéros`, 2)
    return Array.from({ length: fin - debut + 1 }, (_, i) => debut + i)
  })
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
  // Les fiches nouvelles (S247) : chaque source répond, et l'extrait est
  // sur la page de `src`. Avant, un lot d'ajouts passait « sans écart »
  // sans qu'aucune page soit ouverte.
  const base = l.propositions.length
  for (const [i, a] of (l.ajouts ?? []).entries()) {
    const n = `${String(base + i + 1)}. ${a.fiche.n}`
    for (const url of a.sources) {
      try {
        const r = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (MousseDePoche-curation)' } })
        const page = r.ok ? await r.text() : ''
        console.log(`${n} — ${url} : ${String(r.status)}`)
        if (!r.ok) echecs++
        else {
          if (url === a.fiche.src) {
            const lu = extraitSurLaPage(a.extrait, page)
            console.log(`${n} — extrait sur ${url} : ${lu ? 'trouvé' : 'ABSENT'}`)
            if (!lu) echecs++
          }
          // S261 : le contact se relit sur sa propre page.
          if (a.fiche.contact !== undefined && url === a.fiche.contact.source) {
            const { absents, parLaPageMeme } = contactSurLaPage(a.fiche.contact, page)
            const meme = parLaPageMeme.length === 0 ? '' : ` ; ${parLaPageMeme.join(', ')} = la page lue elle-même`
            console.log(`${n} — contact sur ${url} : ${absents.length === 0 ? 'trouvé' : `ABSENT (${absents.join(', ')})`}${meme}`)
            echecs += absents.length
          }
        }
      } catch (e) {
        console.log(`${n} — ${url} : injoignable (${String(e)})`)
        echecs++
      }
    }
  }
  // Tout accepter doit passer : sinon « controler » rassurait quand
  // « appliquer 1-131 » échouait (revue métier S14).
  const total = l.propositions.length + (l.ajouts ?? []).length
  const tout = appliquerLot(donnees(), l, new Set(Array.from({ length: total }, (_, i) => i + 1)))
  if (!tout.ok) {
    console.log(`Tout accepter échouerait :\n${tout.erreurs.join('\n')}`)
    echecs += tout.erreurs.length
  }
  sortir(echecs === 0 ? 'Contrôle sans écart.' : `${String(echecs)} écart(s) : à revoir avant de présenter le lot.`, echecs === 0 ? 0 : 1)
}

const [commande, ...args] = process.argv.slice(2)

/** Les fiches déjà revues par les lots de `curation/` ; échoue en nommant le fichier fautif. */
function dejaRevues(brasseries: readonly { n: string }[]): Set<string> {
  let fichiers: string[]
  try {
    // Les candidats OSM bruts (`osm-<date>.json`, S14) ne sont pas des lots.
    fichiers = readdirSync('curation').filter((f) => f.endsWith('.json') && !f.startsWith('osm-'))
  } catch {
    return new Set()
  }
  const lus = fichiers.map((nom) => {
    try {
      return { nom, contenu: JSON.parse(readFileSync(`curation/${nom}`, 'utf8')) as unknown }
    } catch (e) {
      return sortir(`curation/${nom} : JSON illisible (${String(e)})`, 1)
    }
  })
  const r = revuesDesFichiers(lus, new Set(brasseries.map((b) => b.n)))
  if (!r.ok) sortir(`fiches déjà revues illisibles :\n${r.erreurs.join('\n')}`, 1)
  return r.revues
}

if (commande === 'lot') {
  const taille = Number(args[0] ?? '25')
  if (!Number.isInteger(taille) || taille < 1) sortir('taille entière attendue', 2)
  const d = donnees()
  const veille = args.includes('--veille')
  sortir(lotSuivant(d, taille, BRIGNAIS, dejaRevues(d), { toutes: veille }).join('\n'), 0)
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
  const acceptes = numeros(args[1], l.propositions.length + (l.ajouts ?? []).length)
  // Tout argument en trop est une erreur : « 1 3 » n'appliquait que la 1 (revue S12).
  const options = args.slice(2)
  const ecrire = options[0] === '--ecrire' && options.length <= 2
  if (options.length > 0 && !ecrire) sortir('après les numéros, seulement « --ecrire <empreinte> » ; numéros séparés par des virgules', 2)
  const r = appliquerLot(donnees(), l, new Set(acceptes))
  if (!r.ok) sortir(`refusé :\n${r.erreurs.join('\n')}`, 1)
    const i = args.indexOf('--ecrire')
  if (i !== -1) {
    if (args[i + 1] !== e) sortir(`empreinte attendue après --ecrire : celle du diff lu par Cédric (lot actuel : ${e})`, 1)
    // L'accord s'écrit avec les données : la garde de la CI (S230) rejoue les
    // accords sur le fichier du 15/10 et refuse toute ligne sans accord.
    const parole = process.env.PAROLE_DE_CEDRIC?.trim() ?? ''
    if (parole === '') sortir('PAROLE_DE_CEDRIC attendue : ses mots, recopiés (« j’accepte 1, 3 et 4 »)', 1)
    const accord = { lot: l.lot, empreinte: e, acceptees: acceptes, date: AUJOURDHUI, parole }
    mkdirSync('curation/accords', { recursive: true })
    const fichier = `curation/accords/${nomDAccord(new Date(), l.lot)}`
    if (existsSync(fichier)) sortir(`${fichier} existe déjà : relancer dans une seconde`, 1)
    writeFileSync(fichier, `${JSON.stringify(accord, null, 2)}\n`, { flag: 'wx' })
    writeFileSync(DONNEES, formaterDonnees(r.brasseries))
    sortir(`${DONNEES} écrit : proposition(s) ${acceptes.join(', ')} du lot ${l.lot} (${e}), accord enregistré.`, 0)
  }
  sortir(`${diffLisible(donnees(), l, new Set(acceptes))}\n\n(rien n'est écrit : --ecrire ${e}, après l'accord de Cédric)`, 0)
} else {
  sortir(
    'usage : lot [taille] | signalement "<titre>" | diff <lot> | controler <lot> | appliquer <lot> <1,2,…> [--ecrire <empreinte>]',
    2,
  )
}
