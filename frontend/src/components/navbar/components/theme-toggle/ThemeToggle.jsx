import './theme-toggle.style.css'

import { Moon, Sun } from 'lucide-react'

import { useConfigStore } from '@/stores'

export function ThemeToggle() {
  const isDark = useConfigStore((state) => state.isDark)
  const updateDark = useConfigStore((state) => state.updateDark)

  // cambia el estado del theme toggle
  const handleChange = (e) => {
    updateDark(e.target.checked)
  }

  return (
    <div className="px-2">
      <input type="checkbox" id="toggle" className="hidden" onChange={handleChange} checked={isDark} />
      <div className="flex items-center justify-center bg-inherit wrapper">
        <label className="relative w-10 h-5 border cursor-pointer inset-sha rounded-xl bg-action-hover" htmlFor="toggle">
          {/* Circulo */}
          <div className="circle absolute left-0 w-4 h-4 bg-white rounded-full top-[50%] translate-x-[10%] translate-y-[-50%] flex items-center justify-center transition-all duration-300">
            <Sun size={12} strokeWidth={3} className="absolute mt-0 transition-all duration-300 opacity-100 isun text-amber-400" />
            <Moon size={12} className="absolute mt-[-150%] imoon transition-all text-white opacity-0 duration-300" />
          </div>
        </label>
      </div>
    </div>
  )
}
