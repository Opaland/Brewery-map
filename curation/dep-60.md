# Lot dep-60 — l'Oise (S344)

Ce lot ajoute **2 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 21 candidats = 2 proposés + 19 non proposés (tableau ci-dessous).
Catégories proposées : 1 « acheter et consommer », 1 « acheter seulement », 0 « pas de vente », 0 « à confirmer ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| Entreprise individuelle (`personne:1`) | lu le 28/10 : le registre seul |
| Entreprise individuelle (`personne:2`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:3`) | entreprise sans nom ni adresse : rien à chercher |
| FERME BRASSERIE SAINT RIEUL (`sirene:414798934`) | lu le 28/10 : site en erreur 503 ; à relancer quand le site répond |
| BRASSERIE DU BEAUVAISIS (`sirene:935141796`) | lu le 28/10 : un article de presse seul |
| AU COEUR DU MALT (`sirene:818098543`) | lu le 28/10 : le site ne dit pas qu’on achète sur place (boutique en ligne seule) |
| LA COURTOISE (`sirene:824879324`) | lu le 28/10 : le registre seul |
| PETITE BRASSERIE PICARDE (`sirene:533177150`) | lu le 28/10 : son site dit que le brasseur a arrêté et que la brasserie fermera à l’épuisement du stock |
| BRASSERIE DS (`sirene:904655578`) | lu le 28/10 : aucune source |
| LA MICRO BRASSERIE DES HAUTS DE FRANCE (`sirene:902938976`) | lu le 28/10 : un annuaire seul ; site introuvable depuis la session |
| ECOL' AUX MOUSSES (`sirene:827534231`) | lu le 28/10 : site lu seulement en résumé, sans passage qui dise ce qu’on y achète ; à relancer |
| BRASSERIE CRAIG ALLAN (`sirene:523093888`) | lu le 28/10 : son site ne dit rien de la vente ni de la dégustation sur place |
| BRASSERIE SAINT MEDARD (`sirene:822788501`) | lu le 28/10 : un annuaire seul |
| Entreprise individuelle (`personne:4`) | lu le 28/10 : presse et office seuls, sans adresse ni horaires |
| BRASSERIE EGUA (`sirene:978336592`) | lu le 28/10 : aucune source |
| Brasserie de l'Hotel de Ville (`node/2328758020`) | lu le 28/10 : un café, il ne brasse pas |
| Auto Bar Brasserie (`node/9439715435`) | lu le 28/10 : un bar-brasserie, il ne brasse pas |
| Le Marcel (`way/323637735`) | lu le 28/10 : introuvable ; rien ne dit qu’il brasse |
| L'écol aux Mousses (`way/963450970`) | lu le 28/10 : même lieu que « Écol’ aux Mousses » (sirene:827534231), dont le site est le même ; voir sa raison |

## Les fiches proposées

## Lot dep-60 — 0 proposition(s), 2 fiche(s) nouvelle(s)

### 1. Brasserie Félicité — fiche nouvelle

- n : (vide) → Brasserie Félicité
- c : (vide) → Montagny-Sainte-Félicité
- d : (vide) → 60
- lat : (vide) → 49.12966
- lon : (vide) → 2.73825
- km : (vide) → 413
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Son site annonce un magasin ouvert le jeudi, le vendredi et le samedi après-midi, et des afterworks le vendredi soir.
- addr : (vide) → 18 place du Fort, 60950 Montagny-Sainte-Félicité
- src : (vide) → https://www.brasserie-felicite.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 07 82 52 55 70
- contact.site : (vide) → https://www.brasserie-felicite.fr
- contact.source : (vide) → https://www.brasserie-felicite.fr
- contact.verifieLe : (vide) → 2026-10-28
- verifieLe : (vide) → 2026-10-28

Sources (vérifiée le 2026-10-28) : https://www.brasserie-felicite.fr ; https://data.geopf.fr/geocodage/search?q=18+place+du+Fort%2C+60950+Montagny-Sainte-F%C3%A9licit%C3%A9&limit=5

Extrait lu : « Le magasin de la brasserie vous ouvre ses portes »

Choix du vérificateur : Site relu à la main le 28/10. Catégorie 2 : le magasin est écrit ; les « afterworks » ne disent pas en toutes lettres qu’on y boit ses bières. Horaires non saisis : « de 14h à 18 », tronqué sur la page. Seul numéro publié par la brasserie, un mobile : retenu.

**Aperçu de la fiche** (état du moment calculé le mercredi 28 octobre 2026 à 01:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - 18 place du Fort, 60950 Montagny-Sainte-Félicité
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+F%C3%A9licit%C3%A9+Montagny-Sainte-F%C3%A9licit%C3%A9)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+F%C3%A9licit%C3%A9&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 07 82 52 55 70](tel:+33782525570)
> - [Site de la brasserie](https://www.brasserie-felicite.fr)
> - Lu sur [brasserie-felicite.fr](https://www.brasserie-felicite.fr) le 28 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 2. Brasserie de Senlis — fiche nouvelle

- n : (vide) → Brasserie de Senlis
- c : (vide) → Senlis
- d : (vide) → 60
- lat : (vide) → 49.20143
- lon : (vide) → 2.5827
- km : (vide) → 424.8
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Son site annonce un bar à bières où goûter ses créations, et la vente en direct à la brasserie.
- addr : (vide) → 6 rue des Jardiniers, 60300 Senlis
- src : (vide) → http://www.brasseriedesenlis.com/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 35 55 16 85
- contact.site : (vide) → http://www.brasseriedesenlis.com/
- contact.source : (vide) → http://www.brasseriedesenlis.com/
- contact.verifieLe : (vide) → 2026-10-28
- horaires.0.nature : (vide) → accueil
- horaires.0.mer : (vide) → 16 h – 22 h
- horaires.0.jeu : (vide) → 16 h – 22 h
- horaires.0.ven : (vide) → 16 h – 23 h
- horaires.0.sam : (vide) → 14 h – 23 h
- horaires.0.source : (vide) → http://www.brasseriedesenlis.com/
- horaires.0.verifieLe : (vide) → 2026-10-28
- verifieLe : (vide) → 2026-10-28

Sources (vérifiée le 2026-10-28) : http://www.brasseriedesenlis.com/ ; https://data.geopf.fr/geocodage/search?q=6+rue+des+Jardiniers%2C+60300+Senlis&limit=5

Extrait lu : « Venez déguster nos créations autour d’une planche de charcuterie dans notre bar à bières »

Choix du vérificateur : Site relu à la main le 28/10. Seul numéro publié par la brasserie, un mobile : retenu ; celui de l’office écarté. Horaires d’accueil du site (« Nos bières et goodies sont vendus en direct à la brasserie qui vous accueille le mercredi et jeudi de 16h à 22h, le vendredi de 16h à 23h et le samedi de 14h à 23h00 ») ; ceux de l’office, différents, écartés.

**Aperçu de la fiche** (état du moment calculé le mercredi 28 octobre 2026 à 01:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 1 h 30 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 16 h.
> - Adresse
> - 6 rue des Jardiniers, 60300 Senlis
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+de+Senlis&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 35 55 16 85](tel:+33635551685)
> - [Site de la brasserie](http://www.brasseriedesenlis.com/)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | 16 h – 22 h
> - Jeudi | 16 h – 22 h
> - Vendredi | 16 h – 23 h
> - Samedi | 14 h – 23 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriedesenlis.com](http://www.brasseriedesenlis.com/) le 28 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

Empreinte du lot : 37cead7af425
