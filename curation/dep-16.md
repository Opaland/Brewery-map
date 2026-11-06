# Lot dep-16 — la Charente (S347)

Ce lot ajoute **6 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 26 candidats = 6 proposés + 20 non proposés (tableau ci-dessous).
Catégories proposées : 1 « acheter et consommer », 1 « acheter seulement », 0 « pas de vente », 4 « à confirmer », 0 « consommer sur place seulement ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| BRASSERIE DES GABARIERS (`sirene:502676323`) | Brasserie des Gabariers : lue sous way/88434184 (Plaizac, adresse du site officiel) |
| BRASSERIE ROCHELOISE (`sirene:949014369`) | Brasserie Rocheloise : aucune page sous ce nom ; même siège que les Gabariers |
| SAS BRUNACK (`sirene:824784169`) | SAS Brunack : annuaires seuls, sans site ni office |
| Entreprise individuelle (`personne:1`) | entreprise individuelle : registre seul |
| BRASSERIE ARTISANALE COGNACAISE (`sirene:903405298`) | Brasserie Artisanale Cognacaise : rien sous ce nom (deux recherches) |
| BRASSERIE LA BURETTE (`sirene:909165912`) | La Burette : un annuaire seul |
| SARL DU MOULIN (`sirene:835282492`) | SARL du Moulin (Chazelles) : annuaires seuls, lien avec La Rainette non établi |
| Entreprise individuelle (`personne:2`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE BIG HOP (`sirene:843229626`) | Big Hop : son site ne se laisse pas lire (rendu dynamique), annuaires seuls : à relancer |
| CAPTAIN COEUR DE BOEUF (`sirene:904485901`) | Captain Coeur de Boeuf : rien sous ce nom (deux recherches) |
| BRASSERIE DAZZLE (`sirene:942499542`) | Brasserie Dazzle : rien sous ce nom (deux recherches) |
| NAKHA BEER (`sirene:953167244`) | Nakha Beer : rien sous ce nom (deux recherches) |
| B-BIERE (`sirene:940645898`) | B-Bière : un annuaire seul |
| Entreprise individuelle (`personne:3`) | entreprise sans nom ni adresse : rien à chercher |
| Brasserie La Biouss (`node/7809498717`) | La Biouss : un réseau social seul |
| CharentAles (`node/7809857531`) | CharentAles : même lieu que sirene:807881966, lue sous cette clé |
| Brasserie Metal Snail (`node/7809959098`) | Metal Snail : rien sous ce nom (deux recherches) |
| Brasserie la Rainette (`way/58903884`) | La Rainette : son site répond 503 : à relancer |
| Brasserie Big Hop (`way/65788299`) | Big Hop (Saint-Brice) : rien ne la place à Saint-Brice ; même nom que sirene:843229626 |
| L'Ogre (`way/92100525`) | L'Ogre : rien sous ce nom (deux recherches) |

## Les fiches proposées

## Lot dep-16 — 0 proposition(s), 6 fiche(s) nouvelle(s)

### 1. La Goule — fiche nouvelle

- n : (vide) → La Goule
- c : (vide) → Foussignac
- d : (vide) → 16
- lat : (vide) → 45.7138
- lon : (vide) → -0.12518
- km : (vide) → 379
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Bière biologique brassée sur le domaine Pinard à Foussignac (page de l'office de tourisme Destination Cognac). Le site officiel n'a pas répondu (503) : on ne sait pas si l'on peut acheter ou boire sur place.
- addr : (vide) → 8 rue de l'église, 16200 Foussignac
- src : (vide) → https://destination-cognac.com/?p=8861
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://destination-cognac.com/?p=8861 ; https://data.geopf.fr/geocodage/search?q=8+rue+de+l%27%C3%A9glise%2C+16200+Foussignac&limit=5

Extrait lu : « La Goule, a traditional organic beer, is brewed on the estate. »

Choix du vérificateur : Source unique : page de l'office de tourisme (en anglais, via un résumé) ; http://la-goule.com/ a répondu 503 deux fois (à relancer). Je n'ai repris ni le 05 45 35 87 57 ni les horaires lundi-vendredi : ce sont ceux de la visite du domaine de cognac, pas de la brasserie. Pas d'Untappd trouvé. Office seul, aucune catégorie lue.

**Aperçu de la fiche** (état du moment calculé le vendredi 6 novembre 2026 à 14:19, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 8 rue de l'église, 16200 Foussignac
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=La+Goule+Foussignac)[Ses bières sur Untappd](https://untappd.com/search?q=La+Goule&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [destination-cognac.com](https://destination-cognac.com/?p=8861) le 6 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 2. Brasserie La Débauche — fiche nouvelle

- n : (vide) → Brasserie La Débauche
- c : (vide) → Angoulême
- d : (vide) → 16
- lat : (vide) → 45.65845
- lon : (vide) → 0.16831
- km : (vide) → 356.3
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Taproom « Boutique & bar » dans la brasserie, avec dégustation et visite. Le site ne dit pas si l'on peut acheter à emporter sur place (un e-shop existe).
- addr : (vide) → 13 Rue des Lignes, 16000 Angoulême
- src : (vide) → https://www.brasserie-ladebauche.com/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://www.brasserie-ladebauche.com/
- contact.source : (vide) → https://www.brasserie-ladebauche.com/
- contact.verifieLe : (vide) → 2026-11-06
- horaires.0.nature : (vide) → accueil
- horaires.0.mar : (vide) → 17 h – 22 h
- horaires.0.mer : (vide) → 17 h – 22 h
- horaires.0.jeu : (vide) → 16 h – 22 h
- horaires.0.ven : (vide) → 16 h – 22 h
- horaires.0.sam : (vide) → 14 h – 22 h
- horaires.0.remarque : (vide) → Fermeture le dimanche et le lundi.
- horaires.0.source : (vide) → https://www.brasserie-ladebauche.com/
- horaires.0.verifieLe : (vide) → 2026-11-06
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://www.brasserie-ladebauche.com/ ; https://data.geopf.fr/geocodage/search?q=13+Rue+des+Lignes%2C+16000+Angoul%C3%AAme&limit=5

Extrait lu : « Au coeur de la brasserie, dans un lieu décalé, découvrez nos bières, notre programmation d'événements et visitez la brasserie. »

Choix du vérificateur : Site lu via un résumé de l'outil de lecture, deux fois ; les passages cités sont ceux qu'il a rendus entre guillemets. Catégorie 1 en confiance faible, selon la réponse de Cédric du 29/10 : le site dit qu'on découvre les bières sur place, sans parler de vente à emporter. Pas de téléphone : la page n'en publie aucun. Pas de page Untappd vérifiée. Le site donne 13 Rue des Lignes ; SIRENE donne « Rue des Lignes » sans numéro. Le deuxième établissement SIRENE (Gond-Pontouvre) est écarté. Bières laissées vides : la page cite des gammes (Collection, Eisbocks, Oak Chronicles) mais aucun style n'y est lu.

**Aperçu de la fiche** (état du moment calculé le vendredi 6 novembre 2026 à 14:19, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Maintenant
> - À 14 h 19 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 16 h, sous réserve.
> - Adresse
> - 13 Rue des Lignes, 16000 Angoulême
> - Pas encore dans la fiche : son téléphone et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+La+D%C3%A9bauche+Angoul%C3%AAme)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+La+D%C3%A9bauche&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://www.brasserie-ladebauche.com/)
> - Horaires
> - À savoir : Fermeture le dimanche et le lundi.
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | 17 h – 22 h
> - Mercredi | 17 h – 22 h
> - Jeudi | 16 h – 22 h
> - Vendredi | 16 h – 22 h
> - Samedi | 14 h – 22 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserie-ladebauche.com](https://www.brasserie-ladebauche.com/) le 6 novembre 2026. Ce qu’on peut y faire est probable, pas établi par la source : lisez-la avant d’y aller.

### 3. CharentAles — fiche nouvelle

- n : (vide) → CharentAles
- c : (vide) → Paizay-Naudouin-Embourie
- d : (vide) → 16
- lat : (vide) → 46.04339
- lon : (vide) → 0.0163
- km : (vide) → 369.2
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie qui existe (site officiel). Le site cite des visites et un bar lors d'un événement, mais ne dit ni vente à emporter ni dégustation régulière sur place : à confirmer.
- addr : (vide) → 1 Chemin des Fayolles, 16240 Paizay-Naudouin-Embourie
- src : (vide) → https://www.charentales.fr/fr/nos-services
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://www.charentales.fr
- contact.source : (vide) → https://www.charentales.fr/fr/contactez-nous
- contact.verifieLe : (vide) → 2026-11-06
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://www.charentales.fr/fr/nos-services ; https://www.charentales.fr/fr/contactez-nous ; https://data.geopf.fr/geocodage/search?q=1+Chemin+des+Fayolles%2C+16240+Paizay-Naudouin-Embourie&limit=5

Extrait lu : « Vous serez invité à la brasserie pour rencontrer notre brasseur »

Choix du vérificateur : Pas de téléphone, d'horaires ni de lien Untappd publiés sur le site (accueil, nos-services, contactez-nous) : rien proposé. Types vus sur l'accueil (Dark Ale, Best Bitter, IPA) non repris faute de source Untappd. Catégorie 0 : aucune phrase ne dit qu'on achète ou qu'on boit sur place en dehors d'un événement. Une page Trip.com parle de visites à 5 euros, écartée (agrégateur).

**Aperçu de la fiche** (état du moment calculé le vendredi 6 novembre 2026 à 14:19, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 1 Chemin des Fayolles, 16240 Paizay-Naudouin-Embourie
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=CharentAles+Paizay-Naudouin-Embourie)[Ses bières sur Untappd](https://untappd.com/search?q=CharentAles&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://www.charentales.fr)
> - Lu sur [charentales.fr](https://www.charentales.fr/fr/nos-services) le 6 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 4. Brasserie Jukebox — fiche nouvelle

- n : (vide) → Brasserie Jukebox
- c : (vide) → Cognac
- d : (vide) → 16
- lat : (vide) → 45.68671
- lon : (vide) → -0.32598
- km : (vide) → 394.6
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Brasserie créée en 2022 ; on peut venir acheter ses bières à la brasserie en semaine. Des afterworks où l'on boit sur place ont lieu tous les deux mois seulement, ce n'est donc pas un lieu où boire en permanence.
- addr : (vide) → 48 rue Armand Simard, 16100 Cognac
- src : (vide) → https://brasseriejukebox.com/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 82 41 35 23
- contact.site : (vide) → https://brasseriejukebox.com/
- contact.source : (vide) → https://brasseriejukebox.com/
- contact.verifieLe : (vide) → 2026-11-06
- horaires.0.nature : (vide) → accueil
- horaires.0.lun : (vide) → 9 h – 12 h, 14 h – 17 h
- horaires.0.mar : (vide) → 9 h – 12 h, 14 h – 17 h
- horaires.0.mer : (vide) → 9 h – 12 h, 14 h – 17 h
- horaires.0.jeu : (vide) → 9 h – 12 h, 14 h – 17 h
- horaires.0.ven : (vide) → 9 h – 12 h
- horaires.0.source : (vide) → https://brasseriejukebox.com/
- horaires.0.verifieLe : (vide) → 2026-11-06
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://brasseriejukebox.com/ ; https://data.geopf.fr/geocodage/search?q=48+rue+Armand+Simard%2C+16100+Cognac&limit=5

Extrait lu : « Nous vous accueillons du lundi au jeudi de 9h à 12h et de 14h à 17h et le vendredi de 9h à 12h. »

Choix du vérificateur : Page lue via un résumé (WebFetch), non directement. Catégorie 2 et non 1 : la source ne donne qu'un afterwork bimestriel pour boire sur place, pas d'ouverture régulière en bar. Confiance moyenne à cause de la lecture par résumé. Bières non reprises : la page Untappd de la brasserie elle-même n'a pas été ouverte (seules des pages de bières isolées sont apparues), donc pas de lien Untappd. Téléphone : mobile, seule ligne publiée par la brasserie sur son site.

**Aperçu de la fiche** (état du moment calculé le vendredi 6 novembre 2026 à 14:19, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 14 h 19 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. La source ne dit pas quand elle rouvre.
> - Adresse
> - 48 rue Armand Simard, 16100 Cognac
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Jukebox&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 82 41 35 23](tel:+33682413523)
> - [Site de la brasserie](https://brasseriejukebox.com/)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | 9 h – 12 h, 14 h – 17 h
> - Mardi | 9 h – 12 h, 14 h – 17 h
> - Mercredi | 9 h – 12 h, 14 h – 17 h
> - Jeudi | 9 h – 12 h, 14 h – 17 h
> - Vendredi | 9 h – 12 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriejukebox.com](https://brasseriejukebox.com/) le 6 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 5. La Nouge — fiche nouvelle

- n : (vide) → La Nouge
- c : (vide) → Salles-Lavalette
- d : (vide) → 16
- lat : (vide) → 45.38578
- lon : (vide) → 0.23252
- km : (vide) → 353.7
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → La brasserie existe (site officiel, bières présentées) et est ouverte le vendredi de 10h à 18h30, sur rendez-vous les autres jours. Le site parle de vente directe sans dire si l'on peut acheter ou boire sur place : la page « Magasin » n'a pas pu être lue.
- addr : (vide) → Nougerede, 16190 Salles-Lavalette
- src : (vide) → https://lanouge.fr/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 06 62 83 04 95
- contact.site : (vide) → https://lanouge.fr/
- contact.source : (vide) → https://lanouge.fr/
- contact.verifieLe : (vide) → 2026-11-06
- horaires.0.nature : (vide) → accueil
- horaires.0.ven : (vide) → 10 h – 18 h 30
- horaires.0.remarque : (vide) → Vous êtes les bienvenus à tout autre moment sur rendez-vous.
- horaires.0.source : (vide) → https://lanouge.fr/
- horaires.0.verifieLe : (vide) → 2026-11-06
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://lanouge.fr/ ; https://data.geopf.fr/geocodage/search?q=Salles-Lavalette&type=municipality&limit=5

Extrait lu : « Ouvert le vendredi de 10h – 18h30 »

Choix du vérificateur : Pages lues via un résumé (accueil, bières, où nous trouver). Deux portables publiés par la brasserie, 06 62 83 04 95 et 07 67 74 65 69 : je retiens le premier (repris aussi par le guide de la Charente) ; c'est un mobile publié par la brasserie. Aucun fixe. Catégorie 1 ou 2 écartée : « vente directe » et l'entrée « Magasin » ne disent pas ce qu'on peut faire sur place. Sept autres bières omises (type non précisé ou hors liste). Pas d'Untappd trouvé.

**Aperçu de la fiche** (état du moment calculé le vendredi 6 novembre 2026 à 14:19, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Maintenant
> - À 14 h 19 (heure de Paris), accueil du public : ouvert jusqu’à 18 h 30 selon les créneaux, sous réserve de la remarque ci-dessous.
> - Adresse
> - Nougerede, 16190 Salles-Lavalette
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=La+Nouge&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 62 83 04 95](tel:+33662830495)
> - [Site de la brasserie](https://lanouge.fr/)
> - Horaires
> - À savoir : Vous êtes les bienvenus à tout autre moment sur rendez-vous.
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | non précisé
> - Vendredi | 10 h – 18 h 30
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [lanouge.fr](https://lanouge.fr/) le 6 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 6. Brasserie des Gabariers — fiche nouvelle

- n : (vide) → Brasserie des Gabariers
- c : (vide) → Rouillac
- d : (vide) → 16
- lat : (vide) → 45.75332
- lon : (vide) → -0.12332
- km : (vide) → 378.8
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Site officiel : l'outil de production est à Plaizac. Le site place la boutique et le bar (taproom « La Gabare ») au 39 rue de Bellefonds à Cognac, qui n'est pas cette adresse. Aucune page ne dit si l'on achète ou si l'on boit à Plaizac, donc catégorie 0. Aucun horaire publié. Le fichier SIRENE (sirene:502676323) liste aussi Cognac et Rouillac pour la même enseigne : à rapprocher de cette lecture.
- addr : (vide) → 1 rue du Sabotier, Plaizac, 16170 Rouillac
- src : (vide) → https://www.brasserie-des-gabariers.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 05 45 32 42 70
- contact.site : (vide) → https://www.brasserie-des-gabariers.fr
- contact.source : (vide) → https://www.brasserie-des-gabariers.fr
- contact.verifieLe : (vide) → 2026-11-06
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://www.brasserie-des-gabariers.fr ; https://data.geopf.fr/geocodage/search?q=1+rue+du+Sabotier%2C+Plaizac%2C+16170+Rouillac&limit=5

Extrait lu : « TEL : 05 45 32 42 70 »

Choix du vérificateur : Catégorie 1 écartée : la page « La Gabare » dit « à boire sur place ou à emporter », mais pour le bar de Cognac. Rien n'établit la vente à Plaizac. Les huit bières de la page boutique ne sont pas reprises, sans Untappd ni types lus. Aucun Untappd trouvé.

**Aperçu de la fiche** (état du moment calculé le vendredi 6 novembre 2026 à 14:19, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 1 rue du Sabotier, Plaizac, 16170 Rouillac
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+des+Gabariers+Rouillac)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+des+Gabariers&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 05 45 32 42 70](tel:+33545324270)
> - [Site de la brasserie](https://www.brasserie-des-gabariers.fr)
> - Lu sur [brasserie-des-gabariers.fr](https://www.brasserie-des-gabariers.fr) le 6 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

Empreinte du lot : 3092cd9cdc62
