import { useCallback, useEffect, useRef, useState } from 'react'
import { ChoixCommune } from './ChoixCommune'
import { communeLaPlusProche } from './core/communes'
import { libelleOrigine, ORIGINE_DEFAUT, type Origine } from './core/origine'
import { communesDeFrance } from './communesFrance'
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
  const [reprendre, setReprendre] = useState(false)
  const dejaRelocalise = useRef(false)
  // Chaque geste prend un numéro ; une réponse de localisation qui arrive
  // après un autre geste (une commune choisie entre-temps) est ignorée : le
  // dernier geste l'emporte (revue code S21).
  const geste = useRef(0)

  const changer = useCallback(
    (o: Origine) => {
      geste.current += 1
      setMessage(null)
      setPrecision(null)
      setEnCours(false)
      setReprendre(false)
      onChange(o)
    },
    [onChange],
  )

  const autourDeMoi = useCallback(() => {
    geste.current += 1
    const moi = geste.current
    setEnCours(true)
    setMessage(null)
    setPrecision(null)
    setReprendre(false)
    localiser('geolocation' in navigator ? navigator.geolocation : undefined).then(
      ({ point, precisionM }) => {
        if (geste.current !== moi) return
        setEnCours(false)
        setPrecision(avertissementPrecision(precisionM))
        onChange({ type: 'position', point })
        // « Près de … » : la commune la plus proche, calculée ici. Le fichier
        // de toute la France, le même pour tous : un fichier choisi selon la
        // position la dirait au serveur (revues S21). Sans lui, on s'en passe.
        communesDeFrance().then(
          (index) => {
            if (geste.current !== moi) return
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
        if (geste.current !== moi) return
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
    // Sans permission déjà donnée (ou sans API des permissions, Safari
    // ancien), rien n'est demandé : l'écran dit comment reprendre.
    if (!('permissions' in navigator)) {
      void Promise.resolve().then(() => {
        setReprendre(true)
      })
      return
    }
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((p) => {
        if (p.state === 'granted') autourDeMoi()
        else setReprendre(true)
      })
      .catch(() => {
        setReprendre(true)
      })
  }, [relocaliser, autourDeMoi])

  const rienChoisi = origine.type === 'brignais'

  return (
    <fieldset className={rienChoisi ? 'depart depart-a-choisir' : 'depart'} data-testid="depart">
      <legend>
        {rienChoisi ? 'Par où commencer ?' : `Point de départ : ${libelleOrigine(origine)}`}
      </legend>
      {rienChoisi && reprendre && (
        <p className="champ-aide" data-testid="depart-reprendre">
          La dernière fois, vous partiez de votre position : touchez « Autour de moi » pour la
          reprendre.
        </p>
      )}
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
      <details className="confidentialite">
        {/* Replié derrière une phrase courte : en entier, il remplissait le
            premier écran et repoussait la liste à 2,2 écrans (revue globale
            S22). La phrase visible dit déjà l'essentiel, avant le bouton. */}
        <summary>Votre position reste dans ce téléphone. Ce qui part sur le réseau</summary>
        <p className="champ-aide" data-testid="confidentialite">
          « Autour de moi » utilise votre position seulement dans ce téléphone, pour calculer
          les distances : vos coordonnées ne sont envoyées à personne, et seul le choix
          « Autour de moi » est gardé, pas la position. Mais la carte se centre sur le point
          de départ — votre position ou la commune choisie — et charge auprès d’OpenStreetMap
          les images de cette zone : ce serveur voit donc cette zone, à quelques kilomètres
          près, et votre adresse IP — comme pour toute carte en ligne. Choisir une commune
          fait aussi demander à ce site la liste des communes de sa région.
        </p>
      </details>
      <div className="depart-actions">
        <button
          type="button"
          className="bouton-principal"
          onClick={autourDeMoi}
          disabled={enCours}
          data-testid="autour-de-moi"
        >
          {enCours ? 'Localisation…' : 'Autour de moi'}
        </button>
        {!rienChoisi && (
          <button
            type="button"
            onClick={() => {
              changer(ORIGINE_DEFAUT)
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
      {/* Remonté à chaque nouveau départ : rien de l'ancien ne sert pendant
          le chargement du nouveau (revue code S21). */}
      <ChoixCommune
        key={`${String(origine.point.lat)},${String(origine.point.lon)}`}
        depuis={origine.point}
        depuisPosition={origine.type === 'position'}
        onChoisir={([nom, dep, lat, lon]) => {
          changer({ type: 'commune', cle: `${nom}|${dep}`, nom, point: { lat, lon } })
        }}
      />
    </fieldset>
  )
}
