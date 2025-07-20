import { Eye, EyeOff } from 'lucide-react'
import { useRef, useState } from 'react'

import { Input } from '@/components/ui'

export function PasswordInput({ name }: { name: string }) {
  const [visible, setVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Cambiar visibilidad del input
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    // toggle visibilidad
    setVisible(!visible)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length)
    }, 1)
  }

  return (
    <div className="relative">
      <Input
        type={visible ? 'text' : 'password'}
        name={name}
        ref={inputRef}
        placeholder="Ingresa tu contraseña"
        autoComplete="off"
        required
      />
      <i className="user-select-none text-secondary absolute top-3 right-3 cursor-pointer" onClick={handleClick}>
        {visible ? <Eye size={16} /> : <EyeOff size={16} />}
      </i>
    </div>
  )
}
