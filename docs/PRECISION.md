# Précision des points des fiches (S59)

Mesuré le 2026-10-18 par `npx tsx outils/precision.ts` (à relancer pour mettre à jour).

## Méthode

- Pour chaque fiche de `data/breweries.json`, le centre de sa commune est demandé au géocodeur de l'IGN (`type=municipality`), et gardé seulement s'il est dans le bon département et porte le nom de la commune (`positionDuGeocodeur`, la garde de S52).
- L'écart est la distance à vol d'oiseau (haversine, `distanceKm`) entre le point de la fiche et ce centre.
- Seuls des noms de commune partent au géocodeur.

## Résultat

166 fiches : 151 mesurées, 15 sans centre trouvé (La Canute Lyonnaise, Pierre-Bénite ; Bulles d'Orge, Oullins ; Coldie Brewery, Lyon 7e ; Malting Pot, Lyon 7e ; Brasserie Georges, Lyon 2e ; Platypus Brewpub, Lyon 2e ; La Beer Fabrique, Lyon 1er ; Tom & Co, Lyon 1er ; Microbrasserie de Montchat, Lyon 3e ; Brasserie du Bugey, Hauteville-Lompnes ; Ferme-Brasserie de Belmonthé, Belmont-Luthézieu ; Manev'Ale, Le Mazet-Saint-Voy ; Brasserie Rohner, Le Mazet-Saint-Voy ; Les Bières Hoffmann (Brasseurs du Grand Colombier), Culoz ; Brasserie du Vercors (Biercors), Autrans).

| Écart au centre de la commune | Fiches |
|---|---:|
| 0,5 km ou moins | 11 |
| 1,0 km ou moins | 41 |
| 2,0 km ou moins | 76 |
| 5,0 km ou moins | 120 |
| 10,0 km ou moins | 146 |
| plus de 10,0 km | 5 |

Écart maximal : 14,4 km.

**Ce que cela veut dire.** Les points ne sont pas des centres de commune, et le « à environ 2 km près » que l'application affichait n'était porté par rien. La fiche dit maintenant ce qui est établi : le point n'est pas l'adresse, et il peut en être à plusieurs kilomètres. Une petite commune dont le centre est à plus de 10 km du point a sa brasserie à plus de quelques kilomètres de ce point.

## Fiches à plus de 5 km du centre de leur commune

| Fiche | Commune | Écart |
|---|---|---:|
| Les Deux Branches | Maizilly (42) | 14,4 km |
| La Poulette des Ebaudis | Curtafond (01) | 12,6 km |
| La Poule | Neuville-les-Dames (01) | 11,5 km |
| Brasserie de la Sanne | Saint-Romain-de-Surieu (38) | 10,8 km |
| La Grange du Seigneur | Champis (07) | 10,8 km |
| Brasserie Beauseigne | Saint-Just-Malmont (43) | 9,6 km |
| Brasserie Cabule | Le Grand-Serre (26) | 9,1 km |
| L'Etincelle | Belleydoux (01) | 9,1 km |
| Les Bières du Temps | Champier (38) | 8,4 km |
| La Voie Maltée | Saint-Jean-de-Thurigneux (01) | 8,3 km |
| Brasserie des Monts du Lyonnais | Saint-Martin-en-Haut (69) | 7,9 km |
| Brasserie Peteukrane | Saint-Bueil (38) | 7,6 km |
| Mac Never's and Co. | Maillat (01) | 7,4 km |
| Brasserie Kan Mêm | Colombier-le-Jeune (07) | 7,1 km |
| Brasserie Challit | Lentigny (42) | 7,1 km |
| Les Ateliers du Dauphiné | Saint-Bueil (38) | 7,0 km |
| Brasserie des Roches | Chonas-l'Amballan (38) | 7,0 km |
| Brasserie La Couleuvre | Dompierre-les-Ormes (71) | 6,5 km |
| Brasserie Polack | Saint-Bueil (38) | 6,5 km |
| Brasserie de Cluny | Château (71) | 6,2 km |
| La Soyeuse | Rontalon (69) | 6,1 km |
| Brasserie Teddy Beer | Pressy-sous-Dondin (71) | 6,1 km |
| Brasserie du Pilat | Saint-Julien-Molin-Molette (42) | 6,0 km |
| Terre de Possibles | Dompierre-les-Ormes (71) | 6,0 km |
| Domaine du Manchot | Lachassagne (69) | 5,9 km |
| Brasserie Paille | Château (71) | 5,7 km |
| Brasserie des Faux Semblables | La Bâtie-Montgascon (38) | 5,5 km |
| La Mousse du Guiers | Saint-Genix-les-Villages (73) | 5,4 km |
| L'Écume du Guiers | Domessin (73) | 5,4 km |
| La Bière des Loups | Chaussan (69) | 5,3 km |
| Brasserie Haarddrëch | Alboussière (07) | 5,1 km |

## Communes à plusieurs points (25)

Deux fiches d'une même commune n'ont pas le même point : ce ne peut pas être, pour les deux, le centre de la commune.

- Chabeuil (26)
- Chambéry (73)
- Chanaz (73)
- Chanos-Curson (26)
- Chaussan (69)
- Chazelles-sur-Lyon (42)
- Château (71)
- Civrieux-d'Azergues (69)
- Dompierre-les-Ormes (71)
- Grenoble (38)
- Le Mazet-Saint-Voy (43)
- Lyon 1er (69)
- Lyon 2e (69)
- Lyon 7e (69)
- Peyrieu (01)
- Rillieux-la-Pape (69)
- Saint-Alban-Leysse (73)
- Saint-Bueil (38)
- Saint-Forgeux (69)
- Saint-Jean-de-Muzols (07)
- Saint-Étienne (42)
- Sainte-Consorce (69)
- Sassenage (38)
- Valence (26)
- Vénissieux (69)

## Question pour Cédric

D'où viennent les points du fichier du 15/10 ? Si ce sont des positions relevées (carte, souvenir de visite), elles valent peut-être mieux que « approximative », fiche par fiche. Seules les propositions de position (lots S54-S55) les changent, avec ton accord.
