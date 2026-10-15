import { CATEGORIES } from './core/schema'

/**
 * Coquille de S1 : elle annonce ce que l'application fera, et dit sans
 * détour qu'elle ne le fait pas encore. Une page publiée qui laisserait
 * croire le contraire mentirait à la première personne qui l'ouvre.
 */
export function App() {
  return (
    <div className="page">
      <header className="entete">
        <h1>Mousse de Poche</h1>
        <p className="sous-titre">Les brasseries artisanales autour de vous, et ce qu’on peut y faire.</p>
      </header>

      <main className="contenu">
        <p className="avertissement" data-testid="etat-construction">
          <strong>En construction.</strong> La carte et la liste des brasseries
          ne sont pas encore en ligne.
        </p>

        <h2>Ce que chaque fiche dira</h2>
        <ul className="categories">
          {([1, 2, 3, 0] as const).map((code) => (
            <li key={code}>{CATEGORIES[code]}</li>
          ))}
        </ul>
        <p>
          « À confirmer » n’est pas une erreur : c’est le statut d’une brasserie
          dont la vente ou l’accueil n’ont pas pu être établis par une source.
        </p>
      </main>

      <footer className="pied">
        <p data-testid="mention-alcool">
          L’abus d’alcool est dangereux pour la santé, à consommer avec modération.
        </p>
        <p>
          <a href="https://github.com/Opaland/Brewery-map">Code source</a>
        </p>
      </footer>
    </div>
  )
}
