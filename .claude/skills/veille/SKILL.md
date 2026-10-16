---
name: veille
description: La veille mensuelle de Mousse de Poche — signalements ouverts, fiches les plus anciennement vérifiées, nouvelles brasseries OSM — rendue en une PR de PROPOSITIONS que Cédric décide ligne par ligne. Lancée par une tâche planifiée, ou à la main.
---

# Veille

Ce que la veille fait chaque mois, et ce qu'elle ne fait **jamais** : elle
ne modifie aucune ligne de `data/`, ne ferme aucune issue sans réponse, ne
merge rien qui touche `data/` (CLAUDE.md §0).

## 1. Ce qui est à revoir

1. Les **signalements ouverts** (issues « Signalement : »), quelle que soit
   la catégorie — étape 1 du skill `lot-de-curation`.
2. Les **10 fiches les plus anciennement vérifiées**, toutes catégories :
   `npx tsx outils/curation.ts lot 10 --veille`.
3. Les **10 « À confirmer » jamais revus** suivants : `npx tsx outils/curation.ts lot 10`.
4. Les **nouvelles brasseries OSM** : `npx tsx outils/decouverte.ts`, puis
   comparer le nombre de proposées au lot de découverte précédent ; ne
   présenter que les objets OSM absents du lot précédent.

## 2. Le lot

Suivre `lot-de-curation` des étapes 2 à 4 (agents en parallèle, `diff`,
`controler`, relecture d'une source sur cinq). Nom du lot :
`veille-AAAA-MM`.

## 3. La PR

Une PR qui n'ajoute que `curation/veille-AAAA-MM.*`, avec :
- le résumé (nombre de fiches revues, de propositions, de signalements) ;
- les questions pour Cédric (les « choix ») ;
- la réponse attendue : « j'accepte … ».

La PR de veille **ne se merge pas seule** si elle propose quelque chose :
elle attend la réponse de Cédric. Une veille sans aucune proposition se dit
dans la PR et se merge (elle ne touche que `curation/`).

## 4. Le coût

Mesuré : 157 à 167 k pour 25 fiches (S12, S13). Une veille de 20 fiches et
quelques signalements coûte donc de l'ordre de 150 k ; au-delà de 300 k,
s'arrêter et le dire (CLAUDE.md §9).
