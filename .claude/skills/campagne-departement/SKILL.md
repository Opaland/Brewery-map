---
name: campagne-departement
description: Fait entrer un ou plusieurs départements de France sur la carte de Mousse de Poche (epic E36) — candidats SIRENE et OSM, lecture par les agents verificateur-de-brasserie, contrôle, application par la règle de Cédric du 21/10, PR de données. À utiliser pour chaque sprint régional d'E36.
---

# Campagne départementale

Ce que S328 a fait à la main pour le Centre-Val de Loire, en gestes écrits
(S340). La règle de Cédric du 21/10 (`docs/DECISIONS.md`) couvre
l'application : on ne lui demande rien. Elle ne couvre pas le **retrait**
d'une fiche, et une brasserie connue d'un **annuaire seul n'existe pas**
(méthode du 19/10). Rien n'est inventé (CLAUDE.md §0).

## 1. Préparer

```bash
npx tsx outils/campagne.ts preparer 03 15 63 74
```

Pour chaque département, l'outil écrit trois choses :
- `curation/dep-<dép>-candidats.json`, les candidats ;
- `curation/campagne/<dép>-paquets.json`, des paquets de cinq ;
- `curation/campagne/<dép>-raisons.json`, ce qui n'a rien à chercher.

## 2. Faire lire

Un agent `verificateur-de-brasserie` par paquet, lancés en parallèle par
vagues de dix au plus. Le prompt, à recopier en changeant le fichier :

> Lot « dep-<dép> », date <AAAA-MM-JJ>, dépôt <chemin du dépôt>. Lis ton
> paquet de CANDIDATS (brasseries absentes de data/) dans
> `curation/campagne/<dép>-paquets.json`, paquet n° <i> (index à partir de
> 0). Pour chacun : la brasserie existe-t-elle, et que peut-on y faire ?
> Applique la méthode d'existence de Cédric du 19/10 et la décision #37
> (`docs/DECISIONS.md`) : un annuaire seul, un article de presse seul ou
> un réseau social seul ne suffisent pas ; un office de tourisme vaut au
> plus une confiance moyenne. Cherche le site officiel d'abord, puis
> Untappd (qui est aussi la source des bières), puis l'office de tourisme ;
> fais au moins deux recherches par candidat. Lis `docs/DONNEES.md` et
> `src/core/categories.ts`. Vérifie qu'aucun n'est déjà une fiche de
> `data/breweries.json`.
> RENDS un tableau JSON au format exact de `lectureAgentSchema`
> (`src/core/candidats.ts`) pour chaque candidat établi.
> - `extrait` : un passage EXACT, copié d'une seule page, jamais recomposé.
> - `contact` : chaque valeur doit être lisible sur la page `source`.
> - `horaires` : seulement les jours écrits sur la source.
> - Un portable est permis s'il est la seule ligne publiée par la brasserie
>   (règle du 21/10). Aucun nom de personne, aucun SIREN d'entrepreneur
>   individuel.
>
> Sous le JSON, donne une ligne par candidat sans lecture, avec sa raison.

## 3. Relire, sans rien croire

- **Ouvrir soi-même au moins une source sur cinq**, et toujours celles que
  l'agent dit avoir lues « via un résumé ». Utiliser `curl -sL -A
  "Mozilla/5.0" <url> | sed 's/<[^>]*>/\n/g' | grep -i …`, sans afficher la
  page entière.
- **Pièges vus en S328** :
  - des horaires tirés d'un article d'une saison passée (l'URL redirige) ;
  - le même jour écrit deux fois de deux façons : on retire l'horaire ;
  - un jour pris à l'office de tourisme et mêlé à ceux du site ;
  - le même lieu en double, une fois par SIRENE et une fois par OSM : une
    seule fiche ;
  - une catégorie que la page ne porte pas en toutes lettres : redescendre,
    ou passer en confiance faible.
- Écrire les lectures retenues dans `curation/campagne/<dép>-lus.json`, et
  compléter `curation/campagne/<dép>-raisons.json` : **une raison par
  candidat non retenu**. L'outil refuse sinon. Quand la cause est passagère
  (quota épuisé, site en panne), la raison dit **« à relancer »** : c'est ce
  mot que `relancer` cherche ; une raison sans lui n'est jamais reprise.

## 4. Rendre

```bash
npx tsx outils/campagne.ts rendre 03 "l'Allier" S341
```

L'outil géocode, assemble, contrôle (et s'arrête sur un écart), puis écrit
`curation/dep-<dép>.md`.

## 5. Revue de la persona

Lancer l'agent `cedric` (la persona de `docs/PERSONAS.md`) sur les comptes
rendus, en lui rappelant les règles de `docs/DECISIONS.md`. Traiter ses retours **avant** d'appliquer : retirer une lecture
fausse, puis rejouer `rendre`.

## 6. Appliquer, et tout ce qui suit

```bash
npx tsx outils/campagne.ts appliquer 03 15 63 74
```

Puis :
- mettre à jour les chiffres que les tests réclament : README (fiches,
  départements et leur liste, OSM, centres), `docs/ETAT.md`,
  `docs/LINKEDIN.md`, `docs/MARKETING.md` ;
- mettre à jour « Quoi de neuf » (`src/core/nouveautes.ts` : empreinte,
  phrase, une entrée datée), en français et en anglais (`src/textes/en.ts`) ;
- ajouter l'entrée de `docs/SPRINTS.md` et le verdict de la story.

`npx vitest run` doit être vert avant le commit. Le crochet lance la porte.

## Relancer ce qui n'a pas pu conclure (S356)

Quand un passage laisse des candidats « à relancer » (quota épuisé, site en
panne), on ne rejoue **jamais** `rendre` sur un département déjà appliqué :
la garde de `data/` rejoue chaque accord sur le lot tel qu'il est dans
`curation/`, et un `dep-21.json` réécrit la ferait rougir. La relance a son
lot à elle :

```bash
npx tsx outils/campagne.ts relancer 21-r2
```

L'outil écrit `curation/dep-21-r2-candidats.json` et
`curation/campagne/21-r2-paquets.json`. On suit ensuite les étapes 2 à 6
avec `21-r2` à la place de `21` (`21-r2-lus.json`, `21-r2-raisons.json`,
`rendre 21-r2 …`, `appliquer 21-r2`). Un troisième passage s'appelle `21-r3`.

## 7. PR et merge

Une seule PR de données par région, qui **liste chaque fiche ajoutée**
(lot, numéro, nom, commune, catégorie, source). Merge en squash quand
aucune ligne `porte` ni `visuel` n'est en attente ni rouge (§7bis). Si
`visuel` rougit à cause des données, régénérer les références par la CI.
Vérifier ensuite le déploiement et la sonde de la page publiée.
