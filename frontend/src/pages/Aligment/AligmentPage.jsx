import { Error500 } from '@/pages'
import { useAligmentStore, useAuthStore } from '@/stores'

import { EditorCodeAligment, HeaderEditor, MenuSidebar } from './components'

export function AligmentPage() {
  const errorApiConection = useAuthStore((state) => state.errorApiConection)
  const hideMenu = useAligmentStore((state) => state.hideMenu)

  // tamaño del menu en pixeles
  const sizeMenu = '350'

  if (errorApiConection) return <Error500 />

  return (
    <section className="relative flex w-full h-screen overflow-hidden">
      {/* Sidebar con slide-in/out efecto */}
      <aside
        className={`
          sm:block hidden
          transition-all duration-300 ease-in-out
          bg-background h-full
          ${hideMenu ? 'w-0 opacity-0 overflow-hidden' : `w-[${sizeMenu}px] opacity-100`}
        `}
      >
        <MenuSidebar className={`h-full w-[${sizeMenu}px] flex-col bg-background sm:flex`} />
      </aside>

      {/* Main content */}
      <main
        className={`
          flex flex-col flex-1 transition-all duration-300 ease-in-out
          ${hideMenu ? 'w-full' : `w-[calc(100%-${sizeMenu}px)]`}
        `}
      >
        <HeaderEditor />

        {/* Editor code */}
        <EditorCodeAligment />

        <footer className="grid h-8 text-sm place-content-center text-muted">
          <span>
            © 2025 <strong>Departamento de Aseguramiento de Calidad</strong>
          </span>
        </footer>
      </main>
    </section>
  )
}
