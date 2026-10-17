# Epics — S29 à S128

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

101 fiches sont placées au centre de leur commune. Chaque coordonnée
proposée vient de la Base Adresse Nationale, adresse par adresse.

| Story | Contenu |
|---|---|
| S54 | Outil de géocodage (BAN, cache, aucune position de la personne en jeu) ; lot 1 |
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
| S62 | Lot de sites venus d'OSM |
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
| S51 | Mutation sur `src/core` : les tests creux |
| S52 | Audit applicatif n° 2 |
| S53 | Correctif de l'audit n° 2 |
| S98 | Firefox et WebKit dans la CI (installés là-bas, absents du conteneur) |
| S124 | Tests visuels de non-régression (captures comparées) |
| S125 | Revue de sécurité (CSP, liens, dépendances) |
| S126 | Revue globale finale |
| S127 | Captures, README, post de lancement mis à jour |
| S128 | Rétrospective du plan v4, leçons portées dans CLAUDE.md (seulement des ratés datés) |

## Compte

E1 8 · E2 7 · E3 9 · E4 7 · E5 8 · E6 10 · E7 12 · E8 8 · E9 5 · E10 9 ·
E11 7 · E12 10 = **100 stories**, S29 à S128.

## Ordre d'exécution

Par numéro de sprint. Les stories **[C]** livrent leurs propositions et
attendent ; la suivante démarre sans les attendre.
