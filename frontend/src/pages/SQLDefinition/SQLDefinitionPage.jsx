import { Code } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { LoaderSlack } from '@/components/loader/loader-slack/LoaderSlack'
import { Card } from '@/components/main/Card'
import { GeneralInfo } from '@/components/main/object-info/GeneralInfo'
import { Toaster } from '@/components/ui/sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useConfigStore, useSQLDefinitionStore } from '@/stores'

import { AligmentConectionError, DiffCompare } from './components'
import { EditorCode } from './components/editor-code/EditorCode'

export function SQLDefinitionPage() {
  const error = useSQLDefinitionStore((state) => state.SQLDefinitionError)
  const updateError = useSQLDefinitionStore((state) => state.updateSQLDefinitionError)

  const loading = useSQLDefinitionStore((state) => state.loading)

  const errorAligment = useSQLDefinitionStore((state) => state.errorAligment)
  const updateErrorAligment = useSQLDefinitionStore((state) => state.updateErrorAligment)

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
      <Card>
        {/* Información general del objeto */}
        <GeneralInfo />

        {/* Información del objeto (metadata, etc) */}
        {/* <ObjectInfoPanel /> */}
      </Card>

      <Tabs defaultValue="account" className="relative w-full">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <TabsList>
            <TabsTrigger value="account">
              <div className="flex flex-nowrap items-center gap-1">
                <Code size={14} />
                <span>Script</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="password">
              <div className="flex flex-nowrap items-center gap-1">
                <Code size={14} />
                <span>Script</span>
              </div>
            </TabsTrigger>
          </TabsList>
          <DiffCompare />
        </div>
        <TabsContent value="account">
          {/* <Card> */}
          <div
            className={`shadow-custom-card bg-card overflow-hidden rounded-md pb-4 ${isMaximized ? 'fixed top-0 left-0 z-50 h-screen w-screen' : ''}`}
          >
            {/* Si no existe conexión con el servidor de alineación (mensaje de error) */}
            {errorAligment && errorAligment.statusCode !== 404 && <AligmentConectionError />}

            {/* Editor */}
            <EditorCode />
          </div>
          {/* </Card> */}
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>

      <Toaster position="top-center" />
    </>
  )
}
