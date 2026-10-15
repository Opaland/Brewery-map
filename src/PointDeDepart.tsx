import { useState } from 'react'
import {
  libelleOrigine,
  ORIGINE_DEFAUT,
  origineDeCommune,
  type CommuneConnue,
  type Origine,
} from './core/origine'

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

  const valeurCommune = origine.type === 'commune' ? origine.cle : ''

  return (
    <fieldset className="depart" data-testid="depart">
      <legend>Point de départ : {libelleOrigine(origine)}</legend>
      {/*
        Avant le bouton, pour être lu avant le geste (revue Léa S8). Exact sur
        ce qui part : pas les coordonnées, mais les images de la carte, qui
        désignent la zone où l'on est (revue code S8 : à quelques kilomètres
        près, zoom 14 au plus).
      */}
      <p className="champ-aide" data-testid="confidentialite">
        « Autour de moi » utilise votre position seulement dans ce téléphone, pour calculer
        les distances : vos coordonnées ne sont envoyées à personne. Mais la carte se
        centre alors sur vous et charge auprès d’OpenStreetMap les images de cette zone :
        ce serveur voit donc la zone où vous êtes, à quelques kilomètres près, et votre
        adresse IP — comme pour toute carte en ligne. Pour l’éviter, partez d’une commune.
      </p>
      <div className="depart-actions">
        <button type="button" onClick={autourDeMoi} disabled={enCours} data-testid="autour-de-moi">
          {enCours ? 'Localisation…' : 'Autour de moi'}
        </button>
        {origine.type !== 'brignais' && (
          <button
            type="button"
            onClick={() => {
              setMessage(null)
              onChange(ORIGINE_DEFAUT)
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
            const c = communes.find((x) => x.cle === e.target.value)
            // Rechoisir la même commune ne recadre pas la carte (revue code S8).
            if (c && c.cle !== valeurCommune) {
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
            <option key={c.cle} value={c.cle}>
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

    </fieldset>
  )
}
