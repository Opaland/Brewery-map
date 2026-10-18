/**
 * « Quoi de neuf ? » (S44) : ce qui a changé dans l'application, et dans
 * les fiches vérifiées. Écrit à la main, sprint après sprint ; rien n'y est
 * inventé : chaque ligne renvoie à un sprint de `docs/SPRINTS.md`.
 *
 * Les fiches : `data/breweries.json` change par les accords de Cédric
 * (`curation/accords/`, S266). L'empreinte ci-dessous est vérifiée par un test
 * (`tests/unit/nouveautes.test.ts`) : changer une fiche sans mettre à jour
 * cette phrase fait échouer la porte (CLAUDE.md §4ter).
 */
export const DONNEES = {
  /** Les 16 premiers caractères du SHA-256 de `data/breweries.json`. */
  empreinte: 'a90bf7660edf8f50',
  phrase:
    'Fiches vérifiées : 44 complétées le 18 octobre 2026, d’après leur propre site ; 139 placées au centre de leur commune selon l’IGN, faute d’adresse vérifiée ; 192 brasseries ajoutées en Normandie, en Bretagne, dans les Pays de la Loire et en Indre-et-Loire.',
} as const

export interface Nouveaute {
  /** AAAA-MM-JJ. */
  date: string
  texte: string
}

/** Les plus récentes d'abord. */
export const NOUVEAUTES: readonly Nouveaute[] = [
  { date: '2026-10-18', texte: 'Les Pays de la Loire et l’Indre-et-Loire sur la carte : 75 brasseries.' },
  { date: '2026-10-18', texte: 'La Bretagne sur la carte : 81 brasseries des Côtes-d’Armor, du Finistère, d’Ille-et-Vilaine et du Morbihan.' },
  { date: '2026-10-18', texte: 'La Normandie sur la carte : 36 brasseries du Calvados, de l’Eure, de la Manche, de l’Orne et de Seine-Maritime.' },
  { date: '2026-10-18', texte: 'Sans adresse vérifiée, une brasserie est placée au centre de sa commune selon l’IGN, et sa fiche le dit.' },
  { date: '2026-10-18', texte: 'Sites, téléphones, horaires, bières et positions à l’adresse ajoutés à 44 brasseries, relus sur leur propre site.' },
  { date: '2026-10-17', texte: 'Les communes de France se cherchent hors connexion dès l’installation.' },
  { date: '2026-10-17', texte: 'Sur la carte, le point de départ reste visible, et le groupe qui contient la brasserie choisie est cerclé.' },
  { date: '2026-10-17', texte: 'Une affichette avec QR code, à imprimer depuis chaque fiche, pour le comptoir des brasseries.' },
  { date: '2026-10-17', texte: 'Sauvegarder favoris, carnet et notes dans un fichier, pour changer d’appareil.' },
  { date: '2026-10-17', texte: 'Une note personnelle par brasserie, gardée sur l’appareil.' },
  { date: '2026-10-17', texte: 'Mon carnet : « J’y suis allé·e », et le filtre « pas encore visitées ».' },
  { date: '2026-10-17', texte: 'Partager sa tournée en image.' },
  { date: '2026-10-17', texte: 'Sur téléphone, toucher un marqueur montre un aperçu dans la carte.' },
  { date: '2026-10-17', texte: 'Sur téléphone, la liste vient d’abord ; les filtres moins utilisés sont repliés.' },
]
