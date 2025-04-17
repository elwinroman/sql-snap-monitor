import { useLocation } from 'react-router-dom'

import { ROUTES } from '@/constants'

import { AplicationLogo, Configuration, GithubRepo, LoginUsername, NavbarMenu, Search, ThemeToggle } from './components'
import { SearchProvider } from './components/search/context/search'

export function Navbar({ className }) {
  const currentLocation = useLocation()

  return (
    <header id="navbar" className={`w-full flex-[0_0_var(--navbar-height)] transition-all ${className}`}>
      <ul className="flex flex-row items-center h-full gap-10 py-6">
        {/* Aplication logo */}
        <AplicationLogo />

        {/* Menu de navegación */}
        <NavbarMenu className="flex-grow" />

        <div className="flex flex-row items-center justify-center">
          {/* Input de búsqueda */}
          {(currentLocation.pathname === ROUTES.SQL_DEFINITION || currentLocation.pathname === ROUTES.USERTABLE) && (
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
        </div>
      </ul>
    </header>
  )
}
