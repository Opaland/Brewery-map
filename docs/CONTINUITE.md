# La continuité des services tiers (S281)

Ce dont Mousse de Poche dépend, et ce qui casse si l'un tombe. La sonde de
nuit (`.github/workflows/sonde-nuit.yml`, S277) nomme l'hôte en panne ;
cette page dit ce que la panne coûte. Repris d'ÉtapeForge
(`docs/CONTINUITE-APIS.md`).

Chaque hôte sondé a sa ligne ici : `tests/unit/continuite.test.ts` le vérifie.

## La page

Les fiches vérifiées, la couche OpenStreetMap et les communes de France
sont **dans la page elle-même** (`data/`, `src/donnees-osm/`,
`public/communes/`) : aucun service tiers n'est consulté pour les afficher.

| Service | Hôte | Sert à | S'il tombe | Ce que l'écran en dit | Repli |
|---|---|---|---|---|---|
| Page publiée (GitHub Pages) | `opaland.github.io` | Servir l'application | Une première visite est impossible | Rien : la page ne charge pas | Une application déjà ouverte une fois s'ouvre depuis son cache (`public/sw.js`) : fiches, liste, communes, carte déjà vue |
| Tuiles de la carte (OpenStreetMap) | `tile.openstreetmap.org` | Le fond de la carte | Le fond reste gris ; les brasseries restent placées, la liste est complète | « Fond de carte incomplet ou indisponible… » (`fond-absent`, `src/Carte.tsx`) | Jusqu'à 600 tuiles déjà affichées restent en cache sur l'appareil ; au-delà, les moins récemment vues partent les premières (`public/sw.js`). Une page déjà en cache s'ouvre au bout de 4 s même si le réseau se tait (S295) |

## Les outils de curation

Une panne n'atteint ni la page ni `data/` : seul un lot en préparation
s'arrête. Chaque outil reprend plusieurs fois avant d'abandonner, et dit
ses requêtes par hôte en finissant (S280).

| Service | Hôte | Sert à | S'il tombe | Ce que l'outil en dit | Repli |
|---|---|---|---|---|---|
| Géocodeur IGN | `data.geopf.fr` | Positions à l'adresse, centres de commune (S52, S268) | Aucun lot de positions ni d'ajouts départementaux | « géocodeur injoignable : … » après 8 essais (`outils/geocodeur.ts`) | Relancer plus tard ; aucun autre géocodeur n'est prévu |
| Overpass, miroir français | `overpass.openstreetmap.fr` | Extraire la couche OpenStreetMap, ses étiquettes (S25, S60) | La couche ne se met plus à jour ; l'actuelle reste en place | « … : le serveur ne répond pas » après 4 essais (`outils/overpass.ts`) | Le serveur principal coupe la connexion depuis l'environnement (16/10) : pas de repli éprouvé |
| Nominatim | `nominatim.openstreetmap.org` | Commune des points OSM, découverte (S14, S25) | Pas de nouvelle découverte, pas de commune pour un nouveau point OSM | « Nominatim 503 pour … » (`outils/decouverte.ts`, `outils/osm-france.ts`) | Relancer ; `decouverte.ts` reprend depuis son fichier (`--depuis`) |
| Recherche d'entreprises (SIRENE) | `recherche-entreprises.api.gouv.fr` | Candidats des lots départementaux (S246 →) | Pas de nouveau département | « SIRENE ne répond pas : … » après 12 essais (`outils/departement.ts`) | Les pages déjà lues sont en cache (`outils/cache/sirene`) : un lot repris ne les redemande pas |
| Wikidata | `query.wikidata.org` | Points des communes de France (S21) | Les communes ne se régénèrent plus ; les fichiers actuels restent | « Wikidata ne répond pas pour … » après 4 essais (`outils/communes.ts`) | Les fichiers de `public/communes/` sont versionnés : rien à refaire tant qu'ils ne changent pas |

## Hors de la sonde

- **Les liens qu'on suit soi-même** — guidage (Google Maps, Plans, Waze),
  Untappd, téléphone sur Google Maps, sites des brasseries : une
  navigation. S'ils tombent, le lien ouvre une page en erreur ; la fiche
  reste lisible.
- **« Signaler une erreur »** ouvre une issue préremplie sur GitHub
  (`src/core/signalement.ts`) : GitHub en panne, le signalement attend.
- **GitHub Actions** : la porte, le déploiement, la sonde et la mutation de
  nuit. En panne, rien ne se publie ; la page en ligne reste celle d'avant.
- **Les sites des brasseries** lus par `curation.ts controler` : un site en
  panne est dit « injoignable » pour sa ligne seule, et la ligne reste à
  montrer à Cédric (S265).
