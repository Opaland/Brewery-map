# Lot dep-65 — les Hautes-Pyrénées (S348)

Ce lot ajoute **7 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 19 candidats = 7 proposés + 12 non proposés (tableau ci-dessous).
Catégories proposées : 3 « acheter et consommer », 1 « acheter seulement », 0 « pas de vente », 3 « à confirmer », 0 « consommer sur place seulement ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| Entreprise individuelle (`personne:1`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:2`) | entreprise sans nom ni adresse : rien à chercher |
| LES COMPAGNONS (`sirene:821892940`) | même lieu que way/70838592 (le bar Les Compagnons des Brasseurs de l'Adour) |
| BREWPUB (`sirene:829293596`) | le site de la Brasserie du Pays Toy (lue à Sassis sous way/200358687) a un onglet « Brew Pub » sans contenu lisible ; aucune page lue ne relie cette entreprise à la brasserie ni ne dit son adresse |
| L' O D' HEAS (`sirene:924238082`) | aucune page ne cite ce nom (ni site, ni office, ni Untappd) : existence non établie |
| Entreprise individuelle (`personne:3`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:4`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:5`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:6`) | seul un annuaire cite cette enseigne : existence non établie |
| EURL BRASSERIE WALBREW (`sirene:840720197`) | aucune page ne cite ce nom : existence non établie |
| SIBOIRE PYRENEES (`sirene:983267402`) | aucune page ne cite ce nom : existence non établie |
| SARL IN'OC (`sirene:851062513`) | aucune page ne cite ce nom : existence non établie |

## Les fiches proposées

## Lot dep-65 — 0 proposition(s), 7 fiche(s) nouvelle(s)

### 1. La Brasserie du Pépère — fiche nouvelle

- n : (vide) → La Brasserie du Pépère
- c : (vide) → Séméac
- d : (vide) → 65
- lat : (vide) → 43.2267
- lon : (vide) → 0.09375
- km : (vide) → 459.2
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie dont les bières sont fabriquées à Pouyastruc, en fermentation isobar, d'après l'office de tourisme d'Occitanie. L'adresse de Séméac est celle que donne l'office ; rien ne dit qu'on y est reçu, ni vente, ni dégustation, ni horaires.
- addr : (vide) → 49 bis rue du Docteur Guinier, 65600 Séméac
- src : (vide) → https://www.tourisme-occitanie.com/fr/fiche/degustation/brasserie-du-pepere-semeac_TFODEGMIP065V502XH6/
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-11-23

Sources (vérifiée le 2026-11-23) : https://www.tourisme-occitanie.com/fr/fiche/degustation/brasserie-du-pepere-semeac_TFODEGMIP065V502XH6/ ; https://data.geopf.fr/geocodage/search?q=49+bis+rue+du+Docteur+Guinier%2C+65600+S%C3%A9m%C3%A9ac&limit=5

Extrait lu : « la Brasserie du Pépère vous propose une gamme de bières produites selon des recettes originales »

Choix du vérificateur : Fiche de l'office d'Occitanie relue sur la page brute le 23/11, avec un point OSM. Le domaine que l'office donne pour site publie aujourd'hui des articles sans rapport (casinos) : non repris. Seul un portable est publié, par l'office : non repris.

**Aperçu de la fiche** (état du moment calculé le lundi 23 novembre 2026 à 17:58, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 49 bis rue du Docteur Guinier, 65600 Séméac
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=La+Brasserie+du+P%C3%A9p%C3%A8re+S%C3%A9m%C3%A9ac)[Ses bières sur Untappd](https://untappd.com/search?q=La+Brasserie+du+P%C3%A9p%C3%A8re&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [tourisme-occitanie.com](https://www.tourisme-occitanie.com/fr/fiche/degustation/brasserie-du-pepere-semeac_TFODEGMIP065V502XH6/) le 23 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 2. Brasserie L'Aoucataise — fiche nouvelle

- n : (vide) → Brasserie L'Aoucataise
- c : (vide) → Arreau
- d : (vide) → 65
- lat : (vide) → 42.9051
- lon : (vide) → 0.36097
- km : (vide) → 465.8
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Brasserie artisanale de montagne, à l'eau de source : boutique ouverte du lundi au vendredi, de 10 h à 12 h et de 14 h à 16 h 30, et visite suivie d'une dégustation, sur inscription, d'après l'office de tourisme d'Occitanie. Rien ne dit qu'on peut y boire un verre hors de la visite.
- addr : (vide) → Place de la gare, 65240 Arreau
- src : (vide) → https://www.tourisme-occitanie.com/fr/fiche/degustation/brasserie-l-aoucataise-sarl-nafar-arreau_TFODEGMIP065V500262/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 10 h – 12 h, 14 h – 16 h 30
- horaires.0.mar : (vide) → 10 h – 12 h, 14 h – 16 h 30
- horaires.0.mer : (vide) → 10 h – 12 h, 14 h – 16 h 30
- horaires.0.jeu : (vide) → 10 h – 12 h, 14 h – 16 h 30
- horaires.0.ven : (vide) → 10 h – 12 h, 14 h – 16 h 30
- horaires.0.source : (vide) → https://www.tourisme-occitanie.com/fr/fiche/degustation/brasserie-l-aoucataise-sarl-nafar-arreau_TFODEGMIP065V500262/
- horaires.0.verifieLe : (vide) → 2026-11-23
- verifieLe : (vide) → 2026-11-23

Sources (vérifiée le 2026-11-23) : https://www.tourisme-occitanie.com/fr/fiche/degustation/brasserie-l-aoucataise-sarl-nafar-arreau_TFODEGMIP065V500262/ ; https://data.geopf.fr/geocodage/search?q=Arreau&type=municipality&limit=5

Extrait lu : « Notre boutique est ouverte du lundi au vendredi »

Choix du vérificateur : Fiche de l'office d'Occitanie relue sur la page brute le 23/11 (persona Cédric : traitement cohérent avec les autres fiches d'office). La clé SIRENE porte un autre nom mais la même adresse (3 place de la gare, Arreau). Le site de la brasserie ne répond pas depuis cette session. Les heures de la boutique (« du lundi au vendredi de 10h à 12h/14h à16h30 ») sont structurées en « vente » (persona Hugo, 23/11) ; samedi et dimanche ne sont pas écrits et restent inconnus. Seul un portable est publié, par l'office : non repris. Un annuaire la dit fermée : non repris, l'office la présente ouverte, d'où « moyenne ».

**Aperçu de la fiche** (état du moment calculé le lundi 23 novembre 2026 à 17:58, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 17 h 58 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : demain à 10 h.
> - Adresse
> - Place de la gare, 65240 Arreau
> - Pas encore dans la fiche : son téléphone et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+L%27Aoucataise+Arreau)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+L%27Aoucataise&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Horaires
> - Horaires de vente
> - Lundi | 10 h – 12 h, 14 h – 16 h 30
> - Mardi | 10 h – 12 h, 14 h – 16 h 30
> - Mercredi | 10 h – 12 h, 14 h – 16 h 30
> - Jeudi | 10 h – 12 h, 14 h – 16 h 30
> - Vendredi | 10 h – 12 h, 14 h – 16 h 30
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [tourisme-occitanie.com](https://www.tourisme-occitanie.com/fr/fiche/degustation/brasserie-l-aoucataise-sarl-nafar-arreau_TFODEGMIP065V500262/) le 23 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 3. Brasserie des Pics — fiche nouvelle

- n : (vide) → Brasserie des Pics
- c : (vide) → Saint-Laurent-de-Neste
- d : (vide) → 65
- lat : (vide) → 43.10217
- lon : (vide) → 0.46913
- km : (vide) → 444.6
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Brasserie qui fait la Nestoise, bière bio, depuis 2012 : magasin et bar ouverts le vendredi de 17 h à 19 h, d'après son site. L'office de tourisme ajoute le jeudi et le vendredi de 17 h à 22 h en saison estivale, avec petite restauration, et des concerts.
- addr : (vide) → 4 route de Tarbes-Toulouse, 65150 Saint-Laurent-de-Neste
- src : (vide) → http://www.brasserie-des-pics.fr
- coordPrecision : (vide) → address
- beers.0.type : (vide) → blonde
- beers.0.libelle : (vide) → Nestoise Blonde
- beers.1.type : (vide) → ambree
- beers.1.libelle : (vide) → Nestoise Ambrée
- beers.2.type : (vide) → blanche
- beers.2.libelle : (vide) → Nestoise Blanche
- beers.3.type : (vide) → ipa
- beers.3.libelle : (vide) → Nestoise IPA
- beers.4.type : (vide) → stout
- beers.4.libelle : (vide) → Nestoise Stout
- contact.tel : (vide) → 05 62 39 30 95
- contact.site : (vide) → http://www.brasserie-des-pics.fr
- contact.source : (vide) → http://www.brasserie-des-pics.fr
- contact.verifieLe : (vide) → 2026-11-23
- verifieLe : (vide) → 2026-11-23

Sources (vérifiée le 2026-11-23) : http://www.brasserie-des-pics.fr ; https://data.geopf.fr/geocodage/search?q=4+route+de+Tarbes-Toulouse%2C+65150+Saint-Laurent-de-Neste&limit=5

Extrait lu : « Le magasin et le bar sont ouverts »

Choix du vérificateur : Site officiel et fiche de l'office d'Occitanie relus sur la page brute le 23/11. Le site écrit aussi une liste d'heures qui se contredit (mercredi, jeudi, deux vendredis) : aucun horaire n'est structuré : une grille au vendredi 17 h – 19 h dirait « fermé » un vendredi d'été à 20 h, alors que l'office annonce 22 h (persona Hugo, 23/11) ; les heures sont dites dans la note. La saison estivale de l'office n'a pas de dates : dite dans la note. Fixe publié par la brasserie.

**Aperçu de la fiche** (état du moment calculé le lundi 23 novembre 2026 à 17:58, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 4 route de Tarbes-Toulouse, 65150 Saint-Laurent-de-Neste
> - Pas encore dans la fiche : ses horaires.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+des+Pics+Saint-Laurent-de-Neste)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 05 62 39 30 95](tel:+33562393095)
> - [Site de la brasserie](http://www.brasserie-des-pics.fr)
> - Ses bières
> - Nestoise Blonde · Blonde (non référencé) — claire et légère
> - Nestoise Ambrée · Ambrée (non référencé) — cuivrée, notes de caramel
> - Nestoise Blanche · Blanche (non référencé) — au blé, souvent trouble et rafraîchissante
> - Nestoise IPA · IPA (non référencé) — très houblonnée, souvent amère
> - Nestoise Stout · Stout (non référencé) — noire, café et chocolat
> - [Chercher ses bières sur Untappd](https://untappd.com/search?q=Brasserie+des+Pics&type=brewery) (Untappd, une application d’avis sur les bières ; la recherche se fait par le nom de la brasserie)
> - Lu sur [brasserie-des-pics.fr](http://www.brasserie-des-pics.fr) le 23 novembre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 4. Brasserie du Pays des Gaves — fiche nouvelle

- n : (vide) → Brasserie du Pays des Gaves
- c : (vide) → Argelès-Gazost
- d : (vide) → 65
- lat : (vide) → 43.00727
- lon : (vide) → -0.09087
- km : (vide) → 486.1
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Brasserie d'Argelès-Gazost avec un intérieur et une terrasse où déguster ses bières, et une boutique de vente directe, d'après son site. Visites suivies d'une dégustation gratuite.
- addr : (vide) → 4 chemin de l'Herbe, 65400 Argelès-Gazost
- src : (vide) → https://www.brasseriedesgaves.com/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 05 62 32 76 61
- contact.site : (vide) → https://www.brasseriedesgaves.com/
- contact.source : (vide) → https://www.brasseriedesgaves.com/
- contact.verifieLe : (vide) → 2026-11-23
- horaires.0.nature : (vide) → accueil
- horaires.0.lun : (vide) → 8 h – 22 h
- horaires.0.mar : (vide) → 8 h – 22 h
- horaires.0.mer : (vide) → 8 h – 22 h
- horaires.0.jeu : (vide) → 8 h – 22 h
- horaires.0.ven : (vide) → 8 h – 22 h
- horaires.0.sam : (vide) → 12 h 30 – 22 h 30
- horaires.0.dim : (vide) → 17 h – 21 h 30
- horaires.0.source : (vide) → https://www.brasseriedesgaves.com/
- horaires.0.verifieLe : (vide) → 2026-11-23
- verifieLe : (vide) → 2026-11-23

Sources (vérifiée le 2026-11-23) : https://www.brasseriedesgaves.com/ ; https://data.geopf.fr/geocodage/search?q=4+chemin+de+l%27Herbe%2C+65400+Argel%C3%A8s-Gazost&limit=5

Extrait lu : « Nos produits sont disponibles à la vente directe dans notre boutique »

Choix du vérificateur : Site officiel relu sur la page brute le 23/11 : « Vous pouvez vous installer tranquillement sur notre terrasse pour déguster votre bière préférée » et la boutique de vente directe, sur la même page. Horaires d'accueil de la même page. Fixe publié par la brasserie ; le portable de l'office n'est pas repris. L'adresse SIRENE est à Esquièze-Sère ; le site dit Argelès-Gazost, retenue.

**Aperçu de la fiche** (état du moment calculé le lundi 23 novembre 2026 à 17:58, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 17 h 58 (heure de Paris), accueil du public : ouvert jusqu’à 22 h, d’après les horaires publiés.
> - Adresse
> - 4 chemin de l'Herbe, 65400 Argelès-Gazost
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+du+Pays+des+Gaves&type=brewery)
> - Joindre la brasserie
> - [Appeler le 05 62 32 76 61](tel:+33562327661)
> - [Site de la brasserie](https://www.brasseriedesgaves.com/)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | 8 h – 22 h
> - Mardi | 8 h – 22 h
> - Mercredi | 8 h – 22 h
> - Jeudi | 8 h – 22 h
> - Vendredi | 8 h – 22 h
> - Samedi | 12 h 30 – 22 h 30
> - Dimanche | 17 h – 21 h 30
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriedesgaves.com](https://www.brasseriedesgaves.com/) le 23 novembre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 5. La Méridienne — fiche nouvelle

- n : (vide) → La Méridienne
- c : (vide) → Ibos
- d : (vide) → 65
- lat : (vide) → 43.23121
- lon : (vide) → 0.00019
- km : (vide) → 464.9
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Microbrasserie qui accueille dans son brewpub, bar à bières artisanales, d'après son site ; le site situe sa boutique au 14 rue des Pyrénées, à Ibos, sans dire que le bar y est aussi. Bières en bouteilles de 33 et 75 cl, ateliers de brassage. Aucun horaire publié. Téléphone publié par la brasserie : 06 25 69 08 95.
- addr : (vide) → 14 rue des Pyrénées, 65420 Ibos
- src : (vide) → https://lameridienneibos.fr
- coordPrecision : (vide) → address
- beers.0.type : (vide) → blonde
- beers.1.type : (vide) → ambree
- beers.2.type : (vide) → blanche
- beers.3.type : (vide) → ipa
- contact.site : (vide) → https://lameridienneibos.fr
- contact.source : (vide) → https://lameridienneibos.fr
- contact.verifieLe : (vide) → 2026-11-23
- verifieLe : (vide) → 2026-11-23

Sources (vérifiée le 2026-11-23) : https://lameridienneibos.fr ; https://data.geopf.fr/geocodage/search?q=14+rue+des+Pyr%C3%A9n%C3%A9es%2C+65420+Ibos&limit=5

Extrait lu : « bar à bières artisanales »

Choix du vérificateur : Site officiel relu sur la page brute le 23/11 (« vous accueille dans son Brewpub, un véritable bar à bières artisanales » ; « Directement à la boutique au 14 rue des Pyrénées »). Catégorie 1 en confiance moyenne : la vente à emporter n'est pas écrite en ces mots. Le seul numéro publié est un portable écrit sans espaces (« 0625690895 »), que le contrôle ne relit pas : il passe dans la note (règle du 21/10). L'office écrit « La Meridenne », même adresse.

**Aperçu de la fiche** (état du moment calculé le lundi 23 novembre 2026 à 17:58, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 14 rue des Pyrénées, 65420 Ibos
> - Pas encore dans la fiche : ses horaires.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=La+M%C3%A9ridienne+Ibos)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - La source cite un numéro, non revérifié : voyez « Ce que dit la source », plus haut.
> - [Site de la brasserie](https://lameridienneibos.fr)
> - Ses bières
> - Blonde (non référencé) — claire et légère
> - Ambrée (non référencé) — cuivrée, notes de caramel
> - Blanche (non référencé) — au blé, souvent trouble et rafraîchissante
> - IPA (non référencé) — très houblonnée, souvent amère
> - [Chercher ses bières sur Untappd](https://untappd.com/search?q=La+M%C3%A9ridienne&type=brewery) (Untappd, une application d’avis sur les bières ; la recherche se fait par le nom de la brasserie)
> - Lu sur [lameridienneibos.fr](https://lameridienneibos.fr) le 23 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 6. Brasserie du Pays Toy — fiche nouvelle

- n : (vide) → Brasserie du Pays Toy
- c : (vide) → Sassis
- d : (vide) → 65
- lat : (vide) → 42.87578
- lon : (vide) → -0.01638
- km : (vide) → 490.9
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie familiale de Sassis, qui invite à venir la découvrir, d'après son site ; ses heures d'ouverture vont du mardi au samedi. Ses bières sont vendues à l'unité ou en packs, sans que le site dise où.
- addr : (vide) → 2 chemin des Ardouneres, 65120 Sassis
- src : (vide) → https://www.brasserie-paystoy.com
- coordPrecision : (vide) → address
- beers.0.type : (vide) → ambree
- beers.0.libelle : (vide) → Col du Tourmalet
- beers.1.type : (vide) → blonde
- beers.1.libelle : (vide) → Aneto (blonde triple)
- beers.2.type : (vide) → blanche
- beers.2.libelle : (vide) → Néouvielle
- beers.3.type : (vide) → ipa
- beers.3.libelle : (vide) → Pic du Midi de Bigorre
- beers.4.type : (vide) → brune
- beers.4.libelle : (vide) → Pont d'Espagne
- contact.tel : (vide) → 05 62 41 45 13
- contact.site : (vide) → https://www.brasserie-paystoy.com
- contact.source : (vide) → https://www.brasserie-paystoy.com
- contact.verifieLe : (vide) → 2026-11-23
- horaires.0.nature : (vide) → accueil
- horaires.0.lun : (vide) → fermé
- horaires.0.mar : (vide) → 9 h – 18 h
- horaires.0.mer : (vide) → 9 h – 18 h
- horaires.0.jeu : (vide) → 9 h – 18 h
- horaires.0.ven : (vide) → 9 h – 18 h
- horaires.0.sam : (vide) → 9 h – 18 h
- horaires.0.dim : (vide) → fermé
- horaires.0.source : (vide) → https://www.brasserie-paystoy.com
- horaires.0.verifieLe : (vide) → 2026-11-23
- verifieLe : (vide) → 2026-11-23

Sources (vérifiée le 2026-11-23) : https://www.brasserie-paystoy.com ; https://data.geopf.fr/geocodage/search?q=2+chemin+des+Ardouneres%2C+65120+Sassis&limit=5

Extrait lu : « artisanale. Nous vous y recevons de façon simple et conviviale. »

Choix du vérificateur : Site officiel relu sur la page brute le 23/11. Catégorie 0 : la brasserie reçoit, mais ni boutique ni vente sur place ne sont écrites (« vendues à l'unité » sans lieu). Horaires d'ouverture de la page (« Du mardi au samedi : 09h00 - 18h00 », « Fermé le dimanche et lundi »). Fixe publié par la brasserie. Le candidat SIRENE « Brewpub » de Sassis n'est pas rattaché : aucune page ne le relie.

**Aperçu de la fiche** (état du moment calculé le lundi 23 novembre 2026 à 17:58, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Maintenant
> - À 17 h 58 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : demain à 9 h.
> - Adresse
> - 2 chemin des Ardouneres, 65120 Sassis
> - Joindre la brasserie
> - [Appeler le 05 62 41 45 13](tel:+33562414513)
> - [Site de la brasserie](https://www.brasserie-paystoy.com)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | fermé
> - Mardi | 9 h – 18 h
> - Mercredi | 9 h – 18 h
> - Jeudi | 9 h – 18 h
> - Vendredi | 9 h – 18 h
> - Samedi | 9 h – 18 h
> - Dimanche | fermé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Ses bières
> - Col du Tourmalet · Ambrée (non référencé) — cuivrée, notes de caramel
> - Aneto (blonde triple) · Blonde (non référencé) — claire et légère
> - Néouvielle · Blanche (non référencé) — au blé, souvent trouble et rafraîchissante
> - Pic du Midi de Bigorre · IPA (non référencé) — très houblonnée, souvent amère
> - Pont d'Espagne · Brune (non référencé) — foncée, notes torréfiées
> - [Chercher ses bières sur Untappd](https://untappd.com/search?q=Brasserie+du+Pays+Toy&type=brewery) (Untappd, une application d’avis sur les bières ; la recherche se fait par le nom de la brasserie)
> - Lu sur [brasserie-paystoy.com](https://www.brasserie-paystoy.com) le 23 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 7. Les Brasseurs de l'Adour — fiche nouvelle

- n : (vide) → Les Brasseurs de l'Adour
- c : (vide) → Bagnères-de-Bigorre
- d : (vide) → 65
- lat : (vide) → 43.06334
- lon : (vide) → 0.14889
- km : (vide) → 467.1
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie de Bagnères-de-Bigorre, sans visite : ses bières se boivent à la pression au pub des Compagnons, son bar à côté des halles, d'après son site. La vente à emporter n'est pas dite. Deuxième numéro publié par la brasserie : 06 28 90 77 84.
- addr : (vide) → 10 rue des Thermes, 65200 Bagnères-de-Bigorre
- src : (vide) → https://lesbrasseursdeladour.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 25 01 88 10
- contact.site : (vide) → https://lesbrasseursdeladour.fr
- contact.source : (vide) → https://lesbrasseursdeladour.fr
- contact.verifieLe : (vide) → 2026-11-23
- horaires.0.nature : (vide) → accueil
- horaires.0.mar : (vide) → 16 h – 22 h 30
- horaires.0.mer : (vide) → 16 h – 22 h 30
- horaires.0.jeu : (vide) → 16 h – 22 h 30
- horaires.0.ven : (vide) → 16 h – 22 h 30
- horaires.0.sam : (vide) → 8 h 30 – 13 h 30, 17 h – 22 h 30
- horaires.0.remarque : (vide) → Heures du bar, le pub des Compagnons.
- horaires.0.source : (vide) → https://lesbrasseursdeladour.fr
- horaires.0.verifieLe : (vide) → 2026-11-23
- verifieLe : (vide) → 2026-11-23

Sources (vérifiée le 2026-11-23) : https://lesbrasseursdeladour.fr ; https://data.geopf.fr/geocodage/search?q=10+rue+des+Thermes%2C+65200+Bagn%C3%A8res-de-Bigorre&limit=5

Extrait lu : « Nous ne faisons pas de visite mais nous avons un bar avec nos bières à la pression »

Choix du vérificateur : Site officiel relu sur la page brute le 23/11. Catégorie 0 : un bar sans vente dite (catégorie 4 seulement si « pas de vente à emporter » est écrit). L'adresse est celle du bar, où l'on va ; la brasserie est dans la zone Dominique Soulé. Les heures sont celles du bar, « toute l'année » ; dimanche et lundi ne sont pas écrits. Deux portables publiés par la brasserie, aucun fixe : le premier est repris (règle du 21/10), le second est dit dans la note. Le candidat SIRENE « Les Compagnons » est ce même bar.

**Aperçu de la fiche** (état du moment calculé le lundi 23 novembre 2026 à 17:58, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Maintenant
> - À 17 h 58 (heure de Paris), accueil du public : la source ne dit pas les heures de ce jour.
> - Adresse
> - 10 rue des Thermes, 65200 Bagnères-de-Bigorre
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Les+Brasseurs+de+l%27Adour&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 25 01 88 10](tel:+33625018810)
> - [Site de la brasserie](https://lesbrasseursdeladour.fr)
> - Horaires
> - À savoir : Heures du bar, le pub des Compagnons.
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | 16 h – 22 h 30
> - Mercredi | 16 h – 22 h 30
> - Jeudi | 16 h – 22 h 30
> - Vendredi | 16 h – 22 h 30
> - Samedi | 8 h 30 – 13 h 30, 17 h – 22 h 30
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [lesbrasseursdeladour.fr](https://lesbrasseursdeladour.fr) le 23 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

Empreinte du lot : 3b40f779f6de
