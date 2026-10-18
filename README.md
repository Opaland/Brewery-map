# Mousse de Poche

Les brasseries artisanales autour de vous, et ce qu'on peut y faire :
acheter et boire sur place, acheter seulement, rien de tout ça, ou « à
confirmer » quand aucune source ne l'établit.

**Ouvrir l'application : <https://opaland.github.io/Brewery-map/>**
— sur téléphone, elle s'installe comme une application et reste
consultable hors connexion.

<p>
  <img src="docs/captures/parcours.gif" alt="Une commune tapée (Villefranche-sur-Saône), la liste se recalcule, une fiche s'ouvre" width="300">
</p>

## Ce qu'elle fait

- **Toute la France** : 283 fiches vérifiées dans 18 départements (01, 07,
  14, 22, 26, 27, 29, 35, 38, 42, 43, 50, 56, 61, 69, 71, 73, 76), et 912
  brasseries repérées sur OpenStreetMap ailleurs, affichées « À confirmer », sur une liste et une
  carte.
- **Partir de n'importe où** : « Autour de moi », ou une commune tapée parmi
  les 34 960 communes de France ; les distances se comptent depuis là.
- **Filtrer** par distance, par ce qu'on peut y faire, par type de bière ;
  chercher une brasserie par son nom, à toute distance.
- **Une fiche par brasserie** : ce que dit la source et avec quelle
  confiance, l'adresse, « Y aller » (Google Maps, Waze, Plans d'Apple, autre
  application), et ce qui n'est pas connu, dit tel quel.
- **Favoris**, gardés sur l'appareil.
- **Signaler une erreur**, par une issue GitHub préremplie.

Rien n'est inventé : sans source, une fiche dit « À confirmer » et pourquoi.
Depuis le 18/10, par la règle de Cédric (`docs/DECISIONS.md`) : 44 des 166
fiches d'origine ont été complétées d'après leur propre site (19
téléphones, 10 horaires, 17 listes de bières, 14 positions à l'adresse) ;
139 sont placées au centre de leur commune selon l'IGN, faute d'adresse
vérifiée ; 36 brasseries de Normandie et 81 de Bretagne sont ajoutées. Les autres
propositions attendent sa relecture (`curation/`).

## Ce qui reste dans le téléphone

Application 100 % côté client : pas de serveur, pas de compte, pas de
télémétrie. La position sert à calculer les distances dans le navigateur et
n'est envoyée à personne. Ce qui part sur le réseau : les images de la carte
(OpenStreetMap voit la zone affichée), et, quand on choisit une commune, la
liste des communes de sa région, demandée à ce site. Le détail est dans
l'application, sous « Votre position reste dans ce téléphone ».

## Captures

| Téléphone | Fiche | Carte, thème sombre |
| --- | --- | --- |
| <img src="docs/captures/telephone-accueil.png" alt="Accueil sur téléphone : par où commencer, recherche, filtres" width="240"> | <img src="docs/captures/telephone-fiche.png" alt="Une fiche détaillée : téléphone non renseigné, Y aller, source, confiance" width="240"> | <img src="docs/captures/telephone-carte-sombre.png" alt="La carte en thème sombre, avec le compte des brasseries à moins de 30 km" width="240"> |

Les captures sont refaites par `npx tsx outils/captures.ts` (voir l'en-tête
du fichier).

## Sources et licences

- **Code** : licence MIT (`LICENSE`).
- **Brasseries** (`data/breweries.json`) : fichier fourni par Cédric le
  15/10/2026 ; chaque fiche cite sa source. Licence de réutilisation : **à
  préciser par Cédric**.
- **Communes** : Code officiel géographique de l'INSEE, via le paquet
  `@etalab/decoupage-administratif` 6.0.0 (données sous Licence Ouverte
  d'Etalab) ; leur point tiré de Wikidata (CC0). Fabriqué par
  `outils/communes.ts`.
- **Brasseries hors des fiches vérifiées** (`src/donnees-osm/brasseries-osm.json`) :
  © contributeurs OpenStreetMap, licence ODbL, extraites par
  `outils/osm-france.ts` (`craft=brewery`). Seul le fait d'être repérée comme
  brasserie vient d'OSM : rien d'autre n'est vérifié.
- **Fond de carte** : © contributeurs
  [OpenStreetMap](https://www.openstreetmap.org/copyright) (ODbL), servi
  par les tuiles d'OpenStreetMap ; rendu par MapLibre GL JS (BSD-3).

## Développer

```bash
npm ci
npm run lint && npx tsc -b --noEmit && npx vitest run
npm run build
PW_CHROMIUM_PATH=/opt/pw-browsers/chromium npx playwright test   # conteneur
```

Le build échoue si `data/breweries.json` ne respecte pas le schéma
(`src/core/schema.ts`). Les règles du projet sont dans `CLAUDE.md`, le
plan et le bilan de chaque sprint dans [`docs/SPRINTS.md`](docs/SPRINTS.md),
les données dans [`docs/DONNEES.md`](docs/DONNEES.md), ce qui reste dans
[`BACKLOG.md`](BACKLOG.md).

L'abus d'alcool est dangereux pour la santé, à consommer avec modération.
