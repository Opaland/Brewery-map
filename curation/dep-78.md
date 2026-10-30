# Lot dep-78 — les Yvelines (S345)

Ce lot ajoute **7 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 29 candidats = 7 proposés + 22 non proposés (tableau ci-dessous).
Catégories proposées : 3 « acheter et consommer », 3 « acheter seulement », 0 « pas de vente », 1 « à confirmer », 0 « consommer sur place seulement ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| BRASSERIE DISTRIKT (`sirene:793900473`) | site sans réponse (DNS), annuaires seuls : à relancer |
| LA BRASSERIE BARGE (`sirene:823426978`) | registre seul, ce qui ne suffit pas (méthode du 19/10) |
| BRASSERIE DILETTANTE ARCISIENNE (`sirene:979896842`) | registre seul, ce qui ne suffit pas (méthode du 19/10) |
| Entreprise individuelle (`personne:1`) | entreprise sans nom ni adresse : rien à chercher |
| BIERES SAINT-Q (`sirene:799277090`) | fermé depuis 2014 d'après le registre, aucune autre trace |
| BRASSERIE CROIZAT (`sirene:913341061`) | introuvable : aucun site, aucun Untappd, aucun office de tourisme |
| THE CHUBBY BREWING COMPANY (`sirene:920046893`) | revendeurs et annuaires seuls, aucun lien avec la commune : à relancer |
| EXPEDITION BREWERY (`sirene:911410322`) | introuvable : aucun site, aucun Untappd, aucun office de tourisme |
| JUSTBEER BREWERY (`sirene:924932825`) | introuvable : aucun site, aucun Untappd, aucun office de tourisme |
| BRASSERIE LA TRIELLOISE (`sirene:902798065`) | introuvable : aucun site, aucun Untappd, aucun office de tourisme |
| LA STAGNOVILLOISE (`sirene:907918957`) | introuvable : aucun site, aucun Untappd, aucun office de tourisme |
| RESPEKT (`sirene:890481096`) | site derrière une vérification de l'âge, agrégateurs seuls : à relancer |
| TRICYCLHOP (`sirene:893014662`) | site de la ville en erreur de certificat, boutique citée seulement : à relancer |
| TRBL COMPAGNIE SAS (`sirene:852696525`) | fiche de vente en gros seule, rien sur la commune |
| La brasserie du Roi (Saint-Cyr-l'École) (`node/12327046734`) | même lieu que sirene:840301055 |
| Rolling's Bar (`node/1854003295`) | bar sur un annuaire, rien sur une brasserie |
| Distrikt Beer (`node/3512397640`) | même brasserie que sirene:793900473 : à relancer avec elle |
| Le Vizir (`node/3752510374`) | aucune trace de ce lieu |
| Le Villaroy (`node/4155657290`) | bar-restaurant sur un guide local, aucune brasserie |
| Brasserie de la vallée de Chevreuse (`node/7203823199`) | même établissement que sirene:503705006 |
| La Véranda (`node/9280921450`) | aucune brasserie de ce nom dans la commune |
| Le Sporting (`way/63158105`) | aucune page, rien sur une brasserie |

## Les fiches proposées

## Lot dep-78 — 0 proposition(s), 7 fiche(s) nouvelle(s)

### 1. Brasserie Volcelest — fiche nouvelle

- n : (vide) → Brasserie Volcelest
- c : (vide) → Le Perray-en-Yvelines
- d : (vide) → 78
- lat : (vide) → 48.6954
- lon : (vide) → 1.8411
- km : (vide) → 401.6
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → solide
- note : (vide) → Brasserie bio. Le site donne les horaires de sa boutique pour la vente aux particuliers ; il ne parle pas de dégustation.
- addr : (vide) → 28 rue du Roseau, 78610 Le Perray-en-Yvelines
- src : (vide) → https://www.brasserievolcelest.fr/contact/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 09 62 35 27 83
- contact.site : (vide) → https://www.brasserievolcelest.fr/
- contact.source : (vide) → https://www.brasserievolcelest.fr/contact/
- contact.verifieLe : (vide) → 2026-10-30
- horaires.0.nature : (vide) → vente
- horaires.0.mar : (vide) → 16 h – 19 h
- horaires.0.mer : (vide) → 16 h – 19 h
- horaires.0.jeu : (vide) → 16 h – 19 h
- horaires.0.ven : (vide) → 16 h – 19 h
- horaires.0.remarque : (vide) → Fermeture à 18h en janvier et février.
- horaires.0.source : (vide) → https://www.brasserievolcelest.fr/contact/
- horaires.0.verifieLe : (vide) → 2026-10-30
- verifieLe : (vide) → 2026-10-30

Sources (vérifiée le 2026-10-30) : https://www.brasserievolcelest.fr/contact/ ; https://data.geopf.fr/geocodage/search?q=28+rue+du+Roseau%2C+78610+Le+Perray-en-Yvelines&limit=5

Extrait lu : « Du Mardi au Vendredi de 16h00 à 19h00 »

Choix du vérificateur : Même établissement que le point OSM node/7203823199. Source rouverte à la main le 30/10.

**Aperçu de la fiche** (état du moment calculé le vendredi 30 octobre 2026 à 13:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 13 h 30 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 16 h, sous réserve.
> - Adresse
> - 28 rue du Roseau, 78610 Le Perray-en-Yvelines
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Volcelest&type=brewery)
> - Joindre la brasserie
> - [Appeler le 09 62 35 27 83](tel:+33962352783)
> - [Site de la brasserie](https://www.brasserievolcelest.fr/)
> - Horaires
> - À savoir : Fermeture à 18h en janvier et février.
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | 16 h – 19 h
> - Mercredi | 16 h – 19 h
> - Jeudi | 16 h – 19 h
> - Vendredi | 16 h – 19 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserievolcelest.fr](https://www.brasserievolcelest.fr/contact/) le 30 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 2. La P'tite Sœur — fiche nouvelle

- n : (vide) → La P'tite Sœur
- c : (vide) → Sartrouville
- d : (vide) → 78
- lat : (vide) → 48.93235
- lon : (vide) → 2.14869
- km : (vide) → 412.1
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Le Relais, l'espace ouvert au public, sert les bières de la brasserie, d'après son site. La boutique n'est citée que par l'office de tourisme, dont la fiche date de 2024.
- addr : (vide) → 165 avenue de la République, 78500 Sartrouville
- src : (vide) → https://www.seine-saintgermain.fr/en/touristic_sheet/la-ptite-soeur-sartrouville-en-5356430/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 28 40 12 52
- contact.site : (vide) → https://www.laptitesoeur.com/
- contact.source : (vide) → https://www.laptitesoeur.com/
- contact.verifieLe : (vide) → 2026-10-30
- horaires.0.nature : (vide) → accueil
- horaires.0.jeu : (vide) → 17 h – 21 h
- horaires.0.ven : (vide) → 17 h – 21 h
- horaires.0.sam : (vide) → 14 h – 21 h
- horaires.0.source : (vide) → https://www.laptitesoeur.com/
- horaires.0.verifieLe : (vide) → 2026-10-30
- verifieLe : (vide) → 2026-10-30

Sources (vérifiée le 2026-10-30) : https://www.seine-saintgermain.fr/en/touristic_sheet/la-ptite-soeur-sartrouville-en-5356430/ ; https://www.laptitesoeur.com/ ; https://data.geopf.fr/geocodage/search?q=165+avenue+de+la+R%C3%A9publique%2C+78500+Sartrouville&limit=5

Extrait lu : « Product tasting »

Choix du vérificateur : Horaires du site repris, ceux de l'office diffèrent et sont plus anciens. Portable : seule ligne publiée par la brasserie, le fixe n'étant que sur l'office. Source rouverte à la main le 30/10.

**Aperçu de la fiche** (état du moment calculé le vendredi 30 octobre 2026 à 13:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Maintenant
> - À 13 h 30 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 17 h.
> - Adresse
> - 165 avenue de la République, 78500 Sartrouville
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=La+P%27tite+S%C5%93ur&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 28 40 12 52](tel:+33628401252)
> - [Site de la brasserie](https://www.laptitesoeur.com/)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | 17 h – 21 h
> - Vendredi | 17 h – 21 h
> - Samedi | 14 h – 21 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [seine-saintgermain.fr](https://www.seine-saintgermain.fr/en/touristic_sheet/la-ptite-soeur-sartrouville-en-5356430/) le 30 octobre 2026. Lu sur [laptitesoeur.com](https://www.laptitesoeur.com/) le 30 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 3. Brasserie O'Clock Brewing — fiche nouvelle

- n : (vide) → Brasserie O'Clock Brewing
- c : (vide) → Bois-d'Arcy
- d : (vide) → 78
- lat : (vide) → 48.80095
- lon : (vide) → 2.0089
- km : (vide) → 404.7
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Le site invite à passer à la brasserie et vend en ligne ; il ne dit pas si l'on peut acheter ou boire sur place. Horaires affichés sans dire de quoi : non repris.
- addr : (vide) → 3 rue Georges Méliès, 78390 Bois-d'Arcy
- src : (vide) → https://oclockbrewing.fr/contact/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 09 51 53 11 22
- contact.site : (vide) → https://oclockbrewing.fr/
- contact.source : (vide) → https://oclockbrewing.fr/contact/
- contact.verifieLe : (vide) → 2026-10-30
- verifieLe : (vide) → 2026-10-30

Sources (vérifiée le 2026-10-30) : https://oclockbrewing.fr/contact/ ; https://data.geopf.fr/geocodage/search?q=3+rue+Georges+M%C3%A9li%C3%A8s%2C+78390+Bois-d%27Arcy&limit=5

Extrait lu : « Passez nous voir à la brasserie »

Choix du vérificateur : Adresse publiée « 3 d Rue Georges Méliès », écrite comme SIRENE. Source rouverte à la main le 30/10.

**Aperçu de la fiche** (état du moment calculé le vendredi 30 octobre 2026 à 13:30, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 3 rue Georges Méliès, 78390 Bois-d'Arcy
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+O%27Clock+Brewing+Bois-d%27Arcy)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+O%27Clock+Brewing&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 09 51 53 11 22](tel:+33951531122)
> - [Site de la brasserie](https://oclockbrewing.fr/)
> - Lu sur [oclockbrewing.fr](https://oclockbrewing.fr/contact/) le 30 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 4. Brasserie Toussaint — fiche nouvelle

- n : (vide) → Brasserie Toussaint
- c : (vide) → Noisy-le-Roi
- d : (vide) → 78
- lat : (vide) → 48.84357
- lon : (vide) → 2.05737
- km : (vide) → 406.9
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Boutique au pied des cuves, et un brewpub où l'on déguste sur place, selon le site. Le samedi, la boutique affiche « fermé jusqu'au 24 août », sans année : ce jour n'est pas repris.
- addr : (vide) → 2 avenue de l'Europe, 78590 Noisy-le-Roi
- src : (vide) → https://www.brasserietoussaint.com/restaurant-3/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 01 87 66 67 45
- contact.site : (vide) → https://www.brasserietoussaint.com
- contact.source : (vide) → https://www.brasserietoussaint.com/contact-2/
- contact.verifieLe : (vide) → 2026-10-30
- horaires.0.nature : (vide) → vente
- horaires.0.mar : (vide) → 14 h – 17 h
- horaires.0.mer : (vide) → 14 h – 17 h
- horaires.0.jeu : (vide) → 14 h – 17 h
- horaires.0.ven : (vide) → 14 h – 18 h
- horaires.0.source : (vide) → https://www.brasserietoussaint.com/restaurant-3/
- horaires.0.verifieLe : (vide) → 2026-10-30
- verifieLe : (vide) → 2026-10-30

Sources (vérifiée le 2026-10-30) : https://www.brasserietoussaint.com/restaurant-3/ ; https://www.brasserietoussaint.com/contact-2/ ; https://data.geopf.fr/geocodage/search?q=2+avenue+de+l%27Europe%2C+78590+Noisy-le-Roi&limit=5

Extrait lu : « Vous pouvez désormais acheter nos bouteilles directement au pieds des cuves. »

Choix du vérificateur : Lu aussi sur la page du restaurant : « déguster des bières fraîches, au pied même des cuves ». Fixe retenu ; le portable est réservé aux groupes. Source rouverte à la main le 30/10.

**Aperçu de la fiche** (état du moment calculé le vendredi 30 octobre 2026 à 13:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 13 h 30 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 14 h.
> - Adresse
> - 2 avenue de l'Europe, 78590 Noisy-le-Roi
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Toussaint&type=brewery)
> - Joindre la brasserie
> - [Appeler le 01 87 66 67 45](tel:+33187666745)
> - [Site de la brasserie](https://www.brasserietoussaint.com)
> - Horaires
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | 14 h – 17 h
> - Mercredi | 14 h – 17 h
> - Jeudi | 14 h – 17 h
> - Vendredi | 14 h – 18 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserietoussaint.com](https://www.brasserietoussaint.com/restaurant-3/) le 30 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 5. Brasserie 2 L'Équipage — fiche nouvelle

- n : (vide) → Brasserie 2 L'Équipage
- c : (vide) → Bonnelles
- d : (vide) → 78
- lat : (vide) → 48.62509
- lon : (vide) → 2.02626
- km : (vide) → 387.5
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → L'office de tourisme de Rambouillet annonce une boutique, le click & collect et des horaires ; le site de la brasserie n'en dit rien.
- addr : (vide) → 8 rue des Jacinthes Sauvages, 78830 Bonnelles
- src : (vide) → https://www.rambouillet-tourisme.fr/brasserie-2-lequipage/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 78 46 91 98
- contact.site : (vide) → https://brasserie2lequipage.fr
- contact.source : (vide) → https://brasserie2lequipage.fr
- contact.verifieLe : (vide) → 2026-10-30
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 18 h – 19 h 30
- horaires.0.mar : (vide) → 18 h – 19 h 30
- horaires.0.mer : (vide) → 18 h – 19 h 30
- horaires.0.jeu : (vide) → 19 h – 20 h
- horaires.0.ven : (vide) → 18 h – 19 h 30
- horaires.0.sam : (vide) → 13 h – 20 h
- horaires.0.source : (vide) → https://www.rambouillet-tourisme.fr/brasserie-2-lequipage/
- horaires.0.verifieLe : (vide) → 2026-10-30
- verifieLe : (vide) → 2026-10-30

Sources (vérifiée le 2026-10-30) : https://www.rambouillet-tourisme.fr/brasserie-2-lequipage/ ; https://brasserie2lequipage.fr ; https://data.geopf.fr/geocodage/search?q=8+rue+des+Jacinthes+Sauvages%2C+78830+Bonnelles&limit=5

Extrait lu : « le lundi, mardi, mercredi et vendredi de 18h à 19h30. Le jeudi de 19h à 20h. Le samedi de 13h à 20h. »

Choix du vérificateur : Portable : seule ligne publiée, sur le site et sur l'office (règle du 21/10). Source rouverte à la main le 30/10.

**Aperçu de la fiche** (état du moment calculé le vendredi 30 octobre 2026 à 13:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 13 h 30 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 18 h.
> - Adresse
> - 8 rue des Jacinthes Sauvages, 78830 Bonnelles
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+2+L%27%C3%89quipage&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 78 46 91 98](tel:+33678469198)
> - [Site de la brasserie](https://brasserie2lequipage.fr)
> - Horaires
> - Horaires de vente
> - Lundi | 18 h – 19 h 30
> - Mardi | 18 h – 19 h 30
> - Mercredi | 18 h – 19 h 30
> - Jeudi | 19 h – 20 h
> - Vendredi | 18 h – 19 h 30
> - Samedi | 13 h – 20 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [rambouillet-tourisme.fr](https://www.rambouillet-tourisme.fr/brasserie-2-lequipage/) le 30 octobre 2026. Lu sur [brasserie2lequipage.fr](https://brasserie2lequipage.fr) le 30 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 6. Brasserie du Roi — fiche nouvelle

- n : (vide) → Brasserie du Roi
- c : (vide) → Saint-Cyr-l'École
- d : (vide) → 78
- lat : (vide) → 48.81158
- lon : (vide) → 2.07736
- km : (vide) → 403.1
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → La Ménagerie, le restaurant et bar à bières de la brasserie, sert ses bières brassées sur place ; le site cite une boutique sans dire la vente à emporter. Horaires non repris : les deux sites de la brasserie ne donnent pas les mêmes le soir.
- addr : (vide) → 75 rue du Docteur Vaillant, 78210 Saint-Cyr-l'École
- src : (vide) → https://labrasserieduroi.com/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 09 83 65 63 85
- contact.site : (vide) → https://labrasserieduroi.com/
- contact.source : (vide) → https://labrasserieduroi.com/contact/
- contact.verifieLe : (vide) → 2026-10-30
- verifieLe : (vide) → 2026-10-30

Sources (vérifiée le 2026-10-30) : https://labrasserieduroi.com/ ; https://labrasserieduroi.com/contact/ ; https://data.geopf.fr/geocodage/search?q=75+rue+du+Docteur+Vaillant%2C+78210+Saint-Cyr-l%27%C3%89cole&limit=5

Extrait lu : « Plongez dans La Ménagerie : bières brassées sous vos yeux, burgers maison savoureux et une ambiance qui ne ressemble à aucune autre. »

Choix du vérificateur : Réponse de Cédric du 29/10 : catégorie 1, confiance faible. Numéro affiché par la brasserie sur ses pages retenu ; celui du restaurant et le lien tel: de la même page diffèrent. Même lieu que node/12327046734. Source rouverte à la main le 30/10.

**Aperçu de la fiche** (état du moment calculé le vendredi 30 octobre 2026 à 13:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Adresse
> - 75 rue du Docteur Vaillant, 78210 Saint-Cyr-l'École
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+du+Roi+Saint-Cyr-l%27%C3%89cole)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+du+Roi&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 09 83 65 63 85](tel:+33983656385)
> - [Site de la brasserie](https://labrasserieduroi.com/)
> - Lu sur [labrasserieduroi.com](https://labrasserieduroi.com/) le 30 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 7. Brasserie La Voisine — fiche nouvelle

- n : (vide) → Brasserie La Voisine
- c : (vide) → Villiers-Saint-Frédéric
- d : (vide) → 78
- lat : (vide) → 48.81558
- lon : (vide) → 1.87868
- km : (vide) → 411.2
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Brasserie bio avec une boutique ouverte jeudi, vendredi et samedi. Le site cite des soirées guinguette, sans dire ce qui se passe le reste du temps.
- addr : (vide) → 13 rue de la Gare, 78640 Villiers-Saint-Frédéric
- src : (vide) → https://brasserielavoisine.com
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 84 77 32 84
- contact.site : (vide) → https://brasserielavoisine.com
- contact.source : (vide) → https://brasserielavoisine.com
- contact.verifieLe : (vide) → 2026-10-30
- horaires.0.nature : (vide) → vente
- horaires.0.jeu : (vide) → 16 h – 19 h
- horaires.0.ven : (vide) → 16 h – 19 h
- horaires.0.sam : (vide) → 10 h – 13 h
- horaires.0.source : (vide) → https://brasserielavoisine.com
- horaires.0.verifieLe : (vide) → 2026-10-30
- verifieLe : (vide) → 2026-10-30

Sources (vérifiée le 2026-10-30) : https://brasserielavoisine.com ; https://data.geopf.fr/geocodage/search?q=13+rue+de+la+Gare%2C+78640+Villiers-Saint-Fr%C3%A9d%C3%A9ric&limit=5

Extrait lu : « Jeudi & vendredi 16h – 19h »

Choix du vérificateur : Portable : seule ligne publiée (règle du 21/10). Source rouverte à la main le 30/10.

**Aperçu de la fiche** (état du moment calculé le vendredi 30 octobre 2026 à 13:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 13 h 30 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 16 h.
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
> - Lu sur [brasserielavoisine.com](https://brasserielavoisine.com) le 30 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

Empreinte du lot : b8a2aefe6185
