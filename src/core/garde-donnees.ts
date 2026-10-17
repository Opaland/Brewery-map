import { z } from './zod'
import { appliquerLot, formaterDonnees, type Lot } from './curation'
import { validerBrasseries } from './schema'

/**
 * La garde de `data/` (S230, revue d'architecture R2) : le fichier de données
 * doit être **exactement** le fichier fourni par Cédric le 15/10, auquel on
 * rejoue ses accords écrits, dans l'ordre de leurs noms. Une ligne venue
 * d'ailleurs — à la main, d'un agent, d'un lot accepté à moitié — fait
 * échouer la CI. Elle vit là où le fichier entre dans `main` (§6quater).
 *
 * Elle prouve que chaque ligne vient d'un accord enregistré ; que l'accord
 * vienne de Cédric, c'est CODEOWNERS et la revue de la PR qui le garantissent.
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

export interface AccordLu {
  /** Le nom du fichier, qui fixe l'ordre : `AAAA-MM-JJ-<lot>.json`. */
  nom: string
  accord: unknown
  /** Le lot visé, tel qu'il est dans `curation/` aujourd'hui, et son empreinte. */
  lot: { lot: Lot; empreinte: string } | undefined
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
  for (const a of [...accords].sort((x, y) => x.nom.localeCompare(y.nom))) {
    const lu = accordSchema.safeParse(a.accord)
    if (!lu.success) {
      erreurs.push(`${a.nom} : accord illisible (${lu.error.issues.map((i) => i.path.join('.')).join(', ')})`)
      continue
    }
    if (a.lot === undefined) {
      erreurs.push(`${a.nom} : lot « ${lu.data.lot} » introuvable dans curation/`)
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
