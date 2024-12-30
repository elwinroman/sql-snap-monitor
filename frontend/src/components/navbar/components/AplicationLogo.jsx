import { NavLink } from 'react-router-dom'

import { APP_NAME, ROUTES } from '@/constants'

export function AplicationLogo() {
  return (
    <div>
      <NavLink to={ROUTES.HOME} className="flex gap-2 transition-colors">
        <span className="font-bold text-primary">{APP_NAME}</span>
      </NavLink>
    </div>
  )
}
