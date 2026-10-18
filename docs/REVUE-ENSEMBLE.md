# La relecture d'ensemble (S295, 18/10)

Demandée par Cédric le 18/10 au soir, avant de compléter les fiches. Les
relecteurs sont : chaque persona de `docs/PERSONAS.md` (agent
`relecteur-de-persona`), un lead développeur, un architecte et une analyse
de la concurrence sur la fiche. Tous ont travaillé en lecture seule :
aucun n'a lancé le build ni Playwright. Les chiffres viennent de
`data/breweries.json` (358 fiches), lu par script.

Chaque trouvaille a un identifiant. La colonne **Suite** vaut :
- **corrigé** : avec la PR et le test, vu rouge ;
- **BACKLOG** : inscrite, avec sa raison ;
- **Cédric** : une décision qui lui revient ;
- **humain** : seule une vraie personne peut trancher.

Gravité : B = bloquant, G = gênant, m = mineur.

Les corrections sont livrées en cinq parties, une PR chacune :

1. **L'application** : service worker, confidentialité, accessibilité,
   langue, signalement.
2. **Le suivi et l'outillage** : la complétude des fiches, la liste « à
   chercher », `docs/ETAT.md`, `A-MONTRER.md`, `ARCHITECTURE.md`, la garde
   des données.
3. **La fiche repensée**, d'après la concurrence.
4. **La liste** : « ouvert maintenant », compter depuis une commune tapée,
   un lexique.
5. **Les réglages** tenus dans un seul état (LD1).

## Personas

| Id | Relecteur | G | Trouvaille | Preuve | Suite |
|---|---|---|---|---|---|
| BE1 | Bernard | G | Le service worker interroge le réseau d'abord, sans délai d'attente : sur une 4G qui rame, une page déjà en cache attend la fin du `fetch` | `public/sw.js`, `reseauPuisCache` | corrigé (partie 1) |
| BE2 | Bernard | G | Le précache est tout ou rien et pèse environ 5 Mo, dont 1,7 Mo de communes. Sur une connexion faible, l'installation peut ne jamais aboutir | `sw.js` install, `du -sk dist` | BACKLOG (le « tout ou rien » est une décision de la revue S7 : un cache partiel effaçait l'ancien ; sortir les communes demande sa story) |
| BE3 | Bernard | G | Une 4G faible n'est pas « hors connexion » : la carte reste grise sans explication tant que trois tuiles n'ont pas échoué | `Carte.tsx` seuil `echecs >= 3` | corrigé (partie 1) : le même avertissement s'affiche aussi quand aucune tuile n'arrive dans le délai |
| BE4 | Bernard | m | « Prête hors connexion » s'affiche trop tôt pendant une mise à jour | BACKLOG (S42/S44) | BACKLOG (déjà inscrit) |
| BE5 | Bernard | m | La ligne du BACKLOG sur la recherche de communes hors ligne est périmée depuis S42 | `hors-ligne.spec.ts:27` | corrigé (BACKLOG) |
| BE6 | Bernard | m | « communes de départ » est du jargon | `App.tsx`, pied de page | corrigé (partie 1) |
| BE7 | Bernard | m | Le cache des tuiles évince dans l'ordre d'insertion : une zone souvent revue part quand même | `sw.js`, `limiterTuiles` | corrigé (partie 1) : chaque lecture repousse la tuile en fin de file |
| BE8 | Bernard | m | La mise à jour dépend d'un bandeau à toucher | `sw.js` « activer » | humain (lisibilité du bandeau) |
| KA1 | Karim | G | Le filtre par type ne voit que 94 fiches sur 358, et aucune fiche OSM | `FiltreType.tsx:58` | données : lots de bières (#15) ; le texte le dit déjà |
| KA2 | Karim | G | 89 bières ont toutes le même lien, celui de leur brasserie : ce lien n'est pas la page de la bière | comptage | corrigé (partie 3) : un lien commun se dit « page des bières de la brasserie », une seule fois |
| KA3 | Karim | G | Une bière « non référencée » n'offre aucune piste | `Bieres.tsx:43` | corrigé (partie 3) : la recherche Untappd est rappelée sous les bières |
| KA4 | Karim | G | Une bière n'a ni source ni date propres | `schema.ts` | Cédric (dates des bières, règle S11, déjà demandée) |
| KA5 | Karim | G | Aucun e2e ne prouve « je choisis un type, la liste change » sur les vraies données ; le seul test qui touche au filtre est sauté | `decouverte.spec.ts:107` | corrigé (partie 1) |
| KA6 | Karim | m | Les options du menu sont longues | `FiltreType.tsx:50` | humain (capture à 320 px) |
| KA7 | Karim | m | « Autre » est un fourre-tout | BACKLOG:78 | BACKLOG (déjà inscrit) |
| KA8 | Karim | m | Bruit d'indentation dans `Bieres.tsx` et `FiltreType.tsx` | lecture | corrigé (partie 1) |
| CE1 | Cédric | B | Aucun outil ne mesure la complétude des fiches | grep | corrigé (partie 2) : `outils/completude.ts` |
| CE2 | Cédric | B | « Complète » n'est définie nulle part, et le schéma ne sait pas dire « cherché, introuvable » | `DECISIONS.md` | Cédric : une définition proposée dans `docs/DECISIONS.md` |
| CE3 | Cédric | B | Les 189 fiches « À confirmer » n'ont pas de chemin vers « complète » | — | corrigé (partie 2) : une liste « à chercher » par département et par cause |
| CE4 | Cédric | G | `A-MONTRER.md` est dense et n'a pas de tableau des réponses attendues | `curation/A-MONTRER.md` | corrigé (partie 2) |
| CE5 | Cédric | G | Le BACKLOG cite encore les chiffres de 166 lignes | BACKLOG:42-60 | corrigé (partie 2) |
| CE6 | Cédric | G | Le suivi est éclaté entre cinq fichiers | — | corrigé (partie 2) : `docs/ETAT.md` |
| CE7 | Cédric | G | Des décisions anciennes restent ouvertes sans conséquence écrite (#33, #34, #38) | `DECISIONS.md:29-31` | corrigé (partie 2) : la conséquence est écrite, la décision reste à Cédric |
| CE8 | Cédric | G | Le périmètre est à trancher (industriels, chaînes, bars) | `A-MONTRER.md:99-103` | Cédric |
| MA1 | Marie | G | Taper « Lyon » dans la recherche garde Brignais comme point de départ | `App.tsx:92` | corrigé (partie 4) : la page propose de compter les distances depuis cette commune |
| MA2 | Marie | G | Les notes emploient des mots du métier (taproom, brewpub…) sans les expliquer | 27 notes sur 358 | corrigé (partie 4) : un lexique sous la note |
| MA3 | Marie | G | Les « À confirmer » se mêlent aux fiches sûres | 18 sur 41 autour de Lyon | Cédric (un tri ou un filtre change ce qui est montré) |
| MA4 | Marie | G | Le filtre par type vide la liste sans que la raison soit claire | `FiltreType.tsx` | corrigé (partie 3) : le compte le rappelle quand le filtre est actif |
| MA5 | Marie | G | « Untappd » n'est pas expliqué, et « plus haut » ne désigne rien | `Bieres.tsx:16` | corrigé (partie 3) |
| MA6 | Marie | G | Le bloc de provenance est en jargon, « IGN » n'est pas expliqué | `fiche.ts:62-67` | corrigé (partie 3) |
| MA7 | Marie | m | Le résumé de confidentialité se coupe en plein milieu | `PointDeDepart.tsx:150` | corrigé (partie 1) |
| MA8 | Marie | m | « Fiches vérifiées » est trompeur | BACKLOG | Cédric (déjà demandé) |
| MA9 | Marie | m | Une distance mesurée depuis le centre de la commune est affichée sans réserve sur la ligne | `formaterDistance` | corrigé (partie 3) : « ≈ » |
| LE1 | Léa | G | « Effacer » ne vide pas le cache des tuiles | `App.tsx:372`, `sw.js` | corrigé (partie 1) |
| LE2 | Léa | G | « Vos coordonnées ne sont envoyées à personne » est vrai pour ce site, pas pour le navigateur | `PointDeDepart.tsx:152` | corrigé (partie 1) |
| LE3 | Léa | G | Le texte dit que les communes sont demandées au choix ; elles le sont dès qu'un départ est gardé | `ChoixCommune.tsx:44-59` | corrigé (partie 1) |
| LE4 | Léa | m | Le serveur de la page n'est pas nommé parmi ceux qui voient l'adresse IP | `PointDeDepart.tsx` | corrigé (partie 1) |
| LE5 | Léa | m | Les liens Google Maps et Untappd ne disent pas qu'ils quittent le site | `Contact.tsx` | corrigé (partie 1), avec IN5 |
| LE6 | Léa | m | L'image de la tournée révèle la proximité ; le texte le dit | `MesFavoris.tsx:100` | rien à faire : c'est un choix informé |
| LE7 | Léa | m | Le thème, gardé dans `localStorage`, survit-il à « Effacer » ? | `theme.ts:14` | non : « Effacer » remet le thème à « auto », et `appliquerTheme('auto')` retire la clé (`src/theme.ts`) |
| BR1 | Une brasserie | B | Sans compte GitHub, impossible de corriger sa fiche | `signalement.ts:27` | Cédric (#38 : une adresse de contact) |
| BR2 | Une brasserie | G | 53 % des fiches sont « À confirmer » | comptage | données (#15) |
| BR3 | Une brasserie | G | Aucune fiche n'est marquée fermée, pas même Les Roches Précieuses (« radiée ») | `grep fermee` | Cédric (lot « fermées », #35) |
| BR4 | Une brasserie | G | Les horaires de La Canute datent de 2016 | note | données (#15) |
| BR5 | Une brasserie | G | Une adresse exacte s'affiche à côté d'un point au centre de la commune | Caribrew | corrigé (partie 3), avec RF4 : un seul bloc « Où » |
| BR6 | Une brasserie | G | Pour Les Roches Précieuses, la commune et l'adresse ne concordent pas | `data/` | Cédric (S55, déménagements) |
| BR7 | Une brasserie | m | Le signalement ne transmet ni la confiance, ni la précision, ni « fermée » | `signalement.ts:65-76` | corrigé (partie 1) |
| BR8 | Une brasserie | m | Une fiche sans source ne demande pas le lien du site | `Liste.tsx:187` | corrigé (partie 1) |
| BR9 | Une brasserie | m | Une note de curation peut se lire comme un jugement | lecture | humain |
| BR10 | Une brasserie | m | Rien ne dit qu'on peut demander le retrait de sa fiche | grep | Cédric (avec #38) |
| IN1 | Inès | G | « Appeler » n'a aucune preuve e2e, et le commentaire du test est périmé (47 fiches ont un téléphone) | `accessibilite.spec.ts:203` | corrigé (partie 1) |
| IN2 | Inès | G | La fiche ouverte n'a aucun titre : la navigation par titres est impossible | `grep '<h[1-6]'` | corrigé (partie 3) |
| IN3 | Inès | G | Le nom lu d'une ligne est très long (la note entière) | `Liste.tsx:306-388` | humain (lecteur d'écran) ; piste : `aria-describedby` |
| IN4 | Inès | G | Beaucoup de régions `role="status"` | `App.tsx:747`… | humain (NVDA, VoiceOver) |
| IN5 | Inès | m | L'ouverture dans un nouvel onglet n'est pas annoncée | `Contact.tsx`, `YAller.tsx` | corrigé (partie 1) |
| IN6 | Inès | m | « Partager » et « J'y suis allé·e » ne portent pas le nom de la brasserie | `Liste.tsx:134,139` | corrigé (partie 1) |
| IN7 | Inès, Emma | m | Les extraits de données ne portent pas `lang="fr"` quand l'interface est en anglais | `grep lang=` | corrigé (partie 1) |
| IN8 | Inès | m | Le combobox de commune n'est prouvé qu'indirectement | `accessibilite.spec.ts` | déjà prouvé : `partout.spec.ts`, « au clavier : flèches puis Entrée », vérifie `aria-expanded`, `aria-activedescendant` et `aria-selected` |
| HU1 | Hugo | G | « Ouvert maintenant » n'apparaît que dans la fiche, jamais dans la liste | grep | corrigé (partie 4) |
| HU2 | Hugo | G | Seules 48 fiches ont des horaires, et le BACKLOG dit encore « aucune » | BACKLOG:191 | corrigé (BACKLOG) ; données (#15) |
| HU3 | Hugo | G | Hugo comptait 0 téléphone. C'est faux : les numéros sont dans `contact.tel`, 47 fiches en ont (vérifié) | — | rien à faire |
| HU4 | Hugo | m | L'état « ouvert » ne se recalcule pas quand la fiche reste ouverte | `Horaires.tsx` | corrigé (partie 4) |
| HU5 | Hugo | m | L'avertissement de position ne propose aucune alternative | `YAller.tsx` | corrigé (partie 3), avec RF4 |
| EM1 | Emma | G | En anglais, la raison d'un « À confirmer » reste en français, sans le signaler | `Liste.tsx:383` | corrigé (partie 1) : « (in French) » et `lang="fr"` |
| EM3 | Emma | G | La remarque des horaires reste en français | `Horaires.tsx:46` | corrigé (partie 1), même remède |
| EM4 | Emma | G | Le manifeste et le `<noscript>` restent en français | BACKLOG | BACKLOG (déjà inscrit) |
| EM5 | Emma | m | « département » et « Brignais » parlent surtout à un public français | `en.ts` | humain |

## Lead développeur

| Id | G | Trouvaille | Preuve | Suite |
|---|---|---|---|---|
| LD1 | G | Les réglages sont tenus dans trois listes à la main dans `App.tsx` (états, `garde`, `remettreAZero`) | `App.tsx:131-368` | corrigé (partie 5) : un seul état `Preferences` |
| LD2 | G | `docs/ARCHITECTURE.md` est arrêté au 17/10 | en-tête | corrigé (partie 2) |
| LD3 | G | `trier` lit les accords sans les valider | `outils/curation.ts:266` | corrigé (partie 2) |
| LD4 | G | `trier` relance `controler` et relit son texte | BACKLOG (S285) | BACKLOG (déjà inscrit) |
| LD5 | G | Le test le plus lent (8 s) a un commentaire faux | `outil-curation.test.ts:43-63` | corrigé (partie 2) |
| LD6 | G | `AIDE_SIGNALEMENT` est mort, et c'est un jumeau non traduit | `Liste.tsx:48` | corrigé (partie 1) |
| LD7 | G | Presque aucun test de composant pour App, Carte et Liste | `tests/composants/` | BACKLOG (une story : un chantier, pas un correctif) |
| LD8 | m | Une mesure prise après une attente fixe de 800 ms | `uiux.spec.ts:158` | corrigé (partie 1) |
| LD9 | m | Les entrées écrites par des agents sont lues sans schéma | `outils/departement.ts:204,238` | BACKLOG |
| LD10 | m | Les dépendances sont en retard ; `@etalab/decoupage-administratif` est mal rangé | `package.json` | BACKLOG (une story par version majeure) ; le rangement est corrigé (partie 2) |
| LD11 | m | Le format « km à la française » est recopié cinq fois | grep | corrigé (partie 2) : `kmFr` |

## Architecte

Verdict : le JSON unique tient pour stocker et relire. Cédric décide sur
le Markdown du lot, et la garde vérifie le JSON à l'octet. Ce qui ne tient
pas encore la suite annoncée est listé ci-dessous.

| Id | G | Trouvaille | Preuve | Suite |
|---|---|---|---|---|
| AR1 | haute | La garde rejoue toute l'histoire avec le schéma d'aujourd'hui : un champ obligatoire (l'`id` de S231) ou un arrondi changé la casse. Un lot illisible est dit « introuvable » | `src/core/garde-donnees.ts:63`, `outils/garde-donnees.ts:34` | corrigé en partie (partie 2) : un lot illisible a son propre message. Les « bases d'étape » font l'objet d'une story (S296), et la signature d'une nouvelle base revient à **Cédric** |
| AR2 | haute | Une fiche est identifiée par son nom : 11 noms répétés déjà dans la couche OSM ; un renommage perd favoris, notes et liens | `schema.ts:266`, `preferences.ts:58` | BACKLOG (S231, déjà au plan), avant 600 fiches |
| AR3 | haute | Charger par département (S294) dirait au serveur la zone de la position | `communesFrance.ts:10-15` | la condition est écrite dans la story S294 et dans `ARCHITECTURE.md` (partie 2) : avec « autour de moi », les fichiers demandés ne dépendent pas de la position, et un e2e le prouve |
| AR4 | moyenne | Chaque version retélécharge tout le précache, 1,2 Mo en gzip | `sw.js` install | corrigé (partie 1) : à l'installation, un fichier haché déjà présent dans un ancien cache est repris sans réseau |
| AR5 | moyenne | Deux PR de données en parallèle sont toujours en conflit ; aucune commande ne reconstruit `data/` | `outils/curation.ts` | BACKLOG ; d'ici là, les PR de données passent une par une (#15) |
| AR6 | moyenne | `coordPrecision: 'osm'` est accepté dans `data/`, ce qui brouille la frontière avec la couche OSM | `schema.ts:60`, `decouverte.ts:222` | corrigé (partie 2) : refusé dans un ajout. Vu à la mesure : aucune ligne de `data/` ne l'utilise |
| AR7 | moyenne | Au build, les doublons OSM ↔ fichier ne sont repérés que par le nom exact | `osm-france.ts:198-212` | corrigé (partie 2) : `designeLaFiche` tourne au build (§6quater) |
| AR8 | basse | Livrer par département sans découper la source | mesure | écrit dans S294 : le découpage se fait au build |
| AR9 | basse | Deux lots de même nom : le dernier lu gagne sans bruit ; les lots sont immuables sans que ce soit écrit | `outils/garde-donnees.ts:30` | corrigé (partie 2) : un doublon est refusé, et `curation/LISEZMOI` le dit |

## La fiche face à la concurrence

Ont été regardés : Untappd, Colorado Brewery List, BeerAdvocate (extraits),
Google Business Profile, les fiches Apidae (Occitanie), Normandie Tourisme,
biere-tourisme.fr, les fiches Geotrek des fermes, la carte de la Scotch
Whisky Association et Rue des Vignerons. Les sources sont dans le rapport,
recopié en annexe du ticket S295.

**Ce qu'on fait déjà mieux que tous** : une source et une date sur chaque
bloc ; un « À confirmer » avec sa raison, là où Colorado laisse une case
vide ; l'état « maintenant », qui dit « la source ne dit rien de ce jour ».

| Id | Proposition | Décision | Raison |
|---|---|---|---|
| RF1 | Un bloc « En bref » en tête de fiche : ce qu'on peut y faire, l'état maintenant, où | **on change** (partie 3) | La première chose sous la ligne était une zone de saisie pour soi ; tout est déjà calculé |
| RF2 | Une rangée d'actions juste dessous : Appeler, Y aller, Site ; Favori, Visitée, Partager et Ma note descendent | **on change** (partie 3) | Le geste utile sur place est d'appeler ou de partir |
| RF3 | « Prochaine ouverture » quand la fiche est fermée | **on change** (partie 3), en TDD dans `core/horaires.ts` | C'est le « quand » de la question ; un jour non renseigné reste « inconnu » |
| RF4 | Un seul bloc « Où » : adresse, position et Y aller ; « adresse non connue » quand elle n'est que la commune | **on change** (partie 3) | 125 fiches répétaient la commune comme adresse |
| RF5 | « Sur rendez-vous » comme mode d'accès | **Cédric** | Ajout au schéma ; la valeur doit venir de la source |
| RF6 | Une grille « Sur place » : acheter, boire, visiter, manger, boutique | **Cédric** | Données nouvelles ; une case vide ne doit pas être ambiguë |
| RF7 | La période de validité des horaires | on change le texte (partie 3) ; la période structurée revient à **Cédric** | — |
| RF8 | La confiance à côté de la catégorie, avec l'âge de la vérification | **on change** (partie 3) | Elles étaient séparées par toute la fiche |
| RF9 | « Où trouver ses bières ailleurs » | **Cédric** | Donnée nouvelle |
| RF10 | Photos de tiers, avis, check-ins, moyens de paiement, réservation, formulaire intégré | **on écarte** | Un serveur tiers verrait la page, une note n'aurait pas d'origine, il faudrait un compte |

**On garde** : la source et la date sur chaque bloc, « Vérifiez avant de
partir », l'heure de Paris écrite, la note non tronquée sur la ligne,
« Signaler », et les bières placées après l'accès.
