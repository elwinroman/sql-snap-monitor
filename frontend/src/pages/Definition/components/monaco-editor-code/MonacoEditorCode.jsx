import Editor from '@monaco-editor/react'
import Dracula from './themes/dracula.theme'

export function MonacoEditorCode({ definitionError, definitionCode }) {
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
        value={definitionError || definitionCode}
      />
    </div>
  )
}
