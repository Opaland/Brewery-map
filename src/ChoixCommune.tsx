import { useEffect, useId, useMemo, useState } from 'react'
import { chercherCommunes, type CommuneFrance, type CommuneIndexee } from './core/communes'
import type { Point } from './core/distance'
import { communesDeFrance, communesProches, RAYON_PRES_KM } from './communesFrance'

interface Props {
  /** D'où chercher d'abord : le départ actuel. */
  depuis: Point
  /**
   * Le départ est la position de la personne : rien ne se charge qui en
   * dépende. Les fichiers par département désigneraient sa zone au serveur
   * de la page (revues S21) ; le fichier entier, le même pour tous, sert
   * alors, rangé du plus proche au plus loin.
   */
  depuisPosition: boolean
  onChoisir: (c: CommuneFrance) => void
}

type Etat = 'attente' | 'pret' | 'echec'

/**
 * Chercher une commune de France (S21, demande de Cédric du 16/10 : « Je
 * veux pouvoir chercher partout », plus de liste déroulante). Motif ARIA
 * « combobox » : flèches pour parcourir, Entrée pour choisir, Échap pour
 * fermer.
 *
 * Les communes à moins de 100 km du départ d'abord, chargées dès
 * l'affichage ; si rien n'y répond (Lille depuis Lyon), ou sur demande, toute
 * la France.
 */
export function ChoixCommune({ depuis, depuisPosition, onChoisir }: Props) {
  const id = useId()
  const [texte, setTexte] = useState('')
  const [proches, setProches] = useState<CommuneIndexee[]>([])
  const [etatProches, setEtatProches] = useState<Etat>('attente')
  const [toutes, setToutes] = useState<CommuneIndexee[] | null>(null)
  const [echecToutes, setEchecToutes] = useState(false)
  const [partout, setPartout] = useState(false)
  const [active, setActive] = useState(0)
  const [ouvert, setOuvert] = useState(false)

  useEffect(() => {
    let vivant = true
    ;(depuisPosition ? communesDeFrance() : communesProches(depuis)).then(
      (index) => {
        if (!vivant) return
        setProches(index)
        setEtatProches('pret')
      },
      () => {
        if (vivant) setEtatProches('echec')
      },
    )
    return () => {
      vivant = false
    }
  }, [depuis, depuisPosition])

  const pres = useMemo(() => chercherCommunes(proches, texte, 8, depuis), [proches, texte, depuis])
  // Rien près du départ, ou demandé : toute la France.
  const chercherPartout = partout || (etatProches !== 'attente' && pres.length === 0)

  useEffect(() => {
    if (!chercherPartout || toutes !== null || texte.trim().length < 2) return
    let vivant = true
    communesDeFrance().then(
      (index) => {
        if (!vivant) return
        setToutes(index)
        setEchecToutes(false)
      },
      () => {
        if (vivant) setEchecToutes(true)
      },
    )
    return () => {
      vivant = false
    }
  }, [chercherPartout, toutes, texte])

  const resultatsBruts = useMemo(() => {
    if (!chercherPartout || toutes === null) return pres
    const loin = chercherCommunes(toutes, texte, 8)
    const deja = new Set(pres.map((c) => `${c[0]}|${c[1]}`))
    return [...pres, ...loin.filter((c) => !deja.has(`${c[0]}|${c[1]}`))].slice(0, 8)
  }, [chercherPartout, toutes, pres, texte])
  const resultats = resultatsBruts
  // L'option active reste dans la liste quand celle-ci rétrécit (revue code S21).
  const actif = Math.min(active, Math.max(resultats.length - 1, 0))

  const choisir = (c: CommuneFrance) => {
    onChoisir(c)
    setTexte('')
    setOuvert(false)
    setPartout(false)
  }

  const montrer = ouvert && texte.trim().length >= 2
  const idListe = `${id}-liste`
  const idOption = (i: number) => `${id}-option-${String(i)}`

  let statut = ''
  if (montrer) {
    if (chercherPartout && toutes === null && !echecToutes) statut = 'Recherche dans toute la France…'
    else if (chercherPartout && echecToutes)
      statut = 'La liste de toutes les communes n’a pas pu se charger (connexion ?).'
    else if (etatProches === 'echec' && !chercherPartout)
      statut = 'Les communes proches n’ont pas pu se charger (connexion ?).'
    else if (resultats.length === 0) statut = 'Aucune commune ne correspond.'
    else
      statut = `${String(resultats.length)} commune${resultats.length > 1 ? 's' : ''} ${
        chercherPartout || depuisPosition
          ? 'en France'
          : // Les départements à moins de 100 km, pas chaque commune : la
            // Villefranche de l'Allier en est, à 150 km (vu en S23).
            `dans les départements à moins de ${String(RAYON_PRES_KM)} km`
      }.`
  }

  return (
    <div className="choix-commune">
      <label className="champ">
        <span>Ou partir d’une commune, partout en France</span>
        <input
          type="search"
          role="combobox"
          aria-expanded={montrer && resultats.length > 0}
          aria-controls={idListe}
          aria-autocomplete="list"
          aria-activedescendant={montrer && resultats.length > 0 ? idOption(actif) : undefined}
          value={texte}
          placeholder="ex. Lyon, Annecy, Lille…"
          autoComplete="off"
          onChange={(e) => {
            setTexte(e.target.value)
            setActive(0)
            setOuvert(true)
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' && resultats.length > 0) {
              e.preventDefault()
              setOuvert(true)
              setActive((actif + 1) % resultats.length)
            } else if (e.key === 'ArrowUp' && resultats.length > 0) {
              e.preventDefault()
              setActive((actif - 1 + resultats.length) % resultats.length)
            } else if (e.key === 'Enter' && montrer) {
              const c = resultats[actif]
              if (c !== undefined) {
                e.preventDefault()
                choisir(c)
              }
            } else if (e.key === 'Escape') {
              setOuvert(false)
            }
          }}
          data-testid="commune-depart"
        />
      </label>
      <p className="champ-aide" role="status" data-testid="commune-statut">
        {statut}
      </p>
      {montrer && resultats.length > 0 && (
        <ul className="choix-commune-liste" role="listbox" id={idListe} aria-label="Communes">
          {resultats.map((c, i) => (
            <li
              key={`${c[0]}|${c[1]}`}
              id={idOption(i)}
              role="option"
              aria-selected={i === actif}
              className={i === actif ? 'active' : undefined}
              onMouseDown={(e) => {
                // Garde le focus dans le champ jusqu'au choix.
                e.preventDefault()
              }}
              onClick={() => {
                choisir(c)
              }}
            >
              {c[0]} <span className="choix-commune-dep">({c[1]})</span>
            </li>
          ))}
        </ul>
      )}
      {montrer && !chercherPartout && !depuisPosition && etatProches === 'pret' && (
        <button
          type="button"
          className="lien-bouton"
          onClick={() => {
            setPartout(true)
          }}
          data-testid="chercher-partout"
        >
          Chercher dans toute la France
        </button>
      )}
    </div>
  )
}
