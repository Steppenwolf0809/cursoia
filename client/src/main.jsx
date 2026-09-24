import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './tema-avanzado.css'
import App from './App.jsx'
import { ES_AVANZADO } from './data/cursos'

// Tema del curso avanzado: clase raíz y fuentes de Google, solo con VITE_COURSE=avanzado.
if (ES_AVANZADO) {
  document.documentElement.classList.add('tema-avanzado')
  const fuentes = document.createElement('link')
  fuentes.rel = 'stylesheet'
  fuentes.href = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap'
  document.head.appendChild(fuentes)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
