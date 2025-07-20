import '@fontsource-variable/fira-code'
import '@fontsource/barlow/800.css'
import '@fontsource/geist-sans/300.css'
import '@fontsource/geist-sans/400.css'
import '@fontsource/geist-sans/500.css'
import '@fontsource/geist-sans/600.css'
import '@fontsource/geist-sans/700.css'
import '@fontsource/geist-sans/800.css'
import '@fontsource/geist-sans/900.css'
import '@fontsource-variable/public-sans'
import './global.css'

import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

// Crea root y renderiza la app
const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('No se encontró el elemento con id "root"')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
