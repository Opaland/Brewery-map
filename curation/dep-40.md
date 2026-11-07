# Lot dep-40 — les Landes (S347)

Ce lot ajoute **9 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 34 candidats = 9 proposés + 25 non proposés (tableau ci-dessous).
Catégories proposées : 2 « acheter et consommer », 2 « acheter seulement », 0 « pas de vente », 5 « à confirmer », 0 « consommer sur place seulement ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| BRASSERIE DES PYRENEES (`sirene:804689594`) | Brasserie des Pyrénées : registre et annuaire seuls, lien avec l'enseigne non établi |
| CALLIPYGE BREWING (`sirene:993235340`) | Callipyge Brewing : rien sous ce nom (deux recherches) |
| BRASSERIE LE PANDALCHIMISTE (`sirene:919284463`) | Le Pandalchimiste : rien sous ce nom (deux recherches) |
| LA MENAGERIE MICROBRASSERIE (`sirene:978962041`) | La Ménagerie : son brewpub n'a pas encore d'adresse publiée : à relancer |
| Entreprise individuelle (`personne:1`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE NATURELLE DES LANDES (`sirene:830133393`) | Brasserie Naturelle des Landes : la page de l'office refuse la lecture (403) : à relancer |
| BRASSERIE UNE PETITE DERNIERE (`sirene:953338241`) | Une Petite Dernière : rien sous ce nom (deux recherches) |
| Entreprise individuelle (`personne:2`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:3`) | entreprise individuelle : rien de public trouvé |
| KV BOISSONS (`sirene:992098772`) | KV Boissons : un négoce de boissons, rien ne dit qu'il brasse |
| L'AGE DE BIERE (`sirene:894850379`) | L'Âge de Bière : rien sous ce nom (deux recherches) |
| BRASSERIE DE BAHUS (`sirene:910193721`) | Brasserie du Bahus : la page de l'office refuse la lecture (403) : à relancer |
| MICROMEGAS MICROBRASSERIE (`sirene:951240035`) | Micromegas (Saint-Pierre-du-Mont) : registre seul |
| SARL BRASSERIE AGUIANA (`sirene:514426576`) | Aguiana : un guide commercial seul : à relancer |
| BRASSERIE ARTISANALE DE L ARMAGNAC (`sirene:850234097`) | Brasserie artisanale de l'Armagnac : rien sous ce nom (deux recherches) |
| Entreprise individuelle (`personne:4`) | entreprise sans nom ni adresse : rien à chercher |
| CORNER BREWING (`sirene:993112556`) | Corner Brewing : rien sous ce nom (deux recherches) |
| Entreprise individuelle (`personne:5`) | entreprise sans nom ni adresse : rien à chercher |
| MASH PIT (`sirene:990528465`) | Mash Pit Brewpub : même adresse que La Séquère (node/8589568891), à rapprocher avant de créer une fiche : à relancer |
| VERTS CANYONS (`sirene:513480491`) | Verts Canyons : un annuaire seul ; son lien avec Lugazaut n'est pas établi |
| Entreprise individuelle (`personne:6`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE DU BORN (`sirene:899131841`) | Brasserie du Born : registre et annuaire seuls |
| MICROMEGAS MICROBRASSERIE (`sirene:827627944`) | Micromegas (Saint-Sever) : annuaires seuls |
| Brasserie Aguiana (`node/7962427802`) | Aguiana : même lieu que sirene:514426576, un guide commercial seul |
| Centre de brassotherapie (`node/9840854891`) | Centre de brassothérapie : son site ne montre qu'une vérification d'âge : à relancer |

## Les fiches proposées

## Lot dep-40 — 0 proposition(s), 9 fiche(s) nouvelle(s)

### 1. La Petite Landaise — fiche nouvelle

- n : (vide) → La Petite Landaise
- c : (vide) → Saint-Julien-en-Born
- d : (vide) → 40
- lat : (vide) → 44.06773
- lon : (vide) → -1.22914
- km : (vide) → 504.1
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Bière artisanale brassée à Saint-Julien-en-Born ; le site du tourisme des Landes annonce une visite de la brasserie avec dégustation. Rien sur la vente ni sur un accueil hors visite.
- addr : (vide) → 729 Route des Lacs, 40170 Saint-Julien-en-Born
- src : (vide) → https://www.landes-holidays.com/degustation/la-petite-landaise-degaqu040v50nnop
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://www.landes-holidays.com/degustation/la-petite-landaise-degaqu040v50nnop ; https://data.geopf.fr/geocodage/search?q=729+Route+des+Lacs%2C+40170+Saint-Julien-en-Born&limit=5

Extrait lu : « Discover how a beer is made, visit the brewery and taste the full, varied range of beers, not forgetting the ephemera. »

Choix du vérificateur : Via un résumé. Site officiel (lapetitelandaise.com) en erreur 503 aux deux essais : à relancer. Seule source lue : la fiche du site de tourisme des Landes, confiance plafonnée. Classée 1 faible d'après la règle de Cédric du 29/10 (on y goûte, vente à emporter non dite) ; la dégustation est celle d'une visite, à vérifier. Aucun téléphone sur la page ; le portable 06 09 24 34 95 vu sur guide-des-landes.com (annuaire) n'est pas repris. Aucun doublon dans data/.

**Aperçu de la fiche** (état du moment calculé le samedi 7 novembre 2026 à 00:00, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 729 Route des Lacs, 40170 Saint-Julien-en-Born
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=La+Petite+Landaise+Saint-Julien-en-Born)[Ses bières sur Untappd](https://untappd.com/search?q=La+Petite+Landaise&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [landes-holidays.com](https://www.landes-holidays.com/degustation/la-petite-landaise-degaqu040v50nnop) le 6 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 2. Brasserie de Lugazaut — fiche nouvelle

- n : (vide) → Brasserie de Lugazaut
- c : (vide) → Vielle-Soubiran
- d : (vide) → 40
- lat : (vide) → 44.05437
- lon : (vide) → -0.17556
- km : (vide) → 428.2
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → solide
- note : (vide) → Microbrasserie ; vente directe et accueil à la microbrasserie sur rendez-vous, du lundi au samedi toute l'année. Dégustation sur place non mentionnée.
- addr : (vide) → Route de Losse, 40240 Vielle-Soubiran
- src : (vide) → https://www.brasseriedelugazaut.com
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 06 50 53 34 26
- contact.site : (vide) → https://www.brasseriedelugazaut.com
- contact.source : (vide) → https://www.brasseriedelugazaut.com
- contact.verifieLe : (vide) → 2026-11-06
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://www.brasseriedelugazaut.com ; https://data.geopf.fr/geocodage/search?q=Vielle-Soubiran&type=municipality&limit=5

Extrait lu : « en vente directe sur rendez-vous »

Choix du vérificateur : Site officiel lu via un résumé de l'outil de lecture (citations de la page). Un seul téléphone publié par la brasserie, un portable (06 50 53 34 26) : retenu faute de fixe. Horaires non structurés : « du lundi au samedi (sur rendez-vous) » est un accueil sur rendez-vous, sans créneau ; dit dans la note. Types de bière lus sur le site (Pilsner, APA, Porter, Brut IPA, Wheat Ale, Irish Red Ale) mais non repris dans beers (pas de page Untappd trouvée). Adresse prise sur le site ; l'adresse SIRENE de Verts Canyons (Domaine de Lugazaut, route de Pijo) est une autre entreprise, écartée. Aucun doublon dans data/.

**Aperçu de la fiche** (état du moment calculé le samedi 7 novembre 2026 à 00:00, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - Route de Losse, 40240 Vielle-Soubiran
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+de+Lugazaut+Vielle-Soubiran)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+de+Lugazaut&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 50 53 34 26](tel:+33650533426)
> - [Site de la brasserie](https://www.brasseriedelugazaut.com)
> - Lu sur [brasseriedelugazaut.com](https://www.brasseriedelugazaut.com) le 6 novembre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 3. Brasserie Cath' — fiche nouvelle

- n : (vide) → Brasserie Cath'
- c : (vide) → Labenne
- d : (vide) → 40
- lat : (vide) → 43.59729
- lon : (vide) → -1.43513
- km : (vide) → 541.3
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie artisanale qui brasse à Labenne ; une page propose de réserver une visite. Vente sur place, dégustation et horaires non lus sur le site.
- addr : (vide) → 7 Allée Artiguenave, 40530 Labenne
- src : (vide) → https://www.brasserie-cath.com/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 05 58 49 24 69
- contact.site : (vide) → https://www.brasserie-cath.com/
- contact.source : (vide) → https://www.brasserie-cath.com/
- contact.verifieLe : (vide) → 2026-11-06
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://www.brasserie-cath.com/ ; https://data.geopf.fr/geocodage/search?q=Labenne&type=municipality&limit=5

Extrait lu : « Toutes les étapes de fabrication de nos bières artisanales sont réalisées dans notre brasserie, »

Choix du vérificateur : Site officiel lu via un résumé. Fixe 05 58 49 24 69 publié par la brasserie : retenu. Un avis Google dit qu'on peut acheter sur place : écarté (pas la brasserie). Catégorie 0 : « Réservez votre visite » ne dit pas ce qu'on peut y faire. Gammes Tradition, Prestige, Evasion, Gouf, Dégustation lues, non reprises. Pas d'Untappd trouvé. Aucun doublon dans data/.

**Aperçu de la fiche** (état du moment calculé le samedi 7 novembre 2026 à 00:00, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 7 Allée Artiguenave, 40530 Labenne
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Cath%27+Labenne)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Cath%27&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 05 58 49 24 69](tel:+33558492469)
> - [Site de la brasserie](https://www.brasserie-cath.com/)
> - Lu sur [brasserie-cath.com](https://www.brasserie-cath.com/) le 6 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 4. Brasserie La Séquère — fiche nouvelle

- n : (vide) → Brasserie La Séquère
- c : (vide) → Seignosse
- d : (vide) → 40
- lat : (vide) → 43.68696
- lon : (vide) → -1.35129
- km : (vide) → 530.7
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie artisanale et restaurant, existence établie par son site officiel (adresse et téléphone). Le site ne dit ni vente sur place ni dégustation ni horaires : catégorie à confirmer.
- addr : (vide) → 2 rue de l'Arroun, ZAE de Laubian, 40510 Seignosse
- src : (vide) → https://lasequere.com/pages/contact
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 86 46 20 02
- contact.site : (vide) → https://lasequere.com
- contact.source : (vide) → https://lasequere.com/pages/contact
- contact.verifieLe : (vide) → 2026-11-06
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://lasequere.com/pages/contact ; https://data.geopf.fr/geocodage/search?q=2+rue+de+l%27Arroun%2C+ZAE+de+Laubian%2C+40510+Seignosse&limit=5

Extrait lu : « Brasserie Artisanale & Restaurant La Séquère »

Choix du vérificateur : Seule ligne publiée par la brasserie sur son site : 06 86 46 20 02 (portable, règle du 21/10). Écartés : le 06 07 55 37 55 de Gault&Millau (annuaire, numéro différent de celui du site) et la catégorie 1, qui se déduirait du mot « Restaurant » et d'une cave citée par un annuaire seul. Le site parle d'un panier en ligne et de livraison, rien de plus. Aucune page Untappd trouvée.

**Aperçu de la fiche** (état du moment calculé le samedi 7 novembre 2026 à 00:00, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 2 rue de l'Arroun, ZAE de Laubian, 40510 Seignosse
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+La+S%C3%A9qu%C3%A8re+Seignosse)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+La+S%C3%A9qu%C3%A8re&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 86 46 20 02](tel:+33686462002)
> - [Site de la brasserie](https://lasequere.com)
> - Lu sur [lasequere.com](https://lasequere.com/pages/contact) le 6 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 5. L'Escource — fiche nouvelle

- n : (vide) → L'Escource
- c : (vide) → Escource
- d : (vide) → 40
- lat : (vide) → 44.16173
- lon : (vide) → -1.02486
- km : (vide) → 485
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie d'Escource, ouverte au public le jeudi d'après le site du tourisme des Landes, sans dire ce qu'on peut y faire. L'office écrit les heures à l'anglaise (le jeudi de 10 h à 12 h et de 14 h à 19 h 30) ; le contrôle ne relit pas cette écriture, elles restent dans cette note.
- addr : (vide) → 7 zone artisanale Moulin de Haut, 40210 Escource
- src : (vide) → https://www.landes-holidays.com/?p=355324
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://www.landes-holidays.com/?p=355324 ; https://data.geopf.fr/geocodage/search?q=7+zone+artisanale+Moulin+de+Haut%2C+40210+Escource&limit=5

Extrait lu : « Open to the public on Thursdays from 10am to 12pm and from 2pm to 7:30pm »

Choix du vérificateur : Catégorie 1 en confiance faible (règle du 29/10 : on y déguste sur place, vente à emporter non dite). Téléphone : la page propose seulement un lien « Contact by phone » sans numéro, donc aucun. Aucune page Untappd trouvée. Extrait en anglais car c'est la version lue ; la version française (tourismelandes.com/?p=501350, 403 pour moi) est citée par la recherche : « Ouverte au public le Jeudi de 10h à 12h et de 14h à 19h30. ». L'extrait est donc à recopier de la page ouverte par Cédric. Lu via un résumé.

**Aperçu de la fiche** (état du moment calculé le samedi 7 novembre 2026 à 00:00, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 7 zone artisanale Moulin de Haut, 40210 Escource
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=L%27Escource+Escource)[Ses bières sur Untappd](https://untappd.com/search?q=L%27Escource&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [landes-holidays.com](https://www.landes-holidays.com/?p=355324) le 6 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 6. Rosny Beer — fiche nouvelle

- n : (vide) → Rosny Beer
- c : (vide) → Seignosse
- d : (vide) → 40
- lat : (vide) → 43.68077
- lon : (vide) → -1.36007
- km : (vide) → 531.7
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → solide
- note : (vide) → Boutique de la brasserie ouverte en semaine ; la dégustation n'a lieu qu'avec la visite, sur réservation. Le bar de Capbreton n'est pas à cette adresse.
- addr : (vide) → 705 ZA de Larrigan, 40510 Seignosse
- src : (vide) → https://www.rosny-beer.com/visite-brasserie-seignosse-landes
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 05 47 80 08 60
- contact.site : (vide) → https://www.rosny-beer.com/
- contact.source : (vide) → https://www.rosny-beer.com/visite-brasserie-seignosse-landes
- contact.verifieLe : (vide) → 2026-11-06
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 9 h – 12 h 30
- horaires.0.mar : (vide) → 9 h – 17 h 30
- horaires.0.mer : (vide) → 9 h – 17 h 30
- horaires.0.jeu : (vide) → 9 h – 12 h 30
- horaires.0.ven : (vide) → 9 h – 12 h 30
- horaires.0.remarque : (vide) → Il se peut que nous soyons absents aux horaires d'ouverture, car en livraison ou pour d'autres raisons… Visites sur réservation.
- horaires.0.source : (vide) → https://www.rosny-beer.com/visite-brasserie-seignosse-landes
- horaires.0.verifieLe : (vide) → 2026-11-06
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://www.rosny-beer.com/visite-brasserie-seignosse-landes ; https://data.geopf.fr/geocodage/search?q=705+ZA+de+Larrigan%2C+40510+Seignosse&limit=5

Extrait lu : « Visites sur réservation, boutique ouverte du lundi au vendredi. »

Choix du vérificateur : Page lue directement. Dégustation lue (« Les visites se terminent toujours par une dégustation ») et boutique avec horaires : catégorie 1. Le téléphone est celui du pied de page du site de la brasserie. Les horaires sont ceux de la boutique, donc un bloc « vente ». Aucun lien Untappd sur le site : je n'en propose pas.

**Aperçu de la fiche** (état du moment calculé le samedi 7 novembre 2026 à 00:00, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À minuit (heure de Paris), vente : la source ne dit pas les heures de ce jour.
> - Adresse
> - 705 ZA de Larrigan, 40510 Seignosse
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Rosny+Beer&type=brewery)
> - Joindre la brasserie
> - [Appeler le 05 47 80 08 60](tel:+33547800860)
> - [Site de la brasserie](https://www.rosny-beer.com/)
> - Horaires
> - À savoir : Il se peut que nous soyons absents aux horaires d'ouverture, car en livraison ou pour d'autres raisons… Visites sur réservation.
> - Horaires de vente
> - Lundi | 9 h – 12 h 30
> - Mardi | 9 h – 17 h 30
> - Mercredi | 9 h – 17 h 30
> - Jeudi | 9 h – 12 h 30
> - Vendredi | 9 h – 12 h 30
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [rosny-beer.com](https://www.rosny-beer.com/visite-brasserie-seignosse-landes) le 6 novembre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 7. Kanaha Beer — fiche nouvelle

- n : (vide) → Kanaha Beer
- c : (vide) → Biscarrosse
- d : (vide) → 40
- lat : (vide) → 44.38403
- lon : (vide) → -1.14313
- km : (vide) → 485
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Le site de la brasserie annonce « Suite à l'incendie, la brasserie est fermée jusqu'à nouvel ordre » et, plus bas, « Brasserie ouverte au public et vente directe » : ce qu'on peut y faire n'est pas établi tant que la réouverture n'est pas annoncée. Horaires de boutique non repris pour cette raison.
- addr : (vide) → 143 Rue de la Ferronnerie, 40600 Biscarrosse
- src : (vide) → https://www.kanahabeer.com/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 05 58 04 64 78
- contact.site : (vide) → https://www.kanahabeer.com/
- contact.source : (vide) → https://www.kanahabeer.com/contact
- contact.verifieLe : (vide) → 2026-11-06
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://www.kanahabeer.com/ ; https://www.kanahabeer.com/contact ; https://data.geopf.fr/geocodage/search?q=143+Rue+de+la+Ferronnerie%2C+40600+Biscarrosse&limit=5

Extrait lu : « Suite à l'incendie, la brasserie est fermée jusqu'à nouvel ordre »

Choix du vérificateur : Catégorie laissée à 0 : la vente directe est écrite sur la page mais la brasserie est dite fermée jusqu'à nouvel ordre. Horaires de boutique (mercredi à samedi, 10h30-12h30 et 15h00-18h00) écartés : ils précèdent l'incendie ou ne sont plus valables. Aucune page Untappd trouvée (deux recherches), donc aucune bière reprise. Le fetch a résumé la page : la date de l'incendie n'est pas lue.

**Aperçu de la fiche** (état du moment calculé le samedi 7 novembre 2026 à 00:00, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 143 Rue de la Ferronnerie, 40600 Biscarrosse
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Kanaha+Beer+Biscarrosse)[Ses bières sur Untappd](https://untappd.com/search?q=Kanaha+Beer&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 05 58 04 64 78](tel:+33558046478)
> - [Site de la brasserie](https://www.kanahabeer.com/)
> - Lu sur [kanahabeer.com](https://www.kanahabeer.com/) le 6 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 8. Brasserie Bruel — fiche nouvelle

- n : (vide) → Brasserie Bruel
- c : (vide) → Tarnos
- d : (vide) → 40
- lat : (vide) → 43.53865
- lon : (vide) → -1.49858
- km : (vide) → 548.8
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Dégustations sur rendez-vous à la brasserie ; vente en ligne. La vente à emporter sur place n'est pas dite.
- addr : (vide) → 79 avenue du 1er Mai, 40220 Tarnos
- src : (vide) → https://brasseriebruel.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 72 19 15 43
- contact.site : (vide) → https://brasseriebruel.fr/
- contact.source : (vide) → https://brasseriebruel.fr/
- contact.verifieLe : (vide) → 2026-11-06
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://brasseriebruel.fr/ ; https://data.geopf.fr/geocodage/search?q=79+avenue+du+1er+Mai%2C+40220+Tarnos&limit=5

Extrait lu : « Nous organisons des dégustations sur rendez-vous à la brasserie, ouvertes aux particuliers comme aux professionnels. »

Choix du vérificateur : Page lue directement. On y boit sur rendez-vous, sans mention de vente à emporter : catégorie 1 en confiance faible, selon la réponse de Cédric du 29/10. Je ne passe pas en catégorie 4, car la page ne dit pas qu'on ne vend pas à emporter. Le numéro est un portable : c'est la seule ligne publiée par la brasserie sur son site (« Visites sur rendez-vous, appellez-nous +33 (0)6 72 19 15 43 »), donc permis par la règle du 21/10. Aucun horaire sur la page. Aucun lien Untappd sur la page.

**Aperçu de la fiche** (état du moment calculé le samedi 7 novembre 2026 à 00:00, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Adresse
> - 79 avenue du 1er Mai, 40220 Tarnos
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Bruel+Tarnos)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Bruel&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 72 19 15 43](tel:+33672191543)
> - [Site de la brasserie](https://brasseriebruel.fr/)
> - Lu sur [brasseriebruel.fr](https://brasseriebruel.fr/) le 6 novembre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 9. La Gang — fiche nouvelle

- n : (vide) → La Gang
- c : (vide) → Biscarrosse
- d : (vide) → 40
- lat : (vide) → 44.38133
- lon : (vide) → -1.13879
- km : (vide) → 484.8
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Brasserie avec taproom à côté des cuves de brassage, d'après son site ; la vente à emporter n'est lue que sur la légende d'une image. Ni horaires ni téléphone publiés.
- addr : (vide) → 668 rue de la Ferronnerie, 40600 Biscarrosse
- src : (vide) → https://lagang.fr/notre-taproom/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://lagang.fr/
- contact.source : (vide) → https://lagang.fr/notre-taproom/
- contact.verifieLe : (vide) → 2026-11-06
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://lagang.fr/notre-taproom/ ; https://data.geopf.fr/geocodage/search?q=668+rue+de+la+Ferronnerie%2C+40600+Biscarrosse&limit=5

Extrait lu : « le bar est situé juste à côté des cuves de brassage, sans aucune séparation ! »

Choix du vérificateur : Lu via un résumé de la page (WebFetch), pas directement. Adresse reprise de SIRENE, absente du site (le site ne donne que « Biscarrosse »). Vente à emporter lue sur la légende d'une image : « Brasserie La Gang, Stand vente à emporter ». Confiance « moyenne » faute d'horaires et d'adresse publiée. Bières citées sur la page d'accueil (Captain Obvious, Allez Topette, Amitiés Amicales), non retenues faute d'Untappd. Aucun téléphone ni horaire sur le site ni sur /contact/. Pas de page Untappd trouvée.

**Aperçu de la fiche** (état du moment calculé le samedi 7 novembre 2026 à 00:00, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Adresse
> - 668 rue de la Ferronnerie, 40600 Biscarrosse
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=La+Gang+Biscarrosse)[Ses bières sur Untappd](https://untappd.com/search?q=La+Gang&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://lagang.fr/)
> - Lu sur [lagang.fr](https://lagang.fr/notre-taproom/) le 6 novembre 2026. Ce qu’on peut y faire est probable, pas établi par la source : lisez-la avant d’y aller.

Empreinte du lot : a7d2a3430d8a
