# Personas — Mousse de Poche

Format repris de Sentiers : on suit quelqu'un de précis, on note où il
s'arrête, et on ne compte comme problème que ce qu'on peut montrer dans le
code ou dans un test.

**Ce que ces fiches ne sont pas.** Aucune n'est tirée d'un entretien ou d'un
test utilisateur : il n'y en a pas eu. Les six personnes et leurs objectifs
viennent du cahier des charges de Cédric (15/10/2026). Tout ce qui décrit
leur comportement au-delà de cet objectif est une **hypothèse**, marquée
comme telle.

Chaque fiche porte la date de ses constats. Une fiche non relue après un
sprint qui la concerne ne sert pas à prioriser (leçon de Sentiers, issue
#447).

---

## Cédric — juge S1, puis S3, S4, S6, S12, S14 (plan v2)

Père de famille, week-end avec de jeunes enfants. Veut un lieu où consommer
sur place, avec des horaires d'accueil confirmés, notamment le samedi.

**Critère.** Ne jamais confondre une brasserie qui produit avec un lieu qui
accueille du public.

*Constats du 15/10/2026 (fin de S1).* Voir `docs/SPRINTS.md`, S1, « État
final ». En bref : la catégorie 1 ne dit pas quand le lieu accueille ; 16
des 36 lignes en catégorie 1 ne citent pas le samedi, et l'une est fermée
d'octobre à mai.

## Marie, 28 ans — juge S2, puis S9, S13 (plan v2)

Curieuse, téléphone seul. Cherche « une brasserie sympa près de Lyon », ne
connaît ni IPA ni sour.

**Critère.** Recherche et filtres compréhensibles sans vocabulaire du
milieu ; la liste suffit sans la carte.

*Pas encore de constat.*

## Bernard, 62 ans — juge S7, S17, S20 (plan v2)

Téléphone ancien, 4G parfois faible.

**Critère.** Les fiches déjà chargées restent consultables hors ligne ;
l'interface reste utilisable quand le fond de carte ne l'est pas.

*Pas encore de constat.*

## Karim — juge S5, S16 (plan v2)

Amateur de bière. Filtre par type et veut la page de la bière.

**Critère.** Les types sont justes, leurs liens mènent à la bière, sinon
« non référencé ».

*Pas encore de constat. Fait connu : aucune ligne de `data/breweries.json`
ne porte de type de bière au 15/10 (BACKLOG D5).*

## Léa — juge S8 (plan v2)

Attentive à la vie privée.

**Critère.** Elle sait quand la géolocalisation est utilisée, ce qui reste
local, ce qui passe par le réseau.

*Pas encore de constat.*

## Une brasserie — juge S10, S11, S15 (plan v2)

Veut corriger sa fiche.

**Critère.** Un lien « Signaler une erreur » ouvre une issue GitHub
préremplie, sans backend, sans donnée personnelle dans l'URL.

*Pas encore de constat.*

## Inès — juge S18 *(proposée le 15/10, plan v2)*

Utilise un lecteur d'écran.

**Critère.** Trouver une brasserie, lire sa fiche et appeler, au clavier et
au lecteur d'écran seuls, sans dépendre de la carte.

*Pas encore de constat. Personnage ajouté au plan v2 ; ses besoins sont ceux
de WCAG, pas ceux d'une personne rencontrée.*

## Hugo — juge S19 *(proposé le 15/10, plan v2)*

À vélo, en sortie le week-end, décide en route.

**Critère.** Savoir si c'est ouvert maintenant et lancer l'itinéraire vers la
brasserie, sans que sa position parte ailleurs que dans l'application de
navigation qu'il choisit.

*Pas encore de constat. Personnage ajouté au plan v2, sans entretien.*

## Emma — juge S48 à S50 *(proposée le 17/10, plan v4)*

Visiteuse étrangère, ne lit pas le français ; son téléphone est en anglais.
De passage à Lyon ou en Savoie pour quelques jours.

**Critère.** Trouver une brasserie où acheter ou boire près d'elle, et
comprendre ce qui est vérifié et ce qui ne l'est pas, sans lire le français
— les citations des sources mises à part, qui restent telles quelles.

*Pas encore de constat. Personnage ajouté au plan v4, sans entretien ; ses
besoins sont supposés, pas observés.*
