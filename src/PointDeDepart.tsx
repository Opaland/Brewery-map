import { useState } from 'react'
import { libelleOrigine, origineDeCommune, type CommuneConnue, type Origine } from './core/origine'

interface Props {
  origine: Origine
  communes: readonly CommuneConnue[]
  onChange: (o: Origine) => void
}

const ERREURS: Record<number, string> = {
  1: 'Vous avez refusé la localisation. Rien n’a changé : choisissez une commune si vous voulez partir d’ailleurs.',
  2: 'Votre position est introuvable pour l’instant. Rien n’a changé : réessayez, ou choisissez une commune.',
  3: 'La localisation a pris trop de temps. Rien n’a changé : réessayez, ou choisissez une commune.',
}

/**
 * Le point de départ (S8). « Autour de moi » ne demande la position qu'au
 * toucher du bouton, jamais au chargement. La position sert à calculer les
 * distances **dans le téléphone** et n'est envoyée nulle part ; ce qui part
 * sur le réseau est dit tel quel (les images de la carte).
 */
export function PointDeDepart({ origine, communes, onChange }: Props) {
  const [message, setMessage] = useState<string | null>(null)
  const [enCours, setEnCours] = useState(false)

  const autourDeMoi = () => {
    if (!('geolocation' in navigator)) {
      setMessage('Ce navigateur ne sait pas donner votre position. Choisissez une commune.')
      return
    }
    setEnCours(true)
    setMessage(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setEnCours(false)
        onChange({ type: 'position', point: { lat: pos.coords.latitude, lon: pos.coords.longitude } })
      },
      (err) => {
        setEnCours(false)
        setMessage(ERREURS[err.code] ?? ERREURS[2] ?? '')
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 600000 },
    )
  }

  const valeurCommune = origine.type === 'commune' ? origine.nom : ''

  return (
    <fieldset className="depart" data-testid="depart">
      <legend>Point de départ : {libelleOrigine(origine)}</legend>
      <div className="depart-actions">
        <button type="button" onClick={autourDeMoi} disabled={enCours} data-testid="autour-de-moi">
          {enCours ? 'Localisation…' : 'Autour de moi'}
        </button>
        {origine.type !== 'brignais' && (
          <button
            type="button"
            onClick={() => {
              setMessage(null)
              onChange({ type: 'brignais', point: { lat: 45.6745, lon: 4.7545 } })
            }}
            data-testid="revenir-brignais"
          >
            Revenir à Brignais
          </button>
        )}
      </div>
      <label className="champ">
        <span>Ou partir d’une commune</span>
        <select
          value={valeurCommune}
          onChange={(e) => {
            const c = communes.find((x) => x.nom === e.target.value)
            if (c) {
              setMessage(null)
              onChange(origineDeCommune(c))
            }
          }}
          data-testid="commune-depart"
        >
          <option value="" disabled>
            Choisir une commune…
          </option>
          {communes.map((c) => (
            <option key={c.nom} value={c.nom}>
              {c.nom}
            </option>
          ))}
        </select>
      </label>
      {message !== null && (
        <p className="champ-aide" role="alert" data-testid="localisation-erreur">
          {message}
        </p>
      )}
      <p className="champ-aide" data-testid="confidentialite">
        « Autour de moi » utilise votre position seulement dans ce téléphone, pour calculer
        les distances : elle n’est envoyée à personne. La carte, elle, charge auprès
        d’OpenStreetMap les images de la zone affichée — comme toute carte en ligne.
      </p>
    </fieldset>
  )
}
