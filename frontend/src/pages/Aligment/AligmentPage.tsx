import { useEffect } from 'react'
import { toast } from 'sonner'

import { Toaster } from '@/components/ui'
import { Error500 } from '@/pages'
import { useAligmentStore, useAuthStore } from '@/zustand'

import { EditorCodeAligment, HeaderEditor, MenuSidebar } from './components'
import { useSearchContext } from './hooks/useSearchContext'

export function AligmentPage() {
  const errorApiConnection = useAuthStore((state) => state.errorApiConnection)
  const hideMenu = useAligmentStore((state) => state.hideMenu)
  const { error } = useSearchContext()

  // notificación de errores
  useEffect(() => {
    if (error) {
      toast.warning(error.title, {
        description: error.detail,
        duration: 5000,
      })
    }
  }, [error])

  if (errorApiConnection) return <Error500 />

  return (
    <section className="relative flex h-screen w-full overflow-hidden">
      {/* Sidebar con slide-in/out efecto */}
      <aside
        className={`bg-background hidden h-full transition-all duration-300 ease-in-out sm:block ${hideMenu ? 'w-0 overflow-hidden opacity-0' : `w-sidebar opacity-100`} `}
      >
        <MenuSidebar className={`w-sidebar bg-background h-full flex-col sm:flex`} />
      </aside>

      {/* Main content */}
      <main className={`flex flex-1 flex-col transition-all duration-300 ease-in-out ${hideMenu ? 'w-full' : 'w-content-area'} `}>
        <HeaderEditor />

        {/* Editor code */}
        <EditorCodeAligment />

        <footer className="text-muted grid h-8 place-content-center text-sm">
          <span>
            © 2025 <strong>Departamento de Aseguramiento de Calidad</strong>
          </span>
        </footer>
      </main>

      <Toaster richColors position="bottom-right" theme="light" />
    </section>
  )
}
