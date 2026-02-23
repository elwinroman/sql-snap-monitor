import { searchContext } from '@/components/search/context/searchContext'
import { useSysObjectStore } from '@/zustand'

interface Props {
  children: React.ReactNode
  objectId: number
  updateOpen(state: boolean): void
}

export function Item({ children, objectId, updateOpen }: Props) {
  const fetchSysObject = useSysObjectStore((state) => state.fetchSysObject)

  const { updateSuggestions, updateQuerySearch } = searchContext()

  const handleClickGetObject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const id = Number(e.currentTarget.dataset.objectId)

    // dispara el fetch en el store (sobrevive al desmontaje del componente)
    fetchSysObject(id)

    // cierra el modal inmediatamente
    updateOpen(false)
    updateQuerySearch('')
    updateSuggestions([])
  }

  return (
    <li key={objectId}>
      <button
        data-object-id={objectId}
        className="hover:bg-action-hover group text-secondary pointer-events-auto flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left align-text-top text-sm"
        onClick={handleClickGetObject}
      >
        {children}
      </button>
    </li>
  )
}
