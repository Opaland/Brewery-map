# Les données — ce que chaque champ veut dire

Source : `data/breweries.json`, fourni par Cédric le 15/10/2026 (166 lignes).
Schéma : `src/core/schema.ts` ; le build échoue sur une ligne invalide.
**Aucune ligne ne change sans l'accord écrit de Cédric** (CLAUDE.md §0).

## Catégorie de vente (`cat`)

| Code | Libellé | Sens |
|---|---|---|
| 1 | Acheter et consommer sur place | une source cite la vente **et** la consommation sur place |
| 2 | Acheter seulement | une source cite la vente, sans bar ni dégustation ouverte |
| 4 | Consommer sur place seulement | une source cite la consommation sur place **et** dit qu'on ne vend pas à emporter (demande de Cédric du 28/10, S368) |
| 3 | Pas de vente | une source dit que rien n'est vendu sur place |
| 0 | À confirmer | rien n'est établi ; la raison est dans `note` |

Une catégorie 1 à 4 exige une source (`src` non vide) : le schéma le vérifie.

## Confiance (`conf`)

Qualité de la preuve, **pas une probabilité**. Le fichier dit `solide`,
`moyenne`, `faible` ; depuis S320 (Cédric, 20/10), la fiche ne nomme plus
le niveau et le dit en une phrase (`phraseConfiance`, `src/core/fiche.ts`).

| Valeur | Sens | Phrase de la fiche |
|---|---|---|
| `solide` | la source décrit précisément ce qu'on peut faire sur place | « La source décrit précisément ce qu’on peut faire sur place. » |
| `moyenne` | la source cite la vente ou l'accueil, avec des réserves ou des manques | « La source cite la vente ou l’accueil, avec des réserves ou des manques. » |
| `faible` | catégorie déduite, probable, ou tirée d'une source ancienne ou indirecte | « Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller. » (sans « appelez » si aucun numéro n'est connu) |
| *(vide)* | catégorie 0 uniquement : aucune preuve retenue | « Rien n’établit encore ce qu’on peut y faire. » |

**Les horaires d'une saison (S299).** Un bloc d'horaires peut porter une
`periode` `{ "du": "MM-JJ", "au": "MM-JJ" }`, bornes comprises. Elle peut
passer le 1er janvier (`"10-01"` → `"03-31"`). Sans `periode`, le bloc vaut
toute l'année.

- Deux blocs de même nature ne sont admis que s'ils ont chacun une période,
  et que leurs périodes ne se chevauchent pas : un bloc d'été et un bloc
  d'hiver.
- Hors de toute période publiée, la fiche ne dit ni « ouvert » ni
  « fermé » : la source ne publie pas d'horaires pour ce moment de l'année.

**La confiance porte sur la catégorie, jamais sur les horaires.** La fiche
le dit sous des horaires (« Les horaires ne sont pas garantis… »). La première définition (15/10) disait « avec
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

| Valeur | Affiché | Lignes au 15/10 | Lignes au 18/10 (après S271) |
|---|---|---:|---:|
| `commune` | approximative : ce point n’est pas l’adresse de la brasserie, et peut en être à plusieurs kilomètres. C'est le point d'origine du fichier, généré par une IA (Cédric, 18/10), et non un centre de commune (S59, `docs/PRECISION.md`) | 166 | 13 (sans centre IGN trouvé) |
| `centre` | au centre de la commune selon l’IGN : ce n’est pas l’adresse de la brasserie (S268, décision de Cédric du 18/10) | 0 | 227 |
| `address` | à l'adresse vérifiée : géocodée par la Géoplateforme de l'IGN, dont la requête est une des sources (S52) | 0 | 118 |
| `osm` | point placé sur OpenStreetMap, non vérifié sur place | 0 | 0 (couche à part) |

La carte s'arrête au zoom 14 pour ne pas faire croire à une adresse exacte.

## Types de bière lus sur Untappd

Le style affiché par Untappd décide du type, jamais le nom de la bière
(`typeDuStyleUntappd`, `src/core/bieres.ts`, revue adverse S53). Un style
sans règle tombe en « autre », et son libellé recopie le style.

## Date de vérification (`verifieLe`, facultative)

Absente des 166 lignes fournies le 15/10 ; depuis S266, remplie sur 20
fiches par les accords de Cédric. Absente, la fiche dit « non renseignée ».
Remplie par la curation, jamais devinée.

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
- Absent : la fiche le dit une fois, en tête, avec le reste de ce qui
  manque (« Pas encore connus : son adresse, son téléphone… », S308).
