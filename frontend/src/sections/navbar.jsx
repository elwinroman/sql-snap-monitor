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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Database as DatabaseIcon } from '@/icons/database'
import { InputWithIcon } from '@/components/ui/input-with-icon'
import { Search as SearchIcon } from '@/icons/search'
import { Settings as SettingsIcon } from '@/icons/settings'
import { User as UserIcon } from '@/icons/user'

export function Navbar({ object, updateNameObject }) {
  const handleKeyup = (e) => {
    e.preventDefault()
    const value = e.target.value.trim()

    if (value === '') return
    if (value === object.name) return

    if (e.key === 'Enter') {
      updateNameObject({ name: value })
      // Actualizar el estado del stringCode para renderizar el codigo
    }
  }

  const logged = true
  return (
    <header className="w-full flex-[0_0_var(--navbar-height)]">
      <ul className="gap- flex h-full flex-row items-center">
        {/* Info del objeto */}
        <li className="grow">
          <article className="flex w-fit gap-8 rounded-md bg-indigo-100 px-3 py-2 dark:bg-indigo-900">
            <div className="flex gap-2">
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-1">
                    <i>
                      <DatabaseIcon width={18} height={18} />
                    </i>
                    <span className="font-semibold text-slate-800 dark:text-red-100">
                      SI_BDFinanciero
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Nombre database</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger className="grid place-content-center">
                    <span className="rounded-md border border-slate-400 px-1 pb-0.5 text-xs outline-none dark:border-indigo-200">
                      dbo
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Schema</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger className="grid place-content-center">
                    <span className="font-semibold text-rose-600 dark:text-rose-500">
                      SI_FinCreditos
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Nombre del objeto</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Badge className="rounded-md text-sm font-bold">P</Badge>
          </article>
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
