import './styles/editor.style.css'

import { DiffEditor } from '@monaco-editor/react'
import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'

import { CopyClipboard } from '@/components/main/CopyClipboard'
import { THEMES } from '@/constants'
import { useAuthStore, useConfigStore, useDiffEditorStore, useEditorStore, useSQLDefinitionStore } from '@/stores'
import { formatPermissionRoles } from '@/utilities'

import { options } from './constants/editor-options'

export function DiffEditorCode() {
  const renderWhitespace = useEditorStore((state) => state.renderWhitespace)
  const renderSideBySide = useEditorStore((state) => state.renderSideBySide)
  const onDiffEditor = useDiffEditorStore((state) => state.onDiffEditor)
  const code = useSQLDefinitionStore((state) => state.SQLDefinitionCode)
  const object = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const { schema, name, permission, definition } = useSQLDefinitionStore((state) => state.SQLDefinitionAligmentObject)
  const fontSize = useEditorStore((state) => state.fontSize)
  const theme = useEditorStore((state) => state.theme)
  const isMaximized = useConfigStore((state) => state.isMaximized)

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

  // Renderizar los componentes de clipboard para el código original y modificado
  const root = useRef(null)
  const root2 = useRef(null)
  const isMounted = useRef(false)
  const observer = useRef(null)

  useEffect(() => {
    isMounted.current = true

    // Verificar si el contenedor ya está presente
    const checkAndInjectComponent = () => {
      const targetOriginalElement = document.querySelector('.side-by-side .editor.original')
      const targetModifiedElement = document.querySelector('.side-by-side .editor.modified')

      if (!targetOriginalElement || !targetModifiedElement) return

      // Evitar renderizar duplicados
      let componentContainer = targetOriginalElement.querySelector('.inyected-component')
      let componentContainer2 = targetModifiedElement.querySelector('.inyected-component')

      if (!componentContainer) {
        componentContainer = document.createElement('div')
        componentContainer.classList.add('inyected-component')
        targetOriginalElement.insertBefore(componentContainer, targetOriginalElement.firstChild)
      }

      if (!componentContainer2) {
        componentContainer2 = document.createElement('div')
        componentContainer2.classList.add('inyected-component')
        targetModifiedElement.insertBefore(componentContainer2, targetModifiedElement.firstChild)
      }

      if (!isMounted) return

      // Re-crear los root nodes y renderizar los componentes
      if (root.current == null) {
        root.current = ReactDOM.createRoot(componentContainer)
        root.current.render(
          <div className="absolute top-3 right-6 z-50">
            <CopyClipboard text={aligmentCode} />
          </div>,
        )
      }
      if (root2.current == null) {
        root2.current = ReactDOM.createRoot(componentContainer2)
        root2.current.render(
          <div className="absolute top-3 right-6 z-50">
            <CopyClipboard text={formattedCode} />
          </div>,
        )
      }

      observer.current.disconnect()
    }

    // Crear un observador de mutaciones (para mostrar los componentes en la carga inicial)
    observer.current = new MutationObserver(() => {
      checkAndInjectComponent()
    })

    // Si el estado indica que el editor está listo, comenzamos a observar
    if (onDiffEditor) {
      observer.current.observe(document.body, {
        childList: true, // detecta cuando se agregan o eliminan hijos
        subtree: true, // observa todo el árbol de nodos
      })

      // intentar inyectar inmediatamente (por si el elemento ya está presente)
      checkAndInjectComponent()
    }

    // limpiar el observador y desmontar los componentes cuando el componente se desmonte
    return () => {
      isMounted.current = false

      // evita que el unmount se realice mientra React termina de renderizar, una vez termina el renderizado de React se desmonta (React no puede manejar dos desmontajes al mismo tiempo)
      queueMicrotask(() => {
        if (root.current) {
          root.current.unmount()
          root.current = null
        }
        if (root2.current) {
          root2.current.unmount()
          root2.current = null
        }
      })

      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [onDiffEditor, aligmentCode, formattedCode, renderSideBySide])

  // Define la MARCA DE AGUA para usarse en CSS
  document.documentElement.style.setProperty('--aligment-database-content', JSON.stringify(dbprodName))
  document.documentElement.style.setProperty('--current-database-content', JSON.stringify(dbname))

  const fullOptions = { ...options, renderWhitespace, renderSideBySide, fontSize }

  return (
    <div className="group relative">
      <DiffEditor
        beforeMount={handleEditorDidMount}
        language="sql"
        defaultValue="// some comment"
        height={isMaximized ? '93vh' : '88vh'}
        theme={theme}
        original={loadingAligment ? 'Buscando información, esto puede tardar unos segundos...' : aligmentCode}
        modified={formattedCode}
        options={{ ...fullOptions }}
        loading={<div>Cargando...</div>}
      />
    </div>
  )
}
