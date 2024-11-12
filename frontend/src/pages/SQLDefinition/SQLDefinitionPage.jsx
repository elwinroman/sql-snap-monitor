import { CircleX, Code } from 'lucide-react'
import { useEffect } from 'react'
import { toast, Toaster } from 'sonner'

import { LoaderDot } from '@/components/loader/loader-dot/LoaderDot'
import { LoaderSlack } from '@/components/loader/LoaderSlack'
import { LinkObjectList } from '@/components/main/components/LinkObjectList'
import { useConfigStore, useEditorStore, useSQLDefinitionStore } from '@/stores'

import { DiffEditorCode } from './components/editor-code/DiffEditorCode'
import { EditorCode } from './components/editor-code/EditorCode'
import { Info } from './components/Info'
import { Options as EditorOptions } from './components/options/Options'

export function SQLDefinitionPage() {
  const SQLDefinitionCode = useSQLDefinitionStore((state) => state.SQLDefinitionCode)
  const SQLDefinitionError = useSQLDefinitionStore((state) => state.SQLDefinitionError)
  const updateSQLDefinitionError = useSQLDefinitionStore((state) => state.updateSQLDefinitionError)

  const SQLDefinitionObjectList = useSQLDefinitionStore((state) => state.SQLDefinitionObjectList)
  const fetchSQLDefinition = useSQLDefinitionStore((state) => state.fetchSQLDefinition)
  const updateSQLDefinitionObject = useSQLDefinitionStore((state) => state.updateSQLDefinitionObject)
  const SQLDefinitionObject = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const loading = useSQLDefinitionStore((state) => state.loading)

  const errorAligment = useSQLDefinitionStore((state) => state.errorAligment)
  const updateErrorAligment = useSQLDefinitionStore((state) => state.updateErrorAligment)

  const onDiffEditor = useEditorStore((state) => state.onDiffEditor)
  const isMaximized = useConfigStore((state) => state.isMaximized)

  const loadingAligment = useSQLDefinitionStore((state) => state.loadingAligment)

  // Maneja los errores, muestra y limpia la notificación al buscar un objeto QSL
  useEffect(() => {
    if (SQLDefinitionError) {
      toast.error(SQLDefinitionError.message)
      updateSQLDefinitionError({ state: null })
    }
  }, [SQLDefinitionError, updateSQLDefinitionError])

  // Maneja los errores, muestra y limpia la notificación al no encontrar el objeto de alineación
  useEffect(() => {
    if (errorAligment && errorAligment.statusCode === 404) {
      toast.error('No se pudo encontrar el objeto de alineación, parece que tu objeto es nuevo')
      updateErrorAligment({ state: null })
    }
  }, [errorAligment, updateErrorAligment])

  if (loading) return <LoaderSlack />

  return (
    <>
      {SQLDefinitionCode && (
        <div
          className={`overflow-hidden rounded-md border border-owborder bg-owcard ${SQLDefinitionCode ? 'pb-10' : ''} ${isMaximized ? 'fixed left-0 top-0 z-50 h-screen w-screen' : ''}`}
        >
          {/* Si no existe conexión con el servidor de alineación (mensaje de error) */}
          {errorAligment && errorAligment.statusCode !== 404 && (
            <div className="flex w-full items-center gap-2 bg-[#ea4d5e] px-4 py-1 text-sm text-zinc-50">
              <i>
                <CircleX size={16} />
              </i>
              <span>
                Opps. Parece que existe un error de conexión con el servidor de alineación, por favor, contacte con su administrador
              </span>
            </div>
          )}

          <div className="flex flex-col items-center justify-between gap-2 px-6 py-4 md:flex-row">
            {!onDiffEditor ? (
              <h4 className="flex items-center gap-2 text-base font-bold text-zinc-300">
                <i>
                  <Code size={20} />
                </i>
                <span className="text-amber-400">{SQLDefinitionObject.name}</span>
              </h4>
            ) : (
              <h3 className="max-w-sm text-sm text-zinc-200 sm:max-w-full">
                <span>Estas comparando con </span>
                <span className="font-bold text-emerald-500">PRE-PRODUCCIÓN</span>
                <span className="text-zinc-400"> (Actualizado al día de ayer)</span>
              </h3>
            )}

            <div className="flex gap-2">
              {/* Opciones del editor */}
              {loadingAligment ? (
                <div className="mr-4">
                  <LoaderDot />
                </div>
              ) : (
                <EditorOptions />
              )}
            </div>
          </div>

          {/* Monaco editor syntax */}
          {SQLDefinitionCode && (onDiffEditor ? <DiffEditorCode /> : <EditorCode />)}
        </div>
      )}

      {!SQLDefinitionCode && (
        <>
          {/* Información sobre la página actual */}
          <Info />

          {/* Multiples objetos */}
          {SQLDefinitionObjectList.length > 0 && (
            <LinkObjectList
              objectList={SQLDefinitionObjectList}
              updateObject={updateSQLDefinitionObject}
              fetchObjectAction={fetchSQLDefinition}
            />
          )}
        </>
      )}

      <Toaster position="bottom-right" richColors className="p-5" />
    </>
  )
}
