---
name: revue-globale
description: Revue de l'application Mousse de Poche dans son ensemble — déploiement, sécurité, confidentialité, données, cohérence des textes, poids — et non des diffs récents. Une seule fois, en S6.
---

# Revue globale

**Une revue globale n'est pas une revue transversale des diffs** (leçon de
Sentiers). Ce qui se trouve ici porte sur des fichiers qu'aucun sprint n'a
touchés.

## Le passage obligé

### Déploiement — en premier

État des dernières exécutions sur `main`, puis la page publiée elle-même.
Le reste ne vaut rien si `main` est rouge.

### Sécurité

```bash
grep -rn "innerHTML\|dangerouslySetInnerHTML\|eval(\|new Function" src/
npm audit --omit=dev
```

Tout lien qui part dans un `href` vient-il du schéma (`lienSchema`) ?

### Confidentialité

```bash
grep -rn "fetch(\|XMLHttpRequest\|sendBeacon\|navigator.geolocation" src/
```

Pour chaque appel : la position peut-elle s'y trouver ? Et l'interface
dit-elle ce qui reste local ?

### Données

`git log -p -- data/` : chaque changement a-t-il son accord écrit ? Combien
de « À confirmer », et chacun affiche-t-il sa raison ?

### Cohérence des textes

Chercher les formules, pas les fichiers (Sentiers §3) :

```bash
grep -rn "hors ligne\|ne quitte\|local\|aucune donnée" README.md docs/ src/
```

### Les promesses

Lancer une fois l'agent `relecteur-de-promesses` (S284) sur les textes
affichés, les commentaires et la doc : chaque « jamais », « aucun »,
« seul », « parce que » est-il tenu par le code ?

### Les règles jumelles

Lancer une fois l'agent `chasseur-de-jumeaux` (S285) : chaque règle écrite
à deux endroits dit-elle encore la même chose, et qu'est-ce qui les tient
d'accord ?

### Les workflows et la contribution

Lancer les agents des deux angles de revue de `docs/PERSONAS.md` (S288) :
`relecteur-de-workflows` et `contributrice-externe`.

### Personas contre le livré

Relire `docs/PERSONAS.md` contre ce qui a été livré.

### Poids livré

```bash
npm run build && ls -la dist/assets/
```

## La sortie

Les trouvailles réelles, corrigées ou inscrites dans `BACKLOG.md` ; ce qui a
été mesuré sans défaut ; les chiffres du projet.
