import { useLocation } from 'react-router-dom'

import { ROUTES } from '@/constants'

import { AplicationLogo, Configuration, GithubRepo, LoginUsername, Search, ThemeToggle } from './components'
import { SearchProvider } from './components/search/context/search'

export function Navbar({ className }) {
  const currentLocation = useLocation()

  return (
    <header id="navbar" className={`w-full flex-[0_0_var(--navbar-height)] transition-all ${className}`}>
      <ul className="flex flex-row items-center h-full py-6">
        {/* Aplication logo */}
        <AplicationLogo />

        {/* Espacio blanco */}
        <div className="flex-grow"></div>

        {/* Input de búsqueda */}
        {(currentLocation.pathname === ROUTES.SQL_DEFINITION || currentLocation.pathname === ROUTES.USERTABLE) && (
          // <SearchInput key={currentLocation.pathname} />
          <SearchProvider>
            <Search />
          </SearchProvider>
        )}

        {/* Usuario logueado o inicio de sesión */}
        <LoginUsername />

        {/* Icono configuración */}
        {/* <Configuration /> */}

        {/* Theme toggle (dark/light) */}
        <ThemeToggle />

        {/* Repo link */}
        <GithubRepo />
      </ul>
    </header>
  )
}
