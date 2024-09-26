import { Configuration } from './components/Configuration'
import { HamburguerMenu } from './components/HamburguerMenu'
import { LoginUsername } from './components/LoginUsername'
import { SearchInput } from './components/SearchInput'
import { NavMenu } from './components/NavMenu'
import { useLocation } from 'react-router-dom'

export function Navbar() {
  const currentLocation = useLocation()
  return (
    <header className="w-full flex-[0_0_var(--navbar-height)]">
      <ul className="flex h-full flex-row items-center gap-4 px-4">
        {/* Hamburguer menu */}
        <HamburguerMenu />

        {/* White space (ocupa el maximo espacio) */}
        <NavMenu className="flex-grow" />

        {/* Input de búsqueda */}
        {(currentLocation.pathname === '/definition' ||
          currentLocation.pathname === '/description') && <SearchInput />}

        {/* Usuario logueado o inicio de sesión */}
        <LoginUsername />

        {/* Icono configuración */}
        <Configuration />
      </ul>
    </header>
  )
}
