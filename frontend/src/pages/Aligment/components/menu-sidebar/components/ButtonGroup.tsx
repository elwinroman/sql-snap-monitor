import { useSearchContext } from '@aligment/hooks/useSearchContext'
import { useAligmentStore } from '@aligment/zustand/aligment.store'
import { MouseEvent } from 'react'

import { Button } from '@/components/ui'
import { TypeViews } from '@/models/sysobject'

export function ButtonGroup() {
  const createSysObject = useAligmentStore((state) => state.createSysObject)
  const updateViewMode = useAligmentStore((state) => state.updateViewMode)
  const { loading, updateSearch, getObject } = useSearchContext()

  // Maneja el evento click para limpiar
  const handleClickLimpiar = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    updateSearch('')
    createSysObject(null)
    updateViewMode(TypeViews.FullView)
  }

  // Maneja el evento click para buscar el objeto
  const handleClickConsultar = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await getObject()
  }

  return (
    <section className="flex w-full gap-2">
      <Button variant="variant01" size="sm" className="w-full" onClick={handleClickConsultar} disabled={loading}>
        <span>Consultar</span>
      </Button>

      <Button variant="default" size="sm" className="w-full" onClick={handleClickLimpiar} disabled={loading}>
        <span>Limpiar</span>
      </Button>
    </section>
  )
}
