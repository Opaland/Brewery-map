# Où en est Mousse de Poche

Une page, tenue à jour à chaque fin de PR (revue S295, Cédric : le suivi
était éclaté entre cinq fichiers). Le détail est dans les fichiers cités.

**La page publiée** : https://opaland.github.io/Brewery-map/ (sondée après
chaque déploiement, `tests/e2e/page-deployee.spec.ts`).

## Ce qui est fait

- L'application : liste, carte, fiche, filtres, favoris, carnet, notes,
  hors connexion, anglais, accessibilité mesurée, carnet (S1 → S379).
- 685 fiches dans `data/` (Auvergne-Rhône-Alpes, Bourgogne-Franche-Comté, Normandie,
  Bretagne, Pays de la Loire, Centre-Val de Loire, Provence-Alpes-Côte d'Azur,
  Corse, Hauts-de-France, Île-de-France et une partie du Grand Est), et 690 points OpenStreetMap « À confirmer ».
- La règle du 18/10 (« site officiel + contrôlé ») appliquée :
  `docs/DECISIONS.md`.

## Où en sont les fiches

`curation/A-CHERCHER.md`, écrit par `outils/completude.ts` et tenu à jour
par un test. Au 30/10, après S345 :
**21 fiches complètes sur 685** ; 260 « À confirmer » ; 520 sans bières, 390 sans téléphone, 446 sans horaires.
Le 19/10, 10 fiches sans aucune trace ont été retirées (S298, méthode de Cédric).
Le 19/10, les 348 fiches ont été cherchées au registre des entreprises :
`curation/registre-2026-10-19.md` (une fermée sur Untappd, six à décider,
sept sièges dans une autre commune ; rien n'est appliqué).
Les fiches sans source, relues, attendent une décision de Cédric :
`curation/s297-sans-source.md` (fiches sans trace, cessée, site piraté,
autre commune).

## Ce qui s'est fait depuis la revue globale du 19/10

- **19–20/10, PC fixe** : la porte tourne sous Windows (S302) ; les bugs de
  la revue globale (`docs/REVUE-GLOBALE-2026-10-19.md`), groupes A, T et C,
  corrigés en S303 à S307 ; les fiches chargées en deux temps (S294 :
  premier écran 189 402 octets pour un budget de 208 000,
  `docs/PREMIER-ECRAN.md`) ; la fiche dit ce qui manque une fois (S308) ;
  la confiance dite en phrases (S320) ; une fiche peut déménager par lot
  (S322).
- **21/10** : revue de reprise ; l'epic E30, « ce que le PC connecté
  débloque » : la couche OSM réextraite et les huit communes sans point
  retrouvées (S324, S325, PR #164) ; trois séries de lots relues depuis le
  poste (S326, S327, S328 : PR #165 et #166). Puis E31 à E35
  (`docs/EPICS.md`).

## Ce qui t'attend, Cédric

1. **Les décisions en issues** (revue globale du 22/10) : la protection de
   `main` (#209), sept fiches d'origine « solide » sur un office de tourisme
   (#214), la première campagne d'essais des agents (#216). Tous les lots de propositions sont appliqués (le 20, le
   21 et le 22/10) ; seules restent, exprès, les notes périmées de s311 et
   s314 sur des fiches fermées ou déménagées.
2. `curation/A-MONTRER.md` : onze groupes, une réponse par groupe (le
   tableau en tête).
3. `docs/DECISIONS.md`, « Reste à Cédric » : la définition d'une fiche
   « complète », la licence de `data/` (#34), l'adresse de signalement
   (#38), la veille (#33), l'identifiant stable (S231).
4. Un essai sur un vrai téléphone : `docs/LIVRAISON.md`.

## Ce qui attend un agent

- E31 à E35 sont faits le 21/10 (S329 à S334). La suite vient du BACKLOG,
  dont les sections « Revue du 21/10 », et des réponses de Cédric.
- Les fiches, par lots, une fois les lots en attente tranchés ; une PR de
  données à la fois (revue d'architecture, AR5).
- Avant 600 fiches : S231 (un identifiant stable, décision de Cédric) et
  S296 (les bases d'étape de la garde).
