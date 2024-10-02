import Editor from '@monaco-editor/react'

import { useEditorStore, useSQLDefinitionStore } from '@/stores'
import { formatPermissionRoles } from '@/utilities'

import { options } from './constants/editor-options'
import Dracula from './themes/dracula.theme'

export function EditorCode() {
  const renderWhitespace = useEditorStore((state) => state.renderWhitespace)
  const { schema, name, permission } = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const SQLDefinitionCode = useSQLDefinitionStore((state) => state.SQLDefinitionCode)
  const hasRoles = useEditorStore((state) => state.hasRoles)

  const code = hasRoles ? SQLDefinitionCode + formatPermissionRoles(permission, schema, name) : SQLDefinitionCode

  // cargar themes de monaco
  const handleEditorDidMount = (monaco) => {
    monaco.editor.defineTheme('dracula', {
      ...Dracula,
    })
  }

  const fullOptions = { ...options, renderWhitespace }

  return (
    <div>
      <Editor
        beforeMount={handleEditorDidMount}
        language="sql"
        defaultValue="// some comment"
        height="90vh"
        theme="dracula"
        value={code}
        options={{ ...fullOptions }}
        loading={<div>Cargando...</div>}
      />
    </div>
  )
}
