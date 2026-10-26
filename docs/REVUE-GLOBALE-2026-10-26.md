# Revue globale du 26/10/2026

Faite en fin de session, à la demande de Cédric (« cloture de session revue
globale »), selon le skill `revue-globale`, sur `main` après S356 (PR #223).
Quatre agents : `relecteur-de-promesses`, `chasseur-de-jumeaux`,
`relecteur-de-workflows`, `contributrice-externe`. Chaque trouvaille est
corrigée par la PR de fin de session du 26/10, ou porte son issue
(`AGENTS.md` §12). Les issues de la revue du 22/10 encore ouvertes (#208 à
#216) ne sont pas redites.

## Mesuré sans défaut

| Contrôle | Mesure |
|---|---|
| Déploiement | `main` vert (215a78e), déploiement et sonde de la page publiée verts |
| Sécurité | aucun `innerHTML`, `dangerouslySetInnerHTML`, `eval(`, `new Function` dans `src/` ; `npm audit --omit=dev` : 0 vulnérabilité |
| Confidentialité | un seul `fetch` dans `src/` (`communesFrance.ts`, fichiers de communes du site) ; la géolocalisation ne sert qu'au calcul local |
| Données | 468 fiches, 200 « À confirmer », toutes avec leur note ; 9 fermées ; garde de `data/` conforme (71 accords) |
| Poids | 2,5 Mo d'assets ; la carte (1,1 Mo) se charge à la demande ; les fiches, 208 ko ; budget du premier écran tenu par la porte |
| Workflows | droits au plus juste, aucune interpolation dans un `run:`, aucun `pull_request_target`, actions épinglées par SHA (dont `deploy-pages` 5.0.1) |
| Contribution | les chiffres du README tiennent ; chaque commande d'installation et de porte existe |
| Paires tenues | la relance `-r2` (skill, outil, code) ; « paquets de cinq » ; la raison manquante refusée ; `CONTINUITE.md`, `DECISIONS.md`, `MUTATION.md` ↔ workflows à la main |

## Corrigé par la PR de fin de session

| # | Constat | Agent |
|---|---|---|
| P1 | Six textes promettaient encore « chaque nuit » après la PR #222 (`sonde-nuit.yml`, `mutation.yml`, `services-sondes.ts`, `continuite.test.ts`, `MUTATION.md`, `stryker.config.json`) ; un test (`ci.test.ts`) tient désormais les deux workflows à `workflow_dispatch` seul, sans « chaque nuit » (vu rouge) | promesses, jumeaux |
| J1 | `regle.ts` acceptait tout lot `dep-…` (`startsWith`), `osm-retirer` seulement le motif de `lotDepartemental` : un `dep-foo` serait entré sans que ses points OSM partent. La règle lit le motif partagé (test vu rouge) | jumeaux |
| J2 | `relancer` ne reprend qu'une raison qui dit « relancer », ce que le skill ne disait pas | jumeaux |
| C1 | Le README disait « poser `PW_CHROMIUM_PATH` » sans dire que c'est inutile hors conteneur | contributrice |
| A1 | L'audit de l'arbre entier était rouge les 24 et 25/10 (undici 8.12.1, via jsdom) : PR #225 à part | revue |

## En issues

| Issue | Constat | Agent |
|---|---|---|
| #226 | L'audit de l'arbre entier ne tourne plus tout seul depuis #222 : **décision de Cédric** | revue, promesses |
| #227 | Contribuer : signaler une faille, gabarit de PR, qui décide, mesures de la porte périmées | contributrice |
| #221 (commentaire) | Les jobs `navigateurs` : délai d'apt sur Ubuntu 26.04 (le 26/10), et 5 tests rouges sur WebKit et Firefox (22 et 25/10) | workflows |
| #224 | Les 16 candidats « à relancer » de S341 | revue adverse de S356 |

## Déjà ouvert, rappelé

- #209 : `main` n'est pas protégée (`gh api …/branches/main/protection` : 404).

## Chiffres du projet

468 fiches dans 39 départements ; 811 points OpenStreetMap ; 928 tests
unitaires ; 71 accords de Cédric rejoués par la garde.
