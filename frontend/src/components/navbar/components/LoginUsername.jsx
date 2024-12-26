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
import { useAuthStore, useSQLDefinitionStore, useUserTableStore } from '@/stores'

export function LoginUsername() {
  const logoutUser = useAuthStore((state) => state.logoutUser)
  const username = useAuthStore((state) => state.username)
  const resetSQLDefinitionStore = useSQLDefinitionStore((state) => state.reset)
  const resetUserTableStore = useUserTableStore((state) => state.reset)

  const closeSession = async (e) => {
    await logoutUser()
    await resetSQLDefinitionStore()
    await resetUserTableStore()
    await useSQLDefinitionStore.persist.clearStorage()
    await useUserTableStore.persist.clearStorage()
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
              <span className="hidden select-none text-sm font-medium text-secondary transition-colors group-hover:text-primary md:block">
                {username}
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
