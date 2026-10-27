# Faire connaître Mousse de Poche

Demande de Cédric du 16/10 : « comment marketer l'appli ? la rendre sexy ;
quelle politique marketing ? ». Ce plan suit les règles du projet : pas de
traceur, pas de compte, pas de donnée inventée. On ne mesurera donc pas les
visites ; on mesurera ce qui se voit sans espionner (voir « Mesurer »).

## 1. Ce qu'on vend, en une phrase

> **« Avant de faire 20 km : savoir si on peut y boire une bière. »**

Toutes les cartes de brasseries disent où elles sont. Aucune ne dit
honnêtement si l'on peut y **acheter**, y **boire sur place**, ou si **on ne
sait pas**. C'est la promesse, et elle tient parce que chaque fiche cite sa
source. L'honnêteté est l'argument, pas une contrainte.

Les trois preuves à montrer partout :
1. **Toute la France** en un geste : 490 fiches vérifiées et 803 brasseries
   repérées sur OpenStreetMap.
2. **Zéro compte, zéro pub, zéro traceur** ; la position reste dans le
   téléphone.
3. **Marche sans réseau** à la campagne, là où sont les brasseries.

## 2. Pour qui, d'abord

| Public | Où il est | Ce qui le décide |
|---|---|---|
| Amateurs de bière artisanale | groupes Facebook régionaux de bière, Reddit, Untappd | les fiches justes, la carte de France |
| Cyclistes et randonneurs | clubs, Strava, forums vélo, offices de tourisme | « ouvert maintenant », hors ligne, « Y aller » |
| Les brasseries elles-mêmes | leur boutique, leur compte Instagram | une fiche juste qui leur amène du monde |
| Les offices de tourisme | sites et brochures « route des brasseurs » | un outil gratuit, sans pub, à recommander |

**Le levier le plus fort : les brasseries.** Une brasserie dont la fiche est
juste a intérêt à la partager. Chacune qui le fait apporte ses clients.

## 3. Le plan, dans l'ordre

### Semaine 1 — la vitrine
- **Le post LinkedIn** (`docs/LINKEDIN.md`) avec le GIF : raconter la
  méthode (« construite par sprints avec Claude Code, relue par des
  personas »). C'est l'histoire qui intéresse un réseau pro, plus que la
  bière.
- **Une image de partage** (Open Graph) : sans elle, un lien collé dans
  WhatsApp ou LinkedIn s'affiche nu. À faire dans S28.
- **Un lien par fiche**, à partager (« Regarde, on peut y boire sur
  place ») : chaque partage devient une publicité. À faire dans S27/S28.

### Semaines 2 à 4 — les communautés
- **Reddit** : les communautés françaises et celles de la bière (à repérer,
  et à lire leurs règles avant de poster), et r/selfhosted pour l'angle
  « sans serveur ni traceur ».
- **Groupes Facebook** de bière par région : un message par région, avec la
  carte de *leur* région en capture, pas un message générique.
- **OpenStreetMap France** (forum, liste de diffusion) : l'application
  montre leurs données et renvoie vers OSM pour corriger. C'est une
  communauté qui aime qu'on utilise et qu'on enrichisse ses données.
- **Hacker News « Show HN »**, en anglais, sur l'angle technique : une PWA
  sans serveur, honnête sur ses données, construite par agents.

### Mois 2 — les brasseries
- **Une lettre type** (courriel ou message Instagram) à chaque brasserie
  vérifiée : « Votre fiche est en ligne, voici ce qu'elle dit et sa source ;
  une erreur ? un clic pour la corriger. » La fiche juste est le cadeau.
- **Un QR code imprimable** par brasserie (« Retrouvez-nous sur Mousse de
  Poche »), pour le comptoir. À fabriquer depuis le lien par fiche.
- **Les offices de tourisme** des 43 départements vérifiés : leur proposer
  l'outil pour leurs pages « route de la bière ».

### Ensuite — l'événement
- **La Moisson des Brasseurs** (portes ouvertes de Brasseurs de France,
  vues dans la veille concurrentielle ; date à vérifier) : une sélection
  « ouvertes ce week-end » à partager.
- **Les nouveautés du mois** (issue #49) : un rendez-vous mensuel, à poster
  dans les mêmes groupes.

## 4. La rendre « sexy »

Ce qui fait l'effet « wow » des applications qu'on voit passer, et ce qu'on
en prend (S28) :

| Ce qui frappe | Ce qu'on fait ici |
|---|---|
| Une identité forte : couleur, typographie, logo | Une palette « houblon et cuivre », une typographie à caractère pour les titres, une icône redessinée |
| La carte en grand, en premier | Sur téléphone, la carte en haut et la liste glissée dessous (motif « bottom sheet ») |
| Des cartes de fiches visuelles | Badge coloré clair, distance en grand, actions en boutons |
| Du mouvement doux | Transitions courtes, et rien si « moins d'animations » est demandé |
| Une première minute guidée | Un écran d'accueil d'une phrase : « Autour de moi » ou « Une commune » |

Ce qu'on ne fait pas, même si c'est « sexy » : des notes et étoiles
inventées, des photos sans droits, un compte, un classement de popularité.

## 5. Mesurer, sans traceur

- **Étoiles et issues GitHub**, signalements reçus : la communauté qui
  s'implique.
- **Réactions et partages** des posts (LinkedIn, Reddit) : comptés à la
  main, une fois par semaine.
- **Brasseries qui partagent leur fiche** : comptées à la main.
- **Corrections OSM** liées à l'application : visibles dans l'historique
  OSM des objets.

Un compteur de visites respectueux (sans cookie, comme GoatCounter) serait
techniquement possible, mais il **contredit la promesse « zéro traceur »**
écrite partout. C'est à Cédric de décider ; la recommandation est de s'en
passer.

## 6. Ce qui attend Cédric

- Publier le post LinkedIn, s'il le veut.
- Choisir une adresse de contact pour les brasseries (issue #38) : sans
  elle, la lettre type n'a pas de « répondre à ».
- Dire si un compteur de visites sans cookie est acceptable.
