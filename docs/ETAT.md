# Où en est Mousse de Poche

Une page, tenue à jour à chaque fin de PR (revue S295, Cédric : le suivi
était éclaté entre cinq fichiers). Le détail est dans les fichiers cités.

**La page publiée** : https://opaland.github.io/Brewery-map/ (sondée après
chaque déploiement, `tests/e2e/page-deployee.spec.ts`).

## Ce qui est fait

- L'application : liste, carte, fiche, filtres, favoris, carnet, notes,
  hors connexion, anglais, accessibilité mesurée (S1 → S295).
- 358 fiches dans `data/` (Rhône-Alpes, Normandie, Bretagne, Pays de la
  Loire, Indre-et-Loire), et 878 points OpenStreetMap « À confirmer ».
- La règle du 18/10 (« site officiel + contrôlé ») appliquée :
  `docs/DECISIONS.md`.

## Où en sont les fiches

`curation/A-CHERCHER.md`, écrit par `outils/completude.ts` et tenu à jour
par un test. Au 19/10, après les huit lots de S297 : **17 fiches complètes sur 358** ;
180 « À confirmer » ; 223 sans bières, 278 sans téléphone, 277 sans horaires.

## Ce qui t'attend, Cédric

1. `curation/A-MONTRER.md` : neuf groupes, une réponse par groupe (le
   tableau en tête).
2. `docs/DECISIONS.md`, « Reste à Cédric » : la définition d'une fiche
   « complète », la licence de `data/` (#34), l'adresse de signalement
   (#38), la veille (#33), et les décisions venues de la relecture S295.
3. Un essai sur un vrai téléphone : `docs/LIVRAISON.md`.

## Ce qui attend un agent

- S295, parties 3 à 5 : la fiche repensée, la liste, les réglages
  (`docs/REVUE-ENSEMBLE.md`).
- Compléter les fiches, département par département, sous la règle du
  18/10 ; une PR de données à la fois (revue d'architecture, AR5).
- Avant 600 fiches : S231 (un identifiant stable), S294 (chargement par
  département), S296 (les bases d'étape de la garde).
