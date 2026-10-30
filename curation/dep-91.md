# Lot dep-91 — l'Essonne (S345)

Ce lot ajoute **2 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 20 candidats = 2 proposés + 18 non proposés (tableau ci-dessous).
Catégories proposées : 1 « acheter et consommer », 0 « acheter seulement », 0 « pas de vente », 1 « à confirmer », 0 « consommer sur place seulement ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| LE HIBOU BLOND (`sirene:924943566`) | lu le 29/10 : rien sous ce nom |
| Entreprise individuelle (`personne:1`) | lu le 29/10 : rien sous ce nom |
| DELABY'ERE A LA PERROT (`sirene:989267950`) | lu le 29/10 : rien sous ce nom |
| Entreprise individuelle (`personne:2`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:3`) | lu le 29/10 : rien sous ce nom |
| INKRAFT BEER COMPANY (`sirene:810361386`) | lu le 29/10 : un annuaire et un revendeur seuls ; site en erreur 503 : à relancer |
| BRASSERIE DE LA JUINE (`sirene:828711895`) | lu le 29/10 : site refusé (403), plateforme touristique seule : à relancer |
| Entreprise individuelle (`personne:4`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:5`) | entreprise sans nom ni adresse : rien à chercher |
| KINGS OF NAWAK BREWERY (`sirene:882589708`) | lu le 29/10 : adresse contradictoire (registre à Étampes, site à Bouville) ; rien sur la vente : à relancer |
| BRASSERIE GALILEE (`sirene:897825873`) | lu le 29/10 : un annuaire d'entreprises seul |
| BRASSERIE DU TREFLE DORE (`sirene:991210873`) | lu le 29/10 : rien sous ce nom |
| Mets et Pierre (`node/11668938625`) | lu le 29/10 : rien sous ce nom |
| Brasserie de Marcoussis (`node/11987264719`) | lu le 29/10 : même brasserie que la lecture sirene:788908853 (OX, Marcoussis) |
| Bories Jarnouen de Villartay (`node/13098373138`) | lu le 29/10 : rien sous ce nom |
| La Brasserie Fondamentale (`node/13872612566`) | lu le 29/10 : sources contradictoires ; rien ne la place dans l'Essonne |
| Parisis (Épinay-sous-Sénart) (`node/3515412159`) | lu le 29/10 : ancienne adresse : la brasserie est à Combs-la-Ville (77), lue dans dep-77 |
| Le spot (`node/7859264371`) | lu le 29/10 : une restauration universitaire, pas une brasserie |

## Les fiches proposées

## Lot dep-91 — 0 proposition(s), 2 fiche(s) nouvelle(s)

### 1. La Bouledogue — fiche nouvelle

- n : (vide) → La Bouledogue
- c : (vide) → Villebon-sur-Yvette
- d : (vide) → 91
- lat : (vide) → 48.69789
- lon : (vide) → 2.23543
- km : (vide) → 386.3
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie indépendante lancée en 2015. Son site dit qu'elle ouvre ses portes aux visiteurs en semaine, mais ne dit pas si l'on peut y acheter ou y boire. Le point OpenStreetMap la place à Saulx-les-Chartreux, le site à Villebon-sur-Yvette.
- addr : (vide) → Complexe industriel de la Prairie, rue de la Prairie, 91140 Villebon-sur-Yvette
- src : (vide) → http://www.labouledogue.fr/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.site : (vide) → http://www.labouledogue.fr/
- contact.source : (vide) → http://www.labouledogue.fr/
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → accueil
- horaires.0.lun : (vide) → 9 h – 18 h
- horaires.0.mar : (vide) → 9 h – 18 h
- horaires.0.mer : (vide) → 9 h – 18 h
- horaires.0.jeu : (vide) → 9 h – 18 h
- horaires.0.ven : (vide) → 9 h – 18 h
- horaires.0.remarque : (vide) → Visite de la brasserie, sans interruption.
- horaires.0.source : (vide) → http://www.labouledogue.fr/
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : http://www.labouledogue.fr/ ; https://data.geopf.fr/geocodage/search?q=Villebon-sur-Yvette&type=municipality&limit=5

Extrait lu : « la brasserie vous ouvre ses portes du lundi au vendredi de 9h à 18h00 »

Choix du vérificateur : Commune : le site officiel donne « 91140 VILLEBON-SUR-YVETTE » et le point OSM (Saulx-les-Chartreux) n'est pas la même commune ; j'ai suivi le site. Les deux communes sont voisines, à toi de dire si la position OSM sert. Catégorie 0 : le site ne parle ni de vente sur place ni de dégustation (« Commander en ligne » via easybeer.shop, livraison), donc je ne classe pas en 1 ou 2. Téléphone : le site publie deux portables, un par fondateur (06 98 98 19 84 et 06 83 11 81 27). Aucun n'est la ligne de la brasserie, donc je n'en retiens aucun. Horaires : le bloc « accueil » ne couvre que lundi à vendredi, comme écrit. Samedi et dimanche restent absents, rien n'est déduit. Untappd : aucune page de la brasserie trouvée, aucun lien sur le site, donc aucun lien proposé. Bières : le site cite Coco Pale Ale, Blonde et DDH Double IPA, mais sans fiche détaillée ni source de dates, donc beers vide. La page easybeer.shop n'a rendu que son titre. Les recherches sur Untappd et le web n'ont rien donné de plus. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 23:48, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Maintenant
> - À 23 h 48 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : demain à 9 h, sous réserve.
> - Adresse
> - Complexe industriel de la Prairie, rue de la Prairie, 91140 Villebon-sur-Yvette
> - Pas encore dans la fiche : son téléphone et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=La+Bouledogue+Villebon-sur-Yvette)[Ses bières sur Untappd](https://untappd.com/search?q=La+Bouledogue&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](http://www.labouledogue.fr/)
> - Horaires
> - À savoir : Visite de la brasserie, sans interruption.
> - Horaires d’accueil du public
> - Lundi | 9 h – 18 h
> - Mardi | 9 h – 18 h
> - Mercredi | 9 h – 18 h
> - Jeudi | 9 h – 18 h
> - Vendredi | 9 h – 18 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [labouledogue.fr](http://www.labouledogue.fr/) le 29 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 2. Brasserie Artisanale de Marcoussis — fiche nouvelle

- n : (vide) → Brasserie Artisanale de Marcoussis
- c : (vide) → Marcoussis
- d : (vide) → 91
- lat : (vide) → 48.65939
- lon : (vide) → 2.20718
- km : (vide) → 383.7
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Bar et vente sur place aux horaires publiés par la brasserie sur son site.
- addr : (vide) → 50 route d'Orsay, 91460 Marcoussis
- src : (vide) → https://brasserie-ox.fr/contact
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 01 69 63 45 54
- contact.site : (vide) → https://brasserie-ox.fr/
- contact.source : (vide) → https://brasserie-ox.fr/contact
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → accueil
- horaires.0.mar : (vide) → 17 h – 19 h
- horaires.0.mer : (vide) → 17 h – 19 h
- horaires.0.jeu : (vide) → 17 h – 19 h
- horaires.0.ven : (vide) → 17 h – 22 h
- horaires.0.sam : (vide) → 10 h – 13 h, 15 h – 20 h
- horaires.0.source : (vide) → https://brasserie-ox.fr/contact
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://brasserie-ox.fr/contact ; https://data.geopf.fr/geocodage/search?q=50+route+d%27Orsay%2C+91460+Marcoussis&limit=5

Extrait lu : « Horaires du bar et de la vente sur place : »

Choix du vérificateur : Pas de types de bière retenus : le site officiel dit seulement « Fabrique de bières bio artisanales ». Les styles (blonde, IPA…) ne sont lus que sur Open Food Facts et Beertasting, pas sur le site, donc écartés. Aucune page Untappd trouvée. Le bloc d'horaires est classé accueil car la source réunit bar et vente sur place. La fermeture estivale « du 11 au 22 août 2026 inclus » est sur la page d'accueil, pas sur la page contact, donc non reprise. L'enseigne SIRENE est OX BIER. Un point OSM « Brasserie de Marcoussis » (node/11987264719) est dans le paquet n° 2 : probable doublon de cette fiche. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 23:48, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 23 h 48 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : demain à 17 h.
> - Adresse
> - 50 route d'Orsay, 91460 Marcoussis
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Artisanale+de+Marcoussis&type=brewery)
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
> - Lu sur [brasserie-ox.fr](https://brasserie-ox.fr/contact) le 29 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

Empreinte du lot : 52e42d9075ee
