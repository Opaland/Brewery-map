# Epics — S29 à S228

Demande de Cédric du 17/10 : « refais 20 sprints », puis « monte à 100
sprints ; regarde BMAD pour l'implémentation ». Ce fichier est la liste
ordonnée des stories, à la manière des epics de BMAD (voir `docs/METHODE.md`) ;
`docs/SPRINTS.md` reste le journal de ce qui a été fait, et les budgets.

**Règles qui priment sur le plan** (CLAUDE.md §0) :

- une story de **données** ne livre que des **propositions** (`curation/`) ;
  rien n'entre dans `data/` sans l'accord écrit de Cédric, ligne par ligne ;
- aucune donnée inventée, aucun chiffre non mesuré ;
- la position ne quitte jamais le navigateur ;
- arrêt quand le budget est épuisé (§9). À environ 150 k par sprint revue
  comprise, 100 sprints dépassent ce qu'il reste à la session du 17/10 :
  l'ordre ci-dessous est donc aussi un ordre de priorité, et ce qui n'est pas
  fait reste ici, prêt.

Marques : **[C]** attend une décision de Cédric avant de livrer autre chose
que des propositions ; **[H]** demande une preuve humaine (vrai téléphone,
autre navigateur).

## Priorité de Cédric (17/10) — avant tout le reste

Cédric, le 17/10 : « monte à 200 sprints, en agentic total » ; « lien vers
Untappd absent » ; « la localisation des brasseries ne correspond pas à
l'adresse sur la carte » ; « type de bière non affiché » ; « regarde sur le
web comment trouver, il y a pas mal d'infos sur Untappd ».

Constat : les 166 fiches de `data/` sont **toutes** placées au centre de
leur commune (`coordPrecision: commune`), aucune n'a de contact, de lien
Untappd ni de bière. Le code sait les afficher (S4, S5) ; les données
manquent, et elles n'entrent que par lot accepté (CLAUDE.md §0). Les stories
E6 et E7 passent donc devant, et les anciennes S51 à S54 sont renumérotées
S129 à S132.

| Story | Contenu |
|---|---|
| S51 | Fiche sans lien Untappd vérifié : un lien « Chercher sur Untappd » (le nom seul, jamais la position), dit comme une recherche, pas comme sa page ; même chose pour ses bières |
| S52 | Procédure de position : un lot peut proposer `lat`, `lon`, `coordPrecision` et `addr` ; `km` recalculé ; le diff dit de combien la fiche bouge. Outil de géocodage (Géoplateforme / BAN) |
| S53 | Lot Untappd et bières, les 166 fiches, en 17 paquets lus par des agents (page Untappd vérifiée, styles affichés par Untappd) **[C]** |
| S54 | Lot de positions : adresses publiées par les brasseries, géocodées à l'adresse ; points OSM rapprochés **[C]** |

## Priorité 2 : la revue d'architecture (17/10) — après S55, avant S56

Cédric, le 17/10 : « revues techniques avec des architectes logiciels », « une
bonne base sur l'automatisation des tests ». Rapport : `docs/REVUE-ARCHITECTURE.md`.
Numérotées après S228 pour ne rien renuméroter ; **exécutées avant S56**, dans
cet ordre. Elles absorbent des doublons du plan (indiqués).

| Story | Contenu |
|---|---|
| S229 | Mesurer la porte (local, CI), corriger le commentaire périmé du hook, budgets écrits |
| S230 | Garde mécanique de `data/` : job CI rouge sans accord de Cédric portant l'empreinte du diff ; CODEOWNERS — prérequis de toute agentique |
| S231 | Identifiant stable par fiche **[C]** ; favoris, visites, notes, liens passent à l'`id` (migration testée) |
| S232 | Fixture « aucune requête ne contient la position » sur tous les e2e |
| S233 | Lint de `public/*.js` ; fin de la liste manuelle de `tsconfig.node.json` |
| S234 | Firefox et WebKit en CI (remplace S98, S209) |
| S235 | Budgets de poids et Lighthouse en CI (remplace S77, S190, S210) |
| S236 | Étage « composants » : jsdom + Testing Library, `ChoixCommune`, `MesFavoris` |
| S237 | Découper `App.tsx` en hooks testables, sans changement visible |
| S238 | Stockage local versionné, migration testée |
| S239 | Mutation outillée (Stryker) sur `src/core`, job de nuit (remplace S129) |
| S240 | Tests visuels sur 5 écrans figés (remplace S124) |
| S241 | Sonde publiée étendue (remplace S213) |
| S242 | Veille en GitHub Actions avec clé Anthropic en secret, propositions seules en PR — décision **[C]** |
| S243 | Triage des signalements en CI, sans droit d'écriture **[C]** |

## E1 — Premier écran et navigation sur téléphone *(persona : Marie)*

Que la première minute soit claire et que la liste soit tout de suite là.

| Story | Contenu |
|---|---|
| S29 | Filtres secondaires repliés, liste avant la carte, bouton « Carte » dans la barre du compte |
| S31 | Restes de S27 : favori fermé dit, tournée qui l'écarte le dit, lien partagé qui laisse son nom, compteurs des départements avec les filtres |
| S32 | Aperçu d’une brasserie touchée sur la carte, sur téléphone (remplace la feuille basculante, refusée par une décision écrite : voir `docs/stories/S32.md`) |
| S33 | Mouvement : mousse dans l'en-tête, retours au toucher ; rien sous « moins d'animations » |
| S46 | Écran d'accueil d'une phrase à la première visite ; raccourcis de l'application installée |
| S74 | Carte plein écran sur téléphone, avec retour à la liste |
| S99 | Recherche unique (commune ou brasserie) : une étude, puis une décision de design |
| S100 | Revue de persona Marie sur l'ensemble de E1, et son correctif |

## E2 — La carte *(persona : Hugo)*

| Story | Contenu |
|---|---|
| S39 | Le point de départ au-dessus des groupes de marqueurs |
| S40 | Une brasserie choisie dans un groupe : signalée sur la carte |
| S41 | Le repli « fond de carte indisponible » ne clignote plus sur une tuile en échec |
| S75 | Groupes lisibles : nombre et catégories dominantes |
| S76 | Légende repliable, et filtres de catégorie depuis la légende |
| S101 | Zoom sur une région (département choisi) avec son contour |
| S102 | Revue de persona Hugo sur E2, et son correctif |

## E3 — Mon carnet, sur l'appareil *(persona : Bernard)*

Idée de la veille (passeports des routes du whisky et du vin), sans compte.

| Story | Contenu |
|---|---|
| S35 | Marquer une brasserie « visitée », avec sa date ; filtre « pas encore visitées » |
| S36 | Une note personnelle par brasserie |
| S37 | Sauvegarder et transférer favoris, carnet et notes : un fichier, aucun serveur |
| S80 | Le carnet en chiffres : départements et brasseries visités |
| S81 | Exporter le carnet en image (dans le téléphone) |
| S103 | Effacer le carnet : confirmation, et ce qui part avec |
| S104 | Carnet et onglets multiples (le canal des favoris étendu) |
| S105 | Carnet hors ligne : ce qui est gardé, dit à l'écran |
| S106 | Revue de persona Bernard sur E3, et son correctif |

## E4 — Partager *(persona : Léa)*

| Story | Contenu |
|---|---|
| S34 | Partager ma tournée en image, composée dans le téléphone |
| S38 | QR code et affichette imprimable par fiche, pour le comptoir des brasseries |
| S78 | Partager une recherche (filtres et département, jamais la position) |
| S79 | Kit pour les brasseries : texte, images, QR (`docs/KIT-BRASSERIES.md`) |
| S107 | Aperçu de lien par fiche (titre et description dans le lien partagé) |
| S108 | Imprimer une liste (feuille de route d'une tournée) |
| S109 | Revue de persona Léa sur E4, et son correctif |

## E5 — Hors ligne et poids *(persona : Bernard, téléphone ancien)*

| Story | Contenu |
|---|---|
| S42 | Communes de France gardées d'avance : la recherche marche hors ligne dès l'installation |
| S43 | Couche OpenStreetMap allégée, mesurée avant et après |
| S77 | Budgets de poids et Lighthouse vérifiés dans la CI |
| S110 | Zone de carte gardée hors ligne, à la demande, dite à l'écran |
| S111 | Démarrage à froid mesuré sur un téléphone lent simulé, et corrigé |
| S112 | Mise à jour de l'application : ce qui change, dit au bandeau |
| S113 | Stockage plein ou refusé : chaque cas dit à l'écran |
| S114 | Revue hors ligne complète (mode avion, du premier lancement au carnet) |

## E6 — Données : la vraie position *(persona : Cédric)* **[C]**

101 fiches ont une position communale (S59 : pas des centres, `docs/PRECISION.md`). Chaque coordonnée
proposée vient de la Base Adresse Nationale, adresse par adresse.

| Story | Contenu |
|---|---|
| S132 | Lot 1 de positions restantes après S54 *(ex-S54 ; l'outil est fait en S52)* |
| S55 | Lot 2 de positions |
| S56 | Lot 3 |
| S57 | Lot 4 |
| S58 | Lot 5 (dernier) |
| S59 | « Centre de la commune » : les 25 communes à plusieurs points, expliquées |
| S82 | Procédure de déplacement d'une fiche (brasserie déménagée), proposée à Cédric |
| S83 | Lot des fiches déménagées (Animus, La Gaudine…) |
| S115 | Positions des brasseries OSM rapprochées des fiches vérifiées : doublons |
| S116 | Revue métier de E6 |

## E7 — Données : contacts et horaires *(persona : Cédric)* **[C]**

| Story | Contenu |
|---|---|
| S60 | Outil : les étiquettes OSM (`phone`, `website`, `opening_hours`) des fiches vérifiées, rapprochées |
| S61 | Lot de contacts venus d'OSM |
| S62 | Lot de sites venus d'OSM — fondu dans S61 (`contact` est un seul objet) |
| S63 | Lot d'horaires venus d'OSM |
| S64 | SIRENE : adresses de siège, en propositions (si l'API répond) |
| S65 | Horaires par saison : proposition de schéma **[C]** |
| S66 | Lot d'horaires saisonniers |
| S67 | Curation des « À confirmer » de l'Ain et de l'Ardèche |
| S68 | Curation Drôme et Isère |
| S84 | Curation Loire et Haute-Loire |
| S85 | Curation Rhône |
| S86 | Curation Saône-et-Loire et Savoie |

## E8 — Fermée, nouveautés, veille *(persona : Cédric)*

| Story | Contenu |
|---|---|
| S44 | « Quoi de neuf » : ce qui a changé, tiré des données acceptées et des extraits OSM |
| S71 | Statut « fermée » proposé pour les fiches signalées (Dr D., Maltobar) **[C]** |
| S72 | Nouveautés du mois classées par région puis commune |
| S73 | Outil : différence entre deux extraits OSM (nouvelles, disparues) |
| S87 | Veille : rapport mensuel prêt à armer **[C : « arme la veille »]** |
| S88 | Découverte des brasseries absentes : Auvergne-Rhône-Alpes (hors fichier) |
| S89 | Découverte : Bourgogne-Franche-Comté |
| S90 | Découverte : Grand Est |

## E9 — Ouvert maintenant *(persona : Hugo)*

Ne s'active qu'avec des horaires acceptés (E7) ; d'ici là, rien ne
s'affiche qui ne soit établi.

| Story | Contenu |
|---|---|
| S69 | « Ouvert maintenant » dans la liste, pour les fiches à horaires |
| S70 | Filtre « ouvert ce week-end » |
| S91 | Jours fériés français dans le calcul d'ouverture |
| S92 | Horaires exceptionnels (fermeture annoncée) : schéma proposé **[C]** |
| S117 | Revue de persona Hugo sur E9 |

## E10 — Confort et langues *(persona : une visiteuse étrangère, à ajouter à PERSONAS.md)*

| Story | Contenu |
|---|---|
| S45 | Thème clair, sombre ou automatique, au choix |
| S48 | Interface en anglais (1/3) : le socle des textes |
| S49 | Anglais (2/3) : tous les écrans |
| S50 | Anglais (3/3) : revue de la persona étrangère |
| S93 | Taille du texte de l'application (réglage interne) |
| S94 | Unités et formats (km, heures) selon la langue |
| S118 | Allemand (les voisins de la Moselle et de l'Alsace) |
| S119 | Néerlandais |
| S120 | Revue des langues |

## E11 — Accessibilité et confiance *(persona : Inès)*

| Story | Contenu |
|---|---|
| S47 | Seconde passe sur les écrans nouveaux (feuille, carnet, QR) |
| S95 | « Confiance : faible » dit quoi faire : formulation proposée **[C]** |
| S96 | Lecteur d'écran : protocole d'essai TalkBack et VoiceOver **[H]** |
| S97 | Contrôle vocal et navigation par commutateur : cibles et noms |
| S121 | 400 % de zoom et orientation paysage |
| S122 | Contraste élevé (forced-colors) |
| S123 | Revue de persona Inès sur E11 |

## E12 — Méthode, qualité, livraison

| Story | Contenu |
|---|---|
| S30 | Méthode BMAD adaptée : PRD, architecture, epics, stories, `/preparer-story` |
| S129 | Mutation sur `src/core` : les tests creux *(ex-S51)* |
| S130 | Audit applicatif n° 2 *(ex-S52)* |
| S131 | Correctif de l'audit n° 2 *(ex-S53)* |
| S98 | Firefox et WebKit dans la CI (installés là-bas, absents du conteneur) |
| S124 | Tests visuels de non-régression (captures comparées) |
| S125 | Revue de sécurité (CSP, liens, dépendances) |
| S126 | Revue globale finale |
| S127 | Captures, README, post de lancement mis à jour |
| S128 | Rétrospective du plan v4, leçons portées dans CLAUDE.md (seulement des ratés datés) |

## Plan v5 (17/10) — S133 à S228

Demande de Cédric : « monte à 200 sprints ». Même règles ; les stories de
données livrent des propositions. L'ordre est un ordre de priorité.

### E13 — Les données, fiche par fiche *(persona : Cédric)* **[C]**

| Story | Contenu |
|---|---|
| S133 | Lot Untappd et bières, 2e passage : les fiches restées sans proposition, par d'autres sources (site officiel, annuaires) |
| S134 | Lot de sites officiels (lien `site`), lus et ouverts |
| S135 | Lot de téléphones publiés par les brasseries |
| S136 | Lot d'horaires lus sur les sites officiels |
| S137 | Lot de positions, 2e passage : adresses de siège SIRENE quand la brasserie n'en publie pas |
| S138 | Lot de fermetures : fiches dont la page dit « fermé définitivement » |
| S139 | Lot des « À confirmer » de l'Ain |
| S140 | Lot Ardèche |
| S141 | Lot Drôme |
| S142 | Lot Isère |
| S143 | Lot Loire |
| S144 | Lot Haute-Loire |
| S145 | Lot Rhône (hors Lyon) |
| S146 | Lot Lyon |
| S147 | Lot Savoie |
| S148 | Lot Haute-Savoie |
| S149 | Lot Saône-et-Loire |
| S150 | Lot Puy-de-Dôme et Allier |
| S151 | Les découvertes OSM les plus proches de Brignais, proposées en fiches vérifiées |
| S152 | Revue métier de E13 (persona Cédric) |

### E14 — Les bières *(persona : Karim)*

| Story | Contenu |
|---|---|
| S153 | Fiche : les bières groupées par type, la plus récente d'abord |
| S154 | Filtre par type : compter seulement les fiches renseignées, le dire (déjà) ; plusieurs types à la fois |
| S155 | Recherche par nom de bière |
| S156 | « Pale ale », « saison », « triple » : types à ajouter au schéma ? proposition **[C]** |
| S157 | Lien vers la page Untappd de chaque bière, dit comme tel |
| S158 | Bière sans alcool : filtre dédié |
| S159 | Bières de saison : marquées, avec leur source |
| S160 | Revue de persona Karim sur E14 |

### E15 — La carte, encore *(persona : Hugo)*

| Story | Contenu |
|---|---|
| S161 | Marqueur « à l'adresse » et « centre de commune » distincts, légende |
| S162 | Rayon dessiné sur la carte |
| S163 | Carte plein écran sur téléphone |
| S164 | Regroupement des marqueurs : seuil revu avec les vraies positions |
| S165 | Itinéraire de tournée sur la carte (ordre, sans service tiers) |
| S166 | Fond de carte hors ligne pour la région, à la demande (poids mesuré) |
| S167 | Retour à « ma position » d'un geste |
| S168 | Revue de persona Hugo sur E15 |

### E16 — Tournées *(persona : Léa)*

| Story | Contenu |
|---|---|
| S169 | Tournée : réordonner à la main |
| S170 | Tournée : distance totale, estimée et dite comme telle |
| S171 | Tournée : export GPX |
| S172 | Tournée partagée par lien, ouverte sur un autre téléphone |
| S173 | Tournée : jours où toutes sont ouvertes (si horaires connus) |
| S174 | Tournées gardées (plusieurs), sur l'appareil |
| S175 | Revue de persona Léa sur E16 |

### E17 — Pour les brasseries *(persona : une brasserie)*

| Story | Contenu |
|---|---|
| S176 | Page « Votre brasserie est sur la carte » : comment la corriger |
| S177 | Signalement guidé par champ (horaires, téléphone, bières) |
| S178 | Formulaire sans compte GitHub : étude **[C]** |
| S179 | Affichette : formats A5 et A6, mesurés |
| S180 | Kit presse de la brasserie (image de la fiche) |
| S181 | Revue de persona « une brasserie » sur E17 |

### E18 — Langues *(persona : Emma)*

| Story | Contenu |
|---|---|
| S182 | Choix de la langue dans l'interface (pas seulement celle du navigateur) |
| S183 | Relecture des traductions par une personne anglophone **[H]** |
| S184 | Allemand |
| S185 | Italien |
| S186 | Espagnol |
| S187 | Lien de fiche partagé : la langue de qui l'ouvre |
| S188 | Manifest et image de partage traduits |
| S189 | Revue de persona Emma sur E18 |

### E19 — Hors ligne, performance *(persona : Bernard)*

| Story | Contenu |
|---|---|
| S190 | Budget de poids par chunk, tenu par un test |
| S191 | Couche OSM découpée par région, chargée à la demande |
| S192 | Démarrage à froid mesuré sur téléphone lent simulé, budget tenu |
| S193 | Mise à jour des données sans recharger l'application |
| S194 | Stockage plein : le dire, sans rien perdre |
| S195 | Revue de persona Bernard sur E19 |

### E20 — Accessibilité, troisième passe *(persona : Inès)*

| Story | Contenu |
|---|---|
| S196 | Parcours complet au clavier seul, filmé par un test |
| S197 | Annonces du lecteur d'écran à chaque changement de liste, mesurées |
| S198 | Texte à 200 % sur toutes les fiches |
| S199 | Mouvement réduit : la carte sans animation |
| S200 | Daltonisme : catégories lisibles sans la couleur |
| S201 | Revue de persona Inès sur E20 |

### E21 — Veille et nouveautés *(persona : Cédric)*

| Story | Contenu |
|---|---|
| S202 | Veille mensuelle armée (après « arme la veille » de Cédric) **[C]** |
| S203 | Nouvelles brasseries OSM du mois, en propositions |
| S204 | Brasseries fermées du mois, en propositions |
| S205 | « Quoi de neuf ? » alimenté par les lots acceptés |
| S206 | Journal public des changements de données |

### E22 — Qualité et livraison

| Story | Contenu |
|---|---|
| S207 | Mutation sur les composants |
| S208 | Tests de propriété sur la recherche et la distance |
| S209 | Firefox et WebKit en CI |
| S210 | Lighthouse en CI, budgets tenus |
| S211 | Dépendances : mise à jour mensuelle outillée |
| S212 | CSP stricte revue, rapport de violation local |
| S213 | Sonde de la page publiée : parcours complet |
| S214 | Revue de sécurité n° 2 |
| S215 | Audit applicatif n° 3 |
| S216 | Correctif de l'audit n° 3 |

### E23 — Faire connaître *(persona : Marie)*

| Story | Contenu |
|---|---|
| S217 | Page d'accueil explicative (sans écran d'accueil bloquant) |
| S218 | Image de partage par fiche |
| S219 | Données ouvertes : export des fiches vérifiées, licence décidée par Cédric **[C]** |
| S220 | Captures et README à jour |
| S221 | Post de lancement, version 2 |
| S222 | Statistiques sans pistage : décision **[C]** |

### E24 — Fin du plan

| Story | Contenu |
|---|---|
| S223 | Revue globale n° 2 |
| S224 | Correctif de la revue globale |
| S225 | Revue de toutes les personas |
| S226 | Dette : BACKLOG trié, chaque ligne décidée |
| S227 | Documentation d'architecture à jour |
| S228 | Rétrospective du plan v5 |

### E25 — La France entière, fiche par fiche *(persona : Cédric ; demande du 17/10 : « Coutances, aucune fiche renseignée »)* **[C]**

Chaque fiche nouvelle naît complète, par le même circuit : découverte
(OpenStreetMap, registre SIRENE code 11.05Z s'il s'avère complet), lecture
du site officiel et d'Untappd par des agents, **position à l'adresse**
(géocodeur de l'IGN), **lien Untappd vérifié**, **bières avec leur style**,
puis décision de Cédric par lot. Pas de fiche « vide » publiée comme
vérifiée : en attendant, la couche OpenStreetMap reste visible et dite « non
vérifiée ».

| Story | Contenu |
|---|---|
| S244 | Mesurer le registre SIRENE (11.05Z) contre OpenStreetMap sur 3 départements témoins : qui manque à qui |
| S245 | Une fiche par fichier (`data/brasseries/<id>.json`) avec identifiant stable (avec S231) ; la garde de `data/` suit **[C]** |
| S246 | Outil « département » : découverte, doublons, lecture, géocodage, Untappd, bières → un lot prêt à décider |
| S247 | Pilote Manche et Calvados (autour de Coutances) |
| S248 | Normandie (reste) |
| S249 | Bretagne |
| S250 | Pays de la Loire et Centre-Val de Loire |
| S251 | Hauts-de-France |
| S252 | Île-de-France |
| S253 | Grand Est |
| S254 | Bourgogne-Franche-Comté (reste) |
| S255 | Auvergne-Rhône-Alpes (départements hors des 9 actuels) |
| S256 | Nouvelle-Aquitaine |
| S257 | Occitanie |
| S258 | Provence-Alpes-Côte d'Azur et Corse |
| S259 | Outre-mer |
| S260 | Revue métier de E25 ; la couche OSM ne garde que ce qui n'a pas de fiche |
| S261 | Les lots départementaux portent les contacts lus (site, Untappd, téléphone) |
| S262 | Les lots départementaux portent les horaires lus |

### E26 — Trancher par la règle de Cédric *(persona : Cédric ; décisions du 18/10, `docs/DECISIONS.md`)*

| Sprint | Story |
|---|---|
| S263 | Non attribué (numéro sauté le 18/10) |
| S264 | La règle écrite (« site officiel + contrôlé », accord par règle, PR listant ses lignes) |
| S265 | Le tri des lots par la règle (`curation/decision-regle.md`) |
| S266 | Les propositions retenues entrent dans `data/` (PR #100) |
| S267 | Le téléphone que montre Google Maps (Cédric, 18/10 : « pour les téléphones affichent celle dans Google maps ») |
| S268 | Les fiches sans adresse vérifiée au centre IGN de leur commune ; `libellePrecision` redevient vrai |
| S269 | Les fiches nouvelles des lots départementaux : Normandie |
| S270 | Bretagne |
| S271 | Pays de la Loire et Indre-et-Loire |
| S272 | La liste « à montrer » présentée à Cédric en une fois |

### E27 — Repris des dépôts frères *(Sentiers, ÉtapeForge ; inventaire du 18/10)*

Chaque ligne cite le fichier du dépôt frère où l'idée a été lue ; elle n'y
est retenue que si rien dans Mousse de Poche ne la couvre ni ne la prévoit.
L'inventaire, avec les idées écartées et leur raison : `docs/DEPOTS-FRERES.md`.

| Sprint | Story | Origine |
|---|---|---|
| S273 | Transparence : chaque hôte de la CSP est nommé dans le texte de confidentialité, par un test | Sentiers `tests/e2e/transparence.spec.ts` |
| S274 | Le point de rupture à 899 et 900 px, une seule règle (CSS, `App.tsx`, `Carte.tsx`) et un test aux deux largeurs | Sentiers `tests/e2e/point-de-rupture.spec.ts` |
| S275 | Demander au navigateur de garder favoris, carnet et notes (`navigator.storage.persist`), après la première donnée gardée | Sentiers `tests/e2e/stockage.spec.ts` |
| S276 | Sans JavaScript : le bloc `<noscript>` gardé par un test | Sentiers `tests/e2e/sans-js.spec.ts` |
| S277 | Une sonde de nuit contre les vrais services (page publiée, tuiles, communes, géocodeur, Overpass), qui nomme l'hôte en panne | ÉtapeForge `.github/workflows/demo-online.yml` ; Sentiers `tests/e2e/reel.spec.ts` |
| S278 | L'audit de la suite e2e (attentes fixes, assertions nues, identifiants morts) ; les 17 `waitForTimeout` remplacés | Sentiers `scripts/audit-e2e.mjs` |
| S279 | La liste à dérouler sur un vrai téléphone avant une livraison **[H]** | Sentiers `docs/RELEASE.md` |
| S280 | Le compte des requêtes par hôte dans les outils de curation | ÉtapeForge `pipeline/apiUsage.js` |
| S281 | La continuité des services tiers : ce dont on dépend, ce qui casse s'il tombe | ÉtapeForge `docs/CONTINUITE-APIS.md` |
| S282 | Le fuzz des entrées non sûres (sauvegarde importée, lien partagé, signalement) | ÉtapeForge `test/serverFuzz.test.js` |
| S283 | `npm audit --audit-level=high` dans la CI | ÉtapeForge `.github/workflows/ci.yml` |
| S284 | Un agent qui relit les promesses (« jamais », « aucun », « parce que ») | Sentiers `.claude/agents/relecteur-de-promesses.md` |
| S285 | Un agent qui trouve les règles jumelles et mesure leur désaccord | Sentiers `.claude/agents/chasseur-de-jumeaux.md` |
| S286 | Un test singe rejouable par graine, hors CI, sans rien envoyer | Sentiers `tests/e2e/monkey.spec.ts` ; ÉtapeForge `scripts/monkey.js` |
| S287 | Les règles d'écran : recouvrements et débordements à quatre largeurs, en gros texte compris | Sentiers `tests/e2e/regles-d-ecran.spec.ts` |
| S288 | Deux angles de revue de plus : les workflows CI, le contributeur externe | ÉtapeForge `.claude/agents/revue-personas.md` |
| S289 | La couverture de `src/core` mesurée ; le seuil, Cédric le décide **[C]** | Sentiers `README.md` § Qualité |
| S290 | Un plancher de taille de texte, mesuré, décidé et écrit **[C]** | Sentiers `tests/e2e/regles-typographiques.spec.ts` |
| S291 | Un protocole de test avec de vraies personnes, sans rien envoyer **[C][H]** | Sentiers `docs/PROTOCOLE_TEST.md` |
| S292 | « La question en toutes lettres », comprise sur l'appareil, vers les filtres qui existent (étude S99) | Sentiers `docs/IA_LOCALE.md`, `src/core/intention.ts` |

## Compte

E1 8 · E2 7 · E3 9 · E4 7 · E5 8 · E6 10 · E7 12 · E8 8 · E9 5 · E10 9 ·
E11 7 · E12 10 = **100 stories**, S29 à S128 ; plus le plan v5 ci-dessous,
S129 à S228 : **200 sprints** en tout ; plus S229 à S243, issues de la revue d'architecture ; plus S244 à S262, la France entière (E25) ; plus S264 à S272, la règle de Cédric (E26) ; plus S273 à S292, repris des dépôts frères (E27).

## Ordre d'exécution

Par numéro de sprint. Les stories **[C]** livrent leurs propositions et
attendent ; la suivante démarre sans les attendre.
