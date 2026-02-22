import { ChevronRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui'
import { AppRoutes } from '@/constants'
import { APP_NAME } from '@/enviroment/enviroment'
import { useAuthStore } from '@/zustand'

import { SwitchDatabase } from './SwitchDatabase'

interface Props {
  className?: string
}

export function AplicationLogo({ className = '' }: Props) {
  const authContext = useAuthStore((state) => state.authContext)

  if (!authContext) throw new Error('Error al obtener informcación de login: ')

  return (
    <div className={`${className}`}>
      <div className="flex w-fit items-center gap-2 transition-colors">
        <NavLink to={AppRoutes.Home} className="text-primary font-bold">
          {APP_NAME}
        </NavLink>
        <span className="text-secondary">/</span>

        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <span className="text-secondary text-sm">{authContext.database}</span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="flex items-center gap-0.5">
              <span className="text-color-primary">{authContext.server}</span>
              <ChevronRight className="text-cyan-500" size={12} />
              <span className="text-color-primary">{authContext.database}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <SwitchDatabase />
      </div>
    </div>
  )
}
