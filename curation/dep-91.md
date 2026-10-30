# Lot dep-91 — l'Essonne (S345)

Ce lot ajoute **4 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 20 candidats = 4 proposés + 16 non proposés (tableau ci-dessous).
Catégories proposées : 2 « acheter et consommer », 0 « acheter seulement », 0 « pas de vente », 2 « à confirmer », 0 « consommer sur place seulement ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| LE HIBOU BLOND (`sirene:924943566`) | registre seul, ce qui ne suffit pas (méthode du 19/10) |
| Entreprise individuelle (`personne:1`) | annuaire de prestataires de mariage seul |
| DELABY'ERE A LA PERROT (`sirene:989267950`) | registre seul, ce qui ne suffit pas (méthode du 19/10) |
| Entreprise individuelle (`personne:2`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:3`) | une seule recherche faite, rien trouvé : à relancer |
| INKRAFT BEER COMPANY (`sirene:810361386`) | certificat du site en erreur, annuaire seul : à relancer |
| Entreprise individuelle (`personne:4`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:5`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE GALILEE (`sirene:897825873`) | registre seul, ce qui ne suffit pas (méthode du 19/10) |
| BRASSERIE DU TREFLE DORE (`sirene:991210873`) | introuvable : aucun site, aucun Untappd, aucun office de tourisme |
| Mets et Pierre (`node/11668938625`) | introuvable : aucun site, aucun Untappd, aucun office de tourisme |
| Brasserie de Marcoussis (`node/11987264719`) | même brasserie que sirene:788908853 |
| Point OSM au nom de personne (`node/13098373138`) | nom de personne ; la brasserie de cette adresse s'est installée en Seine-et-Marne, hors de ce département |
| La Brasserie Fondamentale (`node/13872612566`) | site illisible, agrégateur seul, rien sur la commune : à relancer |
| Parisis (Épinay-sous-Sénart) (`node/3515412159`) | établissement fermé ; la brasserie est à Combs-la-Ville (sirene:509184214) |
| Le spot (`node/7859264371`) | centre commercial et bars, aucune brasserie |

## Les fiches proposées

## Lot dep-91 — 0 proposition(s), 4 fiche(s) nouvelle(s)

### 1. La Bouledogue — fiche nouvelle

- n : (vide) → La Bouledogue
- c : (vide) → Villebon-sur-Yvette
- d : (vide) → 91
- lat : (vide) → 48.69789
- lon : (vide) → 2.23543
- km : (vide) → 386.3
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie indépendante qui ouvre ses portes aux visites du lundi au vendredi, sans parler de vente ni de dégustation sur place.
- addr : (vide) → Complexe industriel de la Prairie, rue de la Prairie, 91140 Villebon-sur-Yvette
- src : (vide) → http://www.labouledogue.fr/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.site : (vide) → http://www.labouledogue.fr/
- contact.source : (vide) → http://www.labouledogue.fr/
- contact.verifieLe : (vide) → 2026-10-30
- verifieLe : (vide) → 2026-10-30

Sources (vérifiée le 2026-10-30) : http://www.labouledogue.fr/ ; https://data.geopf.fr/geocodage/search?q=Villebon-sur-Yvette&type=municipality&limit=5

Extrait lu : « la brasserie vous ouvre ses portes du lundi au vendredi »

Choix du vérificateur : OSM disait Saulx-les-Chartreux, le site Villebon-sur-Yvette. Deux portables, chacun attaché à un nom de personne : aucun n'est retenu. Source rouverte à la main le 30/10.

**Aperçu de la fiche** (état du moment calculé le vendredi 30 octobre 2026 à 13:30, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - Complexe industriel de la Prairie, rue de la Prairie, 91140 Villebon-sur-Yvette
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=La+Bouledogue+Villebon-sur-Yvette)[Ses bières sur Untappd](https://untappd.com/search?q=La+Bouledogue&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](http://www.labouledogue.fr/)
> - Lu sur [labouledogue.fr](http://www.labouledogue.fr/) le 30 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 2. Brasserie artisanale de Marcoussis (OX) — fiche nouvelle

- n : (vide) → Brasserie artisanale de Marcoussis (OX)
- c : (vide) → Marcoussis
- d : (vide) → 91
- lat : (vide) → 48.65939
- lon : (vide) → 2.20718
- km : (vide) → 383.7
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Le site donne les horaires du bar et de la vente sur place.
- addr : (vide) → 50 route d'Orsay, 91460 Marcoussis
- src : (vide) → https://brasserie-ox.fr/contact/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 01 69 63 45 54
- contact.site : (vide) → https://brasserie-ox.fr/
- contact.source : (vide) → https://brasserie-ox.fr/contact/
- contact.verifieLe : (vide) → 2026-10-30
- horaires.0.nature : (vide) → accueil
- horaires.0.mar : (vide) → 17 h – 19 h
- horaires.0.mer : (vide) → 17 h – 19 h
- horaires.0.jeu : (vide) → 17 h – 19 h
- horaires.0.ven : (vide) → 17 h – 22 h
- horaires.0.sam : (vide) → 10 h – 13 h, 15 h – 20 h
- horaires.0.source : (vide) → https://brasserie-ox.fr/contact/
- horaires.0.verifieLe : (vide) → 2026-10-30
- verifieLe : (vide) → 2026-10-30

Sources (vérifiée le 2026-10-30) : https://brasserie-ox.fr/contact/ ; https://data.geopf.fr/geocodage/search?q=50+route+d%27Orsay%2C+91460+Marcoussis&limit=5

Extrait lu : « Horaires du bar et de la vente sur place »

Choix du vérificateur : Même brasserie que le point OSM node/11987264719. Source rouverte à la main le 30/10.

**Aperçu de la fiche** (état du moment calculé le vendredi 30 octobre 2026 à 13:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 13 h 30 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 17 h.
> - Adresse
> - 50 route d'Orsay, 91460 Marcoussis
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+artisanale+de+Marcoussis+%28OX%29&type=brewery)
> - Joindre la brasserie
> - [Appeler le 01 69 63 45 54](tel:+33169634554)
> - [Site de la brasserie](https://brasserie-ox.fr/)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | 17 h – 19 h
> - Mercredi | 17 h – 19 h
> - Jeudi | 17 h – 19 h
> - Vendredi | 17 h – 22 h
> - Samedi | 10 h – 13 h, 15 h – 20 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserie-ox.fr](https://brasserie-ox.fr/contact/) le 30 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 3. Brasserie de la Juine — fiche nouvelle

- n : (vide) → Brasserie de la Juine
- c : (vide) → Ballancourt-sur-Essonne
- d : (vide) → 91
- lat : (vide) → 48.52977
- lon : (vide) → 2.38767
- km : (vide) → 364.5
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Un brewpub sert à la pression les bières brassées sur place. Le site ne cite qu'une boutique en ligne : il ne dit pas la vente à emporter sur place.
- addr : (vide) → 3 bis rue des Bernaches, 91610 Ballancourt-sur-Essonne
- src : (vide) → http://www.brasseriedelajuine.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 01 86 10 04 61
- contact.site : (vide) → http://www.brasseriedelajuine.fr
- contact.source : (vide) → http://www.brasseriedelajuine.fr
- contact.verifieLe : (vide) → 2026-10-30
- horaires.0.nature : (vide) → accueil
- horaires.0.mar : (vide) → 10 h – 12 h, 15 h – 20 h
- horaires.0.mer : (vide) → 10 h – 12 h, 15 h – 20 h
- horaires.0.jeu : (vide) → 10 h – 12 h, 15 h – 21 h
- horaires.0.ven : (vide) → 10 h – 12 h, 15 h – 22 h
- horaires.0.sam : (vide) → 11 h – 23 h
- horaires.0.source : (vide) → http://www.brasseriedelajuine.fr
- horaires.0.verifieLe : (vide) → 2026-10-30
- verifieLe : (vide) → 2026-10-30

Sources (vérifiée le 2026-10-30) : http://www.brasseriedelajuine.fr ; https://data.geopf.fr/geocodage/search?q=3+bis+rue+des+Bernaches%2C+91610+Ballancourt-sur-Essonne&limit=5

Extrait lu : « Bienvenue à la Brasserie de la Juine, brasserie artisanale et Brewpub à Ballancourt-sur-Essonne. »

Choix du vérificateur : Réponse de Cédric du 29/10 : un bar dont la source ne dit pas la vente à emporter, catégorie 1, confiance faible. Source rouverte à la main le 30/10.

**Aperçu de la fiche** (état du moment calculé le vendredi 30 octobre 2026 à 13:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Maintenant
> - À 13 h 30 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 15 h.
> - Adresse
> - 3 bis rue des Bernaches, 91610 Ballancourt-sur-Essonne
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+de+la+Juine&type=brewery)
> - Joindre la brasserie
> - [Appeler le 01 86 10 04 61](tel:+33186100461)
> - [Site de la brasserie](http://www.brasseriedelajuine.fr)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | 10 h – 12 h, 15 h – 20 h
> - Mercredi | 10 h – 12 h, 15 h – 20 h
> - Jeudi | 10 h – 12 h, 15 h – 21 h
> - Vendredi | 10 h – 12 h, 15 h – 22 h
> - Samedi | 11 h – 23 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriedelajuine.fr](http://www.brasseriedelajuine.fr) le 30 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 4. Kings of Nawak Brewery — fiche nouvelle

- n : (vide) → Kings of Nawak Brewery
- c : (vide) → Étampes
- d : (vide) → 91
- lat : (vide) → 48.45151
- lon : (vide) → 2.15441
- km : (vide) → 366.2
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Le site donne des horaires, le vendredi et le samedi de 14h à 18h ou sur rendez-vous, sans dire ce qu'on peut y acheter ou y boire.
- addr : (vide) → 25 avenue des Grenots, 91150 Étampes
- src : (vide) → https://www.kingsofnawakbrewery.com
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 07 49 86 50 04
- contact.site : (vide) → https://www.kingsofnawakbrewery.com
- contact.source : (vide) → https://www.kingsofnawakbrewery.com
- contact.verifieLe : (vide) → 2026-10-30
- verifieLe : (vide) → 2026-10-30

Sources (vérifiée le 2026-10-30) : https://www.kingsofnawakbrewery.com ; https://data.geopf.fr/geocodage/search?q=25+avenue+des+Grenots%2C+91150+%C3%89tampes&limit=5

Extrait lu : « Vendredi : 14H à 18H »

Choix du vérificateur : Deux portables publiés, aucun fixe, aucun nom attaché sur cette page : le premier est retenu. Adresse du registre, le site ne la donne pas sur cette page. Source rouverte à la main le 30/10.

**Aperçu de la fiche** (état du moment calculé le vendredi 30 octobre 2026 à 13:30, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 25 avenue des Grenots, 91150 Étampes
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Kings+of+Nawak+Brewery+%C3%89tampes)[Ses bières sur Untappd](https://untappd.com/search?q=Kings+of+Nawak+Brewery&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 07 49 86 50 04](tel:+33749865004)
> - [Site de la brasserie](https://www.kingsofnawakbrewery.com)
> - Lu sur [kingsofnawakbrewery.com](https://www.kingsofnawakbrewery.com) le 30 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

Empreinte du lot : 31b18dc6d792
