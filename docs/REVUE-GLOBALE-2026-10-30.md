# Revue globale du 30/10/2026

Faite en fin de session, à la demande de Cédric, selon le skill
`revue-globale`, sur `main` après S345 seconde partie (PR #248) et S369.
Quatre agents : `relecteur-de-promesses`, `chasseur-de-jumeaux`,
`relecteur-de-workflows`, `contributrice-externe`. Les issues encore ouvertes
des revues du 22 et du 26/10 ne sont pas redites.

## Mesuré sans défaut

| Contrôle | Mesure |
|---|---|
| Déploiement | `main` vert (0eb2787, run 41058701225) : porte, visuel, déploiement, sonde ; page en 200 |
| Sécurité | aucun `innerHTML`, `dangerouslySetInnerHTML`, `eval(`, `new Function` dans `src/` ; `npm audit --omit=dev` : 0 vulnérabilité |
| Confidentialité | un seul `fetch` dans `src/` (`communesFrance.ts`) ; `navigator.geolocation` seulement dans `PointDeDepart.tsx` |
| Données | 643 fiches : 245 « À confirmer », toutes avec leur note ; 232, 155, 10 et 1 en catégories 1 à 4 ; garde de `data/` conforme (98 accords) |
| Poids | 2,8 Mo d'assets ; la carte (1,1 Mo) à la demande ; les fiches, 347 ko |
| Workflows | droits au plus juste, aucun `pull_request_target`, aucun texte extérieur dans un `run:`, actions épinglées par SHA |
| Écran et anglais | la catégorie 4 est nommée (libellés, filtre, traduction) ; le noscript n'a pas de liste fermée |

La contributrice externe a lu sans exécuter : aucune porte n'a été vue verte
sur un clone neuf.

## Corrigé par S370

| # | Constat | Agent |
|---|---|---|
| P1 | Le vérificateur de brasserie disait « 0 à 3 » et « 1 à 3 », sans le code 4 | promesses, jumeaux |
| P2 | La veille disait « 1 à 3 » (le code prend 1 à 4) et promettait un tour en 7 mois ; à 10 fiches par mois, 398 fiches demandent 40 mois | promesses |
| J1 | Le test des marqueurs nommés ignorait « Consommer sur place seulement », et rougirait dès que la fiche du Nord entrerait dans la vue. Il lit `CATEGORIES` (vu rouge, deux libellés retirés de la liste ; un marqueur de catégorie 4 n'a pas été mis en vue) | jumeaux, promesses |
| C1 | Le bloc bash du README commençait à `npm ci`, sans clone | contributrice |

## En issues

| Issue | Constat | Agent |
|---|---|---|
| #249 | `docs/DONNEES.md` et `index.css` d'accord avec `CATEGORIES`, mais sans test | jumeaux |
| #250 | Les 12 tests rouges de Firefox et WebKit, listés d'après le run (traces non lues) | workflows |
| #251 | `persist-credentials` et Stryker hors verrou, risque faible | workflows |

## Déjà ouvert, rappelé

- #247 : un point OpenStreetMap porte un nom de personne, toujours affiché.
- #209 : `main` n'est pas protégée.

## Noté, sans suite

Une session cloud a poussé le 30/10 sur `ccr-ad453556-sw7aqp` une S345 « en
cours » (ed16b0a), déjà faite sur `main` par la PR #248 : à ne pas reprendre.

## Chiffres du projet

643 fiches dans 60 départements ; 716 points OpenStreetMap ; 965 tests
unitaires verts et 2 sautés sous Windows ; 98 accords rejoués par la garde.
