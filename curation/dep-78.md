# Lot dep-78 — les Yvelines (S345)

Ce lot ajoute **7 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 29 candidats = 7 proposés + 22 non proposés (tableau ci-dessous).
Catégories proposées : 3 « acheter et consommer », 3 « acheter seulement », 0 « pas de vente », 1 « à confirmer », 0 « consommer sur place seulement ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| BRASSERIE DISTRIKT (`sirene:793900473`) | lu le 29/10 : annuaires seuls ; site en erreur 503 : à relancer |
| BRASSERIE DU ROI (`sirene:840301055`) | lu le 29/10 : même brasserie que la lecture node/12327046734 (Brasserie du Roi) |
| LA BRASSERIE BARGE (`sirene:823426978`) | lu le 29/10 : un annuaire d'entreprises seul |
| BRASSERIE DILETTANTE ARCISIENNE (`sirene:979896842`) | lu le 29/10 : rien sous ce nom |
| Entreprise individuelle (`personne:1`) | entreprise sans nom ni adresse : rien à chercher |
| BIERES SAINT-Q (`sirene:799277090`) | lu le 29/10 : établissement fermé depuis 2014 d'après le registre |
| BRASSERIE CROIZAT (`sirene:913341061`) | lu le 29/10 : rien sous ce nom |
| THE CHUBBY BREWING COMPANY (`sirene:920046893`) | lu le 29/10 : un annuaire de bières seul : à relancer |
| EXPEDITION BREWERY (`sirene:911410322`) | lu le 29/10 : rien sous ce nom |
| JUSTBEER BREWERY (`sirene:924932825`) | lu le 29/10 : rien sous ce nom |
| BRASSERIE LA TRIELLOISE (`sirene:902798065`) | lu le 29/10 : un annuaire seul |
| LA STAGNOVILLOISE (`sirene:907918957`) | lu le 29/10 : rien sous ce nom |
| RESPEKT (`sirene:890481096`) | lu le 29/10 : le site n'affiche qu'une vérification de l'âge, annuaires seuls : à relancer |
| TRICYCLHOP (`sirene:893014662`) | lu le 29/10 : une page de la ville seule, en erreur 503 : à relancer |
| TRBL COMPAGNIE SAS (`sirene:852696525`) | lu le 29/10 : un grossiste et un annuaire seuls |
| Rolling's Bar (`node/1854003295`) | lu le 29/10 : un bar, qui ne brasse pas |
| Distrikt Beer (`node/3512397640`) | lu le 29/10 : site injoignable depuis le conteneur, annuaire seul, adresses contradictoires : à relancer |
| Le Vizir (`node/3752510374`) | lu le 29/10 : rien sous ce nom |
| Le Villaroy (`node/4155657290`) | lu le 29/10 : rien sous ce nom |
| Brasserie de la vallée de Chevreuse (`node/7203823199`) | lu le 29/10 : même brasserie que la lecture sirene:503705006 (Volcelest) |
| La Véranda (`node/9280921450`) | lu le 29/10 : un restaurant d'hôtel, qui ne brasse pas |
| Le Sporting (`way/63158105`) | lu le 29/10 : rien sous ce nom |

## Les fiches proposées

## Lot dep-78 — 0 proposition(s), 7 fiche(s) nouvelle(s)

### 1. La Brasserie du Roi — fiche nouvelle

- n : (vide) → La Brasserie du Roi
- c : (vide) → Saint-Cyr-l'École
- d : (vide) → 78
- lat : (vide) → 48.81158
- lon : (vide) → 2.07736
- km : (vide) → 403.1
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Brasserie avec bar (La Ménagerie, bières brassées sur place) et vente en boutique, d'après le site officiel. Le site ne dit pas explicitement si la dégustation et la vente à emporter se font aux horaires indiqués.
- addr : (vide) → 75 rue du Docteur Vaillant, 78210 Saint-Cyr-l'École
- src : (vide) → https://labrasserieduroi.com/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 09 83 65 63 85
- contact.site : (vide) → https://labrasserieduroi.com/
- contact.source : (vide) → https://labrasserieduroi.com/
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://labrasserieduroi.com/ ; https://data.geopf.fr/geocodage/search?q=75+rue+du+Docteur+Vaillant%2C+78210+Saint-Cyr-l%27%C3%89cole&limit=5

Extrait lu : « Plongez dans La Ménagerie : bières brassées sous vos yeux »

Choix du vérificateur : Deux numéros apparaissent : « Tél. : 09 83 65 63 85 », écrit dans le texte de la page à côté de l'adresse (retenu), et 09 87 36 09 97, que je n'ai vu que dans le lien « appeler » du site (écarté). Catégorie 1 en confiance moyenne : « Divine creation/dispo en boutique » (vente) et La Ménagerie (bar). La page ne précise pas la vente à emporter en toutes lettres. Les horaires sont ceux que la page donne sous « Horaires d'ouvertures », sans dire s'ils valent pour le bar ou pour la boutique. Je les classe en accueil et je le signale dans la remarque. Il existe aussi un candidat SIRENE du même nom (sirene:840301055, Versailles et Saint-Cyr) dans un autre paquet : probablement la même brasserie, à dédoublonner. Horaires non saisis : la page les range sous « le bar restaurant » sans dire s'ils valent pour la brasserie (relecture du 29/10). Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 23:50, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 75 rue du Docteur Vaillant, 78210 Saint-Cyr-l'École
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=La+Brasserie+du+Roi+Saint-Cyr-l%27%C3%89cole)[Ses bières sur Untappd](https://untappd.com/search?q=La+Brasserie+du+Roi&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 09 83 65 63 85](tel:+33983656385)
> - [Site de la brasserie](https://labrasserieduroi.com/)
> - Lu sur [labrasserieduroi.com](https://labrasserieduroi.com/) le 29 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 2. Brasserie de la Vallée de Chevreuse — fiche nouvelle

- n : (vide) → Brasserie de la Vallée de Chevreuse
- c : (vide) → Le Perray-en-Yvelines
- d : (vide) → 78
- lat : (vide) → 48.6954
- lon : (vide) → 1.8411
- km : (vide) → 401.6
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → solide
- note : (vide) → Boutique de la brasserie ouverte aux particuliers, du mardi au vendredi de 16h à 19h (18h en janvier et février). Bières vendues sous la marque Volcelest. Le site ne parle pas de consommation sur place.
- addr : (vide) → 28 Rue du Roseau, 78610 Le Perray-en-Yvelines
- src : (vide) → https://www.brasserievolcelest.fr/contact/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 09 62 35 27 83
- contact.site : (vide) → https://www.brasserievolcelest.fr/
- contact.source : (vide) → https://www.brasserievolcelest.fr/contact/
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → vente
- horaires.0.mar : (vide) → 16 h – 19 h
- horaires.0.mer : (vide) → 16 h – 19 h
- horaires.0.jeu : (vide) → 16 h – 19 h
- horaires.0.ven : (vide) → 16 h – 19 h
- horaires.0.remarque : (vide) → Jusqu'à 18h00 en janvier et février.
- horaires.0.source : (vide) → https://www.brasserievolcelest.fr/contact/
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.brasserievolcelest.fr/contact/ ; https://data.geopf.fr/geocodage/search?q=28+Rue+du+Roseau%2C+78610+Le+Perray-en-Yvelines&limit=5

Extrait lu : « Du Mardi au Vendredi de 16h00 à 19h00 (18h00 en Janvier et Février) »

Choix du vérificateur : Catégorie 2 : la page contact parle de « OUVERTURE DE LA BOUTIQUE POUR LA VENTE AUX PARTICULIERS » et ne dit rien de la dégustation sur place. Les types de bière viennent de la page d'accueil du même site (via un résumé), pas de la page contact. Le numéro 01 41 40 99 80 vu sur Gault&Millau est celui de l'annuaire, écarté. Pas de page Untappd trouvée. Horaires saisonniers en deux blocs : janvier-février jusqu'à 18h, le reste de l'année jusqu'à 19h. Types de bière non repris : lus sur le site, pas sur Untappd (docs/DONNEES.md). Source rouverte à la main le 29/10. Horaires ramenés à un bloc, la fermeture à 18h de janvier et février en remarque.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 23:50, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 23 h 50 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : demain à 16 h, sous réserve.
> - Adresse
> - 28 Rue du Roseau, 78610 Le Perray-en-Yvelines
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+de+la+Vall%C3%A9e+de+Chevreuse&type=brewery)
> - Joindre la brasserie
> - [Appeler le 09 62 35 27 83](tel:+33962352783)
> - [Site de la brasserie](https://www.brasserievolcelest.fr/)
> - Horaires
> - À savoir : Jusqu'à 18h00 en janvier et février.
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | 16 h – 19 h
> - Mercredi | 16 h – 19 h
> - Jeudi | 16 h – 19 h
> - Vendredi | 16 h – 19 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserievolcelest.fr](https://www.brasserievolcelest.fr/contact/) le 29 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 3. La P'tite Sœur — fiche nouvelle

- n : (vide) → La P'tite Sœur
- c : (vide) → Sartrouville
- d : (vide) → 78
- lat : (vide) → 48.93235
- lon : (vide) → 2.14869
- km : (vide) → 412.1
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Brasserie à Sartrouville (SIRENE : Les Brasseurs du Val de Seine, même adresse). Le site de l'office de tourisme Seine-Saint-Germain, repris par Destination Yvelines, cite la boutique avec vente directe et dégustation le vendredi et le samedi. Les horaires du site de la brasserie (Le Relais, jeudi à samedi en soirée) diffèrent de ceux de l'office : aucun horaire retenu.
- addr : (vide) → 165 avenue de la République, 78500 Sartrouville
- src : (vide) → https://www.destination-yvelines.fr/en/farms-pick-your-own-and-gourmet-shops/la-ptite-soeur-2
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 28 40 12 52
- contact.site : (vide) → http://www.laptitesoeur.com/
- contact.source : (vide) → http://www.laptitesoeur.com/
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.destination-yvelines.fr/en/farms-pick-your-own-and-gourmet-shops/la-ptite-soeur-2 ; http://www.laptitesoeur.com/ ; https://data.geopf.fr/geocodage/search?q=165+avenue+de+la+R%C3%A9publique%2C+78500+Sartrouville&limit=5

Extrait lu : « tasting session, brewery tour and direct sales »

Choix du vérificateur : Lecture faite via un résumé de la page (WebFetch), pas en direct : l'extrait est la citation que ce résumé donne, à reverifier. Confiance moyenne : la vente et la dégustation viennent d'une page d'office (en anglais), et le site officiel, lu aussi via un résumé, ne parle que de l'espace Le Relais (événements, dégustations) sans dire explicitement qu'on achète à emporter. Téléphone : le site officiel publie un seul numéro, un mobile (06 28 40 12 52), retenu comme seule ligne publiée par la brasserie (règle du 21/10). Écarté : 01 75 93 77 29, vu dans un résumé de recherche attribué à des pages d'office, non confirmé sur le site de la brasserie ; 01 30 09 39 89, qui est l'office de tourisme. Horaires non proposés : le site officiel annonce jeudi et vendredi 17h-21h, samedi 14h-21h (Le Relais) ; l'office annonce vendredi 14h-19h, samedi 11h-19h (boutique) ; contradictoires. Aucune page Untappd trouvée, aucune bière listée. Le site de Sartrouville (SIRENE) porte l'enseigne « Les Brasseurs du Val de Seine » ; le nom d'usage retenu est La P'tite Sœur, d'après le site officiel. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 23:50, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 165 avenue de la République, 78500 Sartrouville
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=La+P%27tite+S%C5%93ur+Sartrouville)[Ses bières sur Untappd](https://untappd.com/search?q=La+P%27tite+S%C5%93ur&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 28 40 12 52](tel:+33628401252)
> - [Site de la brasserie](http://www.laptitesoeur.com/)
> - Lu sur [destination-yvelines.fr](https://www.destination-yvelines.fr/en/farms-pick-your-own-and-gourmet-shops/la-ptite-soeur-2) le 29 octobre 2026. Lu sur [laptitesoeur.com](http://www.laptitesoeur.com/) le 29 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 4. O'Clock Brewing — fiche nouvelle

- n : (vide) → O'Clock Brewing
- c : (vide) → Bois-d'Arcy
- d : (vide) → 78
- lat : (vide) → 48.80095
- lon : (vide) → 2.0089
- km : (vide) → 404.7
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → La brasserie existe et brasse (site officiel, fiche Untappd « Official », microbrasserie créée en 2015). Le site invite à passer à la brasserie et donne des horaires d'ouverture, mais ne dit pas si on peut y acheter ou y boire. Une boutique en ligne existe, sans mention de retrait sur place.
- addr : (vide) → 3 rue Georges Méliès, 78390 Bois-d'Arcy
- src : (vide) → https://oclockbrewing.fr/contact/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 09 51 53 11 22
- contact.site : (vide) → https://oclockbrewing.fr/
- contact.source : (vide) → https://oclockbrewing.fr/contact/
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → accueil
- horaires.0.lun : (vide) → 16 h – 17 h 30
- horaires.0.mar : (vide) → 16 h – 17 h 30
- horaires.0.mer : (vide) → 16 h – 17 h 30
- horaires.0.jeu : (vide) → 16 h – 17 h 30
- horaires.0.ven : (vide) → 11 h – 18 h
- horaires.0.sam : (vide) → 11 h – 18 h
- horaires.0.source : (vide) → https://oclockbrewing.fr/contact/
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://oclockbrewing.fr/contact/ ; https://data.geopf.fr/geocodage/search?q=3+rue+Georges+M%C3%A9li%C3%A8s%2C+78390+Bois-d%27Arcy&limit=5

Extrait lu : « Passez nous voir à la brasserie pour découvrir nos recettes variées et goutues ! »

Choix du vérificateur : Catégorie 0 : un forum de 2019 parle d'une boutique avec dégustation ven.-sam., écarté (ancien). Horaires intitulés « Horaire d'ouverture » sur la page contact, rangés en accueil ; Cédric peut les écarter. Dimanche non écrit, donc absent. Types de bière non proposés : la boutique cite des styles mais la liste est partielle (24 sur 41). Source rouverte à la main le 29/10. Lien Untappd non repris : la page source ne le cite pas.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 23:50, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Maintenant
> - À 23 h 50 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : demain à 11 h.
> - Adresse
> - 3 rue Georges Méliès, 78390 Bois-d'Arcy
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=O%27Clock+Brewing&type=brewery)
> - Joindre la brasserie
> - [Appeler le 09 51 53 11 22](tel:+33951531122)
> - [Site de la brasserie](https://oclockbrewing.fr/)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | 16 h – 17 h 30
> - Mardi | 16 h – 17 h 30
> - Mercredi | 16 h – 17 h 30
> - Jeudi | 16 h – 17 h 30
> - Vendredi | 11 h – 18 h
> - Samedi | 11 h – 18 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [oclockbrewing.fr](https://oclockbrewing.fr/contact/) le 29 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 5. Brasserie Toussaint — fiche nouvelle

- n : (vide) → Brasserie Toussaint
- c : (vide) → Noisy-le-Roi
- d : (vide) → 78
- lat : (vide) → 48.84357
- lon : (vide) → 2.05737
- km : (vide) → 406.9
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Brasserie et brewpub au pied des cuves, avec une boutique de vente directe sur le même site.
- addr : (vide) → 2 avenue de l'Europe, 78590 Noisy-le-Roi
- src : (vide) → https://www.brasserietoussaint.com/restaurant/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 01 87 66 67 45
- contact.site : (vide) → https://www.brasserietoussaint.com
- contact.source : (vide) → https://www.brasserietoussaint.com/contact-2/
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → accueil
- horaires.0.mar : (vide) → 12 h – 14 h
- horaires.0.mer : (vide) → 12 h – 14 h
- horaires.0.jeu : (vide) → 12 h – 14 h, 17 h – 23 h
- horaires.0.ven : (vide) → 12 h – 14 h, 17 h – 23 h
- horaires.0.sam : (vide) → 12 h – 14 h, 17 h – 23 h
- horaires.0.source : (vide) → https://www.brasserietoussaint.com/restaurant/
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.brasserietoussaint.com/restaurant/ ; https://www.brasserietoussaint.com/contact-2/ ; https://data.geopf.fr/geocodage/search?q=2+avenue+de+l%27Europe%2C+78590+Noisy-le-Roi&limit=5

Extrait lu : « des bières fraîches, au pied même des cuves »

Choix du vérificateur : Lu via un résumé de WebFetch : l'extrait est à vérifier. Téléphone retenu : 01 87 66 67 45, lu sur la page contact. Le 06 98 96 60 04 sert aux réservations de plus de 8 personnes, écarté. Untappd https://untappd.com/BrasserieToussaint a été ouvert, c'est bien la page de la brasserie, mais il n'est pas repris dans contact parce que la page contact ne le porte pas. Ses styles sont lisibles, mais je n'ai pas relevé de bières nommées avec leur style : beers reste vide. La page boutique dit « Fermé jusqu'au 24 août », une date passée, donc les horaires de vente sont à revérifier. Les horaires du brewpub viennent d'un résumé anglais, sans passage français exact. Horaires de la boutique non saisis : la page porte encore « Fermé jusqu'au 24 août ». Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 23:50, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 23 h 50 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : demain à 12 h.
> - Adresse
> - 2 avenue de l'Europe, 78590 Noisy-le-Roi
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Toussaint&type=brewery)
> - Joindre la brasserie
> - [Appeler le 01 87 66 67 45](tel:+33187666745)
> - [Site de la brasserie](https://www.brasserietoussaint.com)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | 12 h – 14 h
> - Mercredi | 12 h – 14 h
> - Jeudi | 12 h – 14 h, 17 h – 23 h
> - Vendredi | 12 h – 14 h, 17 h – 23 h
> - Samedi | 12 h – 14 h, 17 h – 23 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserietoussaint.com](https://www.brasserietoussaint.com/restaurant/) le 29 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 6. Brasserie 2 l'Équipage — fiche nouvelle

- n : (vide) → Brasserie 2 l'Équipage
- c : (vide) → Bonnelles
- d : (vide) → 78
- lat : (vide) → 48.62509
- lon : (vide) → 2.02626
- km : (vide) → 387.5
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → faible
- note : (vide) → Le site de la brasserie propose le « Call & Collect » : on commande par téléphone et on retire sur place. Il ne parle ni de dégustation ni de vente directe, et sa page porte une mise à jour de février 2022 (source ancienne). Les horaires ne sont pas repris : le site (février 2022) et l'office de tourisme de Rambouillet se contredisent.
- addr : (vide) → 8 rue des Jacinthes Sauvages, 78830 Bonnelles
- src : (vide) → https://www.brasserie2lequipage.fr/old-index.php
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 78 46 91 98
- contact.source : (vide) → https://www.brasserie2lequipage.fr/old-index.php
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.brasserie2lequipage.fr/old-index.php ; https://data.geopf.fr/geocodage/search?q=8+rue+des+Jacinthes+Sauvages%2C+78830+Bonnelles&limit=5

Extrait lu : « CALL & COLLECT »

Choix du vérificateur : Seule ligne publiée par la brasserie : un portable (06 78 46 91 98), repris selon la règle du 21/10. Le site donne « 06.78.46.91.98 », l'office de Rambouillet le même numéro. Horaires écartés : le site donne mer. 10h-19h30 et sam. 13h-18h, l'office donne jeu. 19h-20h et sam. 13h-20h. Catégorie 2 en confiance faible parce que la page date de 2022 et que l'office parle d'une « boutique » sans précision. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 23:50, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement (à vérifier)
> - Adresse
> - 8 rue des Jacinthes Sauvages, 78830 Bonnelles
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+2+l%27%C3%89quipage+Bonnelles)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+2+l%27%C3%89quipage&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 78 46 91 98](tel:+33678469198)
> - Lu sur [brasserie2lequipage.fr](https://www.brasserie2lequipage.fr/old-index.php) le 29 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 7. Brasserie La Voisine — fiche nouvelle

- n : (vide) → Brasserie La Voisine
- c : (vide) → Villiers-Saint-Frédéric
- d : (vide) → 78
- lat : (vide) → 48.81558
- lon : (vide) → 1.87868
- km : (vide) → 411.2
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Brasserie artisanale bio avec une boutique ouverte trois demi-journées par semaine. Le site mentionne une guinguette les vendredis soir, sans dire ce qu'on y consomme.
- addr : (vide) → 13 rue de la Gare, 78640 Villiers-Saint-Frédéric
- src : (vide) → https://brasserielavoisine.com
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 84 77 32 84
- contact.site : (vide) → https://brasserielavoisine.com
- contact.source : (vide) → https://brasserielavoisine.com
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → vente
- horaires.0.jeu : (vide) → 16 h – 19 h
- horaires.0.ven : (vide) → 16 h – 19 h
- horaires.0.sam : (vide) → 10 h – 13 h
- horaires.0.source : (vide) → https://brasserielavoisine.com
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://brasserielavoisine.com ; https://data.geopf.fr/geocodage/search?q=13+rue+de+la+Gare%2C+78640+Villiers-Saint-Fr%C3%A9d%C3%A9ric&limit=5

Extrait lu : « Jeudi & vendredi 16h – 19h »

Choix du vérificateur : Lu via un résumé de WebFetch. Le site dit seulement qu'une boutique existe, avec ses horaires, et qu'on peut commander en ligne. Rien sur la dégustation sur place. La guinguette est citée sans détail : catégorie 2 plutôt que 1, faute de lecture. Téléphone 06 84 77 32 84 : un mobile, mais la seule ligne publiée par la brasserie (règle du 21/10). Je n'ai trouvé aucune page Untappd. Le site ne cite aucun nom ni style de bière : beers reste vide. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 23:50, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 23 h 50 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : demain à 16 h.
> - Adresse
> - 13 rue de la Gare, 78640 Villiers-Saint-Frédéric
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+La+Voisine&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 84 77 32 84](tel:+33684773284)
> - [Site de la brasserie](https://brasserielavoisine.com)
> - Horaires
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | 16 h – 19 h
> - Vendredi | 16 h – 19 h
> - Samedi | 10 h – 13 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserielavoisine.com](https://brasserielavoisine.com) le 29 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

Empreinte du lot : 22fa31cdceab
