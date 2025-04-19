import { Eye, EyeOff } from 'lucide-react'
import { useRef, useState } from 'react'

import { Input } from '@/components/ui/input'

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
      <Input type={visible ? 'text' : 'password'} name={name} ref={inputRef} placeholder="Ingresa tu contraseña" required />
      <i className="user-select-none text-secondary absolute top-3 right-3 cursor-pointer" onClick={handleClick} autoComplete="off">
        {visible ? <Eye size={16} /> : <EyeOff size={16} />}
      </i>
    </div>
  )
}
