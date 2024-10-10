import { NavLink } from 'react-router-dom'

import { ROUTES } from '@/constants'

export function AplicationLogo() {
  return (
    <div>
      <NavLink to={ROUTES.HOME} className="flex gap-2 transition-colors hover:text-zinc-200">
        <span className="font-['Dela_Gothic_One'] text-sm text-zinc-300/90">Omnissiah</span>
      </NavLink>
    </div>
  )
}
