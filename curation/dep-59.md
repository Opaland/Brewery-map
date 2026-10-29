# Lot dep-59 — le Nord (S344)

Ce lot ajoute **34 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 148 candidats = 34 proposés + 114 non proposés (tableau ci-dessous).
Catégories proposées : 21 « acheter et consommer », 6 « acheter seulement », 1 « pas de vente », 5 « à confirmer », 1 « consommer sur place seulement ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| HEINEKEN ENTREPRISE (`sirene:414842062`) | lu le 28/10 : site industriel d'un grand groupe ; aucune page n'annonce d'accueil ni de vente au public |
| BRASSERIE DE SAINT-OMER (`sirene:455502088`) | lu le 28/10 : brasserie industrielle de Saint-Omer et Arques ; rien ne la relie à l'adresse de Raismes |
| LES BRASSEURS DE GAYANT (`sirene:487767816`) | lu le 28/10 : même entreprise que la fiche Brasserie Goudale (Arques, 62) ; plus de brasserie à Douai |
| CERES (`sirene:045750981`) | lu le 28/10 : même société que Gayant (Goudale) ; aucune page d'accueil ou de vente à Douai |
| LA MALTERIE (`sirene:433202892`) | lu le 28/10 : même SIREN que la Brasserie du Cateau (Vivat), elle-même à relancer (node/10186505081) ; « La Malterie » est son restaurant : à relancer avec elle |
| JOYS (`sirene:977908557`) | lu le 28/10 : rien sous ce nom ; l'établissement du registre est un débit de boissons |
| LA MOUSSERIE (`sirene:844637488`) | lu le 28/10 : registre seul ; ni site, ni Untappd, ni office |
| LA BRASSERIE DU GOULOT (`sirene:854024254`) | lu le 28/10 : siège ; la brasserie est à Wimereux (62), non lue (son site répond 404 à l'outil de contrôle), voir dep-62-r2 : à relancer |
| AHBA (`sirene:812526374`) | lu le 28/10 : annuaires d'entreprises seuls ; le lien avec At Home Bière n'est pas lu |
| BRASSERIE-DISTILLERIE LGD (`sirene:937543726`) | lu le 28/10 : registre seul ; le lien avec La Gueule de (Templeuve) n'est pas lu |
| ADVENTICE / BARAGOUIN (`sirene:839053329`) | lu le 28/10 : registre et un annuaire seuls |
| Entreprise individuelle (`personne:1`) | entreprise sans nom ni adresse : rien à chercher |
| LA CAMBERLOTE (`sirene:887847846`) | lu le 28/10 : annuaire seul |
| PIXEL BREWERY (`sirene:979230703`) | lu le 28/10 : rien sous ce nom |
| LA FOLIE MOUSSE (`sirene:978050458`) | lu le 28/10 : annuaire d'entreprises et marque déposée seuls |
| BRASSERIE TRADITIONNELLE DE L'AVESNOIS (`sirene:842679706`) | lu le 28/10 : annuaire de bières seul ; rien sur ce qu'on peut y faire |
| LES TROIS CANTONS (`sirene:900326216`) | lu le 28/10 : rien sous ce nom |
| WESTHOEK BREWERY (`sirene:904487394`) | lu le 28/10 : annuaires seuls ; ni site ni Untappd |
| SAST BREWERY (`sirene:919300202`) | lu le 28/10 : rien sous ce nom ; un annuaire seul cite une autre enseigne à l'adresse |
| BRASSERIE SAINT-HUMBERT (`sirene:837646314`) | lu le 28/10 : une page d'événement de 2022 seule |
| BRC - BLAISE ROCHET CONSEIL (`sirene:931517692`) | lu le 28/10 : rien sous ce nom ; société de conseil |
| BRASSERIE ARTISANALE DU PAYS DU NORD (`sirene:942500026`) | lu le 28/10 : annuaires seuls |
| Entreprise individuelle (`personne:2`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE DU PAS ROLAND (`sirene:931184840`) | lu le 28/10 : annuaire seul |
| BRASSERIE MOUSS'TIER (`sirene:944373968`) | lu le 28/10 : rien sous ce nom |
| BAD (`sirene:979012101`) | lu le 28/10 : rien sous ce nom |
| TIZOTE (`sirene:847500006`) | lu le 28/10 : rien sous ce nom |
| TRIPOINT BREW CO (`sirene:849903406`) | lu le 28/10 : Untappd seul (brasserie nomade) ; site officiel en erreur 503 : à relancer quand le site répond |
| LA GRIFFE DE FLANDRES (`sirene:850181884`) | lu le 28/10 : rien sous ce nom |
| BRASSERIE D'ARREWAGE (`sirene:852159938`) | lu le 28/10 : rien sous ce nom |
| G.A.N.G BEER FACTORY (`sirene:877578492`) | lu le 28/10 : une carte de l'office et une fiche de bière seules ; rien sur ce qu'on peut y faire |
| Entreprise individuelle (`personne:3`) | entreprise sans nom ni adresse : rien à chercher |
| LES TOURS DU MALT (`sirene:887572196`) | lu le 29/10 : le site refuse la lecture automatique (429) : le contrôle ne peut pas relire l'extrait ; à relancer |
| GANG DE BRASSEURS (`sirene:905207031`) | lu le 28/10 : registre seul |
| BEERSANDCLO (`sirene:899089353`) | lu le 28/10 : rien sous ce nom |
| LA BRASSERIE DU CAOU (`sirene:813608502`) | lu le 28/10 : pages d'hôtels seules |
| MONSIEUR PAON (`sirene:917407371`) | lu le 28/10 : même brasserie que la lecture node/12513030601 (Monsieur Paon) |
| BRASSERIE DU HERON (`sirene:938199379`) | lu le 28/10 : rien sous ce nom |
| BRASSERIE DES PACHAS (`sirene:938920220`) | lu le 28/10 : site refusé (403) et annuaire seul : à relancer quand le site répond |
| Entreprise individuelle (`personne:4`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE DUCHAUX & DEZANDRE (`sirene:951679703`) | lu le 28/10 : rien sous ce nom |
| Entreprise individuelle (`personne:5`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE MALTERIE CAMBRESIENNE (`sirene:978797470`) | lu le 28/10 : annuaire d'entreprises seul |
| LA BONNE PLANQUE (`sirene:942881103`) | lu le 28/10 : rien sous ce nom |
| Entreprise individuelle (`personne:6`) | entreprise sans nom ni adresse : rien à chercher |
| LA GLORIEUSE (`sirene:984551341`) | lu le 28/10 : annuaire seul ; rien ne la relie à la Brasserie Forest |
| BRASSERIE DK (`sirene:513655258`) | lu le 28/10 : rien sous ce nom |
| Entreprise individuelle (`personne:7`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:8`) | entreprise sans nom ni adresse : rien à chercher |
| VIEUX FRERES (`sirene:999923618`) | lu le 28/10 : rien sous ce nom |
| BRASSERIE DES BARBES BLANCHES (`sirene:879187698`) | lu le 28/10 : une page d'événement seule |
| Entreprise individuelle (`personne:9`) | entreprise sans nom ni adresse : rien à chercher |
| AU DELA (`sirene:901254128`) | lu le 28/10 : annuaires seuls |
| BRASSERIE DU MARISCHON (`sirene:903090686`) | lu le 28/10 : rien sous ce nom |
| BRASSERIE DE THIERACHE (`sirene:812308088`) | lu le 28/10 : une page touristique entrevue seule, non ouverte |
| BRASSERIE KMEHO (`sirene:922464227`) | lu le 28/10 : rien sous ce nom (quota de recherches épuisé avant une autre orthographe) : à relancer |
| BRASSERIE ANGELUS (`sirene:458506870`) | lu le 28/10 : annuaire seul ; site officiel en erreur 503 : à relancer quand le site répond |
| Entreprise individuelle (`personne:10`) | lu le 28/10 : registre seul ; ni site, ni Untappd, ni office |
| NOORDIC (`sirene:942012089`) | lu le 28/10 : rien sous ce nom |
| Entreprise individuelle (`personne:11`) | entreprise sans nom ni adresse : rien à chercher |
| CERVISIA FLANDRIA (`sirene:945106425`) | lu le 28/10 : rien sous ce nom |
| Entreprise individuelle (`personne:12`) | entreprise sans nom ni adresse : rien à chercher |
| LA SPONTANERIE (`sirene:934668047`) | lu le 28/10 : un article et une fiche de bière seuls ; marque de la Brasserie du Pays Flamand |
| BDS (`sirene:951781640`) | lu le 28/10 : rien sous ce nom |
| Entreprise individuelle (`personne:13`) | entreprise sans nom ni adresse : rien à chercher |
| BREWICK (`sirene:988275574`) | lu le 28/10 : rien sous ce nom |
| BRASSERIE DES 4 ECLUSES (`sirene:849297262`) | lu le 28/10 : un blog et un annuaire seuls |
| Entreprise individuelle (`personne:14`) | entreprise sans nom ni adresse : rien à chercher |
| DADDY BREW (`sirene:893125484`) | lu le 28/10 : fiches de bières seules ; aucune page de brasserie |
| Entreprise individuelle (`personne:15`) | entreprise sans nom ni adresse : rien à chercher |
| ZANNEKIN (`sirene:424632511`) | lu le 28/10 : brasserie historique fermée, d'après des pages anciennes ; aucune source datée de la fermeture |
| Entreprise individuelle (`personne:16`) | lu le 28/10 : rien sous ce nom |
| BRASSERIE BELLENAERT (`sirene:824167787`) | lu le 28/10 : le site s'arrête à une vérification de l'âge ; office seul lisible : à relancer |
| LA BARB DU HAINAUT (`sirene:820392017`) | lu le 28/10 : rien sous ce nom |
| BRASSERIE DENELE (`sirene:978615714`) | lu le 28/10 : rien sous ce nom |
| L'ATELIER D'ARTHUR (`sirene:831031216`) | lu le 28/10 : une carte de l'office seule, non rattachée à l'adresse |
| Entreprise individuelle (`personne:17`) | entreprise sans nom ni adresse : rien à chercher |
| CHIC'ON BRASSE (`sirene:909446254`) | lu le 28/10 : rien sous ce nom |
| SAS HEMINBIERE (`sirene:920697638`) | lu le 28/10 : annuaires d'entreprises seuls |
| Entreprise individuelle (`personne:18`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE LES 4 TILLEULS (`sirene:878159540`) | lu le 29/10 : un article de la mairie de 2020 seul |
| BRASSERIE DUYCK (`sirene:401162201`) | lu le 28/10 : le site de la brasserie ne s'ouvre pas depuis le conteneur (redirection vers un hôte non joignable) : à relancer |
| Entreprise individuelle (`personne:19`) | entreprise sans nom ni adresse : rien à chercher |
| BREWBAIX, COLLECTIF DES MICRO-BRASSEURS ROUBAISIENS (`sirene:850553710`) | lu le 28/10 : même brasserie que la lecture sirene:983619198 (Brewbaix) |
| BRASSERIE DU PINTHUS (`sirene:848563201`) | lu le 28/10 : rien sous ce nom ; même adresse que le siège de Brewbaix |
| ALPZ (`sirene:852026376`) | lu le 28/10 : rien sous ce nom |
| Brasserie Historique de l'Abbaye du Cateau (`node/10186505081`) | lu le 28/10 : annuaires et guides seuls ; site officiel non trouvé : à relancer |
| Kino Beer (`node/10734692924`) | lu le 28/10 : le site ne s'ouvre pas depuis le conteneur ; carte de l'office et article seuls : à relancer |
| Nano brasserie du Colibri (`node/10810838504`) | lu le 28/10 : rien sous ce nom |
| Brasserie de Wagnonville (`node/10881748933`) | lu le 28/10 : site en erreur 503, annuaire seul : à relancer quand le site répond |
| Jag&Suk (`node/10895448847`) | lu le 28/10 : rien sous ce nom |
| Brasserie Deplus (`node/11366210064`) | lu le 28/10 : quota de recherches épuisé : à relancer |
| Houblons-Nous (`node/11518982458`) | lu le 28/10 : quota de recherches épuisé : à relancer |
| Brasserie Motte-Cordonnier (`node/12459628301`) | lu le 28/10 : même brasserie que la lecture sirene:848657839 (Motte-Cordonnier) |
| Brasserie Theillier (`node/4298744548`) | lu le 29/10 : sites de bières et d'itinéraires seuls ; ni site officiel ni Untappd |
| Tous Houblon (`node/5503430168`) | lu le 29/10 : projet de brasserie, encore « à créer » sur sa page |
| Brasserie Lepers (`node/6067309876`) | lu le 29/10 : partie à Douai en 2012 d'après la presse ; site en erreur 503 : à relancer quand le site répond |
| At Home Bière (`node/7371667552`) | lu le 29/10 : rien à Bondues ; At Home Bière est un bar-cave |
| Brasserie La Gueule de (`node/9352179617`) | lu le 29/10 : le site n'affiche que son menu, ses pages répondent 404 : à relancer |
| L'Atelier des Brasseurs (`node/9447162901`) | lu le 29/10 : le site d'OpenStreetMap est devenu une boutique de chaussures ; rien sous ce nom |
| Brasserie Osseus (`node/9603320053`) | lu le 29/10 : le site ne se résout pas, rien sous ce nom : à relancer |
| Brasserie du Pays Flamand (Merville) (`node/9985780292`) | lu le 28/10 : même brasserie que la lecture sirene:492713250 (Pays Flamand, Merville) |
| Brasserie de Saint-Sylvestre (`way/100997989`) | lu le 28/10 : même brasserie que la lecture sirene:331859496 (3 Monts) |
| Brasserie de la Villette (`way/1040447470`) | lu le 28/10 : même brasserie que la lecture sirene:879235901 (La Villette) |
| Brasserie des Quatre-Écluses (`way/1168962690`) | lu le 29/10 : un blog seul ; la brasserie semble à Dunkerque |
| Brasserie du Gros-Chêne (`way/1259743016`) | lu le 29/10 : annuaire seul |
| Brasserie de l'Abbaye de Solesmes (`way/175982975`) | lu le 29/10 : brasserie historique fermée en 1957, d'après une annonce immobilière |
| Brasserie des Enfants de Jean-Bart (`way/180004442`) | lu le 29/10 : rien sous ce nom |
| Brasserie Cédille (`way/232774222`) | lu le 29/10 : rien sous ce nom |
| Brasserie Dreum (`way/236993308`) | lu le 29/10 : annuaires et agrégateurs seuls ; site officiel non trouvé : à relancer |
| Brasserie Forest (`way/75634475`) | lu le 29/10 : pages de tourisme et wiki seuls ; le site cité ne se résout pas : à relancer |
| Brasserie Bellenaert (`way/81173253`) | lu le 28/10 : même brasserie que sirene:824167787 (Bellenaert), derrière une vérification de l'âge : à relancer |
| Brasserie de l'Abbaye de Vaucelles (`way/842455670`) | lu le 28/10 : même brasserie que la lecture sirene:882594211 (Vaucelles) |
| Brasserie du Pavé (`way/926649227`) | lu le 28/10 : même brasserie que la lecture sirene:789830379 (Brasserie du Pavé) |

## Les fiches proposées

## Lot dep-59 — 0 proposition(s), 34 fiche(s) nouvelle(s)

### 1. Brasserie Hommelpap — fiche nouvelle

- n : (vide) → Brasserie Hommelpap
- c : (vide) → Bailleul
- d : (vide) → 59
- lat : (vide) → 50.73244
- lon : (vide) → 2.73998
- km : (vide) → 581.8
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → La bière Hommelpap se vend uniquement à la brasserie, sur commande. Une visite guidée avec dégustation est proposée (tarif de groupe, à partir de 20 personnes).
- addr : (vide) → Eeckelstraete, 59270 Bailleul
- src : (vide) → https://www.fermebeck.net/brasseur
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 03 28 49 03 90
- contact.site : (vide) → https://www.fermebeck.net/brasseur
- contact.source : (vide) → https://www.fermebeck.net/brasseur
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.fermebeck.net/brasseur ; https://data.geopf.fr/geocodage/search?q=Bailleul&type=municipality&limit=5

Extrait lu : « En vente uniquement dans la brasserie sur commande »

Choix du vérificateur : Cat 2 et non 1 : la dégustation n'est citée que dans la visite guidée (« 8€ visite et dégustation ( groupe à partir de 20 Pers) »), pas comme accueil ouvert. Pas de mention « sur place seulement ». Aucun horaire publié. Le nom publié est « Ferme Brasserie Beck » ; je garde le nom OSM « Brasserie Hommelpap » (Hommelpap est la bière). Adresse sans numéro : seule « Eeckelstraete 59270 BAILLEUL » est publiée. Bières non listées dans `beers` : Hommelpap (ambrée) et L'Alezane (de printemps) sont décrites sur la page, mais je n'ai pas leur format exact. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - Eeckelstraete, 59270 Bailleul
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Hommelpap+Bailleul)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Hommelpap&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 03 28 49 03 90](tel:+33328490390)
> - [Site de la brasserie](https://www.fermebeck.net/brasseur)
> - Lu sur [fermebeck.net](https://www.fermebeck.net/brasseur) le 29 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 2. Brasserie du Pays Flamand — fiche nouvelle

- n : (vide) → Brasserie du Pays Flamand
- c : (vide) → Blaringhem
- d : (vide) → 59
- lat : (vide) → 50.69098
- lon : (vide) → 2.39771
- km : (vide) → 584.5
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Brasserie fondée en 2006. Sur le site de Blaringhem : boutique de la brasserie, estaminet (bar et restaurant) et visite avec dégustations le week-end.
- addr : (vide) → 425 rue André Plockyn, 59173 Blaringhem
- src : (vide) → https://www.brasseriedupaysflamand.com/nos-etablissements/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 03 28 41 74 99
- contact.site : (vide) → https://www.brasseriedupaysflamand.com
- contact.source : (vide) → https://www.brasseriedupaysflamand.com/contact-us/
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → vente
- horaires.0.mer : (vide) → 10 h – 13 h, 14 h – 19 h
- horaires.0.jeu : (vide) → 10 h – 13 h, 14 h – 19 h
- horaires.0.ven : (vide) → 10 h – 13 h, 14 h – 19 h
- horaires.0.sam : (vide) → 14 h – 19 h
- horaires.0.source : (vide) → https://www.brasseriedupaysflamand.com/nos-etablissements/
- horaires.0.verifieLe : (vide) → 2026-10-29
- horaires.1.nature : (vide) → accueil
- horaires.1.jeu : (vide) → 17 h – 23 h
- horaires.1.ven : (vide) → 12 h – 14 h, 19 h – 23 h
- horaires.1.sam : (vide) → 12 h – 14 h, 19 h – 23 h
- horaires.1.dim : (vide) → 12 h – 14 h
- horaires.1.source : (vide) → https://www.brasseriedupaysflamand.com/nos-etablissements/
- horaires.1.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.brasseriedupaysflamand.com/nos-etablissements/ ; https://www.brasseriedupaysflamand.com/contact-us/ ; https://data.geopf.fr/geocodage/search?q=425+rue+Andr%C3%A9+Plockyn%2C+59173+Blaringhem&limit=5

Extrait lu : « Mercredi, Jeudi, Vendredi 10h-13h // 14h – 19h et le Samedi 14h à 19h »

Choix du vérificateur : Deux lignes de téléphone existent (siège à Merville, cœur de la brasserie à Blaringhem). Je retiens le 03 28 41 74 99, affiché pour l'adresse de Blaringhem. Horaires : boutique en « vente » (mer-ven 10h-13h et 14h-19h, sam 14h-19h) et estaminet en « accueil » (jeu 17h-23h, ven et sam 12h-14h et 19h-23h, dim 12h-14h). Les créneaux de l'estaminet sont tirés des citations « Jeudi: 17h à 23h (Bar et Resto) », « Vendredi: 12h à 14h et 19h à 23H », « Samedi: 12h à 14h et 19h à 23H », « Dimanche: 12h à 14h ». Ces horaires sont ceux de la page « Nos établissements » : à relire par Cédric. Site : http://www.brasseriedupaysflamand.com (OSM). Pas de page Untappd trouvée. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 7 h 02 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 17 h.
> - Adresse
> - 425 rue André Plockyn, 59173 Blaringhem
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+du+Pays+Flamand&type=brewery)
> - Joindre la brasserie
> - [Appeler le 03 28 41 74 99](tel:+33328417499)
> - [Site de la brasserie](https://www.brasseriedupaysflamand.com)
> - Horaires
> - À 7 h 02 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 10 h.
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | 10 h – 13 h, 14 h – 19 h
> - Jeudi | 10 h – 13 h, 14 h – 19 h
> - Vendredi | 10 h – 13 h, 14 h – 19 h
> - Samedi | 14 h – 19 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | 17 h – 23 h
> - Vendredi | 12 h – 14 h, 19 h – 23 h
> - Samedi | 12 h – 14 h, 19 h – 23 h
> - Dimanche | 12 h – 14 h
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriedupaysflamand.com](https://www.brasseriedupaysflamand.com/nos-etablissements/) le 29 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 3. Monsieur Paon — fiche nouvelle

- n : (vide) → Monsieur Paon
- c : (vide) → Lille
- d : (vide) → 59
- lat : (vide) → 50.64028
- lon : (vide) → 3.0851
- km : (vide) → 565.8
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → solide
- note : (vide) → Microbrasserie lilloise. Le site officiel annonce la vente à emporter à la brasserie le jeudi et le vendredi, ou le retrait des bières réservées en ligne. Aucune dégustation sur place n'est mentionnée.
- addr : (vide) → 53 rue Blanche, 59800 Lille
- src : (vide) → https://monsieurpaon.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 95 31 35 45
- contact.source : (vide) → https://monsieurpaon.fr
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → vente
- horaires.0.jeu : (vide) → 15 h – 19 h
- horaires.0.ven : (vide) → 15 h – 19 h
- horaires.0.source : (vide) → https://monsieurpaon.fr
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://monsieurpaon.fr ; https://data.geopf.fr/geocodage/search?q=53+rue+Blanche%2C+59800+Lille&limit=5

Extrait lu : « Vente à emporter à la brasserie, ou retrait des bières réservées en ligne. »

Choix du vérificateur : Candidat classé « ambigu » dans le paquet, mais aucune fiche de data/ ne porte ce nom ni cette adresse. Le nom OSM « Monsieur Paon / Brasserie Craft » est ramené à « Monsieur Paon », le nom du site. Le 06 95 31 35 45 est un mobile, mais c'est la seule ligne publiée par la brasserie (règle du 21/10). Pas de dégustation sur place lue, donc pas de catégorie 4. Pas de page Untappd trouvée. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 7 h 02 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 15 h.
> - Adresse
> - 53 rue Blanche, 59800 Lille
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Monsieur+Paon&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 95 31 35 45](tel:+33695313545)
> - Horaires
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | 15 h – 19 h
> - Vendredi | 15 h – 19 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [monsieurpaon.fr](https://monsieurpaon.fr) le 29 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 4. Brasserie de Saint-Sylvestre (3 Monts) — fiche nouvelle

- n : (vide) → Brasserie de Saint-Sylvestre (3 Monts)
- c : (vide) → Saint-Sylvestre-Cappel
- d : (vide) → 59
- lat : (vide) → 50.77799
- lon : (vide) → 2.55503
- km : (vide) → 590.3
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Le site officiel propose un magasin de la brasserie et une visite guidée qui se termine par une dégustation. Pas de bar ouvert en continu. Magasin : mardi au samedi 9h-12h30 et 13h30-18h30, lundi 13h30-18h30, samedi après-midi en juillet-août seulement.
- addr : (vide) → 121 Route de la Chapelle, 59114 Saint-Sylvestre-Cappel
- src : (vide) → https://www.3monts.fr/visite/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 03 28 40 15 49
- contact.site : (vide) → https://www.3monts.fr/
- contact.source : (vide) → https://www.3monts.fr/visite/
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 13 h 30 – 18 h 30
- horaires.0.mar : (vide) → 9 h – 12 h 30, 13 h 30 – 18 h 30
- horaires.0.mer : (vide) → 9 h – 12 h 30, 13 h 30 – 18 h 30
- horaires.0.jeu : (vide) → 9 h – 12 h 30, 13 h 30 – 18 h 30
- horaires.0.ven : (vide) → 9 h – 12 h 30, 13 h 30 – 18 h 30
- horaires.0.sam : (vide) → 9 h – 12 h 30
- horaires.0.remarque : (vide) → Samedi après-midi ouvert en juillet-août seulement (13h30-18h30). Fermé le dimanche et les jours fériés.
- horaires.0.source : (vide) → https://www.3monts.fr/visite/
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.3monts.fr/visite/ ; https://data.geopf.fr/geocodage/search?q=121+Route+de+la+Chapelle%2C+59114+Saint-Sylvestre-Cappel&limit=5

Extrait lu : « A la fin, une dégustation de bières en galopin vous sera proposée. »

Choix du vérificateur : Lecture via un résumé de page. Je rattache à cette fiche l'« ENTREPOT DE LA BRASSERIE 3 MONTS » de la clé SIRENE (1 rue de la Chapelle à Saint-Sylvestre-Cappel, et un entrepôt à Steenvoorde) : c'est la même brasserie, dont le site donne l'adresse 121 Route de la Chapelle. Le nom de fiche retenu est celui de l'OSM `way/100997989` « Brasserie de Saint-Sylvestre » (site 3monts.fr), candidat du paquet 22 : doublon probable à dédupliquer côté campagne. Le site mentionne aussi la vente en ligne (bouteilles et verres à partir de 6 pièces), que je n'ai pas retenue. Confiance moyenne car la dégustation n'est citée que dans le cadre de la visite guidée. Untappd : aucune page trouvée, donc pas de lien et pas de bières. La page d'accueil du site liste d'autres liens (Instagram, Facebook, YouTube), sans intérêt ici. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 7 h 02 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 9 h, sous réserve.
> - Adresse
> - 121 Route de la Chapelle, 59114 Saint-Sylvestre-Cappel
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+de+Saint-Sylvestre+%283+Monts%29&type=brewery)
> - Joindre la brasserie
> - [Appeler le 03 28 40 15 49](tel:+33328401549)
> - [Site de la brasserie](https://www.3monts.fr/)
> - Horaires
> - À savoir : Samedi après-midi ouvert en juillet-août seulement (13h30-18h30). Fermé le dimanche et les jours fériés.
> - Horaires de vente
> - Lundi | 13 h 30 – 18 h 30
> - Mardi | 9 h – 12 h 30, 13 h 30 – 18 h 30
> - Mercredi | 9 h – 12 h 30, 13 h 30 – 18 h 30
> - Jeudi | 9 h – 12 h 30, 13 h 30 – 18 h 30
> - Vendredi | 9 h – 12 h 30, 13 h 30 – 18 h 30
> - Samedi | 9 h – 12 h 30
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [3monts.fr](https://www.3monts.fr/visite/) le 29 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 5. Brasserie La Choulette — fiche nouvelle

- n : (vide) → Brasserie La Choulette
- c : (vide) → Hordain
- d : (vide) → 59
- lat : (vide) → 50.26038
- lon : (vide) → 3.31266
- km : (vide) → 521.1
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Le site officiel présente, au Choulette Expérience, un bar qui sert les bières de la brasserie et une boutique qui vend les produits Choulette, bières comprises. Horaires non repris : le site en donne de contradictoires.
- addr : (vide) → 16 rue des Écoles, 59111 Hordain
- src : (vide) → https://lachoulette.com/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 03 27 35 72 44
- contact.site : (vide) → https://lachoulette.com
- contact.source : (vide) → https://lachoulette.com/contact/
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://lachoulette.com/ ; https://lachoulette.com/contact/ ; https://data.geopf.fr/geocodage/search?q=16+rue+des+%C3%89coles%2C+59111+Hordain&limit=5

Extrait lu : « Une boutique où retrouver tous les produits Choulette – bières mais aussi verrerie, textiles… »

Choix du vérificateur : Deux lignes d'une même page (puces voisines) fondent la catégorie 1 ; l'extrait ne cite que la boutique, le bar est dit par : « Un bar où retrouver les bières de la brasserie, servies en formats classiques ou en planches de dégustation. » Téléphone retenu : 03 27 35 72 44, publié par la brasserie sur l'accueil et sur la page contact. Écarté : 03 27 35 99 27, ligne du Choulettorium / Choulette Expérience (15 Route Nationale), qui est aussi une ligne client : à Cédric de choisir si la fiche doit pointer le bar plutôt que la brasserie (16 rue des Écoles, mêmes communes). L'adresse retenue est celle du bar et de la boutique, lue sur https://www.choulette-experience.com/ (« 15 Rte nationale 59111 Hordain ») ; la brasserie est au 16 rue des Écoles (page contact). Pas d'horaires : le Choulettorium est « ouvert du mardi au dimanche à partir de 10h » (visites), le site de l'Expérience donne mardi-jeudi 7h-22h, vendredi 7h-minuit, etc., et « ouverte du mardi au dimanche de 10h à 19h non stop » pour la boutique ; la page contact donne « Ouvert du lundi au vendredi, 8h-12h 14h-17h ». Contradictoires, donc rien proposé. Pas de bières : le site parle de gammes (Choulette, Sans-Culottes, Craft…), pas de styles. Untappd non cherché pour cette fiche. Vente à emporter : la boutique vend des bières, donc pas de « sur place seulement ». Source rouverte à la main le 29/10. Adresse ramenée à celle de la brasserie (page contact) à la relecture ; le bar et la boutique sont au Choulette Expérience, 15 Route Nationale, dans la même commune.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 16 rue des Écoles, 59111 Hordain
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+La+Choulette+Hordain)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+La+Choulette&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 03 27 35 72 44](tel:+33327357244)
> - [Site de la brasserie](https://lachoulette.com)
> - Lu sur [lachoulette.com](https://lachoulette.com/) le 29 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 6. Brasserie Thiriez — fiche nouvelle

- n : (vide) → Brasserie Thiriez
- c : (vide) → Esquelbecq
- d : (vide) → 59
- lat : (vide) → 50.88679
- lon : (vide) → 2.42442
- km : (vide) → 604.6
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Le site officiel annonce « Visite, dégustation et vente directe » et une boutique (vente à l'unité, en pack ou en carton). Les visites commentées et la dégustation guidée se font sur rendez-vous ; le site ne décrit pas un bar ouvert à tous, d'où une confiance moyenne. Fermé le dimanche.
- addr : (vide) → 2B Rue du Vert Vallon, 59470 Esquelbecq
- src : (vide) → http://www.brasseriethiriez.com
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 03 28 62 88 44
- contact.site : (vide) → http://www.brasseriethiriez.com
- contact.source : (vide) → http://www.brasseriethiriez.com
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 9 h – 12 h 30, 14 h – 17 h
- horaires.0.mar : (vide) → 9 h – 12 h 30, 14 h – 17 h
- horaires.0.mer : (vide) → 9 h – 12 h 30, 14 h – 17 h
- horaires.0.jeu : (vide) → 9 h – 12 h 30, 14 h – 19 h
- horaires.0.ven : (vide) → 9 h – 12 h 30, 14 h – 19 h
- horaires.0.sam : (vide) → 9 h – 12 h 30, 14 h 30 – 19 h
- horaires.0.remarque : (vide) → Visites commentées sur rendez-vous.
- horaires.0.source : (vide) → http://www.brasseriethiriez.com
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : http://www.brasseriethiriez.com ; https://data.geopf.fr/geocodage/search?q=Esquelbecq&type=municipality&limit=5

Extrait lu : « Visite, dégustation et vente directe. »

Choix du vérificateur : Adresse : celle du site officiel et de SIRENE (Vert Vallon) ; l'office et Wikipédia donnent la rue de Wormhout. Un guide tiers donne des horaires un peu différents (8h30-12h30 / 13h30-17h) ; seuls ceux du site officiel sont retenus. Une adresse e-mail est aussi publiée ; non reprise (le schéma n'a pas de champ pour elle). Untappd : seules des pages de bières ont été trouvées (étoile du nord, la maline), pas celle de la brasserie ; rien retenu. Les horaires sont ceux de la boutique, donc nature « vente ». Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 7 h 02 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 9 h, sous réserve.
> - Adresse
> - 2B Rue du Vert Vallon, 59470 Esquelbecq
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Thiriez&type=brewery)
> - Joindre la brasserie
> - [Appeler le 03 28 62 88 44](tel:+33328628844)
> - [Site de la brasserie](http://www.brasseriethiriez.com)
> - Horaires
> - À savoir : Visites commentées sur rendez-vous.
> - Horaires de vente
> - Lundi | 9 h – 12 h 30, 14 h – 17 h
> - Mardi | 9 h – 12 h 30, 14 h – 17 h
> - Mercredi | 9 h – 12 h 30, 14 h – 17 h
> - Jeudi | 9 h – 12 h 30, 14 h – 19 h
> - Vendredi | 9 h – 12 h 30, 14 h – 19 h
> - Samedi | 9 h – 12 h 30, 14 h 30 – 19 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriethiriez.com](http://www.brasseriethiriez.com) le 29 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 7. Moulins d'Ascq — fiche nouvelle

- n : (vide) → Moulins d'Ascq
- c : (vide) → Villeneuve-d'Ascq
- d : (vide) → 59
- lat : (vide) → 50.60639
- lon : (vide) → 3.16566
- km : (vide) → 560.9
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → La page taproom du site officiel dit que toutes les bières se boivent à la pression sur place, avec des heures d'ouverture publiées. Une rubrique « La boutique » existe dans le menu mais son contenu n'a pas été lu.
- addr : (vide) → 47 Rue de la Distillerie, 59493 Villeneuve-d'Ascq
- src : (vide) → https://www.moulinsdascq.fr/la-taproom
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 03 20 59 79 38
- contact.site : (vide) → https://www.moulinsdascq.fr
- contact.source : (vide) → https://www.moulinsdascq.fr/la-taproom
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → accueil
- horaires.0.lun : (vide) → 17 h – 21 h 30
- horaires.0.mar : (vide) → 17 h – 23 h
- horaires.0.mer : (vide) → 17 h – 23 h
- horaires.0.jeu : (vide) → 17 h – minuit
- horaires.0.ven : (vide) → 17 h – minuit
- horaires.0.remarque : (vide) → Samedi : « selon programmation ».
- horaires.0.source : (vide) → https://www.moulinsdascq.fr/la-taproom
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.moulinsdascq.fr/la-taproom ; https://data.geopf.fr/geocodage/search?q=47+Rue+de+la+Distillerie%2C+59493+Villeneuve-d%27Ascq&limit=5

Extrait lu : « Retrouvez à la pression toutes nos bières, brassées sous vos yeux ! »

Choix du vérificateur : Téléphone écrit « + 33 03 20 59 79 38 » sur la page taproom, noté 03 20 59 79 38. Un autre numéro (06 17 21 14 83), vu seulement sur un annuaire de salles : écarté. Samedi « selon programmation » dans remarque. Aucune page Untappd trouvée ; les styles cités par le site ne sont pas repris (la règle veut le style lu sur Untappd). Source rouverte à la main le 29/10. Confiance faible : la source dit qu'on boit sur place, pas qu'on vend à emporter (réponse de Cédric du 29/10, relecture de la persona).

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Maintenant
> - À 7 h 02 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 17 h, sous réserve.
> - Adresse
> - 47 Rue de la Distillerie, 59493 Villeneuve-d'Ascq
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Moulins+d%27Ascq&type=brewery)
> - Joindre la brasserie
> - [Appeler le 03 20 59 79 38](tel:+33320597938)
> - [Site de la brasserie](https://www.moulinsdascq.fr)
> - Horaires
> - À savoir : Samedi : « selon programmation ».
> - Horaires d’accueil du public
> - Lundi | 17 h – 21 h 30
> - Mardi | 17 h – 23 h
> - Mercredi | 17 h – 23 h
> - Jeudi | 17 h – minuit
> - Vendredi | 17 h – minuit
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [moulinsdascq.fr](https://www.moulinsdascq.fr/la-taproom) le 29 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 8. Brasserie au Baron — fiche nouvelle

- n : (vide) → Brasserie au Baron
- c : (vide) → Gussignies
- d : (vide) → 59
- lat : (vide) → 50.3363
- lon : (vide) → 3.73752
- km : (vide) → 523.8
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Le site officiel présente une boutique avec les bières maison et une bièrothèque en libre-service, un café-restaurant sur place (vendredi au dimanche et jours fériés, 11h30-22h) et une visite de la brasserie avec dégustation incluse (réservation et paiement en ligne). Le site ne dit pas si le restaurant sert les bières de la brasserie.
- addr : (vide) → 2 Rue du Piémont, 59570 Gussignies
- src : (vide) → https://www.brasserieaubaron.com/boutique
- coordPrecision : (vide) → address
- beers.0.type : (vide) → autre
- beers.0.libelle : (vide) → Cuvée des Jonquilles (Farmhouse Ale, Bière de Garde)
- beers.1.type : (vide) → autre
- beers.1.libelle : (vide) → Saison Saint Médard Ambrée (Farmhouse Ale, Saison)
- beers.2.type : (vide) → autre
- beers.2.libelle : (vide) → Lèse-Majesté (Farmhouse Ale, Grisette)
- beers.3.type : (vide) → autre
- beers.3.libelle : (vide) → Saison Bohémienne (Farmhouse Ale, Saison)
- contact.tel : (vide) → 03 27 66 88 61
- contact.site : (vide) → https://www.brasserieaubaron.com/
- contact.source : (vide) → https://www.brasserieaubaron.com/boutique
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 9 h – 12 h, 14 h – 16 h 45
- horaires.0.mar : (vide) → 9 h – 12 h, 14 h – 16 h 45
- horaires.0.mer : (vide) → 9 h – 12 h, 14 h – 16 h 45
- horaires.0.jeu : (vide) → 9 h – 12 h, 14 h – 16 h 45
- horaires.0.ven : (vide) → 9 h – 12 h, 14 h – 16 h 45
- horaires.0.sam : (vide) → 11 h – 19 h
- horaires.0.dim : (vide) → 11 h – 19 h
- horaires.0.source : (vide) → https://www.brasserieaubaron.com/boutique
- horaires.0.verifieLe : (vide) → 2026-10-29
- horaires.1.nature : (vide) → accueil
- horaires.1.ven : (vide) → 11 h 30 – 22 h
- horaires.1.sam : (vide) → 11 h 30 – 22 h
- horaires.1.dim : (vide) → 11 h 30 – 22 h
- horaires.1.remarque : (vide) → Café-restaurant : ouvert du vendredi au dimanche et les jours fériés.
- horaires.1.source : (vide) → https://www.brasserieaubaron.com/
- horaires.1.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.brasserieaubaron.com/boutique ; https://www.brasserieaubaron.com/ ; https://data.geopf.fr/geocodage/search?q=2+Rue+du+Pi%C3%A9mont%2C+59570+Gussignies&limit=5

Extrait lu : « Retrouvez nos bières maison ainsi qu'une large gamme de spécialités de la région »

Choix du vérificateur : Lecture via un résumé de page. Catégorie 1 en confiance moyenne : la boutique vend les bières maison (page boutique) ; le café-restaurant (page d'accueil) et la dégustation incluse dans la visite (page /reservation-visite-brasserie : « Dégustation incluse », 9 € adultes) permettent de consommer sur place. Untappd : la page https://untappd.com/BrasserieauBaron s'ouvre (« Brasserie au Baron », Gussignies, micro-brasserie, 30 bières). Je ne l'ai PAS mise dans `contact.untappd` car le lien n'est pas écrit sur la page-source du contact : à ajouter si Cédric accepte que la source du contact soit la page Untappd elle-même. Les quatre bières viennent de cette page (10 affichées sur 30), styles recopiés et rangés en « autre » selon `typeDuStyleUntappd`. Elles n'ont pas de `url`, la page de chaque bière n'ayant pas été ouverte. Téléphone : un seul, +33 3 27 66 88 61, publié sur le site pour la brasserie et la boutique. Les horaires de visite ne sont pas fixes (définis sur un portail de réservation) : non retenus. SIRENE donne aussi le 4 rue du Piémont, écarté au profit de l'adresse du site. Le même établissement figure en OSM `node/2407350987` (même ligne de paquet). Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 7 h 02 (heure de Paris), accueil du public : la source ne dit pas les heures de ce jour.
> - Adresse
> - 2 Rue du Piémont, 59570 Gussignies
> - Joindre la brasserie
> - [Appeler le 03 27 66 88 61](tel:+33327668861)
> - [Site de la brasserie](https://www.brasserieaubaron.com/)
> - Horaires
> - À 7 h 02 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 9 h.
> - Horaires de vente
> - Lundi | 9 h – 12 h, 14 h – 16 h 45
> - Mardi | 9 h – 12 h, 14 h – 16 h 45
> - Mercredi | 9 h – 12 h, 14 h – 16 h 45
> - Jeudi | 9 h – 12 h, 14 h – 16 h 45
> - Vendredi | 9 h – 12 h, 14 h – 16 h 45
> - Samedi | 11 h – 19 h
> - Dimanche | 11 h – 19 h
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - À savoir : Café-restaurant : ouvert du vendredi au dimanche et les jours fériés.
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | non précisé
> - Vendredi | 11 h 30 – 22 h
> - Samedi | 11 h 30 – 22 h
> - Dimanche | 11 h 30 – 22 h
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Ses bières
> - Cuvée des Jonquilles (Farmhouse Ale, Bière de Garde) (non référencé)
> - Saison Saint Médard Ambrée (Farmhouse Ale, Saison) (non référencé)
> - Lèse-Majesté (Farmhouse Ale, Grisette) (non référencé)
> - Saison Bohémienne (Farmhouse Ale, Saison) (non référencé)
> - « saison »
> - une bière de tradition belge, sèche et rafraîchissante
> - « grisette »
> - une bière légère et sèche, de tradition belge
> - [Chercher ses bières sur Untappd](https://untappd.com/search?q=Brasserie+au+Baron&type=brewery) (Untappd, une application d’avis sur les bières ; la recherche se fait par le nom de la brasserie)
> - Lu sur [brasserieaubaron.com](https://www.brasserieaubaron.com/boutique) le 29 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 9. Brasserie Breweppes — fiche nouvelle

- n : (vide) → Brasserie Breweppes
- c : (vide) → Herlies
- d : (vide) → 59
- lat : (vide) → 50.56932
- lon : (vide) → 2.84954
- km : (vide) → 562.3
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → La brasserie existe : son site officiel donne son adresse, son téléphone et sa gamme. Il ne dit rien de la vente sur place, ni des visites, ni des horaires. La gamme Weppa y est présentée comme « une gamme exclusive pour nos cavistes, cafés, hôtels & restaurants ». Ce qu'on peut y faire n'est pas établi.
- addr : (vide) → 10 rue des charrons, 59134 Herlies
- src : (vide) → https://www.breweppes.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 03 20 04 69 62
- contact.site : (vide) → https://www.breweppes.fr/
- contact.source : (vide) → https://www.breweppes.fr/
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.breweppes.fr/ ; https://data.geopf.fr/geocodage/search?q=10+rue+des+charrons%2C+59134+Herlies&limit=5

Extrait lu : « BREWEPPES, c’est le projet fou de passionnés de la bière »

Choix du vérificateur : Un seul numéro publié (03 20 04 69 62, rubrique Contact – Accès), retenu. Catégorie 0 : le site ne parle ni de vente directe, ni de boutique, ni de visite, ni d'horaires, donc rien n'est déduit. Gammes lues sur le site : Weppa (blonde, IPA, triple, ambrée, hiver, destinée aux professionnels), Highway to Weppes (éphémères, pour les professionnels), Breweppes (Sun Wave, Wake Hop, Watt Ales). Je ne les ai pas mises dans `beers` : les types viennent d'Untappd (DONNEES.md) et aucune page Untappd de la brasserie n'a été trouvée. Je n'ai pas non plus proposé de lien Untappd. Le site ne donne que Facebook et Instagram comme réseaux, et ce ne sont pas des preuves. Vérifié par la recherche Untappd (« Breweppes ») : pas de page de brasserie. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 10 rue des charrons, 59134 Herlies
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Breweppes+Herlies)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Breweppes&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 03 20 04 69 62](tel:+33320046962)
> - [Site de la brasserie](https://www.breweppes.fr/)
> - Lu sur [breweppes.fr](https://www.breweppes.fr/) le 29 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 10. Brasserie des Sources — fiche nouvelle

- n : (vide) → Brasserie des Sources
- c : (vide) → Saint-Amand-les-Eaux
- d : (vide) → 59
- lat : (vide) → 50.44741
- lon : (vide) → 3.44015
- km : (vide) → 539.6
- cat : (vide) → 3 (Pas de vente)
- conf : (vide) → moyenne
- note : (vide) → Site de production : la brasserie ne se visite pas pour le moment (visites lors des journées portes ouvertes seulement) et n'a pas encore de boutique. Les bières se trouvent en supermarchés partenaires.
- addr : (vide) → 2 avenue du Collège, 59230 Saint-Amand-les-Eaux
- src : (vide) → https://brasseriedessources.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://brasseriedessources.fr
- contact.source : (vide) → https://brasseriedessources.fr/contact/
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://brasseriedessources.fr ; https://brasseriedessources.fr/contact/ ; https://data.geopf.fr/geocodage/search?q=2+avenue+du+Coll%C3%A8ge%2C+59230+Saint-Amand-les-Eaux&limit=5

Extrait lu : « Non, nous n'avons pas encore de boutique à la Brasserie des Sources. »

Choix du vérificateur : Catégorie 3 d'après la FAQ du site officiel (pas de boutique, pas de visite en dehors des journées portes ouvertes). Confiance moyenne : la FAQ le dit au présent (« pas encore », « pour le moment »), donc la situation peut changer. Aucun téléphone publié (formulaire et e-mail seulement), donc pas de `contact.tel`. Aucun horaire publié. Aucune page Untappd trouvée, donc aucun type de bière retenu (`beers` vide). Le site cite Bellerose, Vieux Lille, Estaminet, etc., mais sans source Untappd je ne les propose pas. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Pas de vente
> - Adresse
> - 2 avenue du Collège, 59230 Saint-Amand-les-Eaux
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+des+Sources+Saint-Amand-les-Eaux)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+des+Sources&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://brasseriedessources.fr)
> - Lu sur [brasseriedessources.fr](https://brasseriedessources.fr) le 29 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 11. Brasserie du Pays Flamand (Merville) — fiche nouvelle

- n : (vide) → Brasserie du Pays Flamand (Merville)
- c : (vide) → Merville
- d : (vide) → 59
- lat : (vide) → 50.63647
- lon : (vide) → 2.65466
- km : (vide) → 573.2
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Le site officiel présente à Merville une Tap Room (bières tirées au robinet) et une boutique qui vend les bières de la brasserie à emporter.
- addr : (vide) → 83 route de la Gorgue, 59660 Merville
- src : (vide) → https://www.brasseriedupaysflamand.com/nos-etablissements/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 03 28 41 74 99
- contact.site : (vide) → https://www.brasseriedupaysflamand.com
- contact.source : (vide) → https://www.brasseriedupaysflamand.com/contact-us/
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → accueil
- horaires.0.mer : (vide) → 10 h – 12 h 30, 14 h – 22 h
- horaires.0.jeu : (vide) → 10 h – 12 h 30, 14 h – 22 h
- horaires.0.ven : (vide) → 10 h – 12 h 30, 14 h – 22 h
- horaires.0.sam : (vide) → 14 h – 19 h
- horaires.0.remarque : (vide) → Horaires de la Tap Room de Merville.
- horaires.0.source : (vide) → https://www.brasseriedupaysflamand.com/nos-etablissements/
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.brasseriedupaysflamand.com/nos-etablissements/ ; https://www.brasseriedupaysflamand.com/contact-us/ ; https://data.geopf.fr/geocodage/search?q=83+route+de+la+Gorgue%2C+59660+Merville&limit=5

Extrait lu : « Mercredi : 10h- 12h30 et 14h à 22h »

Choix du vérificateur : Lu via un résumé de la page (l'outil de lecture ne recopie pas de bloc entier). L'extrait est donc un fragment cité par ce résumé, à recontrôler sur la page par Cédric. Pas « sur place seulement » : la boutique de Merville vend à emporter. Le site a deux lieux ; je ne propose que Merville (le candidat SIRENE est à Merville). Blaringhem (59173, 425 rue André Plockyn) est un autre lieu, avec estaminet, visites et boutique : il n'a pas de fiche et est à traiter à part. Téléphone : un seul numéro publié pour les deux sites (+33 (0)3 28 41 74 99), retenu. Je n'ai pas retenu les portables et courriels nominatifs du bloc Blaringhem. Aucune page Untappd trouvée, aucun lien Untappd proposé. Les trois bières viennent de la boutique en ligne du site (page de catégorie « Bières » ; le catalogue vient d'une lecture résumée). Horaires : le bloc vente reprend celui de la Tap Room, car la boutique est donnée aux mêmes heures ; deux lectures résumées l'ont rendu de façon légèrement différente, à recontrôler. Source rouverte à la main le 29/10. Retirés à la relecture : le bloc de vente (recopié de l'accueil, non lu) et les bières (noms de la boutique, pas de style Untappd).

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 7 h 02 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 10 h, sous réserve.
> - Adresse
> - 83 route de la Gorgue, 59660 Merville
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+du+Pays+Flamand+%28Merville%29&type=brewery)
> - Joindre la brasserie
> - [Appeler le 03 28 41 74 99](tel:+33328417499)
> - [Site de la brasserie](https://www.brasseriedupaysflamand.com)
> - Horaires
> - À savoir : Horaires de la Tap Room de Merville.
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | 10 h – 12 h 30, 14 h – 22 h
> - Jeudi | 10 h – 12 h 30, 14 h – 22 h
> - Vendredi | 10 h – 12 h 30, 14 h – 22 h
> - Samedi | 14 h – 19 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriedupaysflamand.com](https://www.brasseriedupaysflamand.com/nos-etablissements/) le 29 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 12. Brasserie du Pavé — fiche nouvelle

- n : (vide) → Brasserie du Pavé
- c : (vide) → Ennevelin
- d : (vide) → 59
- lat : (vide) → 50.53712
- lon : (vide) → 3.1261
- km : (vide) → 554
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → faible
- note : (vide) → Le site officiel indique une boutique de la brasserie avec ses horaires (mercredi-vendredi, samedi matin) et des visites avec dégustation le samedi matin sur rendez-vous. La page ne dit pas explicitement qu'on y achète des bières ni qu'on y boit sur place.
- addr : (vide) → 26 bis rue Nicéphore Niépce, 59710 Ennevelin
- src : (vide) → https://www.brasserie-du-pave.fr
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 03 20 41 35 04
- contact.site : (vide) → https://www.brasserie-du-pave.fr
- contact.source : (vide) → https://www.brasserie-du-pave.fr
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.brasserie-du-pave.fr ; https://data.geopf.fr/geocodage/search?q=Ennevelin&type=municipality&limit=5

Extrait lu : « Lieu et horaires de la boutique »

Choix du vérificateur : Catégorie 2 : la boutique est nommée avec adresse et horaires, mais aucune phrase ne dit « vente à emporter » ni « bar » ; la dégustation n'est offerte qu'avec la visite sur rendez-vous (« Des visites sont organisées les samedis matin sur rendez-vous. »), donc pas catégorie 1. Pas « sur place seulement ». Téléphone : 03 20 41 35 04, seul numéro publié (avec contact@brasserie-du-pave.fr). Page Untappd existante (https://untappd.com/brasseriedupave, qui renvoie au site officiel, 39 bières, styles : tripel, blonde, IPA belge, bière fumée, bière de garde…), non ajoutée au contact car la source du contact est le site et que l'Untappd n'y figure pas ; à ajouter si Cédric le veut (le lien existe, ouvert au résumé). Bières non listées avec lien : le site cite blonde, triple, IPA, ambrée (gamme PVL) sans pages par bière. Source rouverte à la main le 29/10. Horaires de la boutique non repris : le contrôle ne relit pas le samedi. Confiance faible, comme La Villette : la boutique a des horaires, mais aucune phrase ne dit la vente.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement (à vérifier)
> - Adresse
> - 26 bis rue Nicéphore Niépce, 59710 Ennevelin
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+du+Pav%C3%A9+Ennevelin)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+du+Pav%C3%A9&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 03 20 41 35 04](tel:+33320413504)
> - [Site de la brasserie](https://www.brasserie-du-pave.fr)
> - Lu sur [brasserie-du-pave.fr](https://www.brasserie-du-pave.fr) le 29 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 13. Célestin - La Micro-Brasserie du Vieux-Lille — fiche nouvelle

- n : (vide) → Célestin - La Micro-Brasserie du Vieux-Lille
- c : (vide) → Lille
- d : (vide) → 59
- lat : (vide) → 50.6392
- lon : (vide) → 3.05941
- km : (vide) → 566.1
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Le site officiel présente une micro-brasserie avec visites et une cave à bières (120 rue Esquermoise, Lille) où l'on achète les bières, avec retrait en ligne. Il parle de dégustations pendant les visites, mais ne dit pas qu'on peut boire sur place hors visite : vente seule retenue.
- addr : (vide) → 19 rue Jean-Jacques Rousseau, 59800 Lille
- src : (vide) → https://celestinlille.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 09 81 21 67 21
- contact.site : (vide) → https://celestinlille.fr
- contact.untappd : (vide) → https://untappd.com/LaMicroBrasserieDuVieuxLille
- contact.source : (vide) → https://celestinlille.fr
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://celestinlille.fr ; https://data.geopf.fr/geocodage/search?q=19+rue+Jean-Jacques+Rousseau%2C+59800+Lille&limit=5

Extrait lu : « Venez découvrir nos brasseries et organiser vos événements dans notre salle de réception »

Choix du vérificateur : Téléphone retenu : 09 81 21 67 21, le seul publié sur la page. Les horaires de vente sont ceux de la cave, rue Esquermoise (autre adresse que la brasserie), et la remarque le dit. Je n'ai pas écrit les visites en horaires d'accueil : la page donne des heures de départ (14h, 15h...), pas des plages. Je n'ai pas retenu la boutique de Haubourdin, ni le dimanche de la cave, absent de la source. Bières laissées vides : le format de beers ne m'est pas donné et les styles viennent d'un résumé. La page https://celestinlille.fr/nos-bieres/ donne La Dix (pale ale), Wal (triple), Hoppy Yuzu (IPA), N° Noir (stout), Héroïne (blanche), Exalt (double IPA), 1740 (impérial stout). Untappd (lu via un résumé) liste IPA, Blonde Pale Ale, Belgian Tripel, Stout, Witbier, Session IPA et NEIPA. Source rouverte à la main le 29/10. Horaires retirés à la relecture : ce sont ceux de la cave, rue Esquermoise, une autre adresse que la fiche.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - 19 rue Jean-Jacques Rousseau, 59800 Lille
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=C%C3%A9lestin+-+La+Micro-Brasserie+du+Vieux-Lille+Lille)[Ses bières sur Untappd](https://untappd.com/search?q=C%C3%A9lestin+-+La+Micro-Brasserie+du+Vieux-Lille&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 09 81 21 67 21](tel:+33981216721)
> - [Site de la brasserie](https://celestinlille.fr)[Untappd (avis sur les bières)](https://untappd.com/LaMicroBrasserieDuVieuxLille)
> - Lu sur [celestinlille.fr](https://celestinlille.fr) le 29 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 14. Brasserie Cambier — fiche nouvelle

- n : (vide) → Brasserie Cambier
- c : (vide) → Croix
- d : (vide) → 59
- lat : (vide) → 50.68002
- lon : (vide) → 3.14186
- km : (vide) → 569.2
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Le site officiel présente une « Boutique / Bar » : toute la gamme en boutique, retrait en magasin (click and collect), horaires de la boutique/bar. Il présente aussi la Taproom comme « le bar de dégustation de la Brasserie Cambier ». La page ne dit pas noir sur blanc « à emporter » ni « boire sur place », d'où une confiance moyenne. Les visites de la brasserie sont temporairement fermées. Une presse locale de janvier 2025 (non ouverte) parlerait d'un appel à l'aide pour relancer la brasserie, à surveiller.
- addr : (vide) → 251 rue Jean Monnet, 59170 Croix
- src : (vide) → https://www.brasserie-cambier.fr/boutique-bar-degustation-biere-brasserie-artisanale-lille-nord-location-pompe
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 07 72 37 56 14
- contact.site : (vide) → https://www.brasserie-cambier.fr
- contact.source : (vide) → https://www.brasserie-cambier.fr/boutique-bar-degustation-biere-brasserie-artisanale-lille-nord-location-pompe
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → accueil
- horaires.0.mer : (vide) → 16 h – 23 h
- horaires.0.jeu : (vide) → 16 h – 23 h
- horaires.0.ven : (vide) → 16 h – 23 h
- horaires.0.sam : (vide) → 10 h – 23 h
- horaires.0.source : (vide) → https://www.brasserie-cambier.fr/boutique-bar-degustation-biere-brasserie-artisanale-lille-nord-location-pompe
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.brasserie-cambier.fr/boutique-bar-degustation-biere-brasserie-artisanale-lille-nord-location-pompe ; https://data.geopf.fr/geocodage/search?q=251+rue+Jean+Monnet%2C+59170+Croix&limit=5

Extrait lu : « Boutique : toute notre gamme de bières en un seul lieu ! »

Choix du vérificateur : Pas « sur place seulement » : la boutique vend. Téléphone : +33 (0)7 72 37 56 14, un portable, seule ligne publiée par la brasserie (pages boutique, contact et accueil), retenu par la règle du 21/10. Untappd https://untappd.com/BrasserieCambier ouvert et vérifié (brasserie à Croix). Il liste des styles (IPA Imperial/Double, Belgian Tripel, IPA New England/Hazy, Belgian Blonde, Sour Fruited, Farmhouse Ale...). Je n'ai pas rempli les bières, faute d'un format de style exact par bière. Aucune note ni avis recopié. Source rouverte à la main le 29/10. Lien Untappd non repris : la page source ne le cite pas.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 7 h 02 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 16 h.
> - Adresse
> - 251 rue Jean Monnet, 59170 Croix
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Cambier&type=brewery)
> - Joindre la brasserie
> - [Appeler le 07 72 37 56 14](tel:+33772375614)
> - [Site de la brasserie](https://www.brasserie-cambier.fr)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | 16 h – 23 h
> - Jeudi | 16 h – 23 h
> - Vendredi | 16 h – 23 h
> - Samedi | 10 h – 23 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserie-cambier.fr](https://www.brasserie-cambier.fr/boutique-bar-degustation-biere-brasserie-artisanale-lille-nord-location-pompe) le 29 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 15. Micro Brasserie Hardy — fiche nouvelle

- n : (vide) → Micro Brasserie Hardy
- c : (vide) → Quesnoy-sur-Deûle
- d : (vide) → 59
- lat : (vide) → 50.70735
- lon : (vide) → 3.00294
- km : (vide) → 574.4
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Son site annonce un lieu au pied des cuves où l'on déguste toute la production. La vente à emporter n'y est pas écrite : catégorie probable, d'où une confiance faible.
- addr : (vide) → 117 rue de Lille 59890 Quesnoy-sur-Deûle
- src : (vide) → https://brasserie-hardy.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 07 63 04 55 24
- contact.site : (vide) → https://brasserie-hardy.fr
- contact.source : (vide) → https://brasserie-hardy.fr
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://brasserie-hardy.fr ; https://data.geopf.fr/geocodage/search?q=117+rue+de+Lille+59890+Quesnoy-sur-De%C3%BBle&limit=5

Extrait lu : « un lieux au pied des cuves on l’on peut déguster toute la production en direct »

Choix du vérificateur : Catégorie 1 en confiance faible, par la réponse de Cédric du 29/10 (on boit sur place, la vente n'est pas dite). Téléphone : le seul publié est un mobile (07 63 04 55 24), retenu (règle du 21/10). Deux adresses sur le site ; le 117 rue de Lille, aussi celui de SIRENE, est gardé. Horaires de l'office non repris. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Adresse
> - 117 rue de Lille 59890 Quesnoy-sur-Deûle
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Micro+Brasserie+Hardy+Quesnoy-sur-De%C3%BBle)[Ses bières sur Untappd](https://untappd.com/search?q=Micro+Brasserie+Hardy&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 07 63 04 55 24](tel:+33763045524)
> - [Site de la brasserie](https://brasserie-hardy.fr)
> - Lu sur [brasserie-hardy.fr](https://brasserie-hardy.fr) le 29 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 16. Brasserie du Mont Cassel — fiche nouvelle

- n : (vide) → Brasserie du Mont Cassel
- c : (vide) → Cassel
- d : (vide) → 59
- lat : (vide) → 50.80111
- lon : (vide) → 2.48818
- km : (vide) → 594.2
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Brasserie artisanale de Cassel, ambassadrice de la Bière du Reuze. La fiche du Département du Nord dit qu'on la découvre dans sa boutique à Cassel, entre tradition et dégustation ; elle ne précise ni la carte ni les horaires. Source institutionnelle, d'où la confiance moyenne.
- addr : (vide) → 340 route de Dunkerque, 59670 Cassel
- src : (vide) → https://evasion.lenord.fr/offres/brasserie-du-mont-cassel-cassel-fr-6051877/
- coordPrecision : (vide) → address
- beers.0.type : (vide) → blonde
- beers.0.libelle : (vide) → Bière du Reuze
- beers.0.url : (vide) → https://untappd.com/w/brasserie-du-mont-cassel/266107
- beers.1.type : (vide) → autre
- beers.1.libelle : (vide) → Bière du Reuze Triple (Belgian Tripel)
- beers.1.url : (vide) → https://untappd.com/w/brasserie-du-mont-cassel/266107
- beers.2.type : (vide) → autre
- beers.2.libelle : (vide) → Bière du Reuze Ambrée (Farmhouse Ale, Bière de Garde)
- beers.2.url : (vide) → https://untappd.com/w/brasserie-du-mont-cassel/266107
- beers.3.type : (vide) → autre
- beers.3.libelle : (vide) → Bière du Reuze L'hivernale (Winter Ale)
- beers.3.url : (vide) → https://untappd.com/w/brasserie-du-mont-cassel/266107
- beers.4.type : (vide) → autre
- beers.4.libelle : (vide) → Bière du Reuze Authentique (Traditional Ale)
- beers.4.url : (vide) → https://untappd.com/w/brasserie-du-mont-cassel/266107
- contact.untappd : (vide) → https://untappd.com/w/brasserie-du-mont-cassel/266107
- contact.source : (vide) → https://untappd.com/w/brasserie-du-mont-cassel/266107
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://evasion.lenord.fr/offres/brasserie-du-mont-cassel-cassel-fr-6051877/ ; https://untappd.com/w/brasserie-du-mont-cassel/266107 ; https://data.geopf.fr/geocodage/search?q=340+route+de+Dunkerque%2C+59670+Cassel&limit=5

Extrait lu : « Découvrez-la dans sa boutique à Cassel et explorez une brasserie qui perpétue le savoir-faire brassicole flamand, entre tradition et dégustation authentique. »

Choix du vérificateur : Téléphone 03 28 49 97 22 : lu seulement sur des pages d'office/tourisme (evasion.lenord.fr, cirkwi) et un agrégateur (le-pigeon-voyageur.fr), jamais sur une page de la brasserie : écarté (règle). Site officiel bieredureuze.fr : ouvert, il affiche « PROCHAINEMENT », un lien Facebook et contact@bieredureuze.fr, sans adresse, horaires, téléphone ni bières ; je ne le mets pas dans contact (une seule source par contact, et Untappd n'y figure pas). Horaires : « les vendredis et samedis » lus seulement sur Le Pigeon Voyageur (agrégateur) et « souvent ouvert le week-end » sur un guide Google Sites non officiel, sans heures : écartés. Styles Untappd : seul « Blonde / Golden Ale » a une règle (blonde) ; les quatre autres tombent en « autre », libellé recopiant le style (typeDuStyleUntappd). Les URL de bière pointent la page Untappd de la brasserie, faute d'avoir lu chaque page de bière (pas de notes ni avis recopiés). La catégorie 1 repose sur « boutique » + « dégustation » dans la même phrase, que Cédric peut rabattre en 0 s'il la trouve trop vague. Source rouverte à la main le 29/10. Confiance faible : une seule phrase de la page du Département (« boutique » et « dégustation »), et le site de la brasserie n'affiche que « PROCHAINEMENT ».

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Adresse
> - 340 route de Dunkerque, 59670 Cassel
> - Pas encore dans la fiche : son téléphone et ses horaires.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+du+Mont+Cassel+Cassel)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Untappd (avis sur les bières)](https://untappd.com/w/brasserie-du-mont-cassel/266107)
> - Ses bières
> - [La page des bières de la brasserie](https://untappd.com/w/brasserie-du-mont-cassel/266107)
> - Bière du Reuze · Blonde — claire et légère
> - Bière du Reuze Triple (Belgian Tripel)
> - Bière du Reuze Ambrée (Farmhouse Ale, Bière de Garde)
> - Bière du Reuze L'hivernale (Winter Ale)
> - Bière du Reuze Authentique (Traditional Ale)
> - « triple »
> - le plus souvent, une bière forte de tradition belge
> - Lu sur [evasion.lenord.fr](https://evasion.lenord.fr/offres/brasserie-du-mont-cassel-cassel-fr-6051877/) le 29 octobre 2026. Lu sur [untappd.com](https://untappd.com/w/brasserie-du-mont-cassel/266107) le 29 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : lisez-la avant d’y aller.

### 17. Le Singe Savant — fiche nouvelle

- n : (vide) → Le Singe Savant
- c : (vide) → Lille
- d : (vide) → 59
- lat : (vide) → 50.63095
- lon : (vide) → 3.04539
- km : (vide) → 565.5
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → La page de l'agence Hello Lille (métropole) présente une micro-brasserie coopérative du quartier de Moulins, avec un bar et une boutique à 100 mètres, et liste dégustation, bar et boutique. Pas d'horaires ni de téléphone lus. Le site de la brasserie (singe-savant.com) n'a donné que son titre.
- addr : (vide) → Lille
- src : (vide) → https://en.hellolille.eu/i-organize/reception-areas/brasserie-du-singe-savant-lille-en-4700137
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.site : (vide) → https://www.singe-savant.com
- contact.source : (vide) → https://en.hellolille.eu/i-organize/reception-areas/brasserie-du-singe-savant-lille-en-4700137
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://en.hellolille.eu/i-organize/reception-areas/brasserie-du-singe-savant-lille-en-4700137 ; https://data.geopf.fr/geocodage/search?q=Lille&type=municipality&limit=5

Extrait lu : « There's also a bar and store just 100 metres from the brewery, and a home-brewing workshop. »

Choix du vérificateur : Lecture via un résumé (WebFetch). Confiance moyenne : office/agence de tourisme, et le site officiel n'a livré que « Micro-brasserie Le Singe Savant, Lille ». Page Untappd existante : https://untappd.com/LaBrasserieDuSingeSavant (« Brasserie du Singe Savant », micro-brasserie, bar au 94 rue d'Arras, ouvert du mardi au samedi ; lue via un résumé). Je ne la mets pas dans contact, car contact.source est la page HelloLille. Bières Untappd : styles lus (IPA, Sour, Stout, Porter, Pale Ale, Witbier…), non recopiés dans beers faute de format de bière vérifié. Adresse laissée vide : 94 rue d'Arras (Untappd, bar) et 134 rue d'Arras (SIRENE) divergent, et la page HelloLille ne donne que des coordonnées. Horaires de tablejourney (annuaire) écartés. Aucun téléphone lu. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Pas encore dans la fiche : son adresse, son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Le+Singe+Savant+Lille)[Ses bières sur Untappd](https://untappd.com/search?q=Le+Singe+Savant&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://www.singe-savant.com)
> - Lu sur [en.hellolille.eu](https://en.hellolille.eu/i-organize/reception-areas/brasserie-du-singe-savant-lille-en-4700137) le 29 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 18. Brasserie des Dunes de Flandre — fiche nouvelle

- n : (vide) → Brasserie des Dunes de Flandre
- c : (vide) → Bray-Dunes
- d : (vide) → 59
- lat : (vide) → 51.07067
- lon : (vide) → 2.52096
- km : (vide) → 622.2
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → La brasserie existe (site officiel diabinte.fr, marque DIABINTE). Elle propose des visites d'atelier avec dégustation pour les groupes, sur rendez-vous. Le site ne dit pas qu'on y achète ou boit sur place : la boutique « DIABINTE La Boutique » est à Dunkerque et la page ne décrit pas ce qu'elle vend.
- addr : (vide) → 59 rue Roger Salengro, 59123 Bray-Dunes
- src : (vide) → https://diabinte.fr/contact/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 03 28 58 83 98
- contact.site : (vide) → https://diabinte.fr
- contact.source : (vide) → https://diabinte.fr/contact/
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://diabinte.fr/contact/ ; https://data.geopf.fr/geocodage/search?q=59+rue+Roger+Salengro%2C+59123+Bray-Dunes&limit=5

Extrait lu : « Les visites d’atelier avec une dégustation sont proposées pour les groupes de 10 personnes et + sur rendez vous »

Choix du vérificateur : Deux numéros sur la page contact (« 03 28 58 83 98 ou au 06 74 90 92 16 ») : je retiens le fixe 03 28 58 83 98, aussi écrit sur l'accueil (« Tél : 03 28 58 83 98 »), et j'écarte le mobile. Horaires non proposés : l'accueil donne « jeudi : 10h/12h – vendredi : 10h/12h & 15h/18h – samedi : 15h/18h » pour Bray-Dunes mais sans dire s'il s'agit d'accueil ou de vente. La boutique de Dunkerque (39 boulevard Sainte Barbe, mardi-samedi) serait une autre adresse : à trancher par Cédric. Les bières lues sur diabinte.fr/les-produits/ sont des blondes, ambrée, blanche, brune, IPA et bière de Noël, sans page Untappd trouvée : aucune bière proposée. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 59 rue Roger Salengro, 59123 Bray-Dunes
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+des+Dunes+de+Flandre+Bray-Dunes)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+des+Dunes+de+Flandre&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 03 28 58 83 98](tel:+33328588398)
> - [Site de la brasserie](https://diabinte.fr)
> - Lu sur [diabinte.fr](https://diabinte.fr/contact/) le 29 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 19. Brasserie Lilloise — fiche nouvelle

- n : (vide) → Brasserie Lilloise
- c : (vide) → Roncq
- d : (vide) → 59
- lat : (vide) → 50.75372
- lon : (vide) → 3.13141
- km : (vide) → 577.4
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → La brasserie existe et publie son adresse et son téléphone sur son site officiel. Le site propose un « Click & Collect » et la location de tireuse, sans dire où ni quand on peut venir acheter ou boire sur place ; aucun horaire publié.
- addr : (vide) → 24 avenue de l'Europe, 59223 Roncq
- src : (vide) → https://www.brasserie-lilloise.com/contact
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 03 20 68 18 59
- contact.site : (vide) → https://www.brasserie-lilloise.com
- contact.source : (vide) → https://www.brasserie-lilloise.com/contact
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.brasserie-lilloise.com/contact ; https://data.geopf.fr/geocodage/search?q=24+avenue+de+l%27Europe%2C+59223+Roncq&limit=5

Extrait lu : « +33 (0) 3 20 68 18 59 »

Choix du vérificateur : Seul numéro publié sur le site officiel (page contact, aussi sur /boutique et l'accueil), un fixe 03 : retenu. Le même numéro figure sur la fiche de l'office Hello Lille, mais c'est le site de la brasserie qui le porte. Gammes lues sur /nosbieres : Lyderic, Pyrite, Phinaert, Achille, sans style ; pas de page Untappd trouvée, donc aucune bière proposée. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 24 avenue de l'Europe, 59223 Roncq
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Lilloise+Roncq)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Lilloise&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 03 20 68 18 59](tel:+33320681859)
> - [Site de la brasserie](https://www.brasserie-lilloise.com)
> - Lu sur [brasserie-lilloise.com](https://www.brasserie-lilloise.com/contact) le 29 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 20. Waale — fiche nouvelle

- n : (vide) → Waale
- c : (vide) → Wasquehal
- d : (vide) → 59
- lat : (vide) → 50.6703
- lon : (vide) → 3.12327
- km : (vide) → 568.5
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Micro-brasserie à Wasquehal, existence établie par son site officiel. Le site ne dit pas si l'on peut venir sur place ni acheter à emporter (boutique en ligne seulement) : à confirmer.
- addr : (vide) → 12 rue de Marcq-en-Barœul 59290 Wasquehal
- src : (vide) → https://www.waale.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://www.waale.fr/
- contact.source : (vide) → https://www.waale.fr/
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.waale.fr/ ; https://data.geopf.fr/geocodage/search?q=12+rue+de+Marcq-en-Bar%C5%93ul+59290+Wasquehal&limit=5

Extrait lu : « Nous sommes ouverts du lundi au vendredi de 9h30 à 12h30 et de 14h à 18h. »

Choix du vérificateur : Horaires non retenus : le site les titre « Horaires d'ouverture de la brasserie » sans dire s'il s'agit d'un accueil du public ou de bureaux. Aucun lien Untappd trouvé. Le site waale.beer redirige vers waale.fr (301). Adresse reprise de SIRENE, absente du site. Source rouverte à la main le 29/10. Téléphone non repris : l'outil de contrôle ne peut pas le relire sur la page (format ou balise).

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 12 rue de Marcq-en-Barœul 59290 Wasquehal
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Waale+Wasquehal)[Ses bières sur Untappd](https://untappd.com/search?q=Waale&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://www.waale.fr/)
> - Lu sur [waale.fr](https://www.waale.fr/) le 29 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 21. La Fabriq' — fiche nouvelle

- n : (vide) → La Fabriq'
- c : (vide) → Râches
- d : (vide) → 59
- lat : (vide) → 50.41068
- lon : (vide) → 3.13348
- km : (vide) → 540.2
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Brasserie artisanale de Râches. Le site officiel propose une dégustation sur place le vendredi et le samedi. Il ne dit ni vente de bouteilles ni vente à emporter. Les bières sont conditionnées en bouteilles de 33 et 75 cl. Horaires saisonniers : « Les horaires peuvent varier selon la saison. »
- addr : (vide) → 60 Quai du Canal, 59194 Râches
- src : (vide) → https://www.brasserielafabriq.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 03 66 76 93 53
- contact.site : (vide) → https://www.brasserielafabriq.fr/
- contact.source : (vide) → https://www.brasserielafabriq.fr/
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → accueil
- horaires.0.ven : (vide) → 15 h 30 – 22 h 30
- horaires.0.sam : (vide) → 15 h – 19 h
- horaires.0.remarque : (vide) → Les horaires peuvent varier selon la saison.
- horaires.0.source : (vide) → https://www.brasserielafabriq.fr/
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.brasserielafabriq.fr/ ; https://data.geopf.fr/geocodage/search?q=60+Quai+du+Canal%2C+59194+R%C3%A2ches&limit=5

Extrait lu : « Envie de boire une bonne bière ? Venez chez nous et dégustez la bière qui vous fera plaisir ! »

Choix du vérificateur : À examiner par Cédric : pour la catégorie « sur place seulement » (cat 4), je n'ai pas de phrase qui dise qu'il n'y a pas de vente à emporter. La page ne mentionne simplement aucune vente à emporter. Catégorie 1, sans présumer du cat 4. Si Cédric veut être strict, la vente n'étant pas écrite, c'est cat 0 ou cat 4. Bières laissées vides : l'Untappd (blonde, triple, IPA, stout, ambrée, Rachoise, Briquette, Smash, bière de campagne, Roussette, 10 bières affichées sur 13) n'a été lue que par résumé, sans URL de bière à mettre. Un seul numéro publié (03 66 76 93 53), retenu. La page parle aussi d'un « Bar mobile & staff » pour les événements privatisés, écarté. Confiance faible : la page dit qu'on boit sur place, pas qu'on vend à emporter (réponse de Cédric du 29/10). Source rouverte à la main le 29/10. Lien Untappd non repris : la page source ne le cite pas.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Maintenant
> - À 7 h 02 (heure de Paris), accueil du public : la source ne dit pas les heures de ce jour.
> - Adresse
> - 60 Quai du Canal, 59194 Râches
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=La+Fabriq%27&type=brewery)
> - Joindre la brasserie
> - [Appeler le 03 66 76 93 53](tel:+33366769353)
> - [Site de la brasserie](https://www.brasserielafabriq.fr/)
> - Horaires
> - À savoir : Les horaires peuvent varier selon la saison.
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | non précisé
> - Vendredi | 15 h 30 – 22 h 30
> - Samedi | 15 h – 19 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserielafabriq.fr](https://www.brasserielafabriq.fr/) le 29 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 22. Brasserie Motte Cordonnier — fiche nouvelle

- n : (vide) → Brasserie Motte Cordonnier
- c : (vide) → Armentières
- d : (vide) → 59
- lat : (vide) → 50.68598
- lon : (vide) → 2.8935
- km : (vide) → 574
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → La brasserie existe et reçoit le vendredi de 15h à 18h, mais sa page ne dit pas qu'on peut y acheter ou y boire une bière sur place ; les bières se commandent en ligne.
- addr : (vide) → 4 avenue Pierre Mauroy, 59280 Armentières
- src : (vide) → https://bieresmottecordonnier.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://bieresmottecordonnier.fr
- contact.source : (vide) → https://bieresmottecordonnier.fr
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://bieresmottecordonnier.fr ; https://data.geopf.fr/geocodage/search?q=4+avenue+Pierre+Mauroy%2C+59280+Armenti%C3%A8res&limit=5

Extrait lu : « Visite et dégustation de 3 produits (sur demande au 03 68 38 60 06 »

Choix du vérificateur : Lecture via un résumé du site officiel. Lu : « Venez nous rencontrer ! », « Chaque vendredi », « De 15h à 18h », « Commandez les dès maintenant ! » (boutique en ligne easybeer), « Découvrez où vous procurer nos bières », visite et dégustation sur demande (10 €/personne, groupe de 10 min.), adresse « Ruche d'entreprises d'Armentières, 4 avenue Pierre Mauroy 59280 Armentières ». Rien ne dit qu'on achète ou boit sur place le vendredi : catégorie 0, pas d'horaires proposés (la rencontre du vendredi n'est ni de l'accueil ni de la vente établis). Une fiche Lille Tourism (office) dit « ouvert le vendredi 15h-19h » : contredit le site (15h-18h), écartée, et son numéro (+33 3 68 38 60 06) est le même que celui du site. Pas d'Untappd trouvé. Source rouverte à la main le 29/10. Téléphone non repris : l'outil de contrôle ne peut pas le relire sur la page (format ou balise).

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 4 avenue Pierre Mauroy, 59280 Armentières
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Motte+Cordonnier+Armenti%C3%A8res)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Motte+Cordonnier&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://bieresmottecordonnier.fr)
> - Lu sur [bieresmottecordonnier.fr](https://bieresmottecordonnier.fr) le 29 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 23. Brasserie Tandem — fiche nouvelle

- n : (vide) → Brasserie Tandem
- c : (vide) → Wambrechies
- d : (vide) → 59
- lat : (vide) → 50.68796
- lon : (vide) → 3.0636
- km : (vide) → 571.4
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Le bar-restaurant de la brasserie sert ses bières à la pression, et la boutique vend les bouteilles aux mêmes horaires (site officiel).
- addr : (vide) → 382 rue de Bondues, 59118 Wambrechies
- src : (vide) → https://www.brasserie-tandem.com/bar-boutique/
- coordPrecision : (vide) → address
- beers.0.type : (vide) → ipa
- beers.0.libelle : (vide) → Poule Mouillée (IPA - Other)
- beers.1.type : (vide) → autre
- beers.1.libelle : (vide) → Pas Cap (Belgian Tripel)
- beers.2.type : (vide) → autre
- beers.2.libelle : (vide) → Bonne Pioche (Pale Ale - Other)
- beers.3.type : (vide) → autre
- beers.3.libelle : (vide) → Pin Pon (Farmhouse Ale - Saison)
- beers.4.type : (vide) → ipa
- beers.4.libelle : (vide) → Coup de Soleil (IPA - Imperial / Double)
- beers.5.type : (vide) → ipa
- beers.5.libelle : (vide) → Looping (IPA - Session)
- beers.6.type : (vide) → lager
- beers.6.libelle : (vide) → Prem's (Lager - Pale)
- beers.7.type : (vide) → ipa
- beers.7.libelle : (vide) → Fauteuse de Troubles (IPA - New England / Hazy)
- contact.tel : (vide) → 03 20 31 78 57
- contact.site : (vide) → https://www.brasserie-tandem.com
- contact.source : (vide) → https://www.brasserie-tandem.com/bar-boutique/
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → accueil
- horaires.0.mer : (vide) → 16 h – 23 h
- horaires.0.jeu : (vide) → 16 h – 23 h
- horaires.0.ven : (vide) → 16 h – 23 h
- horaires.0.sam : (vide) → 10 h – 18 h
- horaires.0.remarque : (vide) → Horaires susceptibles d'évoluer lors de privatisations ; la brasserie renvoie à sa fiche Google.
- horaires.0.source : (vide) → https://www.brasserie-tandem.com/bar-boutique/
- horaires.0.verifieLe : (vide) → 2026-10-29
- horaires.1.nature : (vide) → vente
- horaires.1.mer : (vide) → 16 h – 23 h
- horaires.1.jeu : (vide) → 16 h – 23 h
- horaires.1.ven : (vide) → 16 h – 23 h
- horaires.1.sam : (vide) → 10 h – 18 h
- horaires.1.remarque : (vide) → La boutique est ouverte aux mêmes horaires que le restaurant.
- horaires.1.source : (vide) → https://www.brasserie-tandem.com/bar-boutique/
- horaires.1.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.brasserie-tandem.com/bar-boutique/ ; https://data.geopf.fr/geocodage/search?q=382+rue+de+Bondues%2C+59118+Wambrechies&limit=5

Extrait lu : « Nos bières sont disponibles à la vente dans notre bar-restaurant. »

Choix du vérificateur : Lecture via un résumé de la page. Passages lus sur la page bar-boutique : « Du mercredi au vendredi : 16h – 23h », « Le samedi : 10h – 18h », « La boutiques est ouverte aux mêmes horaires que le restaurant. », « A la pression, des bières Tandem bien sûr et nos dernières nouveautés ! », téléphone 03 20 31 78 57 (seul numéro de la page, publié par la brasserie). Vente à emporter et boisson sur place toutes deux établies : pas « sur place seulement ». Untappd : https://untappd.com/BrasserieTandem lu via un résumé (page de la brasserie, Wambrechies, micro brewery) ; les styles des 8 bières viennent de cette page (les 2 autres du top 10, Vive Le Vent et Y'a D'la Joie, écartées car éphémères). Je n'ai pas recopié notes ni avis. Le site officiel ne donne pas le style de la plupart des bières, d'où Untappd. Les liens de produit (pages de chaque bière du menu du site) ne sont pas mis, non ouverts. Source rouverte à la main le 29/10. Lien Untappd non repris : la page source ne le cite pas.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 7 h 02 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 16 h, sous réserve.
> - Adresse
> - 382 rue de Bondues, 59118 Wambrechies
> - Joindre la brasserie
> - [Appeler le 03 20 31 78 57](tel:+33320317857)
> - [Site de la brasserie](https://www.brasserie-tandem.com)
> - Horaires
> - À savoir : Horaires susceptibles d'évoluer lors de privatisations ; la brasserie renvoie à sa fiche Google.
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | 16 h – 23 h
> - Jeudi | 16 h – 23 h
> - Vendredi | 16 h – 23 h
> - Samedi | 10 h – 18 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - À 7 h 02 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 16 h, sous réserve.
> - À savoir : La boutique est ouverte aux mêmes horaires que le restaurant.
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | 16 h – 23 h
> - Jeudi | 16 h – 23 h
> - Vendredi | 16 h – 23 h
> - Samedi | 10 h – 18 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Ses bières
> - Poule Mouillée (IPA - Other) · IPA (non référencé) — très houblonnée, souvent amère
> - Pas Cap (Belgian Tripel) (non référencé)
> - Bonne Pioche (Pale Ale - Other) (non référencé)
> - Pin Pon (Farmhouse Ale - Saison) (non référencé)
> - Coup de Soleil (IPA - Imperial / Double) · IPA (non référencé)
> - Looping (IPA - Session) · IPA (non référencé)
> - Prem's (Lager - Pale) · Lager / Pils (non référencé) — blonde nette et désaltérante
> - Fauteuse de Troubles (IPA - New England / Hazy) · IPA (non référencé)
> - « triple »
> - le plus souvent, une bière forte de tradition belge
> - « pale ale »
> - une bière blonde ou ambrée, houblonnée
> - « saison »
> - une bière de tradition belge, sèche et rafraîchissante
> - [Chercher ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Tandem&type=brewery) (Untappd, une application d’avis sur les bières ; la recherche se fait par le nom de la brasserie)
> - Lu sur [brasserie-tandem.com](https://www.brasserie-tandem.com/bar-boutique/) le 29 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 24. Brique Land (Brique House) — fiche nouvelle

- n : (vide) → Brique Land (Brique House)
- c : (vide) → Saint-André-lez-Lille
- d : (vide) → 59
- lat : (vide) → 50.66115
- lon : (vide) → 3.04022
- km : (vide) → 568.8
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Le site officiel de Brique House présente Brique Land, à Saint-André-lez-Lille, comme une brasserie où l'on boit une bière sur place en mangeant une pizza. Il ne dit ni vente à emporter, ni téléphone, ni lien Untappd. La liste des bières n'a pas été lue.
- addr : (vide) → 27 rue Félix Faure, 59350 Saint-André-lez-Lille
- src : (vide) → https://briquehouse.com/taprooms/brique-land-1
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.site : (vide) → https://briquehouse.com/taprooms/brique-land-1
- contact.source : (vide) → https://briquehouse.com/taprooms/brique-land-1
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → accueil
- horaires.0.lun : (vide) → 17 h – minuit
- horaires.0.mar : (vide) → 17 h – minuit
- horaires.0.mer : (vide) → 17 h – minuit
- horaires.0.jeu : (vide) → 17 h – minuit
- horaires.0.ven : (vide) → 17 h – 0 h 30 (le lendemain)
- horaires.0.sam : (vide) → 12 h – 0 h 30 (le lendemain)
- horaires.0.dim : (vide) → 11 h – 23 h
- horaires.0.remarque : (vide) → Horaires du taproom de Brique Land, tels que la page les affiche.
- horaires.0.source : (vide) → https://briquehouse.com/taprooms/brique-land-1
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://briquehouse.com/taprooms/brique-land-1 ; https://data.geopf.fr/geocodage/search?q=Saint-Andr%C3%A9-lez-Lille&type=municipality&limit=5

Extrait lu : « Brique House est une brasserie où tu peux te poser, boire une bière tout en dégustant une bonne pizza. »

Choix du vérificateur : Page lue via un résumé. Même page, deux autres passages : « Viens vite découvrir nos bières craft directement dans notre brasserie. » et « l'adresse italo-chti à Saint-André-lez-lille pour les amoureux de la pizza napolitaine et de bière artisanale. » Adresse : la page donne « 27 Félix Faure, 59350 Saint-André-lez-Lille » ; le registre SIRENE dit « 70 rue Félix Faure » (Halles de la Filature), j'ai pris la page.  Écarté : le privateaser (annuaire) qui dit « bières brassées sur place » et des horaires de réservation différents ; je n'ai pas pris ses horaires. Autres sites de Brique House (Fretin, Lille HEIN, Villeneuve-d'Ascq, Bordeaux) non retenus : la page des taprooms ne cite pas Fretin et ne donne ni adresse ni horaires pour eux. Untappd : aucune page trouvée (briquehouse.com sans lien, untappd.com/BriqueHouse en 404), donc non proposé. Téléphone : aucun publié sur la page. Confiance faible : la page dit qu'on boit sur place, pas qu'on vend à emporter (réponse de Cédric du 29/10). Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Maintenant
> - À 7 h 02 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 17 h, sous réserve.
> - Adresse
> - 27 rue Félix Faure, 59350 Saint-André-lez-Lille
> - Pas encore dans la fiche : son téléphone et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brique+Land+%28Brique+House%29+Saint-Andr%C3%A9-lez-Lille)[Ses bières sur Untappd](https://untappd.com/search?q=Brique+Land+%28Brique+House%29&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://briquehouse.com/taprooms/brique-land-1)
> - Horaires
> - À savoir : Horaires du taproom de Brique Land, tels que la page les affiche.
> - Horaires d’accueil du public
> - Lundi | 17 h – minuit
> - Mardi | 17 h – minuit
> - Mercredi | 17 h – minuit
> - Jeudi | 17 h – minuit
> - Vendredi | 17 h – 0 h 30 (le lendemain)
> - Samedi | 12 h – 0 h 30 (le lendemain)
> - Dimanche | 11 h – 23 h
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [briquehouse.com](https://briquehouse.com/taprooms/brique-land-1) le 29 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : lisez-la avant d’y aller.

### 25. Brasserie des Lys — fiche nouvelle

- n : (vide) → Brasserie des Lys
- c : (vide) → Roubaix
- d : (vide) → 59
- lat : (vide) → 50.70248
- lon : (vide) → 3.17212
- km : (vide) → 571.2
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Sa taproom sert la dégustation sur place, le jeudi et le vendredi de 17h30 à 19h30, d'après son site. La vente à emporter n'y est pas écrite : catégorie probable, d'où une confiance faible.
- addr : (vide) → 89 rue de Tourcoing, 59100 Roubaix
- src : (vide) → https://www.brasseriedeslys.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://www.brasseriedeslys.fr/
- contact.source : (vide) → https://www.brasseriedeslys.fr/
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → accueil
- horaires.0.jeu : (vide) → 17 h 30 – 19 h 30
- horaires.0.ven : (vide) → 17 h 30 – 19 h 30
- horaires.0.source : (vide) → https://www.brasseriedeslys.fr/
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.brasseriedeslys.fr/ ; https://data.geopf.fr/geocodage/search?q=89+rue+de+Tourcoing%2C+59100+Roubaix&limit=5

Extrait lu : « Venez découvrir notre Taproom, un espace dédié à la dégustation de nos bières directement depuis leur lieu de production. »

Choix du vérificateur : Catégorie 1 en confiance faible, par la réponse de Cédric du 29/10. Aucun téléphone publié. Pas d'Untappd trouvé. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Maintenant
> - À 7 h 02 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 17 h 30.
> - Adresse
> - 89 rue de Tourcoing, 59100 Roubaix
> - Pas encore dans la fiche : son téléphone et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+des+Lys+Roubaix)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+des+Lys&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://www.brasseriedeslys.fr/)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | 17 h 30 – 19 h 30
> - Vendredi | 17 h 30 – 19 h 30
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriedeslys.fr](https://www.brasseriedeslys.fr/) le 29 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : lisez-la avant d’y aller.

### 26. Brasserie de la Villette — fiche nouvelle

- n : (vide) → Brasserie de la Villette
- c : (vide) → Saultain
- d : (vide) → 59
- lat : (vide) → 50.33957
- lon : (vide) → 3.5695
- km : (vide) → 526.2
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → faible
- note : (vide) → La brasserie publie les horaires de sa boutique (« Notre boutique », mardi au samedi) et propose des visites sur demande, avec le samedi matin vers 10h30 comme créneau. Aucune page ne dit en toutes lettres que la bière se vend sur place ni qu'on peut la boire : catégorie probable, à vérifier.
- addr : (vide) → 5 bis avenue Henri Barbusse, 59990 Saultain
- src : (vide) → https://brasserie-delavillette.com/fr/boutique
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 03 27 28 60 92
- contact.site : (vide) → https://brasserie-delavillette.com/
- contact.source : (vide) → https://brasserie-delavillette.com/fr/boutique
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → vente
- horaires.0.mar : (vide) → 9 h 30 – 12 h 30, 15 h – 19 h
- horaires.0.mer : (vide) → 9 h 30 – 12 h 30, 15 h – 19 h
- horaires.0.jeu : (vide) → 9 h 30 – 12 h 30, 15 h – 19 h
- horaires.0.ven : (vide) → 9 h 30 – 12 h 30, 15 h – 19 h
- horaires.0.sam : (vide) → 9 h 30 – 12 h 30, 15 h – 19 h
- horaires.0.source : (vide) → https://brasserie-delavillette.com/fr/boutique
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://brasserie-delavillette.com/fr/boutique ; https://data.geopf.fr/geocodage/search?q=5+bis+avenue+Henri+Barbusse%2C+59990+Saultain&limit=5

Extrait lu : « 09:30-12:30 ; 15:00-19:00 »

Choix du vérificateur : Lecture via un résumé de page. Confiance faible : la page boutique donne horaires, téléphone et gamme (Salix Cervisia, La Châtelaine de La Villette, gamme bio), mais pas de phrase « vente sur place ». Dégustation non citée, donc catégorie 2 et non 1. La page de visite (/fr/brasserie) dit : « nous planifierons une visite qui aura lieu le samedi matin vers 10h30 » ; je ne l'ai pas mise en horaires. Une page boutique distincte propose aussi du click & collect. Le téléphone 03 27 28 60 92 est le seul publié, pour la boutique et pour les réservations de visite. SIRENE donne l'adresse 10 avenue Henri Barbusse ; le site dit 5 bis, retenu (c'est aussi l'adresse de l'OSM `way/1040447470`, candidat du paquet 22, à dédupliquer). Untappd : aucune page trouvée. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement (à vérifier)
> - Maintenant
> - À 7 h 02 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 9 h 30.
> - Adresse
> - 5 bis avenue Henri Barbusse, 59990 Saultain
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+de+la+Villette&type=brewery)
> - Joindre la brasserie
> - [Appeler le 03 27 28 60 92](tel:+33327286092)
> - [Site de la brasserie](https://brasserie-delavillette.com/)
> - Horaires
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | 9 h 30 – 12 h 30, 15 h – 19 h
> - Mercredi | 9 h 30 – 12 h 30, 15 h – 19 h
> - Jeudi | 9 h 30 – 12 h 30, 15 h – 19 h
> - Vendredi | 9 h 30 – 12 h 30, 15 h – 19 h
> - Samedi | 9 h 30 – 12 h 30, 15 h – 19 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserie-delavillette.com](https://brasserie-delavillette.com/fr/boutique) le 29 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 27. Brasserie Bonne Bière BB — fiche nouvelle

- n : (vide) → Brasserie Bonne Bière BB
- c : (vide) → Hérin
- d : (vide) → 59
- lat : (vide) → 50.36208
- lon : (vide) → 3.44533
- km : (vide) → 530.2
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Brasserie de Hérin dont le site officiel parle d'y boire la bière sur place et se présente comme un bar-brasserie. Les bières sont proposées en bouteilles de 33 cl et en fûts de 20 L. Aucune boutique ni vente à emporter n'est clairement écrite : catégorie probable, pas établie. Appeler avant d'y aller. Ouvert du jeudi au samedi, de 16 h à 21 h, d'après le site.
- addr : (vide) → 36 T rue Émile Zola, 59195 Hérin
- src : (vide) → https://www.brasseriebb.com/brasseurs-bieres-locales.php
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 03 66 88 36 16
- contact.site : (vide) → https://www.brasseriebb.com
- contact.source : (vide) → https://www.brasseriebb.com/contact.php
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → accueil
- horaires.0.jeu : (vide) → 16 h – 21 h
- horaires.0.ven : (vide) → 16 h – 21 h
- horaires.0.sam : (vide) → 16 h – 21 h
- horaires.0.source : (vide) → https://www.brasseriebb.com/contact.php
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.brasseriebb.com/brasseurs-bieres-locales.php ; https://www.brasseriebb.com/contact.php ; https://data.geopf.fr/geocodage/search?q=H%C3%A9rin&type=municipality&limit=5

Extrait lu : « lorsque vous viendrez boire votre bière sur place »

Choix du vérificateur : Conf faible volontairement : le site ne décrit pas l'accueil du public et ne parle pas de vente à emporter. Les mots « bar » et « boire sur place » sont vagues. À examiner par Cédric : cat 0 est défendable. Pas d'Untappd trouvé. Les six bières du site (Blonde, Triple B, Grisette, Mine dé Rin noire, Ambrée, BB Brune) ne sont pas mises, faute de lien et de style Untappd. Un seul numéro publié, retenu. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Maintenant
> - À 7 h 02 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 16 h.
> - Adresse
> - 36 T rue Émile Zola, 59195 Hérin
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Bonne+Bi%C3%A8re+BB&type=brewery)
> - Joindre la brasserie
> - [Appeler le 03 66 88 36 16](tel:+33366883616)
> - [Site de la brasserie](https://www.brasseriebb.com)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | 16 h – 21 h
> - Vendredi | 16 h – 21 h
> - Samedi | 16 h – 21 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriebb.com](https://www.brasseriebb.com/brasseurs-bieres-locales.php) le 29 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 28. Brasserie des Lions — fiche nouvelle

- n : (vide) → Brasserie des Lions
- c : (vide) → Roncq
- d : (vide) → 59
- lat : (vide) → 50.74022
- lon : (vide) → 3.11553
- km : (vide) → 576.2
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Le site de la brasserie dit qu'elle dispose d'un bar et d'un espace convivial pour déguster ses bières ; il publie des horaires boutique/bar (vendredi et samedi matin) et une visite avec dégustation le samedi matin. Aucun type de bière précis ni page Untappd vérifiée.
- addr : (vide) → 5 bis Rue Pasteur, 59223 Roncq
- src : (vide) → https://brasseriedeslions.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 37 88 83 76
- contact.site : (vide) → https://brasseriedeslions.fr/
- contact.source : (vide) → https://brasseriedeslions.fr/
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → accueil
- horaires.0.ven : (vide) → 9 h – 12 h, 14 h – 20 h
- horaires.0.sam : (vide) → 9 h – 12 h
- horaires.0.remarque : (vide) → Visite avec dégustation le samedi de 11h à 12h, sur réservation.
- horaires.0.source : (vide) → https://brasseriedeslions.fr/
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://brasseriedeslions.fr/ ; https://data.geopf.fr/geocodage/search?q=5+bis+Rue+Pasteur%2C+59223+Roncq&limit=5

Extrait lu : « elle dispose d'un bar et d'un espace convivial pour déguster nos bières. »

Choix du vérificateur : Seul téléphone publié par la brasserie : un mobile (06 37 88 83 76), retenu pour cette raison. La page Untappd trouvée par la recherche (untappd.com/BrasserieDuLion) est celle de « Brasserie Lion » à Nivelles, en Belgique : écartée. Une gamme est décrite (« deux gammes de bières traditionnelles des Hauts de France ») sans style, donc aucun type de bière proposé. Les horaires sont intitulés « Horaires boutique/bar », d'où la nature « accueil ». La visite du samedi 11h-12h sur réservation est dite dans remarque. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 7 h 02 (heure de Paris), accueil du public : la source ne dit pas les heures de ce jour.
> - Adresse
> - 5 bis Rue Pasteur, 59223 Roncq
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+des+Lions&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 37 88 83 76](tel:+33637888376)
> - [Site de la brasserie](https://brasseriedeslions.fr/)
> - Horaires
> - À savoir : Visite avec dégustation le samedi de 11h à 12h, sur réservation.
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | non précisé
> - Vendredi | 9 h – 12 h, 14 h – 20 h
> - Samedi | 9 h – 12 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriedeslions.fr](https://brasseriedeslions.fr/) le 29 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 29. Brasserie du Gorguechon — fiche nouvelle

- n : (vide) → Brasserie du Gorguechon
- c : (vide) → Moncheaux
- d : (vide) → 59
- lat : (vide) → 50.45328
- lon : (vide) → 3.07855
- km : (vide) → 545.7
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → solide
- note : (vide) → Boutique de la brasserie ouverte jeudi, vendredi et samedi matin ; bières bio vendues sur place. Visites sur réservation (samedi après-midi, groupes de 5 à 10).
- addr : (vide) → 46 rue de Lestrez, 59283 Moncheaux
- src : (vide) → https://brasseriedugorguechon.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 03 27 86 34 01
- contact.source : (vide) → https://brasseriedugorguechon.fr/
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → vente
- horaires.0.jeu : (vide) → 14 h – 19 h
- horaires.0.ven : (vide) → 14 h – 19 h
- horaires.0.sam : (vide) → 9 h – 13 h
- horaires.0.source : (vide) → https://brasseriedugorguechon.fr/
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://brasseriedugorguechon.fr/ ; https://data.geopf.fr/geocodage/search?q=46+rue+de+Lestrez%2C+59283+Moncheaux&limit=5

Extrait lu : « Directement du producteur au consommateur, nos bières bio sont disponibles dans notre boutique »

Choix du vérificateur : Site officiel lu directement via WebFetch (page d'accueil, puis une page de visites et contact qui donne le même téléphone et les mêmes horaires ; son URL exacte n'a pas pu être confirmée, d'où source = accueil). Catégorie 2 : la vente en boutique est écrite, la consommation sur place n'est écrite nulle part (visites payantes sur réservation, sans mention de dégustation). Un seul numéro publié, 03 27 86 34 01, fixe. Types lus : « Plutôt Blonde, Triple ou encore Ambrée ? », laissés hors de beers faute de fiche détaillée par bière. Pas de lien Untappd sur le site ni trouvé en recherche, donc non proposé. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 7 h 02 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 14 h.
> - Adresse
> - 46 rue de Lestrez, 59283 Moncheaux
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+du+Gorguechon&type=brewery)
> - Joindre la brasserie
> - [Appeler le 03 27 86 34 01](tel:+33327863401)
> - Horaires
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | 14 h – 19 h
> - Vendredi | 14 h – 19 h
> - Samedi | 9 h – 13 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriedugorguechon.fr](https://brasseriedugorguechon.fr/) le 29 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 30. Brasserie de Vaucelles — fiche nouvelle

- n : (vide) → Brasserie de Vaucelles
- c : (vide) → Les Rues-des-Vignes
- d : (vide) → 59
- lat : (vide) → 50.08897
- lon : (vide) → 3.2255
- km : (vide) → 503.9
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Le site officiel présente un taproom où l'on déguste les bières, et une boutique où l'on repart avec bières et packs. Les horaires changent selon la saison (automne-hiver, printemps-été) sans dates de bascule écrites : à lire sur la page.
- addr : (vide) → Hameau de Vaucelles, 59258 Les Rues-des-Vignes
- src : (vide) → https://www.brasseriedevaucelles.fr/taproom
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.site : (vide) → https://www.brasseriedevaucelles.fr
- contact.source : (vide) → https://www.brasseriedevaucelles.fr/taproom
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.brasseriedevaucelles.fr/taproom ; https://data.geopf.fr/geocodage/search?q=Les+Rues-des-Vignes&type=municipality&limit=5

Extrait lu : « Dégustez nos bières dans notre Taproom, en plein coeur de la brasserie »

Choix du vérificateur : Seconde phrase de la même page, qui établit la vente : « vous pouvez repartir avec nos bières ou nos packs disponibles à la boutique ». Horaires non proposés : la page donne un bloc « Automne-Hiver » et un bloc « Printemps-Eté » sans dates de bascule (le schéma exige une période pour deux blocs de même nature), et la page /contact diffère de /taproom (dimanche 16h-19h absent d'automne-hiver). Pas de téléphone publié (seulement contact@brasseriedevaucelles.fr). Pas d'Untappd trouvé, d'où des bières vides ; noms lus sur le site : Abbaye de Vaucelles et Cocotte, sans style. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - Hameau de Vaucelles, 59258 Les Rues-des-Vignes
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+de+Vaucelles+Les+Rues-des-Vignes)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+de+Vaucelles&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://www.brasseriedevaucelles.fr)
> - Lu sur [brasseriedevaucelles.fr](https://www.brasseriedevaucelles.fr/taproom) le 29 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 31. Brasserie d'Amblise — fiche nouvelle

- n : (vide) → Brasserie d'Amblise
- c : (vide) → Crespin
- d : (vide) → 59
- lat : (vide) → 50.42194
- lon : (vide) → 3.66511
- km : (vide) → 534
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Le site officiel annonce « Visite, dégustation et vente à emporter » et le slogan « Bière d'artisan Brassée ici, bue ici ! ». Ouvert le vendredi de 16h à 19h et le samedi de 11h à 19h, sauf cas exceptionnel ; rendez-vous hors horaires sur demande. Le site ne décrit pas précisément la consommation sur place, d'où une confiance moyenne.
- addr : (vide) → 42 rue du Moulin, 59154 Crespin
- src : (vide) → https://brasseriedamblise.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 16 96 88 00
- contact.site : (vide) → https://brasseriedamblise.fr/
- contact.source : (vide) → https://brasseriedamblise.fr/contact/
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → accueil
- horaires.0.ven : (vide) → 16 h – 19 h
- horaires.0.sam : (vide) → 11 h – 19 h
- horaires.0.remarque : (vide) → Sauf cas exceptionnel ; rendez-vous possible hors horaires sur demande.
- horaires.0.source : (vide) → https://brasseriedamblise.fr/contact/
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://brasseriedamblise.fr/ ; https://brasseriedamblise.fr/contact/ ; https://data.geopf.fr/geocodage/search?q=42+rue+du+Moulin%2C+59154+Crespin&limit=5

Extrait lu : « Visite, dégustation et vente à emporter »

Choix du vérificateur : Téléphone : 06 16 96 88 00 est un mobile, mais c'est la seule ligne publiée par la brasserie sur sa page contact (règle du 21/10). Rien trouvé sur une page Untappd de la brasserie. La page contact a été lue via un résumé qui a refusé de recopier tout le texte : la phrase « Bière d'artisan Brassée ici, bue ici ! » et les horaires sont rapportés par ce résumé, pas vus mot à mot. L'extrait choisi vient de la page d'accueil. À revérifier avant d'appliquer. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 7 h 02 (heure de Paris), accueil du public : la source ne dit pas les heures de ce jour.
> - Adresse
> - 42 rue du Moulin, 59154 Crespin
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+d%27Amblise&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 16 96 88 00](tel:+33616968800)
> - [Site de la brasserie](https://brasseriedamblise.fr/)
> - Horaires
> - À savoir : Sauf cas exceptionnel ; rendez-vous possible hors horaires sur demande.
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | non précisé
> - Vendredi | 16 h – 19 h
> - Samedi | 11 h – 19 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriedamblise.fr](https://brasseriedamblise.fr/) le 29 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 32. Brasserie Fives Cail — fiche nouvelle

- n : (vide) → Brasserie Fives Cail
- c : (vide) → Lille
- d : (vide) → 59
- lat : (vide) → 50.62759
- lon : (vide) → 3.09191
- km : (vide) → 564.4
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Le site de la brasserie dit que les bières sont brassées sur place et la présente comme brasserie artisanale et bar ; il publie ses horaires d'ouverture et indique la bière disponible en bouteille et en fût. Le site ne mentionne pas de page Untappd.
- addr : (vide) → 22 place des Ouvriers, 59800 Lille
- src : (vide) → https://www.brasseriefivescail.com
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 09 74 64 13 05
- contact.site : (vide) → https://www.brasseriefivescail.com
- contact.source : (vide) → https://www.brasseriefivescail.com
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → accueil
- horaires.0.lun : (vide) → 17 h – 23 h
- horaires.0.mar : (vide) → 17 h – minuit
- horaires.0.mer : (vide) → 17 h – minuit
- horaires.0.jeu : (vide) → 16 h – 1 h (le lendemain)
- horaires.0.ven : (vide) → 16 h – 1 h (le lendemain)
- horaires.0.sam : (vide) → 16 h – 1 h (le lendemain)
- horaires.0.dim : (vide) → 16 h – 23 h
- horaires.0.source : (vide) → https://www.brasseriefivescail.com
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.brasseriefivescail.com ; https://data.geopf.fr/geocodage/search?q=22+place+des+Ouvriers%2C+59800+Lille&limit=5

Extrait lu : « Bien plus qu'un simple bar, c'est un lieu de vie de quartier où l'on brasse, où l'on partage et où l'on se retrouve. »

Choix du vérificateur : Lecture du site officiel via un résumé (WebFetch), deux passages successifs ; les citations viennent de ce résumé, à recontrôler à l'ouverture. Téléphone retenu : 09 74 64 13 05, seul numéro publié sur le site. Horaires du site : lun 17h-23h, mar-mer 17h-0h, jeu-sam 16h-1h, dim 16h-23h (cuisine 18h-22h, hors horaires d'accueil). La page ne parle pas de vente à emporter : cat 1 repose sur le bar et « Disponible en bouteille et en fût ». Adresse du site sans code postal ; 59800 vient de SIRENE. La page HelloLille donne une autre adresse (Halle G1, Cours Jean-François Cail) ; non retenue. Aucune page Untappd trouvée. Source rouverte à la main le 29/10. Confiance faible : la source dit qu'on boit sur place, pas qu'on vend à emporter (réponse de Cédric du 29/10, relecture de la persona).

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Maintenant
> - À 7 h 02 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 16 h.
> - Adresse
> - 22 place des Ouvriers, 59800 Lille
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Fives+Cail&type=brewery)
> - Joindre la brasserie
> - [Appeler le 09 74 64 13 05](tel:+33974641305)
> - [Site de la brasserie](https://www.brasseriefivescail.com)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | 17 h – 23 h
> - Mardi | 17 h – minuit
> - Mercredi | 17 h – minuit
> - Jeudi | 16 h – 1 h (le lendemain)
> - Vendredi | 16 h – 1 h (le lendemain)
> - Samedi | 16 h – 1 h (le lendemain)
> - Dimanche | 16 h – 23 h
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriefivescail.com](https://www.brasseriefivescail.com) le 29 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 33. Brasserie Brewbaix — fiche nouvelle

- n : (vide) → Brasserie Brewbaix
- c : (vide) → Roubaix
- d : (vide) → 59
- lat : (vide) → 50.69031
- lon : (vide) → 3.172
- km : (vide) → 569.9
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Le site officiel présente la taproom (dégustation sur place, « rester discuter ») et la possibilité de repartir avec des bouteilles. La page taproom précise que les références sont disponibles au frais et que les visites/dégustations de groupe se font sur réservation. Horaires publiés : mercredi-jeudi 17h-21h, vendredi 17h-20h.
- addr : (vide) → 26 rue des Fabricants, 59100 Roubaix
- src : (vide) → https://www.brewbaix.com
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 79 82 87 95
- contact.site : (vide) → https://www.brewbaix.com
- contact.source : (vide) → https://www.brewbaix.com
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → accueil
- horaires.0.mer : (vide) → 17 h – 21 h
- horaires.0.jeu : (vide) → 17 h – 21 h
- horaires.0.ven : (vide) → 17 h – 20 h
- horaires.0.source : (vide) → https://www.brewbaix.com/taproom/
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.brewbaix.com ; https://www.brewbaix.com/taproom/ ; https://data.geopf.fr/geocodage/search?q=26+rue+des+Fabricants%2C+59100+Roubaix&limit=5

Extrait lu : « repartir avec quelques bouteilles ou rester discuter. »

Choix du vérificateur : Téléphone 06 79 82 87 95 : un portable, seule ligne publiée sur le site de la brasserie, retenu par la règle du 21/10. DOUBLON À SIGNALER : la ligne sirene:850553710 (« BREWBAIX, COLLECTIF DES MICRO-BRASSEURS ROUBAISIENS », 47 rue du Luxembourg) est probablement la même brasserie, à traiter avec cette fiche (elle est dans un autre paquet). La page taproom, qui porte les horaires, n'a pas été relue en pleine page. Untappd : non trouvé, rien proposé. Pas de bières proposées : le site cite deux gammes (Brewbaix et Brebis Galeuse) et des styles génériques (sours, NEIPA, stouts), sans page Untappd. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 7 h 02 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 17 h.
> - Adresse
> - 26 rue des Fabricants, 59100 Roubaix
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Brewbaix&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 79 82 87 95](tel:+33679828795)
> - [Site de la brasserie](https://www.brewbaix.com)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | 17 h – 21 h
> - Jeudi | 17 h – 21 h
> - Vendredi | 17 h – 20 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brewbaix.com](https://www.brewbaix.com) le 29 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 34. Aux Enfants Terribles — fiche nouvelle

- n : (vide) → Aux Enfants Terribles
- c : (vide) → Marquette-lez-Lille
- d : (vide) → 59
- lat : (vide) → 50.67986
- lon : (vide) → 3.07468
- km : (vide) → 570.3
- cat : (vide) → 4 (Consommer sur place seulement)
- conf : (vide) → moyenne
- note : (vide) → Brasserie intégrée au lieu : son site dit que ses cuvées sont « servies exclusivement sur place » ; on les boit au bar, sans vente à emporter.
- addr : (vide) → 14 chemin de Wervicq, 59520 Marquette-lez-Lille
- src : (vide) → https://auxenfantsterribles.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://auxenfantsterribles.fr
- contact.source : (vide) → https://auxenfantsterribles.fr
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://auxenfantsterribles.fr ; https://data.geopf.fr/geocodage/search?q=14+chemin+de+Wervicq%2C+59520+Marquette-lez-Lille&limit=5

Extrait lu : « des cuvées pleines de caractère et servies exclusivement sur place. »

Choix du vérificateur : Catégorie 4 « Consommer sur place seulement » (S368) : le site dit « servies exclusivement sur place » et ne propose aucune vente à emporter. Horaires du lieu entier non repris. Aucun téléphone sur la page. Site relu à la main le 29/10. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 07:02, heure de Paris) :

> - Ce qu’on peut y faire
> - Consommer sur place seulement
> - Adresse
> - 14 chemin de Wervicq, 59520 Marquette-lez-Lille
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Aux+Enfants+Terribles+Marquette-lez-Lille)[Ses bières sur Untappd](https://untappd.com/search?q=Aux+Enfants+Terribles&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://auxenfantsterribles.fr)
> - Lu sur [auxenfantsterribles.fr](https://auxenfantsterribles.fr) le 29 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

Empreinte du lot : 86e9b70c9255
