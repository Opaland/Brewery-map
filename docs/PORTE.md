# La porte : ce qu'elle coûte, mesuré

Story S229 (revue d'architecture du 17/10, risque R3). Mesures du
**17/10/2026**, à refaire quand la suite grandit.

## Local (conteneur de développement, 4 cœurs, un seul exécutant Playwright — CLAUDE.md §6)

| Étape | Commande | Durée |
|---|---|---:|
| Lint | `npm run lint` | 17 s |
| Typecheck | `npx tsc -b --noEmit` | 0,4 s (cache incrémental chaud) |
| Unitaires | `npx vitest run` (350 tests) | 11 s |
| Build | `npm run build` | 2 s |
| E2E | `npx playwright test` (181 tests, 1 ignoré) | 228 s |
| **Total** | | **≈ 258 s** |

Le hook coupait à **300 s** : la porte en prenait 86 %. Un test de plus par
sprint l'aurait fait tomber, et une porte qui tombe finit désactivée (le
hook le dit lui-même).

## CI (GitHub Actions, exécution 39010494476, commit 919e936)

| Étape | Durée |
|---|---:|
| Installation (checkout, Node, dépendances) | 12 s |
| Lint | 15 s |
| Typecheck | 7 s |
| Unitaires | 9 s |
| Build | 2 s |
| Installation de Chromium | 33 s |
| E2E | 119 s |
| **Job « porte »** | **201 s** |

## Décision (au jugé, CLAUDE.md §2 : un délai d'outil, pas un calcul)

- Le délai du hook passe de 300 s à **600 s** (`.claude/settings.json`) : la
  porte entière reste avant chaque commit, comme le veut le cahier des
  charges.
- **Budget** : la porte locale reste sous **450 s** (trois quarts du délai).
  Au-delà, S234 la découpe : un sous-ensemble e2e étiqueté `@porte` en local,
  la suite complète en CI, en parallèle.
- Pistes écartées : plusieurs exécutants Playwright en local (CLAUDE.md §6,
  un seul hors CI, à cause des tests qui partagent le serveur de
  prévisualisation) ; sortir les e2e de la porte (le cahier des charges les
  y met).
- À remesurer à chaque revue globale, et dès qu'un commit dépasse 450 s.
