// Les deux parts de `data/breweries.json`, découpées au build (S294,
// `build/decouper-donnees.ts`). Dans l'application, leur type réel est posé
// par `src/core/donnees.ts`, seul module de `src/` qui les importe.
declare module '*breweries.json?premier-ecran' {
  const fiches: unknown
  export default fiches
}
declare module '*breweries.json?suite' {
  const fiches: unknown
  export default fiches
}
