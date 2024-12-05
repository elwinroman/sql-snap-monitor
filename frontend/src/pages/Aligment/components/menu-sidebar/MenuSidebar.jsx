import { ArrowBigLeft, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { LoginUsername } from '@/components/navbar/components'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuthStore } from '@/stores'

import { ButtonGroup, SearchAligment, SelectAction, ViewModeRadio } from './components'

export function MenuSidebar({ className }) {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const backNavigation = () => navigate(-1)
  const redirectLogin = () => navigate('/login')

  return (
    <nav className={`${className} overflow-y-auto overflow-x-hidden bg-card-strong shadow-xl`}>
      <header className="flex h-[53px] min-h-[53px] items-center border-b border-border px-6">
        {isAuthenticated ? (
          <button
            className="flex h-10 items-center gap-2 rounded-sm px-2 transition-colors hover:bg-background-alternate"
            onClick={backNavigation}
          >
            <ArrowBigLeft size={18} />

            <span className="text-sm">Regresar</span>
          </button>
        ) : (
          <span className="font-bold text-primary">Quality Tools</span>
        )}
      </header>

      <div className="flex-grow px-4 py-8 md:px-6">
        <div className="flex flex-col gap-6">
          {/* Texto */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-primary">CONSULTA DE OBJETOS PARA ALINEACIÓN</h4>

            <span className="text-balance text-sm text-primary">
              Recupera los objetos alineados a <strong>pre-producción</strong> y dí adios a observaciones por desvío de ambientes
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {/* Action */}
            <SelectAction />

            {/* Radio options */}
            <ViewModeRadio />
          </div>

          {/* Input */}
          <SearchAligment />

          {/* Términos y condiciones */}
          <div>
            <label className="flex gap-2">
              <Checkbox disabled={true} checked={true} className="mt-1" />
              <span className="text-[14px] text-secondary">Al realizar la consulta acepto que mis datos sean recopilados.</span>
            </label>
          </div>

          {/* Buttons */}
          <ButtonGroup />
        </div>
      </div>

      <footer className="flex h-20 min-h-14 items-center px-6">
        {!isAuthenticated ? (
          <button
            className="flex h-10 items-center gap-2 rounded-sm px-2 transition-colors hover:bg-background-alternate"
            onClick={redirectLogin}
          >
            <User size={18} />
            <span className="text-sm">Iniciar sesión</span>
          </button>
        ) : (
          <LoginUsername />
        )}
      </footer>
    </nav>
  )
}
