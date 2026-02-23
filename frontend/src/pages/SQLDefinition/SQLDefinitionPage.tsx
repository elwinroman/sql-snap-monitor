import { Navbar } from '@/components/navbar/Navbar'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useAuthStore } from '@/zustand'

import { HeaderTabs, ScriptContent } from './components'
import { DiffScriptContent } from './components/diff-script-content/DiffScriptContent'
import { TabOption } from './constants/tabs-options'

export function SQLDefinitionPage() {
  const database = useAuthStore((state) => state.authContext?.database)

  return (
    <section className="bg-background flex h-full w-full flex-col">
      <Navbar />

      <main className="h-full w-full overflow-hidden px-2 pb-2">
        <section className="bg-background-paperchanel border-border h-full w-full overflow-hidden rounded-sm border">
          {/* Cabecera */}

          {/* relative for Button hide panel absolute element */}
          <Tabs key={database} defaultValue={TabOption.Script} className="relative flex h-full w-full flex-col">
            {/* Cabecera de TABs */}
            <HeaderTabs />

            {/* Componente de Script */}
            <TabsContent value={TabOption.Script} className="h-full w-full">
              <ScriptContent />
            </TabsContent>

            {/* Componente de comparación de Scripts */}
            <TabsContent value={TabOption.Compare} className="h-full w-full">
              <DiffScriptContent />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </section>
  )
}
