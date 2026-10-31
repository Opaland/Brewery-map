import { z } from './zod'
import { appliquerLot, formaterDonnees, lireLot, type Lot } from './curation'
import { validerBrasseries } from './schema'

/**
 * La garde de `data/` (S230, revue d'architecture R2) : le fichier de données
 * doit être **exactement** le fichier fourni par Cédric le 15/10, auquel on
 * rejoue ses accords écrits, dans l'ordre de leurs noms. Une ligne venue
 * d'ailleurs — à la main, d'un agent, d'un lot accepté à moitié — fait
 * échouer la CI. Elle vit là où le fichier entre dans `main` (§6quater).
 *
 * Elle prouve que chaque ligne vient d'un accord enregistré ; que l'accord
 * vienne de Cédric, rien ne le garantit mécaniquement : CODEOWNERS demande sa
 * revue sans l'imposer (sa décision du 31/10, #209), et une PR exécute sa propre
 * version de cette garde.
 */
export const accordSchema = z
  .object({
    /** Le nom du lot (`lot` de son fichier JSON). */
    lot: z.string().min(1),
    /** L'empreinte du lot que Cédric a lu (`outils/curation.ts diff`). */
    empreinte: z.string().regex(/^[0-9a-f]{12}$/),
    acceptees: z.array(z.number().int().positive()).min(1),
    date: z.iso.date(),
    /** Ses mots, recopiés : « j'accepte 1, 3 et 4 ». */
    parole: z.string().trim().min(1),
  })
  .strict()

/**
 * Le fichier fourni par Cédric le 15/10 : le commit qui l'a versé, et son
 * SHA-256. Un test vérifie qu'il commence par l'empreinte que « Quoi de
 * neuf ? » fixe déjà (`nouveautes.ts`) : déplacer la base demande de changer
 * les deux (revue adverse S230, §4ter).
 */
export const BASE_DE_DONNEES = {
  commit: '31cbd21001c3ead2735b3a9f3be63f5acc021519',
  sha256: 'f683cca8c5f69ef300b7b13b5fd2d837aea88332523f651945d4a0d65f9933a9',
} as const

/**
 * Le nom du fichier d'un accord : l'instant d'écriture, en UTC à la seconde,
 * puis le lot. L'ordre des noms est l'ordre d'acceptation, même deux fois le
 * même jour (revue adverse S230 : « 2026-10-17-a » passait avant
 * « 2026-10-17-b » accepté plus tôt).
 */
export function nomDAccord(instant: Date, lot: string): string {
  const t = instant.toISOString().slice(0, 19).replace(/[-:]/g, '').replace('T', '-')
  return `${t}-${lot}.json`
}

export interface AccordLu {
  /** Le nom du fichier (`nomDAccord`), qui fixe l'ordre de rejeu. */
  nom: string
  accord: unknown
  /** Le lot visé, tel qu'il est dans `curation/` aujourd'hui, et son empreinte. */
  lot: { lot: Lot; empreinte: string } | undefined
  /** Absent mais présent dans `curation/` : pourquoi le schéma d'aujourd'hui ne le lit plus. */
  illisible?: string | undefined
}

/**
 * Les lots de `curation/`, par nom (revue d'architecture S295). Un lot que
 * le schéma d'aujourd'hui ne lit plus est dit **illisible**, avec sa raison :
 * la garde disait « introuvable », ce qui égarait. Deux fichiers d'un même
 * nom sont des **doublons** : le dernier lu gagnait sans bruit. Un JSON qui
 * n'a pas de champ `lot` (candidats OSM bruts, sorties d'outils) n'est pas
 * un lot.
 */
export function indexerLots(
  fichiers: readonly { chemin: string; texte: string }[],
  empreinte: (texte: string) => string,
): {
  lots: Map<string, { lot: Lot; empreinte: string; chemin: string }>
  illisibles: Map<string, string>
  doublons: string[]
} {
  const lots = new Map<string, { lot: Lot; empreinte: string; chemin: string }>()
  const illisibles = new Map<string, string>()
  const doublons: string[] = []
  const chemins = new Map<string, string>()
  for (const { chemin, texte } of fichiers) {
    let brut: unknown
    try {
      brut = JSON.parse(texte)
    } catch {
      continue
    }
    const nom = typeof brut === 'object' && brut !== null && 'lot' in brut && typeof brut.lot === 'string' ? brut.lot : undefined
    if (nom === undefined) continue
    // Un nom déjà vu est un doublon, que l'un des deux soit lisible ou non
    // (revue adverse S295).
    const deja = chemins.get(nom)
    if (deja !== undefined) {
      doublons.push(`lot « ${nom} » : ${deja} et ${chemin}`)
      continue
    }
    chemins.set(nom, chemin)
    const l = lireLot(brut, '9999-12-31')
    if (!l.ok) {
      illisibles.set(nom, l.erreurs.join(' ; '))
      continue
    }
    lots.set(nom, { lot: l.lot, empreinte: empreinte(texte), chemin })
  }
  return { lots, illisibles, doublons }
}

export function verifierDonnees(
  base: string,
  accords: readonly AccordLu[],
  actuel: string,
): { ok: true } | { ok: false; erreurs: string[] } {
  const v = validerBrasseries(JSON.parse(base))
  if (!v.ok) return { ok: false, erreurs: ['le fichier de base ne passe pas le schéma'] }
  let fiches = v.brasseries
  const erreurs: string[] = []
  for (const a of [...accords].sort((x, y) => (x.nom < y.nom ? -1 : x.nom > y.nom ? 1 : 0))) {
    const lu = accordSchema.safeParse(a.accord)
    if (!lu.success) {
      erreurs.push(`${a.nom} : accord illisible (${lu.error.issues.map((i) => i.path.join('.')).join(', ')})`)
      continue
    }
    if (a.lot === undefined) {
      erreurs.push(
        a.illisible === undefined
          ? `${a.nom} : lot « ${lu.data.lot} » introuvable dans curation/`
          : `${a.nom} : lot « ${lu.data.lot} » illisible avec le schéma d’aujourd’hui (${a.illisible})`,
      )
      continue
    }
    if (a.lot.empreinte !== lu.data.empreinte) {
      erreurs.push(`${a.nom} : le lot a changé depuis l'accord (empreinte ${a.lot.empreinte}, accord ${lu.data.empreinte})`)
      continue
    }
    const r = appliquerLot(fiches, a.lot.lot, new Set(lu.data.acceptees))
    if (!r.ok) {
      erreurs.push(...r.erreurs.map((e) => `${a.nom} : ${e}`))
      continue
    }
    fiches = r.brasseries
  }
  if (erreurs.length > 0) return { ok: false, erreurs }
  return formaterDonnees(fiches) === actuel
    ? { ok: true }
    : { ok: false, erreurs: ['data/breweries.json diffère de ce que donnent le fichier du 15/10 et les accords de Cédric'] }
}
