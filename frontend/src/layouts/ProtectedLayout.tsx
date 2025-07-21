import { isAxiosError } from 'axios'
import { OctagonAlert } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { CheckSessionResponse } from '@/adapters'
import { SessionExpiredAlert } from '@/components/SessionExpiredAlert'
import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { Error500 } from '@/pages'
import { checkSessionService } from '@/services'
import { useAuthStore } from '@/zustand'

export function ProtectedLayout({ children }: { children: ReactNode }) {
  const authContext = useAuthStore((state) => state.authContext)
  const errorApiConnection = useAuthStore((state) => state.errorApiConnection)
  const { error, callEndpoint } = useFetchAndLoad<CheckSessionResponse>()
  const [sessionExpired, setSessionExpired] = useState(false)
  const [viewDefinitionError, setViewDefinitionError] = useState(false)

  const checkSession = async () => {
    try {
      const response = await callEndpoint(checkSessionService())

      if (!response.data.statusDatabaseConn) setViewDefinitionError(true)
    } catch (err: unknown) {
      console.error('Error al intentar verificar la sesión: ', err)

      if (isAxiosError(err)) {
        const { status } = err

        // solo cierra sesión si es un error 4xx
        if (status && status >= 400 && status < 500) setSessionExpired(true)
      }
    }
  }

  // notificación de sesión expirada
  useEffect(() => {
    if (authContext) checkSession()
  }, [])

  if (!authContext) return <Navigate to="/aligment" />
  if (errorApiConnection) return <Error500 />

  //
  return (
    <>
      {sessionExpired && <SessionExpiredAlert></SessionExpiredAlert>}
      {viewDefinitionError && (
        <ErrorBanner>
          No tienes permisos para acceder a las <strong>VIEW DEFINITIONS</strong>. Por favor, contacta con tu administrador de BD para
          solicitar el acceso necesario.
        </ErrorBanner>
      )}
      {error && (
        <ErrorBanner>
          <strong>{error.title}</strong>
          <span> {error.detail}</span>
        </ErrorBanner>
      )}
      {children}
    </>
  )
}

interface Props {
  children: ReactNode
  className?: string
}
const ErrorBanner = ({ children, className = '' }: Props) => (
  <div className="flex w-full items-center justify-center gap-2 bg-[#B71D18] px-4 py-2 text-white/90">
    <OctagonAlert size={16} className="min-h-4 min-w-4" />
    <div className={`text-sm ${className}`}>{children}</div>
  </div>
)
