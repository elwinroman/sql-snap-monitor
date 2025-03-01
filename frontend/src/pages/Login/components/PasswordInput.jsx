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
        className="h-10 w-full rounded-sm border border-gray-500/20 bg-transparent px-3 text-sm outline-none transition-colors duration-300 placeholder:text-[14px] placeholder:text-muted placeholder:opacity-60 focus:border-transparent focus:outline-offset-0 focus:outline-white"
        placeholder="Ingresa tu contraseña"
        required
      />
      <i className="absolute cursor-pointer user-select-none right-3 top-3 text-slate-300" onClick={handleClick} autoComplete="off">
        {visible ? <Eye size={16} /> : <EyeOff size={16} />}
      </i>
    </div>
  )
}
