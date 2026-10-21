# Lot dep-03 — l'Allier (S341)

Ce lot ajoute **4 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 16 candidats = 4 proposés + 12 non proposés (tableau ci-dessous).
Catégories proposées : 1 « acheter et consommer », 3 « acheter seulement », 0 « pas de vente », 0 « à confirmer ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| 3.AS (`sirene:818835555`) | même entreprise que la Brasserie du Père Saint’Oy (proposée) : son SIRET est en pied de page du site |
| BRASSERIE LA COMETE (`sirene:900444589`) | « Brasserie La Comète » : rien à Vichy (homonyme suisse) |
| Entreprise individuelle (`personne:1`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:2`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE - JNT (`sirene:841354731`) | « Brasserie JNT » : rien sous ce nom |
| LA MOUSSE BOURBONNAISE (`sirene:893620393`) | « La Mousse Bourbonnaise » : rien sous ce nom |
| MOUSS'O'NEZ (`sirene:941002438`) | « Mouss’O’Nez » : rien sous ce nom |
| Entreprise individuelle (`personne:3`) | entreprise sans nom ni adresse : rien à chercher |
| LA BRASSERIE DU LOUP (`sirene:829613942`) | « La Brasserie du Loup », Le Veurdre : rien sous ce nom |
| CH HOP TI (`sirene:904232964`) | « CH HOP TI », Cressanges : rien sous ce nom |
| Entreprise individuelle (`personne:5`) | « LADY ALE », Saint-Pourçain-sur-Sioule : un annuaire de producteurs seul, sans site ni Untappd |
| Café Rétro (`node/9459121056`) | « Café Rétro » : un bar-PMU d’après un annuaire, pas une brasserie établie |

## Les fiches proposées

## Lot dep-03 — 0 proposition(s), 4 fiche(s) nouvelle(s)

### 1. Brasserie du Père Saint'Oy — fiche nouvelle

- n : (vide) → Brasserie du Père Saint'Oy
- c : (vide) → Diou
- d : (vide) → 03
- lat : (vide) → 46.53252
- lon : (vide) → 3.76824
- km : (vide) → 122
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Vente directe sur simple appel en semaine ; visite, dégustation et vente sur rendez-vous le samedi matin, l’été, d’après son site.
- addr : (vide) → 1 chemin du Cluziaud, 03290 Diou
- src : (vide) → https://www.lasaintoy.fr/contact-1
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 24 55 89 61
- contact.site : (vide) → https://www.lasaintoy.fr/
- contact.source : (vide) → https://www.lasaintoy.fr/contact-1
- contact.verifieLe : (vide) → 2026-10-21
- verifieLe : (vide) → 2026-10-21

Sources (vérifiée le 2026-10-21) : https://www.lasaintoy.fr/contact-1 ; https://data.geopf.fr/geocodage/search?q=1+chemin+du+Cluziaud%2C+03290+Diou&limit=5

Extrait lu : « Visite, dégustation et vente sur RDV »

Choix du vérificateur : Catégorie 1, confiance moyenne : la dégustation n'a lieu que sur rendez-vous. Deux portables publiés, aucun fixe : celui marqué « Administratif / vente » est retenu (règle du 21/10). Le samedi 10 h-12 h vaut en saison estivale, sans dates écrites : en remarque. Même entreprise que le candidat « 3.AS » (SIRET en pied de page du site). Pas d'Untappd trouvé. Aucun créneau repris : tout se fait sur appel ou sur rendez-vous (revue de la persona).

**Aperçu de la fiche** (état du moment calculé le mercredi 21 octobre 2026 à 15:07, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 1 chemin du Cluziaud, 03290 Diou
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+du+P%C3%A8re+Saint%27Oy+Diou)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+du+P%C3%A8re+Saint%27Oy&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 24 55 89 61](tel:+33624558961)
> - [Site de la brasserie](https://www.lasaintoy.fr/)
> - Lu sur [lasaintoy.fr](https://www.lasaintoy.fr/contact-1) le 21 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 2. Back in Malt — fiche nouvelle

- n : (vide) → Back in Malt
- c : (vide) → Varennes-sur-Allier
- d : (vide) → 03
- lat : (vide) → 46.31362
- lon : (vide) → 3.40169
- km : (vide) → 126.4
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Bières vendues à la boutique attenante à la production le vendredi en fin d'après-midi, sur commande le reste du temps, d'après son site.
- addr : (vide) → 21 rue du 4 septembre, 03150 Varennes-sur-Allier
- src : (vide) → https://www.brasseriebackinmalt.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 84 65 14 52
- contact.site : (vide) → https://www.brasseriebackinmalt.fr/
- contact.source : (vide) → https://www.brasseriebackinmalt.fr/
- contact.verifieLe : (vide) → 2026-10-21
- horaires.0.nature : (vide) → vente
- horaires.0.ven : (vide) → 17 h – 19 h
- horaires.0.remarque : (vide) → Hors de ce créneau, sur commande par téléphone.
- horaires.0.source : (vide) → https://www.brasseriebackinmalt.fr/
- horaires.0.verifieLe : (vide) → 2026-10-21
- verifieLe : (vide) → 2026-10-21

Sources (vérifiée le 2026-10-21) : https://www.brasseriebackinmalt.fr/ ; https://data.geopf.fr/geocodage/search?q=21+rue+du+4+septembre%2C+03150+Varennes-sur-Allier&limit=5

Extrait lu : « la proposer à la vente dans notre boutique, attenante à la partie production »

Choix du vérificateur : Catégorie 2 : la dégustation n'est qu'annoncée. Confiance moyenne : le site annonce un accueil sur commande à partir de 2027. Seule ligne publiée : un portable, retenu. Entrepreneur individuel : aucun nom recopié.

**Aperçu de la fiche** (état du moment calculé le mercredi 21 octobre 2026 à 15:07, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 15 h 07 (heure de Paris), vente : la source ne dit pas les heures de ce jour.
> - Adresse
> - 21 rue du 4 septembre, 03150 Varennes-sur-Allier
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Back+in+Malt&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 84 65 14 52](tel:+33684651452)
> - [Site de la brasserie](https://www.brasseriebackinmalt.fr/)
> - Horaires
> - À savoir : Hors de ce créneau, sur commande par téléphone.
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | non précisé
> - Vendredi | 17 h – 19 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriebackinmalt.fr](https://www.brasseriebackinmalt.fr/) le 21 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 3. Brasserie du Jugement Dernier — fiche nouvelle

- n : (vide) → Brasserie du Jugement Dernier
- c : (vide) → Mazerier
- d : (vide) → 03
- lat : (vide) → 46.13016
- lon : (vide) → 3.1927
- km : (vide) → 131
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Boutique en semaine de 17 h à 19 h 30, sur SMS ; visite commentée le mercredi sur réservation, d’après son site. Aucune dégustation citée.
- addr : (vide) → 15 allée Madame de Sévigné, 03800 Mazerier
- src : (vide) → https://jugementdernier.beer/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 77 76 17 03
- contact.site : (vide) → https://jugementdernier.beer/
- contact.source : (vide) → https://jugementdernier.beer/
- contact.verifieLe : (vide) → 2026-10-21
- verifieLe : (vide) → 2026-10-21

Sources (vérifiée le 2026-10-21) : https://jugementdernier.beer/ ; https://data.geopf.fr/geocodage/search?q=15+all%C3%A9e+Madame+de+S%C3%A9vign%C3%A9%2C+03800+Mazerier&limit=5

Extrait lu : « Pour acheter nos bières, RDV à la brasserie. »

Choix du vérificateur : Deux portables publiés, aucun fixe : le premier de la liste est retenu (règle du 21/10). Confiance moyenne : la boutique fonctionne sur SMS. L'office de tourisme donne 17 h-19 h au lieu de 17 h-19 h 30 : le site est retenu. Pas d'Untappd. Créneaux sur SMS : laissés dans la note, pas en horaires (revue de la persona).

**Aperçu de la fiche** (état du moment calculé le mercredi 21 octobre 2026 à 15:07, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - 15 allée Madame de Sévigné, 03800 Mazerier
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+du+Jugement+Dernier+Mazerier)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+du+Jugement+Dernier&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 77 76 17 03](tel:+33677761703)
> - [Site de la brasserie](https://jugementdernier.beer/)
> - Lu sur [jugementdernier.beer](https://jugementdernier.beer/) le 21 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 4. Brew-Vernet — fiche nouvelle

- n : (vide) → Brew-Vernet
- c : (vide) → Broût-Vernet
- d : (vide) → 03
- lat : (vide) → 46.18751
- lon : (vide) → 3.27133
- km : (vide) → 128.1
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Les bières s'achètent à la brasserie, d'après son site, qui invite aussi à venir la découvrir et déguster ses bières aux heures d'ouverture.
- addr : (vide) → 9 rue de la Croix Rouge, 03110 Broût-Vernet
- src : (vide) → https://brasserie-brewvernet.fr/points-de-vente/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 07 82 00 74 22
- contact.site : (vide) → https://brasserie-brewvernet.fr/
- contact.source : (vide) → https://brasserie-brewvernet.fr/
- contact.verifieLe : (vide) → 2026-10-21
- horaires.0.nature : (vide) → accueil
- horaires.0.lun : (vide) → 17 h – 19 h
- horaires.0.mar : (vide) → 17 h – 19 h
- horaires.0.mer : (vide) → 17 h – 19 h
- horaires.0.jeu : (vide) → 17 h – 19 h
- horaires.0.ven : (vide) → 17 h – 19 h
- horaires.0.sam : (vide) → 14 h – 17 h
- horaires.0.remarque : (vide) → Pour découvrir la brasserie et déguster les bières, d'après la page d'accueil.
- horaires.0.source : (vide) → https://brasserie-brewvernet.fr/
- horaires.0.verifieLe : (vide) → 2026-10-21
- verifieLe : (vide) → 2026-10-21

Sources (vérifiée le 2026-10-21) : https://brasserie-brewvernet.fr/points-de-vente/ ; https://brasserie-brewvernet.fr/ ; https://data.geopf.fr/geocodage/search?q=9+rue+de+la+Croix+Rouge%2C+03110+Bro%C3%BBt-Vernet&limit=5

Extrait lu : « Retrouver les bières Brew Vernet dans les points de vente locaux, ou directement à la Brasserie de Brout-Vernet. »

Choix du vérificateur : Catégorie 2 : la vente est écrite ; la dégustation reste vague. Seule ligne publiée : un portable, retenu. Horaires d'accueil de la page d'accueil. Pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mercredi 21 octobre 2026 à 15:07, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 15 h 07 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 17 h, sous réserve.
> - Adresse
> - 9 rue de la Croix Rouge, 03110 Broût-Vernet
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brew-Vernet&type=brewery)
> - Joindre la brasserie
> - [Appeler le 07 82 00 74 22](tel:+33782007422)
> - [Site de la brasserie](https://brasserie-brewvernet.fr/)
> - Horaires
> - À savoir : Pour découvrir la brasserie et déguster les bières, d'après la page d'accueil.
> - Horaires d’accueil du public
> - Lundi | 17 h – 19 h
> - Mardi | 17 h – 19 h
> - Mercredi | 17 h – 19 h
> - Jeudi | 17 h – 19 h
> - Vendredi | 17 h – 19 h
> - Samedi | 14 h – 17 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserie-brewvernet.fr](https://brasserie-brewvernet.fr/points-de-vente/) le 21 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

Empreinte du lot : 2cc488fa0655
