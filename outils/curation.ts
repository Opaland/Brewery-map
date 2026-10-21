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
 *   npx tsx outils/curation.ts diff curation/lot-XX.json   (avec l'aperçu de chaque fiche, S300)
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
 *
 *   npx tsx outils/curation.ts trier
 *     S265 : trie tous les lots par la règle de Cédric du 18/10
 *     (docs/DECISIONS.md) et écrit curation/decision-regle.md. Une
 *     proposition acceptée que controler ne relit pas sans écart est montrée.
 *     Écrit `data/breweries.json`. **Seulement avec l'accord écrit de Cédric,
 *     numéro par numéro** (CLAUDE.md §0). L'empreinte est celle du diff qu'il
 *     a lu : si le lot a changé depuis, l'écriture est refusée (revue code
 *     S11).
 */
import { closeSync, existsSync, mkdirSync, mkdtempSync, openSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  appliquerLot,
  diffLisible,
  extraitSurLaPage,
  ficheDuSignalement,
  formaterDonnees,
  lireLot,
  lireNumeros,
  lotSuivant,
  nomDuNumero,
  numerosDuLot,
  numeroSurLaPage,
  contactSurLaPage,
  horairesSurLaPage,
  revuesDesFichiers,
  estUneRequeteDeCommune,
  GEOCODEUR,
} from '../src/core/curation'
import { normaliser } from '../src/core/recherche'
import { apercuDuNumero } from '../src/apercu'
import * as React from 'react'
import { centreConfirme } from '../src/core/candidats'
import { BRIGNAIS } from '../src/core/distance'
import { validerBrasseries } from '../src/core/schema'

import { empreinte, fichiersDeLots, lireTexte } from './lots'
import { sansLesAppliquees, trierParRegle, type LotNomme } from '../src/core/regle'
import { execFileSync } from 'node:child_process'
import { TSX_CLI } from './tsx'
import { accordSchema, nomDAccord } from '../src/core/garde-donnees'
import { fetchCompte } from './requetes'
import { supprimerSync } from './supprimer'

// `tsx` ne lit que le tsconfig.json de la racine, qui n'a pas d'options
// (références de projets) : il compile les composants de l'aperçu (S300) en
// `React.createElement`, qui cherche un `React` global. Sans cette ligne :
// « React is not defined » (vu le 19/10, `tests/unit/outil-curation.test.ts`).
Object.assign(globalThis, { React })

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

/** Les numéros acceptés écrits par Cédric (`lireNumeros`, testé en pur), ou l'arrêt en code 2. */
function numeros(texte: string | undefined, total: number): number[] {
  const lu = lireNumeros(texte, total)
  if (!lu.ok) sortir(lu.erreur, 2)
  return lu.numeros
}

/**
 * Le centre IGN d'une position se relit dans la réponse de sa requête de
 * commune, déjà lue parmi les sources (S268 pour les propositions, S269 pour
 * les fiches nouvelles : une seule fonction, §4).
 */
function centreRelu(
  sources: readonly string[],
  page: (url: string) => string | undefined,
  point: { d: string; c: string; lat: number; lon: number },
): boolean {
  const requete = sources.find(estUneRequeteDeCommune)
  if (requete === undefined) return false
  try {
    return centreConfirme(JSON.parse(page(requete) ?? 'null'), point, point)
  } catch {
    return false
  }
}

async function controler(chemin: string | undefined) {
  const { lot: l } = lot(chemin)
  let echecs = 0
  for (const [i, p] of l.propositions.entries()) {
    const pages = new Map<string, string>()
    for (const url of p.sources) {
      try {
        const r = await fetchCompte(url, { redirect: 'follow' })
        pages.set(url, r.ok ? (await r.text()).replace(/<[^>]*>/g, ' ') : '')
        console.log(`${String(i + 1)}. ${p.n} — ${url} : ${String(r.status)}`)
        if (!r.ok) echecs++
      } catch (e) {
        console.log(`${String(i + 1)}. ${p.n} — ${url} : injoignable (${String(e)})`)
        echecs++
      }
    }
    // S268 : le centre IGN se relit au géocodeur, pour la commune de la fiche ;
    // celle où elle va, si elle déménage (S322).
    if (p.changements.coordPrecision === 'centre') {
      const fiche = donnees().find((b) => b.n === p.n)
      const { lat, lon } = p.changements
      const c = p.changements.c ?? fiche?.c
      const d = p.changements.d ?? fiche?.d
      const ok = c !== undefined && d !== undefined && lat !== undefined && lon !== undefined && centreRelu(p.sources, (u) => pages.get(u), { d, c, lat, lon })
      console.log(`${String(i + 1)}. ${p.n} — centre IGN de ${c ?? '?'} : ${ok ? 'confirmé' : 'ABSENT'}`)
      if (!ok) echecs++
    }
    // S322 : une fiche qui déménage à une adresse : le géocodeur cité la place
    // bien dans sa nouvelle commune (revue adverse S322 : un point à Paris
    // passait).
    if (p.changements.c !== undefined && p.changements.coordPrecision === 'address') {
      const requete = p.sources.find((u) => u.startsWith(GEOCODEUR))
      const villes = (() => {
        try {
          const r = JSON.parse(pages.get(requete ?? '') ?? 'null') as { features?: { properties?: { city?: string } }[] } | null
          return (r?.features ?? []).slice(0, 1).map((x) => normaliser(x.properties?.city ?? ''))
        } catch {
          return []
        }
      })()
      const ok = villes.includes(normaliser(p.changements.c))
      console.log(`${String(i + 1)}. ${p.n} — adresse dans ${p.changements.c} : ${ok ? 'confirmée' : 'ABSENTE'}`)
      if (!ok) echecs++
    }
    const tel = p.changements.contact?.tel
    if (tel !== undefined) {
      const source = p.changements.contact?.source ?? ''
      const trouve = numeroSurLaPage(tel, pages.get(source) ?? '')
      console.log(`${String(i + 1)}. ${p.n} — ${tel} sur ${source} : ${trouve ? 'trouvé' : 'ABSENT'}`)
      if (!trouve) echecs++
    }
    // S63 : les horaires proposés pour une fiche existante se relisent aussi
    // sur la page de leur bloc ; seuls ceux des fiches nouvelles l'étaient (S262).
    for (const bloc of p.changements.horaires ?? []) {
      const absentes = horairesSurLaPage(bloc, pages.get(bloc.source) ?? '')
      console.log(`${String(i + 1)}. ${p.n} — horaires (${bloc.nature}) sur ${bloc.source} : ${absentes.length === 0 ? 'trouvés' : `ABSENTS (${absentes.join(', ')})`}`)
      echecs += absentes.length
    }
  }
  // Les fiches nouvelles (S247) : chaque source répond, et l'extrait est
  // sur la page de `src`. Avant, un lot d'ajouts passait « sans écart »
  // sans qu'aucune page soit ouverte.
  const base = l.propositions.length
  for (const [i, a] of (l.ajouts ?? []).entries()) {
    const n = `${String(base + i + 1)}. ${a.fiche.n}`
    const lues = new Map<string, string>()
    for (const url of a.sources) {
      try {
        const r = await fetchCompte(url, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (MousseDePoche-curation)' } })
        const page = r.ok ? await r.text() : ''
        lues.set(url, page)
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
          // S262 : chaque heure d'un bloc d'horaires se relit sur la page du bloc.
          for (const bloc of (a.fiche.horaires ?? []).filter((b) => b.source === url)) {
            const absentes = horairesSurLaPage(bloc, page)
            console.log(`${n} — horaires (${bloc.nature}) sur ${url} : ${absentes.length === 0 ? 'trouvés' : `ABSENTS (${absentes.join(', ')})`}`)
            echecs += absentes.length
          }
        }
      } catch (e) {
        console.log(`${n} — ${url} : injoignable (${String(e)})`)
        echecs++
      }
    }
    // S269 : le centre IGN d'une fiche nouvelle se relit comme celui d'une proposition.
    if (a.fiche.coordPrecision === 'centre') {
      const ok = centreRelu(a.sources, (u) => lues.get(u), a.fiche)
      console.log(`${n} — centre IGN de ${a.fiche.c} : ${ok ? 'confirmé' : 'ABSENT'}`)
      if (!ok) echecs++
    }
  }
  // Tout accepter doit passer : sinon « controler » rassurait quand
  // « appliquer 1-131 » échouait (revue métier S14).
  const total = numerosDuLot(l)
  const tout = appliquerLot(donnees(), l, new Set(Array.from({ length: total }, (_, i) => i + 1)))
  if (!tout.ok) {
    console.log(`Tout accepter échouerait :\n${tout.erreurs.join('\n')}`)
    echecs += tout.erreurs.length
  }
  sortir(echecs === 0 ? 'Contrôle sans écart.' : `${String(echecs)} écart(s) : à revoir avant de présenter le lot.`, echecs === 0 ? 0 : 1)
}

/** La sortie de `controler` sur un lot, qu'il passe ou non (il sort en 1 sur un écart). */
/**
 * La sortie de `controler` passe par un fichier, pas par un tube : lue dans un
 * tube, elle perdait parfois sa fin (`sortir` termine le processus avant que
 * tout soit écrit), et un lot sans écart passait « sans verdict » (S266 :
 * dep-37 puis s54, d'un tri à l'autre ; écrite dans un fichier, la sortie de
 * s54 était entière trois fois sur trois).
 */
function controlerEnSilence(chemin: string): string {
  const dossier = mkdtempSync(join(tmpdir(), 'controler-'))
  const fichier = join(dossier, 'sortie.txt')
  try {
    const fd = openSync(fichier, 'w')
    try {
      execFileSync(process.execPath, [TSX_CLI, 'outils/curation.ts', 'controler', chemin], { stdio: ['ignore', fd, fd] })
    } catch {
      // Un écart sort en code non nul, et son verdict sur la sortie d'erreur :
      // les deux vont dans le même fichier.
    } finally {
      closeSync(fd)
    }
    return readFileSync(fichier, 'utf8')
  } finally {
    supprimerSync(dossier)
  }
}

/**
 * S265 : la règle de Cédric appliquée à tous les lots. `controler` est
 * rejoué sur chaque lot : un numéro qu'il signale (page absente, extrait,
 * contact ou heure absents) passe de « accepté » à « à montrer ».
 */
function trier(): void {
  const lots: (LotNomme & { chemin: string; empreinte: string })[] = fichiersDeLots()
    .sort()
    .flatMap((chemin) => {
      const texte = lireTexte(chemin)
      const l = lireLot(JSON.parse(texte), '9999-12-31')
      return l.ok && numerosDuLot(l.lot) > 0
        ? [{ nom: l.lot.lot, lot: l.lot, chemin, empreinte: empreinte(texte) }]
        : []
    })
  // S272 : ce qu'un accord a déjà fait entrer ne se décide plus.
  const accords = existsSync('curation/accords')
    ? readdirSync('curation/accords')
        .filter((f) => f.endsWith('.json'))
        .map((f) => {
          // Lu par le même schéma que la garde (§4) : un accord mal formé
          // qu'elle refuse ne doit pas faire sortir des lignes de la liste
          // « à montrer » (revue lead S295).
          let brut: unknown
          try {
            brut = JSON.parse(readFileSync(`curation/accords/${f}`, 'utf8'))
          } catch (e) {
            sortir(`curation/accords/${f} : JSON illisible (${String(e)})`, 1)
          }
          const lu = accordSchema.safeParse(brut)
          if (!lu.success) sortir(`curation/accords/${f} : accord illisible (${lu.error.issues.map((i) => i.message).join(' ; ')})`, 1)
          return lu.data
        })
    : []
  const tries = trierParRegle(lots, donnees())
  const { acceptees, aMontrer, appliquees } = sansLesAppliquees(tries.acceptees, tries.aMontrer, accords, new Map(lots.map((l) => [l.nom, l.empreinte])))
  for (const l of lots) {
    if (!Object.hasOwn(acceptees, l.nom) || (acceptees[l.nom] ?? []).length === 0) continue
    const nums = acceptees[l.nom] ?? []
    const sortie = controlerEnSilence(l.chemin)
    // Une sortie sans verdict (plantage, coupure) ou un échec global du lot
    // ne laisse rien accepté : tout le lot est montré (revue adverse S265).
    const sansVerdict = !/Contrôle sans écart\.|écart\(s\)/.test(sortie)
    if (sansVerdict || sortie.includes('Tout accepter échouerait')) {
      const raison = sansVerdict ? 'controler n’a pas rendu de verdict' : 'controler : tout accepter échouerait'
      for (const k of nums) {
        aMontrer.push({ lot: l.nom, numero: k, n: nomDuNumero(l.lot, k) ?? '?', raison })
      }
      acceptees[l.nom] = []
      continue
    }
    const enEcart = new Set(
      sortie
        .split('\n')
        .filter((ligne) => /ABSENT|injoignable|: [45]\d\d$/.test(ligne))
        .map((ligne) => Number(/^(\d+)\./.exec(ligne)?.[1])),
    )
    acceptees[l.nom] = nums.filter((k) => {
      if (!enEcart.has(k)) return true
      aMontrer.push({ lot: l.nom, numero: k, n: nomDuNumero(l.lot, k) ?? '?', raison: 'controler signale un écart' })
      return false
    })
  }
  const lignes = [
    '# Décision par la règle de Cédric (S265)',
    '',
    'Règle du 18/10 (`docs/DECISIONS.md`) : site officiel + contrôlé ; toutes les fiches nouvelles des lots départementaux. Rien n\'est écrit ici : chaque PR qui touche `data/` liste ses lignes.',
    '',
    '## Acceptées par la règle',
    '',
    '| Lot | Empreinte | Numéros | Nombre |',
    '|---|---|---|---:|',
    ...lots.flatMap((l) => {
      const nums = acceptees[l.nom] ?? []
      return nums.length === 0 ? [] : [`| ${l.nom} | ${l.empreinte} | ${nums.join(', ')} | ${String(nums.length)} |`]
    }),
    '',
    `## Déjà dans data/ par un accord (${String(Object.values(appliquees).reduce((s, v) => s + v.length, 0))})`,
    '',
    '| Lot | Numéros |',
    '|---|---|',
    ...Object.entries(appliquees).map(([lot, nums]) => `| ${lot} | ${nums.join(', ')} |`),
    '',
    `## À montrer à Cédric (${String(aMontrer.length)})`,
    '',
    '| Lot | N° | Fiche | Raison |',
    '|---|---:|---|---|',
    ...aMontrer.map((m) => `| ${m.lot} | ${String(m.numero)} | ${m.n} | ${m.raison} |`),
    '',
  ]
  writeFileSync('curation/decision-regle.md', lignes.join('\n'))
  const total = Object.values(acceptees).reduce((s, v) => s + v.length, 0)
  console.log(`${String(total)} acceptées, ${String(aMontrer.length)} à montrer : curation/decision-regle.md`)
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
  const d = donnees()
  // La fiche telle que la page la montrera, sous chaque numéro (S300, #57).
  const maintenant = new Date()
  const apercu = (k: number) => apercuDuNumero(d, l, k, maintenant)
  sortir(`${diffLisible(d, l, undefined, apercu)}\n\nEmpreinte du lot : ${e}`, 0)
} else if (commande === 'controler') {
  await controler(args[0])
} else if (commande === 'appliquer') {
  const { lot: l, empreinte: e } = lot(args[0])
  const acceptes = numeros(args[1], numerosDuLot(l))
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
} else if (commande === 'trier') {
  trier()
} else {
  sortir(
    'usage : lot [taille] | signalement "<titre>" | diff <lot> | controler <lot> | appliquer <lot> <1,2,…> [--ecrire <empreinte>] | trier',
    2,
  )
}
