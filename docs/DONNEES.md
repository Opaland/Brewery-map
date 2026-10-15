# Les données — ce que chaque champ veut dire

Source : `data/breweries.json`, fourni par Cédric le 15/10/2026 (166 lignes).
Schéma : `src/core/schema.ts` ; le build échoue sur une ligne invalide.
**Aucune ligne ne change sans l'accord écrit de Cédric** (CLAUDE.md §0).

## Catégorie de vente (`cat`)

| Code | Libellé | Sens |
|---|---|---|
| 1 | Acheter et consommer sur place | une source cite la vente **et** la consommation sur place |
| 2 | Acheter seulement | une source cite la vente, sans bar ni dégustation ouverte |
| 3 | Pas de vente | une source dit que rien n'est vendu sur place |
| 0 | À confirmer | rien n'est établi ; la raison est dans `note` |

Une catégorie 1 à 3 exige une source (`src` non vide) : le schéma le vérifie.

## Confiance (`conf`)

Qualité de la preuve, **pas une probabilité**. Le fichier dit `solide`,
l'interface dit « élevée » (décision de Cédric, 15/10).

| Valeur | Affiché | Sens — *définition proposée le 15/10, à valider par Cédric* |
|---|---|---|
| `solide` | élevée | une source qui décrit directement le lieu (site de la brasserie, office de tourisme) dit ce qu'on peut y faire, avec des horaires |
| `moyenne` | moyenne | une source cite la vente ou l'accueil sans tout préciser (horaires partiels, source secondaire) |
| `faible` | faible | catégorie déduite, ou source ancienne ou indirecte : à vérifier avant de se déplacer |
| *(vide)* | non évaluée | catégorie 0 uniquement : aucune preuve retenue |

La définition est tirée de la lecture des textes `note` du fichier : les
lignes `faible` disent « déduite » ou « non vérifiée », les lignes `solide`
citent des horaires. Elle n'a pas été donnée par l'auteur du fichier.

## Justification (`note`)

Un texte, **pas une note chiffrée**. Affiché en entier sous le titre « Ce que
dit la source » (décision de Cédric, 15/10), ou « Pourquoi » en catégorie 0.
Aucune note chiffrée n'est affichée tant qu'aucune n'a d'origine identifiable.

## Précision des coordonnées (`coordPrecision`)

| Valeur | Affiché | Nombre de lignes au 15/10 |
|---|---|---:|
| `commune` | approximative : centre de la commune, à environ 2 km près | 166 |
| `address` | à l'adresse vérifiée | 0 |

La carte s'arrête au zoom 14 pour ne pas faire croire à une adresse exacte.

## Date de vérification (`verifieLe`, facultative)

Absente des 166 lignes : la fiche dit « non renseignée ». Remplie par la
curation, jamais devinée.

## Distance (`km`)

Présente dans le fichier, **jamais lue** : l'application calcule la sienne
(décision de Cédric, 15/10 ; BACKLOG D6).
