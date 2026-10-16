import { useCallback, useEffect, useRef, useState } from 'react'
import { ChoixCommune } from './ChoixCommune'
import { communeLaPlusProche } from './core/communes'
import { libelleOrigine, ORIGINE_DEFAUT, type Origine } from './core/origine'
import { communesProches } from './communesFrance'
import { avertissementPrecision, localiser } from './localisation'

interface Props {
  origine: Origine
  onChange: (o: Origine) => void
  /**
   * « Autour de moi » était le dernier choix (S21) : on relocalise à
   * l'ouverture, **seulement si le navigateur l'a déjà permis** — jamais de
   * fenêtre de permission sans geste (Léa, S8).
   */
  relocaliser?: boolean
}

/**
 * Le point de départ (S8, refait en S21). Tant que la personne n'a rien
 * choisi, le bloc propose d'abord « Autour de moi » ou sa commune (demande
 * de Cédric du 16/10). « Autour de moi » ne demande la position qu'au
 * toucher du bouton, jamais au chargement. La position sert à calculer les
 * distances **dans le téléphone** et n'est envoyée nulle part ; ce qui part
 * sur le réseau est dit tel quel (les images de la carte).
 */
export function PointDeDepart({ origine, onChange, relocaliser = false }: Props) {
  const [message, setMessage] = useState<string | null>(null)
  const [precision, setPrecision] = useState<string | null>(null)
  const [enCours, setEnCours] = useState(false)
  const dejaRelocalise = useRef(false)

  const autourDeMoi = useCallback(() => {
    setEnCours(true)
    setMessage(null)
    setPrecision(null)
    localiser('geolocation' in navigator ? navigator.geolocation : undefined).then(
      ({ point, precisionM }) => {
        setEnCours(false)
        setPrecision(avertissementPrecision(precisionM))
        onChange({ type: 'position', point })
        // « Près de … » : la commune la plus proche, calculée ici, sans rien
        // demander à personne. Si la liste ne se charge pas, on s'en passe.
        communesProches(point).then(
          (index) => {
            const c = communeLaPlusProche(
              index.map((i) => i.commune),
              point,
            )
            if (c !== undefined) onChange({ type: 'position', point, pres: c[0] })
          },
          () => undefined,
        )
      },
      (e: unknown) => {
        setEnCours(false)
        setMessage(e instanceof Error ? e.message : String(e))
      },
    )
  }, [onChange])

  useEffect(() => {
    if (!relocaliser || dejaRelocalise.current) return
    dejaRelocalise.current = true
    // Sans API des permissions (Safari ancien), on ne demande rien : le
    // bouton reste là.
    if (!('permissions' in navigator)) return
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((p) => {
        if (p.state === 'granted') autourDeMoi()
      })
      .catch(() => undefined)
  }, [relocaliser, autourDeMoi])

  const rienChoisi = origine.type === 'brignais'

  return (
    <fieldset className={rienChoisi ? 'depart depart-a-choisir' : 'depart'} data-testid="depart">
      <legend>
        {rienChoisi ? 'Par où commencer ?' : `Point de départ : ${libelleOrigine(origine)}`}
      </legend>
      {rienChoisi && (
        <p className="champ-aide" data-testid="depart-invitation">
          Partez de votre position, ou de votre commune. En attendant, les distances se comptent
          depuis Brignais.
        </p>
      )}
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
        {!rienChoisi && (
          <button
            type="button"
            onClick={() => {
              setMessage(null)
              setPrecision(null)
              onChange(ORIGINE_DEFAUT)
            }}
            data-testid="revenir-brignais"
          >
            Revenir à Brignais
          </button>
        )}
      </div>
      {precision !== null && origine.type === 'position' && (
        <p className="champ-aide" role="status" data-testid="localisation-precision">
          {precision}
        </p>
      )}
      {message !== null && (
        <p className="champ-aide" role="alert" data-testid="localisation-erreur">
          {message}
        </p>
      )}
      <ChoixCommune
        depuis={origine.point}
        onChoisir={([nom, dep, lat, lon]) => {
          setMessage(null)
          setPrecision(null)
          onChange({ type: 'commune', cle: `${nom}|${dep}`, nom, point: { lat, lon } })
        }}
      />
    </fieldset>
  )
}
