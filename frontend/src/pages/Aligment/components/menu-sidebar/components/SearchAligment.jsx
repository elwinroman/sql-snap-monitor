import { X } from 'lucide-react'
import { useRef, useState } from 'react'

import { InputWithIcon } from '@/components/ui/input-with-icon'
import { useAligmentStore } from '@/stores'
import { validationInput } from '@/utilities'

export function SearchAligment() {
  const [isFocus, setFocus] = useState(false)
  const [hasInput, setHasInput] = useState(false)
  const inputRef = useRef(null)

  const getObject = useAligmentStore((state) => state.getObject)
  const search = useAligmentStore((state) => state.search)
  const updateSearch = useAligmentStore((state) => state.updateSearch)
  const loading = useAligmentStore((state) => state.loading)

  // validation state
  const validate = useAligmentStore((state) => state.validate)
  const updateValidate = useAligmentStore((state) => state.updateValidate)
  const validationError = useAligmentStore((state) => state.validationError)
  const updateValidationError = useAligmentStore((state) => state.updateValidationError)

  // Maneja los eventos de teclado
  const handleKeyup = (e) => {
    search === '' ? setHasInput(false) : setHasInput(true)

    // evento ENTER
    if (e.key === 'Enter') {
      // validación
      const { isValidate, msg } = validationInput({ value: search })

      updateValidate({ state: isValidate })
      updateValidationError({ msg })

      if (isValidate && !loading) getObject()
    }
  }

  const handleChange = (e) => {
    updateSearch({ search: e.target.value })
  }

  // Maneja el evento click en el icono borrar
  const handleClick = (e) => {
    e.preventDefault()

    setHasInput(false)
    updateSearch({ search: '' })
    inputRef.current.focus()
  }

  return (
    <div>
      <label className="flex flex-col gap-2">
        <span className="text-sm">Objeto</span>
        <InputWithIcon
          ref={inputRef}
          size="default"
          value={search}
          endIcon={hasInput && <X size={22} />}
          placeholder="Search"
          onChange={handleChange}
          onKeyUp={handleKeyup}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          handleClick={handleClick}
          isFocus={isFocus}
          spellCheck="false"
          title="Borrar"
        />
      </label>
      {!validate && <span className="text-xs text-rose-500">{validationError}</span>}
    </div>
  )
}
