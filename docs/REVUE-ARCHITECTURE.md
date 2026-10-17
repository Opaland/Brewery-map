<!-- Revue d'architecture demandée par Cédric le 17/10 (« revues techniques avec des architectes logiciels », « bonne base sur l'automatisation des tests »). Rendue par un agent architecte, lecture seule ; recopiée telle quelle. Les stories proposées sont à placer dans docs/EPICS.md (numérotation : voir la fin). -->

# Rapport d'architecture : Mousse de Poche (17/10/2026)

Je n'ai modifié aucun fichier. Tous les chiffres viennent du dépôt : comptage direct, `node -e` sur les JSON, `ls -la dist/assets`, ou documents datés (AUDIT.md, VEILLE.md). Je n'ai lancé ni vitest ni Playwright, pour ne rien écrire dans `dist/` ni dans `test-results/`. Les durées de la suite sont donc **à mesurer** : c'est la première story proposée.

## Réponses courtes aux trois questions

1. **Base de données.** On garde le JSON versionné pour les fiches et IndexedDB pour les préférences. Aucun besoin mesuré ne justifie SQLite ni un service partagé. Le chantier utile est ailleurs :
   - donner à chaque fiche un identifiant stable ;
   - poser une garde mécanique sur `data/`.
2. **Agentique.** Elle vient d'abord en CI : une tâche planifiée, une clé en secret, des propositions dans `curation/` ouvertes en PR. Cela suppose qu'une garde mécanique interdise à toute PR d'agent de toucher `data/` sans accord. L'assistant dans l'application vient en dernier, peut-être jamais. Il casse l'invariant INV-4 (aucun serveur) et ouvre la politique de sécurité du contenu (CSP).
3. **Tests.** La pyramide est saine aux deux bouts. Il manque un étage, celui des composants avec interaction. Il manque aussi les mesures : durée de la suite, Lighthouse en CI, autres navigateurs, mutation outillée, tests visuels.

---

## 1. Architecture

### Forces (mesurées)
- **Un site sans serveur, cohérent de bout en bout.**
  - CSP stricte : `build/csp.ts:22`, `connect-src 'self' https://tile.openstreetmap.org`.
  - Elle est tenue par `tests/e2e/securite.spec.ts`, dont un test « aucune violation » sur un parcours complet.
  - L'audit du 17/10 relève **0 requête contenant la position sur 215** (`docs/AUDIT.md`, §1).
- **Les données sont validées là où elles entrent dans le bundle.**
  - `build/valider-donnees.ts:21-41`, plugin `enforce: 'pre'` ; même chose pour OSM en `:49-71`.
  - Un fichier invalide ne se publie pas.
  - `tests/unit/donnees.test.ts` vérifie aussi le fichier réel.
- **La curation est déjà outillée de façon sûre.**
  - `outils/curation.ts` n'écrit `data/` qu'avec `--ecrire <empreinte>` du diff lu par Cédric.
  - Si le lot a changé entre-temps, l'écriture est refusée.
  - Les propositions sont des fichiers versionnés dans `curation/` : 22 fichiers aujourd'hui, dont s53 (42 propositions) et s54 (73).
- **Le service worker est écrit à la main.**
  - Précache « tout ou rien » et repli sur le cache en cas de 404 ou 5xx : `public/sw.js`, environ lignes 50 à 100.
  - Il est exécuté tel quel dans un bac à sable par `tests/unit/sw.test.ts`.
- **Le démarrage est borné.**
  - IndexedDB : 2 s au plus (`src/stockage.ts:26`).
  - Couche OSM : 3 s au plus (`src/main.tsx:15`).
  - Les deux seuils sont justifiés en commentaire, comme le demande le §2 de CLAUDE.md.
- **Les performances sont mesurées.**
  - Lighthouse mobile 99/100/100/100 ; 222 Kio au premier écran (AUDIT.md §1).
  - La carte, chargée à l'approche, est gardée par `tests/e2e/performance.spec.ts`.
- **Une seule chaîne CI** : lint → tsc → vitest → build → e2e → déploiement → sonde (`.github/workflows/ci.yml`), avec `permissions: contents: read` par défaut.

### Risques
| # | Risque | Où | Pourquoi ça compte |
|---|---|---|---|
| R1 | **La fiche n'a pas d'identifiant stable : elle est identifiée par son nom `n`** | Favoris : `src/core/preferences.ts:58` (tableau de noms). Lien partagé : `src/core/partage.ts:15-19`. Visites et notes : même principe. | Le jour où un lot corrige un nom (accent, raison sociale, déménagement : S82, S83), les favoris, notes, visites et liens partagés de cette fiche se perdent sans rien dire. Ce risque grandit avec les lots. |
| R2 | **La règle « rien dans `data/` sans Cédric » n'est pas mécanique côté GitHub** | Aucun `CODEOWNERS` : `.github/` ne contient que `workflows/`. Seule garde : le skill veille §3 (`git diff … \| grep '^data/'`, une consigne). L'empreinte de `src/core/nouveautes.ts:13` ne protège pas : il suffit de la recopier. | La règle « PR verte et sans conflit = merge » (décision du 15/10) s'applique aussi à une PR d'agent. Une PR qui touche `data/` et met l'empreinte à jour passerait la porte. **C'est le prérequis de toute agentique en CI.** |
| R3 | La porte avant commit tient-elle encore dans son délai ? | Hook à 300 s (`.claude/settings.json:12`). Le commentaire dit « 5 tests en 5,1 s » (`.claude/hooks/porte-avant-commit.sh:7`, mesure du 15/10). On compte aujourd'hui **176 `test(` e2e** en un seul exécutant local (`playwright.config.ts:19`). | La mesure n'a pas été refaite. Si la porte dépasse 300 s, elle échoue ou finit désactivée, ce que le commentaire du hook prévoit lui-même. |
| R4 | Un seul moteur testé | `playwright.config.ts:39` : un seul projet, Pixel 7 sous Chromium. | ENF-06 (Chromium, Firefox, Safari) n'est pas prouvée. Or Safari est le navigateur des iPhone. |
| R5 | Les données sont pauvres | `data/breweries.json`, mesuré : 166 fiches. **101 en catégorie 0 « À confirmer » (61 %)**, **166 sur 166 placées au centre de la commune**, **0 fiche avec des bières**, 9 départements. | « Une fois les données bien remplies », on en est loin. Toute agentique *in-app* serait aujourd'hui une agentique sur du vide. |

### Dettes
- **`src/App.tsx` porte presque tout l'état.**
  - 981 lignes, 27 `useState`, 14 `useEffect` ; le composant commence ligne 117.
  - Il n'est testé que par les e2e : aucun test de composant avec interaction.
- **Deux listes qui disent la même chose (§4ter).** `tsconfig.node.json:31-40` énumère à la main les composants que les tests importent (`src/Contact.tsx`, `src/Bieres.tsx`…). Un nouveau test de rendu oblige à y penser.
- **Le JavaScript de `public/` n'est pas linté.** `eslint.config.js:18` ne vise que `**/*.{ts,tsx}`. `public/sw.js` et `public/theme-precoce.js` échappent au lint, alors que `sw.js` est le fichier le plus critique pour le hors-ligne.
- **Un champ mort.** `km` est validé (`src/core/schema.ts:214`) mais n'est lu nulle part dans l'interface. Le commentaire des lignes 21-23 le reconnaît.
- **Les préférences forment un seul objet sous une seule clé** (`src/stockage.ts:13`, `indexedDB.open(BASE, 1)` à la ligne 37).
  - Chaque changement réécrit tout : favoris, notes, visites.
  - Il n'y a ni version de schéma de stockage ni test de migration. `lirePreferences` est tolérante, ce qui atténue le risque.
- **Le plan a des doublons dans `docs/EPICS.md`** :
  - S98 et S209 (Firefox et WebKit) ;
  - S77, S190 et S210 (budgets et Lighthouse) ;
  - S74 et S163 (carte plein écran) ;
  - S111 et S192 (démarrage à froid) ;
  - S113 et S194 (stockage plein) ;
  - S87 et S202 (veille).
- **Le plus gros fichier du build** est `dist/assets/Carte-*.js` : 1 056 818 octets non compressés, plus `maplibre-gl-worker` à 507 027 octets. Il est chargé à la demande, donc ce n'est pas un risque au premier écran. Il pèse en revanche sur le précache.

---

## 2. Données : trois options

**État mesuré**
- `data/breweries.json` : 68 Ko, 2 491 lignes, 166 fiches.
- Couche OSM `src/donnees-osm/brasseries-osm.json` : 120 Ko, 994 fiches.
- Communes : 1,2 Mo pour `communes-france.json` et 1,3 Mo pour `public/communes/`.
- Préférences : IndexedDB, une base, un magasin, une clé.

### A. Garder le JSON versionné, plus IndexedDB local (l'état actuel)
- **Ce qu'il apporte**
  - Le diff de PR *est* la décision ligne par ligne de Cédric, ce qui sert directement INV-3.
  - L'historique git sert de journal d'audit.
  - La validation au build ; le hors-ligne par le précache.
  - Aucun serveur, compte ni traitement de données personnelles côté projet, ce qui sert INV-4.
  - La position reste dans le navigateur par construction.
- **Ce qu'il coûte**
  - Toute correction passe par une PR, donc par GitHub.
  - Pas de contribution sans compte GitHub (#38, S178).
  - Pas de synchronisation entre appareils : l'export par fichier (S37) la remplace.
- **Ses limites réelles**
  - Le poids du chunk et le temps de filtrage sur un téléphone lent, à 166 + 994 fiches. Aucun seuil de rupture n'est mesuré. Il faut le mesurer (S190), pas le supposer.

### B. SQLite (WASM, OPFS) ou IndexedDB enrichi, toujours local
- **Ce qu'il apporte** : des requêtes riches et des index, si la recherche devenait lente sur un très gros volume.
- **Ce qu'il coûte**
  - SQLite-WASM oblige à ajouter `'wasm-unsafe-eval'` à `script-src` (`build/csp.ts:19`). Cela affaiblit ENF-05.
  - Il ajoute un binaire au premier chargement, poids à mesurer. Cela va contre Bernard et son vieux téléphone.
  - Il double la source de vérité : JSON publié d'un côté, base locale de l'autre.
- **Quand il se justifie** : quand un test de performance montre que le filtrage en JS dépasse un budget mesuré. Pas avant.
- **Ce qui est utile tout de suite, côté IndexedDB, sans SQLite**
  - Versionner le schéma de stockage et tester la migration.
  - Séparer favoris, visites et notes en magasins distincts, si le carnet grossit au point qu'une réécriture coûte. À mesurer.

### C. Service partagé (Supabase, Cloudflare D1 et Worker, Firebase…)
- **Ce qu'il apporte**
  - Des signalements sans compte GitHub.
  - La synchronisation du carnet entre appareils.
  - Plusieurs éditeurs.
  - Un compteur d'audience.
- **Ce qu'il coûte**
  - Il **viole INV-4** (« aucun serveur, aucun compte, aucun traceur », `docs/PRD.md:37`). Il faut donc une décision écrite de Cédric qui amende le PRD.
  - Il faut ouvrir `connect-src` vers un nouvel hôte, mettre à jour ARCHITECTURE §4 et `securite.spec.ts`.
  - Côté RGPD, le projet devient responsable de traitement : adresses IP dans les journaux, carnet daté (lieux et dates de visite, donc des données personnelles), mentions, durée de conservation, hébergeur.
  - Une clé publique (« anon ») en lecture et écriture appelle le spam et le contrôle d'accès ligne par ligne. Il faut un compte chez le fournisseur et une maintenance.
  - La règle de confidentialité tient tant qu'on n'envoie que ce qui est saisi. Elle tombe dès qu'on synchronise « autour de moi » ou une commune tapée (BACKLOG.md:15 : la commune tapée ne quitte pas le navigateur).
- **Quand il se justifie** : quand Cédric décide d'accepter des contributions publiques en volume, ou d'avoir plusieurs curateurs. Même alors, le minimum suffit : un point d'entrée qui *crée une issue GitHub*, sans base de données. Les données restent dans le JSON, et la décision reste une PR.

### Recommandation
**Rester en JSON versionné et en IndexedDB.** Investir à la place dans quatre chantiers :
1. un **identifiant stable par fiche**, avec une table de renommage ;
2. une **garde mécanique de `data/`** : CODEOWNERS, protection de branche et un job CI dédié ;
3. un **budget de poids et de filtrage mesuré** ;
4. le **versionnage du stockage local**.

Ne rouvrir la question d'un service partagé que si Cédric veut des contributions sans GitHub, et le faire par un relais vers les issues, pas par une base.

---

## 3. Agentique avec une clé Anthropic

**Le cadre qui ne bouge pas**
- Une clé ne peut vivre que dans un secret de CI ou sur un serveur, jamais dans `dist/`.
- Les agents écrivent dans `curation/`, jamais dans `data/`.
- Toute affirmation garde sa source, et `controler` rouvre la source.

**Coût** : le repère mesuré est de **157 à 167 k tokens pour 25 fiches** (S12–S13, `docs/VEILLE.md`). Le coût en euros, c'est ce volume multiplié par le tarif du modèle choisi au jour de l'armement, à lire sur la page des tarifs. Je ne l'ai pas chiffré.

### Option 0 (existe déjà, sans clé API) : la veille par tâche planifiée Claude Code
- Elle est écrite (`.claude/skills/veille/SKILL.md`) et attend « arme la veille » (#33).
- Elle utilise l'abonnement de Cédric, pas une clé API.
- **Risque** : sa garde sur `data/` n'est qu'une consigne (R2).

### Option A : curation planifiée en GitHub Actions, clé en secret
- **Forme proposée**
  - Un workflow à part, `curation.yml`, déclenché par `schedule` et `workflow_dispatch`.
  - Clé dans `secrets.ANTHROPIC_API_KEY`, avec `environment: curation`, protégé.
  - Permissions limitées à `contents: write` et `pull-requests: write`, sur une branche `curation/*`.
  - Il lance les outils existants (`outils/curation.ts lot 10 --veille`, `outils/decouverte.ts`), fait vérifier chaque fiche par l'agent (Agent SDK, ou l'action officielle Claude Code, à vérifier au moment du choix), puis `curation.ts diff` et `controler`, et ouvre une PR.
- **Garde mécanique obligatoire**
  - Un job qui échoue si une PR modifie `data/**` sans accord (voir S57 ci-dessous).
  - CODEOWNERS sur `data/` avec revue de Cédric requise.
  - Exclure les PR `curation/*` de la règle « verte = merge » pour les lots qui contiennent des propositions.
- **Risques**
  - **Injection de consignes** par les pages web lues (sites de brasseries). Atténuée parce que la sortie n'est qu'une proposition, que `controler` vérifie la présence de la valeur sur la page, et que Cédric décide.
  - **Fuite de la clé** : secret limité à un environnement, jamais lancé sur `pull_request` venant d'un fork.
  - **Coût qui dérive** : borner en nombre de fiches (20 plus les signalements, comme le skill), pas en tokens.
  - **Invention** : la règle de VEILLE tient. Sans valeur trouvée sur la page, pas de proposition.
- **Ce qu'il apporte en plus de l'option 0** : il tourne sans session et laisse des journaux dans Actions.

### Option B : triage des signalements en CI
- Une issue « Signalement : » déclenche un agent qui retrouve la fiche (`curation.ts signalement`), lit la source et commente une proposition, sans rien écrire.
- **Risques** : le texte de l'issue est public, donc c'est une entrée hostile. Le workflow ne doit jamais avoir `contents: write`.
- Coût faible par issue, proportionnel au volume de signalements.

### Option C : assistant dans l'application, via un proxy serveur
- **Ce que ça implique**
  - Un relais (Worker) qui porte la clé.
  - `connect-src` ouvert vers lui.
  - La fin d'INV-4, donc une décision de Cédric.
  - Une limitation de débit, donc une identification (IP ou compte), donc un traitement RGPD.
- **Côté confidentialité**
  - Le relais ne doit recevoir ni la position ni la commune de départ.
  - Le tri par distance devrait donc rester local : l'assistant ne pourrait répondre qu'à « quoi » et jamais à « près d'où ».
- **Côté INV-1**
  - Les réponses doivent être contraintes aux fiches transmises en contexte et citer la fiche ; tout le reste se dit « À confirmer ».
  - Un modèle de langue peut formuler une affirmation fausse : il faut une évaluation automatique (réponses comparées aux fiches) avant toute mise en ligne.
- **Coûts** : par usage, non bornés par Cédric. Plus l'hébergement et la maintenance.
- **Variante C' : la personne apporte sa propre clé, depuis le navigateur.** Pas de serveur, mais la question part chez Anthropic, il faut ouvrir la CSP, et c'est un usage de niche.
- **Quand il se justifie** : quand les données sont remplies, et qu'une recherche déterministe (S99 « recherche unique », S155 « recherche par nom de bière ») s'est montrée insuffisante pour une persona.

### Ordre recommandé
1. La garde mécanique de `data/` (prérequis).
2. Armer la veille (option 0) ou l'option A : c'est le même skill, seul l'hôte change.
3. Le triage des signalements (option B).
4. Un agent de revue adverse automatique sur chaque PR (`relecteur-adverse` en CI).
5. Bien plus tard, peut-être jamais : l'option C, après décision écrite sur INV-4.

---

## 4. Tests

### Cartographie (comptée dans le dépôt)

Un `test(` placé dans une boucle `for` est compté une fois : le nombre réellement exécuté est plus élevé.

| Type | Existe | Mesure | Manque |
|---|---|---|---|
| Unitaires `src/core` (TDD) | Oui | 40 fichiers `tests/unit/*.test.ts`, **328 `it(`/`test(`**. Les plus gros : curation 48, recherche 27, preferences 24, osm-france 22, horaires 20 | Tests de propriété (S208) ; mesure de couverture (rien d'installé) |
| Rendu de composants | Partiel | 4 fichiers `*-rendu.test.ts`, 20 tests, `renderToStaticMarkup` en environnement node | **Aucun test d'interaction de composant** (pas de jsdom ni de Testing Library). `App.tsx`, `Liste`, `ChoixCommune`, `MesFavoris` ne sont couverts que par les e2e |
| Données | Oui | Schéma (14), fichier réel (1), OSM (22), curation et outil (48 + 6), empreinte `nouveautes` (2), build (3) | Garde CI « `data/` modifié sans accord » ; test d'identité stable des fiches |
| Service worker | Oui | `sw.test.ts` (4, exécution réelle dans une VM), `hors-ligne.spec.ts` (5) | Lint de `public/*.js` |
| E2E Playwright | Oui | 25 fichiers spec, **176 `test(`**. Les plus gros : partout 17, accessibilite 16, favoris 15, uiux 14, decouverte 14 | Durée non mesurée ; flakiness masquée par `retries: 2` en CI |
| Accessibilité axe | Oui | `accessibilite.spec.ts` (16, clair et sombre, WCAG 2.2 A/AA, cibles de 44 px) | forced-colors (S122), 400 % (S121), lecteurs d'écran réels (S96, preuve humaine) |
| Sécurité et confidentialité | Oui | `securite.spec.ts` (2 : CSP), « 0 requête avec la position sur 215 » à l'audit | Le contrôle « aucune requête ne contient la position » transformé en fixture appliquée à *tous* les e2e, pas seulement à un audit |
| Mutation | Manuelle | Notée dans SPRINTS.md (par exemple « cinq mutations de `ouvertMaintenant` survivaient ») ; aucun outil | Stryker sur `src/core` (S129), puis composants (S207) |
| Visuel | Non | Captures à l'œil (`outils/captures.ts`, `docs/captures`) | `toHaveScreenshot` sur quelques écrans figés (S124) |
| Performance | Partiel | `performance.spec.ts` (2 : la cause, le chunk à la demande) ; Lighthouse manuel 99/100/100/100 | Budgets de poids par chunk et Lighthouse en CI (S77, S190, S210, qui font doublon) |
| Sonde de la page publiée | Oui, minimale | `page-deployee.spec.ts` : 1 test (200, h1, mention alcool, carte, 0 asset en erreur, 0 erreur JS) | Parcours complet, hors-ligne publié, en-têtes et CSP publiés (S213) |
| Navigateurs | Chromium seul | `playwright.config.ts:39` | Firefox et WebKit en CI (S98 et S209, doublon) ; vrai iPhone (preuve humaine) |

### Stratégie cible
- **La pyramide**
  - **Base** : `src/core` en TDD, plus des tests de propriété (recherche, distance, horaires).
  - **Milieu** (à créer) : tests de composants en jsdom avec Testing Library, ciblés sur la logique d'interface d'`App` une fois celle-ci extraite en hooks. Cela allège les e2e.
  - **Haut** : Playwright limité aux parcours, à la confidentialité, au hors-ligne et à l'accessibilité.
  - **Hors porte** : mutation et visuel.
- **Budgets de temps CI**
  - Ne pas en inventer. D'abord mesurer : temps de chaque étape de `ci.yml` et temps de la porte locale à un seul exécutant.
  - Ensuite fixer par écrit un budget de porte locale compatible avec le délai de 300 s du hook, et un budget CI.
  - Si la porte locale dépasse son budget : ne garder qu'un sous-ensemble e2e étiqueté `@porte`. La suite complète, Firefox, WebKit et Lighthouse partent en CI, dans des jobs parallèles. La mutation et le visuel passent en job planifié chaque nuit, informatif, sans bloquer.
- **Quoi automatiser en premier**
  1. Mesurer les durées (sans mesure, pas de budget).
  2. La garde `data/` en CI et CODEOWNERS (la règle n° 3 du projet).
  3. La fixture « aucune requête ne contient la position » sur tous les e2e.
  4. Lint de `public/*.js`.
  5. Firefox et WebKit en CI.
  6. Budgets de poids et Lighthouse en CI.
  7. Tests de composants pour `App`.
  8. Stryker sur `src/core`, chaque nuit.
  9. Tests visuels.
  10. Sonde publiée étendue.

---

## 5. Stories proposées

**Attention à la numérotation.** `docs/EPICS.md` occupe déjà S55 à S228 : S56 à S58 sont des lots de positions, aux lignes 121-123. Pour insérer ces stories comme S56 et suivantes, il faut renuméroter les stories existantes, comme cela a été fait pour S51–S54 devenues S129–S132. L'autre voie est de les numéroter à partir de S229.

| Story | Contenu |
|---|---|
| S56 | Mesurer la porte : durée de chaque étape en local (un exécutant) et en CI ; corriger le commentaire périmé « 5 tests en 5,1 s » (`.claude/hooks/porte-avant-commit.sh:7`) ; fixer les budgets par écrit |
| S57 | Garde mécanique de `data/` : job CI qui échoue si `data/**` change sans un fichier d'accord `curation/accords/<lot>.md` portant l'empreinte du diff ; CODEOWNERS et revue requise de Cédric ; vue rouge avant d'être vue verte |
| S58 | Identifiant stable par fiche (champ `id`, proposé à Cédric **[C]**) ; favoris, visites, notes et liens partagés passent à l'`id`, avec migration depuis les noms et table de renommage testée |
| S59 | Fixture Playwright « aucune requête ne contient la position », branchée sur tous les e2e (géolocalisation simulée, contrôle des URL et des corps) |
| S60 | Lint de `public/sw.js` et `public/theme-precoce.js` (globals du service worker), et fin de la liste manuelle de `tsconfig.node.json:31-40` |
| S61 | Firefox et WebKit dans la CI, en jobs parallèles ; fusionne S98 et S209 |
| S62 | Budgets de poids par chunk et Lighthouse en CI, seuils tirés d'une mesure ; fusionne S77, S190 et S210 |
| S63 | Étage « composants » : jsdom et Testing Library, premiers tests d'interaction sur `ChoixCommune` (cas M2 de l'audit) et `MesFavoris` |
| S64 | Découper `App.tsx` (981 lignes, 27 `useState`) en hooks testables (filtres, carnet, départ), sans changement visible ; e2e inchangés et verts |
| S65 | Stockage local versionné : version de schéma, migration testée, magasins séparés si une mesure le justifie |
| S66 | Mutation outillée (Stryker) sur `src/core`, job de nuit, rapport des survivants ; remplace S129 |
| S67 | Tests visuels sur 5 écrans figés (liste, fiche, carte sans tuiles, carnet, à 200 %), job séparé ; remplace S124 |
| S68 | Sonde publiée étendue : parcours fiche, hors-ligne après visite, CSP publiée ; remplace S213 |
| S69 | Étude de la veille en GitHub Actions (clé en secret, `environment` protégé, permissions minimales, propositions seules en PR) face à la tâche planifiée Claude Code ; décision **[C]** |
| S70 | Triage des signalements en CI : un agent commente une proposition sourcée sur l'issue, sans droit d'écriture sur le dépôt ; après S57 et S69 **[C]** |

### Fichiers les plus utiles pour la suite
- /home/user/Brewery-map/.github/workflows/ci.yml
- /home/user/Brewery-map/playwright.config.ts
- /home/user/Brewery-map/src/App.tsx
- /home/user/Brewery-map/src/core/preferences.ts
- /home/user/Brewery-map/outils/curation.ts

Également cités : /home/user/Brewery-map/src/stockage.ts, /home/user/Brewery-map/src/core/partage.ts, /home/user/Brewery-map/build/csp.ts, /home/user/Brewery-map/.claude/hooks/porte-avant-commit.sh, /home/user/Brewery-map/tsconfig.node.json, /home/user/Brewery-map/eslint.config.js, /home/user/Brewery-map/docs/EPICS.md, /home/user/Brewery-map/docs/VEILLE.md, /home/user/Brewery-map/.claude/skills/veille/SKILL.md, /home/user/Brewery-map/src/core/nouveautes.ts
