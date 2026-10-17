import { t } from './i18n'
import { useRef, useState } from 'react'
import { dateDuJour, type Preferences } from './core/preferences'
import { lireSauvegarde, reunir, TAILLE_MAX, versSauvegarde } from './core/sauvegarde'

/**
 * Sauvegarder et transférer son carnet (S37) : un fichier, aucun serveur.
 * La lecture se fait dans le navigateur (`File.text()`), et rien ne part.
 */
export function Sauvegarde({
  actuelles,
  onReprendre,
}: {
  /** Ce qui est gardé sur l'appareil, sous sa forme stockée. */
  actuelles: Preferences
  onReprendre: (p: Preferences) => void
}) {
  const [etat, setEtat] = useState('')
  const choix = useRef<HTMLInputElement>(null)

  const enregistrer = () => {
    const jour = dateDuJour(new Date())
    // Compact : un fichier indenté grossissait d'un tiers (revue adverse S37).
    const fichier = new Blob([JSON.stringify(versSauvegarde(actuelles, jour))], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(fichier)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mousse-de-poche-sauvegarde.json'
    a.click()
    // Révoquée plus tard : tout de suite, le téléchargement peut s'annuler
    // hors de Chromium (revue adverse S34).
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 60_000)
    setEtat(t('Sauvegarde enregistrée dans vos téléchargements. Gardez-la, ou ouvrez-la sur votre autre appareil.'))
  }

  const ouvrir = async (f: File) => {
    // La taille d'abord : lire 300 Mo avant de refuser figeait la page
    // (revue adverse S37).
    if (f.size > TAILLE_MAX) {
      setEtat(t('Ce fichier est trop gros pour une sauvegarde (plus de 1 Mo).'))
      return
    }
    const lecture = lireSauvegarde(await f.text())
    if (!lecture.ok) {
      setEtat(t(lecture.raison))
      return
    }
    const { preferences, ajouts } = reunir(actuelles, lecture.preferences)
    onReprendre(preferences)
    const n = ajouts.favoris + ajouts.visites + ajouts.notes
    setEtat(
      n === 0
        ? t('Sauvegarde lue : rien de nouveau, tout était déjà sur cet appareil.')
        : t('Sauvegarde ajoutée : {favoris} favori(s), {visites} visite(s) et {notes} note(s) en plus. Rien n’a été effacé ; vos réglages restent ceux de cet appareil.', ajouts),
    )
  }

  return (
    <div className="sauvegarde" data-testid="sauvegarde">
      <p className="champ-aide">
        {t('Changer d’appareil : enregistrez une sauvegarde (un fichier), puis ouvrez-la sur l’autre. Elle s’ajoute à ce qui s’y trouve, sans rien effacer. Elle ne contient jamais votre position.')}
      </p>
      <div className="depart-actions">
        <button type="button" onClick={enregistrer} data-testid="enregistrer-sauvegarde">
          {t('Enregistrer une sauvegarde')}
        </button>
        <button
          type="button"
          onClick={() => {
            choix.current?.click()
          }}
          data-testid="ouvrir-sauvegarde"
        >
          {t('Ouvrir une sauvegarde')}
        </button>
        <input
          ref={choix}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0]
            e.target.value = ''
            if (f !== undefined) void ouvrir(f)
          }}
          data-testid="fichier-sauvegarde"
        />
      </div>
      <p className="champ-aide" role="status" data-testid="sauvegarde-etat">
        {etat}
      </p>
    </div>
  )
}
