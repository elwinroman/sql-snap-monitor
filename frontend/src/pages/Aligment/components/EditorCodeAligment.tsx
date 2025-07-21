import Editor from '@monaco-editor/react'
import { Monaco } from '@monaco-editor/react'

import { CopyClipboard } from '@/components/main/CopyClipboard'
import { BaseMonacoEditorOptions, MonacoThemes } from '@/constants'
import { EDITOR_BANNER } from '@/enviroment/enviroment'
import { TypeViews } from '@/models/sysobject'
import { ensureBuiltinTheme, formatPermissionRoles } from '@/utilities'
import { useAligmentStore, useEditorOptionsStore } from '@/zustand'

import { useSearchContext } from '../hooks/useSearchContext'

export function EditorCodeAligment() {
  const renderWhitespace = useEditorOptionsStore((state) => state.renderWhitespace)
  const fontSize = useEditorOptionsStore((state) => state.fontSize)
  const theme = useEditorOptionsStore((state) => state.theme)
  const viewMode = useAligmentStore((state) => state.viewMode)
  const sysobject = useAligmentStore((state) => state.sysobject)

  const { error, loading } = useSearchContext()

  let code = EDITOR_BANNER

  if (sysobject) {
    // formatea roles
    const roles = formatPermissionRoles({ permission: sysobject.permission, schemaName: sysobject.schemaName, objectName: sysobject.name })

    switch (viewMode) {
      case TypeViews.FullView:
        code = sysobject.definition + roles
        break
      case TypeViews.ObjectOnly:
        code = sysobject.definition
        break
      case TypeViews.RolesOnly:
        code = roles === '' ? 'WARNING: El objeto existe pero no tiene roles asignados' : roles
        break
      default:
        code = sysobject.definition + roles
    }
  }

  if (error) code = error.detail

  // cargar temas (estilos) de monaco
  const handleEditorDidMount = (monaco: Monaco) => {
    for (const [keyTheme, valueTheme] of Object.entries(MonacoThemes)) {
      monaco.editor.defineTheme(keyTheme, {
        ...valueTheme.json,
        base: ensureBuiltinTheme(valueTheme.json.base),
      })
    }
  }

  const fullOptions = { ...BaseMonacoEditorOptions, renderWhitespace, fontSize }

  return (
    <div className="group relative h-full">
      <Editor
        beforeMount={handleEditorDidMount}
        language={sysobject ? 'sql' : 'shell'}
        defaultValue={EDITOR_BANNER}
        theme={theme}
        value={!loading ? code : 'Buscando información, esto puede tardar unos segundos...'}
        options={{ ...fullOptions }}
        loading={<div>Cargando...</div>}
      />

      {/* Copiar */}
      <div className="absolute top-3 right-36">
        <CopyClipboard text={code} />
      </div>
    </div>
  )
}
