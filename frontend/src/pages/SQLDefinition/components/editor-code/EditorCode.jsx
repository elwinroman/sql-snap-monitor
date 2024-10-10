import Editor from '@monaco-editor/react'

import { useEditorStore, useSQLDefinitionStore } from '@/stores'
import { formatPermissionRoles } from '@/utilities'

import { options } from './constants/editor-options'
import { THEMES } from './constants/themes'

export function EditorCode() {
  const renderWhitespace = useEditorStore((state) => state.renderWhitespace)
  const { schema, name, permission } = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const SQLDefinitionCode = useSQLDefinitionStore((state) => state.SQLDefinitionCode)
  const hasRoles = useEditorStore((state) => state.hasRoles)
  const fontSize = useEditorStore((state) => state.fontSize)
  const theme = useEditorStore((state) => state.theme)

  const code = hasRoles ? SQLDefinitionCode + formatPermissionRoles(permission, schema, name) : SQLDefinitionCode

  // cargar themes de monaco
  const handleEditorDidMount = (monaco) => {
    for (const themeItem of THEMES) {
      monaco.editor.defineTheme(themeItem.tag, {
        ...themeItem.json,
      })
    }
  }

  const fullOptions = { ...options, renderWhitespace, fontSize }

  return (
    <div>
      <Editor
        beforeMount={handleEditorDidMount}
        language="sql"
        defaultValue="// some comment"
        height="90vh"
        theme={theme}
        value={code}
        options={{ ...fullOptions }}
        loading={<div>Cargando...</div>}
      />
    </div>
  )
}
