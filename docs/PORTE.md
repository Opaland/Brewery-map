# La porte : ce qu'elle coûte, mesuré

Story S229 (revue d'architecture du 17/10, risque R3), remesurée en S364.
À refaire à chaque revue globale (un test le vérifie :
`tests/unit/contribuer.test.ts`).

Dernière mesure : 2026-10-30

## Local, 30/10 (PC fixe sous Windows, un seul exécutant Playwright, chaque étape chronométrée à part)

| Étape | Commande | Durée |
|---|---|---:|
| Lint | `npm run lint` | 10 s |
| Typecheck | `npx tsc -b --noEmit` | 1 s (cache incrémental chaud) |
| Unitaires | `npx vitest run` (967 tests, 100 fichiers) | 9 s |
| Garde de `data/` | `npx tsx outils/garde-donnees.ts` | 2 s |
| Build | `npm run build` | 2 s |
| E2E | `npx playwright test` (259 tests, 8 ignorés) | 189 s |
| **Total** | | **≈ 213 s** |

Lint et unitaires ont été chronométrés sur un état où chacun avait un seul
rouge, corrigé ensuite : l'ordre de grandeur tient, pas la seconde.

## Local, 27/10 (conteneur cloud, 4 cœurs, un seul exécutant Playwright — AGENTS.md §6)

| Étape | Commande | Durée |
|---|---|---:|
| Lint | `npm run lint` | 26 s |
| Typecheck | `npx tsc -b --noEmit` | 0,4 s (cache incrémental chaud) |
| Unitaires | `npx vitest run` (956 tests, 100 fichiers) | 18 s |
| Garde de `data/` | `npx tsx outils/garde-donnees.ts` | 1,6 s |
| Build | `npm run build` | 4 s |
| E2E | `npx playwright test` (259 tests, 8 ignorés) | 341 s |
| **Total** | | **≈ 390 s** |

390 s, c'est 87 % du budget de 450 s fixé plus bas, et 65 % du délai du
crochet (600 s).

## Local, 17/10 (première mesure ; la garde de `data/`, ajoutée en S306, mesurée le 20/10)

| Étape | Commande | Durée |
|---|---|---:|
| Lint | `npm run lint` | 17 s |
| Typecheck | `npx tsc -b --noEmit` | 0,4 s (cache incrémental chaud) |
| Unitaires | `npx vitest run` (350 tests) | 11 s |
| Garde de `data/` (S306) | `npx tsx outils/garde-donnees.ts` | 0,5 s (PC fixe, 20/10) |
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

## Le singe (S286), hors de la porte

Avant une livraison, ou sur un doute : des centaines de gestes au hasard,
rejouables par leur graine, sans rien envoyer hors du site.

```bash
# bash (dans le conteneur cloud, avec son Chromium)
npm run build
SINGE=1 SINGE_GRAINE=7 SINGE_GESTES=300 PW_CHROMIUM_PATH=/opt/pw-browsers/chromium \
  npx playwright test tests/e2e/singe.spec.ts
```

```powershell
# PowerShell
npm run build
$env:SINGE = "1"; $env:SINGE_GRAINE = "7"; $env:SINGE_GESTES = "300"
npx playwright test tests/e2e/singe.spec.ts
Remove-Item Env:SINGE, Env:SINGE_GRAINE, Env:SINGE_GESTES
```

Sans `SINGE=1`, le test est sauté : la porte ne le lance pas.
