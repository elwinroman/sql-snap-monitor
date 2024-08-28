import Editor from '@monaco-editor/react'
import Dracula from './themes/dracula.theme'
import { options } from './constants/editor-options'

export function MonacoEditorCode({ definitionCode }) {
  const handleEditorDidMount = (monaco) => {
    monaco.editor.defineTheme('dracula', {
      ...Dracula,
    })
  }

  return (
    <div>
      <Editor
        beforeMount={handleEditorDidMount}
        defaultLanguage="sql"
        defaultValue="// some comment"
        height="90vh"
        theme="dracula"
        value={definitionCode}
        options={{ ...options }}
        loading={<div>Cargando...</div>}
      />
    </div>
  )
}
