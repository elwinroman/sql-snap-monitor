import { NavLink } from 'react-router-dom'

import { AppRoutes } from '@/constants'
import { APP_NAME } from '@/enviroment/enviroment'

interface Props {
  className?: string
}

export function AplicationLogo({ className = '' }: Props) {
  return (
    <div className={`${className}`}>
      <NavLink to={AppRoutes.Home} className={`flex gap-2 transition-colors`}>
        <span className="text-primary font-bold">{APP_NAME}</span>
      </NavLink>
    </div>
  )
}
