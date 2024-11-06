import { Eye, EyeOff } from 'lucide-react'
import { useRef, useState } from 'react'

export function PasswordInput({ name }) {
  const [visible, setVisible] = useState(false)
  const inputRef = useRef()

  // Cambiar visibilidad del input
  const handleClick = (e) => {
    e.preventDefault()

    // toggle visibilidad
    setVisible(!visible)
    setTimeout(() => {
      inputRef.current.focus()
      inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length)
    }, 1)
  }

  return (
    <div className="relative">
      <input
        type={visible ? 'text' : 'password'}
        name={name}
        ref={inputRef}
        className="w-full rounded-md border border-transparent bg-[#3c3e42] px-3 py-2 text-sm outline-none transition-colors duration-300 hover:border-emerald-400 focus:border-emerald-400 focus:bg-emerald-400/10"
        required
      />
      <i className="user-select-none absolute right-3 top-3 cursor-pointer text-slate-300" onClick={handleClick} autoComplete="off">
        {visible ? <Eye size={16} /> : <EyeOff size={16} />}
      </i>
    </div>
  )
}
