# Le registre SIRENE contre OpenStreetMap (S244)

Mesuré le 17/10/2026 sur l'API publique de recherche d'entreprises de l'État
(`recherche-entreprises.api.gouv.fr`). La requête porte sur les établissements
actifs au code 11.05Z (« Fabrication de bière »). L'API est publique, sans
compte. Le script de mesure n'est pas versionné : c'est une mesure, pas un
outil (l'outil viendra en S246).

## Les chiffres

| Département | SIRENE (établissements) | Couche OSM | Communs | SIRENE seul | OSM seul |
|---|---:|---:|---:|---:|---:|
| Manche (50) | 22 | 8 | 5 | 17 | 4 |
| Rhône (69) | 64 | 7 ¹ | 13 | 29 | 1 |
| Finistère (29) | 75 | 31 | 45 | 30 | 6 |

¹ La couche OSM du Rhône ne garde que ce qui n'est pas déjà dans
`data/breweries.json` (47 lignes du fichier dans le département). Les 64
établissements SIRENE s'y comparent aux deux à la fois.

Le rapprochement se fait par commune ou par nom. Les noms sont comparés
sans accents et sans les mots génériques (« brasserie », « SARL »…).

## Relu à la main : la Manche

- **SIRENE seul (17)** : 16 entreprises, l'une ayant deux établissements
  (Donville-les-Bains et Jullouville). On y trouve par exemple :
  - Brasserie Pinte de Saire (Saint-Vaast-la-Hougue) ;
  - Brasserie Bifrost (Saint-Lô) ;
  - Brasserie Cotentine (Barneville-Carteret) ;
  - La Moussette (Hauteville-sur-Mer) ;
  - Brasserie de l'Impasse (La Haye) ;
  - La Loupbar (Moyon Villages) ;
  - Brasserie de l'Enclos et Brasserie Léopard (Avranches) ;
  - trois établissements à Cherbourg-en-Cotentin.

  Plusieurs sont tenues par un entrepreneur individuel. Leur nom est celui
  d'une personne : il n'est pas recopié ici.
- **OSM seul (4)** :
  - une cidrerie (Le Clos d'Urville), qui n'a rien à faire là ;
  - trois brasseries absentes de SIRENE sous 11.05Z : Mobsbys (Gathemo),
    The Local Beer (Sainte-Mère-Église), La Renarde qui Brasse (La
    Feuillie). Elles sont sans doute déclarées sous un autre code.
- **Coutances** (la remarque de Cédric) : aucun établissement 11.05Z dans la
  commune elle-même. Il y en a à Hauteville-sur-Mer, La Haye, Moyon
  Villages et Saint-Lô, des communes du même secteur. Les distances et
  l'ouverture au public ne sont pas mesurées ici (CLAUDE.md §5) : c'est le
  travail du pilote Manche–Calvados (S247).

## Les limites (CA2)

- **Une entreprise n'est pas un lieu ouvert** : 11.05Z dit qu'on y
  fabrique de la bière, pas qu'on peut y acheter, ni à quelle heure. Une
  brasserie « nomade », qui brasse chez un autre, a un siège sans cuves.
- **Un code n'est pas exhaustif** : une brasserie peut être déclarée sous un
  autre code, comme le café-brasserie, l'agriculture ou le commerce de
  boissons. Les trois « OSM seul » de la Manche en sont des exemples
  probables.
- **Un établissement n'est pas une brasserie** : une même entreprise peut
  avoir plusieurs adresses (siège et lieu de brassage).
- **Le nom est souvent celui d'une personne** pour un entrepreneur
  individuel. L'enseigne, quand elle existe, est le seul nom à afficher.
- **La position du registre** vient d'un géocodage de l'adresse déclarée.
  Ce n'est pas l'emplacement du lieu, la même limite que S52–S54.

## Recommandation pour S246

1. **SIRENE d'abord, pour trouver** : il voit 2 à 4 fois plus d'établissements
   que la couche OSM dans les trois départements. C'est la meilleure source
   de candidats.
2. **OSM en complément**, pour ce que le code 11.05Z ne voit pas. On en
   retire le bruit : cidreries, bars nommés « brasserie ».
3. **Chaque candidat reste un candidat.** Il ne devient une fiche qu'après
   lecture d'une source publique (site, page, Untappd), avec l'enseigne
   comme nom et une catégorie de vente établie, sinon « À confirmer ». Puis
   l'accord de Cédric, ligne par ligne (CLAUDE.md §0).
4. **L'API est instable depuis le conteneur** (coupures du proxy) :
   l'outil de S246 devra reprendre là où il s'est arrêté, plutôt que tout
   relancer.
