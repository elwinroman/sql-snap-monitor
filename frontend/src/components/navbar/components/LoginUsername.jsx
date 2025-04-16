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
import { useAuthStore } from '@/stores'
import { resetAllStores } from '@/utilities'

export function LoginUsername() {
  const logoutUser = useAuthStore((state) => state.logoutUser)
  const username = useAuthStore((state) => state.username)

  const closeSession = () => {
    logoutUser()
    resetAllStores()
  }

  return (
    <li className="list-none">
      <div className="grid px-3 h-9 place-content-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2 group">
              <Avatar>
                <AvatarImage src="shadcn-profile-morty.jpg" />
                <AvatarFallback>QA</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium transition-colors select-none text-secondary group-hover:text-primary md:block">
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
