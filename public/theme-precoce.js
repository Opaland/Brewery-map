// Le thème choisi (S45), posé avant le premier rendu : sans lui, la page
// s'affichait d'abord au thème du système, le temps de lire IndexedDB
// (revue adverse S45). Un fichier, pas un script en ligne : la politique de
// sécurité refuse ces derniers. Un miroir dans localStorage ; IndexedDB
// reste la source (src/theme.ts).
try {
  var t = localStorage.getItem('mousse-de-poche-theme')
  if (t === 'clair' || t === 'sombre') document.documentElement.dataset.theme = t
} catch {
  // Stockage refusé : le thème du système, puis celui gardé, au rendu.
}
