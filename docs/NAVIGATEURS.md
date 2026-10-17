# Les moteurs autres que Chromium (S234)

La porte tourne sur Chromium (profil Pixel 7). Le job CI `navigateurs`
relance la suite e2e sur deux autres moteurs, choisis par `PW_NAVIGATEUR`
dans `playwright.config.ts` (un nom inconnu fait échouer, il ne retombe pas
sur Chromium) :

| `PW_NAVIGATEUR` | Projet | Profil |
|---|---|---|
| `webkit` | `webkit-iphone` | Safari d'iPhone 13 (WebKit) |
| `firefox` | `firefox-android` | Firefox pour Android : écran 412 × 839, toucher, agent Android (Firefox n'émule pas `isMobile`) |

Le job est **informatif** (`continue-on-error`) tant que ses échecs ne sont
pas triés ; le rapport HTML est gardé sept jours en artefact.

## Règle de tri

Chaque échec est rangé dans une de ces cases, et la décision s'écrit dans
le test ou ici :

1. **défaut de l'application** → corrigé ;
2. **API propre à un moteur** (`beforeinstallprompt`, `isMobile`) → le test
   est restreint, raison écrite dans le test ;
3. **différence du moteur sans défaut** → notée ici.

Une taille d'écran n'est **pas** une raison de restreindre : `viewport` et
`setViewportSize` se posent sur tous les moteurs (revue adverse S234 : trois
sauts disaient le contraire, retirés).

## Ce qui est trié

**WebKit (iPhone 13)**
- presse-papiers : pas de permission `clipboard-write` → les tests relèvent
  ce que l'application copie (`releverCopies`), sur tous les moteurs ;
- « Installer » : `beforeinstallprompt` n'existe que dans Chrome → Chromium
  seulement ;
- premier écran calibré sur le Pixel 7 → projet `mobile` seulement ;
  **constat réel** : sur iPhone 13, la première brasserie passe sous la
  barre (BACKLOG) ;
- ligne enfoncée au toucher : la pression simulée ne donne pas `:active`
  sous WebKit émulé → Chromium seulement ; le correctif de `main.tsx`
  (écoute de `touchstart`) reste à prouver sur un iPhone réel (S96) ;
- carte : le morceau MapLibre arrive plus lentement → `versLaCarte` attend
  15 s (attente de test).

**Firefox (Android)**
- sans écran en CI, Firefox n'a pas WebGL : la carte dit qu'elle ne peut
  pas s'afficher, ce qui est le bon comportement. `versLaCarte` saute alors
  les tests qui ont besoin de la carte dessinée, **seulement si la page n'a
  vraiment pas WebGL** ; avec WebGL, une carte absente échoue sur tout
  moteur. `carte-moteurs.spec.ts` exige la carte là où WebGL existe, le
  message ailleurs.

## Pas encore trié (CI du 17/10, commit d24e599)

C'est pour cela que le job reste informatif. Il ne passera bloquant qu'une fois ces cas rangés :

- WebKit, depuis le retrait des sauts sur la taille d'écran (3435deb) :
  `uiux.spec.ts:71` et `:76` (une brasserie dans le premier écran à
  1280 × 800), `uiux.spec.ts:115` (option active peinte à 320 px). Les
  deux tests à 1280 de `accessibilite.spec.ts` sont instables. L'ancien saut
  les cachait : ils sont à comprendre, pas à resauter ;
- WebKit : `depart.spec.ts:44` (après « autour de moi », rien ne part hors
  l'application) ; `performance.spec.ts:38` (carte qui ne se charge pas,
  la liste reste) ; `raccourcis.spec.ts:36` instable ;
- Firefox : `anglais.spec.ts:58` (attribution de la carte, qui dépend de la
  carte dessinée) ; `uiux.spec.ts:92` à 412 et à 320 px (le compte collant
  et le focus au clavier) ; `depart.spec.ts:89` et le thème forcé sont
  instables.
