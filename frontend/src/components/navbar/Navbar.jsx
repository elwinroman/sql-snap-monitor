import './styles/navbar.css'

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'

import { AplicationLogo, Configuration, GithubRepo, HamburguerMenu, LoginUsername, NavMenu, SearchInput } from './components'

export function Navbar() {
  const currentLocation = useLocation()
  const [isFixed, setIsFixed] = useState(false)

  useEffect(() => {
    const App = document.querySelector('.App')

    const handleScroll = () => {
      App.scrollTop > 80 ? setIsFixed(true) : setIsFixed(false)
    }

    window.addEventListener('scroll', handleScroll, true)

    // Limpiar el evento al desmontar el componente
    return () => {
      App.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      id="navbar"
      className={`w-full flex-[0_0_var(--navbar-height)] transition-all ${isFixed ? 'fixed top-0 z-50 max-w-screen-2xl py-4 backdrop-blur-[4px]' : 'static'}`}
    >
      <ul className="flex h-full flex-row items-center gap-4 px-4">
        {/* Aplication logo */}
        <AplicationLogo />

        {/* Hamburguer menu */}
        <HamburguerMenu />

        {/* White space (ocupa el maximo espacio) */}
        <NavMenu className="flex-grow" />

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
