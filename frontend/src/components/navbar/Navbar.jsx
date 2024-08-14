import { Configuration } from './components/Configuration'
import { HamburguerMenu } from './components/HamburguerMenu'
import { LoginUsername } from './components/LoginUsername'
import { SearchInput } from './components/SearchInput'

export function Navbar() {
  return (
    <header className="w-full flex-[0_0_var(--navbar-height)] border-b border-b-zinc-800">
      <ul className="flex h-full flex-row items-center gap-4 px-4">
        {/* Hamburguer menu */}
        <HamburguerMenu />

        {/* White space (ocupa el maximo espacio) */}
        <div className="grow"></div>

        {/* Input de búsqueda */}
        <SearchInput />

        {/* Usuario logueado o inicio de sesión */}
        <LoginUsername />

        {/* Icono configuración */}
        <Configuration />
      </ul>
    </header>
  )
}
