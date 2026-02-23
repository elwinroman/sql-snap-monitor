import { User } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { logoutService } from '@/services'
import { useAuthStore, useSysObjectStore } from '@/zustand'

export function LoginUsername() {
  const clearSession = useAuthStore((state) => state.clearSession)
  const authContext = useAuthStore((state) => state.authContext)
  const resetSysObject = useSysObjectStore((state) => state.reset)
  const { callEndpoint } = useFetchAndLoad()

  if (!authContext) return

  const closeSession = async () => {
    try {
      await callEndpoint(logoutService())

      clearSession()
      resetSysObject()
      useAuthStore.persist.clearStorage()
      useSysObjectStore.persist.clearStorage()
    } catch (err) {
      console.error('Error al intentar cerrar sesion: ', err)
    }
  }

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
