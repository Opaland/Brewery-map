# Faire une application « qui claque » avec Claude — ce que ce projet apprend

Question de Cédric, le 16/10 : « il y a de superbes applications
vibe-codées avec Claude, et moi je fais une appli très basique. Comment
apprendre ? Comment avoir moi aussi une appli sexy, top fonctionnelle, qui
fait des likes ? »

## 1. D'abord, ce que Mousse de Poche a déjà, et que les belles démos n'ont pas

Les applications qui impressionnent en vidéo sont souvent des **façades** :
données inventées, pas de tests, rien hors ligne, une seule taille d'écran.
Mousse de Poche, elle :

- dit la vérité sur chaque fiche, avec sa source ;
- passe plus de 100 tests e2e et 250 tests unitaires à chaque modification ;
- marche sans réseau ;
- est accessible : axe sans violation, cibles de 44 px, clavier ;
- obtenait un score Lighthouse mobile de 100, mesuré en S20.

**Ce qui manque n'est pas la fonction, c'est la vitrine.** C'est la partie
la plus facile à rattraper, et S28 s'y attaque.

## 2. Pourquoi les autres ont l'air plus « sexy »

1. **Une direction artistique décidée avant le code** : une palette, une
   typographie, des formes, une ambiance (« bistrot cuivré », « carte de
   randonnée »…). Ici, l'interface a été construite pour être juste, avec
   des couleurs neutres : propre, mais sans caractère.
2. **Le visuel d'abord** : la carte en grand, des images, une hiérarchie
   forte. Ici, la page commence par des formulaires.
3. **Du mouvement** : transitions, glissés, retours au toucher.
4. **Une première minute soignée** : un écran d'accueil, un geste, un
   résultat.
5. **Une bonne capture** : une seule image ou un GIF de 10 s, pensé pour le
   fil d'actualité.

## 3. Comment travailler avec Claude pour y arriver

**a. Donner des références, pas des adjectifs.** « Rends-la sexy » donne du
générique. Mieux : trois captures d'applications que vous aimez (Mobbin,
Dribbble, l'App Store), et la phrase « je veux cette ambiance-là, pour une
carte de brasseries ».

**b. Le design system en premier, le code ensuite.** Demander d'abord une
page de tokens (couleurs, typographie, espacements, rayons, ombres), en
clair et en sombre. La valider sur une seule capture. Puis l'appliquer
partout. C'est ce que fait S28.

**c. Itérer sur des captures.** Après chaque changement : capture
téléphone et ordinateur (`outils/captures.ts`), et la question « qu'est-ce
qui fait amateur sur cette image ? ». Claude voit les images ; c'est la
boucle la plus efficace.

**d. Une persona « designer exigeante »** à côté de Marie, Hugo et Inès,
pour juger le visuel comme les autres jugent l'usage.

**e. Garder les garde-fous.** Le beau ne doit casser ni l'accessibilité ni
la vérité des données : les tests d'axe et de contraste de ce dépôt
s'appliquent au nouveau design aussi.

## 4. Pour apprendre, concrètement

- **Lire** le code et les revues de ce dépôt (`docs/SPRINTS.md`) : chaque
  sprint montre une demande, une revue qui trouve des défauts, leur
  correction. C'est un cours complet de développement assisté.
- **Refaire un petit projet seul**, avec la même méthode : CLAUDE.md, des
  personas, des tests vus rouges, une revue adverse. Une méthode s'apprend
  en la refaisant.
- **Regarder des applications primées** (Apple Design Awards, Webby Awards)
  et noter pour chacune ce qui frappe dans la première seconde.
- **Publier tôt** une capture ou un GIF : les « likes » viennent d'une image
  claire et d'une histoire (« construite en deux jours, les 15 et 16/10, avec une équipe
  d'agents »), plus que de la fonction.

## 5. La politique marketing

Voir `docs/MARKETING.md`.
