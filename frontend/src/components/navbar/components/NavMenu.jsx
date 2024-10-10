import * as React from 'react'
import { NavLink } from 'react-router-dom'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'

const components = [
  {
    title: 'Obtener definición SQL',
    href: ROUTES.SQL_DEFINITION,
    description: 'Accede a las definiciones SQL de un objeto.',
  },
  {
    title: 'Obtener usertable',
    href: ROUTES.USERTABLE,
    description: 'Consulta a detalle las tablas de usuario.',
  },
]

export function NavMenu({ className }) {
  return (
    <div className={className}>
      <NavigationMenu delayDuration={150}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Objetos</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* <NavigationMenuItem asChild>
            <NavLink to="/definition" className={navigationMenuTriggerStyle()}>
              Diff editor
            </NavLink>
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <NavLink
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
          to={props.href}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-3 text-balance text-sm leading-snug text-muted-foreground">{children}</p>
        </NavLink>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
