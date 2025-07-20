import { User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { logoutService } from '@/services'
// import { resetAllStores } from '@/utilities'
import { useAuthStore } from '@/zustand'

export function LoginUsername() {
  const clearSession = useAuthStore((state) => state.clearSession)
  const authContext = useAuthStore((state) => state.authContext)
  const { loading, callEndpoint } = useFetchAndLoad()

  if (!authContext) return

  const closeSession = async () => {
    try {
      await callEndpoint(logoutService())

      clearSession()
      useAuthStore.persist.clearStorage()
    } catch (err) {
      console.error('Error al intentar cerrar sesion: ', err)
    }
    // resetAllStores()
  }

  if (loading) return <div>Cerrando sesion</div>

  return (
    <li className="list-none">
      <div className="grid h-9 place-content-center px-3">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="group flex items-center gap-2">
              <Avatar>
                <AvatarImage src="shadcn-profile-morty.jpg" />
                <AvatarFallback>QA</AvatarFallback>
              </Avatar>
              <span className="text-secondary group-hover:text-primary hidden text-sm font-medium transition-colors select-none md:block">
                {authContext.username}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" sideOffset={10}>
            <DropdownMenuLabel>Mi cuenta SQL</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button onClick={closeSession} className="flex gap-1">
                <User size={14} />
                <span>Cerrar sesión</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  )
}
