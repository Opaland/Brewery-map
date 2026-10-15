# Backlog — Mousse de Poche

Ce qui n'est pas dans le sprint actif. Rien d'ici ne se développe avant la
publication, sauf décision explicite de Cédric.

## Constats sur `data/breweries.json` (relevés le 15/10, sans modification)

Relevés par lecture du fichier fourni (166 lignes). **Aucun n'a été corrigé** :
chacun demande une décision ou une vérification de source.

| # | Constat | Mesure | À trancher en |
|---|---|---|---|
| D1 | `note` est un texte de justification, pas une note chiffrée. Le cahier des charges demande « une note et l'origine de cette note ». | 166/166 lignes | S3 — afficher `note` comme justification ; une note chiffrée reste absente tant qu'aucune origine n'existe |
| D2 | `conf` vaut `solide` / `moyenne` / `faible` ; le cahier des charges dit élevé / moyen / faible. | solide 18, moyenne 33, faible 14, vide 101 | S3 — libellé affiché « élevée » pour `solide` ? |
| D3 | Toutes les coordonnées sont `commune`. | 166/166 | S3 (affichage) ; S5 (curation) |
| D4 | 101 brasseries « À confirmer » (cat 0), dont 58 sans source. | cat 0 : 101 ; `src` vide : 58 | S5, deux lots de 25 au plus |
| D5 | Aucun type de bière renseigné. | `beers` vide : 166/166 | S5 ; le filtre par type sera vide avant (ordre de coupe n° 2) |
| D6 | `km` diffère de plus de 2 km de la distance à vol d'oiseau depuis Brignais pour deux lignes. | Brasserie Solstice 93 (calculé 96,2) ; Brasserie Kiltin' 93 (calculé 90,0) | **Tranché le 15/10** : l'application calcule ses distances (`core/distance.ts`) ; `km` reste dans le fichier, validé, jamais lu. Le retirer = modifier `data/`, à décider par Cédric. |
| D7 | Deux brasseries partagent exactement les mêmes coordonnées. | Le Brass'in et Single Track (même adresse, la note l'explique) | **Tranché le 15/10** : marqueurs groupés ; ces deux-là restent un groupe « 2 » à tout zoom (test e2e). |
| D9 | Catégorie 1 contredite par sa propre justification. | Val d'Ainan (« la FAQ dit pas de vente sur place »), L'Etincelle (« pas de licence pour servir de l'alcool au verre »), Bière bio des Monts d'Or (« fermée d'octobre à mai ») — revue métier S3 | **S12, en priorité** : vérification, proposition à Cédric |
| D10 | Justifications datées, non rafraîchies. | Brasserie du Dauphiné (« période 2024-2025 »), Ninkasi Fabriques (« Horaires 2024 ») | curation (S12 et suivants) |
| D8 | Une source est une page d'accueil générique avec une vente « déduite ». | Ninkasi Brignais (`https://www.ninkasi.fr/`, conf faible) | S5 |

## Fonctionnel

- Le point de départ (Brignais) est masqué par le groupe qui contient les
  brasseries de Brignais au zoom d'ouverture (constaté sur capture le 15/10).
  Il réapparaît en zoomant. À traiter si une revue de persona le juge gênant.
- Une brasserie choisie qui est dans un groupe n'a pas de retour visuel sur
  la carte (revue adverse S2).
- Recherche : les ligatures (œ, æ) ne sont pas décomposées ; aucune n'existe
  dans les données au 15/10 (revue adverse S2).
- La carte (MapLibre) pèse 282 ko gzip, chargée à part de la liste (mesuré
  au build du 15/10). Mesure Lighthouse en S6.
- Scripts de garde de Sentiers non repris (`listes`, `textes`, `chemins`) :
  à reprendre si un raté de la même famille se produit ici.

## Lots de curation non faits

*(rempli en S5)*
