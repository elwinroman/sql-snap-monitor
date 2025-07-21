import { useLocation } from 'react-router-dom'

import { AppRoutes } from '@/constants'
import { ENABLE_NAVBAR_REPO_LINK } from '@/enviroment/enviroment'

import { AplicationLogo, GithubRepo, LoginUsername, NavbarMenu, Search, ThemeToggle } from './components'
import { SearchProvider } from './components/search/context/search'

interface Props {
  className?: string
}

export function Navbar({ className = '' }: Props) {
  const currentLocation = useLocation()

  return (
    <header id="navbar" className={`w-full flex-[0_0_var(--navbar-height)] shadow transition-all dark:shadow-none ${className}`}>
      <ul className="flex h-full flex-col items-center justify-between gap-3 py-6 sm:flex-row sm:flex-wrap">
        {/* Aplication logo */}
        <AplicationLogo className="flex-[1_1_0]" />

        {/* Menu de navegación */}
        <NavbarMenu className="w-full sm:w-auto" />

        <div className="flex flex-[1_1_0] flex-row items-center justify-end gap-2">
          {/* Input de búsqueda */}
          {(currentLocation.pathname === AppRoutes.SQL_DEFINITION || currentLocation.pathname === AppRoutes.USERTABLE) && (
            <SearchProvider>
              <Search />
            </SearchProvider>
          )}

          {/* Usuario logueado o inicio de sesión */}
          <LoginUsername />

          {/* Theme toggle (dark/light) */}
          <ThemeToggle />

          {/* Repo link */}
          {ENABLE_NAVBAR_REPO_LINK && <GithubRepo />}
        </div>
      </ul>
    </header>
  )
}
