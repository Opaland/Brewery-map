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
  empreinte: 'eab5778b05cb8706',
  phrase:
    'Fiches vérifiées : 151 complétées les 18 et 19 octobre 2026, d’après leur propre site ; 212 placées au centre de leur commune selon l’IGN, faute d’adresse vérifiée ; 214 brasseries ajoutées en Normandie, en Bretagne, dans les Pays de la Loire et en Centre-Val de Loire.',
} as const

export interface Nouveaute {
  /** AAAA-MM-JJ. */
  date: string
  texte: string
}

/** Les plus récentes d'abord. */
export const NOUVEAUTES: readonly Nouveaute[] = [
  { date: '2026-10-21', texte: 'Deux brasseries de plus marquées fermées, La Valentinoise et Plouc, d’après l’annuaire officiel des entreprises ; trois brasseries qui ont déménagé sont à leur nouvelle adresse : Animus à Grigny-sur-Rhône, Paille à Lournand, Vellavia à Saint-Germain-Laprade.' },
  { date: '2026-10-21', texte: '11 brasseries gagnent une adresse, un téléphone, un site, des horaires ou des bières, lus sur leur site ou une page publique : la Divatte (bar et boutique, horaires, huit bières), Trip-Hop, Nomade Brewery, Grésiv’ale, Kan Mêm, La Couleuvre, Chartreuse, Manev’Ale, la Brasserie de Chanaz, RUN’HARD et 3B ; 7 autres, une note sur ce que disent leurs sources.' },
  { date: '2026-10-21', texte: '22 brasseries ajoutées : 19 dans le Loiret, le Loir-et-Cher, le Cher, l’Indre et l’Eure-et-Loir, et 3 en Bretagne et en Touraine, d’après leur site, un office de tourisme ou Untappd.' },
  { date: '2026-10-20', texte: "Sept brasseries que l’annuaire officiel des entreprises dit cessées sont marquées fermées ; trois brasseries qui ont déménagé sont à leur nouvelle adresse : La Gaudine à Marlhes, les Croqueurs de Lune à Serrières-en-Chautagne, Biercors à Villard-de-Lans." },
  { date: '2026-10-20', texte: "Adresses ajoutées à 5 brasseries autour de Lyon (Ninkasi Brignais, Ninkasi Saint-Étienne, Malting Pot, L’Affoleuse, Brasserie de l’Ours Barbu), lues sur leur propre site ; téléphone et horaires pour Ninkasi Brignais." },
  { date: '2026-10-20', texte: "La fiche dit une fois ce qu’elle ne sait pas encore, avec où le chercher, au lieu de le répéter dans chaque partie ; d’où vient chaque information tient en une phrase." },
  { date: '2026-10-19', texte: 'Les jours fériés : un 15 août ou une Toussaint, la fiche ne dit plus « ouvert » d’après des horaires ordinaires, mais « sous réserve », en nommant le jour.' },
  { date: '2026-10-19', texte: 'Le filtre « Ouvertes ce week-end », d’après les horaires publiés ; il dit combien de brasseries il peut juger.' },
  { date: '2026-10-19', texte: 'Un favori absent de la liste dit pourquoi : trop loin, catégorie décochée, déjà visitée…' },
  { date: '2026-10-19', texte: 'Les horaires d’une saison : un bar d’été montre ses horaires avec leur période, et ne se dit jamais « ouvert » hors saison (La Grange du Seigneur, Philomenn, Mélusine).' },
  { date: '2026-10-19', texte: '10 fiches retirées : ni Untappd, ni site, ni registre des entreprises ne connaissent une brasserie de ce nom dans leur commune (méthode de Cédric du 19/10).' },
  { date: '2026-10-19', texte: 'Sites, téléphones, horaires et bières ajoutés à 20 brasseries du Rhône, de la Loire, de l’Isère, de Savoie, d’Ardèche, de l’Ain et du Finistère, relus sur leur propre site ; 8 sortent de « À confirmer ».' },
  { date: '2026-10-19', texte: 'Sites, téléphones, horaires et bières ajoutés à 22 brasseries de Bretagne, de Vendée, de Loire-Atlantique et de Normandie, relus sur leur propre site.' },
  { date: '2026-10-19', texte: 'Sites, téléphones, horaires et bières ajoutés à 20 brasseries de Loire-Atlantique, de Vendée, de Bretagne et de Normandie, relus sur leur propre site.' },
  { date: '2026-10-19', texte: 'Sites, téléphones, horaires et bières ajoutés à 16 brasseries des Alpes, de l’Ouest et de Normandie, relus sur leur propre site.' },
  { date: '2026-10-19', texte: 'Sites, téléphones, horaires et bières ajoutés à 9 brasseries de la Loire, du Rhône, de l’Ain et de la Drôme, relus sur leur propre site.' },
  { date: '2026-10-19', texte: 'Sites, téléphones, horaires et bières ajoutés à 16 brasseries de plus, relus sur leur propre site ; 3 placées à leur adresse.' },
  { date: '2026-10-18', texte: 'Sites, téléphones, horaires et bières ajoutés à 15 brasseries de plus, relus sur leur propre site.' },
  { date: '2026-10-18', texte: 'Les Pays de la Loire et l’Indre-et-Loire sur la carte : 75 brasseries.' },
  { date: '2026-10-18', texte: 'La Bretagne sur la carte : 81 brasseries des Côtes-d’Armor, du Finistère, d’Ille-et-Vilaine et du Morbihan.' },
  { date: '2026-10-18', texte: 'La Normandie sur la carte : 36 brasseries du Calvados, de l’Eure, de la Manche, de l’Orne et de Seine-Maritime.' },
  { date: '2026-10-18', texte: 'Sans adresse vérifiée, une brasserie est placée au centre de sa commune selon l’IGN (13 gardent leur point d’origine, dit approximatif), et sa fiche le dit.' },
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
