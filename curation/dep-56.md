# Lot dep-56 — le Morbihan (S249)

Pour Cédric. Ce lot propose **23 fiches nouvelles**. **Rien n'est écrit dans `data/`** tant que tu
n'as pas répondu par les numéros acceptés.

**Décompte** : 58 candidats à lire = 23 proposés + 35 non proposés (tableau ci-dessous).
Catégories proposées : 3 « acheter et consommer », 6 « acheter seulement », 0 « pas de vente », 14 « à confirmer ».

**Comment le lot a été fait** (le circuit de la Normandie, S247-S248) :
- candidats de `outils/departement.ts` ;
- lecture par les agents ;
- chaque extrait relu dans le texte même de la page, puis contrôlé par
  `controler` (« contrôle sans écart ») ; une catégorie que l'extrait ne
  porte pas est redescendue à « à confirmer » ;
- positions par `outils/departement.ts lectures`, qui refuse une position
  hors du département ou de la commune (dans ce cas, centre de la commune).

**Non lus** : 2 entreprises sans nom (personnes, sans enseigne). En Normandie, aucune n'avait pu être trouvée.

**Contacts** (S261) : site officiel, lien Untappd et téléphone fixe, chacun relu sur la page citée (`contact.source`), puis contrôlé par `controler`. Les liens Untappd ne sont repris que s'ils figurent sur le site de la brasserie, ou s'ils sont la page lue. Les mobiles restent une option, citée dans les notes ou les choix.

**Horaires** (S262) : repris quand la page les donne en clair, jour par jour, et chaque heure relue par `controler`. Ceux d'une page qui ne les donne qu'en partie, ou « non garantis », restent dans les notes.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| La Dilettante (`sirene:812439511`) | site en 429 (trop de requêtes) : rien de lu |
| Brasserie Triskell (`sirene:953851268`) | registre d'entreprises seulement : ni site ni point de vente |
| Brasserie de L'estran (`sirene:897811709`) | même adresse que la fiche proposée « Brasserie de l'Estran (Grand Coeff) » |
| Brasserie Horla (`personne:6`) | aucune page à son nom et à son adresse ; même nom que la fiche proposée « Horla », autre adresse : lien non établi |
| Brasserie la Tete Dure (`sirene:832824148`) | fermée en 2026 d'après un annuaire |
| Little Joy Kombucha (`node/14247438701`) | kombucha, pas de bière |
| Brasserie Lancelot (`node/6419074234`) | même brasserie que la fiche proposée « Brasserie Lancelot » |
| La Croisette (`node/6511166960`) | restaurant-bar, rien ne montre qu'il brasse |
| Brasserie de la Presqu'ile de Quiberon (`node/7350368846`) | introuvable ; la seule brasserie voisine (Sparkle, à Quiberon) n'a pas de lien établi |
| Brasserie La Belle Joie (`node/7494891224`) | même brasserie que la fiche proposée « La Belle Joie » |
| Yermat bier (`node/9034736574`) | même brasserie que la fiche proposée « Yermat Bier » |
| L'Estaminet du Champ Commun (`way/160691018`) | la fiche d'office de tourisme ne se lit pas (page générique) et le site répond 404 |
| Brasserie de Quiberon (`way/66430165`) | bâtiment du cadastre de 2010, aucune brasserie à cette adresse |
| Brasserie Larmorienne, Brasserie le 90, Brasserie Artisanale de Languidic, Les Barbots, Brasserie Tralala, Brasserie la Morgat, Microbrasserie Tempete, La Lylwenn, Micro-brasserie Seal, Octa Microbrasserie, SARL Treho, Brasserie Roy | introuvables en ligne |
| Brasserie Heol, Brasserie de L'eclaircie, P.A.E.C, La Brasserie Des Amis, Les Heretiks, Micro Brasserie Kerblei, Microbrasserie Loch'ale, Brasserie LMD, Kerscot SAS, Brasserie Artisanale Spoumig | non trouvés, mais cherchés une fois au plus : le quota de recherches de la session était épuisé. **À relancer** |

## Les fiches proposées

## Lot dep-56 — 0 proposition(s), 23 fiche(s) nouvelle(s)

### 1. Brasserie de l'Estran (Grand Coeff) — fiche nouvelle

- n : (vide) → Brasserie de l'Estran (Grand Coeff)
- c : (vide) → Étel
- d : (vide) → 56
- lat : (vide) → 47.65813
- lon : (vide) → -3.19398
- km : (vide) → 645
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie d'Étel ; la phrase lue renvoie à l'épicerie sans dire ce qu'on y achète.
- addr : (vide) → 4 rue Victor Hugo, 56410 Étel
- src : (vide) → https://beer.grandcoeff.bzh/
- coordPrecision : (vide) → address
- beers.0.type : (vide) → ipa
- beers.1.type : (vide) → blanche
- beers.2.type : (vide) → stout
- contact.site : (vide) → https://beer.grandcoeff.bzh/
- contact.source : (vide) → https://beer.grandcoeff.bzh/
- contact.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://beer.grandcoeff.bzh/ ; https://data.geopf.fr/geocodage/search?q=4+rue+Victor+Hugo%2C+56410+%C3%89tel&limit=5

Extrait lu : « Si le brasseur n'est pas là, s'adresser à l'épicerie ! »

Choix du vérificateur : Même adresse que sirene:897811709 (Étel), probablement la même brasserie.

### 2. Déferle Micro-brasserie — fiche nouvelle

- n : (vide) → Déferle Micro-brasserie
- c : (vide) → Plouhinec
- d : (vide) → 56
- lat : (vide) → 47.70135
- lon : (vide) → -3.21164
- km : (vide) → 647.7
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Lieu de production et de dégustation de bière (guinguette) ; la vente n'est pas précisée.
- addr : (vide) → 8 le loch, 56680 Plouhinec
- src : (vide) → https://morbihan.com/decouvrir/gastronomie-bretonne/degustation-et-vente/deferle-microbrasserie-et-guinguette-plouhinec-fr-5722591/
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://morbihan.com/decouvrir/gastronomie-bretonne/degustation-et-vente/deferle-microbrasserie-et-guinguette-plouhinec-fr-5722591/ ; https://data.geopf.fr/geocodage/search?q=8+le+loch%2C+56680+Plouhinec&limit=5

Extrait lu : « Bienvenue chez Déferle Micro-brasserie, un lieu de production et de dégustation de bière »

Choix du vérificateur : OSM la plaçait à Sainte-Hélène.

### 3. Microbrasserie VOL 56 — fiche nouvelle

- n : (vide) → Microbrasserie VOL 56
- c : (vide) → Sarzeau
- d : (vide) → 56
- lat : (vide) → 47.52045
- lon : (vide) → -2.75621
- km : (vide) → 609.1
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Le site ne se lit que par son titre ; vente, horaires et bières non lus.
- addr : (vide) → Sarzeau
- src : (vide) → https://www.microbrasserie-vol56.fr
- coordPrecision : (vide) → commune
- beers : (vide) → []
- contact.site : (vide) → https://www.microbrasserie-vol56.fr/
- contact.source : (vide) → https://www.microbrasserie-vol56.fr
- contact.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://www.microbrasserie-vol56.fr

Extrait lu : « Microbrasserie VOL 56 | bières artisanales | Sarzeau, France »

Choix du vérificateur : Site en JavaScript. Position au centre de Sarzeau.

### 4. Brasserie La Bambelle — fiche nouvelle

- n : (vide) → Brasserie La Bambelle
- c : (vide) → Saint-Gravé
- d : (vide) → 56
- lat : (vide) → 47.72123
- lon : (vide) → -2.29872
- km : (vide) → 583.8
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie qui distribue dans le département ; rien sur la vente sur place ni les horaires.
- addr : (vide) → Lanvaux, 56220 Saint-Gravé
- src : (vide) → http://www.labambelle.com
- coordPrecision : (vide) → commune
- beers : (vide) → []
- contact.site : (vide) → http://www.labambelle.com/
- contact.source : (vide) → http://www.labambelle.com
- contact.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : http://www.labambelle.com

Extrait lu : « dans le département et quelques communes des départements voisins »

### 5. Malterie-Brasserie Saint-Georges — fiche nouvelle

- n : (vide) → Malterie-Brasserie Saint-Georges
- c : (vide) → Guern
- d : (vide) → 56
- lat : (vide) → 48.02813
- lon : (vide) → -3.05078
- km : (vide) → 648.3
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → faible
- note : (vide) → Vente à la propriété ; ouvert le jeudi de 17 h à 19 h ou sur demande, d'après l'office de tourisme.
- addr : (vide) → 11 Saint-Georges, 56310 Guern
- src : (vide) → https://morbihan.com/decouvrir/gastronomie-bretonne/degustation-et-vente/brasserie-saint-georges-guern-fr-4435395/
- coordPrecision : (vide) → address
- beers.0.type : (vide) → blonde
- horaires.0.nature : (vide) → vente
- horaires.0.jeu : (vide) → 17 h – 19 h
- horaires.0.remarque : (vide) → Ou sur demande.
- horaires.0.source : (vide) → https://morbihan.com/decouvrir/gastronomie-bretonne/degustation-et-vente/brasserie-saint-georges-guern-fr-4435395/
- horaires.0.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://morbihan.com/decouvrir/gastronomie-bretonne/degustation-et-vente/brasserie-saint-georges-guern-fr-4435395/ ; https://data.geopf.fr/geocodage/search?q=11+Saint-Georges%2C+56310+Guern&limit=5

Extrait lu : « Vente à la propriété »

Choix du vérificateur : Site officiel en 403.

### 6. L'âne Brasseur — fiche nouvelle

- n : (vide) → L'âne Brasseur
- c : (vide) → Saint-Aignan
- d : (vide) → 56
- lat : (vide) → 48.1755
- lon : (vide) → -3.04065
- km : (vide) → 653.6
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Micro-brasserie artisanale avec gîte d'étape ; ni vente ni horaires sur la page lue.
- addr : (vide) → Lann Guilloux, 56480 Saint-Aignan
- src : (vide) → https://anebrasseur.fr/
- coordPrecision : (vide) → commune
- beers : (vide) → []
- contact.site : (vide) → https://anebrasseur.fr/
- contact.source : (vide) → https://anebrasseur.fr/
- contact.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://anebrasseur.fr/

Extrait lu : « Micro-Brasserie Artisanale »

Choix du vérificateur : Téléphone publié : 02 56 62 61 03.

### 7. Brasserie de Rhuys (P'tite Mamm) — fiche nouvelle

- n : (vide) → Brasserie de Rhuys (P'tite Mamm)
- c : (vide) → Surzur
- d : (vide) → 56
- lat : (vide) → 47.56438
- lon : (vide) → -2.62176
- km : (vide) → 601
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Visite et dégustation à la brasserie, bar le vendredi soir, d'après l'office de tourisme ; le site annonce la vente directe le jeudi et le vendredi.
- addr : (vide) → Surzur
- src : (vide) → https://morbihan.com/decouvrir/gastronomie-bretonne/degustation-et-vente/brasserie-de-rhuys-surzur-fr-4435685/
- coordPrecision : (vide) → commune
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://morbihan.com/decouvrir/gastronomie-bretonne/degustation-et-vente/brasserie-de-rhuys-surzur-fr-4435685/

Extrait lu : « Bar le vendredi soir »

Choix du vérificateur : Position au centre de Surzur.

### 8. Brasserie Akène — fiche nouvelle

- n : (vide) → Brasserie Akène
- c : (vide) → Saint-Léry
- d : (vide) → 56
- lat : (vide) → 48.09021
- lon : (vide) → -2.26075
- km : (vide) → 596.7
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Petite brasserie depuis 2020 ; bières vendues en épiceries, caves et marchés. Vente sur place non lue.
- addr : (vide) → Saint-Léry
- src : (vide) → https://morbihan.com/decouvrir/gastronomie-bretonne/degustation-et-vente/brasserie-akene-saint-lery-fr-5047179/
- coordPrecision : (vide) → commune
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://morbihan.com/decouvrir/gastronomie-bretonne/degustation-et-vente/brasserie-akene-saint-lery-fr-5047179/

Extrait lu : « Petite brasserie produisant des bières au style marqué depuis 2020 »

Choix du vérificateur : Fiche de tourisme seulement. Position au centre de Saint-Léry.

### 9. Brasserie Gwennili — fiche nouvelle

- n : (vide) → Brasserie Gwennili
- c : (vide) → Locoal-Mendon
- d : (vide) → 56
- lat : (vide) → 47.69819
- lon : (vide) → -3.10669
- km : (vide) → 640.1
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Vente directe annoncée, sans lieu ni horaires sur la page.
- addr : (vide) → Locoal-Mendon
- src : (vide) → https://brasserie-gwennili.fr/
- coordPrecision : (vide) → commune
- beers : (vide) → []
- contact.site : (vide) → https://brasserie-gwennili.fr/
- contact.source : (vide) → https://brasserie-gwennili.fr/
- contact.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://brasserie-gwennili.fr/

Extrait lu : « En vente directe »

Choix du vérificateur : Un agent proposait « acheter seulement » : la page ne dit pas où. Position au centre de Locoal-Mendon.

### 10. Brasserie de l'Hermine — fiche nouvelle

- n : (vide) → Brasserie de l'Hermine
- c : (vide) → Belz
- d : (vide) → 56
- lat : (vide) → 47.67316
- lon : (vide) → -3.16439
- km : (vide) → 643.4
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Ses bières sont servies « de la cuve au verre » au restaurant Ivre Mer, à Belz ; le lieu de la brasserie n'est pas établi.
- addr : (vide) → Belz
- src : (vide) → https://morbihan.com/decouvrir/gastronomie-bretonne/les-restaurants/ivre-mer-belz-fr-6331070/
- coordPrecision : (vide) → commune
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://morbihan.com/decouvrir/gastronomie-bretonne/les-restaurants/ivre-mer-belz-fr-6331070/

Extrait lu : « les bières bretonnes de la Brasserie de l’Hermine, servies « de la cuve au verre » »

Choix du vérificateur : Page d'un restaurant seulement. Position au centre de Belz.

### 11. Yermat Bier — fiche nouvelle

- n : (vide) → Yermat Bier
- c : (vide) → Locmiquélic
- d : (vide) → 56
- lat : (vide) → 47.72969
- lon : (vide) → -3.32459
- km : (vide) → 656.7
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Bières vendues dans la boutique attenante à la brasserie ; aucune dégustation lue sur cette page.
- addr : (vide) → ZA Kervern, 56570 Locmiquélic
- src : (vide) → https://morbihan.com/decouvrir/gastronomie-bretonne/degustation-et-vente/brasserie-artisanale-yermat-bier-locmiquelic-fr-5305460/
- coordPrecision : (vide) → commune
- beers.0.type : (vide) → blonde
- beers.1.type : (vide) → brune
- beers.2.type : (vide) → ambree
- beers.3.type : (vide) → ipa
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://morbihan.com/decouvrir/gastronomie-bretonne/degustation-et-vente/brasserie-artisanale-yermat-bier-locmiquelic-fr-5305460/

Extrait lu : « les bières sont vendues directement dans la boutique attenante »

Choix du vérificateur : Même brasserie que le point OSM node/9034736574 ; une autre fiche de tourisme dit « Achat, visite et dégustation possible sur place ».

### 12. La Belle Joie — fiche nouvelle

- n : (vide) → La Belle Joie
- c : (vide) → Hennebont
- d : (vide) → 56
- lat : (vide) → 47.81016
- lon : (vide) → -3.26647
- km : (vide) → 655.3
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Boutique sur le lieu de production et bar attenant (bières à la pression) en horaires after-work.
- addr : (vide) → 181 rue Maréchal Joffre, 56700 Hennebont
- src : (vide) → https://www.lorientbretagnesudtourisme.fr/fr/fiche/brasserie-artisanale-la-belle-joie-hennebont_TFOZLABELLEJOIE
- coordPrecision : (vide) → address
- beers.0.type : (vide) → blonde
- beers.1.type : (vide) → ambree
- beers.2.type : (vide) → ipa
- beers.3.type : (vide) → blanche
- beers.4.type : (vide) → brune
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://www.lorientbretagnesudtourisme.fr/fr/fiche/brasserie-artisanale-la-belle-joie-hennebont_TFOZLABELLEJOIE ; https://data.geopf.fr/geocodage/search?q=181+rue+Mar%C3%A9chal+Joffre%2C+56700+Hennebont&limit=5

Extrait lu : « Un Bar attenant à la brasserie vous accueillera en horaires after-work »

Choix du vérificateur : La vente se lit sur la même page : « la boutique située directement sur le lieu de production à Hennebont ». Même brasserie que le point OSM node/7494891224 (Kervignac).

### 13. Brasserie Kerpiton — fiche nouvelle

- n : (vide) → Brasserie Kerpiton
- c : (vide) → Loyat
- d : (vide) → 56
- lat : (vide) → 48.00213
- lon : (vide) → -2.42791
- km : (vide) → 604.2
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → faible
- note : (vide) → Visite, vente et dégustation sur rendez-vous uniquement ; fermée du 15 août au 15 septembre.
- addr : (vide) → 8 rue des Châtaigniers, 56800 Loyat
- src : (vide) → https://morbihan.com/decouvrir/gastronomie-bretonne/degustation-et-vente/brasserie-kerpiton-loyat-fr-4434079/
- coordPrecision : (vide) → address
- beers.0.type : (vide) → blanche
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://morbihan.com/decouvrir/gastronomie-bretonne/degustation-et-vente/brasserie-kerpiton-loyat-fr-4434079/ ; https://data.geopf.fr/geocodage/search?q=8+rue+des+Ch%C3%A2taigniers%2C+56800+Loyat&limit=5

Extrait lu : « Visite, vente, discussion et dégustation possible sur rendez-vous uniquement. »

Choix du vérificateur : Un agent proposait « acheter et consommer » : une dégustation de visite n'est pas un bar, d'où « acheter seulement ».

### 14. Brasserie artisanale L'Âne Doré — fiche nouvelle

- n : (vide) → Brasserie artisanale L'Âne Doré
- c : (vide) → Languidic
- d : (vide) → 56
- lat : (vide) → 47.86207
- lon : (vide) → -3.09224
- km : (vide) → 644.9
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Bar-brasserie aux bières artisanales à la pression, selon un agrégateur ; rien de la brasserie elle-même.
- addr : (vide) → 15 Rue du Commerce, 56440 Languidic
- src : (vide) → https://wanderlog.com/place/details/9889947/brasserie-artisanale-lâne-doré--kerazen-bar
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://wanderlog.com/place/details/9889947/brasserie-artisanale-lâne-doré--kerazen-bar ; https://data.geopf.fr/geocodage/search?q=15+Rue+du+Commerce%2C+56440+Languidic&limit=5

Extrait lu : « Brasserie Artisanale L'Âne Doré »

Choix du vérificateur : Agrégateur d'avis seulement (Kerazen Bar).

### 15. La Bière de Groix — fiche nouvelle

- n : (vide) → La Bière de Groix
- c : (vide) → Groix
- d : (vide) → 56
- lat : (vide) → 47.63796
- lon : (vide) → -3.46228
- km : (vide) → 663.6
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie de l'île de Groix ; la fiche classe « vente à la ferme » sans phrase qui la décrive.
- addr : (vide) → ZA Le Gripp, 56590 Groix
- src : (vide) → https://www.lorientbretagnesudtourisme.fr/fr/fiche/la-biere-de-groix-ile-de-groix_TFOZBIEREDEGROIX
- coordPrecision : (vide) → commune
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://www.lorientbretagnesudtourisme.fr/fr/fiche/la-biere-de-groix-ile-de-groix_TFOZBIEREDEGROIX

Extrait lu : « ZA Le Gripp 56590 ILE DE GROIX »

Choix du vérificateur : SIRENE déclare Locqueltas. Téléphone de la fiche : 09 51 12 41 23.

### 16. Microbrasserie Barque — fiche nouvelle

- n : (vide) → Microbrasserie Barque
- c : (vide) → Malestroit
- d : (vide) → 56
- lat : (vide) → 47.80836
- lon : (vide) → -2.3793
- km : (vide) → 592.8
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Bières en bouteille et en fût, location de tireuse ; le lieu de vente n'est pas dit.
- addr : (vide) → 4 chemin des Tanneurs, 56140 Malestroit
- src : (vide) → https://microbrasseriebarque.bzh
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://microbrasseriebarque.bzh/
- contact.source : (vide) → https://microbrasseriebarque.bzh
- contact.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://microbrasseriebarque.bzh ; https://data.geopf.fr/geocodage/search?q=4+chemin+des+Tanneurs%2C+56140+Malestroit&limit=5

Extrait lu : « des fûts de 20L sont disponibles à la vente »

Choix du vérificateur : Un agent proposait « acheter seulement » : la page ne dit pas où.

### 17. Bar Brasserie Artisanale l'Etrille — fiche nouvelle

- n : (vide) → Bar Brasserie Artisanale l'Etrille
- c : (vide) → Locmariaquer
- d : (vide) → 56
- lat : (vide) → 47.58011
- lon : (vide) → -2.96025
- km : (vide) → 625.7
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Bar-buvette avec vente à emporter selon l'office de tourisme ; rien ne dit que la bière est brassée ou vendue sur place.
- addr : (vide) → 2 Bellevue, 56740 Locmariaquer
- src : (vide) → https://morbihan.com/decouvrir/gastronomie-bretonne/les-restaurants/bar-brasserie-artisanale-letrille-locmariaquer-fr-4386947/
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://morbihan.com/decouvrir/gastronomie-bretonne/les-restaurants/bar-brasserie-artisanale-letrille-locmariaquer-fr-4386947/ ; https://data.geopf.fr/geocodage/search?q=2+Bellevue%2C+56740+Locmariaquer&limit=5

Extrait lu : « Vente à emporter »

Choix du vérificateur : Site brasserieetrille.com injoignable (DNS).

### 18. Brasserie Domani — fiche nouvelle

- n : (vide) → Brasserie Domani
- c : (vide) → Theix-Noyalo
- d : (vide) → 56
- lat : (vide) → 47.6304
- lon : (vide) → -2.64973
- km : (vide) → 605.2
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → faible
- note : (vide) → Commande en ligne et retrait à la brasserie (Click & Collect) ; consommation sur place non mentionnée.
- addr : (vide) → Theix-Noyalo
- src : (vide) → https://www.brasserie-domani.fr/
- coordPrecision : (vide) → commune
- beers.0.type : (vide) → blonde
- beers.1.type : (vide) → ipa
- contact.site : (vide) → https://www.brasserie-domani.fr/
- contact.source : (vide) → https://www.brasserie-domani.fr/
- contact.verifieLe : (vide) → 2026-10-17
- horaires.0.nature : (vide) → vente
- horaires.0.ven : (vide) → 16 h – 19 h
- horaires.0.remarque : (vide) → En juillet et août, aussi le samedi de 10 h à 13 h.
- horaires.0.source : (vide) → https://www.brasserie-domani.fr/
- horaires.0.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://www.brasserie-domani.fr/

Extrait lu : « Click & Collect directement à la brasserie »

Choix du vérificateur : Position au centre de Theix-Noyalo.

### 19. Brasserie Brume — fiche nouvelle

- n : (vide) → Brasserie Brume
- c : (vide) → Questembert
- d : (vide) → 56
- lat : (vide) → 47.6639
- lon : (vide) → -2.44
- km : (vide) → 591.6
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Bar Horizon sur le site de la brasserie, au pied des cuves, d'après l'office de tourisme.
- addr : (vide) → 1 Rue Édouard Branly, 56230 Questembert
- src : (vide) → https://morbihan.com/decouvrir/gastronomie-bretonne/les-restaurants/bar-horizon-questembert-fr-5960534/
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://morbihan.com/decouvrir/gastronomie-bretonne/les-restaurants/bar-horizon-questembert-fr-5960534/ ; https://data.geopf.fr/geocodage/search?q=1+Rue+%C3%89douard+Branly%2C+56230+Questembert&limit=5

Extrait lu : « Passer un moment convivial au pied des cuves dans notre bar HORIZON »

### 20. Horla — fiche nouvelle

- n : (vide) → Horla
- c : (vide) → Grand-Champ
- d : (vide) → 56
- lat : (vide) → 47.76232
- lon : (vide) → -2.85013
- km : (vide) → 624.1
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Nano-brasserie bio ; vente ou consommation sur place non établie.
- addr : (vide) → Grand-Champ
- src : (vide) → https://untappd.com/MicrobrasserieHorla
- coordPrecision : (vide) → commune
- beers.0.type : (vide) → sour
- beers.1.type : (vide) → stout
- contact.untappd : (vide) → https://untappd.com/MicrobrasserieHorla
- contact.source : (vide) → https://untappd.com/MicrobrasserieHorla
- contact.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://untappd.com/MicrobrasserieHorla

Extrait lu : « Grand-Champ, 56 - BZH »

Choix du vérificateur : Page Untappd seulement. Une autre entreprise « Brasserie Horla » est déclarée à Grand-Champ (personne:6), à une autre adresse : lien non établi. Position au centre de Grand-Champ.

### 21. Microbrasserie l'Esk'ale — fiche nouvelle

- n : (vide) → Microbrasserie l'Esk'ale
- c : (vide) → Kernascléden
- d : (vide) → 56
- lat : (vide) → 48.00633
- lon : (vide) → -3.32207
- km : (vide) → 666.4
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → faible
- note : (vide) → Boutique sur le lieu de production, d'après l'office de tourisme ; consommation sur place non établie.
- addr : (vide) → 25 Rue des Rohan, 56540 Kernascléden
- src : (vide) → https://morbihan.com/decouvrir/gastronomie-bretonne/degustation-et-vente/microbrasserie-leskale-kernascleden-fr-5047193/
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://morbihan.com/decouvrir/gastronomie-bretonne/degustation-et-vente/microbrasserie-leskale-kernascleden-fr-5047193/ ; https://data.geopf.fr/geocodage/search?q=25+Rue+des+Rohan%2C+56540+Kernascl%C3%A9den&limit=5

Extrait lu : « Venez découvrir notre boutique et notre lieu de production »

Choix du vérificateur : Le site de la brasserie ne se lit pas sans JavaScript.

### 22. Brasserie Casse-Grain — fiche nouvelle

- n : (vide) → Brasserie Casse-Grain
- c : (vide) → Damgan
- d : (vide) → 56
- lat : (vide) → 47.519
- lon : (vide) → -2.58231
- km : (vide) → 596.6
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Visites guidées avec dégustation sur réservation ; vente directe non établie.
- addr : (vide) → 2 impasse des Lilas, 56750 Damgan
- src : (vide) → https://www.damgan-larochebernard-tourisme.com/en/agenda/visite-de-la-brasserie-casse-grain/
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://www.damgan-larochebernard-tourisme.com/en/agenda/visite-de-la-brasserie-casse-grain/ ; https://data.geopf.fr/geocodage/search?q=2+impasse+des+Lilas%2C+56750+Damgan&limit=5

Extrait lu : « During friendly guided tours, delve into the behind-the-scenes of brewing »

Choix du vérificateur : Page en anglais de l'office de tourisme.

### 23. Brasserie Lancelot — fiche nouvelle

- n : (vide) → Brasserie Lancelot
- c : (vide) → Val d'Oust
- d : (vide) → 56
- lat : (vide) → 47.87079
- lon : (vide) → -2.47533
- km : (vide) → 602
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Boutique ouverte au public toute l'année, du lundi au vendredi (10 h-12 h 30, 13 h 30-17 h) ; rien sur une consommation sur place.
- addr : (vide) → 7 La Mine, 56460 Val d'Oust
- src : (vide) → https://morbihan.com/offres/brasserie-lancelot-val-doust-fr-4434014
- coordPrecision : (vide) → address
- beers.0.type : (vide) → ipa
- beers.1.type : (vide) → blanche
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 10 h – 12 h 30, 13 h 30 – 17 h
- horaires.0.mar : (vide) → 10 h – 12 h 30, 13 h 30 – 17 h
- horaires.0.mer : (vide) → 10 h – 12 h 30, 13 h 30 – 17 h
- horaires.0.jeu : (vide) → 10 h – 12 h 30, 13 h 30 – 17 h
- horaires.0.ven : (vide) → 10 h – 12 h 30, 13 h 30 – 17 h
- horaires.0.remarque : (vide) → Toute l'année.
- horaires.0.source : (vide) → https://morbihan.com/offres/brasserie-lancelot-val-doust-fr-4434014
- horaires.0.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://morbihan.com/offres/brasserie-lancelot-val-doust-fr-4434014 ; https://data.geopf.fr/geocodage/search?q=7+La+Mine%2C+56460+Val+d%27Oust&limit=5

Extrait lu : « du lundi au vendredi de 10h à 12h30 et de 13h30 à 17h »

Choix du vérificateur : Même brasserie que le point OSM node/6419074234. Brasserie du groupe Agrial (presse) : à Cédric de juger du périmètre.

Empreinte du lot : aa1713fac2de
