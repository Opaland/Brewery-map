# Architecture

> Format repris de BMAD (`docs/METHODE.md`). Décrit l'état au 18/10/2026
> (après S295, revue lead : le fichier était resté à S29). Une story qui
> change une frontière ci-dessous met ce fichier à jour ; `/revue-sprint`
> le demande.

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

- **`src/core/`** : la logique pure, sans DOM, en TDD (`tests/unit/`).
  - L'écran : schéma (`schema.ts`), recherche, distances, origine,
    préférences, horaires, fiche, bières, itinéraire, tournée, partage,
    filtres, signalement, sauvegarde, persistance, nouveautés, QR.
  - La curation : `curation.ts` (lots, `appliquerLot`), `regle.ts` (la
    règle du 18/10), `garde-donnees.ts`, `candidats.ts`, `decouverte.ts`,
    `osm-france.ts`, `osm-etiquettes.ts`, `completude.ts` (S295),
    `requetes.ts`, `sonde.ts`.
- **`src/*.tsx`** : l'interface React.
  - `App` tient l'état.
  - La liste et la fiche : `Liste`, `Contact`, `Horaires`, `YAller`,
    `Bieres`, `LienExterne` (tout lien sortant, S295), `EnFrancais` (les
    textes des fiches quand l'interface est en anglais, S295).
  - La carte : `Carte` (MapLibre, chargée à l'approche par
    `CarteDifferee`).
  - Le reste : `PointDeDepart`, `ChoixCommune`, `MesFavoris`,
    `FiltreType`, `Sauvegarde`, `Affichette`, `ImageTournee`, `Installer`,
    `MiseAJour` ; les crochets dans `crochets.ts`.
- **`src/stockage.ts`** : IndexedDB (`mousse-de-poche`, magasin
  `reglages`). Il garde les réglages, les favoris, le carnet des visites et
  les notes ; jamais la position, seulement le choix « autour de moi ». Ils
  passent d'un onglet à l'autre par `BroadcastChannel`. Le thème a un
  miroir dans `localStorage` (`src/theme.ts`), lu avant le premier rendu.
- **`public/sw.js`** : le service worker.
  - Le précache est complet ou rien (`build/precache-sw.ts`) ; un fichier
    haché déjà dans un cache précédent est repris sans réseau (S295).
  - Le réseau d'abord, mais 4 s au plus quand le cache a le fichier
    (S295) ; repli sur le cache en cas de 404.
  - Les tuiles : 600 au plus, la moins récemment vue part la première ;
    « Tout effacer » les retire (`src/cacheTuiles.ts`).
  - Un bandeau dit qu'une nouvelle version est prête.

## 4. Les frontières de confidentialité

Ce qui part sur le réseau (vérifié par `tests/e2e/securite.spec.ts` et
`docs/AUDIT.md`) :
- **les tuiles** `tile.openstreetmap.org`, au zoom 14 au plus : la zone,
  à quelques kilomètres près ;
- **la liste des communes de la région du point de départ**, demandée à ce
  site ; avec « Autour de moi », le fichier de toute la France, le même
  pour tous (`src/communesFrance.ts`) ;
- **les liens sortants** que la personne touche (Y aller, signaler,
  partager) : ils ne portent que la fiche.

Rien d'autre. La politique de sécurité du contenu (`build/csp.ts`) ne
permet aucun autre hôte.

**Condition posée à S294** (revue d'architecture S295, AR3) : charger les
fiches par département ne doit rien dire de la position. Avec « Autour de
moi », l'ensemble et l'ordre des fichiers demandés ne dépendent pas de la
position (tout par le précache, ou un ordre fixe). Un e2e compare les
requêtes pour deux positions éloignées et les trouve identiques. La fixture
`tests/e2e/position.ts` ne cherche que des coordonnées : elle ne verrait
pas une requête `/donnees/69.json`. Le découpage se fait **au build**
(AR8) : `data/breweries.json` reste la source relue et gardée.

**Fait en S294 (20/10)** : deux parts seulement. Le premier écran porte la
région du départ par défaut (Auvergne-Rhône-Alpes) ; la suite, tout le
reste, est **un seul fichier, le même pour tous, toujours demandé** juste
après le premier rendu. La condition est tenue par construction, et
`tests/e2e/fiches-en-deux.spec.ts` compare les requêtes depuis Lyon et
depuis Brest (vu rouge quand la suite dépend de la position).

## 5. La qualité, mécanique

- **La porte** : lint, `tsc -b`, vitest, build, Playwright (Pixel 7). Elle
  tourne dans le hook avant chaque commit (`.claude/hooks/`) et dans la CI
  (`.github/workflows/ci.yml`).
- **Après le déploiement** : `tests/e2e/page-deployee.spec.ts` sonde la
  page publiée.
- **Les agents** :
  - `relecteur-adverse` ;
  - `relecteur-de-persona` ;
  - `relecteur-de-promesses` ;
  - `chasseur-de-jumeaux` ;
  - `verificateur-de-tests` ;
  - `verificateur-de-brasserie`.
- **Les skills** :
  - `porte` ;
  - `revue-sprint` ;
  - `revue-globale` ;
  - `lot-de-curation` ;
  - `veille` ;
  - `preparer-story`.
