import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'

const racine = document.getElementById('root')
if (racine) {
  createRoot(racine).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
