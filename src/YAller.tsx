import { destination, liensItineraire, plateformeDe } from './core/itineraire'
import type { Brasserie } from './core/schema'

/**
 * « Y aller » (S19, persona Hugo) : l'application de navigation est au choix
 * de la personne, et le lien n'emporte que la destination
 * (`src/core/itineraire.ts`). Sans adresse, l'écran dit où mène vraiment
 * l'itinéraire : au point de la carte, approximatif.
 */
export function YAller({ brasserie }: { brasserie: Brasserie }) {
  const d = destination(brasserie)
  return (
    <div className="fiche-y-aller" data-testid="fiche-y-aller">
      <p className="fiche-titre">Y aller</p>
      {d.mode === 'commune' && (
        <p className="fiche-aide" data-testid="y-aller-commune">
          Adresse inconnue : l’itinéraire mène au point de la carte, à environ 2 km près, pas
          à la brasserie.
        </p>
      )}
      <ul className="fiche-liens">
        {liensItineraire(brasserie, plateformeDe(navigator.userAgent)).map((l) => (
          <li key={l.appli}>
            <a href={l.url} target="_blank" rel="noopener noreferrer">
              {l.appli}
              <span className="lecteur-seul"> : itinéraire vers {brasserie.n}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="fiche-aide">
        Le lien ne contient que la destination. Votre position, l’application choisie la prend
        elle-même si vous le lui permettez.
      </p>
    </div>
  )
}
