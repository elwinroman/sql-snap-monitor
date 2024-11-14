import './styles/navbar.css'

import { useLocation } from 'react-router-dom'

import { ROUTES } from '@/constants'

import { AplicationLogo, Configuration, GithubRepo, HamburguerMenu, LoginUsername, SearchInput } from './components'

export function Navbar() {
  const currentLocation = useLocation()

  return (
    <header id="navbar" className="w-full flex-[0_0_var(--navbar-height)] transition-all">
      <ul className="flex h-full flex-row items-center py-6">
        {/* Aplication logo */}
        <AplicationLogo />

        {/* Hamburguer menu */}
        <HamburguerMenu />

        {/* Input de búsqueda */}
        {(currentLocation.pathname === ROUTES.SQL_DEFINITION || currentLocation.pathname === ROUTES.USERTABLE) && <SearchInput />}

        {/* Usuario logueado o inicio de sesión */}
        <LoginUsername />

        {/* Icono configuración */}
        <Configuration />

        {/* Repo link */}
        <GithubRepo />
      </ul>
    </header>
  )
}
