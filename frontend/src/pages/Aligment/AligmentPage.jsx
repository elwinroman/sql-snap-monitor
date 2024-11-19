import { EditorCodeAligment, HeaderEditor, MenuSidebar } from './components'

export function AligmentPage() {
  // const widthPage = '200px'
  // const handleChange = (value) => updateTheme(value)

  return (
    <section className="flex h-screen w-full flex-row">
      <MenuSidebar className="bg-baselayer hidden min-w-[200px] max-w-[350px] basis-[30%] flex-col sm:flex" />

      {/* overflow: hidden fixea bug de autorezise de monaco-editor */}
      <main className="flex w-auto flex-auto flex-col overflow-hidden">
        {/* Cabecera editor */}
        <HeaderEditor />

        {/* Editor code */}
        <EditorCodeAligment />

        <footer className="grid h-10 place-content-center text-sm text-foreground">Departamento de Aseguramiento de Calidad</footer>
      </main>
    </section>
  )
}
