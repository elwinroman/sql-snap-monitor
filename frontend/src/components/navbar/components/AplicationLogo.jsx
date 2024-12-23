import { NavLink } from 'react-router-dom'

import { ROUTES } from '@/constants'

export function AplicationLogo() {
  return (
    <div>
      <NavLink to={ROUTES.HOME} className="flex gap-2 transition-colors">
        <span className="font-['Dela_Gothic_One'] text-sm text-primary">SQL SnapMonitor</span>
      </NavLink>
    </div>
  )
}
