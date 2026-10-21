# Brouillon de post LinkedIn (S23)

À relire et publier par Cédric, s'il le veut : rien n'est publié par les
agents. Chaque chiffre renvoie à sa mesure (entre crochets, à retirer avant
publication).

---

🍺 **Mousse de Poche** : les brasseries artisanales autour de vous, et ce
qu'on peut vraiment y faire.

Acheter et boire sur place ? Acheter seulement ? Rien du tout ? Ou « à
confirmer », quand aucune source ne le dit. L'application ne devine pas :
chaque fiche dit d'où vient l'information et avec quelle confiance.

Ce qu'elle fait aujourd'hui :
📍 partir de sa position ou de n'importe quelle commune de France
   [34 968 communes, `public/communes-france.json`] ;
🗺️ toute la France : 370 fiches vérifiées, et 866 brasseries repérées sur
   OpenStreetMap, « à confirmer » [`data/breweries.json`, `src/donnees-osm/`] ;
🧭 « Y aller » vers Google Maps, Waze ou Plans d’Apple ;
⭐ des favoris, gardés sur le téléphone ;
📶 consultable hors connexion, installable comme une application.

Ce qui m'importait : ce site n'envoie vos coordonnées à personne, et aucune
donnée n'est inventée. Pas de serveur, pas de compte, pas de traceur.

Construite par sprints courts avec Claude Code, chacun relu à travers des
« personas » : celle qui découvre, celui au vieux téléphone, celle qui
utilise un lecteur d'écran, celui qui décide à vélo… Un exemple : charger la
carte seulement quand on y arrive a fait passer le score Lighthouse mobile
de 64 à 100 [mesure simulée du 16/10, S20, `docs/SPRINTS.md`].

👉 https://opaland.github.io/Brewery-map/
Code ouvert : https://github.com/Opaland/Brewery-map

Une brasserie manque, une fiche est fausse ? Le bouton « Signaler une
erreur » est fait pour ça.

L'abus d'alcool est dangereux pour la santé, à consommer avec modération.

*Visuel suggéré : `docs/captures/parcours.gif`.*
