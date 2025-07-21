import { useSearchContext } from '@aligment/hooks'
import { ArrowBigLeft, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { CircleLoader } from '@/components/loader'
import { LoginUsername, ThemeToggle } from '@/components/navbar/components'
import { Checkbox } from '@/components/ui'
import { AppRoutes } from '@/constants'
import { APP_NAME } from '@/enviroment/enviroment'
import { useAppStore, useAuthStore } from '@/zustand'

import { ButtonGroup, SearchAligment, ViewModeSelect } from './components'

interface Props {
  className?: string
}

export function MenuSidebar({ className = '' }: Props) {
  const navigate = useNavigate()
  const authContext = useAuthStore((state) => state.authContext)
  const isDark = useAppStore((state) => state.isDark)
  const { loading } = useSearchContext()

  const backNavigation = () => navigate(-1)
  const redirectLogin = () => navigate(AppRoutes.Login)

  return (
    <nav className={`${className} mix-colored-background overflow-x-hidden overflow-y-auto shadow-xl`}>
      <header className="border-border flex h-[53px] min-h-[53px] items-center border-b px-6">
        {authContext ? (
          <button className="hover:bg-action-hover flex h-10 items-center gap-2 rounded-sm px-2 transition-colors" onClick={backNavigation}>
            <ArrowBigLeft size={18} />

            <span className="text-sm">Regresar</span>
          </button>
        ) : (
          <div className="flex w-full items-center justify-between">
            <span className="text-primary font-bold">{APP_NAME}</span>
            <ThemeToggle />
          </div>
        )}
      </header>

      <div className="grow px-4 py-8 md:px-6">
        <div className="flex flex-col gap-6">
          {/* Texto */}
          <div className="flex flex-col gap-3">
            <h4 className="text-primary text-sm font-bold">CONSULTA DE OBJETOS PARA ALINEACIÓN</h4>

            <span className="text-secondary text-sm text-balance">
              Recupera los objetos alineados a <strong>pre-producción</strong> y dí adios a observaciones por desvío de ambientes
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {/* Radio options */}
            <ViewModeSelect />

            {/* Input */}
            <SearchAligment />
          </div>

          {/* Términos y condiciones */}
          <div>
            <label className="flex gap-2">
              <Checkbox disabled={true} checked={true} className="mt-1" />
              <span className="text-secondary text-[14px]">Al realizar la consulta acepto que mis datos sean recopilados.</span>
            </label>
          </div>

          {/* Buttons */}
          <ButtonGroup />

          {/* Loader */}
          {loading && (
            <div className="relative mt-4">
              <CircleLoader size={20} visible={true} color={isDark ? 'white' : 'black'} />
            </div>
          )}
        </div>
      </div>

      <footer className="flex h-20 min-h-14 items-center px-6">
        {!authContext ? (
          <button className="hover:bg-action-hover flex h-10 items-center gap-2 rounded-sm px-2 transition-colors" onClick={redirectLogin}>
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
