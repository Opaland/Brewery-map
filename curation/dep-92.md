# Lot dep-92 — les Hauts-de-Seine (S345)

Ce lot ajoute **3 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 19 candidats = 3 proposés + 16 non proposés (tableau ci-dessous).
Catégories proposées : 0 « acheter et consommer », 2 « acheter seulement », 0 « pas de vente », 1 « à confirmer », 0 « consommer sur place seulement ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| HEINEKEN ENTREPRISE (`sirene:414842062`) | lu le 29/10 : siège d'un groupe ; aucun accueil ni vente au public |
| LES BIERES DE MONTMORILLON (`sirene:821920477`) | lu le 29/10 : siège ; la brasserie est à Montmorillon (86) |
| HOMING BIRDS (`sirene:953013976`) | lu le 29/10 : registres, Untappd et un réseau social seuls : à relancer si un site apparaît |
| KRONE AG (`sirene:382581551`) | lu le 29/10 : société étrangère sans établissement ouvert |
| LA PLANTA PARIS BRASSERIE (`sirene:909889784`) | lu le 29/10 : rien sous ce nom |
| BIERE DE PAROISSE (`sirene:914868831`) | lu le 29/10 : rien sous ce nom |
| LA BIERE DE MONTROUGE (`sirene:930310560`) | lu le 29/10 : rien sous ce nom |
| LOCALE (`sirene:893403816`) | lu le 29/10 : rien sous ce nom |
| BRASSERIE DU BAILLOU (`sirene:878429968`) | lu le 29/10 : rien sous ce nom |
| Entreprise individuelle (`personne:1`) | entreprise sans nom ni adresse : rien à chercher |
| BEER MINKO (`sirene:900751249`) | lu le 29/10 : un article seul ; aucun lieu établi à Nanterre |
| Entreprise individuelle (`personne:2`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE 02 SEINE (`sirene:850026246`) | lu le 29/10 : même adresse que Nemeto (4 rue Silvy), très probablement la même entité, lue sous way/1024690864 |
| 68 by Guy Martin (`node/3980268299`) | lu le 29/10 : un restaurant, qui ne brasse pas |
| La Place (`node/640616938`) | lu le 29/10 : un bar-restaurant, qui ne brasse pas |
| Get Your Drinks (`node/6409925921`) | lu le 29/10 : rien sous ce nom |

## Les fiches proposées

## Lot dep-92 — 0 proposition(s), 3 fiche(s) nouvelle(s)

### 1. Suresnes Beer Factory — fiche nouvelle

- n : (vide) → Suresnes Beer Factory
- c : (vide) → Suresnes
- d : (vide) → 92
- lat : (vide) → 48.87075
- lon : (vide) → 2.21804
- km : (vide) → 403.6
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Micro-brasserie associative de Suresnes, d'après l'office de tourisme, qui vend sa bière. Ce qu'on peut faire à la brasserie elle-même n'est pas établi : à confirmer.
- addr : (vide) → rue Kellogg, 92150 Suresnes
- src : (vide) → https://en.suresnes-tourisme.com/local-producers-suresnes.html
- coordPrecision : (vide) → centre
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://en.suresnes-tourisme.com/local-producers-suresnes.html ; https://data.geopf.fr/geocodage/search?q=Suresnes&type=municipality&limit=5

Extrait lu : « The beer is available to buy from Suresnes Tourist Office »

Choix du vérificateur : Une seule page d'office de tourisme (confiance au plus moyenne) : catégorie 0. Une annonce de visite sur une plateforme de réservation n'est pas reprise (source non valable). Téléphone de l'office non repris. Adresse sans numéro, telle que sur la page. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 23:29, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - rue Kellogg, 92150 Suresnes
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Suresnes+Beer+Factory+Suresnes)[Ses bières sur Untappd](https://untappd.com/search?q=Suresnes+Beer+Factory&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [en.suresnes-tourisme.com](https://en.suresnes-tourisme.com/local-producers-suresnes.html) le 29 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 2. Boneless Brewing Company — fiche nouvelle

- n : (vide) → Boneless Brewing Company
- c : (vide) → Châtillon
- d : (vide) → 92
- lat : (vide) → 48.80934
- lon : (vide) → 2.28305
- km : (vide) → 395.3
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Le site de la brasserie annonce de la vente directe à la brasserie, avec ses créneaux. Il ne dit pas si l'on peut boire sur place : catégorie 2 par prudence, la consommation sur place n'est pas établie.
- addr : (vide) → 93 Boulevard de Vanves, 92320 Châtillon
- src : (vide) → https://www.bonelessbrewing.com/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://www.bonelessbrewing.com/
- contact.source : (vide) → https://www.bonelessbrewing.com/
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 17 h 30 – 19 h 30
- horaires.0.mar : (vide) → 17 h 30 – 19 h 30
- horaires.0.mer : (vide) → 17 h 30 – 19 h 30
- horaires.0.jeu : (vide) → 17 h 30 – 19 h 30
- horaires.0.ven : (vide) → 17 h 30 – 19 h 30
- horaires.0.sam : (vide) → 11 h – 13 h, 16 h – 19 h
- horaires.0.source : (vide) → https://www.bonelessbrewing.com/
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.bonelessbrewing.com/ ; https://data.geopf.fr/geocodage/search?q=93+Boulevard+de+Vanves%2C+92320+Ch%C3%A2tillon&limit=5

Extrait lu : « Vente directe à la brasserie »

Choix du vérificateur : Page Untappd https://untappd.com/BonelessBrewingCo ouverte (Boneless Brewing Co, Châtillon), mais le site officiel n'y renvoie pas : non mise dans contact, dont la source est le site. Cédric peut l'ajouter. Aucun téléphone publié. L'e-mail du site n'est pas retenu (pas de champ). Seules les trois bières nommées sur le site avec un style clair sont retenues. Source rouverte à la main le 29/10. Types de bière non repris : lus sur le site, pas sur Untappd (docs/DONNEES.md).

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 23:29, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 23 h 29 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : demain à 17 h 30.
> - Adresse
> - 93 Boulevard de Vanves, 92320 Châtillon
> - Pas encore dans la fiche : son téléphone et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Boneless+Brewing+Company+Ch%C3%A2tillon)[Ses bières sur Untappd](https://untappd.com/search?q=Boneless+Brewing+Company&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://www.bonelessbrewing.com/)
> - Horaires
> - Horaires de vente
> - Lundi | 17 h 30 – 19 h 30
> - Mardi | 17 h 30 – 19 h 30
> - Mercredi | 17 h 30 – 19 h 30
> - Jeudi | 17 h 30 – 19 h 30
> - Vendredi | 17 h 30 – 19 h 30
> - Samedi | 11 h – 13 h, 16 h – 19 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [bonelessbrewing.com](https://www.bonelessbrewing.com/) le 29 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 3. Brasserie Nemeto — fiche nouvelle

- n : (vide) → Brasserie Nemeto
- c : (vide) → Nanterre
- d : (vide) → 92
- lat : (vide) → 48.8981
- lon : (vide) → 2.20231
- km : (vide) → 406.8
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → solide
- note : (vide) → Brasserie et biscuiterie bio. Bières et biscuits en vente à emporter à la brasserie du lundi au vendredi, et le 1er samedi du mois, avec une visite gratuite à 15h30 ces samedis-là (sauf en décembre). Pas de livraison aux particuliers.
- addr : (vide) → 4 rue Silvy, 92000 Nanterre
- src : (vide) → https://www.brasserienemeto.fr/boutique
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 01 46 95 44 25
- contact.site : (vide) → https://www.brasserienemeto.fr/
- contact.source : (vide) → https://www.brasserienemeto.fr/contact-5
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 10 h – 18 h
- horaires.0.mar : (vide) → 10 h – 18 h
- horaires.0.mer : (vide) → 10 h – 18 h
- horaires.0.jeu : (vide) → 10 h – 18 h
- horaires.0.ven : (vide) → 10 h – 18 h
- horaires.0.remarque : (vide) → Ouvert aussi le 1er samedi de chaque mois, de 10h30 à 13h et de 15h30 à 19h ; visite gratuite d'une heure à 15h30 ces samedis-là (sauf en décembre).
- horaires.0.source : (vide) → https://www.brasserienemeto.fr/boutique
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.brasserienemeto.fr/boutique ; https://www.brasserienemeto.fr/contact-5 ; https://data.geopf.fr/geocodage/search?q=Nanterre&type=municipality&limit=5

Extrait lu : « Toute nos bières et nos biscuits sont disponibles à la brasserie en vente à emporter. »

Choix du vérificateur : Catégorie 2 et non 1 : le site parle de dégustation seulement dans le cadre des visites (« Vous aurez également l'occasion de déguster nos bières directement à la source », page Nos services), et aucune page ne montre un lieu où l'on boit sans visite. Téléphone : un seul numéro publié, sur la page contact. Untappd : https://untappd.com/brasserienemeto est cité sur la page d'accueil (« Retrouvez aussi nos bières sur Untappd ») et la page s'ouvre (brasserie revendiquée, 28 bières) ; je ne le mets pas dans `contact` parce que la source du contact (page contact) n'a pas été vue le portant. Il est à ajouter si Cédric l'accepte (source : la page d'accueil). Bières laissées vides : le site liste Geneviève (blonde, pale ale), La Grange (blanche, hefeweizen), Bois Joly (ambrée au miel), La Folie (ambrée, IPA), Boulevard du Couchant (brune, brown porter) et Trigoujat (blonde belge, saison). Je n'ai pas rempli le champ `beers`, dont l'énumération des types n'a pas été vérifiée. Samedi : le 1er samedi du mois seulement, 10h30-13h et 15h30-19h. Un créneau hebdomadaire ne sait pas le dire, donc il est dans `remarque`. La fiche SIRENE `sirene:850026246` (BRASSERIE 02 SEINE, 4 rue Silvy, Nanterre) est très probablement la même entité, dans un autre paquet : à dédoubler. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 23:29, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 23 h 29 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : demain à 10 h, sous réserve.
> - Adresse
> - 4 rue Silvy, 92000 Nanterre
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Nemeto&type=brewery)
> - Joindre la brasserie
> - [Appeler le 01 46 95 44 25](tel:+33146954425)
> - [Site de la brasserie](https://www.brasserienemeto.fr/)
> - Horaires
> - À savoir : Ouvert aussi le 1er samedi de chaque mois, de 10h30 à 13h et de 15h30 à 19h ; visite gratuite d'une heure à 15h30 ces samedis-là (sauf en décembre).
> - Horaires de vente
> - Lundi | 10 h – 18 h
> - Mardi | 10 h – 18 h
> - Mercredi | 10 h – 18 h
> - Jeudi | 10 h – 18 h
> - Vendredi | 10 h – 18 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserienemeto.fr](https://www.brasserienemeto.fr/boutique) le 29 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

Empreinte du lot : cdcc24d4a330
