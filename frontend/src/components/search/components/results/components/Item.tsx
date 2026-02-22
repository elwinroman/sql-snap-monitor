import { searchContext } from '@/components/search/context/searchContext'
import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { AxiosCall } from '@/models'
import { FullSysObject } from '@/models/sysobject'
import { useSysObjectStore } from '@/zustand'

interface Props {
  children: React.ReactNode
  objectId: number
  getObject(id: number): AxiosCall<FullSysObject>
  updateOpen(state: boolean): void
}

export function Item({ children, objectId, getObject, updateOpen }: Props) {
  const { callEndpoint } = useFetchAndLoad<FullSysObject>()
  const createSysObject = useSysObjectStore((state) => state.createSysObject)

  const { updateSuggestions, updateQuerySearch } = searchContext()

  /*
  // cada vez que hace click en el item, se recupera el objeto (sqldefinition o usertable)
  const getObject = (e) => {
    e.preventDefault()

    // if (type.name === TYPE_ACTION.sqldefinition.name) fetchSQLDefinition({ id: e.currentTarget.dataset.id })
    // if (type.name === TYPE_ACTION.usertable.name) fetchUsertable({ id: e.currentTarget.dataset.id })

    // comprobar que el objeto buscado tenga lFavorito (cuando se busca desde las SUGERENCIAS), si no lo tiene actualiza su valor desde Favorites
    if (data.lFavorito == null) {
      const index = favorites.findIndex((element) => element.objectId === data.objectId)
      data.lFavorito = index !== -1
    }

    // agrega al estado el item clickeado y lo registra en la base de datos
    addRecents(data, type.id)

    updateOpen(false) // cerrar dialog de búsqueda
  }
  */
  const handleClickGetObject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    // id del objeto
    const id = e.currentTarget.dataset.objectId
    const idNumber = Number(id)

    try {
      const response = await callEndpoint(getObject(idNumber))
      createSysObject(response.data)
    } catch (err) {
      console.error('Error al obtener el objeto: ', err)
    } finally {
      updateOpen(false)
      updateQuerySearch('')
      updateSuggestions([])
    }
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
