import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { User as UserIcon } from '@/icons/user'

export function LoginUsername() {
  const logged = true

  return (
    <li>
      {!logged ? (
        <Button variant="ghost" size="sm">
          <div className="flex items-center gap-1">
            <i>
              <UserIcon width={20} height={20} />
            </i>
            <span className="select-none text-sm font-semibold">
              Iniciar sesión
            </span>
          </div>
        </Button>
      ) : (
        <div className="grid h-9 place-content-center px-3">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>QA</AvatarFallback>
                </Avatar>
                <span className="select-none text-sm font-semibold">
                  aroman
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" sideOffset={10}>
              <DropdownMenuLabel>Mi cuenta SQL</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </li>
  )
}
