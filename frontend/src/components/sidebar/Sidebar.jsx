import { Article as ArticleIcon } from '@/icons/article'
import { CodeCircle2 as CodeCircleIcon } from '@/icons/code-circle-2'
import { LayoutDashboard as LayoutDashboardIcon } from '@/icons/layout-dashboard'
import { NavLink } from 'react-router-dom'
import { Squares as SquaresIcon } from '@/icons/squares'

export function Sidebar() {
  const navLinks = [
    {
      to: '/',
      icon: <LayoutDashboardIcon width={22} height={22} />,
      text: 'Home',
    },
    {
      to: '/definition',
      icon: <CodeCircleIcon width={22} height={22} />,
      text: 'Obtener definición',
    },
    {
      to: '/description',
      icon: <ArticleIcon width={22} height={22} />,
      text: 'Obtener descripción',
    },
    {
      to: '/diff-editor',
      icon: <SquaresIcon width={22} height={22} />,
      text: 'Diff editor',
    },
  ]

  return (
    <aside className="h-screen w-[280px] shrink-0 overflow-y-auto bg-ownavbar">
      <div className="flex h-full flex-col">
        <div className="sticky top-0 flex h-[var(--navbar-height)] shrink-0 items-center justify-center gap-2 backdrop-blur-sm">
          <div>
            <i>Logo</i>
          </div>
          <h2 className="text-xl font-bold text-slate-700">Quality Tools</h2>
        </div>

        {/* Menu */}
        <nav className="grow px-4 py-4">
          <h3 className="px-6 py-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            APPS
          </h3>
          <ul className="flex flex-col gap-2">
            {/* Menu item */}
            {navLinks.map(({ to, icon, text }) => (
              <li key={text}>
                <NavLink to={to}>
                  {({ isActive }) => (
                    <div
                      className={`flex items-center gap-2 rounded-md px-4 py-2 transition-colors duration-150 ${isActive ? 'bg-amber-100/50 dark:bg-amber-500/20' : 'hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
                    >
                      <i
                        className={`p-1.5 transition-colors duration-150 ${isActive ? 'text-amber-500 dark:text-amber-400' : 'text-zinc-600 dark:text-zinc-200'} `}
                      >
                        {icon}
                      </i>
                      <span
                        className={`text-[0.94rem] ${isActive ? 'font-bold text-amber-500 dark:text-amber-400' : 'font-medium text-zinc-600 dark:text-zinc-200'}`}
                      >
                        {text}
                      </span>
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
