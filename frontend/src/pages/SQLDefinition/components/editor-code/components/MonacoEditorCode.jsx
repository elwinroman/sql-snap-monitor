import Editor from '@monaco-editor/react'

import { CopyClipboard } from '@/components/main/CopyClipboard'
import { EDITOR_BANNER, THEMES } from '@/constants'
import { useConfigStore, useEditorStore, useSQLDefinitionStore } from '@/stores'
import { formatPermissionRoles } from '@/utilities'

import { options } from '../../constants/editor-options'

export function MonacoEditorCode() {
  const renderWhitespace = useEditorStore((state) => state.renderWhitespace)
  const { schemaName, name, permission } = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const code = useSQLDefinitionStore((state) => state.SQLDefinitionCode)
  const hasRoles = useEditorStore((state) => state.hasRoles)
  const fontSize = useEditorStore((state) => state.fontSize)
  const theme = useEditorStore((state) => state.theme)
  const isMaximized = useConfigStore((state) => state.isMaximized)

  let formattedCode = null
  if (code) formattedCode = hasRoles ? code + formatPermissionRoles(permission, schemaName, name) : code

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
    <div className="group relative">
      <Editor
        beforeMount={handleEditorDidMount}
        language="sql"
        defaultValue={EDITOR_BANNER}
        height={isMaximized ? '93vh' : '88vh'}
        theme={theme}
        value={formattedCode}
        options={{ ...fullOptions }}
        loading={<div>Cargando...</div>}
      />

      {/* Butón de copiar */}
      <div className="absolute top-3 right-36">
        <CopyClipboard text={formattedCode} />
      </div>
    </div>
  )
}
