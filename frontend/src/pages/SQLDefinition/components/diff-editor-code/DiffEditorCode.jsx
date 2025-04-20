import { HeaderDiffEditor } from './components/header-diff-editor/HeaderDiffEditor'
import { MonacoDiffEditorCode } from './components/MonacoDiffEditorCode'

export function DiffEditorCode() {
  return (
    <section className="bg-background fixed top-0 left-0 z-50 h-screen w-screen">
      <HeaderDiffEditor />
      <MonacoDiffEditorCode />
    </section>
  )
}
