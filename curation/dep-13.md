# Lot dep-13 — les Bouches-du-Rhône (S343)

Ce lot ajoute **17 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 70 candidats = 17 proposés + 53 non proposés (tableau ci-dessous).
Catégories proposées : 5 « acheter et consommer », 4 « acheter seulement », 0 « pas de vente », 8 « à confirmer ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| HEINEKEN ENTREPRISE (`sirene:414842062`) | Heineken (usine de La Valentine) : aucun accueil ni vente au public |
| KRONENBOURG SUPPLY COMPANY (`sirene:528365125`) | Kronenbourg Supply Company : entité logistique, aucun lieu ouvert au public |
| SMBC (`sirene:910831221`) | SMBC : deux recherches, rien sous ce nom |
| Entreprise individuelle (`personne:1`) | entreprise sans nom ni adresse : rien à chercher |
| MINOT BRASSERIE (`sirene:812035277`) | Minot Brasserie : presse et annuaire seuls, adresses contradictoires, pas de site : à relancer |
| BRASSERIE SAPRISTI (`sirene:893673293`) | Brasserie Sapristi : fiches d'entreprise seules, contradictoires |
| BRASSERIE DES CAILLOUX (`sirene:907702187`) | Brasserie des Cailloux : deux recherches, aucun résultat |
| Entreprise individuelle (`personne:2`) | entreprise sans nom ni adresse : rien à chercher |
| GOUGAM DC (`sirene:910922434`) | Gougam DC : deux recherches, aucun résultat |
| BRASSERIE ARTISANALE ARLESIENNE (`sirene:812944361`) | Brasserie artisanale arlésienne (Saint-Martin-de-Crau) : un office de tourisme de 2022 et un reportage ; ni site ni Untappd ; ni vente ni dégustation écrites : à relancer (site ou page de la brasserie) |
| SNOWBALL EFFECT (`sirene:953664919`) | Snowball Effect : trois recherches, aucune page à ce nom |
| LA SOURCE (`sirene:938901188`) | La Source (Marseille) : aucune page ne nomme une brasserie de ce nom ; adresse de la Fabrique de la Pomme |
| SANS PRESSION (`sirene:839988813`) | Sans Pression (La Roque-d'Anthéron) : un annuaire d'entreprises et un menu de bar seuls ; à relancer (marque BYUP) |
| LES 9S BRASSERIE (`sirene:890663784`) | Les 9S Brasserie : deux recherches, aucune page à ce nom |
| LOWA BREWING (`sirene:108567173`) | Lowa Brewing : deux recherches, aucune brasserie de ce nom |
| Entreprise individuelle (`personne:3`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE ARTISANALE BIO (`sirene:814299228`) | Brasserie artisanale bio (Aix) : nom générique, rien à cette adresse |
| Entreprise individuelle (`personne:4`) | entreprise sans nom ni adresse : rien à chercher |
| CARA BREW (`sirene:941082125`) | Cara Brew : quatre recherches, aucune trace |
| BRASSERIE WOOD (`sirene:937486744`) | Brasserie Wood : trois recherches, aucune trace |
| LES BAUX APEROS (`sirene:923550362`) | Les Baux Apéros : une recherche, rien ; plutôt une activité d'apéritif |
| Entreprise individuelle (`personne:5`) | entreprise sans nom ni adresse : rien à chercher |
| L ETANG DE BIERE (`sirene:830405338`) | L'Étang de Bière : trois recherches, aucune page |
| Entreprise individuelle (`personne:6`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:8`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE DE SULAUZE (`sirene:788996437`) | Brasserie de Sulauze : offices et annuaires seuls, citation exacte non obtenue, téléphones contradictoires : à relancer |
| Entreprise individuelle (`personne:9`) | entreprise sans nom ni adresse : rien à chercher |
| LA BRASSERIE SAINT MARCAISE (`sirene:951206523`) | La Brasserie Saint Marcaise : deux recherches, aucune page |
| ARGUIN DISTRIBUTION (`sirene:523673796`) | Arguin Distribution : un office seul, la bière n'y est pas établie |
| GAUBEER (`sirene:985255199`) | Gaubeer : une recherche, aucun résultat |
| Entreprise individuelle (`personne:10`) | Les 2 Beu : une recherche, aucune trace |
| LE BRASSEUR DES ALPILLES (`sirene:892923400`) | Le Brasseur des Alpilles : aucune page à ce nom, adresse différente de Soif de Provence |
| Entreprise individuelle (`personne:11`) | Kataclysm : un article de presse seul : à relancer (fiche de l'office de tourisme) |
| L'ALETERNATIVE (`sirene:938752896`) | L'Aleternative : quatre recherches, aucun résultat |
| Entreprise individuelle (`personne:12`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:13`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE DES MALTFAITEURS (`sirene:838057909`) | Brasserie des Maltfaiteurs : un podcast et un annuaire seuls |
| Brasserie de la Plaine (`node/11773961719`) | Brasserie de la Plaine : même lieu que sirene:792379919, une seule fiche |
| Comptoir Longchamp (`node/3535313744`) | Comptoir Longchamp : rien qui corresponde |
| Le Français (`node/4591323692`) | Le Français (Le Rove) : aucun établissement de ce nom |
| Au Bord de l'Eau (`node/4591854684`) | Au Bord de l'Eau (Le Rove) : aucun établissement de ce nom |
| Au petit Bonheur (`node/4604999332`) | Au petit Bonheur (Marignane) : un restaurant, rien n'indique qu'il brasse |
| Au Bureau (`node/6343044522`) | Au Bureau (Martigues) : un pub de chaîne, qui ne brasse pas |
| La Mado (`node/6501882468`) | La Mado (Aix) : un bar-restaurant, rien n'indique qu'il brasse |
| Brasserie Le Thermal (`node/6904731677`) | Brasserie Le Thermal : une brasserie-restaurant, sans brassage |
| Les deux font la bière (`node/7904653675`) | Les deux font la bière (Aubagne) : un office seul, site repris par un tiers : à relancer |
| La Brasserie des congrès (`node/7920421686`) | La Brasserie des Congrès : un restaurant, sans brassage |
| L'Hacienda (`node/9576060547`) | L'Hacienda : un bar-restaurant, annuaires seuls |
| Courtepaille (`way/101244201`) | Courtepaille : chaîne de restaurants |
| Braserie Boh'M (`way/136064476`) | Braserie Boh'M : restauration rapide, rien sur la bière |
| Le Crillon (`way/154604606`) | Le Crillon : introuvable |
| Brasserie des Milles (`way/88763655`) | Brasserie des Milles : site vide, fiche de l'office illisible (404) : à relancer |
| La Route des Bières (`way/92755903`) | La Route des Bières : un bar à bières qui ne brasse pas |

## Les fiches proposées

## Lot dep-13 — 0 proposition(s), 17 fiche(s) nouvelle(s)

### 1. Brass.Art — fiche nouvelle

- n : (vide) → Brass.Art
- c : (vide) → Velaux
- d : (vide) → 13
- lat : (vide) → 43.51488
- lon : (vide) → 5.23301
- km : (vide) → 243.1
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Le site de la brasserie parle d'un brew pub (« en pression et en fût ») et donne « Ouvert : Jeudi et Vendredi de 17h à 22h », sans dire ce qu'on y fait : vente et consommation sur place non écrites.
- addr : (vide) → 5 rue André Marie Ampère, 13880 Velaux
- src : (vide) → https://brass-art.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 07 11 68 64
- contact.site : (vide) → https://brass-art.fr/
- contact.source : (vide) → https://brass-art.fr/
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://brass-art.fr/ ; https://data.geopf.fr/geocodage/search?q=5+rue+Andr%C3%A9+Marie+Amp%C3%A8re%2C+13880+Velaux&limit=5

Extrait lu : « Ouvert : Jeudi et Vendredi de 17h à 22h. »

Choix du vérificateur : Catégorie 0 : on ne déduit pas. Horaires laissés dans la note. Seule ligne publiée, un mobile (règle du 21/10). Pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:48, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 5 rue André Marie Ampère, 13880 Velaux
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brass.Art+Velaux)[Ses bières sur Untappd](https://untappd.com/search?q=Brass.Art&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 07 11 68 64](tel:+33607116864)
> - [Site de la brasserie](https://brass-art.fr/)
> - Lu sur [brass-art.fr](https://brass-art.fr/) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 2. Aquae Maltae — fiche nouvelle

- n : (vide) → Aquae Maltae
- c : (vide) → Aix-en-Provence
- d : (vide) → 13
- lat : (vide) → 43.54137
- lon : (vide) → 5.40612
- km : (vide) → 242.7
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Brasserie artisanale d'Aix-en-Provence. Le site officiel annonce un bar (horaires du bar publiés), une boutique en ligne et une page de visites ; les visites du samedi sont suspendues. Pas de page Untappd trouvée.
- addr : (vide) → Rue de l'Ancienne Minoterie, Aix-en-Provence
- src : (vide) → https://www.aquaemaltae.com/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 04 42 21 37 03
- contact.site : (vide) → https://www.aquaemaltae.com/
- contact.source : (vide) → https://www.aquaemaltae.com/
- contact.verifieLe : (vide) → 2026-10-27
- horaires.0.nature : (vide) → accueil
- horaires.0.lun : (vide) → 16 h – minuit
- horaires.0.mar : (vide) → 16 h – minuit
- horaires.0.mer : (vide) → 16 h – minuit
- horaires.0.jeu : (vide) → 16 h – minuit
- horaires.0.ven : (vide) → 16 h – minuit
- horaires.0.sam : (vide) → 16 h – minuit
- horaires.0.remarque : (vide) → Ouvert en général du lundi au samedi de 16h à 0h.
- horaires.0.source : (vide) → https://www.aquaemaltae.com/
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://www.aquaemaltae.com/ ; https://data.geopf.fr/geocodage/search?q=Aix-en-Provence&type=municipality&limit=5

Extrait lu : « Horaires du bar : Lundi-Samedi 16h-00h »

Choix du vérificateur : Catégorie 1 d'après la mention du bar sur le site officiel, d'où la confiance moyenne : le site ne décrit pas la dégustation sur place. Seul numéro publié par la brasserie : 04 42 21 37 03. Horaires du bar repris en accueil ; la page dit « en général ». Pas de bloc vente : le site ne donne pas d'horaires de vente. Adresse sans numéro, comme sur le site ; OSM donne le 50.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:48, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 16 h 48 (heure de Paris), accueil du public : ouvert jusqu’à minuit selon les créneaux, sous réserve de la remarque ci-dessous.
> - Adresse
> - Rue de l'Ancienne Minoterie, Aix-en-Provence
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Aquae+Maltae&type=brewery)
> - Joindre la brasserie
> - [Appeler le 04 42 21 37 03](tel:+33442213703)
> - [Site de la brasserie](https://www.aquaemaltae.com/)
> - Horaires
> - À savoir : Ouvert en général du lundi au samedi de 16h à 0h.
> - Horaires d’accueil du public
> - Lundi | 16 h – minuit
> - Mardi | 16 h – minuit
> - Mercredi | 16 h – minuit
> - Jeudi | 16 h – minuit
> - Vendredi | 16 h – minuit
> - Samedi | 16 h – minuit
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [aquaemaltae.com](https://www.aquaemaltae.com/) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 3. Microbrasserie de la Crau — fiche nouvelle

- n : (vide) → Microbrasserie de la Crau
- c : (vide) → Istres
- d : (vide) → 13
- lat : (vide) → 43.53214
- lon : (vide) → 4.95785
- km : (vide) → 238.8
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → La brasserie existe (site officiel, adresse et téléphone publiés ; fiche de tourisme : créée en mars 2020, à Entressen). Rien de lu sur la vente ni l'accueil sur place : les pages Contact et « Où trouver nos produits » n'en parlent pas.
- addr : (vide) → Mas Rey, chemin du Mas de Chauvet, 13118 Istres
- src : (vide) → https://microbrasseriedelacrau.com/index.php/contact/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 06 78 88 52 09
- contact.site : (vide) → https://microbrasseriedelacrau.com/
- contact.source : (vide) → https://microbrasseriedelacrau.com/index.php/contact/
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://microbrasseriedelacrau.com/index.php/contact/ ; https://data.geopf.fr/geocodage/search?q=Istres&type=municipality&limit=5

Extrait lu : « Chemin du mas de Chauvet »

Choix du vérificateur : Seule ligne publiée par la brasserie : un portable, 06 78 88 52 09, repris. Aucun horaire (la fiche de tourisme dit seulement « tous les jours », sans heures). Pas de lien Untappd trouvé. Entressen est un quartier d'Istres (code postal 13118, commune du registre).

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:48, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - Mas Rey, chemin du Mas de Chauvet, 13118 Istres
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Microbrasserie+de+la+Crau+Istres)[Ses bières sur Untappd](https://untappd.com/search?q=Microbrasserie+de+la+Crau&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 78 88 52 09](tel:+33678885209)
> - [Site de la brasserie](https://microbrasseriedelacrau.com/)
> - Lu sur [microbrasseriedelacrau.com](https://microbrasseriedelacrau.com/index.php/contact/) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 4. Le Craft — fiche nouvelle

- n : (vide) → Le Craft
- c : (vide) → La Ciotat
- d : (vide) → 13
- lat : (vide) → 43.1751
- lon : (vide) → 5.6075
- km : (vide) → 286.1
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Microbrasserie et taproom indépendante : 8 becs pression en rotation et une cave de plus de 50 références de bières craft. Source : guide de l'office de tourisme (fiche MyProvence), sans site officiel trouvé. Les horaires y sont saisonniers (« en attente de validation »), donc non repris.
- addr : (vide) → 8 rue Maréchal Foch, 13600 La Ciotat
- src : (vide) → https://www.myprovence.fr/les-guides/loisirs/artisans-et-producteurs/la-ciotat/microbrasserie-taproom-independante-ciotadenne-le-craft
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://www.myprovence.fr/les-guides/loisirs/artisans-et-producteurs/la-ciotat/microbrasserie-taproom-independante-ciotadenne-le-craft ; https://data.geopf.fr/geocodage/search?q=8+rue+Mar%C3%A9chal+Foch%2C+13600+La+Ciotat&limit=5

Extrait lu : « Avec les 8 becs pression en constante rotation »

Choix du vérificateur : Pas de téléphone publié (la fiche ne donne qu'une adresse e-mail, non reprise). Pas de site officiel ni de page Untappd trouvés en deux recherches. Horaires écartés : « Eté » et « Basse saison » sans dates de période, programme « en attente de validation ». Extrait court : fragment exact de la phrase lue. La consommation sur place ressort de « taproom » et de « savourer ». Confiance moyenne : source d'office de tourisme seule.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:48, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 8 rue Maréchal Foch, 13600 La Ciotat
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Le+Craft+La+Ciotat)[Ses bières sur Untappd](https://untappd.com/search?q=Le+Craft&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [myprovence.fr](https://www.myprovence.fr/les-guides/loisirs/artisans-et-producteurs/la-ciotat/microbrasserie-taproom-independante-ciotadenne-le-craft) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 5. Brasserie de la Plaine — fiche nouvelle

- n : (vide) → Brasserie de la Plaine
- c : (vide) → Marseille
- d : (vide) → 13
- lat : (vide) → 43.29346
- lon : (vide) → 5.38631
- km : (vide) → 269.5
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Brasserie-boutique : la boutique vend les bières en bouteille et la bière à la pression à emporter (on vient avec une bouteille en verre réutilisable). Aucun bar ni consommation sur place n'est mentionné sur le site. Les ateliers de brassage et de dégustation sont des cours, pas un accueil ouvert. Un site de production distinct existe à Marseille 11e, réservé aux professionnels.
- addr : (vide) → 49 rue des 3 frères Barthélemy, 13006 Marseille
- src : (vide) → https://www.brasseriedelaplaine.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 04 91 47 32 54
- contact.site : (vide) → https://www.brasseriedelaplaine.fr/
- contact.source : (vide) → https://www.brasseriedelaplaine.fr/
- contact.verifieLe : (vide) → 2026-10-27
- horaires.0.nature : (vide) → vente
- horaires.0.mer : (vide) → 15 h – 19 h
- horaires.0.jeu : (vide) → 15 h – 19 h
- horaires.0.ven : (vide) → 15 h – 19 h
- horaires.0.sam : (vide) → 15 h – 19 h
- horaires.0.source : (vide) → https://www.brasseriedelaplaine.fr/
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://www.brasseriedelaplaine.fr/ ; https://data.geopf.fr/geocodage/search?q=49+rue+des+3+fr%C3%A8res+Barth%C3%A9lemy%2C+13006+Marseille&limit=5

Extrait lu : « boutique ouverte du mercredi au samedi de 15h00 à 19h00. »

Choix du vérificateur : Téléphone de la boutique retenu ; ceux des professionnels écartés. Le point OSM de La Penne-sur-Huveaune est le même lieu. Pas de lien Untappd sur la page : non repris.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:48, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 16 h 48 (heure de Paris), vente : la source ne dit pas les heures de ce jour.
> - Adresse
> - 49 rue des 3 frères Barthélemy, 13006 Marseille
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+de+la+Plaine&type=brewery)
> - Joindre la brasserie
> - [Appeler le 04 91 47 32 54](tel:+33491473254)
> - [Site de la brasserie](https://www.brasseriedelaplaine.fr/)
> - Horaires
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | 15 h – 19 h
> - Jeudi | 15 h – 19 h
> - Vendredi | 15 h – 19 h
> - Samedi | 15 h – 19 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriedelaplaine.fr](https://www.brasseriedelaplaine.fr/) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 6. Brasserie Artisanale de Provence — fiche nouvelle

- n : (vide) → Brasserie Artisanale de Provence
- c : (vide) → Rousset
- d : (vide) → 13
- lat : (vide) → 43.48181
- lon : (vide) → 5.62007
- km : (vide) → 253.3
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Le site de la brasserie annonce une dégustation à la pression au brewpub et une vente directe à l'espace boutique. Le brewpub est ouvert au public du mardi au vendredi, de 16 h à 22 h.
- addr : (vide) → La Marnière, ZI, Avenue Olivier Perroy, 13790 Rousset
- src : (vide) → https://bap-13.com/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 09 70 92 50 09
- contact.site : (vide) → https://bap-13.com/
- contact.source : (vide) → https://bap-13.com/
- contact.verifieLe : (vide) → 2026-10-27
- horaires.0.nature : (vide) → accueil
- horaires.0.mar : (vide) → 16 h – 22 h
- horaires.0.mer : (vide) → 16 h – 22 h
- horaires.0.jeu : (vide) → 16 h – 22 h
- horaires.0.ven : (vide) → 16 h – 22 h
- horaires.0.source : (vide) → https://bap-13.com/
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://bap-13.com/ ; https://data.geopf.fr/geocodage/search?q=Rousset&type=municipality&limit=5

Extrait lu : « Dégustation à la pression au brewpub et vente directe à l'espace boutique à la Brasserie Artisanale de Provence (BAP). »

Choix du vérificateur : Seul numéro publié par la brasserie. Horaires du brewpub seuls (accueil) ; ceux des professionnels écartés. Lien Untappd non repris : il n'est pas sur le site.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:48, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 16 h 48 (heure de Paris), accueil du public : ouvert jusqu’à 22 h, d’après les horaires publiés.
> - Adresse
> - La Marnière, ZI, Avenue Olivier Perroy, 13790 Rousset
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Artisanale+de+Provence&type=brewery)
> - Joindre la brasserie
> - [Appeler le 09 70 92 50 09](tel:+33970925009)
> - [Site de la brasserie](https://bap-13.com/)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | 16 h – 22 h
> - Mercredi | 16 h – 22 h
> - Jeudi | 16 h – 22 h
> - Vendredi | 16 h – 22 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [bap-13.com](https://bap-13.com/) le 27 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 7. La Petite Aixoise — fiche nouvelle

- n : (vide) → La Petite Aixoise
- c : (vide) → Saint-Cannat
- d : (vide) → 13
- lat : (vide) → 43.6143
- lon : (vide) → 5.3178
- km : (vide) → 233.4
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie artisanale à Saint-Cannat, présente sur Untappd et sur la fiche de l'office de tourisme d'Aix. Son site officiel (lapetiteaixoise.fr) répondait par une erreur 500 : la vente sur place n'est pas établie.
- addr : (vide) → 705 avenue de l'Europe, 13760 Saint-Cannat
- src : (vide) → https://www.myprovence.fr/les-guides/loisirs/artisans-et-producteurs/saint-cannat/la-petite-aixoise
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → http://lapetiteaixoise.fr
- contact.source : (vide) → https://www.myprovence.fr/les-guides/loisirs/artisans-et-producteurs/saint-cannat/la-petite-aixoise
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://www.myprovence.fr/les-guides/loisirs/artisans-et-producteurs/saint-cannat/la-petite-aixoise ; https://data.geopf.fr/geocodage/search?q=705+avenue+de+l%27Europe%2C+13760+Saint-Cannat&limit=5

Extrait lu : « une bière artisanale qui se veut locale, 100 % naturelle et sans aucun additif de synthèse »

Choix du vérificateur : Téléphone 06 30 34 68 56 écarté : office seulement. Horaires écartés : la fiche de l'office donne des créneaux mais ne dit pas que la bière s'y vend, et le site officiel n'a pas pu être lu pour les confirmer. Page Untappd https://untappd.com/LaPetiteAixoise vue dans les résultats de recherche et lue via un résumé, adresse non précisée : lien non proposé sans ouverture directe. Bières non reprises (non lues en entier sur Untappd).

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:48, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 705 avenue de l'Europe, 13760 Saint-Cannat
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=La+Petite+Aixoise+Saint-Cannat)[Ses bières sur Untappd](https://untappd.com/search?q=La+Petite+Aixoise&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](http://lapetiteaixoise.fr)
> - Lu sur [myprovence.fr](https://www.myprovence.fr/les-guides/loisirs/artisans-et-producteurs/saint-cannat/la-petite-aixoise) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 8. Bulles de Provence — fiche nouvelle

- n : (vide) → Bulles de Provence
- c : (vide) → Aix-en-Provence
- d : (vide) → 13
- lat : (vide) → 43.5877
- lon : (vide) → 5.39559
- km : (vide) → 237.5
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie artisanale familiale à Puyricard, site officiel en ligne. La vente sur place n'est pas établie : le site ne mentionne ni boutique ni dégustation (il propose de réserver une tireuse et de revendre les bières). Les horaires et le téléphone ne sont publiés que par l'office de tourisme, non repris.
- addr : (vide) → 15 chemin de la Valentine, 13540 Puyricard
- src : (vide) → https://bullesdeprovence.com/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://bullesdeprovence.com/
- contact.source : (vide) → https://bullesdeprovence.com/
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://bullesdeprovence.com/ ; https://data.geopf.fr/geocodage/search?q=15+chemin+de+la+Valentine%2C+13540+Puyricard&limit=5

Extrait lu : « Découvrez Bulles de Provence, une brasserie artisanale familiale alliant passion pour la bière, écologie et innovation. »

Choix du vérificateur : Téléphone 06 11 07 86 43 écarté : publié seulement par l'office de tourisme d'Aix (précédent S342), absent du site de la brasserie. Horaires écartés : seul l'office les donne, et ils ne disent pas qu'on peut y acheter. Untappd : la marque a des bières sur untappd.com, mais je n'ai pas ouvert la page de la brasserie, donc pas de lien ni de bières. Adresse lue sur bullesdeprovence.com/contact/, qui n'est pas la page src. Commune Aix-en-Provence prise du paquet SIRENE (Puyricard en dépend).

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:48, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 15 chemin de la Valentine, 13540 Puyricard
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Bulles+de+Provence+Aix-en-Provence)[Ses bières sur Untappd](https://untappd.com/search?q=Bulles+de+Provence&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://bullesdeprovence.com/)
> - Lu sur [bullesdeprovence.com](https://bullesdeprovence.com/) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 9. Brasserie Zoumaï — fiche nouvelle

- n : (vide) → Brasserie Zoumaï
- c : (vide) → Marseille
- d : (vide) → 13
- lat : (vide) → 43.28628
- lon : (vide) → 5.38661
- km : (vide) → 270.2
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Brasserie et brewpub du cours Gouffé ; la page « Où nous trouver » de son site donne l'ouverture du lundi au samedi, de 17 h à minuit.
- addr : (vide) → 7 cours Gouffé, 13006 Marseille
- src : (vide) → https://www.brasseriezoumai.fr/nous-trouver
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://www.brasseriezoumai.fr
- contact.source : (vide) → https://www.brasseriezoumai.fr/nous-trouver
- contact.verifieLe : (vide) → 2026-10-27
- horaires.0.nature : (vide) → accueil
- horaires.0.lun : (vide) → 17 h – minuit
- horaires.0.mar : (vide) → 17 h – minuit
- horaires.0.mer : (vide) → 17 h – minuit
- horaires.0.jeu : (vide) → 17 h – minuit
- horaires.0.ven : (vide) → 17 h – minuit
- horaires.0.sam : (vide) → 17 h – minuit
- horaires.0.source : (vide) → https://www.brasseriezoumai.fr/nous-trouver
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://www.brasseriezoumai.fr/nous-trouver ; https://data.geopf.fr/geocodage/search?q=7+cours+Gouff%C3%A9%2C+13006+Marseille&limit=5

Extrait lu : « Brasserie artisanale - Brewpub »

Choix du vérificateur : Page d'accueil injoignable depuis le conteneur (429) : lecture sur « Où nous trouver ». Confiance moyenne : la page dit « brewpub », sans détailler la vente. Téléphone non repris : il n'est pas sur cette page. Pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:48, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 16 h 48 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 17 h.
> - Adresse
> - 7 cours Gouffé, 13006 Marseille
> - Pas encore dans la fiche : son téléphone et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Zouma%C3%AF+Marseille)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Zouma%C3%AF&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://www.brasseriezoumai.fr)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | 17 h – minuit
> - Mardi | 17 h – minuit
> - Mercredi | 17 h – minuit
> - Jeudi | 17 h – minuit
> - Vendredi | 17 h – minuit
> - Samedi | 17 h – minuit
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriezoumai.fr](https://www.brasseriezoumai.fr/nous-trouver) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 10. Keg & Can Brewpub — fiche nouvelle

- n : (vide) → Keg & Can Brewpub
- c : (vide) → Marseille
- d : (vide) → 13
- lat : (vide) → 43.24558
- lon : (vide) → 5.4262
- km : (vide) → 275.3
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Brewpub et micro-brasserie du quartier du Redon (Marseille 9e) : le site officiel décrit un lieu où l'on déguste des bières artisanales brassées sur place, avec une carte food. Les bières craft du moment se vendent aussi à emporter en canette de 50 cl. Horaires publiés sur la page contact (fermé ou non indiqué lundi et dimanche). Aucun lien Untappd publié par la brasserie : les bières ne sont donc pas listées.
- addr : (vide) → 314 Boulevard du Redon, 13009 Marseille
- src : (vide) → https://kegandcan.fr/le-brewpub-micro-brasserie-keg-and-can-marseille/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 09 53 40 24 42
- contact.site : (vide) → https://kegandcan.fr/
- contact.source : (vide) → https://kegandcan.fr/contact/
- contact.verifieLe : (vide) → 2026-10-27
- horaires.0.nature : (vide) → accueil
- horaires.0.mar : (vide) → 17 h 30 – 23 h
- horaires.0.mer : (vide) → 17 h 30 – 23 h
- horaires.0.jeu : (vide) → 17 h 30 – 23 h
- horaires.0.ven : (vide) → 17 h 30 – 23 h 30
- horaires.0.sam : (vide) → 17 h 30 – 23 h 30
- horaires.0.source : (vide) → https://kegandcan.fr/contact/
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://kegandcan.fr/le-brewpub-micro-brasserie-keg-and-can-marseille/ ; https://kegandcan.fr/contact/ ; https://data.geopf.fr/geocodage/search?q=314+Boulevard+du+Redon%2C+13009+Marseille&limit=5

Extrait lu : « Nous avons à cœur de créer un lieu où chacun peut non seulement déguster une large sélection de bières artisanales, mais aussi en apprendre davantage sur le processus de brassage et la diversité des styles de bière. »

Choix du vérificateur : Un seul numéro publié sur le site de la brasserie (page contact, page brewpub, accueil) : 09 53 40 24 42, retenu. Pas de mobile ni d'autre ligne. Catégorie 1 : dégustation sur place (page brewpub) et vente à emporter « Toutes nos bières craft du moment sont disponibles à emporter en canette de 50cl. » (page https://kegandcan.fr/nos-bieres-artisanales-craft-marseille/, qui n'est pas la page src). Le nom du maître brasseur, écrit sur la page, n'est repris ni dans la note ni dans l'extrait. Les horaires ne disent rien du lundi et du dimanche : ces jours sont laissés absents, pas déclarés fermés. Pas d'Untappd trouvé (recherche web + aucun lien sur le site) : contact.untappd omis, beers vide.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:48, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 16 h 48 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 17 h 30.
> - Adresse
> - 314 Boulevard du Redon, 13009 Marseille
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Keg+%26+Can+Brewpub&type=brewery)
> - Joindre la brasserie
> - [Appeler le 09 53 40 24 42](tel:+33953402442)
> - [Site de la brasserie](https://kegandcan.fr/)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | 17 h 30 – 23 h
> - Mercredi | 17 h 30 – 23 h
> - Jeudi | 17 h 30 – 23 h
> - Vendredi | 17 h 30 – 23 h 30
> - Samedi | 17 h 30 – 23 h 30
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [kegandcan.fr](https://kegandcan.fr/le-brewpub-micro-brasserie-keg-and-can-marseille/) le 27 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 11. Brasserie Artisanale des Alpilles — fiche nouvelle

- n : (vide) → Brasserie Artisanale des Alpilles
- c : (vide) → Eygalières
- d : (vide) → 13
- lat : (vide) → 43.78715
- lon : (vide) → 4.95429
- km : (vide) → 210.5
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Microbrasserie bio d'Eygalières. Son site affiche des « horaires d'ouvertures » (lundi à vendredi, 10 h – 12 h 30 et 14 h – 18 h ; samedi sur rendez-vous) et une boutique en ligne, sans dire ce qu'on peut faire sur place.
- addr : (vide) → 2874 route de la Gare, 13810 Eygalières
- src : (vide) → https://bieredesalpilles.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 07 60 60 66 22
- contact.site : (vide) → https://bieredesalpilles.fr/
- contact.source : (vide) → https://bieredesalpilles.fr/
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://bieredesalpilles.fr/ ; https://data.geopf.fr/geocodage/search?q=2874+route+de+la+Gare%2C+13810+Eygali%C3%A8res&limit=5

Extrait lu : « Une microbrasserie provençale à Eygalières »

Choix du vérificateur : Catégorie 0 : la vente sur place n'est pas écrite ; horaires laissés dans la note, faute de savoir ce qu'ils couvrent. Seule ligne publiée par la brasserie, un mobile : retenue (règle du 21/10). Pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:48, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 2874 route de la Gare, 13810 Eygalières
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Artisanale+des+Alpilles+Eygali%C3%A8res)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Artisanale+des+Alpilles&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 07 60 60 66 22](tel:+33760606622)
> - [Site de la brasserie](https://bieredesalpilles.fr/)
> - Lu sur [bieredesalpilles.fr](https://bieredesalpilles.fr/) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 12. Brasserie l'Amista — fiche nouvelle

- n : (vide) → Brasserie l'Amista
- c : (vide) → Noves
- d : (vide) → 13
- lat : (vide) → 43.87863
- lon : (vide) → 4.90473
- km : (vide) → 200
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Brasserie artisanale à Noves avec espace boutique : vente sur place, visite de la brasserie sur réservation. D'après la fiche du comité régional de tourisme (page d'office, donc confiance moyenne) ; site officiel non lu (erreur 503) et sans page Untappd trouvée. Consommation sur place non mentionnée.
- addr : (vide) → 168 avenue Agricol Viala, Les 3 Vergers, 13550 Noves
- src : (vide) → https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/brasserie-lamista-noves-fr-4713677/
- coordPrecision : (vide) → address
- beers : (vide) → []
- horaires.0.nature : (vide) → vente
- horaires.0.jeu : (vide) → 15 h – 18 h
- horaires.0.ven : (vide) → 15 h – 18 h
- horaires.0.remarque : (vide) → Ouverture aussi le samedi en saison, de 9h30 à 12h30 (dates de la saison non précisées). Visite sur réservation.
- horaires.0.source : (vide) → https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/brasserie-lamista-noves-fr-4713677/
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/brasserie-lamista-noves-fr-4713677/ ; https://data.geopf.fr/geocodage/search?q=168+avenue+Agricol+Viala%2C+Les+3+Vergers%2C+13550+Noves&limit=5

Extrait lu : « Brasserie artisanale, proposant de la vente sur place (espace boutique). »

Choix du vérificateur : Téléphones non repris : deux mobiles (06 34 62 00 41 et 06 19 30 03 43) publiés seulement par l'office. Pas de site officiel lu (brasserielamista.fr en 503 ; l'adresse contact@brasserielamista.fr n'est qu'un courriel sur myprovence.fr). Horaires : jeudi et vendredi 15h-18h toute l'année retenus ; le samedi « en saison » 9h30-12h30 va en remarque, faute de dates de saison. Catégorie 2 car vente sur place dite, consommation non dite.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:48, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 16 h 48 (heure de Paris), vente : la source ne dit pas les heures de ce jour.
> - Adresse
> - 168 avenue Agricol Viala, Les 3 Vergers, 13550 Noves
> - Pas encore dans la fiche : son téléphone et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+l%27Amista+Noves)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+l%27Amista&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Horaires
> - À savoir : Ouverture aussi le samedi en saison, de 9h30 à 12h30 (dates de la saison non précisées). Visite sur réservation.
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | 15 h – 18 h
> - Vendredi | 15 h – 18 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [provence-alpes-cotedazur.com](https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/brasserie-lamista-noves-fr-4713677/) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 13. Cap Marca — fiche nouvelle

- n : (vide) → Cap Marca
- c : (vide) → Arles
- d : (vide) → 13
- lat : (vide) → 43.59672
- lon : (vide) → 4.64509
- km : (vide) → 231.2
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie artisanale installée dans un mas camarguais au bord du Petit Rhône (Parc naturel de Camargue) ; son site invite à venir découvrir ses bières et autres produits locaux, avec prise de rendez-vous. Vente ou dégustation sur place non dites, horaires non publiés : ce qu'on peut y faire n'est pas établi.
- addr : (vide) → D572N, Route de Saint-Gilles, 13200 Arles
- src : (vide) → https://capmarca.fr
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 04 66 84 18 13
- contact.site : (vide) → https://capmarca.fr
- contact.source : (vide) → https://capmarca.fr
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://capmarca.fr ; https://data.geopf.fr/geocodage/search?q=Arles&type=municipality&limit=5

Extrait lu : « Nous vous invitons à venir découvrir nos bières et autres produits locaux au sein de notre brasserie installée »

Choix du vérificateur : Téléphone retenu : 04 66 84 18 13, publié sur le site de la brasserie. L'office d'Arles donne des horaires lun-ven 8h-12h : non repris (office seulement, pas sur le site). Aucune page Untappd lue.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:48, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - D572N, Route de Saint-Gilles, 13200 Arles
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Cap+Marca+Arles)[Ses bières sur Untappd](https://untappd.com/search?q=Cap+Marca&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 04 66 84 18 13](tel:+33466841813)
> - [Site de la brasserie](https://capmarca.fr)
> - Lu sur [capmarca.fr](https://capmarca.fr) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 14. Micro brasserie Transitions — fiche nouvelle

- n : (vide) → Micro brasserie Transitions
- c : (vide) → La Ciotat
- d : (vide) → 13
- lat : (vide) → 43.18916
- lon : (vide) → 5.62616
- km : (vide) → 284.9
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Sur rendez-vous uniquement : le site de la brasserie annonce la visite, l'achat des bières sur place et la livraison, sur simple rendez-vous. Pas d'horaires d'ouverture, pas de dégustation indiquée.
- addr : (vide) → La Ciotat
- src : (vide) → https://microbrasserietransitions.fr
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.site : (vide) → https://microbrasserietransitions.fr
- contact.source : (vide) → https://microbrasserietransitions.fr
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://microbrasserietransitions.fr ; https://data.geopf.fr/geocodage/search?q=La+Ciotat&type=municipality&limit=5

Extrait lu : « Visite de la brasserie, achat des bières sur place et livraison »

Choix du vérificateur : Téléphone non repris : absent du texte lu de la page. Adresse laissée vide : le site et le registre se contredisent. Pas d'horaires (sur rendez-vous). Pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:48, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Pas encore dans la fiche : son adresse, son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Micro+brasserie+Transitions+La+Ciotat)[Ses bières sur Untappd](https://untappd.com/search?q=Micro+brasserie+Transitions&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://microbrasserietransitions.fr)
> - Lu sur [microbrasserietransitions.fr](https://microbrasserietransitions.fr) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 15. Brasserie La Baroude — fiche nouvelle

- n : (vide) → Brasserie La Baroude
- c : (vide) → Aix-en-Provence
- d : (vide) → 13
- lat : (vide) → 43.53125
- lon : (vide) → 5.40299
- km : (vide) → 243.8
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie artisanale d'Aix-en-Provence, qui présente deux gammes (Roquepertuse et Mézingue). Son site dit vendre en boutique en ligne, chez les cavistes et épiceries fines du Pays d'Aix et en fûts pour les restaurants et bars ; il ne mentionne ni vente ni accueil sur place, ni horaires. Un office de tourisme la classe « non ouverte au public ». Ce qu'on peut y faire n'est donc pas établi.
- addr : (vide) → 770 chemin de la Souque, 13090 Aix-en-Provence
- src : (vide) → http://www.brasserielabaroude.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → http://www.brasserielabaroude.fr
- contact.untappd : (vide) → https://untappd.com/BrasserieLaBaroude
- contact.source : (vide) → https://untappd.com/BrasserieLaBaroude
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : http://www.brasserielabaroude.fr ; https://untappd.com/BrasserieLaBaroude ; https://data.geopf.fr/geocodage/search?q=770+chemin+de+la+Souque%2C+13090+Aix-en-Provence&limit=5

Extrait lu : « La Baroude est une brasserie artisanale »

Choix du vérificateur : Catégorie 0 : le site ne dit rien de l'accueil sur place, et un office la dit non ouverte au public. Téléphone publié seulement par un guide : non repris. Site et Untappd lus sur la page Untappd de la brasserie ; bières non reprises dans cette lecture.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:48, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 770 chemin de la Souque, 13090 Aix-en-Provence
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+La+Baroude+Aix-en-Provence)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+La+Baroude&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](http://www.brasserielabaroude.fr)[Untappd (avis sur les bières)](https://untappd.com/BrasserieLaBaroude)
> - Lu sur [brasserielabaroude.fr](http://www.brasserielabaroude.fr) le 27 octobre 2026. Lu sur [untappd.com](https://untappd.com/BrasserieLaBaroude) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 16. La Camaraderie — fiche nouvelle

- n : (vide) → La Camaraderie
- c : (vide) → Marseille
- d : (vide) → 13
- lat : (vide) → 43.3121
- lon : (vide) → 5.38479
- km : (vide) → 267.4
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Bar associatif de la Belle de Mai dont le site parle de « recettes maison brassées dans la Belle de Mai » et publie les horaires du bar (fermé le lundi). Il ne dit pas en toutes lettres qu'on y boit ou achète la bière brassée.
- addr : (vide) → 78 rue de la Belle de Mai, 13003 Marseille
- src : (vide) → https://www.lacamaraderie.net
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://www.lacamaraderie.net
- contact.source : (vide) → https://www.lacamaraderie.net
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://www.lacamaraderie.net ; https://data.geopf.fr/geocodage/search?q=78+rue+de+la+Belle+de+Mai%2C+13003+Marseille&limit=5

Extrait lu : « Une bière locale et respectueuse du vivant — recettes maison brassées dans la Belle de Mai. »

Choix du vérificateur : Catégorie 0 : rien n'est écrit sur la vente ni la consommation de la bière maison. Aucun téléphone publié. Pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:48, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 78 rue de la Belle de Mai, 13003 Marseille
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=La+Camaraderie+Marseille)[Ses bières sur Untappd](https://untappd.com/search?q=La+Camaraderie&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://www.lacamaraderie.net)
> - Lu sur [lacamaraderie.net](https://www.lacamaraderie.net) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 17. Brasserie Artisanale Soif de Provence — fiche nouvelle

- n : (vide) → Brasserie Artisanale Soif de Provence
- c : (vide) → Saint-Rémy-de-Provence
- d : (vide) → 13
- lat : (vide) → 43.81347
- lon : (vide) → 4.82185
- km : (vide) → 207
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Vente directe à la brasserie le vendredi ; visite et dégustation sur rendez-vous. Source : fiche de Provence Tourisme (myprovence.fr), marquée « Programme en attente de validation » ; aucun site officiel trouvé.
- addr : (vide) → 1688 Petite route des jardins, 13210 Saint-Rémy-de-Provence
- src : (vide) → https://www.myprovence.fr/les-guides/loisirs/artisans-et-producteurs/saint-remy-de-provence/brasserie-artisanale-soif-de-provence
- coordPrecision : (vide) → address
- beers : (vide) → []
- horaires.0.nature : (vide) → vente
- horaires.0.ven : (vide) → 17 h – 20 h
- horaires.0.source : (vide) → https://www.myprovence.fr/les-guides/loisirs/artisans-et-producteurs/saint-remy-de-provence/brasserie-artisanale-soif-de-provence
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://www.myprovence.fr/les-guides/loisirs/artisans-et-producteurs/saint-remy-de-provence/brasserie-artisanale-soif-de-provence ; https://data.geopf.fr/geocodage/search?q=1688+Petite+route+des+jardins%2C+13210+Saint-R%C3%A9my-de-Provence&limit=5

Extrait lu : « Toute l'année le vendredi de 17h à 20h. »

Choix du vérificateur : Téléphone (06 24 33 66 90) publié seulement par la fiche de tourisme et un agenda, pas par la brasserie : non repris (précédent S342). Pas de site ni de page Untappd trouvés. Visite sur rendez-vous laissée dans la note, pas dans les horaires. Confiance moyenne au plus : source institutionnelle seule (décision #37).

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:48, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 16 h 48 (heure de Paris), vente : la source ne dit pas les heures de ce jour.
> - Adresse
> - 1688 Petite route des jardins, 13210 Saint-Rémy-de-Provence
> - Pas encore dans la fiche : son téléphone et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Artisanale+Soif+de+Provence+Saint-R%C3%A9my-de-Provence)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Artisanale+Soif+de+Provence&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Horaires
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | non précisé
> - Vendredi | 17 h – 20 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [myprovence.fr](https://www.myprovence.fr/les-guides/loisirs/artisans-et-producteurs/saint-remy-de-provence/brasserie-artisanale-soif-de-provence) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

Empreinte du lot : 9191c2163952
