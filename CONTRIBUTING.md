# Contribuer à Mousse de Poche

Merci de prendre le temps. Le dépôt est tenu par son mainteneur
(@Opaland), qui décide de ce qui entre ; voici ce qui aide, et ce qui sera
refusé.

## Une erreur sur une fiche

Dans l'application, ouvrez la fiche puis « Signaler une erreur sur cette
fiche » : une issue s'ouvre, préremplie avec la fiche telle qu'affichée.
Ajoutez **une source** (le site de la brasserie, une page officielle, une
photo d'affiche) : sans source, rien ne change.

Ne proposez pas de modifier `data/breweries.json` dans une PR : aucune
ligne n'y entre sans l'accord écrit du mainteneur, et la CI refuse une
modification sans cet accord (`outils/garde-donnees.ts`, accords dans
`curation/accords/`). Une PR qui touche `data/` sera rouge pour cette
raison, pas pour votre code.

## Une brasserie manquante

Dans l'application, en bas de page : « Une brasserie manque ? » puis
« La signaler ». Une issue s'ouvre, préremplie ; remplissez son nom, sa
commune, ce qu'on peut y faire (acheter, boire sur place, quels jours) et
**une source** qui le montre : le site de la brasserie ou une page
officielle. Un annuaire seul, un article seul ou un réseau social seul ne
suffisent pas (méthode du 19/10, `docs/DECISIONS.md`) ; un office de
tourisme vaut une confiance moyenne au plus. Comme pour une erreur, il faut
un compte GitHub, l'issue est publique, et le mainteneur décide.

## Une correction de code


1. Node 22 (`.nvmrc`), puis :

   ```bash
   # bash ; sous PowerShell, voir « Sous Windows » plus bas
   npm ci
   npm run lint && npx tsc -b --noEmit && npx vitest run
   npm run build                 # les e2e servent dist/ : rebuild après chaque changement
   npx playwright install chromium
   npx playwright test
   ```

   `npx tsc --noEmit` ne vérifie rien ici (références de projet) : c'est
   `tsc -b`. La garde de `data/` (`npx tsx outils/garde-donnees.ts`) relit
   l'historique : il faut un clone complet, pas `--depth 1` ; le test
   des chiffres écrits (`tests/unit/chiffres-ecrits.test.ts`) aussi. Ce test
   tient les nombres de la doc : fiches et départements du README, de
   `docs/ETAT.md` et de `docs/MARKETING.md`, le dernier sprint cité par
   `docs/ETAT.md` (« S1 → Sn », contre `docs/SPRINTS.md`), et la phrase de
   « Quoi de neuf » ; son message dit quoi écrire et où. De même, `tests/unit/jumeaux.test.ts` tient
   les constantes que la doc répète (tuiles, délais, zoom, délai du crochet,
   version de Node) : une valeur changée d'un côté se change de l'autre. La porte
   complète prend quelques minutes (`docs/PORTE.md`) ; `npm run porte` la
   lance d'un coup, sous Linux, macOS et Windows.
2. Un problème de code se décrit d'abord dans une issue (constat, scénario
   reproductible, impact attendu), avec le gabarit ci-dessous. Le correctif part d'une branche issue de
   `main` à jour, ne traite qu'un sujet, et sa PR dit `Closes #n`.
   Jamais de commit direct sur `main` (`AGENTS.md` §12).
3. Ouvrez une PR. La CI relance la même porte, plus `npm audit` sur ce que
   la page embarque (une faille haute publiée entre-temps peut la rougir
   sans rapport avec votre PR : le dire suffit).

### Sous Windows (PowerShell)

PowerShell 5.1 refuse `&&` et `VAR=valeur commande` : un pas par ligne.
Clonez sans conversion des fins de ligne (le dépôt est en LF, et les
empreintes de `data/` en dépendent) :

```powershell
git clone -c core.autocrlf=false https://github.com/Opaland/Brewery-map.git
cd Brewery-map
npm ci
npx playwright install chromium
npm run porte
```

Une variable d'environnement s'écrit `$env:NOM = "valeur"`, sur sa propre
ligne, avant la commande. `PW_CHROMIUM_PATH` est inutile : il ne sert que
dans le conteneur cloud.

### Le gabarit d'une issue de code

À copier dans une issue neuve (le dépôt n'a pas de gabarits GitHub : ils
détourneraient les signalements préremplis de l'application,
`docs/stories/S361.md`) :

```markdown
## Constat
Ce qui se passe, et où (écran, fichier, commande).

## Scénario reproductible
1. …
2. …
Navigateur, appareil, largeur d'écran si ça compte.

## Impact attendu
Ce qui devrait se passer, et pour qui.
```

## Ce qui sera refusé

- **Une requête qui emporte la position** de la personne (tuiles, liens,
  issue préremplie) : elle ne quitte jamais le navigateur.
- **Une donnée inventée** : catégorie, horaire, type de bière, lien, chiffre.
  Ce qui n'est pas établi s'affiche « À confirmer », avec sa raison.
- **Un test qu'on n'a pas vu échouer** sans le correctif.

Les règles complètes, et d'où elles viennent : [`AGENTS.md`](AGENTS.md).
