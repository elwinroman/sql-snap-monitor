import Editor from '@monaco-editor/react'

import { THEMES } from '@/constants'
import { useEditorStore, useSQLDefinitionStore } from '@/stores'
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
    <div>
      <Editor
        beforeMount={handleEditorDidMount}
        language="sql"
        defaultValue={defaultCode}
        height="88vh"
        theme={theme}
        value={formattedCode}
        options={{ ...fullOptions }}
        loading={<div>Cargando...</div>}
      />
    </div>
  )
}
