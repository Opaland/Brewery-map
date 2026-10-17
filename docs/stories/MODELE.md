# Sxx — Titre *(epic Ex, persona : …)*

> Modèle d'une story (`docs/METHODE.md`). Écrite par `/preparer-story`
> avant le code ; complétée en fin de sprint (porte qualité).

## Objectif

Une phrase : ce que la persona peut faire après, et qu'elle ne pouvait pas
faire avant.

## Pourquoi maintenant

D'où vient la story : BACKLOG, revue, mesure (avec sa date et sa méthode).

## Critères d'acceptation

| # | Étant donné… quand… alors… | Prouvé par |
|---|---|---|
| CA1 | … | `tests/…` (vu rouge : comment) |

## Hors périmètre

## Décisions de Cédric requises

Aucune / laquelle, et ce qui est livré en attendant (propositions,
« À confirmer »).

## Définition de terminé

- [ ] Chaque critère a son test, vu rouge sans le correctif (§1).
- [ ] La porte est verte : lint, `tsc -b`, vitest, build, Playwright.
- [ ] Tout texte changé l'est sur toutes ses surfaces : `grep` sur la formule (§3).
- [ ] Aucune donnée inventée ; `data/` intact, ou accord écrit cité (§0).
- [ ] Aucune requête ne porte la position (§0).
- [ ] La revue adverse est faite et ses trouvailles sont traitées ou au BACKLOG (§11).
- [ ] La persona a relu, si la story change ce qu'elle voit.
- [ ] La PR est mergée verte, et la page publiée sondée (§7).
- [ ] SPRINTS.md, BACKLOG.md et l'état de reprise de CLAUDE.md sont à jour.

## Porte qualité

Verdict : PASSE / RÉSERVES / ÉCHEC — trouvailles vérifiées, et ce qui en a
été fait.
