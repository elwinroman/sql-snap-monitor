import Editor from '@monaco-editor/react'

import { THEMES } from '@/constants'
import { useAligmentStore, useEditorStore } from '@/stores'
import { formatPermissionRoles } from '@/utilities'

import { SELECT_ACTION, VIEW_MODE } from '../../constants/select-actions'
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

export function EditorCodeAligment() {
  const renderWhitespace = useEditorStore((state) => state.renderWhitespace)
  const fontSize = useEditorStore((state) => state.fontSize)
  const theme = useEditorStore((state) => state.theme)

  const action = useAligmentStore((state) => state.action)
  const viewMode = useAligmentStore((state) => state.viewMode)
  const error = useAligmentStore((state) => state.error)
  const loading = useAligmentStore((state) => state.loading)
  const { name, schema, permission, definition } = useAligmentStore((state) => state.object)

  const roles = formatPermissionRoles(permission, schema, name)
  let code = defaultCode

  // muestra en el editor según la acción requerida
  if (error || (name && action === SELECT_ACTION.objeto)) {
    switch (viewMode) {
      case VIEW_MODE.objeto_mas_roles:
        code = error ? error.message : definition + formatPermissionRoles(permission, schema, name)
        break
      case VIEW_MODE.solo_objeto:
        code = error ? error.message : definition
        break
      case VIEW_MODE.solo_roles:
        if (error) code = error.message
        else code = roles === '' ? 'El objeto existe pero no tiene roles asignados' : roles
        break
    }
  }

  // if (action === SELECT_ACTION.campos) code = campos

  // cargar temas (estilos) de monaco
  const handleEditorDidMount = (monaco) => {
    for (const themeItem of THEMES) {
      monaco.editor.defineTheme(themeItem.tag, {
        ...themeItem.json,
      })
    }
  }

  const fullOptions = { ...options, renderWhitespace, fontSize }

  return (
    <Editor
      beforeMount={handleEditorDidMount}
      language="sql"
      defaultValue={defaultCode}
      theme={theme}
      value={!loading ? code : 'Buscando información, esto puede tardar unos segundos...'}
      options={{ ...fullOptions }}
      loading={<div>Cargando...</div>}
    />
  )
}
