import { Error500 } from '@/pages'
import { useAuthStore } from '@/stores'

import { EditorCodeAligment, HeaderEditor, MenuSidebar } from './components'

export function AligmentPage() {
  const errorApiConection = useAuthStore((state) => state.errorApiConection)
  if (errorApiConection) return <Error500 />

  return (
    <section className="flex flex-row w-full h-screen">
      <MenuSidebar className="hidden min-w-[200px] max-w-[350px] basis-[30%] flex-col bg-background sm:flex" />

      {/* overflow: hidden fixea bug de autorezise de monaco-editor */}
      <main className="flex flex-col flex-auto w-auto overflow-hidden">
        {/* Cabecera editor */}
        <HeaderEditor />

        {/* Editor code */}
        <EditorCodeAligment />

        <footer className="grid h-10 text-sm place-content-center text-secondary">
          <span>
            © 2025 <strong>Departamento de Aseguramiento de Calidad</strong>
          </span>
        </footer>
      </main>
    </section>
  )
}
