# Avant une livraison : la liste à dérouler sur un vrai téléphone (S279)

Ce que les tests automatiques ne peuvent pas constater : ils tournent dans
un Chromium émulé, sans fenêtre système, sans appli tierce, sans vrai GPS.
Un quart d'heure, sur un Android (Chrome) et un iPhone (Safari), sur la
page publiée : https://opaland.github.io/Brewery-map/

Repris de Sentiers (`docs/RELEASE.md`). Le lecteur d'écran a son propre
protocole (S96). Chaque ligne cite le code concerné ; un fichier renommé
fait échouer la porte (`tests/unit/livraison.test.ts`).

## Les gestes

| # | Geste | Ce qu'on doit voir | Pourquoi l'émulation ne le prouve pas | Code |
|---|---|---|---|---|
| 1 | Ouvrir la page, attendre la liste, puis passer en mode avion et recharger | La liste revient ; le bandeau dit que les fiches restent consultables | `context.setOffline` ne coupe pas les requêtes du service worker (CLAUDE.md §1) | `public/sw.js` |
| 2 | Chrome Android : toucher le bouton « Installer l'application » s'il est là (sinon, déplier « Installer l'application » et suivre la consigne) ; iPhone : Partager, puis « Sur l'écran d'accueil » | L'icône Mousse de Poche apparaît ; ouverte, la page n'a pas de barre d'adresse ; déjà installée, le bloc ne s'affiche plus | Le bouton n'existe que si le navigateur a proposé l'installation (`beforeinstallprompt`), ce qu'il ne fait pas dans les tests | `src/Installer.tsx` |
| 3 | Android : appui long sur l'icône installée, puis « Autour de moi » | L'application s'ouvre et demande la position, une seule fois | Les raccourcis de l'icône n'existent que sur un écran d'accueil réel | `public/manifest.webmanifest` |
| 4 | Toucher « Autour de moi », permission réglée sur « Demander à chaque fois » | La fenêtre de permission ne vient qu'au toucher, jamais à l'ouverture ; les distances suivent | La permission est accordée d'office dans les tests ; la fenêtre système n'existe pas | `src/PointDeDepart.tsx` |
| 5 | « Autour de moi » à l'intérieur, GPS lent ou position approximative (Android) | Le bouton dit « Localisation… », puis la précision est annoncée si elle est grossière | Le GPS des tests répond tout de suite, avec la précision qu'on lui donne | `src/localisation.ts` |
| 6 | Toucher un bouton et une ligne de la liste (iPhone surtout) | Le bouton s'enfonce au toucher | Safari d'iPhone n'applique `:active` que si la page écoute les touchers ; non reproduit par WebKit de bureau | `src/main.tsx` |
| 7 | Ouvrir la carte, pincer pour zoomer, toucher un point | La carte suit les doigts ; un point touché montre l'aperçu dans la carte | Les tests cliquent ; le pincement à deux doigts n'est pas émulé | `src/Carte.tsx` |
| 8 | Dans une fiche, « Y aller » : sur iPhone, « Plans (Apple) », Google Maps, Waze ; sur Android, Google Maps, Waze, « Autre application » | L'appli s'ouvre sur la brasserie, sans votre position dans le lien ; « Autre application » propose les applis de cartes du téléphone | Les tests lisent le lien ; ils n'ouvrent pas d'appli de guidage | `src/core/itineraire.ts` |
| 9 | Dans une fiche, « Partager » | La feuille de partage du téléphone s'ouvre avec le lien de la fiche | Les tests retirent `navigator.share` et vérifient la copie du lien : la feuille système n'existe pas en test | `src/Liste.tsx` |
| 10 | Ajouter deux favoris, déplier « Plus de filtres et mes favoris » jusqu'à « Ma tournée : », toucher « Partager en image » | L'image de la tournée part dans la feuille de partage, avec les applis du téléphone | Les tests simulent `navigator.share` (appel, repli, refus) ; la feuille système et ses applis n'existent pas en test | `src/ImageTournee.tsx` |
| 11 | « Enregistrer une sauvegarde », puis « Ouvrir une sauvegarde » sur ce fichier | Le fichier est enregistré dans Téléchargements (ou Fichiers) ; ouvert, favoris, visites et notes reviennent | Le sélecteur de fichier du téléphone n'est pas celui des tests | `src/Sauvegarde.tsx` |
| 12 | Dans une fiche, « Imprimer une affichette avec QR code » | L'aperçu d'impression montre l'affichette et son QR code, seuls | L'impression système n'est pas lancée dans les tests | `src/Affichette.tsx` |
| 13 | Firefox (Android), ajouter un favori, une visite ou une note | À constater : une éventuelle demande du navigateur de garder les données vient après ce geste, jamais à l'ouverture ni sur un réglage | Les tests remplacent `navigator.storage.persist` par un espion : ce que chaque navigateur montre n'y est pas | `src/core/persistance.ts` |
| 14 | Passer le téléphone en thème sombre, puis en anglais | La page suit le thème ; l'interface passe en anglais, les fiches restent citées en français | Les tests posent ces réglages par l'émulation, pas par ceux du téléphone | `src/i18n.ts` |
| 15 | Texte du téléphone au plus grand | Rien ne se chevauche ; la première brasserie reste atteignable | Les tests doublent la taille du texte de la page (`audit.spec.ts`) ; le réglage du système passe par d'autres chemins (Android : échelle des polices ; iPhone : Dynamic Type) | `tests/e2e/audit.spec.ts` |
| 16 | Après une nouvelle publication, rouvrir l'application déjà ouverte au moins une fois | Le bandeau « Une nouvelle version de Mousse de Poche est prête. » propose « Recharger » ; jamais à la première visite | La mise à jour du service worker installé se joue entre deux ouvertures réelles | `src/MiseAJour.tsx` |

## Les essais

Une ligne par téléphone et par essai : la date, l'appareil et son
navigateur, la version publiée (la première ligne de « Quoi de neuf ? »,
en bas de page), et les numéros
qui n'ont pas donné ce qu'on doit voir, avec ce qu'on a vu.

| Date | Téléphone, navigateur | Version | Écarts |
|---|---|---|---|
| — | Pas encore déroulée (S279 : preuve humaine, Cédric) | — | — |
