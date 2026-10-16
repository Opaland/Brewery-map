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

| Valeur | Affiché | Sens — *définition proposée, à valider par Cédric* |
|---|---|---|
| `solide` | élevée | la source décrit précisément ce qu'on peut faire sur place |
| `moyenne` | moyenne | la source cite la vente ou l'accueil, avec des réserves ou des manques |
| `faible` | faible | catégorie déduite, probable, ou tirée d'une source ancienne ou indirecte |
| *(vide)* | non évaluée | catégorie 0 uniquement : aucune preuve retenue |

**La confiance porte sur la catégorie, jamais sur les horaires.** La fiche
le dit sous chaque confiance. La première définition (15/10) disait « avec
des horaires » pour `solide` ; la revue métier de S3 a trouvé cinq lignes
`solide` qui le démentent (L'Ours qui brasse « heures non précisées », Pleine
Lune « horaires non publiés », Les Bières du Temps, Chambaran, Archimalt).
Elle a été corrigée le jour même.

La définition est tirée de la lecture des textes `note` ; elle n'a pas été
donnée par l'auteur du fichier.

## Justification (`note`)

Un texte, **pas une note chiffrée**. Affiché en entier sous le titre « Ce que
dit la source » (décision de Cédric, 15/10), ou « Pourquoi » en catégorie 0.
Aucune note chiffrée n'est affichée tant qu'aucune n'a d'origine identifiable.

## Précision des coordonnées (`coordPrecision`)

| Valeur | Affiché | Nombre de lignes au 15/10 |
|---|---|---:|
| `commune` | approximative : centre de la commune, à environ 2 km près | 166 |
| `address` | à l'adresse vérifiée | 0 |
| `osm` | point placé sur OpenStreetMap, non vérifié sur place | 0 (fiches découvertes en S14, si Cédric les accepte) |

La carte s'arrête au zoom 14 pour ne pas faire croire à une adresse exacte.

## Date de vérification (`verifieLe`, facultative)

Absente des 166 lignes : la fiche dit « non renseignée ». Remplie par la
curation, jamais devinée.

**Ce qu'elle couvre** (décidé en S11, revue métier) : ce qui n'a pas de date
à soi — la catégorie, la confiance, la note, la source, l'adresse, les
bières. Le `contact` et chaque bloc d'`horaires` portent leur propre
`verifieLe` : une proposition qui ne change qu'eux ne change pas celle de la
fiche (`appliquerLot`, `src/core/curation.ts`).

## Distance (`km`)

Présente dans le fichier, **jamais lue** : l'application calcule la sienne
(décision de Cédric, 15/10 ; BACKLOG D6).

## Contact (`contact`, facultatif — S4)

```json
"contact": {
  "tel": "04 72 50 88 53",
  "site": "https://…",
  "untappd": "https://untappd.com/…",
  "source": "https://… (la page où tout cela a été lu)",
  "verifieLe": "2026-10-15"
}
```

- `source` et `verifieLe` sont **obligatoires** : un numéro sans origine ne
  passe pas le schéma.
- `tel` : numéro français écrit en paires ; la fiche en fait un bouton
  « Appeler » (`tel:+33…`). Seul un numéro que la brasserie publie pour ses
  clients y entre ; quand une page en affiche plusieurs, on retient celui du
  lieu d'accueil et on le dit.
- `untappd` : une page d'untappd.com, rien d'autre. On lie, on ne recopie ni
  notes ni avis.
- Absent : la fiche dit « Téléphone : non renseigné. »
