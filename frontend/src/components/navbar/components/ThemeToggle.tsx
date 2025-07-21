import { Moon, Sun } from 'lucide-react'

import { useConfigStore } from '@/stores'

export function ThemeToggle() {
  const isDark = useConfigStore((state) => state.isDark)
  const updateDark = useConfigStore((state) => state.updateDark)

  // cambia el estado del theme toggle
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => updateDark(e.target.checked)

  return (
    <div className="">
      <input type="checkbox" id="toggle" className="hidden" onChange={handleChange} checked={isDark} />
      <div className="wrapper flex items-center justify-center bg-inherit">
        <label className="inset-sha bg-action-hover relative h-5 w-10 cursor-pointer rounded-xl border" htmlFor="toggle">
          {/* Circulo */}
          <div className="circle absolute top-[50%] left-0 flex h-4 w-4 translate-x-[10%] translate-y-[-50%] items-center justify-center rounded-full bg-white transition-all duration-300">
            <Sun size={12} strokeWidth={3} className="isun absolute mt-0 text-amber-400 opacity-100 transition-all duration-300" />
            <Moon size={12} className="imoon absolute mt-[-150%] text-white opacity-0 transition-all duration-300" />
          </div>
        </label>
      </div>
    </div>
  )
}
