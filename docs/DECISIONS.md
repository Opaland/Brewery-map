# Décisions — ce qui était bloqué, et qui l'a tranché

Cédric, le 16/10 : « pour les issues bloquées, regarde si des personas ou
toi-même ne peut pas décider ». Ce qui suit est tranché ici, avec la persona
qui a pesé et la raison. Ce qui reste à Cédric y est dit, et pourquoi.

**La limite.** La règle du §0 de CLAUDE.md tient : aucune ligne de `data/`
ne change sans son accord écrit, ligne par ligne. Pour les lots de curation,
les personas **recommandent** une décision ligne par ligne. La phrase qui les
accepte reste à Cédric : `curation/RECOMMANDATIONS.md`.

## Tranché

| Issue | Sujet | Décision | Persona, raison |
|---|---|---|---|
| #35 | Brasserie fermée | **Un statut « fermée » s'ajoute au schéma**, facultatif, avec sa source et sa date. Une fiche fermée sort de la liste par défaut ; elle reste trouvable par son nom, marquée « Fermée selon … ». Le schéma change en S27 ; marquer une fiche fermée reste une ligne de `data/`, donc un lot. | Bernard (S17) : faire 30 km vers une porte close est le pire résultat. La retirer effacerait l'information « elle a fermé », que la veille doit pouvoir dire. |
| #36 | Changer la commune ou la position d'une fiche | **Par lot, comme tout champ**, avec la source de la nouvelle position : l'adresse lue sur le site de la brasserie, géocodée par la Base Adresse Nationale quand elle est joignable, sinon le point OSM de l'objet nommé. | Hugo : la position est ce qui l'amène à la porte. Aucune raison d'une procédure à part. |
| #37 | Un annuaire ou un office de tourisme comme source | **Office de tourisme et site institutionnel : oui**, avec la confiance « moyenne » au plus et la date de la page. **Annuaire commercial** (agrégateurs, pages jaunes) : **non**, il recopie sans dater. | Bernard veut un numéro à appeler ; Cédric veut une source qu'on peut citer. Un office date ses fiches (« mise à jour le 09/04/2024 », lu en S17), un annuaire non. |
| #39 | La confiance, dans la liste, et quoi en faire | **Sur la ligne d'une fiche de confiance faible** : « Vérifiez avant d'y aller ». **Dans la fiche** : la même phrase d'action avant la définition. Fait en S27. | Marie (revue UI/UX) : la définition seule ne dit pas quoi faire. La Scotch Whisky Association dit la même chose sur sa carte (veille concurrentielle). |
| #40 | Les 16 fiches sans aucune page à leur nom | **Elles restent « À confirmer »**, avec leur raison. La veille les reprend quand une page apparaît. Aucune n'est retirée : un retrait est une ligne de `data/`. | Cédric : « aucune donnée inventée » vaut aussi dans l'autre sens. Ne pas trouver une page ne prouve pas qu'elle n'existe pas. |
| #41 | « La carte ne suit pas » : suivre la position en continu ? | **Non, pas de suivi continu.** Le bouton « Autour de moi » relocalise à la demande, et la carte se recentre à chaque départ. | Hugo à vélo veut savoir où aller, pas une navigation : « Y aller » ouvre son appli de guidage. Un suivi continu viderait la batterie sur une sortie, pour rien de plus. Léa : rien n'est gardé de la position. |
| #59 | « Vérifié le … » à côté de chaque information | **Pas maintenant.** La fiche a déjà « Vérifiée le » pour la fiche entière. Une date par champ demande des données que le fichier n'a pas. | — |

## Reste à Cédric, et pourquoi

| Issue | Sujet | Pourquoi ce n'est pas tranché ici | Recommandation |
|---|---|---|---|
| #27 à #32 | Les lots de curation | Chaque ligne de `data/` demande son accord écrit (§0). | Voir `curation/RECOMMANDATIONS.md` : une phrase par lot suffit. |
| #33 | Armer la veille mensuelle | Un coût récurrent sur son compte, d'environ 130 à 150 k par mois (`docs/VEILLE.md`). | L'armer : la couche OSM de S25 rend la découverte de nouvelles brasseries plus utile chaque mois. Il suffit d'écrire « arme la veille ». |
| #34 | Licence de `data/breweries.json` | C'est son fichier : le droit de le licencier est le sien. | ODbL 1.0, comme la couche OSM qu'il côtoie : une seule règle pour qui réutilise les deux. |
| #38 | Un canal de signalement hors GitHub | Il faut une adresse de courriel à lui, qu'aucun agent ne peut inventer. | Une adresse dédiée (par exemple un alias), affichée à côté de « Signaler une erreur ». |

**Ce que coûte l'attente** (relecture S295, persona Cédric : ces trois
décisions sont ouvertes depuis le 16/10) :
- **#33, la veille** : sans elle, aucune brasserie nouvelle n'est
  découverte, et une fiche fermée n'est vue que par un signalement. Elle
  conditionne « compléter les fiches ».
- **#34, la licence** : sans licence, personne ne peut réutiliser
  `data/` légalement, et la page ne peut pas dire à quelles conditions.
- **#38, l'adresse** : sans elle, une brasserie sans compte GitHub ne peut
  pas corriger sa fiche (relecture S295, persona « une brasserie » :
  bloquant), ni en demander le retrait.

## Venues de la relecture d'ensemble (S295, 18/10)

Le détail et les preuves sont dans `docs/REVUE-ENSEMBLE.md`.

| Id | La question | Recommandation |
|---|---|---|
| CE2 | Qu'est-ce qu'une fiche « complète » ? `curation/A-CHERCHER.md` mesure sept champs : source, ce qu'on peut y faire, site, adresse vérifiée, téléphone, horaires, bières. Une brasserie sans accueil n'aura jamais d'horaires d'accueil. | Une fiche est complète quand chaque champ est renseigné et sourcé, ou marqué « sans objet » ou « cherché, introuvable » avec sa date. Le schéma devra apprendre ces deux états. |
| CE8 | Le périmètre : brasserie industrielle, chaîne de brasseries-restaurants, bar qui sert la bière d'un voisin ? | Garder ce qui brasse et vend sur place ; retirer le bar ; garder les chaînes, chaque restaurant étant un lieu de vente. |
| MA3 | Les « À confirmer » se mêlent aux fiches sûres. Faut-il les montrer après, ou une case pour les masquer ? | Une case « Masquer les à confirmer », décochée par défaut : rien n'est caché sans geste. |
| MA8 | « Fiches vérifiées » compte aussi les « À confirmer ». | « Fiches du fichier », ou « fiches lues par Cédric ». |
| BR3 | Les Roches Précieuses sont dites « radiées (probablement fermées) », sans statut « fermée ». | Un lot « fermées » : chaque ligne avec sa source (registre, site). |
| BR10 | Une brasserie peut-elle demander le retrait de sa fiche ? | Oui, par le canal de #38 ; le dire dans l'aide du signalement. |
| RF5, RF6, RF7, RF9 | La fiche face à la concurrence : « sur rendez-vous », une grille « sur place » (acheter, boire, visiter, manger, boutique), la période de validité des horaires, « où trouver ses bières ailleurs ». | Chacune ajoute un champ au schéma, sourcé comme les autres. Commencer par « sur rendez-vous » (18 notes le disent déjà). |
| KA4 | Une date et une source par bière (déjà demandé : règle S11). | La date de la page lue, comme pour le contact. |
| AR1 | La garde rejoue tous les accords depuis le 15/10 avec le schéma d'aujourd'hui. Un changement de schéma la casse. | Des « bases d'étape » : un accord de type « base », signé par vous, fixe un nouveau point de départ (story S296). |

## Règle de Cédric pour trancher les lots (18/10)

Cédric, le 18/10, en réponse aux questions du mode plan (« pose-moi les
questions, je suis perdu ») :

| Question | Sa réponse |
|---|---|
| Ce qui compte le plus maintenant | « Trancher les lots » |
| Comment décider | « Par règle générale » : il ne regarde que les cas douteux |
| La règle | « Site officiel + contrôlé » : accepter ce qui vient du site de la brasserie elle-même et que `controler` a relu sans écart (sites, téléphones fixes, horaires, bières, catégories) ; ce qui repose sur un office de tourisme, un annuaire ou une confiance « faible » lui est montré à part |
| Les nouvelles brasseries des lots départementaux | « Toutes, avec leur catégorie » : les « À confirmer » s'affichent avec leur raison |
| D'où viennent les positions des 166 fiches du 15/10 | « Générées par une IA » |
| Que montrer pour une fiche sans adresse vérifiée | « Centre de commune IGN » ; une adresse vérifiée place la fiche à l'adresse |
| Sa règle vaut-elle accord écrit pour `data/` | « Oui, avec liste en PR » : chaque PR qui touche `data/` liste toutes les lignes ajoutées ou modifiées ; il peut en refuser une après coup |
| Le rythme | « Bilan à chaque PR » : 5 lignes après chaque PR mergée |

**Ce que cela change au §0 de CLAUDE.md.** L'accord écrit ligne par ligne
peut être donné par cette règle. Chaque accord de `curation/accords/` qui
l'applique cite la règle dans sa `parole`, et la PR liste ses lignes. La
garde de `data/` (S230) reste inchangée : elle rejoue les accords, à
l'octet près. Ce qui n'entre pas dans la règle reste à Cédric, ligne par
ligne.

## Existence d'une brasserie : la méthode de Cédric (19/10)

Cédric, le 19/10, mot pour mot :

> « Il existe aujourd'hui un annuaire que tu dois rechercher sur Internet où
> tu as l'ensemble des brasseries artisanales en France. […] Dans l'ordre, tu
> cherches d'abord dans l'annuaire, ensuite, tu regardes dans Untapped,
> ensuite, tu regardes sur Google quand tu tapes l'adresse s'il est noté
> ouvert ou définitivement fermé. Ensuite, tu regardes s'il existe un site
> web. À partir du moment où il existe dans l'annuaire, tu le trouves dans
> Untapped, il est dans Google non fermé, et en plus, il y a un site web,
> même si le site web répond 503 ou autre chose, tu peux considérer que
> c'est bon. Si jamais il n'y a pas de site web, mais que les trois autres,
> Google, Untapped et l'annuaire, alors tu peux dire que c'est bon quand
> même. Et enfin, si jamais tu ne trouves que dans l'annuaire, mais rien
> dans Google, ni dans Untapped, alors tu peux dire que c'est pas bon.
> Untapped est quand même plutôt précis, donc c'est un peu une source de
> vérité comme l'annuaire initial. »

| Cas | Décision |
|---|---|
| Annuaire + Untappd + ouverte (Google) + site, même injoignable | existe |
| Annuaire + Untappd + ouverte (Google), sans site | existe |
| Annuaire seul, rien sur Google ni Untappd | n'existe pas |

**Ce que la méthode rencontre dans les faits (19/10).**

- **L'annuaire est trouvé** : Projet Amertume (Emmanuel Gillard),
  « Liste des brasseries françaises en activité ». Il compte 2 591
  brasseries au 27/08/2026 et tient aussi une liste des fermées.
  - Sa page de crédits interdit tout usage de ses données sans l'accord
    écrit et préalable de l'auteur : « Toute utilisation de tout ou partie
    des données provenant de ce site, par quelques procédés que ce soit,
    est strictement interdite sans l'accord exclusif écrit et préalable de
    l'auteur. »
  - Il n'est donc pas utilisé, et rien n'en est copié, tant que Cédric n'a
    pas cet accord.
- **Google (« ouvert » ou « définitivement fermé »)** ne se lit pas de
  façon fiable depuis la session. Le registre public des entreprises le
  remplace : l'API recherche-entreprises.api.gouv.fr, en données
  ouvertes, donne l'état « active » ou « cessée ».
- **Untappd** se lit page par page, comme source de vérité.

## Réponses de Cédric du 20/10

Ses mots, recopiés, à côté de chaque question posée le même jour.

| Question | Réponse | Ce qui en suit |
|---|---|---|
| « Les portables de Manev'Ale et de Chanaz : je les garde ? » | « oui » | Le portable de ces deux fiches est gardé **quand leur proposition sera acceptée** : les lots S314 et le reste de S309 et S311 attendent encore ses numéros. |
| « Les brasseries fermées d'après SIRENE : une simple note, ou le statut « fermée » ? » | « oui fermé » | Statut `fermee` (décision #35), source SIRENE. Seulement les cas nets : entreprise cessée, aucun établissement ouvert, même commune (S321). |
| « Les trois déménagements : La Gaudine vers Marlhes, les Croqueurs de Lune vers Serrières-en-Chautagne, Biercors vers Villard-de-Lans. » | « OK » | Commune, département, adresse et position changent par lot (S322, décision #36) ; le reste de leurs propositions attend ses numéros. |
| « Le libellé « Confiance faible / moyenne / élevée » : je le remplace par des phrases ? » | « oui » | La fiche dit la confiance en une phrase (S320). Son choix du 15/10 (« élevée ») et la demande du cahier des charges cèdent à cette réponse ; le champ `conf` du fichier ne change pas. |

## Règle de Cédric du 21/10 : créer et modifier sans demander

Ses mots, recopiés (trois messages du 21/10, pendant le tri de ce qui
l'attendait) : « pour les modifs ou création de fiche » ; « si tu trouve
les infos sur google par exemple ne me demande pas la persommission de la
fiche » ; « pour les bières l'info est sur untapp ».

| Ce qui entre dans la règle | Ce qui reste à Cédric |
|---|---|
| Créer une fiche, ou en modifier une, quand l'information est lue sur une source publique (site de la brasserie, Google, office de tourisme, registre des entreprises) et que `controler` la retrouve sur la page | Retirer une fiche, la marquer « fermée », la déménager dans une autre commune (gardés pour lui le 18/10 et le 20/10) |
| Les bières : lues sur Untappd | Recopier un numéro de portable (sa consigne de reprise ; il a gardé ceux de Manev'Ale et de Chanaz le 20/10) |
| | Une brasserie connue d'un annuaire seul : elle n'existe pas (méthode du 19/10) |

**Comment elle s'applique.** Comme celle du 18/10 : chaque accord de
`curation/accords/` qui l'applique cite ces mots dans sa `parole` ; la PR
liste les lignes ajoutées ou modifiées ; Cédric peut en refuser une après
coup. La garde de `data/` (S230) rejoue les accords, à l'octet près. Une
PR de données se merge verte, sans attendre sa revue, puisqu'il ne veut
plus qu'on lui demande la permission pour une fiche.

**Première application (21/10)** : les 22 brasseries nouvelles des lots
`dep-45`, `dep-41`, `dep-18`, `dep-36`, `dep-28` et `s327-a-relancer`.

**Étendue le 21/10.** À six questions (Animus à Grigny-sur-Rhône, La
Valentinoise fermée, Paille à Lournand, Vellavia à Saint-Germain-Laprade,
le portable de Cluny, Plouc fermée), Cédric répond : « tout oui, et ta règle
couvre aussi ça ». Depuis, **la règle couvre aussi les déménagements, les
statuts « fermée » et les numéros de portable** lus sur une source
publique. Reste à lui : le **retrait** d'une fiche (non demandé), et une
brasserie connue d'un annuaire seul (elle n'existe pas, méthode du 19/10).

