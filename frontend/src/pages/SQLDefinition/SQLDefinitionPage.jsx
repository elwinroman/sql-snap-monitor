import { useEffect } from 'react'
import { toast } from 'sonner'

import { LoaderSlack } from '@/components/loader/loader-slack/LoaderSlack'
import { Toaster } from '@/components/ui/sonner'
import { useConfigStore, useDiffEditorStore, useSQLDefinitionStore } from '@/stores'

import { AligmentConectionError, DiffEditorCode, EditorCode, HeaderEditor, ObjectInfoPanel } from './components'

export function SQLDefinitionPage() {
  const error = useSQLDefinitionStore((state) => state.SQLDefinitionError)
  const updateError = useSQLDefinitionStore((state) => state.updateSQLDefinitionError)

  const loading = useSQLDefinitionStore((state) => state.loading)

  const errorAligment = useSQLDefinitionStore((state) => state.errorAligment)
  const updateErrorAligment = useSQLDefinitionStore((state) => state.updateErrorAligment)

  const onDiffEditor = useDiffEditorStore((state) => state.onDiffEditor)
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

  if (loading) return <LoaderSlack className="mt-24" />

  return (
    <>
      <ObjectInfoPanel />

      <div
        className={`shadow-custom-card bg-card overflow-hidden rounded-md pb-4 ${isMaximized ? 'fixed top-0 left-0 z-50 h-screen w-screen' : ''}`}
      >
        {/* Si no existe conexión con el servidor de alineación (mensaje de error) */}
        {errorAligment && errorAligment.statusCode !== 404 && <AligmentConectionError />}

        {/* Cabecera del editor */}
        <HeaderEditor />

        {/* Muestra el editor del objeto o el editor de comparación */}
        {onDiffEditor ? <DiffEditorCode /> : <EditorCode />}
      </div>

      <Toaster position="top-center" />
    </>
  )
}
