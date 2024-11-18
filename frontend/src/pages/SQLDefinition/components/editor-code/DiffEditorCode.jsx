import './styles/editor.style.css'

import { DiffEditor } from '@monaco-editor/react'

import { THEMES } from '@/constants'
import { useEditorStore, useSQLDefinitionStore } from '@/stores'
import { formatPermissionRoles } from '@/utilities'

import { options } from './constants/editor-options'

export function DiffEditorCode() {
  const renderWhitespace = useEditorStore((state) => state.renderWhitespace)
  const renderSideBySide = useEditorStore((state) => state.renderSideBySide)
  const SQLDefinitionCode = useSQLDefinitionStore((state) => state.SQLDefinitionCode)
  const SQLDefinitionObject = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const { schema, name, permission, definition } = useSQLDefinitionStore((state) => state.SQLDefinitionAligmentObject)
  const fontSize = useEditorStore((state) => state.fontSize)
  const theme = useEditorStore((state) => state.theme)

  const hasRoles = useEditorStore((state) => state.hasRoles)
  const loadingAligment = useSQLDefinitionStore((state) => state.loadingAligment)

  const code = hasRoles
    ? SQLDefinitionCode + formatPermissionRoles(SQLDefinitionObject.permission, SQLDefinitionObject.schema, SQLDefinitionObject.name)
    : SQLDefinitionCode
  const aligmentCode = hasRoles ? definition + formatPermissionRoles(permission, schema, name) : definition

  // cargar themes de monaco
  const handleEditorDidMount = (monaco) => {
    for (const themeItem of THEMES) {
      monaco.editor.defineTheme(themeItem.tag, {
        ...themeItem.json,
      })
    }
  }

  const fullOptions = { ...options, renderWhitespace, renderSideBySide, fontSize }

  return (
    <div>
      <DiffEditor
        beforeMount={handleEditorDidMount}
        language="sql"
        defaultValue="// some comment"
        height="88vh"
        theme={theme}
        original={loadingAligment ? 'Buscando información, esto puede tardar unos segundos...' : aligmentCode}
        modified={code}
        options={{ ...fullOptions }}
        loading={<div>Cargando...</div>}
      />
    </div>
  )
}
