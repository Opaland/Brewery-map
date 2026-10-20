# Design system — « cuivre et houblon » (v2, S28)

Demande de Cédric du 16/10 : « changement de design system », « la rendre
sexy ». Ce fichier dit les choix. Le code fait foi : `src/index.css`,
section « Design system v2 ».

## Intention

Un bistrot cuivré plutôt qu'un formulaire. Chaleureux sans être criard, et
lisible à vélo, en plein soleil. La marque est le cuivre ; les quatre
catégories de vente gardent leurs couleurs et leurs contrastes, mesurés
depuis S18.

## Jetons

| Jeton | Clair | Sombre | Usage |
|---|---|---|---|
| `--papier` | `#fbf6ee` | `#15110d` | fond de page |
| `--blanc-carte` | `#fffdf9` | `#1f1a15` | cartes, champs |
| `--encre` | `#241c14` | `#f3ece2` | texte |
| `--encre-douce` | `#5f5447` | `#c4b8a7` | texte secondaire (6,86:1 et 9,63:1) |
| `--cuivre` | `#9c4a17` | `#e38a4c` | marque, bouton principal, sélection |
| `--cuivre-vif` | `#c0652a` | `#f0a066` | anneau de focus |
| `--cuivre-pale` | `#f6e6d6` | `#3a2617` | fonds de sélection, distance |
| `--bord-champ` | `#8c7d6b` | `#8a7d6d` | bord des champs (3:1 au moins) |
| `--rayon-md` / `--rayon-lg` | 12 px / 18 px | | champs / cartes |
| `--ombre`, `--ombre-forte` | | | cartes au repos / ouvertes |

- **En-tête** : dégradé `#7a3410` → `#9c4a17`, texte blanc (9,03:1 et 6,17:1),
  focus blanc.
- **Typographie** : Fraunces pour les titres, les noms de brasseries et le
  compte ; Inter pour le reste. Les deux sont hébergées par l'application
  (OFL), sous-ensemble latin seulement, soit environ 85 Ko.

## Composants

- **Bouton principal** (« Autour de moi », la tournée) : pilule pleine
  cuivre. **Secondaire** : pilule à bord.
- **Ligne de liste** : carte arrondie, bande de 6 px à la couleur de sa
  catégorie. « À confirmer » est rayé : son orange se confond avec le cuivre
  (1,11:1), il faut donc un second indice que la couleur (WCAG 1.4.1).
- **Fiche** : continue la ligne ouverte, bord cuivre, apparition de 180 ms,
  sans animation si l'on demande moins de mouvement.
- **Catégories** : des puces en grille de deux colonnes ; ce sont toujours de
  vraies cases à cocher.
- **Compte** : une barre collée au bas de l'écran. Sous 700 px de hauteur,
  elle reste collée, plus fine et sur une ligne (revue adverse S28) ; plus
  haute qu'un quart de l'écran (texte agrandi), elle se décolle (S304).

## Ce qui ne change pas

Les cibles de 44 px, les contrastes mesurés par
`tests/e2e/accessibilite.spec.ts`, l'ordre de lecture, et aucune ressource
tierce (CSP).
