import { Menu } from 'lucide-react'

import { EditorAligmentOption, EditorCodeAligment, MenuSidebar } from './components'

export function AligmentPage() {
  // const widthPage = '200px'
  // const handleChange = (value) => updateTheme(value)

  return (
    <section className="flex h-screen w-full flex-row">
      <MenuSidebar className="hidden min-w-[200px] max-w-[350px] basis-[30%] flex-col bg-zinc-900 sm:flex" />

      {/* overflow: hidden fixea bug de autorezise de monaco-editor */}
      <main className="w-auto flex-auto overflow-hidden">
        {/* Cabecera */}
        <header className="flex flex-col justify-start gap-x-5 gap-y-2 px-3 py-3 sm:items-center lg:flex-row lg:justify-between">
          <button className="flex-[1_1_0] hover:bg-zinc-200">
            <i className="block sm:hidden">
              <Menu size={18} />
            </i>
          </button>

          {/* Información */}
          <div className="flex flex-[0_0_auto] flex-wrap items-center gap-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
              <span className="text-amber-400">uspGetManagerEmployees</span>
            </h4>
            <span className="max-w-sm text-nowrap text-sm text-zinc-400 sm:max-w-full"> (Actualizado al día de ayer)</span>
          </div>

          {/* Opciones del editor */}
          <EditorAligmentOption className="flex-[1_1_0]" />
        </header>

        {/* Editor code */}
        <EditorCodeAligment />
      </main>
    </section>
  )
}
