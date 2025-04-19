import { useLocation } from 'react-router-dom'

import { ROUTES } from '@/constants'

import { AplicationLogo, GithubRepo, LoginUsername, NavbarMenu, Search, ThemeToggle } from './components'
import { SearchProvider } from './components/search/context/search'

export function Navbar({ className }) {
  const currentLocation = useLocation()

  return (
    <header id="navbar" className={`w-full flex-[0_0_var(--navbar-height)] transition-all ${className}`}>
      <ul className="flex h-full flex-col items-center justify-between gap-3 py-6 sm:flex-row sm:flex-wrap">
        {/* Aplication logo */}
        <AplicationLogo classname="flex-[1_1_0]" />

        {/* Menu de navegación */}
        <NavbarMenu className="w-full sm:w-auto" />

        <div className="flex flex-[1_1_0] flex-row items-center justify-end">
          {/* Input de búsqueda */}
          {(currentLocation.pathname === ROUTES.SQL_DEFINITION || currentLocation.pathname === ROUTES.USERTABLE) && (
            <SearchProvider>
              <Search />
            </SearchProvider>
          )}

          {/* Usuario logueado o inicio de sesión */}
          <LoginUsername />

          {/* Theme toggle (dark/light) */}
          <ThemeToggle />

          {/* Repo link */}
          <GithubRepo />
        </div>
      </ul>
    </header>
  )
}
