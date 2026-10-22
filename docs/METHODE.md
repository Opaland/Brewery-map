# La méthode — BMAD, adaptée à Mousse de Poche

Demande de Cédric du 17/10 : « regarde BMAD pour l'implémentation de
l'application ». Ce fichier dit ce qu'est BMAD, ce qu'on en prend, et
comment cela s'accorde avec CLAUDE.md, **qui prime**.

## 1. BMAD, tel qu'il est le 17/10/2026

**Sources lues le 17/10** :
- https://github.com/bmad-code-org/BMAD-METHOD (README) ;
- la branche V6.12 du même dépôt ;
- https://docs.bmad-method.org/plan/choose-a-planning-path/ ;
- https://docs.bmad-method.org/start/build-your-first-change/ ;
- https://docs.bmad-method.org/existing-codebases/start-in-an-existing-codebase/ ;
- les notes de version 6.11.0, relues sur newreleases.io.

**Ce que c'est.** BMAD (« Breakthrough Method for Agile AI-Driven
Development ») est une méthode de développement par agents d'IA, sous
licence MIT.
- La v6.12 est stable et ne reçoit plus que des corrections de bugs. On
  l'installe par `npx bmad-method install`.
- La v7 est en préversion alpha. Elle s'installe en skills ou en plugin
  Claude Code.
- Son cycle : **clarifier → planifier → construire et vérifier →
  apprendre**.

**Ses artefacts** :
- un brief produit et un PRD ;
- un document UX et une architecture ;
- des epics découpés en stories ordonnées ;
- une revue de code par story ;
- une rétrospective par epic.

**Ses chemins.** BMAD choisit un chemin selon la taille du travail :
trivial, une session, un epic ou un projet entier. À partir de la v6.11, le
Scrum Master et la QA sont fondus dans l'agent de développement. **Ce
dernier point vient d'un résumé, pas d'une page lue en entier.**

**Non vérifié** (le dépôt n'a pas pu être parcouru en entier depuis le
conteneur) :
- le format exact d'une story ou d'une « quality gate » ;
- ce que l'installeur écrit dans `.claude/`.

## 2. Ce qu'on prend, ce qu'on laisse

**On n'installe pas BMAD.** La v7 est en alpha, et son installeur écrirait
dans `.claude/`, à côté de hooks et d'agents qui marchent déjà. On reprend
ses **formats** :

| BMAD | Ici |
|---|---|
| PRD | `docs/PRD.md` : exigences numérotées (EF-xx, ENF-xx), invariants du §0 repris mot pour mot |
| Architecture | `docs/ARCHITECTURE.md` |
| UX | `docs/DESIGN.md` (existait) |
| Epics et stories ordonnées | `docs/EPICS.md` : 12 epics, 100 stories (S29 à S128) |
| Story | `docs/stories/Sxx.md`, écrite **avant** le code, sur le modèle `docs/stories/MODELE.md` |
| Scrum Master | le skill `/preparer-story` : il rédige la story suivante |
| Dev | TDD sur `src/core`, et la porte (le hook, `/porte`) |
| QA, revue de code | `relecteur-adverse`, `verificateur-de-tests`, `/revue-sprint` ; verdict écrit dans la story |
| Rétrospective | une par epic ; elle ne change CLAUDE.md qu'après un raté observé ici, daté |

Ce que BMAD n'a pas et qu'on garde :
- **la validation métier** : un agent par persona de `docs/PERSONAS.md`
  (S353, repris d'ISTQBFinder) ;
- **la curation** : propositions, puis accord de Cédric ligne par ligne.

## 3. Le cycle d'une story

1. **Préparer** (`/preparer-story`). Le skill lit EPICS.md, BACKLOG.md et la
   dernière revue, puis écrit `docs/stories/Sxx.md` :
   - l'objectif et la persona qui juge ;
   - des critères d'acceptation numérotés, chacun relié au test qui le
     prouvera (§5) ;
   - ce qui est hors périmètre ;
   - les décisions de Cédric requises.
2. **Construire.** Tests d'abord sur `src/core`. Chaque test est vu rouge
   (§1). La porte doit être verte.
3. **Vérifier.**
   - `relecteur-adverse`, obligatoire pour du code (§11), puis la persona
     de l'epic quand la story change ce qu'elle voit.
   - Le verdict s'écrit dans la story : **PASSE**, **RÉSERVES** ou
     **ÉCHEC**, avec les trouvailles vérifiées.
4. **Livrer.**
   - PR verte, puis merge (décision de Cédric du 15/10) ;
   - page publiée sondée (§7) ;
   - SPRINTS.md et BACKLOG.md mis à jour.
5. **Apprendre** : une rétrospective à la fin de chaque epic.

## 4. Où BMAD et CLAUDE.md se heurtent, et qui gagne

- **BMAD laisse l'agent livrer seul.** Ici, une story de données ne livre
  que des propositions. La story le dit, et sa définition de terminé
  sépare « code fini » et « décision humaine en attente » (§10).
- **Un PRD a des objectifs chiffrés.** Ici, un chiffre non mesuré s'écrit
  « À mesurer », avec la façon de le mesurer (§2, §6sexies).
- **Les specs supposent souvent une API.** Ici, la position et la commune
  tapée restent dans le navigateur : on embarque les données, on n'appelle
  pas une API à chaque frappe.
- **BMAD sait construire sans surveillance** (`bmad-build-auto`). Ici, le
  budget du sprint et l'arrêt à deux fois l'estimation (§9) passent avant.
