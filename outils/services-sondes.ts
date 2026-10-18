import type { ServiceSonde } from '../src/core/sonde'

/**
 * S277 — les services dont Mousse de Poche dépend, sondés chaque nuit
 * (`.github/workflows/sonde-nuit.yml`). Chaque URL est fixe : une commune
 * publique (Brignais, le départ par défaut), une tuile de niveau 0, une
 * requête de statut ; aucune position de personne (CLAUDE.md §0).
 *
 * Les deux premiers servent la page ; les autres, les outils de curation.
 * Chaque hôte de la politique de sécurité de la page doit y être
 * (`tests/unit/sonde.test.ts`).
 */
export const SERVICES: readonly ServiceSonde[] = [
  { nom: 'Page publiée', url: 'https://opaland.github.io/Brewery-map/', attendu: 'Mousse de Poche' },
  { nom: 'Tuiles de la carte (OpenStreetMap)', url: 'https://tile.openstreetmap.org/0/0/0.png', attendu: 'PNG' },
  {
    nom: 'Géocodeur IGN (positions, centres de commune)',
    url: 'https://data.geopf.fr/geocodage/search?q=Brignais&type=municipality&limit=1',
    attendu: 'Brignais',
  },
  {
    nom: 'Overpass, miroir français (couche OpenStreetMap)',
    url: 'https://overpass.openstreetmap.fr/api/interpreter?data=%5Bout%3Ajson%5D%3Bnode(1)%3Bout%3B',
    attendu: '"elements"',
  },
  { nom: 'Nominatim (communes des points OSM)', url: 'https://nominatim.openstreetmap.org/status?format=json', attendu: '"OK"' },
  {
    nom: 'Recherche d’entreprises (SIRENE, lots départementaux)',
    url: 'https://recherche-entreprises.api.gouv.fr/search?q=brasserie&per_page=1',
    attendu: '"results"',
  },
  {
    nom: 'Wikidata (points des communes)',
    url: 'https://query.wikidata.org/sparql?query=ASK%7B%7D&format=json',
    attendu: '"boolean"',
  },
]
