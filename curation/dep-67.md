# Lot dep-67 — le Bas-Rhin (S346)

Ce lot ajoute **24 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 79 candidats = 24 proposés + 55 non proposés (tableau ci-dessous).
Catégories proposées : 6 « acheter et consommer », 11 « acheter seulement », 0 « pas de vente », 7 « à confirmer », 0 « consommer sur place seulement ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| STAMMTISCH METEOR (`sirene:598500643`) | Météor (ce SIREN, sept établissements) : aucun établissement lu comme lieu ouvert ; la brasserie de Hochfelden est lue sous node/3419542697 |
| HEINEKEN ENTREPRISE (`sirene:414842062`) | Heineken Schiltigheim : aucune page de visite ni de vente lue |
| KRONENBOURG SUPPLY COMPANY (`sirene:528365125`) | Kronenbourg Supply Company : entité logistique d'un groupe ; aucune page officielle de visite ni de vente |
| BRASSERIE PITSTOP (`sirene:980787139`) | Pitstop : rien sous ce nom (deux recherches), existence non établie |
| Entreprise individuelle (`personne:1`) | entreprise sans nom ni adresse : rien à chercher |
| LA PETITE BRASSERIE (`sirene:898369616`) | La Petite Brasserie (Benfeld) : rien sous ce nom ; le registre la classe en restauration |
| BOLDBREW (`sirene:820503050`) | Boldbrew : rien sous ce nom (quatre recherches), existence non établie |
| SKILDEN (`sirene:901332098`) | Skilden : rien sous ce nom (trois recherches), existence non établie |
| BRASSERIE STORIG (`sirene:492936661`) | Storig : annuaires et presse seuls ; le site officiel redirige vers schutzenberger.com, qui ne dit rien de la brasserie |
| Entreprise individuelle (`personne:2`) | entreprise sans nom ni adresse : rien à chercher |
| MICRO BRASSERIE CRYM (`sirene:927793083`) | Crym : annuaire d'entreprises seul |
| Entreprise individuelle (`personne:3`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE DE SCHILICK (`sirene:939273900`) | Brasserie de Schilick : aucune source sous ce nom ; probablement une marque de Storig |
| LA BRASSERIE DES POULES (`sirene:838802684`) | Brasserie des Poules : rien sous ce nom (deux recherches) |
| BRASSERIE L'OURS (`sirene:979769791`) | Brasserie L'Ours : l'adresse est celle de Perle, lue sous sa propre clé ; rien sous ce nom |
| Entreprise individuelle (`personne:4`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE DU CHAT ROND (`sirene:851616383`) | Brasserie du Chat Rond : rien sous ce nom ; la seule brasserie de Matzenheim est Matten, lue sous sa propre clé |
| Entreprise individuelle (`personne:5`) | entreprise sans nom ni adresse : rien à chercher |
| GRANDE BRASSERIE PATRIE SCHUTZENBERGER (`sirene:558503827`) | Patrie Schutzenberger : faillite en 2006, aucune brasserie ouverte à cette adresse |
| BRASSERIE LE REFUGE (`sirene:889080693`) | Le Refuge (Haguenau) : le site répond 403 à la lecture, annuaires seuls : à relancer |
| Entreprise individuelle (`personne:6`) | entreprise sans nom ni adresse : rien à chercher |
| BAM (`sirene:910012418`) | BAM (Haguenau) : rien ne relie ce nom à la brasserie de l'Ermitage ; sources contradictoires |
| BRASSERIE LA NARCOSE (`sirene:813137551`) | La Narcose : le site refuse la lecture automatique (429) : à relancer |
| BRASSERIE ELLIPSYS (`sirene:899753073`) | Ellipsys : annuaire (Schlouk Map) et agenda seuls, sans site ni Untappd ni office |
| BRASSERIE LOBSANN (`sirene:498226331`) | Brasserie Lobsann : rien sous ce nom (deux recherches) |
| GOLWOS (`sirene:994374155`) | Golwos : rien sous ce nom (deux recherches) |
| BRASSERIE LA HOUBLONNIERE (`sirene:901427914`) | La Houblonnière : la page de l'office (visit.alsace) répond en erreur 500 : à relancer |
| BRASSERIE D'UBERACH (`sirene:422473710`) | même lieu que node/12222676725 (Brasserie Uberach, Val-de-Moder), lue sous cette clé |
| Entreprise individuelle (`personne:8`) | entreprise sans nom ni adresse : rien à chercher |
| LES BRASSEURS DU BRUCH (`sirene:797477213`) | Les Brasseurs du Bruch : association connue d'un annuaire d'entreprises seul |
| Entreprise individuelle (`personne:9`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE CHAUVE QUI BRASSE (`sirene:903739860`) | Chauve qui brasse : rien sous ce nom (deux recherches) |
| BRASSERIE BLESSING (`sirene:800598898`) | Brasserie Blessing : annuaire (Gault&Millau) et salons seuls, pas de site officiel trouvé |
| Entreprise individuelle (`personne:10`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:11`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:12`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:13`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:14`) | entreprise sans nom ni adresse : rien à chercher |
| CRITERION (`sirene:419261169`) | Criterion (Saales) : rien sous ce nom ; un restaurant à cette adresse |
| RESTAURANT LAUTH ET FILS (`sirene:330894106`) | Restaurant Lauth et fils : microbrasserie connue de la presse seule (2014-2022), état actuel non établi |
| BRASSERIE DE SAINT-PIERRE (`sirene:334926086`) | Saint-Pierre : le site de la brasserie ne se laisse pas lire depuis la session (connexion refusée) : à relancer |
| BRASSERIE ARTISANALE ALSACIENNE DE LA ZORN (`sirene:942875105`) | Brasserie de la Zorn : association connue du registre seul |
| ASSOCIATION DES BRASSEURS ET BIEROLOGUES AMATEURS DE KINTZHEIM ET ENVIRONS (`sirene:829236587`) | Association de brasseurs amateurs de Kintzheim : pas un lieu ouvert au public |
| Entreprise individuelle (`personne:16`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE 3 MATS (`sirene:818823239`) | Brasserie 3 Mâts : existe (Untappd), mais son site ne se laisse pas lire : à relancer |
| BRASSERIE ROHMER (`sirene:977628007`) | Brasserie Rohmer : annuaire d'entreprises seul |
| Micro Brasserie (`node/12734070223`) | « Micro Brasserie » (Strasbourg) : aucun établissement de ce nom |
| Brasserie du Coin (`node/13874565227`) | Brasserie du Coin (Saverne) : un restaurant de ce nom, rien n'indique qu'il brasse |
| Matten (`node/3195474124`) | Matten (Sand) : le site place la brasserie à Matzenheim, lue sous sirene:515060317 |
| Météor (`node/3419542697`) | Météor : le site de la brasserie ne se laisse pas lire depuis la session (connexion refusée) : à relancer |
| Overground Brewing (`node/3771834276`) | Overground Brewing : Instagram et Privateaser seuls, pas de site officiel |
| Bières artisanales Artzner (`node/4546174323`) | Artzner : marque de la brasserie Perle, lue sous sirene:513083147 |
| Chez Georges (`way/179126442`) | Chez Georges : restaurant, pas une brasserie |
| Bio Brasseurs (`way/48806975`) | Bio Brasseurs : annuaire seul, qui la donne fermée |
| Brasserie des Châteaux (`way/797236212`) | Brasserie des Châteaux : restaurant, pas une brasserie |

## Les fiches proposées

## Lot dep-67 — 0 proposition(s), 24 fiche(s) nouvelle(s)

### 1. Brasserie Uberach — fiche nouvelle

- n : (vide) → Brasserie Uberach
- c : (vide) → Val-de-Moder
- d : (vide) → 67
- lat : (vide) → 48.84036
- lon : (vide) → 7.61337
- km : (vide) → 412.8
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → faible
- note : (vide) → Brasserie de Val de Moder. Boutique ouverte du lundi au vendredi ; visites avec dégustation l'été et sur rendez-vous.
- addr : (vide) → 5 rue du Cerf
- src : (vide) → https://www.brasserie-uberach.fr/?page=visiter
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 03 88 07 07 77
- contact.site : (vide) → https://www.brasserie-uberach.fr/
- contact.source : (vide) → https://www.brasserie-uberach.fr/?page=contact
- contact.verifieLe : (vide) → 2026-11-03
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 8 h 30 – 12 h, 13 h – 17 h 30
- horaires.0.mar : (vide) → 8 h 30 – 12 h, 13 h – 17 h 30
- horaires.0.mer : (vide) → 8 h 30 – 12 h, 13 h – 17 h 30
- horaires.0.jeu : (vide) → 8 h 30 – 12 h, 13 h – 17 h 30
- horaires.0.ven : (vide) → 8 h 30 – 12 h, 13 h – 17 h 30
- horaires.0.remarque : (vide) → Visites avec dégustation : jeudi et vendredi à 10h30 et 16h00 en juillet-août ; toute l'année sur rendez-vous.
- horaires.0.source : (vide) → https://www.brasserie-uberach.fr/?page=visiter
- horaires.0.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://www.brasserie-uberach.fr/?page=visiter ; https://www.brasserie-uberach.fr/?page=contact ; https://data.geopf.fr/geocodage/search?q=Val-de-Moder&type=municipality&limit=5

Extrait lu : « Horaires d'ouverture de la boutique, du lundi au vendredi de 8h30 à 12h00 et de 13h00 à 17h30. »

Choix du vérificateur : Catégorie 2 en confiance faible : la page ne dit pas noir sur blanc quels produits la boutique vend. La dégustation fait partie de la visite payante, ce qui ne prouve pas qu'on puisse boire sur place en dehors d'elle. Téléphone 03 88 07 07 77 : le numéro du contact, également donné pour les groupes. Les horaires de visite, juillet-août le jeudi et le vendredi à 10h30 et 16h00 et le reste de l'année sur rendez-vous, vont dans la remarque de la fiche.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement (à vérifier)
> - Maintenant
> - À 12 h 39 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 13 h, sous réserve.
> - Adresse
> - 5 rue du Cerf
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Uberach&type=brewery)
> - Joindre la brasserie
> - [Appeler le 03 88 07 07 77](tel:+33388070777)
> - [Site de la brasserie](https://www.brasserie-uberach.fr/)
> - Horaires
> - À savoir : Visites avec dégustation : jeudi et vendredi à 10h30 et 16h00 en juillet-août ; toute l'année sur rendez-vous.
> - Horaires de vente
> - Lundi | 8 h 30 – 12 h, 13 h – 17 h 30
> - Mardi | 8 h 30 – 12 h, 13 h – 17 h 30
> - Mercredi | 8 h 30 – 12 h, 13 h – 17 h 30
> - Jeudi | 8 h 30 – 12 h, 13 h – 17 h 30
> - Vendredi | 8 h 30 – 12 h, 13 h – 17 h 30
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserie-uberach.fr](https://www.brasserie-uberach.fr/?page=visiter) le 3 novembre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 2. Brasserie La Pastel — fiche nouvelle

- n : (vide) → Brasserie La Pastel
- c : (vide) → Dossenheim-sur-Zinsel
- d : (vide) → 67
- lat : (vide) → 48.80997
- lon : (vide) → 7.40623
- km : (vide) → 402
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie artisanale (bières traditionnelles, fruitées, au pain), site officiel à la même adresse. Le site ne dit pas qu'on peut acheter sur place : commande auprès du brasseur ou points de vente habituels. Visites sur rendez-vous.
- addr : (vide) → 11 rue du Printemps 67330 Dossenheim-sur-Zinsel
- src : (vide) → https://bierelapastel.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 08 05 18 30
- contact.site : (vide) → https://bierelapastel.fr
- contact.source : (vide) → https://bierelapastel.fr
- contact.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://bierelapastel.fr ; https://data.geopf.fr/geocodage/search?q=11+rue+du+Printemps+67330+Dossenheim-sur-Zinsel&limit=5

Extrait lu : « passer commande auprès de votre brasseur »

Choix du vérificateur : Site officiel bierelapastel.fr lu via un résumé. L'adresse (11 rue du printemps, Dossenheim-sur-Zinsel) y est la même que sur la fiche de l'office de tourisme de Hanau-La Petite Pierre (visite du 24/10/2026, terminée). Gault&Millau donne une autre adresse (Geiswiller-Zœbersdorf), non retenue. Le seul numéro publié est un mobile (06 08 05 18 30), repris car c'est la seule ligne de la brasserie. Horaire « le soir en semaine de 19h à 20h » non repris : le résumé ne dit pas à quoi il s'applique. Pas de page Untappd trouvée.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 11 rue du Printemps 67330 Dossenheim-sur-Zinsel
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+La+Pastel+Dossenheim-sur-Zinsel)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+La+Pastel&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 08 05 18 30](tel:+33608051830)
> - [Site de la brasserie](https://bierelapastel.fr)
> - Lu sur [bierelapastel.fr](https://bierelapastel.fr) le 3 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 3. L'Altenbière — fiche nouvelle

- n : (vide) → L'Altenbière
- c : (vide) → Dorlisheim
- d : (vide) → 67
- lat : (vide) → 48.52441
- lon : (vide) → 7.47494
- km : (vide) → 377.9
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Micro-brasserie : vente à emporter aux heures d'ouverture, consommation d'alcool sur place non permise, d'après la fiche de l'office de tourisme de Molsheim-Mutzig. L'office de tourisme écrit les heures de vente à l'anglaise (« Thu-Fri 4-7pm, Sa 9 am-12 pm ») : jeudi et vendredi de 16 h à 19 h, samedi de 9 h à midi ; le contrôle ne relit pas cette écriture, elles restent dans cette note.
- addr : (vide) → 21 rue de l'Altenberg, 67120 Dorlisheim
- src : (vide) → https://ot-molsheim-mutzig.com/en/fiche-sit/F218008992_micro-brasserie-laltenbiere-dorlisheim-en
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://ot-molsheim-mutzig.com/en/fiche-sit/F218008992_micro-brasserie-laltenbiere-dorlisheim-en ; https://data.geopf.fr/geocodage/search?q=21+rue+de+l%27Altenberg%2C+67120+Dorlisheim&limit=5

Extrait lu : « On-site consumption of alcohol is not permitted. »

Choix du vérificateur : Téléphone non retenu : 06 15 97 27 07 est un mobile lu sur l'office, rien ne dit que la brasserie le publie elle-même. Site altenbiere.fr (lié depuis l'office) renvoyé en 503 à deux reprises, donc non repris. Pas de page Untappd trouvée. Une autre fiche d'office (Pays de Barr, vue seulement dans un résumé de recherche) donne les mêmes horaires.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - 21 rue de l'Altenberg, 67120 Dorlisheim
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=L%27Altenbi%C3%A8re+Dorlisheim)[Ses bières sur Untappd](https://untappd.com/search?q=L%27Altenbi%C3%A8re&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [ot-molsheim-mutzig.com](https://ot-molsheim-mutzig.com/en/fiche-sit/F218008992_micro-brasserie-laltenbiere-dorlisheim-en) le 3 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 4. Brasserie Licorne — fiche nouvelle

- n : (vide) → Brasserie Licorne
- c : (vide) → Saverne
- d : (vide) → 67
- lat : (vide) → 48.74113
- lon : (vide) → 7.379
- km : (vide) → 394.4
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → La brasserie existe (site officiel, siège à Saverne, logistique à Steinbourg). Aucune vente ni accueil sur place n'est établi : le site renvoie vers « Où acheter ? » et ne donne ni boutique, ni visite, ni horaires.
- addr : (vide) → 60 rue de Dettwiller, 67700 Saverne
- src : (vide) → https://brasserielicorne.com/brasserie-licorne/contact/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 03 88 02 19 99
- contact.site : (vide) → https://www.brasserielicorne.com/
- contact.source : (vide) → https://brasserielicorne.com/brasserie-licorne/contact/
- contact.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://brasserielicorne.com/brasserie-licorne/contact/ ; https://data.geopf.fr/geocodage/search?q=60+rue+de+Dettwiller%2C+67700+Saverne&limit=5

Extrait lu : « BRASSERIE LICORNE 60 rue de Dettwiller CS40019 67700 SAVERNE »

Choix du vérificateur : Le 03 88 02 19 99 est celui de la page contact officielle, la même pour le siège, la livraison professionnelle et la logistique. Je le retiens faute d'autre ligne ; Cédric peut l'écarter, car il s'adresse peut-être plus aux professionnels qu'aux clients. Le site dit « Nous vous ouvrons les portes de notre brasserie » (rubrique magazine), sans aucun détail : je n'en tire pas de catégorie. Steinbourg est une adresse de logistique, pas un lieu d'accueil.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 60 rue de Dettwiller, 67700 Saverne
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Licorne+Saverne)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Licorne&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 03 88 02 19 99](tel:+33388021999)
> - [Site de la brasserie](https://www.brasserielicorne.com/)
> - Lu sur [brasserielicorne.com](https://brasserielicorne.com/brasserie-licorne/contact/) le 3 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 5. Brasserie l'Abreuvoir — fiche nouvelle

- n : (vide) → Brasserie l'Abreuvoir
- c : (vide) → Breitenbach
- d : (vide) → 67
- lat : (vide) → 48.36418
- lon : (vide) → 7.28774
- km : (vide) → 355.4
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Petite brasserie associative. Vente directe à la brasserie environ un samedi matin sur deux, sans jours précis publiés : suivre la newsletter ou le site avant de venir.
- addr : (vide) → 21 rue du Mont Sainte-Odile, 67220 Breitenbach
- src : (vide) → https://www.brasserie-abreuvoir.com/trouver-nos-bieres/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://www.brasserie-abreuvoir.com/
- contact.source : (vide) → https://www.brasserie-abreuvoir.com/trouver-nos-bieres/
- contact.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://www.brasserie-abreuvoir.com/trouver-nos-bieres/ ; https://data.geopf.fr/geocodage/search?q=21+rue+du+Mont+Sainte-Odile%2C+67220+Breitenbach&limit=5

Extrait lu : « Rendez-vous directement à la brasserie, nous sommes présents un samedi matin sur 2 en moyenne. »

Choix du vérificateur : Site officiel lu via un résumé (passage cité tel que rendu entre guillemets). Aucun téléphone publié par la brasserie : le mobile du lien d'appel Gault&Millau n'est pas retenu (annuaire). Types de bière : la page « Des bières » n'en nomme aucun ; Gault&Millau cite blonde, blanche, ambrée, brune, mais annuaire seul, non retenu. Pas de dégustation sur place mentionnée, donc pas de catégorie 1. Pas d'horaires : « un samedi matin sur 2 en moyenne » n'est pas un créneau.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - 21 rue du Mont Sainte-Odile, 67220 Breitenbach
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+l%27Abreuvoir+Breitenbach)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+l%27Abreuvoir&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://www.brasserie-abreuvoir.com/)
> - Lu sur [brasserie-abreuvoir.com](https://www.brasserie-abreuvoir.com/trouver-nos-bieres/) le 3 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 6. Brasserie Perle — fiche nouvelle

- n : (vide) → Brasserie Perle
- c : (vide) → Strasbourg
- d : (vide) → 67
- lat : (vide) → 48.59944
- lon : (vide) → 7.73498
- km : (vide) → 395.7
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Site officiel : bierstub, biergarten et boutique, bières à emporter. Lu via un résumé de la page, d'où la confiance moyenne.
- addr : (vide) → 10 place de l'Abattoir 67200 Strasbourg
- src : (vide) → https://www.biere-perle.com/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 03 69 25 77 68
- contact.site : (vide) → https://www.biere-perle.com/
- contact.source : (vide) → https://www.biere-perle.com/
- contact.verifieLe : (vide) → 2026-11-03
- horaires.0.nature : (vide) → accueil
- horaires.0.mer : (vide) → 17 h – 23 h
- horaires.0.jeu : (vide) → 17 h – 23 h
- horaires.0.ven : (vide) → 16 h – 23 h
- horaires.0.sam : (vide) → 10 h – 23 h
- horaires.0.source : (vide) → https://www.biere-perle.com/
- horaires.0.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://www.biere-perle.com/ ; https://data.geopf.fr/geocodage/search?q=10+place+de+l%27Abattoir+67200+Strasbourg&limit=5

Extrait lu : « BIERSTUB, BIERGARTEN & BOUTIQUE »

Choix du vérificateur : Page lue via un résumé. La page cite aussi « NOS BIÈRES À EMPORTER » et « Click & Collect ». Aucun style de bière n'est donné, donc beers vide. Horaires : je ne sais pas si les créneaux lus sont ceux de la boutique ou du bierstub, je les ai mis en accueil ; Cédric tranche. Les autres jours ne sont pas écrits. Visit Alsace dit que les bières sont brassées sur place ; Visit Strasbourg donne une autre adresse (11 rue de l'Ardèche), non retenue.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 12 h 39 (heure de Paris), accueil du public : la source ne dit pas les heures de ce jour.
> - Adresse
> - 10 place de l'Abattoir 67200 Strasbourg
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Perle&type=brewery)
> - Joindre la brasserie
> - [Appeler le 03 69 25 77 68](tel:+33369257768)
> - [Site de la brasserie](https://www.biere-perle.com/)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | 17 h – 23 h
> - Jeudi | 17 h – 23 h
> - Vendredi | 16 h – 23 h
> - Samedi | 10 h – 23 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [biere-perle.com](https://www.biere-perle.com/) le 3 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 7. Matten — fiche nouvelle

- n : (vide) → Matten
- c : (vide) → Matzenheim
- d : (vide) → 67
- lat : (vide) → 48.3885
- lon : (vide) → 7.63022
- km : (vide) → 372.2
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Fiche de Visit Alsace (agence de tourisme) : boutique sur place où l'on goûte et achète. Une source touristique vaut au plus une confiance moyenne.
- addr : (vide) → 5 rue de Werde 67150 Matzenheim
- src : (vide) → https://visit.alsace/en/261002284-matten-craft-brewery-of-matzenheim
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://visit.alsace/en/261002284-matten-craft-brewery-of-matzenheim ; https://data.geopf.fr/geocodage/search?q=5+rue+de+Werde+67150+Matzenheim&limit=5

Extrait lu : « There is a shop on site, allowing visitors to discover, taste and purchase the brewery's creations. »

Choix du vérificateur : Page lue via un résumé. Le site officiel (matten.fr redirige vers https://www.bieres-matten.fr/) donne le même fixe, mais aucune boutique ni aucun horaire, et une autre adresse (5 rue des Merisiers) à côté du 5 rue de Werde : l'adresse reste celle de SIRENE et de Visit Alsace. Aucun horaire écrit (Visit Alsace n'en donne pas). Bières citées sur le site (Psaïkodéclic, Red Fox, White Fox) : laissées de côté, faute de page Untappd lue.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 5 rue de Werde 67150 Matzenheim
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Matten+Matzenheim)[Ses bières sur Untappd](https://untappd.com/search?q=Matten&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [visit.alsace](https://visit.alsace/en/261002284-matten-craft-brewery-of-matzenheim) le 3 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 8. Brasserie La Mercière — fiche nouvelle

- n : (vide) → Brasserie La Mercière
- c : (vide) → Cosswiller
- d : (vide) → 67
- lat : (vide) → 48.63033
- lon : (vide) → 7.39914
- km : (vide) → 384.7
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Le site officiel annonce la vente de bière aux particuliers à la boutique. Les visites avec dégustation se font en groupe et sur réservation seulement. Aucun horaire publié.
- addr : (vide) → 17 rue Principale, 67310 Cosswiller
- src : (vide) → https://www.la-merciere.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://www.la-merciere.fr
- contact.source : (vide) → https://www.la-merciere.fr
- contact.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://www.la-merciere.fr ; https://data.geopf.fr/geocodage/search?q=17+rue+Principale%2C+67310+Cosswiller&limit=5

Extrait lu : « Vente de bière aux particuliers et professionnels à la boutique ou en point de vente. »

Choix du vérificateur : Page du site officiel lue via un résumé (WebFetch). Téléphone : 09 52 68 67 41, lu sur la fiche de l'office visit.alsace (lien « Call us » dans le bloc « BRASSERIE LA MERCIÈRE, 17 rue Principale, 67310 Cosswiller »). C'est le fixe de la brasserie, pas celui de l'office, et il n'apparaît pas sur le site officiel lu. Un fixe lu sur un office est permis (réponse de Cédric du 31/10). Catégorie 2 et non 1 : la dégustation n'est offerte qu'aux groupes sur réservation. Confiance moyenne : horaires absents. Page Untappd non trouvée.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - 17 rue Principale, 67310 Cosswiller
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+La+Merci%C3%A8re+Cosswiller)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+La+Merci%C3%A8re&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://www.la-merciere.fr)
> - Lu sur [la-merciere.fr](https://www.la-merciere.fr) le 3 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 9. Les Brasseurs du Ried — fiche nouvelle

- n : (vide) → Les Brasseurs du Ried
- c : (vide) → Muttersholtz
- d : (vide) → 67
- lat : (vide) → 48.26924
- lon : (vide) → 7.52106
- km : (vide) → 356.7
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Brasserie alsacienne et Bierstub (le site officiel dit qu'on boit sur place). Vente à emporter non confirmée par le site officiel : Gault&Millau dit « toutes disponibles à la dégustation et à la vente », mais c'est un annuaire.
- addr : (vide) → 32 rue Ehnwihr 67600 Muttersholtz
- src : (vide) → https://brasseurs-du-ried.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 09 67 23 31 83
- contact.site : (vide) → https://brasseurs-du-ried.fr/
- contact.source : (vide) → https://brasseurs-du-ried.fr/
- contact.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://brasseurs-du-ried.fr/ ; https://data.geopf.fr/geocodage/search?q=32+rue+Ehnwihr+67600+Muttersholtz&limit=5

Extrait lu : « Brasserie Alsacienne et Bierstub à MUTTERSHOLTZ »

Choix du vérificateur : Page d'accueil du site officiel lue via un résumé : titre « Brasserie Alsacienne et Bierstub » et téléphone 09 67 23 31 83, ni horaires ni bières ni Untappd. Classé en 1 avec une confiance faible (règle de Cédric du 29/10 pour un lieu où l'on boit). Le téléphone vient du site de la brasserie ; une fiche de l'office de tourisme de Sélestat donne un autre numéro (03 88 58 87 20), écarté. Des annuaires donnent vendredi à dimanche 17 h à 23 h, non repris car aucune source officielle. Pas de page Untappd trouvée en deux recherches.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Adresse
> - 32 rue Ehnwihr 67600 Muttersholtz
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Les+Brasseurs+du+Ried+Muttersholtz)[Ses bières sur Untappd](https://untappd.com/search?q=Les+Brasseurs+du+Ried&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 09 67 23 31 83](tel:+33967233183)
> - [Site de la brasserie](https://brasseurs-du-ried.fr/)
> - Lu sur [brasseurs-du-ried.fr](https://brasseurs-du-ried.fr/) le 3 novembre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 10. Brasserie de Framont — fiche nouvelle

- n : (vide) → Brasserie de Framont
- c : (vide) → Grandfontaine
- d : (vide) → 67
- lat : (vide) → 48.48519
- lon : (vide) → 7.16559
- km : (vide) → 361.9
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie artisanale installée dans l'ancienne demeure du maître des forges, d'après la fiche de l'office de tourisme de la vallée de la Bruche. Ni vente, ni visite, ni horaires ne sont écrits : ce qu'on peut y faire n'est pas établi.
- addr : (vide) → 1 rue du Haut Fourneau, 67130 Grandfontaine
- src : (vide) → https://www.valleedelabruche.fr/fiche-sit/F215002936_brasserie-de-framont-grandfontaine/
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://www.valleedelabruche.fr/fiche-sit/F215002936_brasserie-de-framont-grandfontaine/ ; https://data.geopf.fr/geocodage/search?q=1+rue+du+Haut+Fourneau%2C+67130+Grandfontaine&limit=5

Extrait lu : « la Brasserie de Framont est implantée dans l'ancienne demeure du maître des forges à Grandfontaine. »

Choix du vérificateur : Pages lues via un résumé (WebFetch) : fiche de l'office de la vallée de la Bruche et fiche visit.alsace (mêmes informations). Page Facebook derrière une connexion, illisible. Ni site officiel ni Untappd trouvés. Existence appuyée par SIRENE et deux fiches d'office (confiance moyenne au plus), d'où cat 0. Téléphone écarté : l'office publie le 06 63 07 64 94 (portable), rien ne montre que la brasserie le publie elle-même. Adresse retenue : 1 rue du Haut Fourneau (fiche de l'office) ; l'autre adresse SIRENE (6 rue du Haut Fourneau) non reprise.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 1 rue du Haut Fourneau, 67130 Grandfontaine
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+de+Framont+Grandfontaine)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+de+Framont&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [valleedelabruche.fr](https://www.valleedelabruche.fr/fiche-sit/F215002936_brasserie-de-framont-grandfontaine/) le 3 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 11. Microbrasserie Guth — fiche nouvelle

- n : (vide) → Microbrasserie Guth
- c : (vide) → Saint-Maurice
- d : (vide) → 67
- lat : (vide) → 48.32593
- lon : (vide) → 7.33587
- km : (vide) → 353.8
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → L'office de tourisme d'Alsace (visit.alsace) annonce un espace boutique et un bar ouverts chaque vendredi et samedi. Il ne donne pas d'heures. Le site officiel confirme une boutique en ligne et un bar-restaurant à Saint-Maurice.
- addr : (vide) → 10 rue Principale, 67220 Saint-Maurice
- src : (vide) → https://visit.alsace/fr/224003870-microbrasserie-guth
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 22 75 39 12
- contact.site : (vide) → http://www.brasserie-distillerie-guth-ggc.com
- contact.source : (vide) → http://www.brasserie-distillerie-guth-ggc.com
- contact.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://visit.alsace/fr/224003870-microbrasserie-guth ; http://www.brasserie-distillerie-guth-ggc.com ; https://data.geopf.fr/geocodage/search?q=10+rue+Principale%2C+67220+Saint-Maurice&limit=5

Extrait lu : « propose un espace boutique et un bar chaleureux ouverts chaque vendredi et samedi. »

Choix du vérificateur : Téléphone : le site officiel publie le 06 22 75 39 12 sous « Microbrasserie distillerie ». Je le retiens parce que c'est la seule ligne de la brasserie ; c'est un mobile. J'écarte 03 72 91 47 38 (bar/restaurant de Saint-Maurice) et 03 69 27 68 93 (bar/restaurant de Sélestat), qui sont d'autres établissements. Horaires non repris : l'office de Colmar parle d'un « drive » le vendredi et le samedi de 10h à 23h, ce que visit.alsace ne dit pas, et je n'ai pas trouvé la page « Contact & horaires » du site officiel. Bières non reprises : l'office ne donne que des styles, sans noms ; le site ne liste que « Bières 33cl ». Pas de page Untappd trouvée. Les ouvertures annoncées vont du 02/11 au 31/12/2026. Le nom ressemble à celui de l'Auberge Chez Guth de Steige, qui est un autre établissement.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 10 rue Principale, 67220 Saint-Maurice
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Microbrasserie+Guth+Saint-Maurice)[Ses bières sur Untappd](https://untappd.com/search?q=Microbrasserie+Guth&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 22 75 39 12](tel:+33622753912)
> - [Site de la brasserie](http://www.brasserie-distillerie-guth-ggc.com)
> - Lu sur [visit.alsace](https://visit.alsace/fr/224003870-microbrasserie-guth) le 3 novembre 2026. Lu sur [brasserie-distillerie-guth-ggc.com](http://www.brasserie-distillerie-guth-ggc.com) le 3 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 12. Brasserie Bucher Bernardswiller — fiche nouvelle

- n : (vide) → Brasserie Bucher Bernardswiller
- c : (vide) → Bernardswiller
- d : (vide) → 67
- lat : (vide) → 48.4525
- lon : (vide) → 7.46393
- km : (vide) → 370.8
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Petite brasserie artisanale de village : le site de la brasserie annonce une vente sur place à la boutique, du mercredi et du samedi, avec livraison et retrait. Une dégustation de 3 bières n'est décrite que pour les visites de groupe de 4 à 8 adultes, pas comme un bar ouvert à tous.
- addr : (vide) → 6 place de l'Église, 67210 Bernardswiller
- src : (vide) → https://www.labbb.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 07 81 21 69 23
- contact.site : (vide) → https://www.labbb.fr
- contact.source : (vide) → https://www.labbb.fr
- contact.verifieLe : (vide) → 2026-11-03
- horaires.0.nature : (vide) → vente
- horaires.0.mer : (vide) → 16 h – 20 h
- horaires.0.sam : (vide) → 14 h – 17 h
- horaires.0.source : (vide) → https://www.labbb.fr
- horaires.0.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://www.labbb.fr ; https://data.geopf.fr/geocodage/search?q=6+place+de+l%27%C3%89glise%2C+67210+Bernardswiller&limit=5

Extrait lu : « POUR DECOUVRIR LES BBIERES IL Y A LA BBBOUTIQUE 6 PLACE DE L'EGLISE, BERNARDSWILLER MERCREDI DE 16H à 20H ET SAMEDI DE 14H A 17H »

Choix du vérificateur : Catégorie 2 et non 1 : la page ne décrit pas de consommation sur place ouverte au public, seulement une visite de groupe avec dégustation. Le numéro est un portable (07), seule ligne publiée par la brasserie sur son site (règle du 21/10) ; il est aussi sur la fiche visit.alsace. Les noms des bières sont dans des images, donc non lus : beers vide. Untappd non trouvé sur la page. Les horaires sont ceux de la boutique, donc de la vente. Page lue via un résumé, passages entre guillemets rapportés par ce résumé.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 12 h 39 (heure de Paris), vente : la source ne dit pas les heures de ce jour.
> - Adresse
> - 6 place de l'Église, 67210 Bernardswiller
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Bucher+Bernardswiller&type=brewery)
> - Joindre la brasserie
> - [Appeler le 07 81 21 69 23](tel:+33781216923)
> - [Site de la brasserie](https://www.labbb.fr)
> - Horaires
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | 16 h – 20 h
> - Jeudi | non précisé
> - Vendredi | non précisé
> - Samedi | 14 h – 17 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [labbb.fr](https://www.labbb.fr) le 3 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 13. Brasserie Blüeme — fiche nouvelle

- n : (vide) → Brasserie Blüeme
- c : (vide) → Alteckendorf
- d : (vide) → 67
- lat : (vide) → 48.79368
- lon : (vide) → 7.58853
- km : (vide) → 407.5
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Brasserie artisanale fondée en 2019 : le site de la brasserie annonce une vente sur place le premier samedi de chaque mois, de 14h30 à 17h. Pas de consommation sur place décrite. La fiche de l'office de tourisme dit aussi que la vente se fait sur rendez-vous.
- addr : (vide) → 3 rue des Catherinettes, 67270 Alteckendorf
- src : (vide) → https://brasserie.blueme.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://brasserie.blueme.fr/
- contact.source : (vide) → https://brasserie.blueme.fr/
- contact.verifieLe : (vide) → 2026-11-03
- horaires.0.nature : (vide) → vente
- horaires.0.sam : (vide) → 14 h 30 – 17 h
- horaires.0.remarque : (vide) → Seulement le premier samedi de chaque mois ; sur rendez-vous les autres jours (office de tourisme).
- horaires.0.source : (vide) → https://brasserie.blueme.fr/
- horaires.0.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://brasserie.blueme.fr/ ; https://data.geopf.fr/geocodage/search?q=3+rue+des+Catherinettes%2C+67270+Alteckendorf&limit=5

Extrait lu : « Vente sur place tous les 1er samedis du mois (14h30-17h) »

Choix du vérificateur : Le seul numéro trouvé est un portable (06 82 93 05 48) sur la fiche visit.alsace (office de tourisme, https://www.visit.alsace/?p=988448) ; il n'est pas publié sur le site de la brasserie, donc écarté (un portable doit venir de la brasserie). L'office donne une adresse différente (route de Pfaffenhoffen) ; je garde celle du site de la brasserie, qui est aussi celle de SIRENE. Horaires : créneau valable seulement le premier samedi du mois, dit dans `remarque`. Noms de bières lus seulement dans des textes alternatifs d'images : non retenus. Untappd non trouvé. Page lue via un résumé, passage rapporté par ce résumé.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 12 h 39 (heure de Paris), vente : la source ne dit pas les heures de ce jour.
> - Adresse
> - 3 rue des Catherinettes, 67270 Alteckendorf
> - Pas encore dans la fiche : son téléphone et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Bl%C3%BCeme+Alteckendorf)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Bl%C3%BCeme&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://brasserie.blueme.fr/)
> - Horaires
> - À savoir : Seulement le premier samedi de chaque mois ; sur rendez-vous les autres jours (office de tourisme).
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | non précisé
> - Vendredi | non précisé
> - Samedi | 14 h 30 – 17 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserie.blueme.fr](https://brasserie.blueme.fr/) le 3 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 14. Brassin des Frangins — fiche nouvelle

- n : (vide) → Brassin des Frangins
- c : (vide) → Plobsheim
- d : (vide) → 67
- lat : (vide) → 48.46823
- lon : (vide) → 7.73075
- km : (vide) → 383.7
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Existe d'après son site officiel (vente en ligne, livraison en point relais). Rien ne dit qu'on peut acheter ou boire sur place.
- addr : (vide) → 7 rue de la Mésange 67115 Plobsheim
- src : (vide) → https://brassindesfrangins.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 09 77 84 02 89
- contact.site : (vide) → https://brassindesfrangins.fr
- contact.source : (vide) → https://brassindesfrangins.fr
- contact.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://brassindesfrangins.fr ; https://data.geopf.fr/geocodage/search?q=7+rue+de+la+M%C3%A9sange+67115+Plobsheim&limit=5

Extrait lu : « Une brasserie artisanale familiale basée en Alsace à proximité de Strasbourg »

Choix du vérificateur : Page lue via un résumé. L'adresse du site (7 rue de la Mésange, 67115 Plobsheim) est celle de SIRENE, mais le lien avec la raison sociale enregistrée n'est pas lu sur la page : à décider par Cédric. Le 09 est repris car c'est le numéro publié par la brasserie (pas un 08). Aucun horaire ni style de bière nommé.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 7 rue de la Mésange 67115 Plobsheim
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brassin+des+Frangins+Plobsheim)[Ses bières sur Untappd](https://untappd.com/search?q=Brassin+des+Frangins&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 09 77 84 02 89](tel:+33977840289)
> - [Site de la brasserie](https://brassindesfrangins.fr)
> - Lu sur [brassindesfrangins.fr](https://brassindesfrangins.fr) le 3 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 15. Brasserie Le Centième Singe — fiche nouvelle

- n : (vide) → Brasserie Le Centième Singe
- c : (vide) → Altwiller
- d : (vide) → 67
- lat : (vide) → 48.92924
- lon : (vide) → 6.97988
- km : (vide) → 398.9
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Micro-brasserie du site officiel : bouteilles, packs et fût de 20 L en boutique, horaires de boutique le vendredi soir et le samedi matin. Le site ne dit pas explicitement qu'on achète sur place ; aucun bar ni dégustation annoncés.
- addr : (vide) → 16 A rue Principale, 67260 Altwiller
- src : (vide) → https://brasserie-centieme-singe.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 07 67 82 51 46
- contact.site : (vide) → https://brasserie-centieme-singe.fr/
- contact.source : (vide) → https://brasserie-centieme-singe.fr/
- contact.verifieLe : (vide) → 2026-11-03
- horaires.0.nature : (vide) → vente
- horaires.0.ven : (vide) → 18 h – 20 h
- horaires.0.sam : (vide) → 9 h – 12 h
- horaires.0.source : (vide) → https://brasserie-centieme-singe.fr/
- horaires.0.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://brasserie-centieme-singe.fr/ ; https://data.geopf.fr/geocodage/search?q=16+A+rue+Principale%2C+67260+Altwiller&limit=5

Extrait lu : « Horaires de la boutique: Vendredi: 18h-20h / Samedi: 9h-12h »

Choix du vérificateur : Le seul numéro de la page (07 67 82 51 46) est un portable : retenu comme seule ligne publiée. L'adresse vient de SIRENE ; la page ne donne que le village. Aucune page Untappd trouvée. Catégorie 2 en moyenne et non en solide, car « boutique » laisse penser à une vente sur place sans l'écrire.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 12 h 39 (heure de Paris), vente : la source ne dit pas les heures de ce jour.
> - Adresse
> - 16 A rue Principale, 67260 Altwiller
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Le+Centi%C3%A8me+Singe&type=brewery)
> - Joindre la brasserie
> - [Appeler le 07 67 82 51 46](tel:+33767825146)
> - [Site de la brasserie](https://brasserie-centieme-singe.fr/)
> - Horaires
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | non précisé
> - Vendredi | 18 h – 20 h
> - Samedi | 9 h – 12 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserie-centieme-singe.fr](https://brasserie-centieme-singe.fr/) le 3 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 16. Les Intenables — fiche nouvelle

- n : (vide) → Les Intenables
- c : (vide) → Rosheim
- d : (vide) → 67
- lat : (vide) → 48.50337
- lon : (vide) → 7.49403
- km : (vide) → 376.7
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Le site de la brasserie annonce une boutique ouverte du lundi au vendredi de 9h à 17h ; il propose aussi « Visites & dégustations » sur contact, sans dire si on boit sur place.
- addr : (vide) → 8 rue Jean Marie Lehn, 67560 Rosheim
- src : (vide) → https://www.lesintenables.com/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 46 39 96 65
- contact.site : (vide) → https://www.lesintenables.com/
- contact.untappd : (vide) → https://untappd.com/LesIntenablesCraftBeer
- contact.source : (vide) → https://www.lesintenables.com/
- contact.verifieLe : (vide) → 2026-11-03
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 9 h – 17 h
- horaires.0.mar : (vide) → 9 h – 17 h
- horaires.0.mer : (vide) → 9 h – 17 h
- horaires.0.jeu : (vide) → 9 h – 17 h
- horaires.0.ven : (vide) → 9 h – 17 h
- horaires.0.source : (vide) → https://www.lesintenables.com/
- horaires.0.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://www.lesintenables.com/ ; https://data.geopf.fr/geocodage/search?q=8+rue+Jean+Marie+Lehn%2C+67560+Rosheim&limit=5

Extrait lu : « Boutique ouverte du lundi au vendredi de 9h à 17h. »

Choix du vérificateur : Le seul numéro publié est un portable (+33(0)6 46 39 96 65), retenu comme seule ligne publiée par la brasserie (règle du 21/10). Les visites et dégustations ne sont pas détaillées, donc catégorie 2 et non 1. Le nom commercial est « Les Intenables » ; SIRENE écrit « Bière des Intenables ». Page Untappd ouverte : fiche « Les Intenables - Craft Beer », Rosheim. Je ne propose aucune bière : seules les gammes (éphémères, régulières, Cuvées 31, softs) sont citées, sans lecture bière par bière sur Untappd.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 12 h 39 (heure de Paris), vente : ouvert jusqu’à 17 h, d’après les horaires publiés.
> - Adresse
> - 8 rue Jean Marie Lehn, 67560 Rosheim
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Les+Intenables&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 46 39 96 65](tel:+33646399665)
> - [Site de la brasserie](https://www.lesintenables.com/)[Untappd (avis sur les bières)](https://untappd.com/LesIntenablesCraftBeer)
> - Horaires
> - Horaires de vente
> - Lundi | 9 h – 17 h
> - Mardi | 9 h – 17 h
> - Mercredi | 9 h – 17 h
> - Jeudi | 9 h – 17 h
> - Vendredi | 9 h – 17 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [lesintenables.com](https://www.lesintenables.com/) le 3 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 17. Brasserie Guilhéon — fiche nouvelle

- n : (vide) → Brasserie Guilhéon
- c : (vide) → Blienschwiller
- d : (vide) → 67
- lat : (vide) → 48.34186
- lon : (vide) → 7.41657
- km : (vide) → 358.7
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Le site officiel présente des bières artisanales maison, non filtrées et non pasteurisées, et un créneau le samedi de 10 h à 12 h. Il ne dit ni si l'on peut acheter ni si l'on peut boire sur place. Il recommande de contacter la brasserie avant de venir. Le portable est le seul numéro publié.
- addr : (vide) → 7 rue de l'Ungersberg, 67650 Blienschwiller
- src : (vide) → https://brasserieguilheon.wixsite.com/website
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 58 52 67 14
- contact.site : (vide) → https://brasserieguilheon.wixsite.com/website
- contact.source : (vide) → https://brasserieguilheon.wixsite.com/website
- contact.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://brasserieguilheon.wixsite.com/website ; https://data.geopf.fr/geocodage/search?q=7+rue+de+l%27Ungersberg%2C+67650+Blienschwiller&limit=5

Extrait lu : « Il est fortement recommandé de nous contacter avant de venir. »

Choix du vérificateur : Page lue via un résumé. Le créneau du samedi n'est pas proposé en horaires, car le site ne dit pas de quelle nature il est (accueil ou vente). Portable retenu car c'est le seul numéro publié.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 7 rue de l'Ungersberg, 67650 Blienschwiller
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Guilh%C3%A9on+Blienschwiller)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Guilh%C3%A9on&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 58 52 67 14](tel:+33658526714)
> - [Site de la brasserie](https://brasserieguilheon.wixsite.com/website)
> - Lu sur [brasserieguilheon.wixsite.com](https://brasserieguilheon.wixsite.com/website) le 3 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 18. Brasserie Bendorf — fiche nouvelle

- n : (vide) → Brasserie Bendorf
- c : (vide) → Strasbourg
- d : (vide) → 67
- lat : (vide) → 48.56651
- lon : (vide) → 7.77546
- km : (vide) → 394.5
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Le site de la brasserie annonce le remplissage de growlers à la brasserie ; aucune dégustation sur place n'y est mentionnée.
- addr : (vide) → 114 rue Jean Jaurès, 67100 Strasbourg
- src : (vide) → https://www.brasserie-bendorf.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 09 53 79 76 70
- contact.site : (vide) → https://www.brasserie-bendorf.fr
- contact.source : (vide) → https://www.brasserie-bendorf.fr
- contact.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://www.brasserie-bendorf.fr ; https://data.geopf.fr/geocodage/search?q=114+rue+Jean+Jaur%C3%A8s%2C+67100+Strasbourg&limit=5

Extrait lu : « À la brasserie, on remplit vos growlers de 0.50L, 0.65L, 0.75cl, 1L ou de 2L ! »

Choix du vérificateur : Existence : site officiel, plus fiches Gault&Millau et office de Strasbourg (visitstrasbourg, 403 à l'ouverture, vue seulement dans les résultats de recherche) et un nœud OSM. Catégorie 2 car seule la vente à emporter (growlers) est écrite ; rien sur la consommation sur place. Horaires non repris : seuls des annuaires (118712) en donnent, et ils se contredisent. Un autre mobile (06 70 55 72 08) vu sur Gault&Millau est écarté (annuaire, source ancienne). Aucun lien Untappd trouvé. Bières : styles cités par le site (houblonnées, acides, fruitées, etc.) non transcrits en types faute de lecture directe de la liste. Lecture du site via un résumé.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - 114 rue Jean Jaurès, 67100 Strasbourg
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Bendorf+Strasbourg)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Bendorf&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 09 53 79 76 70](tel:+33953797670)
> - [Site de la brasserie](https://www.brasserie-bendorf.fr)
> - Lu sur [brasserie-bendorf.fr](https://www.brasserie-bendorf.fr) le 3 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 19. BroBrew — fiche nouvelle

- n : (vide) → BroBrew
- c : (vide) → Russ
- d : (vide) → 67
- lat : (vide) → 48.4967
- lon : (vide) → 7.25477
- km : (vide) → 366.4
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie familiale existante (site officiel, cinq bières). Le site ne dit rien de la vente, de la dégustation ni des horaires : on ne sait pas encore ce qu'on peut y faire.
- addr : (vide) → 1 rue des Champs, 67130 Russ
- src : (vide) → https://brobrew.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 46 40 75 39
- contact.site : (vide) → https://brobrew.fr/
- contact.source : (vide) → https://brobrew.fr/
- contact.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://brobrew.fr/ ; https://data.geopf.fr/geocodage/search?q=1+rue+des+Champs%2C+67130+Russ&limit=5

Extrait lu : « Chez nous, vous n'entrez pas dans une brasserie : vous entrez dans notre maison. »

Choix du vérificateur : Page lue via un résumé (WebFetch). Téléphone retenu : 06 46 40 75 39, un mobile, seul numéro publié par la brasserie sur son site (règle du 21/10). Catégorie 0 : la phrase citée n'établit ni vente ni accueil. Le site ne donne ni boutique ni horaires.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 1 rue des Champs, 67130 Russ
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=BroBrew+Russ)[Ses bières sur Untappd](https://untappd.com/search?q=BroBrew&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 46 40 75 39](tel:+33646407539)
> - [Site de la brasserie](https://brobrew.fr/)
> - Lu sur [brobrew.fr](https://brobrew.fr/) le 3 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 20. Brasserie Les Semblables — fiche nouvelle

- n : (vide) → Brasserie Les Semblables
- c : (vide) → Mietesheim
- d : (vide) → 67
- lat : (vide) → 48.87785
- lon : (vide) → 7.64052
- km : (vide) → 417.4
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → La fiche de l'office de tourisme Alsace Verte indique « Vente à la propriété : Bières et softs » et des visites guidées pour groupes sur rendez-vous. Aucune dégustation ouverte n'est annoncée.
- addr : (vide) → 3 rue de l'étang, 67580 Mietesheim
- src : (vide) → https://www.alsace-verte.com/fr/commerces-et-services/brasserie-les-semblables/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://brasserie-semblables.fr/
- contact.source : (vide) → https://brasserie-semblables.fr/
- contact.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://www.alsace-verte.com/fr/commerces-et-services/brasserie-les-semblables/ ; https://brasserie-semblables.fr/ ; https://data.geopf.fr/geocodage/search?q=3+rue+de+l%27%C3%A9tang%2C+67580+Mietesheim&limit=5

Extrait lu : « Bières et softs »

Choix du vérificateur : Source de catégorie : un office de tourisme, donc moyenne au plus. Le site officiel brasserie-semblables.fr confirme l'adresse mais ni la vente sur place, ni les horaires, ni un téléphone. J'ai écarté le 06 68 44 53 45 et les horaires du mercredi au samedi, vus seulement sur des fiches « halte gourde » du Parc des Vosges du Nord et non publiés par la brasserie. Le numéro +33 (0)3 88 80 89 70 est celui de l'office, écarté. Pas d'Untappd trouvé.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - 3 rue de l'étang, 67580 Mietesheim
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Les+Semblables+Mietesheim)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Les+Semblables&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://brasserie-semblables.fr/)
> - Lu sur [alsace-verte.com](https://www.alsace-verte.com/fr/commerces-et-services/brasserie-les-semblables/) le 3 novembre 2026. Lu sur [brasserie-semblables.fr](https://brasserie-semblables.fr/) le 3 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 21. Mogwaï Beer Company — fiche nouvelle

- n : (vide) → Mogwaï Beer Company
- c : (vide) → Mundolsheim
- d : (vide) → 67
- lat : (vide) → 48.63185
- lon : (vide) → 7.71838
- km : (vide) → 397.9
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → La brasserie dit qu'on peut venir acheter ses bières sur place selon les disponibilités, avec un contact préalable conseillé par e-mail. Aucun horaire ni téléphone publiés, pas de taproom mentionné.
- addr : (vide) → 3 rue du Général Rapp, 67450 Mundolsheim
- src : (vide) → https://www.mogwaibeercompany.fr/nous-trouver-irl-et-en-2-0/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.untappd : (vide) → https://untappd.com/MogwaiBeerCompany
- contact.source : (vide) → https://untappd.com/MogwaiBeerCompany
- contact.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://www.mogwaibeercompany.fr/nous-trouver-irl-et-en-2-0/ ; https://untappd.com/MogwaiBeerCompany ; https://data.geopf.fr/geocodage/search?q=3+rue+du+G%C3%A9n%C3%A9ral+Rapp%2C+67450+Mundolsheim&limit=5

Extrait lu : « Vous pouvez venir sur place pour acheter nos bières selon nos disponibilités. »

Choix du vérificateur : Page lue via un résumé (WebFetch). Aucun téléphone publié, donc aucun retenu. Page Untappd ouverte (untappd.com/MogwaiBeerCompany, lue via un résumé, brasserie de Mundolsheim, bières éphémères en gose, saison, IPA). Les bières ne sont pas proposées : les types du schéma n'ont pas été croisés avec la liste Untappd. Rien lu sur une consommation sur place, donc pas de catégorie 1.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - 3 rue du Général Rapp, 67450 Mundolsheim
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Mogwa%C3%AF+Beer+Company+Mundolsheim)[Ses bières sur Untappd](https://untappd.com/search?q=Mogwa%C3%AF+Beer+Company&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Untappd (avis sur les bières)](https://untappd.com/MogwaiBeerCompany)
> - Lu sur [mogwaibeercompany.fr](https://www.mogwaibeercompany.fr/nous-trouver-irl-et-en-2-0/) le 3 novembre 2026. Lu sur [untappd.com](https://untappd.com/MogwaiBeerCompany) le 3 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 22. Microbrasserie du Septénaire — fiche nouvelle

- n : (vide) → Microbrasserie du Septénaire
- c : (vide) → Niedermodern
- d : (vide) → 67
- lat : (vide) → 48.8445
- lon : (vide) → 7.63982
- km : (vide) → 414.2
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Le site officiel annonce un pub à sept becs à bières et une boutique. Il ne donne pas d'horaires (il affiche seulement « Actuellement fermé »).
- addr : (vide) → 10 rue de l'Artisanat, 67350 Niedermodern
- src : (vide) → https://www.microbrasserie-septenaire.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 03 68 03 82 99
- contact.site : (vide) → https://www.microbrasserie-septenaire.fr
- contact.source : (vide) → https://www.microbrasserie-septenaire.fr
- contact.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://www.microbrasserie-septenaire.fr ; https://data.geopf.fr/geocodage/search?q=10+rue+de+l%27Artisanat%2C+67350+Niedermodern&limit=5

Extrait lu : « Pub avec 7 becs à bières »

Choix du vérificateur : Horaires non repris : l'office de Haguenau écrit « Jeu et ven : 16h30-22h30, sam : 10h30-12h-30 et 18h00-22h30 ». Le « 12h-30 » du samedi est illisible et le site officiel n'a pas d'horaires. Le site dit onze variétés et n'en montre que quatre, ce sont celles que je reprends. Pas de lien Untappd sur le site (seulement Facebook et Instagram). Je n'ai pas cherché la page Untappd.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Adresse
> - 10 rue de l'Artisanat, 67350 Niedermodern
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Microbrasserie+du+Sept%C3%A9naire+Niedermodern)[Ses bières sur Untappd](https://untappd.com/search?q=Microbrasserie+du+Sept%C3%A9naire&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 03 68 03 82 99](tel:+33368038299)
> - [Site de la brasserie](https://www.microbrasserie-septenaire.fr)
> - Lu sur [microbrasserie-septenaire.fr](https://www.microbrasserie-septenaire.fr) le 3 novembre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 23. Microbrasserie Chop'la — fiche nouvelle

- n : (vide) → Microbrasserie Chop'la
- c : (vide) → Val-de-Moder
- d : (vide) → 67
- lat : (vide) → 48.84953
- lon : (vide) → 7.6115
- km : (vide) → 413.6
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Microbrasserie de La Walck. Ouverte le deuxième jeudi du mois de 16 h à 20 h ou sur rendez-vous ; l'office de tourisme de Haguenau écrit « jeudis 16 h à 19 h 30 » (désaccord). Le site dit qu'on y déguste et qu'on y achète en direct.
- addr : (vide) → 10 rue des Vosges, 67350 Val-de-Moder
- src : (vide) → https://chopla.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 07 22 04 34
- contact.site : (vide) → https://chopla.fr
- contact.source : (vide) → https://chopla.fr
- contact.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : https://chopla.fr ; https://data.geopf.fr/geocodage/search?q=10+rue+des+Vosges%2C+67350+Val-de-Moder&limit=5

Extrait lu : « DEGUSTATIONS/ ACHATS en direct Notre Microbrasserie artisanale vous fait déguster ses bières. »

Choix du vérificateur : Site officiel chopla.fr lu via un résumé (passages recopiés entre guillemets par l'outil de lecture). Téléphone 06 07 22 04 34 : publié par la brasserie sur son site, seul numéro, mobile (règle du 21/10). Mêmes numéro et adresse sur l'office de tourisme de Haguenau. Pas de bloc d'horaires : « deuxième jeudi du mois » ne tient pas dans le schéma et l'office dit tous les jeudis (désaccord) ; remarque dans la note. Catégorie 2 : le site dit bienvenue au 10 rue des Vosges sur RDV et achats directs sur place, sans dégustation établie. Untappd non trouvé. Bières tirées de la page « Nos bières » (via un résumé) ; bière du moment et bière de Noël non retenues.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 10 rue des Vosges, 67350 Val-de-Moder
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Microbrasserie+Chop%27la+Val-de-Moder)[Ses bières sur Untappd](https://untappd.com/search?q=Microbrasserie+Chop%27la&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 07 22 04 34](tel:+33607220434)
> - [Site de la brasserie](https://chopla.fr)
> - Lu sur [chopla.fr](https://chopla.fr) le 3 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 24. Brasserie La Fondation — fiche nouvelle

- n : (vide) → Brasserie La Fondation
- c : (vide) → Geispolsheim
- d : (vide) → 67
- lat : (vide) → 48.51811
- lon : (vide) → 7.6849
- km : (vide) → 386.2
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie installée à Geispolsheim, avec boutique en ligne et livraison. Son taproom n'est pas ouvert (ouverture annoncée au printemps 2027) et le site ne dit rien d'une vente à emporter : ce qu'on peut y faire sur place n'est pas établi.
- addr : (vide) → 6 rue de l'Ill, 67118 Geispolsheim
- src : (vide) → http://www.brasserie-lafondation.com/taproom
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → http://www.brasserie-lafondation.com
- contact.untappd : (vide) → https://untappd.com/BrasserieLaFondation
- contact.source : (vide) → https://untappd.com/BrasserieLaFondation
- contact.verifieLe : (vide) → 2026-11-03
- verifieLe : (vide) → 2026-11-03

Sources (vérifiée le 2026-11-03) : http://www.brasserie-lafondation.com/taproom ; https://untappd.com/BrasserieLaFondation ; https://data.geopf.fr/geocodage/search?q=6+rue+de+l%27Ill%2C+67118+Geispolsheim&limit=5

Extrait lu : « Ouverture prévue au printemps 2027. »

Choix du vérificateur : Page lue via un résumé (WebFetch). Catégorie 0 : taproom pas ouvert, aucune vente à emporter écrite ; boutique en ligne et livraison ne disent pas qu'on peut acheter sur place. Horaires « Du lundi au vendredi 9h–12h & 14h–18h » de /contact non retenus : rien ne dit que ce soit un accueil du public. Horaires prévus du taproom (mer-ven 16h-20h) non retenus : lieu pas encore ouvert. Aucun téléphone publié (e-mail ou formulaire). Aucune bière reprise, faute de règle de date lue. Adresse du siège SIRENE (Strasbourg, 2 rue Dietterlin, 81 rue du Rhin Napoléon) écartée : Geispolsheim est lu sur le site de la brasserie. Existence : site officiel et page Untappd (installée depuis 2023, 36 bières), plus SIRENE.

**Aperçu de la fiche** (état du moment calculé le mardi 3 novembre 2026 à 12:39, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 6 rue de l'Ill, 67118 Geispolsheim
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+La+Fondation+Geispolsheim)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+La+Fondation&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](http://www.brasserie-lafondation.com)[Untappd (avis sur les bières)](https://untappd.com/BrasserieLaFondation)
> - Lu sur [brasserie-lafondation.com](http://www.brasserie-lafondation.com/taproom) le 3 novembre 2026. Lu sur [untappd.com](https://untappd.com/BrasserieLaFondation) le 3 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

Empreinte du lot : e1a928868a25
