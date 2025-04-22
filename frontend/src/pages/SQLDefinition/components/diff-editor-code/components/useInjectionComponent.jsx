import { HardDrive } from 'lucide-react'
import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'

import { CopyClipboard } from '@/components/main/CopyClipboard'
import { useAuthStore } from '@/stores'

/** Este hook inyecta y actualiza dinámicamente los componentes en Monaco Diff Editor */
export function useInjectionComponent({ aligmentCode, formattedCode, renderSideBySide }) {
  const dbprodName = useAuthStore((state) => state.dbprodName)
  const dbName = useAuthStore((state) => state.dbName)
  const rootOriginal = useRef(null)
  const rootModified = useRef(null)

  const containerOriginalRef = useRef(null)
  const containerModifiedRef = useRef(null)

  /** Comprueba que se tenga siempre disponible los nodos para inyectar componentes dentro de ellos */
  const ensureContainers = () => {
    // las clases para el selector son propias de MonacoEditor
    const selectors = {
      original: '.side-by-side .editor.original',
      modified: '.side-by-side .editor.modified',
    }
    const targets = {
      original: document.querySelector(selectors.original),
      modified: document.querySelector(selectors.modified),
    }
    if (!targets.original || !targets.modified) return false

    // comprueba si existe los nodos y los crea si es necesario
    const ensureContainer = (target, ref) => {
      if (!ref.current) {
        ref.current =
          target.querySelector('.inyected-component') ||
          (() => {
            const container = document.createElement('div')
            container.className = 'inyected-component'
            target.insertBefore(container, target.firstChild)
            return container
          })()
      }
      return ref.current
    }
    containerOriginalRef.current = ensureContainer(targets.original, containerOriginalRef)
    containerModifiedRef.current = ensureContainer(targets.modified, containerModifiedRef)
    return true
  }

  // renderiza de los componentes React dentro de los contenedores
  const render = () => {
    if (!ensureContainers()) return

    // Creación dinámica de los roots
    const initializeRoot = (containerRef, rootRef) => {
      if (!rootRef.current && containerRef.current) rootRef.current = ReactDOM.createRoot(containerRef.current)
      return rootRef.current
    }

    rootOriginal.current = initializeRoot(containerOriginalRef, rootOriginal)
    rootModified.current = initializeRoot(containerModifiedRef, rootModified)

    if (!rootOriginal.current || !rootModified.current) return

    // renderizado
    rootOriginal.current.render(
      <>
        <div className="absolute top-12 right-6 z-50">
          <CopyClipboard text={aligmentCode} />
        </div>
        {renderSideBySide && (
          <div className="bg-background text-secondary flex items-center gap-2 px-4 py-2 text-sm font-semibold dark:font-medium">
            <HardDrive size={14} />
            <p>
              <span className="pr-1">Pre-producción:</span>
              <span>{dbprodName}</span>
            </p>
          </div>
        )}
      </>,
    )

    rootModified.current.render(
      <>
        <div className="absolute top-12 right-6 z-50">
          <CopyClipboard text={formattedCode} />
        </div>
        {renderSideBySide && (
          <div className="bg-background text-secondary flex items-center gap-2 px-4 py-2 text-sm font-semibold dark:font-medium">
            <HardDrive size={14} />
            <p>
              <span className="pr-1">Pruebas:</span>
              <span>{dbName}</span>
            </p>
          </div>
        )}
      </>,
    )
  }

  // Limpieza total y desmontaje
  const cleanup = () => {
    rootOriginal.current?.unmount()
    rootModified.current?.unmount()
    rootOriginal.current = null
    rootModified.current = null
    containerOriginalRef.current = null
    containerModifiedRef.current = null
  }
  /**
   * `queueMicrotask` asegura que `render` se ejecute
   * después del render actual, evitando conflictos con React
   * y permite desmontar y actualizar dependencias de forma segura
   **/
  useEffect(() => {
    queueMicrotask(render)
    return () => queueMicrotask(cleanup)
  }, [aligmentCode, formattedCode, renderSideBySide])

  return { render, cleanup }
}
