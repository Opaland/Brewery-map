/**
 * S277 — juger la réponse d'un service et dire, au matin, lequel est tombé.
 * Pure : la sonde elle-même (`outils/sonde-services.ts`) fait les requêtes.
 */

/** Un service dont Mousse de Poche dépend, et ce que doit contenir sa réponse. */
export interface ServiceSonde {
  nom: string
  /** Une requête fixe : aucune position de personne (§0). */
  url: string
  /** Un fragment du début de la réponse, lu en latin-1 (une image PNG commence par « PNG »). */
  attendu: string
}

/** Ce que la sonde a reçu : un statut et le début du corps, ou une erreur. */
export type Reponse = { statut: number; debut: string } | { erreur: string }

export type Verdict = { ok: true } | { ok: false; raison: string }

export const DELAI_DEPASSE = 'délai dépassé'

export function jugerReponse(service: ServiceSonde, r: Reponse): Verdict {
  if ('erreur' in r) return { ok: false, raison: r.erreur === DELAI_DEPASSE ? DELAI_DEPASSE : `réseau : ${r.erreur}` }
  if (r.statut < 200 || r.statut >= 300) return { ok: false, raison: `HTTP ${String(r.statut)}` }
  if (!r.debut.includes(service.attendu)) return { ok: false, raison: 'contenu inattendu' }
  return { ok: true }
}

/** Le bilan à lire : chaque panne par son nom, son hôte et sa raison. */
export function bilanDesSondes(resultats: readonly { service: ServiceSonde; verdict: Verdict }[]): { texte: string; code: 0 | 1 } {
  const lignes = resultats.map(({ service, verdict }) => {
    const qui = `${service.nom} (${new URL(service.url).hostname})`
    return verdict.ok ? `- ✅ ${qui}` : `- ❌ ${qui} : ${verdict.raison}`
  })
  const pannes = resultats.filter((r) => !r.verdict.ok).length
  const tete =
    pannes === 0
      ? `Sonde des services : tout répond (${String(resultats.length)}).`
      : `Sonde des services : ${String(pannes)} en panne sur ${String(resultats.length)}.`
  return { texte: [tete, '', ...lignes].join('\n'), code: pannes === 0 ? 0 : 1 }
}
