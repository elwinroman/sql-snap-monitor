import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react'
import { useRef, useState } from 'react'
import { ImperativePanelHandle } from 'react-resizable-panels'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui'

import { DialogSearchProvider } from '../../contexts/dialogSearchContext'
import { EditorCode, HeaderEditor, PanelEditor } from './components'

export function ScriptContent() {
  const leftPanelRef = useRef<ImperativePanelHandle>(null)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  // Ocultar/mostrar submenu
  const handleHidePanel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!leftPanelRef.current) return

    const isCollapsedCurrent = leftPanelRef.current.isCollapsed()
    setIsCollapsed(!isCollapsedCurrent)

    if (isCollapsedCurrent) leftPanelRef.current.expand()
    else leftPanelRef.current.collapse()
  }

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes) => {
          // TODO: Performance con debounce
          const [leftSize] = sizes
          setIsCollapsed(leftSize === 0)
        }}
      >
        {/* Panel izquierdo del editor */}
        <ResizablePanel
          minSize={isCollapsed ? 0 : 10}
          defaultSize={20}
          maxSize={20}
          className="transition-all"
          collapsible={true}
          collapsedSize={0}
          ref={leftPanelRef}
        >
          {/* Proveedor para el dialog */}
          <DialogSearchProvider>
            <PanelEditor />
          </DialogSearchProvider>
        </ResizablePanel>

        {/* Separador */}
        <ResizableHandle className={!isCollapsed ? 'pointer-events-none' : ''} withHandle={false} />

        {/* Editor area (header) */}
        <ResizablePanel>
          {/* Cabecera del editor */}
          <HeaderEditor />

          {/* Editor Monaco*/}
          <EditorCode />
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Botón para ocultar el panel */}
      {!isCollapsed ? (
        <button
          className="bg-background-neutral ring-border border-border hover:bg-action-hover absolute bottom-2 left-2 z-50 grid h-8 w-8 place-content-center rounded-sm border"
          onClick={handleHidePanel}
        >
          <ArrowLeftToLine size={18} className="text-primary" />
        </button>
      ) : (
        <button
          className="bg-background-neutral ring-border border-border hover:bg-action-hover absolute bottom-2 left-2 z-50 grid h-8 w-8 place-content-center rounded-sm border"
          onClick={handleHidePanel}
        >
          <ArrowRightToLine size={18} className="text-primary" />
        </button>
      )}
    </>
  )
}
