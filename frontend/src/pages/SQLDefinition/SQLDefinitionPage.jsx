import { useEffect } from 'react'
import { toast } from 'sonner'

import { LoaderSlack } from '@/components/loader/LoaderSlack'
import { LinkObjectList } from '@/components/main/components/LinkObjectList'
import { Toaster } from '@/components/ui/sonner'
import { useConfigStore, useEditorStore, useSQLDefinitionStore } from '@/stores'

import { AligmentConectionError, DiffEditorCode, EditorCode, HeaderEditor, Info } from './components'

export function SQLDefinitionPage() {
  const { name: object } = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const error = useSQLDefinitionStore((state) => state.SQLDefinitionError)
  const updateError = useSQLDefinitionStore((state) => state.updateSQLDefinitionError)

  const objectList = useSQLDefinitionStore((state) => state.SQLDefinitionObjectList)
  const fetchObject = useSQLDefinitionStore((state) => state.fetchSQLDefinition)
  const updateObject = useSQLDefinitionStore((state) => state.updateSQLDefinitionObject)
  const loading = useSQLDefinitionStore((state) => state.loading)

  const errorAligment = useSQLDefinitionStore((state) => state.errorAligment)
  const updateErrorAligment = useSQLDefinitionStore((state) => state.updateErrorAligment)

  const onDiffEditor = useEditorStore((state) => state.onDiffEditor)
  const isMaximized = useConfigStore((state) => state.isMaximized)

  // Maneja los errores, muestra y limpia la notificación al buscar un objeto QSL
  useEffect(() => {
    if (error) {
      toast.error(error.message)
      updateError({ state: null })
    }
  }, [error, updateError])

  // Maneja los errores, muestra y limpia la notificación al no encontrar el objeto de alineación
  useEffect(() => {
    if (errorAligment && errorAligment.statusCode === 404) {
      toast.error('No se pudo encontrar el objeto de alineación, parece que tu objeto es nuevo')
      updateErrorAligment({ state: null })
    }
  }, [errorAligment, updateErrorAligment])

  // console.log(errorAligment)
  if (loading) return <LoaderSlack />

  return (
    <>
      {object && (
        <div
          className={`overflow-hidden rounded-md border border-border bg-card ${object ? 'pb-10' : ''} ${isMaximized ? 'fixed left-0 top-0 z-50 h-screen w-screen' : ''}`}
        >
          {/* Si no existe conexión con el servidor de alineación (mensaje de error) */}
          {errorAligment && errorAligment.statusCode !== 404 && <AligmentConectionError />}

          {/* Cabecera del editpr */}
          <HeaderEditor />

          {/* Muestra el editor del objeto o el editor de comparación */}
          {object && (onDiffEditor ? <DiffEditorCode /> : <EditorCode />)}
        </div>
      )}

      {!object && (
        <>
          {/* Información sobre la página actual */}
          <Info />

          {/* Multiples objetos */}
          {objectList.length > 0 && <LinkObjectList objectList={objectList} updateObject={updateObject} fetchObjectAction={fetchObject} />}
        </>
      )}

      <Toaster position="top-center" />
    </>
  )
}
