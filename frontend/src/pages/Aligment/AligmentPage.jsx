import { EditorCodeAligment, HeaderEditor, MenuSidebar } from './components'

export function AligmentPage() {
  // const widthPage = '200px'
  // const handleChange = (value) => updateTheme(value)

  return (
    <section className="flex h-screen w-full flex-row">
      <MenuSidebar className="hidden min-w-[200px] max-w-[350px] basis-[30%] flex-col bg-zinc-900 sm:flex" />

      {/* overflow: hidden fixea bug de autorezise de monaco-editor */}
      <main className="w-auto flex-auto overflow-hidden">
        {/* Cabecera editor */}
        <HeaderEditor />

        {/* Editor code */}
        <EditorCodeAligment />
      </main>
    </section>
  )
}
