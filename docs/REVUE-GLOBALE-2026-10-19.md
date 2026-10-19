# Revue globale du 19/10/2026 — les bugs trouvés

Demandée par Cédric le 19/10 : code, design, design patterns, UX, QA.
Sept relectures en parallèle sur `main` à `21e515b` :
- code (relecteur adverse) ;
- UX et QA dans un vrai Chromium, à 4 largeurs, 2 thèmes et texte à 200 % ;
- design system et CSS ;
- promesses ;
- règles jumelles ;
- workflows ;
- contributrice externe sous Windows.

**Rien n'est corrigé dans ce document.** Chaque ligne est un constat
vérifié : par une sonde, une mesure dans le navigateur, ou une lecture de
code. Le mode de preuve est dit. Les seuils de gravité sont ceux de la
revue : *bloquant* empêche un usage, *majeur* trompe ou casse un parcours,
*mineur* gêne, *cosmétique* se voit à peine.

## Ce qui va bien (mesuré)

- `main` est vert : CI, déploiement et sonde de la page publiée.
- `npm audit --omit=dev` : 0 vulnérabilité.
- Code : aucun `innerHTML` ni `eval`.
- Vitest : 646 tests verts.
- Position : aucune requête ni aucun lien ne l'emporte. Il n'y a qu'un
  `fetch`, celui des communes, de même origine, et la CSP est stricte.
  Les liens « Y aller » ne portent que la destination.
- Affichage, à 4 largeurs, en clair et en sombre, et à 200 % :
  - aucun débordement horizontal ;
  - aucune cible sous 24 px ;
  - aucun texte sous 4,5:1 ;
  - aucune erreur en console ;
  - aucune lenteur au-dessus d'une seconde.
- Hors ligne après une visite : rechargement en 234 ms.
- Clavier seul : sans piège de focus.
- Premier écran : 172 Ko gzip.

---

## W — Windows et PowerShell (à traiter en premier sur le PC fixe)

| # | Gravité | Constat | Où | Correctif |
|---|---|---|---|---|
| W1 | **bloquant** | Il n'y a pas de `.gitattributes`. Avec `core.autocrlf=true` (le défaut de Git pour Windows), les fichiers sortent en CRLF. L'empreinte de `data/breweries.json` (test `nouveautes`), la garde de `data/` et les empreintes des lots (`--ecrire`) changent alors : la porte rougit, et un accord peut viser une mauvaise empreinte. | racine ; `tests/unit/nouveautes.test.ts:9` ; `outils/garde-donnees.ts:25` ; `outils/lots.ts:10` | `* text=auto eol=lf` dans `.gitattributes` et un `.editorconfig` ; cloner avec `-c core.autocrlf=false` |
| W2 | **bloquant** | Les trois crochets `.claude/hooks/*.sh` sont en bash et appellent `jq`, `find -printf` et `paste`. Sous PowerShell, sans Git Bash et sans `jq`, la porte avant commit ne tourne pas, ou sort en 0 sans rien dire. | `.claude/hooks/porte-avant-commit.sh`, `dist-a-jour.sh`, `etat-deploiement.sh` ; `.claude/settings.json:11-29` | installer Git pour Windows et `jq` ; à terme, une porte en Node (`npm run porte`) appelée par le crochet |
| W3 | **bloquant** | `execFileSync('npx', …)` sans `shell` échoue sous Windows (`npx.cmd`, EINVAL depuis Node 22) : la commande `diff` de l'outil de curation casse. Le test lance aussi `node_modules/.bin/tsx`, qui est un script shell. | `outils/curation.ts:233` ; `tests/unit/outil-curation.test.ts:12,23,93` | `process.execPath` et `node_modules/tsx/dist/cli.mjs`, ou importer la fonction au lieu de relancer un processus |
| W4 | majeur | La doc écrit `VAR=valeur commande` et `&&`, qui sont de la syntaxe bash : PowerShell 5.1 refuse les deux. Le chemin `/opt/pw-browsers/chromium` est propre au conteneur. | `README.md:74,90` ; `CONTRIBUTING.md:26` ; `CLAUDE.md` §6 ; `docs/PORTE.md:55` ; `.claude/skills/porte/SKILL.md:21` | une section « Windows » : `$env:VAR = "…"`, `;`, `npx playwright install chromium` |
| W5 | mineur | Certains outils appellent `sleep`, `curl` et `ffmpeg`. `package.json` n'a pas de champ `engines`. | `outils/geocodeur.ts:14` ; `outils/requetes.ts:29` ; `outils/captures.ts:110` | `node:timers/promises` ; `"engines": {"node": ">=22"}` |

## A — Application

### Majeurs

| # | Constat | Preuve | Où | Correctif |
|---|---|---|---|---|
| A1 | Page blanche si l'affichette est demandée après un déploiement : son morceau chargé à la demande a disparu, et seule la carte a une frontière d'erreur. | lecture | `src/App.tsx:62,872-881` ; `src/CarteDifferee.tsx:77` | frontière d'erreur réutilisable autour du `Suspense` de l'affichette |
| A2 | Un lien partagé (ou le QR d'une affichette) vers une fiche OSM n'ouvre rien si la couche OSM est décochée : « Aucune brasserie ne correspond », sans dire pourquoi. | sonde : 0 trouvé sans la couche, 1 avec | `src/App.tsx:143-145,291` | lien vers une fiche OSM : inclure la couche pour la session |
| A3 | Le service worker perd une réponse réseau réussie quand l'écriture en cache échoue (appareil plein, réponse 206) : la page échoue alors que le réseau a répondu 200. | sonde : `QuotaExceededError`, puis rejet | `public/sw.js:130-133,170` | `await cache.put(…).catch(() => undefined)` |
| A4 | Ordinateur 1280×800 : le premier écran ne peint aucune brasserie. La première ligne est à 787 px, sous la barre du compte (751 px). Le test qui le garde (`top < 800`) ne peut pas échouer (§1bis). | `elementFromPoint` renvoie la barre ; capture | `tests/e2e/uiux.spec.ts:71` ; mise en page de `.filtres` | exiger `ligne.top + 44 ≤ barre.top`, puis regagner environ 80 px |
| A5 | Carte, aperçu, « Voir la fiche » : on arrive au **bas** de la fiche (son haut est à −1 879 px), et le focus est hors écran (WCAG 2.4.11). | mesure à 390 et à 768 px | `src/Liste.tsx` (~l. 338, `scrollIntoView({block:'nearest'})`) | `block: 'start'`, et un e2e qui lit le nom peint |
| A6 | Toutes catégories décochées, le compte dit « Aucune brasserie à moins de 30 km » et, juste au-dessus, « La plus proche : Ninkasi, à moins de 1 km » (`plusProche` ignore les filtres). | mesure | `src/core/recherche.ts` (`plusProche`) ; `texteDuCompte` | dire « aucune catégorie cochée », et calculer « la plus proche » avec les filtres |
| A7 | Texte à 200 % : la barre collée prend jusqu'à 81 % de l'écran (601 px sur 740 avec une annonce) et cache le bouton qu'on vient d'activer. | mesure à 320 et à 390 px | `.barre-compte` (`src/index.css`) | décoller la barre au-delà d'environ 20 % de l'écran ; annonce en `lecteur-seul` |
| A8 | Thème sombre : les marqueurs se lisent mal sur les tuiles, qui restent claires (1,2 à 1,9:1). L'anneau de sélection (1,02:1) et le focus (1,25 à 1,84:1) sont invisibles. | calcul de contraste | `src/index.css:130-138,330-334,575` ; `src/Carte.tsx:60-76` | couleurs « sur carte » fixes, celles du thème clair ; tester `.marqueur` contre les tuiles |
| A9 | Un marqueur choisi et focalisé n'a pas d'anneau de focus distinct : la spécificité 0,2,0 bat `:focus-visible`. | lecture de la cascade | `src/index.css:334,575` | `.marqueur[aria-pressed='true']:focus-visible` |
| A10 | **Régression S70 (de moi)** : la case « Ouvertes ce week-end » a pris la pleine largeur prévue pour la case OSM (`:last-child`). La case OSM, au texte long, retombe en demi-colonne. Le commentaire de S70 est faux. | lecture et blame | `src/index.css:663,825` ; `src/App.tsx:650` | une classe explicite `case-large` |
| A11 | « Ouvertes ce week-end » et liste vide : le message accuse le week-end même quand la cause est le rayon, le texte ou un autre filtre. Il dit « n'ouvre » de fiches qui sont muettes, pas fermées. | lecture | `src/App.tsx:106` | ne le dire que si la liste serait non vide sans ce filtre |

### Mineurs

| # | Constat | Preuve | Où | Correctif |
|---|---|---|---|---|
| A12 | « L'effacement a échoué : rien n'a changé » est faux si seul l'oubli des tuiles échoue : favoris et carnet sont déjà effacés, et l'écran les montre encore. | lecture | `src/App.tsx:418-423` | séquencer, et dire ce qui a été fait |
| A13 | « Tout effacer » après une ouverture par le raccourci « Mes favoris » réécrit aussitôt `favorisSeulement: true`. | lecture | `src/App.tsx:248,393-409` | `setFavorisParRaccourci(false)` dans `remettreAZero` |
| A14 | Une couche OSM arrivée après 3 s est jetée jusqu'au rechargement. Les favoris OSM restent comptés mais sont invisibles. | lecture | `src/main.tsx:34-44` | passer la promesse à `App` |
| A15 | Deux onglets : le dernier qui écrit remet les réglages de l'autre, par exemple le rayon. | lecture | `src/App.tsx:257-262` ; `src/stockage.ts:81-91` | n'écrire que les champs changés |
| A16 | Les visites et notes d'une fiche renommée ou retirée sont gardées, invisibles et impossibles à nettoyer. | lecture | `src/App.tsx:365` ; `src/core/sauvegarde.ts:99` | orphelins pour les visites et les notes |
| A17 | Un lien `#fiche=…` collé dans un onglet déjà ouvert est ignoré : il n'y a pas de `hashchange`. | lecture et grep | `src/App.tsx:143` | écouter `hashchange` |
| A18 | L'empreinte du service worker ignore les fichiers non hachés (`communes-france.json`, `theme-precoce.js`) : le précache garde l'ancienne copie. | lecture | `build/precache-sw.ts:41` | hacher aussi leur contenu |
| A19 | *Latent* : à la future version 2 de la base IndexedDB, un onglet resté en version 1 dira « navigation privée ». | lecture | `src/stockage.ts:40` | traiter `VersionError` comme `versionFuture` |
| A20 | L'option active de la liste des communes est presque invisible (1,20:1), et la liste n'a pas de `:hover`. | calcul | `src/index.css:733` | bord gauche de 3 px en cuivre et graisse 600 |
| A21 | Plusieurs boutons sont en police native (Arial 13,33 px) et ne suivent pas la taille du texte : « Imprimer une affichette », « Chercher partout », « Recharger la page » de la carte en échec, et le bandeau de mise à jour. | `getComputedStyle` | `.bouton-lien`, `.lien-bouton`, `.bandeau-mise-a-jour button` ; `src/CarteDifferee.tsx:89` | `button, input, select, textarea { font: inherit; color: inherit }` |
| A22 | Le jeton `--espace-1` est utilisé sans être défini : les lignes d'horaires perdent leur marge. | grep | `src/index.css:433` | définir `--espace-1` |
| A23 | À 320 px (et à 390 px avec le texte à 200 %), les puces des catégories coupent les mots (« Achete\|r ») et deviennent des ovales. | capture | `.categories` (`overflow-wrap: anywhere`) | une colonne sous environ 360 px |
| A24 | En anglais, la fiche dit « Open to visitors: closed… ». | capture | `src/textes/en.ts:356` (et l. 236) | « Visitor hours: » |
| A25 | L'annonce d'un geste (« … ajoutée à vos favoris ») reste collée au compte après d'autres gestes. | mesure | `annonce` (`src/App.tsx`) | la vider au prochain changement de critères |
| A26 | Le « carnet » est nommé partout, mais aucun écran ne le montre : le seul accès est le filtre inverse. | parcours | textes du carnet | une case « Seulement mon carnet », ou dire « vos visites » |
| A27 | Survols hors `(hover: hover)` : ils restent colorés après le toucher. Il n'y a aucun style `:disabled`. `:active scale` est actif même avec le mouvement réduit. | lecture | `src/index.css:622,623,686` | survols sous `(hover: hover)`, `button:disabled`, `:active` sous `no-preference` |
| A28 | Trou d'un pixel entre `max-width: 899px` et `min-width: 900px` (zoom, ratio de pixels fractionnaire) : aucune des deux règles ne s'applique. | lecture | `src/core/ecran.ts:7-8` ; `src/index.css` | `(width >= 900px)` / `(width < 900px)` |
| A29 | *Non établi* : le bouton « Installer » peut ne jamais paraître, si `beforeinstallprompt` arrive avant le rendu. | lecture | `src/Installer.tsx:29-38` | poser l'écouteur dans `main.tsx` |

### Cosmétiques

| # | Constat | Où |
|---|---|---|
| A30 | « à moins de 30 km de Annecy » : l'élision manque, pour toute commune à voyelle initiale. | compte, « Distance maximale » |
| A31 | Les cases à cocher sont écrasées (13×18 au lieu de 18×18) quand l'étiquette fait deux lignes. | `.case input { flex: none }` |
| A32 | Un guillemet reste seul en bout de ligne dans l'annonce (« « » / nom). | espaces fines insécables |
| A33 | Le texte transparaît sous la barre collée (fond à 97 %). | `.barre-compte` |
| A34 | Le titre « Où » est en double dans la fiche. « Touchez une brasserie… » est écrit aussi sur ordinateur. L'URL imprimée de l'affichette est encodée (`%20`). | `Liste.tsx`, `MesFavoris.tsx`, `Affichette.tsx` |

## T — Textes et chiffres faux

| # | Constat | Où |
|---|---|---|
| T1 | « 358 fiches » écrit au lieu de 348 (10 retirées en S298). `CLAUDE.md` dit encore « 166 lignes ». | `README.md:17` ; `docs/LINKEDIN.md:19` ; `docs/MARKETING.md:18` ; `docs/ETAT.md:13` |
| T2 | « Quoi de neuf » dit « 130 placées au centre » ; il y en a 214 en `centre`. Ailleurs, « 13 gardent leur point » ; il y en a 12. Aucun test ne vérifie ces nombres. | `src/core/nouveautes.ts:15,41` |
| T3 | Commentaires chiffrés périmés : « 125 sur 358 » au lieu de 113 sur 348 ; « 1 236 » au lieu de 1 226 ; contrastes « 9,4 et 6,4 » au lieu de 9,03 et 6,17. | `src/core/fiche.ts:117` ; `src/core/sauvegarde.ts:32` ; `src/index.css:577` |
| T4 | `docs/DESIGN.md` dit que le compte ne colle plus sous 700 px, alors que le code le garde collé. Son tableau des jetons est incomplet. | `docs/DESIGN.md` |
| T5 | « Le seul endroit qui pose `target="_blank"` » est faux : `Carte.tsx` en pose un (le test le sait). | `src/LienExterne.tsx:7` |
| T6 | « 259 sans horaires » ; il y en a 258. | `docs/ETAT.md:22` |

## C — CI, workflows, crochets

| # | Gravité | Constat | Où |
|---|---|---|---|
| C1 | majeur | Le crochet de démarrage lit « main rouge » sur les 3 derniers runs, tous workflows confondus. Une sonde de nuit rouge déclenche l'arrêt §9 à tort ; trois nuits vertes cachent une CI rouge. | `.claude/hooks/etat-deploiement.sh:23` → `--workflow ci.yml` |
| C2 | majeur | Le crochet de commit se contourne par `git -C . commit`, `git -c … commit` ou deux espaces. Sans `jq`, il sort en 0 sans rien dire. | `.claude/hooks/porte-avant-commit.sh:20-24` ; `.claude/settings.json:11` |
| C3 | majeur | La porte locale ne lance ni la garde de `data/` ni `npm audit`, contrairement à la CI : une ligne sans accord ne rougit qu'après le push. | `porte-avant-commit.sh:40-49` contre `ci.yml:37-45` |
| C4 | majeur | `retries: 2` en CI : un test instable passe vert dans la porte (§1bis). | `playwright.config.ts:49` |
| C5 | mineur | `visuel-references` grave les captures sans comparaison. Son commit, fait avec `GITHUB_TOKEN`, ne relance pas la CI, et le push est rejeté si la branche a avancé. | `.github/workflows/visuel-references.yml:45,73-78` |
| C6 | mineur | CODEOWNERS ne couvre pas `.claude/settings.json`, `package.json`, `playwright.config.ts` ni `vite.config.ts`. La protection de `main` n'est pas lisible d'ici (403). | `.github/CODEOWNERS` |
| C7 | mineur | Les actions ne sont pas épinglées par SHA, y compris le déploiement Pages avec `id-token: write`. Il n'y a pas de Dependabot. | `.github/workflows/ci.yml` |
| C8 | mineur | `cancel-in-progress: true` sur Pages peut couper une publication. Un commit intermédiaire de `main` n'est jamais validé. | `ci.yml:157-159` |
| C9 | mineur | La sonde de la page publiée ne vérifie pas que c'est la nouvelle version qui est servie. `porte`, `deploiement` et `page-publiee` n'ont pas de `timeout-minutes`. | `ci.yml:187-191` |
| C10 | mineur | La mutation fait `npm install --no-save` hors du fichier de verrouillage : elle n'est pas reproductible. | `.github/workflows/mutation.yml:29` |

## D — Dette de conception (pas des bugs, mais des pièges)

- **Identité par le nom** (`b.n`) pour les favoris, le carnet et les notes :
  renommer une fiche rompt l'historique en silence (voir A16).
- **Les phrases d'état d'ouverture** (« ouvert… », « fermé… »,
  « inconnu ») sont recopiées dans `Horaires.tsx` et `EnBref.tsx`. Le
  choix « accueil sinon le premier bloc » est écrit deux fois
  (`EnBref.blocPrincipal`, `etatPourLaListe`).
- **Les décalages des numéros d'un lot** sont recalculés à la main dans
  `regle.ts`, `curation.ts` et `apercu.ts`, sans test sur un lot mixte.
- **`filtresOuverts`** (`App.tsx:203`) refait à la main la règle de
  `filtresActifs`. Rien ne lie `EtatFiltres` à `Criteres`.
- **111,32 km par degré** est écrit trois fois, et `Carte.emprise()` copie
  `empriseDesPoints`.
- **CSS** :
  - couches v1 et v2 empilées ;
  - règles mortes (`.avertissement`, `.contenu`, la bande `.ligne.cat-N`
    écrasée) ;
  - 17 tailles de texte et `#7a3410` écrits en dur ;
  - 4 jetons inutilisés ;
  - z-index sans échelle ;
  - noms en miroir (`.bouton-lien` / `.lien-bouton`).
- **Exports jamais importés ailleurs** : `confianceSchema`,
  `periodeSchema`, `lotSchema`, `passeLesFiltres` et d'autres.

## Ordre proposé

1. **W1 à W4**, avant tout travail sur le PC fixe.
2. **Les majeurs de l'application, qui sont courts** : A10 (ma régression),
   A3, A1, A5, A6, A11, puis A4 et A7, qui touchent la mise en page.
3. **T1 à T6** : un seul passage, par `grep` sur les formules (§3), plus un
   test qui compare les chiffres du README aux données.
4. **C1 à C4.**
5. **A8 et A9** : les couleurs sur la carte, à faire avec un test de
   contraste des marqueurs contre les tuiles.
6. **Le reste**, au BACKLOG.
