import { NavLink } from 'react-router-dom'

import { APP_NAME, ROUTES } from '@/constants'

export function AplicationLogo({ classname }) {
  return (
    <div className={`${classname}`}>
      <NavLink to={ROUTES.HOME} className={`flex gap-2 transition-colors`}>
        <span className="text-primary font-bold">{APP_NAME}</span>
      </NavLink>
    </div>
  )
}
