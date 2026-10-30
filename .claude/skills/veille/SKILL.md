---
name: veille
description: La veille mensuelle de Mousse de Poche — signalements ouverts, fiches vendues les plus anciennement vérifiées, « À confirmer » jamais revus, nouvelles brasseries OSM — rendue en une PR de PROPOSITIONS que Cédric décide ligne par ligne. Lancée par une tâche planifiée, ou à la main.
---

# Veille

Ce que la veille ne fait **jamais** : modifier une ligne de `data/`, merger
une PR qui propose quelque chose, fermer une issue sans y répondre
(CLAUDE.md §0).

## 1. Ce qui est à revoir — 20 fiches au plus, plus les signalements

1. Les **signalements ouverts** (issues « Signalement : »), quelle que soit
   la catégorie — étape 1 du skill `lot-de-curation`. Une issue qui a déjà
   un commentaire de veille sans décision de Cédric n'est pas reprise : elle
   attend sa réponse.
2. **10 fiches des catégories 1 à 4**, jamais vérifiées d'abord (catégorie 1
   en tête), puis les plus anciennement vérifiées :
   `npx tsx outils/curation.ts lot 10 --veille`.
3. **10 « À confirmer » jamais revus** : `npx tsx outils/curation.ts lot 10`.
4. Retirer des listes 2 et 3 les fiches déjà visées par un signalement
   (pas de double revue).
5. **Nouvelles brasseries OSM** :
   `npx tsx outils/decouverte.ts --lot veille-AAAA-MM-osm` — l'outil refuse
   d'écraser un lot existant (le lot S14 attend peut-être encore Cédric).

**Une étape qui échoue** (réseau, outil) se dit dans la PR, et la veille
**continue les autres** : un échec d'OSM ne doit pas coûter les
signalements.

## 2. Le lot

Suivre `lot-de-curation`, étapes 2 à 4 : agents en parallèle, `diff`,
`controler`, une source sur cinq rouverte. Nom du lot : `veille-AAAA-MM`,
avec `revues` complet.

## 3. La PR

- Elle n'ajoute que des fichiers de `curation/` ; avant de l'ouvrir :
  `git diff --name-only origin/main | grep '^data/'` doit être vide, sinon
  s'arrêter.
- Elle dit : fiches revues, propositions, signalements repris, étapes en
  échec, et les questions pour Cédric (les « choix ») ; réponse attendue :
  « j'accepte … ».
- Avec au moins une proposition, elle **attend Cédric**. Sans aucune, elle
  le dit et peut se merger (elle ne touche que `curation/`).

## 4. Répondre aux signalements

Sur chaque issue reprise, un commentaire : « Revue le <date> dans la veille
<mois> : <proposition n° … / rien de lisible dans les sources> ; la décision
revient à l'éditeur de la carte. » Après la décision de Cédric : étape 6 de
`lot-de-curation` (réponse finale, puis fermeture).

## 5. La taille, pas les tokens

20 fiches et les signalements au plus : la taille se compte, un budget en
tokens ne se mesure pas depuis la session. Repère mesuré : 157 à 167 k pour
25 fiches (S12, S13).
