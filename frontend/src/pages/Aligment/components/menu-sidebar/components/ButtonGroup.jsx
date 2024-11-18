import { Button } from '@/components/ui/button'
import { useAligmentStore } from '@/stores'
import { validationInput } from '@/utilities'

export function ButtonGroup() {
  const getObject = useAligmentStore((state) => state.getObject)
  const updateSearch = useAligmentStore((state) => state.updateSearch)
  const search = useAligmentStore((state) => state.search)
  const reset = useAligmentStore((state) => state.reset)
  const loading = useAligmentStore((state) => state.loading)

  // validation state
  const updateValidate = useAligmentStore((state) => state.updateValidate)
  const updateValidationError = useAligmentStore((state) => state.updateValidationError)

  // Maneja el evento click para limpiar
  const handleClickLimpiar = (e) => {
    e.preventDefault()

    updateSearch({ search: '' })
    reset()
  }

  // Maneja el evento click para buscar el objeto
  const handleClickConsultar = (e) => {
    e.preventDefault()

    const { isValidate, msg } = validationInput({ value: search })

    updateValidate({ state: isValidate })
    updateValidationError({ msg })

    if (isValidate && !loading) getObject()
  }

  return (
    <section className="flex w-full gap-2">
      <Button variant="secondary" size="default" className="w-full" onClick={handleClickConsultar} disabled={loading}>
        Consultar
      </Button>

      <Button variant="secondary" size="default" className="w-full" onClick={handleClickLimpiar} disabled={loading}>
        Limpiar
      </Button>
    </section>
  )
}
