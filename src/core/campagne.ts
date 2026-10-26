import type { CandidatEnCause } from './candidats'

/**
 * S340 — la campagne départementale (E36) : ce que S328 a fait à la main pour
 * le Centre-Val de Loire, en fonctions pures. Les commandes sont dans
 * `outils/campagne.ts`, l'ordre des gestes dans le skill
 * `.claude/skills/campagne-departement/SKILL.md`.
 */

/** Ce qu'un agent `verificateur-de-brasserie` reçoit d'un candidat : jamais un nom de personne ni un SIREN. */
export interface CandidatPourAgent {
  cle: string
  enseigne: string
  dep: string
  communes: string[]
  adresses: string[]
  osm: string[]
  site?: string
  statut: string
}

const RIEN_A_CHERCHER = 'entreprise sans nom ni adresse : rien à chercher'

/**
 * Les candidats en paquets de cinq au plus (un paquet par agent, comme le
 * skill `lot-de-curation`). Une entreprise individuelle sans enseigne,
 * adresse, point OSM ni site est mise à part : la chercher obligerait à
 * passer par le nom d'une personne (S328 l'a fait à la main dix fois).
 */
export function paquetsDeCandidats(
  candidats: readonly CandidatEnCause[],
  taille = 5,
): { paquets: CandidatPourAgent[][]; sansRecherche: { cle: string; raison: string }[] } {
  if (!Number.isInteger(taille) || taille < 1) throw new Error(`taille de paquet invalide : ${String(taille)}`)
  const sansRecherche: { cle: string; raison: string }[] = []
  const aLire: CandidatPourAgent[] = []
  for (const c of candidats) {
    const rien = c.nom === null && c.adresses.length === 0 && c.osm.length === 0 && c.site === undefined
    if (rien) {
      sansRecherche.push({ cle: c.cle, raison: RIEN_A_CHERCHER })
      continue
    }
    const enseigne = c.personne
      ? c.nom === null
        ? 'entrepreneur individuel sans enseigne : cherche par l’adresse, ne recopie aucun nom de personne'
        : `${c.nom} (entrepreneur individuel : ne recopie jamais le nom de la personne ni son SIREN)`
      : (c.nom ?? '(sans nom au registre)')
    aLire.push({
      cle: c.cle,
      enseigne,
      dep: c.departement,
      communes: [...c.communes],
      adresses: [...c.adresses],
      osm: [...c.osm],
      ...(c.site === undefined ? {} : { site: c.site }),
      statut: c.statut,
    })
  }
  const paquets: CandidatPourAgent[][] = []
  for (let i = 0; i < aLire.length; i += taille) paquets.push(aLire.slice(i, i + taille))
  return { paquets, sansRecherche }
}

/**
 * S356 — l'identifiant d'un lot départemental : le département seul, ou
 * suivi d'un passage `-r2` à `-r9` pour une relance. Une relance a son lot à
 * elle : la garde de `data/` rejoue chaque accord sur le lot tel qu'il est
 * dans `curation/`, et réécrire `dep-21.json` la ferait rougir.
 */
export interface LotDepartemental {
  dep: string
  id: string
  lot: string
}

export function lotDepartemental(id: string): LotDepartemental | null {
  const m = /^(\d{2}|2[AB])(-r[2-9])?$/.exec(id)
  return m?.[1] === undefined ? null : { dep: m[1], id, lot: `dep-${id}` }
}

/** `dep-21.json`, `dep-21-r2.json` : le fichier d'un lot départemental (lu par `osm-retirer`). */
export function estFichierDeLotDepartemental(fichier: string): boolean {
  const m = /^dep-(.+)\.json$/.exec(fichier)
  return m?.[1] !== undefined && lotDepartemental(m[1]) !== null
}

/**
 * S356 — les candidats d'un passage précédent dont la raison dit qu'ils sont
 * « à relancer » (quota épuisé, site en panne, source trop faible ce
 * jour-là). Un candidat lu, donc devenu une fiche, n'y revient jamais.
 */
export function candidatsARelancer(
  candidats: readonly CandidatEnCause[],
  raisons: Readonly<Record<string, string>>,
  lus: readonly string[],
): CandidatEnCause[] {
  const dejaLus = new Set(lus)
  return candidats.filter((c) => !dejaLus.has(c.cle) && /relancer/i.test(raisons[c.cle] ?? ''))
}

const LIBELLES = ['« acheter et consommer »', '« acheter seulement »', '« pas de vente »', '« à confirmer »'] as const

/**
 * L'en-tête du compte rendu d'un lot départemental, puis le diff de l'outil.
 * Chaque candidat est lu (`lus`, ses clés) ou expliqué (`raisons`) : un
 * oubli fait échouer, avec la clé en cause (S328 : une raison manquait).
 */
export function compteRenduDuLot(e: {
  dep: string
  nomDuDepartement: string
  sprint: string
  candidats: readonly CandidatEnCause[]
  /** Les clés des candidats lus et proposés. */
  lus: readonly string[]
  /** La catégorie de chaque fiche proposée (0 à 3). */
  categories: readonly number[]
  raisons: Readonly<Record<string, string>>
  /** La sortie de `outils/curation.ts diff`. */
  diff: string
}): string {
  // Garde-fous (revue adverse S340) : un décompte faux passait sans bruit.
  const cles = new Set(e.candidats.map((c) => c.cle))
  const lus = new Set(e.lus)
  if (lus.size !== e.lus.length) throw new Error('une lecture en double dans `lus`')
  const etrangeres = e.lus.filter((c) => !cles.has(c))
  if (etrangeres.length > 0) throw new Error(`lectures hors des candidats : ${etrangeres.join(', ')}`)
  if (e.categories.length !== e.lus.length || e.categories.some((c) => !Number.isInteger(c) || c < 0 || c > 3))
    throw new Error('une catégorie par lecture, de 0 à 3')
  const non = e.candidats.filter((c) => !lus.has(c.cle))
  const oublies = non.filter((c) => e.raisons[c.cle] === undefined).map((c) => c.cle)
  if (oublies.length > 0) throw new Error(`candidats ni lus ni expliqués : ${oublies.join(', ')}`)
  const compte = [0, 0, 0, 0]
  for (const cat of e.categories) compte[cat] = (compte[cat] ?? 0) + 1
  const n = e.lus.length
  const s = n > 1 ? 's' : ''
  const lignes = [
    `# Lot dep-${e.dep} — ${e.nomDuDepartement} (${e.sprint})`,
    '',
    `Ce lot ajoute **${String(n)} fiche${s} nouvelle${s}**, par la règle de Cédric du 21/10 (\`docs/DECISIONS.md\`).`,
    '',
    `**Décompte** : ${String(e.candidats.length)} candidats = ${String(n)} proposés + ${String(non.length)} non proposés (tableau ci-dessous).`,
    `Catégories proposées : ${String(compte[1])} ${LIBELLES[0]}, ${String(compte[2])} ${LIBELLES[1]}, ${String(compte[3])} ${LIBELLES[2]}, ${String(compte[0])} ${LIBELLES[3]}.`,
    '',
    '**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.',
    '',
    '**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.',
    '',
    '## Non proposés, et pourquoi',
    '',
    '| Candidat | Raison |',
    '|---|---|',
    ...non.map((c) => `| ${c.personne ? 'Entreprise individuelle' : (c.nom ?? '(sans nom)')} (\`${c.cle}\`) | ${e.raisons[c.cle] ?? ''} |`),
    '',
    '## Les fiches proposées',
    '',
  ]
  return `${lignes.join('\n')}\n${e.diff.replace(/\r\n/g, '\n')}`
}
