# Étude : ce que Mousse de Poche peut reprendre de Netatmo

Demande de Cédric du 10/11 : « lis bien le mode de fonctionnement, … la gestion de sa CI, la
gestion de ses data, etc. Vois s'il y a des choses que tu pourrais t'inspirer pour améliorer le
sujet … Regarde si on ne peut pas mettre du Claude dedans … S'il y a peut-être des variables
d'environnement à installer … me dire si c'est des choses qu'il faut renseigner ou pas ».

Dépôt lu : `Opaland/Netatmo` (commit `86f4723`, 10/11), en entier, en lecture seule. Ce document
**propose** ; rien n'est construit avant ton go, idée par idée (une story chacune, `/preparer-story`).

## En une minute

- Les deux dépôts se copient déjà : le crochet de commit de Netatmo et deux de ses tests disent
  « modèle : Mousse de Poche ». Côté outillage des agents (skills, personas, permissions), on est
  en avance. **Netatmo est en avance sur trois choses** : sa CI prévient toute seule (une issue
  qui s'ouvre et se referme), il balaie tous ses écrans à la recherche de « NaN » ou
  « undefined », et il fait écrire un texte par Claude **sans le laisser inventer un chiffre**.
- **Une seule chose est à renseigner, et elle est facultative** : une clé `ANTHROPIC_API_KEY`
  (payante) en secret du dépôt, pour les idées 3 et 4 ci-dessous. Tout le reste tourne avec ce
  que GitHub donne déjà. Aucune variable d'environnement n'est nécessaire sur ton poste.
- **Une décision à reprendre** : le 25/10, tu as fait arrêter les workflows de nuit. Plusieurs
  idées ont plus de valeur si quelque chose tourne seul une fois par mois (pas chaque nuit).

## Ce qu'il faudrait renseigner

| Quoi | Où | Pour quelles idées | Obligatoire ? |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | créer la clé sur console.anthropic.com, puis GitHub → Settings → Secrets and variables → Actions → New repository secret | 3 (veille par Claude en CI), 4 (texte du mois) | **non** : sans elle, ces deux workflows s'arrêtent avec un message clair, le reste marche |
| Plafond de dépense | console.anthropic.com → Limits | 3, 4 | conseillé si la clé est créée |
| Rien d'autre | — | toutes les autres idées n'utilisent que `GITHUB_TOKEN`, fourni par GitHub | — |

Pourquoi pas de clé dans le site lui-même : la page est statique (GitHub Pages) ; une clé dans
le JavaScript serait lisible par tous. Netatmo fait pareil : Claude n'est appelé **que** depuis
GitHub Actions, et son texte est enregistré dans le dépôt, puis affiché (`collector/insights.py`,
`.github/workflows/collect.yml:131`).

## Les idées, de la plus utile à la moins utile

### 1. Une issue qui s'ouvre et se referme toute seule quand un contrôle sans surveillance échoue — petit

- **Netatmo** : `collect.yml:158-183`, `sources.yml:30-54`. Une issue par sujet, commentée à
  chaque nouvel échec, refermée au premier passage vert.
- **Chez nous** : rien. L'audit npm du lundi (`sonde-nuit.yml`) et la sonde de la page publiée
  peuvent rougir sans que personne le voie ; la routine du matin ne regarde que la CI de `main`.
- **Gain** : la routine lit les issues ouvertes au réveil ; rien de nouveau n'est planifié.
- **À renseigner** : rien.

### 2. Balayer les 813 fiches réelles : aucune « NaN », « undefined », « null », « Invalid Date » à l'écran — moyen

- **Netatmo** : `web/e2e/sweep.mjs` passe sur chaque écran × chaque jeu de données × 360 px,
  1 280 px, texte à 200 %, thème sombre, avec ces invariants, plus axe et un « explorateur » qui
  actionne chaque contrôle.
- **Chez nous** : `regles-d-ecran.spec.ts` vérifie débordement et recouvrement sur une fiche ;
  aucun test ne cherche « undefined » à l'écran.
- **Gain** : chaque campagne ajoute des fiches de forme nouvelle (horaires par saison, catégorie
  4, portables, remarques). Le balayage tiendrait la promesse « rien d'inventé, ce qui manque est
  dit » sur **toutes** les fiches, pas seulement sur celles des tests. À la demande, ou sur les
  seules fiches du lot dans la PR de campagne.
- **À renseigner** : rien.

### 3. La routine « Département du jour » qui tourne dans GitHub Actions, en propositions seulement — moyen

- **Netatmo** : `revue-agents.yml` lance `anthropics/claude-code-action` à la demande, avec le
  moindre privilège : l'agent ne peut que lire le dépôt et écrire un fichier ; un **second job,
  sans clé ni modèle**, valide ce fichier champ par champ (`scripts/revue_issues.py`) et ouvre
  les issues.
- **Chez nous** : la routine tourne dans cette session ; elle a déjà été perdue deux fois (session
  neuve sans accès le 07/11, redémarrage le 08/11, `docs/APPRENTISSAGES.md`).
- **Proposition** : un workflow `departement-du-jour.yml` (à la main d'abord, puis une fois par
  jour si tu le veux). Job A : Claude lit les paquets du département (skill
  `campagne-departement`), lit les pages publiques et écrit **seulement** dans `curation/`.
  Job B, sans clé : valide le lot (`lectureAgentSchema`, `controler`, garde de `data/`) et ouvre
  la PR. Comme aujourd'hui, rien n'entre dans `data/` sans passer par ta règle et la CI.
- **Risques** : une page lue peut contenir des instructions (le job B ne fait confiance qu'au
  schéma) ; le coût (borné par `--max-turns`, un délai et le plafond de la console).
- **À renseigner** : `ANTHROPIC_API_KEY`.

### 4. Un texte du mois écrit par Claude, où chaque chiffre et chaque nom sont vérifiés — moyen

- **Netatmo** : `collector/insights.py`. Le code calcule les faits ; Claude n'écrit que la
  phrase ; chaque nombre du texte doit être l'un des faits fournis, sinon une seule réécriture ;
  le résultat garde `verified`, le modèle et le coût ; l'appli affiche « rédigé par l'IA » et un
  volet « ce qui a été envoyé ». Tests : `tests/test_collector.py:458-560`.
- **Pour nous** : « Ce qui a changé ce mois-ci sur la carte » (fiches ajoutées, départements
  couverts, fermetures), ou une présentation courte de chaque département. Vérification : chaque
  nombre **et chaque nom de brasserie** doit venir des faits. Le texte arrive par une PR ; tu
  décides.
- **Attention** : ta règle « aucune donnée inventée » s'applique au texte. C'est pour cela que la
  vérification est mécanique et que le texte passe par une PR.
- **À renseigner** : `ANTHROPIC_API_KEY`.

### 5. Les données en open data, avec leur schéma publié — petit à moyen

- **Netatmo** : `docs/export-long.md` et `docs/export-long.schema.json` (format versionné,
  schéma JSON publié, validé en CI par ajv).
- **Pour nous** : publier à côté de la page `breweries.json`, `breweries.csv` et
  `breweries.geojson`, avec `breweries.schema.json` généré depuis le schéma zod
  (`src/core/schema.ts`), la licence ODbL (`data/LICENCE.md`) et un lien « Télécharger les
  données » près des attributions. C'est le « open data » de ta demande du 16/10.
- **À renseigner** : rien.

### 6. Une page « Sources et conditions », datée — petit

- **Netatmo** : `docs/juridique.md`, repris dans l'appli (`web/src/legal.ts`) ; pour chaque
  service, conditions lues, date de lecture, risque d'arrêt ; « à relire » après un an, testé.
- **Pour nous** : tuiles OSM, Overpass, recherche-entreprises (SIRENE), IGN, Wikidata, liens
  d'itinéraire, GitHub. En français et en anglais.
- **À renseigner** : rien.

### 7. Des tests qui disent « injoignable » ou « format changé » pour les services de campagne — petit à moyen

- **Netatmo** : `sources.yml` ; injoignable = ignoré, format changé = échec et issue.
- **Chez nous** : la sonde rougit pareil sur une panne et sur un format changé ; les outils de
  campagne (SIRENE, IGN, Overpass, Wikidata) n'ont pas de test de format.
- **Gain** : une API qui change casse **avant** une journée de routine, et une panne passagère
  ne compte pas comme un essai raté.

### 8. Le ménage de la méthode — petit chacun

- **`docs/APPRENTISSAGES.md` cité en tête d'`AGENTS.md`**, avec des entrées numérotées
  (`A1 · date — titre`), « ce qui s'est passé » / « conduite », et « absorbée par … » quand un
  outil rend l'erreur impossible ; format tenu par un test (Netatmo :
  `web/src/agents-md.test.ts:69-79`). Aujourd'hui seul `CLAUDE.md` le cite : Copilot ne le voit
  pas.
- **Un `CLAUDE.md` court** : le nôtre fait 21 Ko, dont 40 lignes d'historique, relus à chaque
  tour ; celui de Netatmo fait 1,2 Ko. L'historique irait dans `docs/ETAT.md`.
- **Une seule liste d'étapes** pour la porte et la CI (Netatmo : `scripts/porte.mjs` lit
  `ci.yml`) ; la nôtre (`outils/etapes-porte.ts`) est une seconde copie, sans test d'accord
  (AGENTS.md §4ter). Et une **porte rapide** avant chaque commit (lint, types, tests unitaires),
  la complète avant la PR : la porte complète a été mesurée à 390 s (S364), la rapide est à
  mesurer ; le test des fins de ligne, qui expire sous la charge, ne bloquerait plus chaque commit. **Ta décision** : le §6 dit aujourd'hui « la porte
  avant de committer ».
- **`SECURITY.md`** : chaque promesse cite le test qui échoue si elle est cassée, et un test le
  vérifie (Netatmo : `web/src/security-md.test.ts`).
- **`.gitignore`** : ignorer `.claude/settings.local.json` et `.claude/worktrees/` (un réglage
  local committé par erreur élargirait les permissions).
- **Pointeurs pour les autres assistants** : `.github/copilot-instructions.md` et
  `.gemini/settings.json` renvoient à `AGENTS.md`, testés.

### 9. Le reste, moins urgent

- **Provenance du site** (`deploy.yml:52-80`) : `build.json` (commit, date) affiché dans « À
  propos », et une attestation signée de chaque fichier servi. Rien à renseigner.
- **Rapport qualité des données** par département dans le résumé de la CI : fiches « À
  confirmer », au centre de la commune, âge de la vérification. Rien à renseigner.
- **Un devcontainer** : ouvrir le dépôt dans Codespaces avec Node, Chromium et la page lancée,
  sans rien installer (persona `contributrice-externe`).
- **Mutation lue jusqu'au bout**, score par fichier dans le résumé du job (`mutation.yml`).
- **Garde « rien hors jetons »** dans le CSS, avec une liste d'exceptions qui échoue si une
  exception ne sert plus (`design-usage.test.ts`).
- **Alerte à 80 % du budget de poids**, avant d'être bloqué.
- **Matrice de risques** (probabilité × impact), chaque risque relié à ses tests
  (`docs/bmad/06-qa-strategy.md:52-68`).

## Ce que je ne reprendrais pas

- Le chiffrement des données et la phrase de passe : nos données sont publiques.
- Le commit automatique dans `data/` : chez nous, rien n'entre dans `data/` sans ta règle et une
  PR.
- Les versions, jalons et CHANGELOG : utiles seulement le jour des stores (#273).

## Ce que je propose de faire, dans l'ordre, sur ton go

1. Idées 1, 8 (le ménage) et 5 : sans clé, sans risque, une PR chacune.
2. Idée 2 (balayage des fiches), puis 6 et 7.
3. Si tu crées la clé : idée 3 d'abord à la main sur un département, puis idée 4.

Tes réponses attendues : **créer ou non la clé Anthropic** (et un plafond de dépense) ;
**porte rapide avant le commit** (oui / non) ; **un passage automatique par mois** pour les
contrôles (oui / non).
