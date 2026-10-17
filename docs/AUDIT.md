# Audit applicatif — Mousse de Poche (PWA)

**Date :** 16–17/10/2026.
**Cible :** la page publiée https://opaland.github.io/Brewery-map/. Chromium l'atteint depuis le conteneur (HTTP 200).
**Version auditée :** S27, commit `207acf2`, service worker `EMPREINTE = '28cc2a841e10'`, `index-7CWtaCos.js`. L'empreinte a été relevée identique avant et après la dernière série de mesures.

Le site a été redéployé pendant l'audit, à 23:38:57 UTC : on est passé de S25 (`ac3c487`) à S27. Toutes les mesures rapportées ici ont donc été **refaites sur S27**. Les premières mesures, prises sur S25, ne servent plus.

**Outils.** Aucun serveur MCP Playwright n'était disponible dans cette session. L'audit a donc été mené avec **Playwright en direct** (`@playwright/test`, même moteur, Chromium `/opt/pw-browsers/chromium`), complété par `@axe-core/playwright` 4.13.0 et **Lighthouse 13.5.0** (mobile par défaut, puis `--preset=desktop`).

Les scripts, les sorties JSON et les captures sont dans `/tmp/claude-0/-home-user-Brewery-map/bf8d8eba-e105-539f-8d74-e0e0993a4d77/scratchpad/audit/` (`sorties/`, `captures/`, `lh/`). Aucun fichier du dépôt n'a été modifié.

**Méthode hors ligne.** `context.setOffline` ne coupe pas les requêtes du service worker (CLAUDE.md §1). J'ai donc placé devant Chromium un **relais CONNECT** écrit pour l'audit (`commun.mjs`). Pour simuler le hors-ligne, ce relais ferme tous les tunnels ouverts et refuse les nouveaux. La coupure vaut pour la page, les workers et le service worker : 151 connexions refusées pendant le scénario.

---

## 1. Résumé chiffré

| Mesure | Mobile | Bureau |
|---|---|---|
| Lighthouse : performance, accessibilité, bonnes pratiques, SEO | **99 / 100 / 100 / 100** | **100 / 100 / 100 / 100** |
| LCP / FCP | 1,7 s / 1,7 s | 0,4 s / 0,4 s |
| TBT / CLS | 0 ms / 0,004 | 0 ms (2,5) / 0 |
| Poids transféré (requêtes) | 222 Kio (22) — carte non chargée, elle attend le défilement | 916 Kio (36), dont 9 tuiles OSM ≈ 410 Ko |

| Domaine | Résultat |
|---|---|
| axe WCAG 2.2 A/AA, 7 états | 0 violation sur 5 états ; `target-size` sur des marqueurs de carte dans 2 états (exception « équivalent », voir Info) |
| Clavier | 90 arrêts ; 0 sans indicateur de focus, 0 hors écran, 0 masqué (le seul cas relevé est un faux positif) |
| Zoom texte 200 % | **défilement horizontal** : 544 px de contenu pour 320 ou 412 px d'écran |
| Responsive (320 → 1440 px) | 0 débordement, 0 chevauchement réel |
| Hors ligne après une visite | liste (53), fiche, couche France (994), commune proche : OK ; commune lointaine : non (et c'est annoncé) |
| Mise à jour | bandeau 192 ms après `update()` ; rechargement OK ; **le second onglet garde un bouton inopérant** |
| Requêtes contenant la position (géolocalisation simulée) | **0 sur 215** |
| Erreurs JS (`pageerror`) / HTTP ≥ 400 / violations CSP de l'application | **0 / 0 / 0** |
| 4G lente simulée (latence 562,5 ms, ≈ 1,3 Mb/s, CPU ×4), 3 essais | liste visible en **2,87–3,01 s** ; carte montée **+3,5 s** ; marqueurs **+6,0–6,2 s** ; 161 Ko pour le premier écran |

**Bilan des trouvailles :** 0 Bloquant · 2 Majeurs · 5 Mineurs · 9 Info.

---

## 2. Trouvailles

### Bloquant

Aucune.

### Majeur

#### M1 — À 200 % de taille de texte, la page défile horizontalement (WCAG 1.4.4 et 1.4.10)

- **Mesure.** J'ai porté la taille de police racine à 200 % (l'interface est en `rem` ; le corps passe à 30 px), avec `isMobile:false` pour que le navigateur ne dézoome pas. Résultat : `scrollWidth` = **544 px** pour une fenêtre de **320 px**, et 544 px pour 412 px. En émulation mobile, Chromium dézoome tout pour faire tenir la page : `innerWidth` passe à 544 et le texte rapetisse d'autant, ce qui annule l'agrandissement demandé.
- **Causes**, mesurées en largeur `min-content` :
  - les champs `commune-depart` et `recherche` ont une largeur intrinsèque de 492 px (`size` par défaut, 20 caractères, multiplié par la police doublée), et le `fieldset` de départ refuse de rétrécir sous ce contenu ;
  - le badge `.badge` (« À confirmer · OpenStreetMap ») est un `flex` sans retour à la ligne : 356 px.
- **Reproduction.** `node s3e.mjs`, ou bien : 320 px de large, `document.documentElement.style.fontSize='200%'`, puis comparer `document.documentElement.scrollWidth` à `innerWidth`.
- **Correction proposée**, vérifiée par injection de style (`s3h.mjs`) :
  - `.champ input { min-width: 0 }` ramène la largeur à 398 px ;
  - y ajouter `.badge { flex-wrap: wrap }` la ramène à **320 px**, soit plus aucun débordement.
  - Ajouter un test e2e à 200 % et 320 px, et le voir rouge avant le correctif (§1).

#### M2 — Depuis Paris, « Lyon » ne propose pas Lyon

- **Mesure.** Départ Paris, je tape « Lyon » dans le champ de commune. Options proposées : « Lyons-la-Forêt (27) », « Beauficel-en-Lyons (27) », « Beauvoir-en-Lyons (76) ». Statut affiché : « 3 communes dans les départements à moins de 100 km. » **Lyon (69)** n'apparaît qu'après « Chercher partout en France ». Depuis Brignais, « Porcelette » et « Brest » sont trouvées directement : aucune commune proche ne leur ressemble, donc la recherche passe d'elle-même à toute la France.
- **Cause.** `ChoixCommune.tsx` : `chercherPartout = partout || (etatProches !== 'attente' && pres.length === 0)`. Une correspondance partielle proche suffit à masquer la France. Une grande ville homonyme partielle d'une petite commune proche est le cas courant.
- **Reproduction.** Choisir Paris (75), puis taper « Lyon » dans « Ou partir d'une commune ». Script : `s5_fonc.mjs`, `communes.Lyon` (`trouveSansPartout: false`, `viaChercherPartout: true`).
- **Correction proposée.** Passer aussi à toute la France quand aucune commune proche n'a un nom **égal** au texte normalisé, ou dès 3 caractères quand le fichier France est déjà en mémoire. Test à écrire : depuis Paris, « Lyon » propose Lyon (69).

### Mineur

#### m1 — Dans un second onglet, le bouton « Recharger » ne fait plus rien

- **Mesure.** Deux onglets ouverts ; une nouvelle version arrive ; les deux affichent le bandeau. On clique « Recharger » dans l'onglet 1 : il recharge, le nouveau service worker s'active et l'ancien cache est supprimé.
  - Dans l'onglet 2, le bandeau reste affiché (`onglet2Bandeau: 1`).
  - Un clic sur son « Recharger » ne recharge pas (`onglet2RechargeApresClic: false`), parce que `reg.waiting` est déjà `null` et `activationDemandee` était faux au `controllerchange`.
  - L'onglet 2 continue donc sur l'ancien JS, servi par un service worker qui n'a plus l'ancien cache.
- **Reproduction.** `s2b.mjs`, qui sert une copie de `dist/` en local et change l'empreinte de `sw.js`.
- **Correction proposée.** Dans `activerNouvelleVersion`, si `reg.waiting` est `null`, faire `location.reload()`. Ou bien, sur `controllerchange`, remplacer le bandeau par un « Rechargez pour finir la mise à jour » qui recharge.

#### m2 — Pastille « Plusieurs brasseries » invisible en thème sombre (WCAG 1.4.11)

- **Mesure.** `.pastille-groupe` a un fond `#1e2b23` sur une page `#161c18` : contraste **1,17:1** (minimum 3:1). En clair, il est de 13,79:1.
- **Reproduction.** Thème sombre, carte chargée, légende sous la carte. Capture : `captures/legende-dark.png` ; script `s3j.mjs`.
- **Correction proposée.** Un liseré clair, comme sur les marqueurs de groupe de la carte (`border: 2px solid #fff`), ou une couleur propre au thème sombre.

#### m3 — Le texte de confidentialité promet « à quelques kilomètres près », mais un zoom manuel envoie la zone à moins d'un kilomètre

- **Mesure.** Position simulée 43.296482, 5.369780, puis « Autour de moi », puis zoom au maximum avec le bouton « + » (désactivé à `ZOOM_MAX = 14`).
  - Requêtes de tuiles jusqu'au **niveau 15** : MapLibre demande, en raster 256 px, un niveau au-dessus du zoom de la carte.
  - Les tuiles **contenant la position** ont été demandées aux niveaux 10 à 14. Au niveau 14, une tuile mesure ≈ 1,78 km à cette latitude ; au 15, 0,89 km.
  - Le texte affiché dit : « ce serveur voit donc cette zone, à quelques kilomètres près ».
  - Rien ne part sans geste : au chargement, le cadrage sur 30 km reste vers le niveau 9-10. Aucune coordonnée n'est envoyée.
- **Reproduction.** `s6_secu.mjs`, section `tuiles` de `sorties/s6_secu.json`.
- **Correction proposée.** Dire « à environ un kilomètre près si vous zoomez », ou poser `maxzoom: 14` sur la **source** raster (aujourd'hui 19) pour que les tuiles ne dépassent jamais le niveau 14.

#### m4 — La liste commence à plus de deux écrans sur téléphone

- **Mesure.** Haut de la première ligne de liste, pour une hauteur d'écran de 760 px :
  - 1 916 px à 320 px de large (2,5 écrans) ;
  - 1 781 px à 375 px ;
  - 1 736 px à 412 px (2,3 écrans).

  Le sélecteur « Ou parcourir un département » de S27 a ajouté environ 156 px par rapport à S25 (1 580 px à 412 px). Le compte reste collé en bas, si bien que le nombre de résultats se voit dès le premier écran.
- **Reproduction.** `s4_resp.mjs` (`ligne1Y`) ; captures `resp-*-premier-ecran.png`.
- **Correction proposée.** C'est une question de présentation, à trancher au jugement (§2). Pistes : replier les filtres secondaires (département, favoris) derrière « Plus de filtres » sur petit écran, ou ajouter dans le compte collant un lien « Voir la liste ».

#### m5 — Pas de `favicon.ico` ni d'Open Graph

- **Mesure.**
  - `favicon.ico` répond 404, à la racine du projet comme à celle du domaine. Seule une icône SVG est déclarée, que Safari n'utilise pas comme favicon d'onglet dans ses versions anciennes. Chromium n'a fait aucune requête 404.
  - Aucune balise `og:*` ni `twitter:*`. Or S27 ajoute « Partager une fiche » (`#fiche=…`) : un lien collé dans une messagerie s'affichera sans titre enrichi ni image.
- **Correction proposée.** `og:title`, `og:description`, `og:image` (une capture de 1200 × 630 dans `public/`), `og:locale=fr_FR`, `twitter:card=summary_large_image`, et un `favicon.ico` de 32 px.

### Info

- **I1 — Cache HTTP court (Lighthouse `cache-insight`).** GitHub Pages sert les fichiers hachés avec `max-age=600`, ce qui fait 143 Kio « à gagner » sur mobile et 408 Kio sur bureau. On ne règle pas ces en-têtes sur Pages ; le service worker compense dès la deuxième visite.
- **I2 — Autres insights Lighthouse, d'un poids nul dans le score.**
  - JS inutilisé : 45 Kio sur `index` en mobile ; 209 Kio en bureau, dont 61 % de `Carte-*.js` (MapLibre).
  - CSS bloquant : 2,9 Ko.
  - `valid-source-maps` (bureau) : pas de source map pour `Carte-*.js`.
  - `csp-xss` (informatif) : CSP posée en `<meta>`.
- **I3 — Marqueurs de carte et `target-size` (axe).**
  - Lyon : 1 nœud (« Vienne Brewing Company », 8,3 × 24 px dégagés).
  - 320 px : 2 nœuds (« La Tit'Mousse », « La Dame de Malt »).
  - L'exception WCAG 2.5.8 « Equivalent » s'applique (la liste fait la même chose) ; elle est documentée dans `accessibilite.spec.ts`, qui exclut d'ailleurs les marqueurs de son balayage.
- **I4 — axe `incomplete color-contrast` (1 nœud), dans la zone de la carte.** axe ne sait pas lire le fond d'un canvas. Il disparaît quand la carte n'est pas chargée.
- **I5 — Échap ne referme pas une fiche.** Ce n'est pas exigé : un bouton « Refermer la fiche » existe et rend le focus à la ligne (mesuré).
- **I6 — Combobox de commune.** Après la saisie, la première option est déjà active (`option-0`) : Entrée choisit « Brest (29) ». Une flèche bas passe à « Brestot (27) ». C'est conforme au motif APG avec sélection automatique, mais à garder en tête pour qui appuie sur la flèche par réflexe.
- **I7 — Hors ligne, la recherche d'une commune lointaine échoue.** « Brest » donne : « La liste de toutes les communes n'a pas pu se charger (connexion ?) ». Le fichier France (≈ 481 Ko gzip) n'est pas précaché ; le pied de page le dit.
- **I8 — Bruit de console hors ligne.** 135 `Failed to load resource: net::ERR_FAILED`, venus des tuiles jamais vues après un recadrage. Le message « Fond de carte incomplet ou indisponible » s'affiche bien.
- **I9 — `frame-ancestors` inopérant en `<meta>`.** La page peut être encadrée par un tiers. Pages ne permet pas d'en-tête ; c'est déjà assumé dans `build/csp.ts`. Il n'y a pas de `robots.txt` (404), ce qui est sans effet sur l'indexation.

---

## 3. Vérifié sans défaut

### PWA

**Manifeste.** Chromium (`Page.getAppManifest`) le lit sans erreur.
- Champs : `name`, `short_name`, `lang: fr`, `start_url` et `scope` résolus en `/Brewery-map/`, `id` implicite identique, `display: standalone`, couleurs présentes.
- Icônes : 192 × 192, 512 × 512 et maskable 512 × 512 répondent 200, dimensions conformes. La maskable est entièrement opaque (0 pixel transparent) et uniforme hors du cercle de sécurité de 40 % (0 pixel différent sur 130 391).

**Installabilité.** Avec un profil persistant, `getInstallabilityErrors` renvoie `[]` et le bouton « Installer » apparaît. En contexte incognito, la seule erreur est `in-incognito`, ce qui est attendu.

**Service worker.**
- Cycle de vie : `installing` à 727 ms, `installed` à 1 161 ms, `activated` à 1 164 ms.
- La page est contrôlée, la portée est `/Brewery-map/`.
- Les 13 fichiers précachés sont tous dans `mousse-app-28cc2a841e10` (0 manquant).
- Les tuiles vues sont mises en cache : 4 sur 4.
- Le pied de page passe à « Prête pour une utilisation hors connexion ».

**Hors ligne (vraie coupure).**
- Le rechargement répond 200 depuis le service worker : 53 lignes, bandeau « Hors connexion ».
- Une fiche s'ouvre.
- La commune « Lyon » est trouvée (4 résultats, départements proches en cache).
- La couche France est là (case présente ; « Brest » tapé donne 2 fiches OSM).
- Un nouvel onglet ouvert hors ligne, à froid, affiche 53 lignes et 994 fiches OSM.
- La carte montre les zones déjà vues sans le message d'absence de fond.

**Mise à jour.** Pas de bandeau à la première visite. Il apparaît (`role="status"`) quand une version attend ; le clic recharge et l'ancien cache est supprimé.

### Accessibilité

- axe : 0 violation sur l'accueil, la fiche OSM, la fiche vérifiée, le thème sombre et la fiche en thème sombre.
- Clavier :
  - le lien d'évitement est visible au focus et mène à `#titre-liste` ;
  - Entrée ouvre la fiche, Espace ajoute aux favoris avec une annonce ;
  - « Refermer la fiche » rend le focus à la ligne.
- Cibles tactiles : toutes font au moins 44 px, hors liens en ligne dans des phrases (« La signaler » 70 × 16, crédit OSM).
- Zoom 200 % : axe ne trouve aucune violation de plus (le débordement de M1 reste à corriger).

### Responsive

À 320, 375, 412, 768, 1024 et 1440 px : 0 débordement horizontal, 0 chevauchement entre contrôles. Le seul cas relevé (`tout-effacer` sous la liste) est un faux positif : le bouton est dans un `<details>` fermé, `checkVisibility() = false`.

### Parcours fonctionnels

**Communes de départ.**

| Départ | Brasseries à 30 km | dont OSM | Remarque |
|---|---|---|---|
| Porcelette (57) | 3 | 3 | trouvée en 879 ms, fichier France compris |
| Brest (29) | 13 | 13 | |
| Paris (75) | 48 | 48 | |
| Lyon (69) | 52 | 8 | voir M2 |

**Nom tapé.** « Ninkasi » donne 3 fiches, toutes distances. Un nom inconnu donne « Aucune brasserie ne correspond. ».

**Filtres.**
- Catégories décochées une à une : 53 → 41 → 33 → 31 → 0.
- Sans OSM : 44.
- Rayon : 5 km → 2 ; 45 km → 73 ; 100 km → 207.

**Favoris.**
- L'ajout est annoncé.
- Ils sont partagés avec un second onglet : un retrait dans l'onglet 2 se voit dans l'onglet 1.
- « Seulement mes favoris » fonctionne.
- « Tout effacer » vide IndexedDB et l'autre onglet, et l'état tient après rechargement.

**« Y aller ».** Les liens Google Maps, Waze et `geo:` ne contiennent que la destination.

**Signalement.** Le lien `github.com/Opaland/Brewery-map/issues/new` ne porte que `title` et `body` (nom, commune, adresse et source de la fiche ; aucune position). La fenêtre s'ouvre avec `window.opener === null`.

**Partage (S27).** Le lien copié vaut `…/Brewery-map/#fiche=Zouma%C3%AF` : le nom seul.

### Erreurs

Parcours complet avec les vraies tuiles OSM :
- 0 `pageerror`, 0 réponse HTTP ≥ 400 ;
- 0 violation CSP venant de l'application, MapLibre et son worker `blob:` compris ;
- les seuls échecs réseau sont 39 tuiles en `ERR_ABORTED`, annulées par les zooms.

### Sécurité et confidentialité

**CSP.** La balise `<meta>` est le 1er élément du `<head>`. Script en ligne injecté : bloqué. `fetch` vers un tiers : bloqué. Image d'un tiers : bloquée. Les violations remontent bien (`securitypolicyviolation`).

**Liens.** Les 8 liens externes avec `target=_blank` ont tous `noopener noreferrer`. Deux liens externes n'ont pas de `target` (crédit OSM, « Code source ») ; ils n'ont donc pas besoin de `rel`.

**Position.**
- Aucune des 215 requêtes (page, workers et service worker), corps POST compris, ne contient la position. Il n'y a eu aucun POST.
- Avec une position, seul le fichier `communes-france.json` est demandé, pas celui du département de la position (13).

**Stockage.**
- `localStorage`, `sessionStorage` et cookies sont vides.
- IndexedDB `mousse-de-poche/reglages` ne contient que des préférences ; le départ y est `{type:'autour'}`, sans coordonnée.
- Les caches : application et tuiles.

### Performance réelle

Profil 4G lente (latence 562,5 ms, ≈ 1,3 Mb/s, CPU ×4), 3 essais :
- FCP et LCP de 2,82 à 2,98 s, CLS 0 ;
- la couche OSM est chargée à chaque essai, avant l'expiration de 3 s.

Même en 3G lente (2 000 ms, 400 kb/s), liste à 8,98 s, la couche OSM arrive quand même grâce au `modulepreload`, et sans le message d'échec.

Un second profil, « Fast 3G » (1,6 Mb/s), donne des résultats quasi identiques : liste à 2,78–2,87 s.

### SEO

`title`, `meta description`, `lang="fr"`, `theme-color`, icône SVG, `apple-touch-icon` et manifeste sont présents. Lighthouse donne 100 en SEO.

---

## 4. Limites

- **Pas de MCP Playwright.** C'est Playwright en direct, avec le même moteur Chromium. Aucun test sur Safari ni Firefox, aucun appareil réel.
- **Zoom 200 % simulé.** C'est un doublement de la taille de police racine (`font-size: 200%` sur `html`), pas le zoom texte natif d'Android ou d'iOS. L'interface est en `rem`, l'effet doit être comparable, mais il n'est pas prouvé sur un téléphone.
- **Mise à jour testée hors site public.** Elle l'a été sur une **copie locale** de `dist/` (identique au déploiement S27) dont j'ai changé l'empreinte de `sw.js` : on ne peut pas publier une version de test.
- **`eval` non mesurable.** Le test « `eval` bloqué » n'est pas probant : Playwright évalue par CDP, ce qui échappe à la CSP.
- **Installation non jouée.** L'installabilité est vérifiée par CDP et par l'apparition du bouton, mais l'invite d'installation n'a pas été déroulée.
- **Lighthouse mobile sans la carte.** Il ne fait pas défiler la page : son poids (222 Kio) n'inclut ni la carte ni les tuiles. Le poids avec la carte est mesuré en 4G lente : 732 Ko au moment où les marqueurs apparaissent.
- **Profils réseau approchés.** Ils reprennent les valeurs des préréglages DevTools, appliquées par `Network.emulateNetworkConditions`. Le temps « réseau calme » de la carte n'est pas rapporté : la mesure n'était pas fiable, `networkidle` étant déjà atteint.
- **Version en mouvement.** S27 a été publiée pendant l'audit ; tout ce qui précède est mesuré sur S27.
- **Captures.** 43 fichiers dans `captures/`, à revoir à l'œil pour ce qui ne se mesure pas (esthétique, hiérarchie).
