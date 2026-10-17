# Architecture

> Format repris de BMAD (`docs/METHODE.md`). Décrit l'état au 17/10/2026
> (après S29). Une story qui change une frontière ci-dessous met ce fichier
> à jour.

## 1. En une phrase

Une application web progressive **sans serveur**. Elle est servie en
fichiers statiques par GitHub Pages. Données, recherche, distances et
réglages vivent dans le navigateur.

## 2. Les données, de la source à l'écran

| Source | Fichier | Qui l'écrit | Validation |
|---|---|---|---|
| Fiches vérifiées | `data/breweries.json` | Cédric seul (§0) ; les agents proposent dans `curation/` | `src/core/schema.ts` (Zod), **dans le build** (`build/valider-donnees.ts`) : un fichier invalide ne se publie pas |
| Brasseries OpenStreetMap | `src/donnees-osm/brasseries-osm.json` (ODbL) | `outils/osm-france.ts` (Overpass, filtres, pays vérifié) | `validerDonneesOsm`, au build |
| Communes de France | `public/communes-france.json`, `public/communes/` | `outils/communes.ts` (INSEE via Etalab, points Wikidata) | au build |

La couche OSM est **à part** de `data/`, chargée par import dynamique avant
le premier rendu (`main.tsx`, attente de 3 s au plus), puis marquée « À
confirmer ».

### La garde de `data/` (S230)

`data/breweries.json` doit être exactement le fichier fourni le 15/10 (relu
dans git, empreinte fixée), auquel on rejoue les accords écrits de Cédric
(`curation/accords/`). `outils/garde-donnees.ts` le vérifie en CI à chaque
push et chaque PR ; `.github/CODEOWNERS` désigne Cédric pour `data/` et les
accords.

## 3. Le code

- **`src/core/`** : la logique pure, sans DOM, en TDD (`tests/unit/`) :
  schéma, recherche, distances, origine, préférences, horaires, fiche,
  itinéraire, tournée, partage, filtres, curation.
- **`src/*.tsx`** : l'interface React.
  - `App` tient l'état.
  - `Liste`, `Carte` (MapLibre, chargée à l'approche par `CarteDifferee`),
    `PointDeDepart`, `MesFavoris`, `FiltreType`, `Installer`, `MiseAJour`.
- **`src/stockage.ts`** : IndexedDB (`mousse-de-poche`, magasin
  `reglages`). Il garde les réglages et les favoris ; jamais la position,
  seulement le choix « autour de moi ». Les favoris passent d'un onglet à
  l'autre par `BroadcastChannel`.
- **`public/sw.js`** : le service worker. Le précache est complet ou rien
  (`build/precache-sw.ts`). Il se replie sur la page en cas de 404 et
  affiche un bandeau quand une nouvelle version est prête.

## 4. Les frontières de confidentialité

Ce qui part sur le réseau (vérifié par `tests/e2e/securite.spec.ts` et
`docs/AUDIT.md`) :
- **les tuiles** `tile.openstreetmap.org`, au zoom 14 au plus : la zone,
  à quelques kilomètres près ;
- **la liste des communes d'une région**, demandée à ce site ;
- **les liens sortants** que la personne touche (Y aller, signaler,
  partager) : ils ne portent que la fiche.

Rien d'autre. La politique de sécurité du contenu (`build/csp.ts`) ne
permet aucun autre hôte.

## 5. La qualité, mécanique

- **La porte** : lint, `tsc -b`, vitest, build, Playwright (Pixel 7). Elle
  tourne dans le hook avant chaque commit (`.claude/hooks/`) et dans la CI
  (`.github/workflows/ci.yml`).
- **Après le déploiement** : `tests/e2e/page-deployee.spec.ts` sonde la
  page publiée.
- **Les agents** :
  - `relecteur-adverse` ;
  - `relecteur-de-persona` ;
  - `verificateur-de-tests` ;
  - `verificateur-de-brasserie`.
- **Les skills** :
  - `porte` ;
  - `revue-sprint` ;
  - `revue-globale` ;
  - `lot-de-curation` ;
  - `veille` ;
  - `preparer-story`.
