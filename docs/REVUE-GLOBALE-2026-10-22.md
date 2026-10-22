# Revue globale du 22/10/2026

Faite en fin de session, à la demande de Cédric (« review globale + fin de
session »), selon le skill `revue-globale`, sur `main` après S342, E37 et
S355. Quatre agents, lancés par leur nom pour la première fois (E37) :
`relecteur-de-promesses`, `chasseur-de-jumeaux`, `relecteur-de-workflows`,
`contributrice-externe`. Chaque trouvaille ci-dessous est corrigée par la PR
de fin de session du 22/10, ou porte son issue (`AGENTS.md` §12 : un
problème = une issue).

## Mesuré sans défaut

| Contrôle | Mesure |
|---|---|
| Déploiement | `main` vert (f70679c, puis la PR des mises à jour npm #202), page publiée sondée |
| Sécurité | aucun `innerHTML`, `dangerouslySetInnerHTML`, `eval(`, `new Function` dans `src/` ; `npm audit --omit=dev` : 0 vulnérabilité |
| Confidentialité | un seul `fetch` dans `src/` (`communesFrance.ts`, fichiers de communes du site) ; la géolocalisation ne sert qu'au calcul local |
| Données | 453 fiches, 189 « À confirmer », toutes avec leur note ; 9 fermées ; garde de `data/` conforme (67 accords) |
| Poids | 2,6 Mo d'assets ; la carte (1,1 Mo) se charge à la demande ; les fiches, 198 ko |
| Workflows | droits au plus juste, aucune interpolation dans un `run:`, aucun `pull_request_target`, actions épinglées par SHA |
| Contribution | chaque chemin et chaque commande du README, de `CONTRIBUTING.md` et d'`AGENTS.md` existe |
| Paires tenues | `AGENTS.md` ↔ `CLAUDE.md`, `PERSONAS.md` ↔ agents, skills ↔ agents, `nouveautes.ts` ↔ `en.ts`, chiffres du README ↔ données |

## Corrigé par la PR de fin de session

| # | Constat | Agent |
|---|---|---|
| N1 | L'état de reprise disait encore S342 « en pause », et `data/` à 348 lignes | promesses |
| N2 | `docs/ETAT.md` listait comme « à accepter » des lots appliqués depuis le 21/10 | promesses |
| N3 | Le README disait que les propositions attendent la relecture de Cédric | promesses |
| N4 | `dependabot.yml` promettait une revue que rien n'impose | promesses |
| D1 | `docs/ARCHITECTURE.md` : skill `campagne-departement`, angles de revue, garde dans la porte, « Cédric seul » | jumeaux |
| D2 | La règle du 21/10 absente des §0 et §9 d'`AGENTS.md` et du plan (`EPICS.md`) | jumeaux |
| D4 | Le lanceur d'essais permettait tout `git` (`git *`) : ramené à la lecture | jumeaux |
| D5 | `MARKETING.md` « 24 départements » (39) ; le README omettait les 22 fiches du Centre-Val de Loire ; « S1 → S328 » | jumeaux |
| C1 | `AGENTS.md` citait `docs/stories/Sxx.md` sans son modèle | contributrice |

## En issues

| Issue | Constat | Agent |
|---|---|---|
| #208 | « Votre carnet est vide » quand la couche OSM masque des visites | promesses |
| #209 | `main` non protégée : CODEOWNERS et la porte ne sont pas imposés (**décision de Cédric**) | workflows, promesses, jumeaux |
| #210 | Chiffres et récits hors du filet de `chiffres-ecrits.test.ts` | jumeaux |
| #211 | Constantes doc ↔ code sans test ; regex du département écrite trois fois | jumeaux |
| #212 | `visuel-references.yml` : refuser un fichier non ordinaire avant `git add` | workflows |
| #213 | Contribuer : gabarit d'issue, brasserie manquante, clone complet | contributrice |
| #214 | Sept fiches d'origine « solide » sur un office de tourisme (**décision de Cédric**) | jumeaux |
| #215 | Les paroles de Cédric recopiées dans `outils/campagne.ts` diffèrent de `DECISIONS.md` | jumeaux |
| #216 | Première campagne d'essais des agents (**accord de Cédric**) | promesses |
| #217 | S342 suite : 42 candidats à relancer, Popihn et Lavigney (**questions de Cédric**) | — |

Les mises à jour d'actions (#199 à #201) sont regroupées dans la PR #207 ;
chaque SHA concorde avec son tag, et `visuel-references.yml` a été lancé à
la main sur la branche pour exercer `upload-artifact` v7.
