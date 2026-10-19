# À montrer à Cédric — ce que sa règle du 18/10 n'a pas tranché

Écrit le 18/10 (S272). La règle « site officiel + contrôlé » et « toutes les
fiches nouvelles des lots départementaux » a fait entrer 393 numéros dans
`data/` (PR #100, #103 à #106). Il reste **248 lignes** dans
`curation/decision-regle.md`, et une vingtaine de points relevés dans les
PR. Les voici **par groupe**, chacun avec une **règle proposée** : une
réponse par groupe suffit (« groupe 2 : d'accord », « groupe 4 : non »).
Le détail ligne par ligne est dans `curation/decision-regle.md`, section
« À montrer ».

## Les réponses attendues

Ajouté le 18/10 (relecture S295, persona Cédric : le texte était dense).
Une ligne par groupe ; « au plus » dit combien de propositions la réponse
peut faire entrer, un plafond : une fiche peut figurer dans deux groupes
(Malting Pot, aux groupes 7 et 8), et un groupe peut en exclure une partie
(groupe 2 : les adresses marquées « score faible » ou « incomplète »).

| Groupe | La question | Réponse attendue | Au plus |
|---|---|---|---|
| 1 | Clore le lot des découvertes OSM du 16/10 sans l'appliquer ? | oui / non | 0 (elles restent dans la couche OSM) |
| 2 | Accepter les positions géocodées depuis un office ou un annuaire ? | oui / non | 59 positions à l'adresse |
| 3 | Accepter les bières lues sur la page Untappd de la brasserie ? | oui / non | 34 propositions de bières |
| 4 | Accepter ces propositions sans le mobile ? Un agent réécrit alors le lot, et vous l'acceptez ensuite par une seconde réponse | oui / non | 20 propositions (site, bières, horaires) |
| 5 | Laisser de côté les sources de tourisme ou d'annuaire ? | oui / non | 0 |
| 6 | Appliquer la procédure de déménagement aux 10 brasseries ? | oui / non | 10 brasseries changent de commune et de position |
| 7 | Placer ces 13 fiches au centre IGN de leur arrondissement ou de leur commune nouvelle ? | oui / non | 13 positions au centre IGN |
| 8 | Pour chaque fiche douteuse : la proposition de la dernière colonne ? | oui / non par ligne, ou « comme proposé » | 13 lignes ; 3 touchent le périmètre (industriels, chaînes) |
| 9 | Retirer le numéro mobile de la note de Grigny ? | oui / non | 1 |

## 1. Les découvertes OpenStreetMap du 16/10 (`s14-decouverte`, 119 fiches)

Fiches lues sur OpenStreetMap seulement, sans autre vérification
(`curation/s14-decouverte-resume.md`). Recompté objet par objet : 103 sont
déjà dans la couche OpenStreetMap de la carte, en « À confirmer » ; 12 sont
des fiches de `data/` (Caribrew, La Chénou, Ninkasi…) ; Les Brasseurs
Savoyards y sont sous un autre objet OSM ; 2 ne sont nulle part, et le lot
les marque « café/bar/enseigne ? » (« Le Rendez-Vous », un restaurant ;
« Stories », un bar).

**Proposé** : clore ce lot sans l'appliquer ; les 103 restent dans la couche
OSM, et entreront dans `data/` par les lots départementaux (E25), vérifiés
un à un ; les 2 derniers ne sont pas des brasseries établies.

## 2. Des positions à l'adresse lue ailleurs que sur le site (`s54-positions`, 59)

Adresse lue sur un office de tourisme, un annuaire ou Untappd, puis
géocodée au numéro par l'IGN (garde S52 : bon département, bonne commune,
numéro de voie). La règle exigeait le site officiel ; ces fiches sont
aujourd'hui au centre IGN de leur commune (S268).

**Proposé** : les accepter, sauf celles que le lot marque « score faible »
ou « adresse incomplète » (montrées à part) : une adresse géocodée au numéro
est plus juste qu'un centre de commune.

## 3. Des bières lues sur Untappd (`s53-untappd-bieres`, 34)

Listes de bières et lien Untappd lus sur la page Untappd de la brasserie,
quand la fiche n'a pas de site officiel connu (18) ou que la source n'est
pas le site (16) ; une 35e écrit un mobile (groupe 4).

**Proposé** : accepter les bières et le lien lus sur la page Untappd de la
brasserie elle-même (c'est son catalogue) ; le type de chaque bière suit le
style affiché par Untappd (règle S53).

## 4. Des propositions qui écrivent un téléphone mobile (22)

`s134-sites-bieres` (11), `s16-lot-3` (5), `s17-lot-4` (3), `s11` (2),
`s53` (1). La proposition porte aussi un site, des bières ou des horaires.
Depuis S267, une fiche sans téléphone vérifié offre celui de Google Maps.
Le tri n'affiche que la première raison : 2 d'entre elles ont aussi une
source hors du site officiel (Brasserie de Cluny, `s16`, lue sur Untappd ;
La Grange du Seigneur, `s17`, lue sur un site de tourisme).

**Proposé** : accepter les 20 autres **sans le mobile** (site, bières,
horaires lus sur le site officiel, comme le reste de la règle) ; le
téléphone reste celui que montre Google Maps. Cela demande un lot réécrit
sans les mobiles (nouvelle empreinte, nouvel accord). Les 2 citées suivent
le groupe 5.

## 5. Des sources de tourisme ou d'annuaire, des concurrentes (14)

`s17-lot-4` (9 : offices de tourisme de Grenoble et de Chartreuse, fiches
sans site connu, concurrentes de `s134`), `s16-lot-3` (3 : sans site
connu, concurrente, confiance faible), `s11` (1), `s13-lot-2` (1,
confiance faible). Total des groupes 1 à 5 : 119 + 59 + 34 + 22 + 14 = 248.

**Proposé** : les laisser de côté ; une vérification sur le site de la
brasserie les reprendra (veille, S15).

## 6. Les 10 brasseries installées dans une autre commune (`s55-positions-2`)

Leur adresse publiée est dans une autre commune que leur fiche (Grange
Noire à Saint-Alban, Paille à Lournand, Teddy Beer à Beaubery…). Le lot
compte 12 lignes : Grange Noire et Teddy Beer y sont deux fois.

**Proposé** : la procédure de déménagement (S82) — la fiche change de
commune, de département s'il le faut, de position et de distance, avec la
source qui le dit.

## 7. Les 13 fiches sans centre IGN trouvé

Arrondissements de Lyon (Lyon 1er, 2e, 7e), Oullins et Pierre-Bénite
(fusionnées en Oullins-Pierre-Bénite), communes nouvelles (Hauteville-
Lompnes, Belmont-Luthézieu, Culoz, Autrans), Le Mazet-Saint-Voy. Elles
gardent leur point d'origine, dit « approximatif ».

**Proposé** : les placer au centre IGN de leur arrondissement ou de leur
commune nouvelle, et dire lequel dans la fiche.

## 8. Fiches entrées par la règle, mais douteuses (PR #100, #104 à #106)

| Fiche | Doute | Proposé |
|---|---|---|
| Malting Pot, L'Affoleuse | « Acheter et consommer sur place » déduit, pas écrit sur le site | revenir à « À confirmer » |
| La Canaille, Les Bières du Temps | une ancienne note contredit les horaires ajoutés (la page officielle confirme les horaires) | effacer l'ancienne note |
| Brasserie des Ursulines | horaires d'été seulement en remarque ; lundi-mardi « fermé » à l'accueil alors que la vente à emporter est possible | ajouter le bloc d'été et un bloc « vente » |
| La Moussette (50) | un bar qui sert une bière brassée tout près | retirer |
| Tiens bon la Barre (22) | placée à Plouasne, à l'adresse de la Brasserie Nautica ; OpenStreetMap la met à Longaulnay (35) | vérifier, puis déménager (groupe 6) |
| L'Âne Doré, l'Etrille, l'Hermine (56), Beltane (35), Bout du Monde (29) | peut-être des bars, ou sans preuve d'existence | laisser en « À confirmer » et vérifier |
| Philmore, BUBAR (44) | statut de brasserie non établi | idem |
| Brasserie Régionale de l'Ouest (22), deux « 3 Brasseurs » (44, 85) | industrielle ; chaîne de brasseries-restaurants | dire si elles sont dans le périmètre |
| La Brasserie Graphique (29) | position `address` lue sur un annuaire ; SIRENE la met à Plouigneau | revenir au centre IGN |
| Bouffay, L'Olifant, X'Pression, L'Ours Jack Brasse, Papposilène, Les Deux Brunes, Alpaca | « Acheter seulement » fondé sur « Winery sales » d'un annuaire | revenir à « À confirmer » |
| La Turbulente (44) | en reprise, réouverture non confirmée | laisser, à revérifier |
| Art Is An Ale Brewing (37) | entrée par la règle « toutes » ; `controler` signalait un écart sur sa source (un office de tourisme) | revérifier sur son site |
| La Hulotte et AERoFAB (44) | même adresse à Sautron, lien non établi | vérifier |

## 9. Un numéro mobile dans le fichier d'origine

La note de la brasserie qui a déménagé à Grigny (fichier du 15/10) porte
un numéro de mobile.

**Proposé** : retirer le numéro de la note.

## 10. Lu en S297, que la règle ne tranche pas (115 fiches relues)

S297 a relu 115 fiches sur leur site. 36 propositions sont entrées par la
règle (`curation/s297-completer-1.md` à `s297-completer-4.md`). Restent :

| Fiche | Ce qui est lu | Proposé |
|---|---|---|
| Brasserie Tête Haute | mer.–jeu. 12h-20h, ven. 12h-23h, sam. 10h-13h, sans dire si c'est l'accueil ou la vente | dire « accueil » : c'est un bar de brasserie |
| Brasserie Vestibule | mer. 17h-20h, sam. 10h30-13h, « pour acheter de la pression en vrac » | dire « vente » |
| Le Brasseur Bavarois | lun., mar., mer., ven. 12h-19h, sans nature | à vérifier sur place, ou par téléphone |
| Brasserie Léopard | mer. 11h-17h, jeu.–ven. 11h-17h, sam. 10h-15h, sans nature ; « consommer sur place dès le 1er juillet », sans année | « vente » pour les horaires ; la consommation sur place attend une date |
| Brasserie du Perche | un bar alimenté par les cuves, pas de vente à emporter écrite | catégorie 1 si le bar vaut « consommer sur place » |
| Brasserie du Marsouin | « dégustation et vente à emporter » le vendredi après-midi | entrée en catégorie 1, confiance moyenne : à confirmer |
| Brasserie Paillette | des bières (blonde, IPA) sur `bierepaillette.fr`, mais aucun site officiel au contact de la fiche | accepter ce site comme officiel |
| Brasserie Sainte Beuve | entrée par sa boutique en ligne (`eproshopping.fr`) ; le site propre est « en construction » | garder, ou attendre le site |
| Tiens bon la Barre | « depuis 2023 à Plouasne », « 2 la gare » (l'adresse de Nautica), sur un annuaire | voir le groupe 8 |
| BUBAR, Philmore, Beltane | annuaires seulement ; un bar, ou un brewpub | voir le groupe 8 |
| Les Alchimistes Ivres | « directement à la brasserie (il ne nous en reste que 20 !) », visite avec dégustation | catégorie 2, confiance faible : à confirmer (lot 3, n° 1) |
| La Bière de Groix | « dans nos boutiques à la brasserie », d'après l'office de tourisme | catégorie 2, confiance faible (lot 3, n° 9) |
| La Ville Porte Amour, Nomade Brewery | le lien Untappd figure sur le site officiel | accepter Untappd quand le site y renvoie (lot 3, n° 5 ; lot 4, n° 2) |
| GreDam | « Du lundi au samedi 9h30 à 12h30 et 14h30 à 19h30 », cruchons et fûts, sans le mot « vente » | dire « vente » |
| Caribrew | vente lun.–ven. 8h-18h (office de tourisme) contre « tous les jours de 8h à 18h » (site, pour les coffrets) | à vérifier par téléphone |
| Brasserie Kerav'ale | visites guidées de juin à septembre, mar., mer., ven. à 17h, 5 € | les mettre dans la note |
| Tom & Co | le site répond 403 ; une annonce la dit fermée | à vérifier : fermée ? |

Beaucoup de fiches ne publient qu'un mobile : elles restent sans téléphone,
avec celui de Google Maps (S267).

---

Rien de tout cela n'est appliqué : chaque groupe accepté deviendra une PR
qui liste ses lignes, comme les précédentes.
