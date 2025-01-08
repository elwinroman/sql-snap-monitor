import Editor from '@monaco-editor/react'

import { CopyClipboard } from '@/components/main/CopyClipboard'
import { THEMES } from '@/constants'
import { useConfigStore, useEditorStore, useSQLDefinitionStore } from '@/stores'
import { formatPermissionRoles } from '@/utilities'

import { options } from './constants/editor-options'

const defaultCode = String.raw`
/****************************************************************************************/
/*     ______  _____ _______ __   _ _    _ _______ __   _ _____ ______   _____    /     */
/*     |_____]   |   |______ | \  |  \  /  |______ | \  |   |   |     \ |     |  /      */
/*     |_____] __|__ |______ |  \_|   \/   |______ |  \_| __|__ |_____/ |_____| .       */
/*                                                                                      */
/*                                  REALIZA TU CONSULTA                                 */
/*                                                                                      */
/****************************************************************************************/    
`

export function EditorCode() {
  const renderWhitespace = useEditorStore((state) => state.renderWhitespace)
  const { schema, name, permission } = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const code = useSQLDefinitionStore((state) => state.SQLDefinitionCode)
  const hasRoles = useEditorStore((state) => state.hasRoles)
  const fontSize = useEditorStore((state) => state.fontSize)
  const theme = useEditorStore((state) => state.theme)
  const isMaximized = useConfigStore((state) => state.isMaximized)

  let formattedCode = null
  if (code) formattedCode = hasRoles ? code + formatPermissionRoles(permission, schema, name) : code

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
    <div className="relative group">
      <Editor
        beforeMount={handleEditorDidMount}
        language="sql"
        defaultValue={defaultCode}
        height={isMaximized ? '100vh' : '88vh'}
        theme={theme}
        value={formattedCode}
        options={{ ...fullOptions }}
        loading={<div>Cargando...</div>}
      />

      {/* Butón de copiar */}
      <div className="absolute right-36 top-3">
        <CopyClipboard text={formattedCode} />
      </div>
    </div>
  )
}
