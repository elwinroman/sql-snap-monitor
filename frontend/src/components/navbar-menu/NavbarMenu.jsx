import { useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { ROUTES } from '@/constants'

export function NavbarMenu() {
  const currentLocation = useLocation()

  const menuBackdrop = useRef()
  const menuContainer = useRef()

  const menuList = [
    {
      id: 1,
      title: 'Definición SQL',
      href: ROUTES.SQL_DEFINITION,
    },
    {
      id: 2,
      title: 'Tabla de usuario',
      href: ROUTES.USERTABLE,
    },
  ]

  /**
   * Ajusta la posición y el tamaño del fondo dinámico en función de la posición del elemento sobre el que se hace hover.
   * @param {Object} e - El evento del mouse para obtener el elemento actual.
   */
  const handleMouseEnter = (e) => {
    const { top, left, width, height } = e.currentTarget.getBoundingClientRect()

    menuBackdrop.current.style.setProperty('--left', `${left}px`)
    menuBackdrop.current.style.setProperty('--top', `${top}px`)
    menuBackdrop.current.style.setProperty('--width', `${width}px`)
    menuBackdrop.current.style.setProperty('--height', `${height}px`)

    menuBackdrop.current.style.opacity = '1'
    menuBackdrop.current.style.visibility = 'visible'
  }

  /**
   * Oculta el fondo dinámico cuando el mouse deja el área del elemento del menú.
   */
  const handleMouseLeave = () => {
    menuBackdrop.current.style.opacity = '0'
    menuBackdrop.current.style.visibility = 'hidden'
  }

  return (
    <>
      <ul
        ref={menuContainer}
        className="flex flex-nowrap overflow-x-auto overflow-y-hidden border-b border-b-zinc-700 pb-1.5"
        style={{ scrollbarColor: 'transparent transparent', scrollBehavior: 'smooth' }}
      >
        {menuList.map((menu) => (
          <li key={menu.id}>
            <NavLink
              className={`group relative z-10 inline-block rounded-sm px-3 py-1.5 transition-colors before:absolute before:left-0 before:top-[40px] before:w-full before:content-[''] ${currentLocation.pathname === menu.href ? 'before:border-b-4 before:border-b-zinc-300' : ''} `}
              to={menu.href}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className={`text-nowrap font-['Geist_Sans'] text-sm transition-colors group-hover:text-zinc-200 ${currentLocation.pathname === menu.href ? 'text-zinc-200' : 'text-neutral-500'} `}
              >
                {menu.title}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/*  Hover menú dinámico (Similar a vercel) */}
      <div
        ref={menuBackdrop}
        className={`pointer-events-none fixed left-0 top-0 h-[var(--height)] w-[var(--width)] translate-x-[var(--left)] translate-y-[var(--top)] rounded-sm bg-zinc-700/50 opacity-0 backdrop-blur-lg transition-all duration-200 ease-in-out`}
      ></div>
    </>
  )
}
