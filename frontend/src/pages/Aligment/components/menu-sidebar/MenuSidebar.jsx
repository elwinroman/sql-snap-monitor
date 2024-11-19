import { ArrowBigLeft, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Checkbox } from '@/components/ui/checkbox'

import { ButtonGroup, SearchAligment, SelectAction, ViewModeRadio } from './components'

export function MenuSidebar({ className }) {
  const navigate = useNavigate()

  const backNavigation = () => navigate(-1)
  const redirectLogin = () => navigate('/login')

  return (
    <nav className={`${className} font-['Geist_Sans']`}>
      <header className="flex h-14 items-center border-b border-zinc-700 px-6">
        <button className="flex h-10 items-center gap-2 rounded-sm px-2 transition-colors hover:bg-zinc-700" onClick={backNavigation}>
          <i>
            <ArrowBigLeft size={18} />
          </i>

          <span className="text-sm">Regresar</span>
        </button>
      </header>

      <div className="flex-grow px-4 py-8 md:px-6">
        <div className="flex flex-col gap-6">
          {/* Texto */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-zinc-200">CONSULTA DE OBJETOS PARA ALINEACIÓN</h4>

            <span className="text-sm text-zinc-200">
              Recupera los objetos alineados a <strong>pre-producción</strong> y dí adios a observaciones por devío de ambientes
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
              <span className="text-sm text-zinc-300">Al realizar la consulta acepto que mis datos sean recopilados.</span>
            </label>
          </div>

          {/* Buttons */}
          <ButtonGroup />
        </div>
      </div>

      <footer className="flex h-20 items-center border-b border-t border-zinc-700 px-6">
        <button className="flex h-10 items-center gap-2 rounded-sm px-2 transition-colors hover:bg-zinc-700" onClick={redirectLogin}>
          <i>
            <User size={18} />
          </i>

          <span className="text-sm">Iniciar sesión</span>
        </button>
      </footer>
    </nav>
  )
}
