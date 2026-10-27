# Lot dep-05 — les Hautes-Alpes (S343)

Ce lot ajoute **9 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 23 candidats = 9 proposés + 14 non proposés (tableau ci-dessous).
Catégories proposées : 5 « acheter et consommer », 1 « acheter seulement », 0 « pas de vente », 3 « à confirmer ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| BAR RESTAURANT ALPHAND (`sirene:419632781`) | Bar-restaurant Alphand (Vallouise) : non cherché faute de quota ; une microbrasserie L&L Alphand existe à Vallouise, à rapprocher : à relancer |
| LE RELAIS DE CHATEAU-CLEMENT (`sirene:819488719`) | même entreprise que la Brasserie Artisanale de Serre-Ponçon (way/1044149663), d'après le numéro de registre écrit sur basp05.com : une seule fiche |
| MICRO-BRASSERIE LA CUCHE (`sirene:845203264`) | Micro-brasserie La Cuche : une seule recherche, sans résultat, quota épuisé : à relancer |
| BRASSEURS EN CLAREE (`sirene:907706402`) | Brasseurs en Clarée : seule source, la fiche de l'office des Hautes-Vallées, injoignable depuis le conteneur le 27/10 ; site propre devenu un domaine parqué : à relancer |
| BRASSERIE URBAINE GAPENCAISE (`sirene:992292185`) | Brasserie Urbaine Gapençaise : une recherche sans résultat, quota épuisé : à relancer |
| Entreprise individuelle (`personne:2`) | Brasserie La Mousquif : même établissement que sirene:840182992, non cherché faute de quota : à relancer |
| FLORAISON SAUVAGE (`sirene:899933279`) | Floraison Sauvage : un annuaire d'entreprises seul, qui ne suffit pas ; quota épuisé : à relancer |
| Entreprise individuelle (`personne:3`) | Brasserie La Queyrassine : deux recherches, aucune brasserie de ce nom |
| Entreprise individuelle (`personne:4`) | entreprise sans nom ni adresse : rien à chercher |
| LA MOUSQUIF (`sirene:840182992`) | La Mousquif : pages de l'office de tourisme en 404 et site en 503 le 27/10 : à relancer |
| EURL DEVOLUY BREWING CONCEPT (`sirene:893180307`) | Devoluy Brewing Concept : même adresse (Le Courtil) que la Brasserie Interstellaire du Dévoluy (node/11459867968) : une seule fiche |
| WALPINE (`sirene:888726189`) | Walpine : site officiel lu par l'agent, mais injoignable depuis le conteneur le 27/10 pour le contrôle : à relancer |
| Alphand (`node/2855634433`) | Alphand (Puy-Saint-Vincent) : aucune brasserie de ce nom dans la commune ; à rapprocher de la microbrasserie Alphand de Vallouise : à relancer |
| La Belle Epoque (`node/7963807194`) | La Belle Époque (Gap) : bar-restaurant ; rien n'indique qu'il brasse |

## Les fiches proposées

## Lot dep-05 — 0 proposition(s), 9 fiche(s) nouvelle(s)

### 1. B3 Brasserie Bio de Briançon — fiche nouvelle

- n : (vide) → B3 Brasserie Bio de Briançon
- c : (vide) → Briançon
- d : (vide) → 05
- lat : (vide) → 44.90147
- lon : (vide) → 6.6406
- km : (vide) → 170.8
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Connue d'OpenStreetMap et d'une fiche de l'office de tourisme (bières bio en bouteilles de 25 et 75 cl), qui ne dit ni vente ni accueil sur place.
- addr : (vide) → 23 avenue de la Libération, 05100 Briançon
- src : (vide) → https://provence-alpes-cotedazur.com/en/offers/b3-brasserie-bio-de-briancon-briancon-en-2878479/
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://provence-alpes-cotedazur.com/en/offers/b3-brasserie-bio-de-briancon-briancon-en-2878479/ ; https://data.geopf.fr/geocodage/search?q=23+avenue+de+la+Lib%C3%A9ration%2C+05100+Brian%C3%A7on&limit=5

Extrait lu : « Craft production of 25cl and 75cl beers »

Choix du vérificateur : Numéros publiés par l'office seul : non retenus. Pas de site propre trouvé, pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 13:57, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 23 avenue de la Libération, 05100 Briançon
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=B3+Brasserie+Bio+de+Brian%C3%A7on+Brian%C3%A7on)[Ses bières sur Untappd](https://untappd.com/search?q=B3+Brasserie+Bio+de+Brian%C3%A7on&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [provence-alpes-cotedazur.com](https://provence-alpes-cotedazur.com/en/offers/b3-brasserie-bio-de-briancon-briancon-en-2878479/) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 2. Brasserie Interstellaire du Dévoluy — fiche nouvelle

- n : (vide) → Brasserie Interstellaire du Dévoluy
- c : (vide) → Dévoluy
- d : (vide) → 05
- lat : (vide) → 44.70755
- lon : (vide) → 5.92311
- km : (vide) → 141.2
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → La fiche de l'office de tourisme du Dévoluy décrit des bières brassées sur place et une boutique chez l'exploitant ; elle ne dit pas qu'on y boit. Ouvert tous les jours aux vacances scolaires ; hors vacances, jours et horaires variables.
- addr : (vide) → Le Courtil, 13 chemin de la Charrière, 05250 Dévoluy
- src : (vide) → https://provence-alpes-cotedazur.com/sejourner/informations-pratiques/tous-les-services-pratiques/brasserie-interstellaire-du-devoluy-devoluy-fr-3283111/
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://provence-alpes-cotedazur.com/sejourner/informations-pratiques/tous-les-services-pratiques/brasserie-interstellaire-du-devoluy-devoluy-fr-3283111/ ; https://data.geopf.fr/geocodage/search?q=Le+Courtil%2C+13+chemin+de+la+Charri%C3%A8re%2C+05250+D%C3%A9voluy&limit=5

Extrait lu : « La Brasserie Interstellaire du Dévoluy crée et propose des bières originales, brassées sur place à l’eau du Dévoluy »

Choix du vérificateur : Téléphone lu sur la fiche de l'office seulement : non repris (précédent de S342 et S356). Pas de site propre trouvé, pas d'Untappd. La ligne SIRENE de Devoluy Brewing Concept, à la même adresse (Le Courtil), n'en fait pas une seconde fiche.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 13:57, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - Le Courtil, 13 chemin de la Charrière, 05250 Dévoluy
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Interstellaire+du+D%C3%A9voluy+D%C3%A9voluy)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Interstellaire+du+D%C3%A9voluy&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [provence-alpes-cotedazur.com](https://provence-alpes-cotedazur.com/sejourner/informations-pratiques/tous-les-services-pratiques/brasserie-interstellaire-du-devoluy-devoluy-fr-3283111/) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 3. Brasserie Tourmente — fiche nouvelle

- n : (vide) → Brasserie Tourmente
- c : (vide) → Briançon
- d : (vide) → 05
- lat : (vide) → 44.90284
- lon : (vide) → 6.63091
- km : (vide) → 170
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie de Briançon dont le site propose des visites ; il ne dit ni vente ni dégustation sur place.
- addr : (vide) → 5 avenue du Dauphiné, 05100 Briançon
- src : (vide) → https://latourmente.com
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 04 92 21 31 49
- contact.site : (vide) → https://latourmente.com
- contact.source : (vide) → https://latourmente.com
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://latourmente.com ; https://data.geopf.fr/geocodage/search?q=5+avenue+du+Dauphin%C3%A9%2C+05100+Brian%C3%A7on&limit=5

Extrait lu : « La Brasserie Tourmente vous ouvre ses portes ! »

Choix du vérificateur : Téléphone lu sur le site de la brasserie. Pas d'horaires publiés, pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 13:57, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 5 avenue du Dauphiné, 05100 Briançon
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Tourmente+Brian%C3%A7on)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Tourmente&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 04 92 21 31 49](tel:+33492213149)
> - [Site de la brasserie](https://latourmente.com)
> - Lu sur [latourmente.com](https://latourmente.com) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 4. Piolit Nanobrasserie — fiche nouvelle

- n : (vide) → Piolit Nanobrasserie
- c : (vide) → Avançon
- d : (vide) → 05
- lat : (vide) → 44.53602
- lon : (vide) → 6.1887
- km : (vide) → 169.4
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → La brasserie existe d'après l'office de tourisme Serre-Ponçon Vallées, qui donne un créneau le jeudi et le vendredi de 17 h à 19 h sans dire s'il s'agit de vente ou d'accueil.
- addr : (vide) → Lieu-dit Les Catinons, 05230 Avançon
- src : (vide) → https://www.serreponconvallees.com/en/piolit-nanobrasserie
- coordPrecision : (vide) → centre
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://www.serreponconvallees.com/en/piolit-nanobrasserie ; https://data.geopf.fr/geocodage/search?q=Avan%C3%A7on&type=municipality&limit=5

Extrait lu : « Independent, creative and environmentally friendly microbrewery. »

Choix du vérificateur : Téléphone lu sur la fiche de l'office seulement : non repris (précédent de S342 et S356). Créneau laissé dans la note : sa nature n'est pas dite. Pas de site propre, pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 13:57, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - Lieu-dit Les Catinons, 05230 Avançon
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Piolit+Nanobrasserie+Avan%C3%A7on)[Ses bières sur Untappd](https://untappd.com/search?q=Piolit+Nanobrasserie&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [serreponconvallees.com](https://www.serreponconvallees.com/en/piolit-nanobrasserie) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 5. Brasserie d'Ancelle — fiche nouvelle

- n : (vide) → Brasserie d'Ancelle
- c : (vide) → Ancelle
- d : (vide) → 05
- lat : (vide) → 44.61708
- lon : (vide) → 6.19312
- km : (vide) → 163
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → La fiche de l'office de tourisme Champsaur-Valgaudemar dit qu'on y achète les bières de la brasserie et qu'on les déguste sur place, en terrasse ou sur la mezzanine. Horaires saisonniers, que la page dit non garantis.
- addr : (vide) → Chemin de Bellevue, 05260 Ancelle
- src : (vide) → https://www.champsaur-valgaudemar.com/offres/brasserie-dancelle-ancelle-fr-2686805
- coordPrecision : (vide) → centre
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://www.champsaur-valgaudemar.com/offres/brasserie-dancelle-ancelle-fr-2686805 ; https://data.geopf.fr/geocodage/search?q=Ancelle&type=municipality&limit=5

Extrait lu : « d’acheter les produits élaborés dans la brasserie et de déguster sur place »

Choix du vérificateur : Téléphone lu sur la fiche de l'office seulement : non repris (précédent de S342 et S356). Horaires non proposés : la page liste quatre saisons et leurs créneaux sans qu'on puisse relier sûrement l'un à l'autre. Site propre injoignable le 27/10, pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 13:57, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - Chemin de Bellevue, 05260 Ancelle
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+d%27Ancelle+Ancelle)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+d%27Ancelle&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [champsaur-valgaudemar.com](https://www.champsaur-valgaudemar.com/offres/brasserie-dancelle-ancelle-fr-2686805) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 6. Brasserie des Gaillards — fiche nouvelle

- n : (vide) → Brasserie des Gaillards
- c : (vide) → Aubessagne
- d : (vide) → 05
- lat : (vide) → 44.75247
- lon : (vide) → 6.0088
- km : (vide) → 142
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Brasserie et distillerie de Chauffayer. Son site présente un bar et une boutique : la pression à la tireuse, les bouteilles à emporter. Food-truck le vendredi soir.
- addr : (vide) → 503 avenue Principale, Chauffayer, 05800 Aubessagne
- src : (vide) → https://les-gaillards.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 04 23 24 25 26
- contact.site : (vide) → https://les-gaillards.fr
- contact.source : (vide) → https://les-gaillards.fr/nous-rencontrer
- contact.verifieLe : (vide) → 2026-10-27
- horaires.0.nature : (vide) → accueil
- horaires.0.mar : (vide) → 17 h – 19 h
- horaires.0.mer : (vide) → 17 h – 19 h
- horaires.0.jeu : (vide) → 17 h – 19 h
- horaires.0.ven : (vide) → 17 h – 22 h 30
- horaires.0.sam : (vide) → 9 h 30 – 12 h
- horaires.0.remarque : (vide) → Créneaux de présence habituels : en semaine, la porte est ouverte dès que l'équipe est sur place ; le samedi matin est surtout un créneau de boutique et de retrait. Beer-garden de juin à août.
- horaires.0.source : (vide) → https://les-gaillards.fr/nous-rencontrer
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://les-gaillards.fr ; https://les-gaillards.fr/nous-rencontrer ; https://data.geopf.fr/geocodage/search?q=503+avenue+Principale%2C+Chauffayer%2C+05800+Aubessagne&limit=5

Extrait lu : « Dégustation à la pression, planches du coin, ambiance de famille au pied des montagnes. »

Choix du vérificateur : Téléphone et horaires lus sur la page « Nous rencontrer », qui les dit « créneaux de présence habituels ». Types de bière du site non repris : pas d'Untappd cité. Confiance moyenne : le site dit ses horaires « habituels », pas des horaires de bar.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 13:57, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 13 h 57 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 17 h, sous réserve.
> - Adresse
> - 503 avenue Principale, Chauffayer, 05800 Aubessagne
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+des+Gaillards&type=brewery)
> - Joindre la brasserie
> - [Appeler le 04 23 24 25 26](tel:+33423242526)
> - [Site de la brasserie](https://les-gaillards.fr)
> - Horaires
> - À savoir : Créneaux de présence habituels : en semaine, la porte est ouverte dès que l'équipe est sur place ; le samedi matin est surtout un créneau de boutique et de retrait. Beer-garden de juin à août.
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | 17 h – 19 h
> - Mercredi | 17 h – 19 h
> - Jeudi | 17 h – 19 h
> - Vendredi | 17 h – 22 h 30
> - Samedi | 9 h 30 – 12 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [les-gaillards.fr](https://les-gaillards.fr) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 7. Le Monde d'Après - Brewpub — fiche nouvelle

- n : (vide) → Le Monde d'Après - Brewpub
- c : (vide) → L'Argentière-la-Bessée
- d : (vide) → 05
- lat : (vide) → 44.79406
- lon : (vide) → 6.55951
- km : (vide) → 171.9
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Brewpub du centre-ville : un bar où l'on brasse la bière, d'après la fiche du comité régional de tourisme, ouvert toute l'année.
- addr : (vide) → 5 avenue Charles de Gaulle, 05120 L'Argentière-la-Bessée
- src : (vide) → https://provence-alpes-cotedazur.com/sejourner/informations-pratiques/tous-les-services-pratiques/le-monde-dapres-brewpub-l-argentiere-la-bessee-fr-3651861/
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://provence-alpes-cotedazur.com/sejourner/informations-pratiques/tous-les-services-pratiques/le-monde-dapres-brewpub-l-argentiere-la-bessee-fr-3651861/ ; https://data.geopf.fr/geocodage/search?q=5+avenue+Charles+de+Gaulle%2C+05120+L%27Argenti%C3%A8re-la-Bess%C3%A9e&limit=5

Extrait lu : « c'est donc un bar dans lequel on fabrique de la bière »

Choix du vérificateur : Téléphone lu sur la fiche de l'office seulement : non repris (précédent de S342 et S356). Rapproché de la ligne SIRENE « Brewpub des Aigues Froides » : seul brewpub enregistré dans la commune ; l'adresse est celle du registre, la fiche du tourisme n'en donne pas. Horaires écartés : la fiche se contredit. Pas de site propre, pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 13:57, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 5 avenue Charles de Gaulle, 05120 L'Argentière-la-Bessée
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Le+Monde+d%27Apr%C3%A8s+-+Brewpub+L%27Argenti%C3%A8re-la-Bess%C3%A9e)[Ses bières sur Untappd](https://untappd.com/search?q=Le+Monde+d%27Apr%C3%A8s+-+Brewpub&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [provence-alpes-cotedazur.com](https://provence-alpes-cotedazur.com/sejourner/informations-pratiques/tous-les-services-pratiques/le-monde-dapres-brewpub-l-argentiere-la-bessee-fr-3651861/) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 8. Brasserie Butcher's — fiche nouvelle

- n : (vide) → Brasserie Butcher's
- c : (vide) → Guillestre
- d : (vide) → 05
- lat : (vide) → 44.66089
- lon : (vide) → 6.65221
- km : (vide) → 186.6
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → La fiche de l'office de tourisme propose dégustation et achat de bières artisanales, avec terrasse ; du 29 août au 31 décembre 2026, du mercredi au samedi de 16 h à 21 h, horaires que la page dit non garantis.
- addr : (vide) → 70A route du Queyras, 05600 Guillestre
- src : (vide) → https://provence-alpes-cotedazur.com/en/plan-your-stay/useful-information/all-practical-services/brasserie-butchers-guillestre-en-4094643/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://brasserie-butchers.com
- contact.source : (vide) → https://provence-alpes-cotedazur.com/en/plan-your-stay/useful-information/all-practical-services/brasserie-butchers-guillestre-en-4094643/
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://provence-alpes-cotedazur.com/en/plan-your-stay/useful-information/all-practical-services/brasserie-butchers-guillestre-en-4094643/ ; https://data.geopf.fr/geocodage/search?q=70A+route+du+Queyras%2C+05600+Guillestre&limit=5

Extrait lu : « For a tasting or souvenir purchase, Butcher's Brewery offers you artisanal beers with character. Brewed in the heart of the Hautes-Alpes! »

Choix du vérificateur : Téléphone lu sur la fiche de l'office seulement : non repris (précédent de S342 et S356). Horaires laissés dans la note : la page les écrit en anglais et les dit non garantis. Pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 13:57, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 70A route du Queyras, 05600 Guillestre
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Butcher%27s+Guillestre)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Butcher%27s&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://brasserie-butchers.com)
> - Lu sur [provence-alpes-cotedazur.com](https://provence-alpes-cotedazur.com/en/plan-your-stay/useful-information/all-practical-services/brasserie-butchers-guillestre-en-4094643/) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 9. Brasserie Artisanale de Serre-Ponçon — fiche nouvelle

- n : (vide) → Brasserie Artisanale de Serre-Ponçon
- c : (vide) → Chorges
- d : (vide) → 05
- lat : (vide) → 44.55327
- lon : (vide) → 6.25816
- km : (vide) → 171.7
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Le site de la brasserie annonce l'Apex, « boutique, bar, concerts », avec ses horaires. L'adresse est celle de l'Apex selon l'office de tourisme ; l'usine, dans la même zone, ferme le samedi : c'est l'Apex qu'il faut chercher.
- addr : (vide) → 67 rue de la Source, ZA Grande Île Nord, 05230 Chorges
- src : (vide) → https://basp05.com/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 04 88 26 00 46
- contact.site : (vide) → https://basp05.com/
- contact.source : (vide) → https://basp05.com/
- contact.verifieLe : (vide) → 2026-10-27
- horaires.0.nature : (vide) → accueil
- horaires.0.mar : (vide) → 12 h – 23 h
- horaires.0.mer : (vide) → 12 h – 23 h
- horaires.0.jeu : (vide) → 12 h – 23 h
- horaires.0.ven : (vide) → 12 h – minuit
- horaires.0.sam : (vide) → 16 h – minuit
- horaires.0.remarque : (vide) → Horaires de l'Apex (boutique, bar, concerts) ; fermé le lundi et le dimanche.
- horaires.0.source : (vide) → https://basp05.com/
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://basp05.com/ ; https://data.geopf.fr/geocodage/search?q=67+rue+de+la+Source%2C+ZA+Grande+%C3%8Ele+Nord%2C+05230+Chorges&limit=5

Extrait lu : « Boutique, bar, concerts »

Choix du vérificateur : Adresse de l'Apex prise à l'office de tourisme et à OSM : le site ne donne que la zone, d'où la confiance moyenne. Seul numéro publié. Pas d'Untappd. L'usine (retrait des commandes) a d'autres horaires, non repris.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 13:57, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 13 h 57 (heure de Paris), accueil du public : ouvert jusqu’à 23 h selon les créneaux, sous réserve de la remarque ci-dessous.
> - Adresse
> - 67 rue de la Source, ZA Grande Île Nord, 05230 Chorges
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Artisanale+de+Serre-Pon%C3%A7on&type=brewery)
> - Joindre la brasserie
> - [Appeler le 04 88 26 00 46](tel:+33488260046)
> - [Site de la brasserie](https://basp05.com/)
> - Horaires
> - À savoir : Horaires de l'Apex (boutique, bar, concerts) ; fermé le lundi et le dimanche.
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | 12 h – 23 h
> - Mercredi | 12 h – 23 h
> - Jeudi | 12 h – 23 h
> - Vendredi | 12 h – minuit
> - Samedi | 16 h – minuit
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [basp05.com](https://basp05.com/) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

Empreinte du lot : 45360bea903c
