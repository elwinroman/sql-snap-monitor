import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { InputWithIcon } from '@/components/ui/input-with-icon'
import { Search as SearchIcon } from '@/icons/search'
import { Settings as SettingsIcon } from '@/icons/settings'
import { User as UserIcon } from '@/icons/user'

export function Header() {
  const handleKeyup = (e) => {
    e.preventDefault()
    const value = e.target.value.trim()

    if (value === '') return

    if (e.key === 'Enter') {
      console.log(value)
      // Actualizar el estado del stringCode para renderizar el codigo
    }
  }

  const logged = true
  return (
    <header className="w-full flex-[0_0_var(--navbar-height)]">
      <ul className="flex h-full flex-row items-center gap-4 px-4">
        <li className="grow">
          <div>1</div>
        </li>

        {/* Busqueda */}
        <li>
          <InputWithIcon
            size="default"
            startIcon={<SearchIcon width={20} height={20} />}
            placeholder="Search"
            onKeyUp={handleKeyup}
          />
        </li>

        {/* Login y user */}
        <li>
          {!logged ? (
            <Button variant="ghost" size="sm">
              <div className="flex items-center gap-1">
                <i>
                  <UserIcon width={16} height={16} />
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

        {/* Icono configuración */}
        <li>
          <Sheet>
            <SheetTrigger className="grid h-9 place-content-center rounded-md px-2 hover:bg-accent hover:text-accent-foreground">
              <i>
                <SettingsIcon width={16} height={16} />
              </i>
              {/* </Button> */}
            </SheetTrigger>
            <SheetContent side="right" className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Customización</SheetTitle>
                <SheetDescription>Customización theme.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </li>
      </ul>
    </header>
  )
}
