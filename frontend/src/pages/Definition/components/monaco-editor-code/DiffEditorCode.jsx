import { DiffEditor } from '@monaco-editor/react'

import { useEditorStore, useSQLDefinitionStore } from '@/stores'

import { options } from './constants/editor-options'
import Dracula from './themes/dracula.theme'

export function DiffEditorCode() {
  const renderWhitespace = useEditorStore((state) => state.renderWhitespace)
  const renderSideBySide = useEditorStore((state) => state.renderSideBySide)
  const SQLDefinitionCode = useSQLDefinitionStore(
    (state) => state.SQLDefinitionCode,
  )
  const originalSQLDefinition = useSQLDefinitionStore(
    (state) => state.SQLDefinitionProductionObject,
  )

  // cargar themes de monaco
  const handleEditorDidMount = (monaco) => {
    monaco.editor.defineTheme('dracula', {
      ...Dracula,
    })
  }

  const fullOptions = { ...options, renderWhitespace, renderSideBySide }

  return (
    <div>
      <DiffEditor
        beforeMount={handleEditorDidMount}
        language="sql"
        defaultValue="// some comment"
        height="90vh"
        theme="dracula"
        original={originalSQLDefinition}
        modified={SQLDefinitionCode}
        options={{ ...fullOptions }}
        loading={<div>Cargando...</div>}
      />
    </div>
  )
}
