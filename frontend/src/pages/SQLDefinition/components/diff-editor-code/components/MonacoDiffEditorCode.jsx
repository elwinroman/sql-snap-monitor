import './styles/editor.style.css'

import { DiffEditor } from '@monaco-editor/react'

import { THEMES } from '@/constants'
import { useAuthStore, useEditorStore, useSQLDefinitionStore } from '@/stores'
import { formatPermissionRoles } from '@/utilities'

import { options } from '../../constants/editor-options'
import { useInjectionComponent } from './useInjectionComponent'

export function MonacoDiffEditorCode() {
  const renderWhitespace = useEditorStore((state) => state.renderWhitespace)
  const renderSideBySide = useEditorStore((state) => state.renderSideBySide)
  const code = useSQLDefinitionStore((state) => state.SQLDefinitionCode)
  const object = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const { schema, name, permission, definition } = useSQLDefinitionStore((state) => state.SQLDefinitionAligmentObject)
  const fontSize = useEditorStore((state) => state.fontSize)
  const theme = useEditorStore((state) => state.theme)

  const hasRoles = useEditorStore((state) => state.hasRoles)
  const loadingAligment = useSQLDefinitionStore((state) => state.loadingAligment)

  const dbname = useAuthStore((state) => state.dbname)
  const dbprodName = useAuthStore((state) => state.dbprodName)

  const formattedCode = hasRoles ? code + formatPermissionRoles(object.permission, object.schema, object.name) : code
  const aligmentCode = hasRoles ? definition + formatPermissionRoles(permission, schema, name) : definition

  // cargar themes de monaco
  const handleEditorDidMount = (monaco) => {
    for (const themeItem of THEMES) {
      monaco.editor.defineTheme(themeItem.tag, {
        ...themeItem.json,
      })
    }
  }

  // Hook para la inyección de componentes dentro del diff editor
  const { render: injectComponents } = useInjectionComponent({
    aligmentCode,
    formattedCode,
    renderSideBySide,
  })

  // Define la MARCA DE AGUA para usarse en CSS
  document.documentElement.style.setProperty('--aligment-database-content', JSON.stringify(dbprodName))
  document.documentElement.style.setProperty('--current-database-content', JSON.stringify(dbname))

  const fullOptions = { ...options, renderWhitespace, renderSideBySide, fontSize }

  return (
    <div className="group relative">
      <DiffEditor
        beforeMount={handleEditorDidMount}
        onMount={injectComponents}
        language="sql"
        defaultValue="// some comment"
        height="89.85vh"
        theme={theme}
        original={loadingAligment ? 'Buscando información, esto puede tardar unos segundos...' : aligmentCode}
        modified={formattedCode}
        options={{ ...fullOptions }}
        loading={<div>Cargando...</div>}
      />
    </div>
  )
}
