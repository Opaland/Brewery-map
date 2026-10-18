# Ce que les dépôts frères ont, et Mousse de Poche pas encore

Inventaire du 18/10, à la demande de Cédric (« complète la feuille de route
avec les items d'autres dépôts »). Lu en lecture seule dans **Sentiers**
(`Opaland/Rando-generator`) et **ÉtapeForge** (`Opaland/Tdf-generator`) :
README, BACKLOG, `docs/`, `CLAUDE.md`, `.claude/`, `.github/workflows`. Une
idée n'est retenue que si rien dans Mousse de Poche ne la fait ni ne la
prévoit (`src/`, `tests/`, `.claude/`, `.github/`, `BACKLOG.md`,
`docs/EPICS.md`, `docs/stories/`).

Retenues : 20, devenues les stories S273 à S292 (`docs/EPICS.md`, E27).
Chacune aura son `docs/stories/Sxx.md` avant d'être codée (CLAUDE.md §10bis).

## Constats qui les motivent

- Le seuil des 900 px est écrit cinq fois dans `src/index.css` et trois fois
  en JavaScript (`src/App.tsx`, `src/Carte.tsx`) ; aucun test ne vise 899 ni
  900 px (S274, §4ter).
- Aucun test ne garde le bloc `<noscript>` d'`index.html` (S276, §3).
- `navigator.storage.persist` n'est appelé nulle part (S275).
- 17 `waitForTimeout` dans 9 fichiers e2e (S278, §6ter).
- Seule la mutation est planifiée ; la sonde de la page publiée ne tourne
  qu'après un déploiement (S277).
- `BACKLOG.md` (revue S22) : « rien n'est essayé sur un vrai téléphone »
  (S279).

## Écartées

**Déjà faites** :
- focus visible (`accessibilite.spec.ts`) ;
- contraste des pastilles (`accessibilite.spec.ts`) ;
- CSP dans la page (`securite.spec.ts`, `page-deployee.spec.ts`) ;
- image de partage (`outils/image-partage.ts`, S28) ;
- mutation (S239) ;
- deux onglets, une seule base (S104) ;
- notes de version (S44, « Quoi de neuf ? ») ;
- visite guidée (S46) ;
- aucun dialogue natif ni `innerHTML` dans `src/` ;
- homonymes de communes (S59, `src/core/candidats.ts`) ;
- « Ce qu'on ne fera pas » (`docs/PRD.md` §6).

**Déjà prévues** :
- impression (S108) ;
- page « pourquoi » (S217) ;
- exports GPX, CSV et HTML (S171, S219) ;
- zone hors ligne (S110, S166) ;
- revue par personas (S225 : seuls deux angles nouveaux sont retenus, S288).

**Reportées par décision** : les scripts `listes`, `textes` et `chemins` de
Sentiers. `BACKLOG.md` dit de les reprendre « si un raté de la même famille
se produit ici » ; le seuil des 900 px (S274) pourrait être ce raté, si
Cédric en juge ainsi.

**Hors sujet** :
- Docker, nginx, NAS et Raspberry Pi : la page est sur GitHub Pages, sans
  serveur ;
- comptes publics : exclus par le PRD §6 ;
- Strava, Suunto, GPS, batterie, jalons ;
- banc d'essai et mode démonstration ;
- découpage du store ;
- « un mot à côté des chiffres » : une appréciation dérivée serait une
  donnée inventée.

Les leçons du `CLAUDE.md` d'ÉtapeForge n'y sont pas recopiées : ici, une
règle ne s'ajoute qu'après un raté observé sur ce dépôt.
