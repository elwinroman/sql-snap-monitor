import { Configuration } from './components/Configuration'
import { InfoObject } from './components/InfoObject'
import { LoginUsername } from './components/LoginUsername'
import { SearchInput } from './components/SearchInput'

export function Navbar() {
  return (
    <header className="w-full flex-[0_0_var(--navbar-height)]">
      <ul className="gap- flex h-full flex-row items-center">
        {/* Info del objeto */}
        <InfoObject />

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
