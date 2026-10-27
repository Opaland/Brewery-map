# Lot dep-84 — le Vaucluse (S343)

Ce lot ajoute **19 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 41 candidats = 19 proposés + 22 non proposés (tableau ci-dessous).
Catégories proposées : 5 « acheter et consommer », 5 « acheter seulement », 0 « pas de vente », 9 « à confirmer ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| Entreprise individuelle (`personne:1`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE QUATRE DAMES (`sirene:919285676`) | Brasserie Quatre Dames (Bédoin) : deux recherches, aucune page |
| FAT ASS BREWERY (`sirene:898674817`) | Fat Ass Brewery : seul un homonyme au Texas |
| Entreprise individuelle (`personne:2`) | Brasserie des Gueux (Avignon) : un annuaire seul |
| CONSEIL ET DEVELOPPEMENT COMTADIN (`sirene:453334948`) | Conseil et Développement Comtadin : une société de conseil, pas une brasserie |
| LA TOTOCHE DU LUBERON (`sirene:924939853`) | La Totoche du Luberon (Cucuron) : une recherche, rien ; quota épuisé : à relancer |
| Entreprise individuelle (`personne:3`) | entreprise sans nom ni adresse : rien à chercher |
| L'ODYSSEE DES BONS VIVANTS (`sirene:923410930`) | L'Odyssée des Bons Vivants (Pernes) : une recherche, rien ; quota épuisé : à relancer |
| BRASSERIE DU COMTAT (`sirene:834513327`) | Brasserie du Comtat (Malemort) : une recherche, rien ; quota épuisé : à relancer |
| Entreprise individuelle (`personne:4`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE DU SOLEIL (`sirene:951166255`) | Brasserie du Soleil (Puyméras) : trois recherches, aucune page |
| BRASSERIE DE VAUCROZE (`sirene:909659427`) | Brasserie de Vaucroze (Sorgues) : deux recherches, rien |
| ASSOCIATION HOUBLONS & MUSIQUES (`sirene:924124621`) | Association Houblons & Musiques (Rustrel) : deux recherches, rien |
| BRASSERIE ARTISANALE OCRIA (`sirene:838447480`) | Brasserie artisanale Ocria : son domaine mène à un site de jeux d'argent, un annuaire seul la dit fermée ; quota épuisé : à relancer |
| Entreprise individuelle (`personne:5`) | entreprise sans nom ni adresse : rien à chercher |
| AGENCE MOREAU SARL (`sirene:809257082`) | Agence Moreau SARL (Orange) : non cherchée, quota épuisé : à relancer |
| BRASSERIE BICHEIRO (`sirene:982068223`) | Brasserie Bicheiro (Cavaillon) : une recherche, rien ; quota épuisé : à relancer |
| LA BRASSERIE INTERDITE (`sirene:895230449`) | La Brasserie Interdite (Pertuis) : site introuvable, une recherche ; quota épuisé : à relancer |
| Entreprise individuelle (`personne:6`) | entreprise sans nom ni adresse : rien à chercher |
| Brasserie Epicentre Pertuis (`node/13875880501`) | Brasserie Epicentre : même lieu que sirene:918759200, une seule fiche |
| Bière la Machotte (`way/1275696941`) | Bière la Machotte (Sarrians) : une recherche, rien ; quota épuisé : à relancer |
| Brasserie Ameno (`way/996274090`) | Brasserie Ameno : même lieu que sirene:890399439, une seule fiche |

## Les fiches proposées

## Lot dep-84 — 0 proposition(s), 19 fiche(s) nouvelle(s)

### 1. Brasserie Artisanale du Luberon — fiche nouvelle

- n : (vide) → Brasserie Artisanale du Luberon
- c : (vide) → Pertuis
- d : (vide) → 84
- lat : (vide) → 43.67601
- lon : (vide) → 5.50283
- km : (vide) → 230
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Le site de la brasserie annonce un magasin ouvert le jeudi et le vendredi de 14 h à 17 h (hors jours fériés), fermé les autres jours, où l'on peut s'approvisionner directement. La page parle aussi d'un « taproom » sans rien dire de la consommation sur place : on ne retient que l'achat.
- addr : (vide) → 72 rue Philippe de Girard, 84120 Pertuis
- src : (vide) → https://brasserie-luberon.com/nous-rencontrer
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://brasserie-luberon.com
- contact.source : (vide) → https://brasserie-luberon.com/nous-rencontrer
- contact.verifieLe : (vide) → 2026-10-27
- horaires.0.nature : (vide) → vente
- horaires.0.jeu : (vide) → 14 h – 17 h
- horaires.0.ven : (vide) → 14 h – 17 h
- horaires.0.remarque : (vide) → Hors jours fériés.
- horaires.0.source : (vide) → https://brasserie-luberon.com/nous-rencontrer
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://brasserie-luberon.com/nous-rencontrer ; https://data.geopf.fr/geocodage/search?q=72+rue+Philippe+de+Girard%2C+84120+Pertuis&limit=5

Extrait lu : « Le magasin de la brasserie est ouvert les jeudi et vendredi, de 14h à 17h (hors jours fériés). »

Choix du vérificateur : Nom d'usage du site ; même entreprise que la ligne du registre, au même numéro de rue. Aucun téléphone publié par la brasserie. Horaires du magasin lus sur le site ; ceux de l'office, différents, écartés. Le lien Untappd n'est pas sur la page : non repris.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 16 h 49 (heure de Paris), vente : la source ne dit pas les heures de ce jour.
> - Adresse
> - 72 rue Philippe de Girard, 84120 Pertuis
> - Pas encore dans la fiche : son téléphone et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Artisanale+du+Luberon+Pertuis)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Artisanale+du+Luberon&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://brasserie-luberon.com)
> - Horaires
> - À savoir : Hors jours fériés.
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | 14 h – 17 h
> - Vendredi | 14 h – 17 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserie-luberon.com](https://brasserie-luberon.com/nous-rencontrer) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 2. Brasserie Artisanale du Mont Ventoux — fiche nouvelle

- n : (vide) → Brasserie Artisanale du Mont Ventoux
- c : (vide) → Carpentras
- d : (vide) → 84
- lat : (vide) → 44.05647
- lon : (vide) → 5.05967
- km : (vide) → 181.5
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Boutique à Carpentras, décrite comme espace de dégustation et de vente ; la fabrique est à Caromb, visites et dégustations à la fabrique sur rendez-vous seulement. La page ne dit pas expressément qu'on y boit sur place (confiance moyenne).
- addr : (vide) → 558 avenue du Mont Ventoux, 84200 Carpentras
- src : (vide) → https://www.brasserie-ventoux.com/nos-boutiques
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 04 90 63 34 35
- contact.site : (vide) → https://www.brasserie-ventoux.com
- contact.source : (vide) → https://www.brasserie-ventoux.com/nos-boutiques
- contact.verifieLe : (vide) → 2026-10-27
- horaires.0.nature : (vide) → accueil
- horaires.0.lun : (vide) → 14 h 30 – 18 h 30
- horaires.0.mar : (vide) → 10 h – 12 h, 14 h 30 – 18 h 30
- horaires.0.jeu : (vide) → 10 h – 12 h, 14 h 30 – 18 h 30
- horaires.0.ven : (vide) → 10 h – 12 h, 14 h 30 – 18 h 30
- horaires.0.sam : (vide) → 10 h – 12 h, 14 h 30 – 18 h 30
- horaires.0.remarque : (vide) → Boutique de Carpentras ; visites et dégustations à la fabrique de Caromb sur rendez-vous seulement.
- horaires.0.source : (vide) → https://www.brasserie-ventoux.com/nos-boutiques
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://www.brasserie-ventoux.com/nos-boutiques ; https://data.geopf.fr/geocodage/search?q=558+avenue+du+Mont+Ventoux%2C+84200+Carpentras&limit=5

Extrait lu : « La boutique c'est à la fois un espace de dégustation et de vente pour échanger, partager et refaire le monde »

Choix du vérificateur : Page lue en entier (rendu texte, bandeau cookies compris). Extrait recopié tel que rendu par l'outil de lecture ; la phrase se prolonge par « en toute convivialité… ». Le site de la brasserie écrit le numéro avec des lettres O sur la page d'accueil ; retenu : « Tél. 04 90 63 34 35 » de la page boutiques. Adresse retenue : la boutique de Carpentras, la fabrique de Caromb étant sur rendez-vous. Horaires de la boutique : lundi 14h30-18h30, mardi/jeudi/vendredi/samedi 10h-12h et 14h30-18h30, mercredi et dimanche fermé. Aucun Untappd trouvé (recherche + site : seulement Facebook et Instagram).

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 16 h 49 (heure de Paris), accueil du public : ouvert jusqu’à 18 h 30 selon les créneaux, sous réserve de la remarque ci-dessous.
> - Adresse
> - 558 avenue du Mont Ventoux, 84200 Carpentras
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Artisanale+du+Mont+Ventoux&type=brewery)
> - Joindre la brasserie
> - [Appeler le 04 90 63 34 35](tel:+33490633435)
> - [Site de la brasserie](https://www.brasserie-ventoux.com)
> - Horaires
> - À savoir : Boutique de Carpentras ; visites et dégustations à la fabrique de Caromb sur rendez-vous seulement.
> - Horaires d’accueil du public
> - Lundi | 14 h 30 – 18 h 30
> - Mardi | 10 h – 12 h, 14 h 30 – 18 h 30
> - Mercredi | non précisé
> - Jeudi | 10 h – 12 h, 14 h 30 – 18 h 30
> - Vendredi | 10 h – 12 h, 14 h 30 – 18 h 30
> - Samedi | 10 h – 12 h, 14 h 30 – 18 h 30
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserie-ventoux.com](https://www.brasserie-ventoux.com/nos-boutiques) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 3. La Déjantée — fiche nouvelle

- n : (vide) → La Déjantée
- c : (vide) → L'Isle-sur-la-Sorgue
- d : (vide) → 84
- lat : (vide) → 43.91503
- lon : (vide) → 5.05868
- km : (vide) → 197.1
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → La brasserie existe : le registre SIRENE et la fiche de l'office de tourisme de L'Isle-sur-la-Sorgue la décrivent comme une micro-brasserie artisanale créée en 2016. Pas de site propre trouvé ; ce qu'on peut y faire n'est pas établi : à confirmer.
- addr : (vide) → 140 avenue Gustave Eiffel, 84800 L'Isle-sur-la-Sorgue
- src : (vide) → https://uk.islesurlasorguetourisme.com/brasserie-la-dejantee---en-234414
- coordPrecision : (vide) → centre
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://uk.islesurlasorguetourisme.com/brasserie-la-dejantee---en-234414 ; https://data.geopf.fr/geocodage/search?q=L%27Isle-sur-la-Sorgue&type=municipality&limit=5

Extrait lu : « Discover the La Déjantée brewery, an artisanal micro-brewery created in 2016 »

Choix du vérificateur : Catégorie 0, aucun site officiel trouvé : seulement l'office de tourisme (page anglaise lue par un résumé, pas la version française) et des pages Facebook et Instagram (Facebook illisible sans connexion). Horaires de l'office non repris : ils portent sur la saison 2025 (« Monday to Friday between 9 am and 6 pm ») et la nature (accueil ou vente) n'est pas dite. Téléphone : seul celui de l'office est publié, non repris.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 140 avenue Gustave Eiffel, 84800 L'Isle-sur-la-Sorgue
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=La+D%C3%A9jant%C3%A9e+L%27Isle-sur-la-Sorgue)[Ses bières sur Untappd](https://untappd.com/search?q=La+D%C3%A9jant%C3%A9e&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [uk.islesurlasorguetourisme.com](https://uk.islesurlasorguetourisme.com/brasserie-la-dejantee---en-234414) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 4. La Comédienne — fiche nouvelle

- n : (vide) → La Comédienne
- c : (vide) → Avignon
- d : (vide) → 84
- lat : (vide) → 43.93335
- lon : (vide) → 4.84063
- km : (vide) → 193.7
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → La brasserie existe : son site la dit la bière d'Avignon depuis 2017, avec production sur place, et son menu cite « Le bar ». La page lue ne dit pas ce qu'on peut y faire ni quand : à confirmer.
- addr : (vide) → 5 avenue Elsa Triolet, 84000 Avignon
- src : (vide) → https://lacomedienne.beer/la-brasserie
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://lacomedienne.beer
- contact.source : (vide) → https://lacomedienne.beer/la-brasserie
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://lacomedienne.beer/la-brasserie ; https://data.geopf.fr/geocodage/search?q=5+avenue+Elsa+Triolet%2C+84000+Avignon&limit=5

Extrait lu : « La Comédienne est depuis 2017 la bière d'Avignon. »

Choix du vérificateur : Catégorie 0 : la page « Le bar » du site n'a pas pu être lue (adresse devinée en 404). La fiche de l'office (Provence Guide) parle de dégustations de groupe et de visites sur demande, mais elle est contradictoire sur les jours (« tous les jours » et « fermé samedi et dimanche ») et la catégorie reste à confirmer. Aucun téléphone repris : il n'est publié que par l'office (précédent S342) ; la page du site ne donne qu'un courriel. Pas d'Untappd cherché (quota).

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 5 avenue Elsa Triolet, 84000 Avignon
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=La+Com%C3%A9dienne+Avignon)[Ses bières sur Untappd](https://untappd.com/search?q=La+Com%C3%A9dienne&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://lacomedienne.beer)
> - Lu sur [lacomedienne.beer](https://lacomedienne.beer/la-brasserie) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 5. La Géante de Provence — fiche nouvelle

- n : (vide) → La Géante de Provence
- c : (vide) → Brantes
- d : (vide) → 84
- lat : (vide) → 44.19248
- lon : (vide) → 5.33271
- km : (vide) → 171
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Micro-brasserie bio créée en 2017 à Brantes. La fiche de l'office de tourisme (seule source lue) indique vente à la propriété et boutique, visite gratuite sur demande, et précise que les horaires ne sont pas garantis. Pas de site officiel trouvé, pas d'horaires.
- addr : (vide) → Le Village, 84390 Brantes
- src : (vide) → https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/la-geante-de-provence-brantes-fr-2885082/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/la-geante-de-provence-brantes-fr-2885082/ ; https://data.geopf.fr/geocodage/search?q=Brantes&type=municipality&limit=5

Extrait lu : « Vente à la propriété »

Choix du vérificateur : Source : office de tourisme régional seul, donc confiance moyenne au plus ; l'existence est aussi attestée par la fiche d'un autre office (provenceguide.com) et le registre SIRENE. Catégorie 2 : la fiche cite aussi « Dégustation de produits » et une petite restauration sur place, mais pas de bar ni de dégustation clairement ouverte, donc je ne propose pas 1. Téléphones de la fiche (04 75 28 29 13 et 06 23 45 03 49) non repris : publiés par un office, pas par la brasserie.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - Le Village, 84390 Brantes
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=La+G%C3%A9ante+de+Provence+Brantes)[Ses bières sur Untappd](https://untappd.com/search?q=La+G%C3%A9ante+de+Provence&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [provence-alpes-cotedazur.com](https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/la-geante-de-provence-brantes-fr-2885082/) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 6. Brasserie Chante Grenouille — fiche nouvelle

- n : (vide) → Brasserie Chante Grenouille
- c : (vide) → Vaison-la-Romaine
- d : (vide) → 84
- lat : (vide) → 44.2494
- lon : (vide) → 5.06143
- km : (vide) → 160.3
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Connue d'une fiche de l'office de tourisme, qui cite une boutique et une dégustation de produits, sur rendez-vous. Pas de site propre trouvé.
- addr : (vide) → Avenue Marcel Pagnol, 84110 Vaison-la-Romaine
- src : (vide) → https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/chante-grenouille-vaison-la-romaine-fr-4133779/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/chante-grenouille-vaison-la-romaine-fr-4133779/ ; https://data.geopf.fr/geocodage/search?q=Vaison-la-Romaine&type=municipality&limit=5

Extrait lu : « Dégustation de produits »

Choix du vérificateur : Catégorie 0 : la boutique et la dégustation ne sont dites que sur rendez-vous, par l'office seul. Le nom d'usage est celui de l'office ; il est rapproché de la ligne du registre par l'adresse. Téléphone publié par l'office seul : non repris.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - Avenue Marcel Pagnol, 84110 Vaison-la-Romaine
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Chante+Grenouille+Vaison-la-Romaine)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Chante+Grenouille&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [provence-alpes-cotedazur.com](https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/chante-grenouille-vaison-la-romaine-fr-4133779/) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 7. Brasserie Josseline — fiche nouvelle

- n : (vide) → Brasserie Josseline
- c : (vide) → Monieux
- d : (vide) → 84
- lat : (vide) → 44.05696
- lon : (vide) → 5.33837
- km : (vide) → 185.7
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie artisanale installée à Monieux depuis 2018, une dizaine de bières. La fiche de l'office de tourisme (Provence Guide) ne parle que de visite à la demande, sans vente ni dégustation ; pas de site officiel ni de page Untappd trouvés.
- addr : (vide) → Hameau de la Gabelle, 84390 Monieux
- src : (vide) → https://www.provenceguide.com/producteurs/mont-ventoux/brasserie-josseline/provence-6046658-1.html
- coordPrecision : (vide) → centre
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://www.provenceguide.com/producteurs/mont-ventoux/brasserie-josseline/provence-6046658-1.html ; https://data.geopf.fr/geocodage/search?q=Monieux&type=municipality&limit=5

Extrait lu : « Visite à la demande. Il est conseillé d'appeler avant toute venue. »

Choix du vérificateur : Seule source lisible : la fiche Provence Guide (office/portail touristique), donc existence appuyée sur l'office + SIRENE, pas de site officiel. Téléphone : un mobile (+33 6 68 68 25 25) n'est publié que par l'office, donc non repris (précédent S342). Horaires « tous les jours » de la fiche non repris : ils décrivent la visite à la demande, pas un accueil. Catégorie 0 : aucune vente ni accueil établis.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - Hameau de la Gabelle, 84390 Monieux
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Josseline+Monieux)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Josseline&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [provenceguide.com](https://www.provenceguide.com/producteurs/mont-ventoux/brasserie-josseline/provence-6046658-1.html) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 8. Agora Brasseurs — fiche nouvelle

- n : (vide) → Agora Brasseurs
- c : (vide) → Carpentras
- d : (vide) → 84
- lat : (vide) → 44.03374
- lon : (vide) → 5.04087
- km : (vide) → 183.8
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → La brasserie existe : son site (agora-biere.com) se présente comme celui d'un artisan brasseur et caviste. Les pages lues ne détaillent pas ce qu'on peut y faire : à confirmer.
- addr : (vide) → 67 rue du Château Durbesson, 84200 Carpentras
- src : (vide) → https://agora-biere.com
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://agora-biere.com ; https://data.geopf.fr/geocodage/search?q=67+rue+du+Ch%C3%A2teau+Durbesson%2C+84200+Carpentras&limit=5

Extrait lu : « AGORA ARTISAN BRASSEUR »

Choix du vérificateur : Catégorie 0. Le site officiel n'a été lu que par un résumé (titre de la page d'accueil ; la page contact en 404). L'extrait est donc un fragment de ce titre. L'office de tourisme annonce des horaires 2026 (« tous les jours de 10h à 12h30 et de 14h à 18h30 ») et une boutique, mais je n'ai pas pu savoir si c'est de l'accueil ou de la vente : horaires non repris. Téléphone : seulement un mobile publié par l'office, non repris. Pas d'Untappd cherché (quota).

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 67 rue du Château Durbesson, 84200 Carpentras
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Agora+Brasseurs+Carpentras)[Ses bières sur Untappd](https://untappd.com/search?q=Agora+Brasseurs&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [agora-biere.com](https://agora-biere.com) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 9. Malt Brothers — fiche nouvelle

- n : (vide) → Malt Brothers
- c : (vide) → Vaison-la-Romaine
- d : (vide) → 84
- lat : (vide) → 44.25125
- lon : (vide) → 5.03237
- km : (vide) → 159.8
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Le site de la brasserie décrit une tap room où l'on déguste les bières à la pression, au comptoir, en terrasse ou dans le jardin. La boutique sur place vient de la fiche de l'office de tourisme (confiance moyenne au plus) ; le site ne parle que de bières en bouteille 33 cl et 75 cl. La brasserie a d'abord été à Villedieu, puis a ouvert un second site à Vaison-la-Romaine, qui est celui de cette fiche.
- addr : (vide) → 2810 route d'Orange, 84110 Vaison-la-Romaine
- src : (vide) → https://maltbrothers.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://maltbrothers.fr
- contact.source : (vide) → https://maltbrothers.fr
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://maltbrothers.fr ; https://data.geopf.fr/geocodage/search?q=2810+route+d%27Orange%2C+84110+Vaison-la-Romaine&limit=5

Extrait lu : « L'expérience se prolonge avec la tap room où vous pourrez déguster toutes nos bières à la pression »

Choix du vérificateur : Pas de téléphone : le seul numéro vu est celui d'une structure voisine. Pas d'horaires : le site n'en donne pas. Catégorie 1, confiance moyenne : la tap room est sur le site, la boutique sur la fiche de l'office. Pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 2810 route d'Orange, 84110 Vaison-la-Romaine
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Malt+Brothers+Vaison-la-Romaine)[Ses bières sur Untappd](https://untappd.com/search?q=Malt+Brothers&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://maltbrothers.fr)
> - Lu sur [maltbrothers.fr](https://maltbrothers.fr) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 10. Améno — fiche nouvelle

- n : (vide) → Améno
- c : (vide) → Camaret-sur-Aigues
- d : (vide) → 84
- lat : (vide) → 44.15511
- lon : (vide) → 4.89133
- km : (vide) → 169.3
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Brasserie artisanale (société Arthy, propriétaire du site Améno) avec un bar sur place et un « beer drive » pour repartir avec ses bières. Horaires du bar lus sur la page contact du site officiel.
- addr : (vide) → ZA Jonquier et Morelles, rue Antoine Laurent de Lavoisier, 84850 Camaret-sur-Aigues
- src : (vide) → https://ameno-biere.com/contact.php
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 06 38 43 24 70
- contact.site : (vide) → https://ameno-biere.com
- contact.source : (vide) → https://ameno-biere.com/contact.php
- contact.verifieLe : (vide) → 2026-10-27
- horaires.0.nature : (vide) → accueil
- horaires.0.mer : (vide) → 17 h – 22 h 30
- horaires.0.jeu : (vide) → 17 h – 22 h 30
- horaires.0.ven : (vide) → 17 h – 23 h 30
- horaires.0.sam : (vide) → 17 h – 23 h 30
- horaires.0.source : (vide) → https://ameno-biere.com/contact.php
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://ameno-biere.com/contact.php ; https://data.geopf.fr/geocodage/search?q=Camaret-sur-Aigues&type=municipality&limit=5

Extrait lu : « LE BAR »

Choix du vérificateur : Bar et horaires lus sur la page contact du site (rubrique « Le bar ») ; la société propriétaire du site est celle du registre. Téléphone de la page contact (mobile, seule ligne publiée par la brasserie). Les horaires de l'office, différents, sont écartés. Le point OSM « Brasserie Ameno » est le même lieu. Pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 16 h 49 (heure de Paris), accueil du public : la source ne dit pas les heures de ce jour.
> - Adresse
> - ZA Jonquier et Morelles, rue Antoine Laurent de Lavoisier, 84850 Camaret-sur-Aigues
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Am%C3%A9no&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 38 43 24 70](tel:+33638432470)
> - [Site de la brasserie](https://ameno-biere.com)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | 17 h – 22 h 30
> - Jeudi | 17 h – 22 h 30
> - Vendredi | 17 h – 23 h 30
> - Samedi | 17 h – 23 h 30
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [ameno-biere.com](https://ameno-biere.com/contact.php) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 11. Ventopp — fiche nouvelle

- n : (vide) → Ventopp
- c : (vide) → Villes-sur-Auzon
- d : (vide) → 84
- lat : (vide) → 44.0551
- lon : (vide) → 5.22231
- km : (vide) → 183.8
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Le site de la brasserie annonce la production et la vente directe de bières, et une dégustation sur place des bières, selon disponibilité. Aucun horaire publié sur le site.
- addr : (vide) → ZAE des Fontaynes, 725 route de Carpentras, 84570 Villes-sur-Auzon
- src : (vide) → https://ventopp.fr/la-boutique
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 09 83 35 56 80
- contact.site : (vide) → https://ventopp.fr
- contact.source : (vide) → https://ventopp.fr/la-boutique
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://ventopp.fr/la-boutique ; https://data.geopf.fr/geocodage/search?q=ZAE+des+Fontaynes%2C+725+route+de+Carpentras%2C+84570+Villes-sur-Auzon&limit=5

Extrait lu : « dégustation sur place des bières (selon disponibilité) »

Choix du vérificateur : Confiance moyenne : la dégustation est « selon disponibilité » et aucun horaire n'est donné. Le téléphone 09 83 35 56 80 est celui du pied de page du site de la brasserie ; c'est le seul numéro publié (l'office de tourisme donne le même). Pas d'Untappd : le site ne renvoie qu'à Facebook et Instagram, et je n'ai pas pu chercher sur Untappd (quota de recherches épuisé). Horaires non repris : le site n'en publie pas. L'office en donne, et ils ne sont ni de la saison ni de la source retenue.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - ZAE des Fontaynes, 725 route de Carpentras, 84570 Villes-sur-Auzon
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Ventopp+Villes-sur-Auzon)[Ses bières sur Untappd](https://untappd.com/search?q=Ventopp&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 09 83 35 56 80](tel:+33983355680)
> - [Site de la brasserie](https://ventopp.fr)
> - Lu sur [ventopp.fr](https://ventopp.fr/la-boutique) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 12. Les Brasseurs Bran'chais — fiche nouvelle

- n : (vide) → Les Brasseurs Bran'chais
- c : (vide) → Châteauneuf-du-Pape
- d : (vide) → 84
- lat : (vide) → 44.05976
- lon : (vide) → 4.83361
- km : (vide) → 179.7
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Le site de la brasserie donne son adresse et propose des dégustations « directement dans notre brasserie ou chez vous » sur contact par e-mail ; il ne dit rien de la vente sur place ni d'horaires. L'office de tourisme dit que les bières se vendent à Vinadéa et au Magasin Utile de Châteauneuf-du-Pape. Rien n'établit donc encore ce qu'on peut y faire.
- addr : (vide) → Lieu-dit Le Grand Pierre, route de Courthézon, 84230 Châteauneuf-du-Pape
- src : (vide) → https://lesbrasseursbranchais.fr
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.site : (vide) → https://lesbrasseursbranchais.fr
- contact.source : (vide) → https://lesbrasseursbranchais.fr
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://lesbrasseursbranchais.fr ; https://data.geopf.fr/geocodage/search?q=Ch%C3%A2teauneuf-du-Pape&type=municipality&limit=5

Extrait lu : « Vous souhaitez déguster ? N'hésitez pas a nous contacter par email »

Choix du vérificateur : Rapprochée de la ligne du registre par l'adresse (lieu-dit Le Grand Pierre, route de Courthézon), identique à celle du site. Aucun téléphone publié, pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - Lieu-dit Le Grand Pierre, route de Courthézon, 84230 Châteauneuf-du-Pape
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Les+Brasseurs+Bran%27chais+Ch%C3%A2teauneuf-du-Pape)[Ses bières sur Untappd](https://untappd.com/search?q=Les+Brasseurs+Bran%27chais&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://lesbrasseursbranchais.fr)
> - Lu sur [lesbrasseursbranchais.fr](https://lesbrasseursbranchais.fr) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 13. Miss'Isle — fiche nouvelle

- n : (vide) → Miss'Isle
- c : (vide) → Cavaillon
- d : (vide) → 84
- lat : (vide) → 43.8332
- lon : (vide) → 5.03938
- km : (vide) → 206
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Le site de la brasserie indique un siège à L'Isle-sur-la-Sorgue et un local de production à Cavaillon, et invite à venir « directement à la brasserie » ; il ne parle ni de vente sur place, ni d'horaires. Rien n'établit donc encore ce qu'on peut y faire. L'office de tourisme dit que les bières se trouvent dans une vingtaine d'établissements de L'Isle-sur-la-Sorgue.
- addr : (vide) → 120 avenue Jean Jaurès, 84300 Cavaillon
- src : (vide) → https://www.biere-missisle.com
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 10 40 88 51
- contact.site : (vide) → https://www.biere-missisle.com
- contact.source : (vide) → https://www.biere-missisle.com
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://www.biere-missisle.com ; https://data.geopf.fr/geocodage/search?q=120+avenue+Jean+Jaur%C3%A8s%2C+84300+Cavaillon&limit=5

Extrait lu : « Le siège social est situé à L’Isle sur la sorgue et le local de production se trouve à Cavaillon. »

Choix du vérificateur : Le candidat « CHEZ ELLE BEER » est la société qui édite les bières Miss'Isle (mentions légales du site). Deux adresses sont publiées : siège 3 rue Joseph Roumanille à L'Isle-sur-la-Sorgue (adresse que donne l'office de tourisme), local de production 120 avenue Jean Jaurès à Cavaillon. J'ai retenu Cavaillon, car la brasserie est où l'on brasse, mais le site ne dit pas où l'on est reçu : Cédric tranche (sinon L'Isle-sur-la-Sorgue). Téléphone : 06 10 40 88 51, un mobile, seule ligne publiée par la brasserie dans ses mentions légales (l'office écrit le même). Lien Untappd : aucun lu. La mention « en passant directement à la brasserie » m'a été rendue en deux citations, donc non reprise comme extrait.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 120 avenue Jean Jaurès, 84300 Cavaillon
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Miss%27Isle+Cavaillon)[Ses bières sur Untappd](https://untappd.com/search?q=Miss%27Isle&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 10 40 88 51](tel:+33610408851)
> - [Site de la brasserie](https://www.biere-missisle.com)
> - Lu sur [biere-missisle.com](https://www.biere-missisle.com) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 14. Les Ouailles du Luberon — fiche nouvelle

- n : (vide) → Les Ouailles du Luberon
- c : (vide) → Cheval-Blanc
- d : (vide) → 84
- lat : (vide) → 43.79234
- lon : (vide) → 5.07601
- km : (vide) → 210.8
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Fiche d'office de tourisme : brasserie bio au pied du Luberon, bières en bouteilles de 33 cl et 75 cl et en fûts. Vente à la propriété, sur les marchés, en ligne, Click & Collect et retrait à la ferme. Aucune dégustation ni consommation sur place n'est citée. Le site officiel (ouailles-luberon.fr) répondait 503 lors de la lecture.
- addr : (vide) → 225 chemin de l'Indicateur, 84460 Cheval-Blanc
- src : (vide) → https://www.provenceguide.com/producteurs/luberon/les-ouailles-du-luberon/provence-6449808-1.html
- coordPrecision : (vide) → address
- beers : (vide) → []
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 9 h – 17 h
- horaires.0.mar : (vide) → 9 h – 17 h
- horaires.0.mer : (vide) → 9 h – 17 h
- horaires.0.jeu : (vide) → 9 h – 17 h
- horaires.0.ven : (vide) → 9 h – 17 h
- horaires.0.remarque : (vide) → Fermé les week-ends. Horaires de l'office de tourisme pour 2026 ; hors de la période, aucun horaire publié.
- horaires.0.periode.du : (vide) → 04-01
- horaires.0.periode.au : (vide) → 10-31
- horaires.0.source : (vide) → https://www.provenceguide.com/producteurs/luberon/les-ouailles-du-luberon/provence-6449808-1.html
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://www.provenceguide.com/producteurs/luberon/les-ouailles-du-luberon/provence-6449808-1.html ; https://data.geopf.fr/geocodage/search?q=225+chemin+de+l%27Indicateur%2C+84460+Cheval-Blanc&limit=5

Extrait lu : « Vente à la propriété »

Choix du vérificateur : Horaires de l'office pour la saison en cours : du 01/04 au 31/10/2026, du lundi au vendredi de 9h à 17h, fermé les week-ends. Ils sont repris avec une période. Aucun téléphone n'a été lu (office seul, aucun numéro retenu).

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 16 h 49 (heure de Paris), vente : ouvert jusqu’à 17 h selon les créneaux, sous réserve de la remarque ci-dessous.
> - Adresse
> - 225 chemin de l'Indicateur, 84460 Cheval-Blanc
> - Pas encore dans la fiche : son téléphone et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Les+Ouailles+du+Luberon+Cheval-Blanc)[Ses bières sur Untappd](https://untappd.com/search?q=Les+Ouailles+du+Luberon&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Horaires
> - À savoir : Fermé les week-ends. Horaires de l'office de tourisme pour 2026 ; hors de la période, aucun horaire publié.
> - Horaires de vente, du 1er avril au 31 octobre
> - Lundi | 9 h – 17 h
> - Mardi | 9 h – 17 h
> - Mercredi | 9 h – 17 h
> - Jeudi | 9 h – 17 h
> - Vendredi | 9 h – 17 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [provenceguide.com](https://www.provenceguide.com/producteurs/luberon/les-ouailles-du-luberon/provence-6449808-1.html) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 15. Brasseur de l'Isle-sur-la-Sorgue — fiche nouvelle

- n : (vide) → Brasseur de l'Isle-sur-la-Sorgue
- c : (vide) → L'Isle-sur-la-Sorgue
- d : (vide) → 84
- lat : (vide) → 43.91836
- lon : (vide) → 5.05009
- km : (vide) → 196.7
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Brasserie et boutique (bières La Vallis Clausa) : le site officiel affiche une carte avec bières à la pression (bock, demi, pinte) et en bouteilles, plus planches et crêpes ; bouteilles à emporter à l'unité ou en carton. Sans relecture sur place, confiance moyenne.
- addr : (vide) → 8 rue Michelet, 84800 L'Isle-sur-la-Sorgue
- src : (vide) → https://brasseurislesurlasorgue.fr/snacking/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 07 49 62 23 17
- contact.site : (vide) → https://brasseurislesurlasorgue.fr
- contact.source : (vide) → https://brasseurislesurlasorgue.fr/snacking/
- contact.verifieLe : (vide) → 2026-10-27
- horaires.0.nature : (vide) → accueil
- horaires.0.mer : (vide) → 10 h – 12 h 30, 15 h – 19 h
- horaires.0.jeu : (vide) → 10 h – 12 h 30, 15 h – 19 h
- horaires.0.ven : (vide) → 10 h – 12 h 30, 15 h – 19 h
- horaires.0.sam : (vide) → 10 h – 12 h 30, 15 h – 19 h
- horaires.0.dim : (vide) → 10 h – 14 h
- horaires.0.source : (vide) → https://brasseurislesurlasorgue.fr
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://brasseurislesurlasorgue.fr/snacking/ ; https://brasseurislesurlasorgue.fr ; https://data.geopf.fr/geocodage/search?q=8+rue+Michelet%2C+84800+L%27Isle-sur-la-Sorgue&limit=5

Extrait lu : « Pression :

Bock

2€

Demi

3€

33cl

3,50€

Pinte

5,50€ »

Choix du vérificateur : Pages lues du site officiel (accueil, la-brasserie, snacking), en rendu texte, bandeaux cookies compris. La vente à emporter est dite sur /la-brasserie/ (« vous pourrez acheter des bouteilles à emporter, vendues à l'unité ou en carton. ») ; l'extrait est pris sur /snacking/ (une seule page). Les sauts de ligne de l'extrait sont ceux du rendu texte : à contrôler par Cédric. Un seul numéro publié, un portable (07 49 62 23 17), retenu faute d'autre ligne. Horaires lus sur la page d'accueil (« Du mercredi au samedi : 10h00 – 12h30 / 15h00 – 19h00 », « Le dimanche : 10h00 – 14h00 », « Fermé lundi et mardi. »). L'office de tourisme donne d'autres horaires (écartés). Aucune page Untappd trouvée (page de recherche vide).

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 16 h 49 (heure de Paris), accueil du public : la source ne dit pas les heures de ce jour.
> - Adresse
> - 8 rue Michelet, 84800 L'Isle-sur-la-Sorgue
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasseur+de+l%27Isle-sur-la-Sorgue&type=brewery)
> - Joindre la brasserie
> - [Appeler le 07 49 62 23 17](tel:+33749622317)
> - [Site de la brasserie](https://brasseurislesurlasorgue.fr)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | 10 h – 12 h 30, 15 h – 19 h
> - Jeudi | 10 h – 12 h 30, 15 h – 19 h
> - Vendredi | 10 h – 12 h 30, 15 h – 19 h
> - Samedi | 10 h – 12 h 30, 15 h – 19 h
> - Dimanche | 10 h – 14 h
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseurislesurlasorgue.fr](https://brasseurislesurlasorgue.fr/snacking/) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 16. Brasserie Epicentre — fiche nouvelle

- n : (vide) → Brasserie Epicentre
- c : (vide) → Pertuis
- d : (vide) → 84
- lat : (vide) → 43.68452
- lon : (vide) → 5.55745
- km : (vide) → 230.2
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie existante (site officiel, adresse à Pertuis, bières bio brassées depuis juillet 2023, commande par boutique en ligne). Le site ne dit pas si l'on peut acheter ou consommer sur place, et ne donne pas d'horaires : à confirmer.
- addr : (vide) → 282 Chemin de Saint-Estève, 84120 Pertuis
- src : (vide) → https://www.brasserie-epicentre.com/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 02 46 57 55
- contact.site : (vide) → https://www.brasserie-epicentre.com/
- contact.source : (vide) → https://www.brasserie-epicentre.com/
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://www.brasserie-epicentre.com/ ; https://data.geopf.fr/geocodage/search?q=282+Chemin+de+Saint-Est%C3%A8ve%2C+84120+Pertuis&limit=5

Extrait lu : « 282 Chemin de Saint-Estève 84120 PERTUIS »

Choix du vérificateur : Les deux candidats (sirene:918759200 à Pertuis, et node/13875880501 « Brasserie Epicentre Pertuis », rattaché par OSM à La Bastidonne) ont la même adresse et le même site : une seule fiche, commune Pertuis (celle du site). Un seul téléphone sur le site, un portable, repris car c'est la seule ligne publiée par la brasserie. Untappd non cherché (quota).

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 282 Chemin de Saint-Estève, 84120 Pertuis
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Epicentre+Pertuis)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Epicentre&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 02 46 57 55](tel:+33602465755)
> - [Site de la brasserie](https://www.brasserie-epicentre.com/)
> - Lu sur [brasserie-epicentre.com](https://www.brasserie-epicentre.com/) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 17. Les Dÿades — fiche nouvelle

- n : (vide) → Les Dÿades
- c : (vide) → Vaison-la-Romaine
- d : (vide) → 84
- lat : (vide) → 44.24115
- lon : (vide) → 5.07802
- km : (vide) → 161.4
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Brasserie artisanale (bières, limonade, vins houblonnés). Visite de la fabrique sur réservation par téléphone, avec dégustation ; pas de consommation sur place établie. Vente sur place indiquée seulement par l'office de tourisme.
- addr : (vide) → 3 rue Abel André, 84110 Vaison-la-Romaine
- src : (vide) → https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/les-dyades-brasserie-artisanale-lodyssee-des-bulles-vaison-la-romaine-fr-4066915/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 75 98 75 03
- contact.site : (vide) → https://lesdyades-vaison.fr
- contact.source : (vide) → https://lesdyades-vaison.fr
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/les-dyades-brasserie-artisanale-lodyssee-des-bulles-vaison-la-romaine-fr-4066915/ ; https://lesdyades-vaison.fr ; https://data.geopf.fr/geocodage/search?q=3+rue+Abel+Andr%C3%A9%2C+84110+Vaison-la-Romaine&limit=5

Extrait lu : « Vente à la propriété »

Choix du vérificateur : Existence établie par le site officiel (adresse 3 rue Abel André, boutique en ligne, visites) et la fiche de l'office de tourisme. Catégorie 2 en confiance moyenne : seul l'office parle de vente sur place (« Vente à la propriété », « Boutique »), le site officiel ne le dit pas. Si Cédric veut plus de prudence : cat 0. Téléphone : le seul publié par la brasserie sur son site est un mobile (0675987503, mis au format 06 75 98 75 03). Je le retiens faute d'autre ligne. Horaires non repris : l'office donne un tableau marqué « Horaires non garantis aujourd'hui », et le site n'en donne pas (visites sur réservation, dégustations « en été »). Untappd : aucune page trouvée (2 recherches, rien sur le site).

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - 3 rue Abel André, 84110 Vaison-la-Romaine
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Les+D%C3%BFades+Vaison-la-Romaine)[Ses bières sur Untappd](https://untappd.com/search?q=Les+D%C3%BFades&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 75 98 75 03](tel:+33675987503)
> - [Site de la brasserie](https://lesdyades-vaison.fr)
> - Lu sur [provence-alpes-cotedazur.com](https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/les-dyades-brasserie-artisanale-lodyssee-des-bulles-vaison-la-romaine-fr-4066915/) le 27 octobre 2026. Lu sur [lesdyades-vaison.fr](https://lesdyades-vaison.fr) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 18. Fatch Brasserie Provençale — fiche nouvelle

- n : (vide) → Fatch Brasserie Provençale
- c : (vide) → Courthézon
- d : (vide) → 84
- lat : (vide) → 44.09494
- lon : (vide) → 4.8732
- km : (vide) → 175.9
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie existante d'après la fiche de l'office de tourisme (4 styles : blonde, blanche, ambrée, IPA ; vendue chez des revendeurs du Vaucluse et du Gard). Aucune vente ni accueil sur place indiqués, pas d'horaires, pas de site officiel trouvé : à confirmer.
- addr : (vide) → 526 Route d'Orange, 84350 Courthézon
- src : (vide) → https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/fatch-brasserie-provencale-courthezon-fr-5121785/
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/fatch-brasserie-provencale-courthezon-fr-5121785/ ; https://data.geopf.fr/geocodage/search?q=526+Route+d%27Orange%2C+84350+Courth%C3%A9zon&limit=5

Extrait lu : « Brassée en Provence. 4 styles : Blonde, Blanche, Ambrée, IPA. »

Choix du vérificateur : Office de tourisme seul, avec en piste des pages Facebook et Instagram (non lues). Téléphones de la fiche non repris (publiés par l'office). Nom de la fiche : « Fatch Brasserie Provençale » (office), la raison sociale SIRENE étant « Fatch Brasserie Artisanale ».

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 526 Route d'Orange, 84350 Courthézon
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Fatch+Brasserie+Proven%C3%A7ale+Courth%C3%A9zon)[Ses bières sur Untappd](https://untappd.com/search?q=Fatch+Brasserie+Proven%C3%A7ale&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [provence-alpes-cotedazur.com](https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/fatch-brasserie-provencale-courthezon-fr-5121785/) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 19. Brasserie Lub' — fiche nouvelle

- n : (vide) → Brasserie Lub'
- c : (vide) → Taillades
- d : (vide) → 84
- lat : (vide) → 43.83512
- lon : (vide) → 5.08566
- km : (vide) → 206.2
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Fiche d'office de tourisme : vente à la propriété, boutique sur place, vente sur les marchés, boutique en ligne et Click & Collect. Aucune dégustation ni consommation sur place n'est citée. Aucun site officiel de la brasserie n'a été lu.
- addr : (vide) → 9B ZAC Bel Air, 84300 Taillades
- src : (vide) → https://www.provenceguide.com/producteurs/luberon/brasserie-lub/provence-4930578-1.html
- coordPrecision : (vide) → centre
- beers : (vide) → []
- horaires.0.nature : (vide) → vente
- horaires.0.mar : (vide) → 10 h – 12 h, 15 h – 18 h 30
- horaires.0.mer : (vide) → 10 h – 12 h, 15 h – 18 h 30
- horaires.0.jeu : (vide) → 10 h – 12 h, 15 h – 18 h 30
- horaires.0.ven : (vide) → 10 h – 12 h, 15 h – 18 h 30
- horaires.0.sam : (vide) → 10 h – 12 h, 15 h – 18 h 30
- horaires.0.remarque : (vide) → Période d'ouverture publiée par l'office : du 11/01 au 31/12. Fermé le lundi et le dimanche.
- horaires.0.source : (vide) → https://www.provenceguide.com/producteurs/luberon/brasserie-lub/provence-4930578-1.html
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://www.provenceguide.com/producteurs/luberon/brasserie-lub/provence-4930578-1.html ; https://data.geopf.fr/geocodage/search?q=Taillades&type=municipality&limit=5

Extrait lu : « Vente à la propriété »

Choix du vérificateur : Candidat SIRENE « LA FAUVETTE GOURMANDE, LA LUB' », 9 B ZA Bel Air, 84300 Taillades : même adresse que la fiche de l'office (9B ZAC Bel Air). Le téléphone publié par l'office (04 90 74 43 99) n'est pas repris (office seul, précédent S342). Horaires de l'office repris : 10h-12h et 15h-18h30, fermé lundi et dimanche. La période « du 11/01 au 31/12 » est ambiguë, elle est donc écrite en remarque et non en période.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:49, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 16 h 49 (heure de Paris), vente : ouvert jusqu’à 18 h 30 selon les créneaux, sous réserve de la remarque ci-dessous.
> - Adresse
> - 9B ZAC Bel Air, 84300 Taillades
> - Pas encore dans la fiche : son téléphone et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Lub%27+Taillades)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Lub%27&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Horaires
> - À savoir : Période d'ouverture publiée par l'office : du 11/01 au 31/12. Fermé le lundi et le dimanche.
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | 10 h – 12 h, 15 h – 18 h 30
> - Mercredi | 10 h – 12 h, 15 h – 18 h 30
> - Jeudi | 10 h – 12 h, 15 h – 18 h 30
> - Vendredi | 10 h – 12 h, 15 h – 18 h 30
> - Samedi | 10 h – 12 h, 15 h – 18 h 30
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [provenceguide.com](https://www.provenceguide.com/producteurs/luberon/brasserie-lub/provence-4930578-1.html) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

Empreinte du lot : 0122d9495f62
