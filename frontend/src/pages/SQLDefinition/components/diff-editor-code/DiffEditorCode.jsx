import { HeaderDiffEditor } from './components/header-diff-editor/HeaderDiffEditor'
import { MonacoDiffEditorCode } from './components/MonacoDiffEditorCode'

export function DiffEditorCode() {
  return (
    <>
      <HeaderDiffEditor />
      <MonacoDiffEditorCode />
    </>
  )
}
