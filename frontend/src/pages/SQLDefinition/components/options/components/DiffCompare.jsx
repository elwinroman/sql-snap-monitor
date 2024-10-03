import { GitCompare, GitPullRequestClosed } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useEditorStore, useSQLDefinitionStore } from '@/stores'

export function DiffCompare() {
  const onDiffEditor = useEditorStore((state) => state.onDiffEditor)
  const updateDiffEditor = useEditorStore((state) => state.updateDiffEditor)
  const { id } = useSQLDefinitionStore((state) => state.SQLDefinitionAligmentObject)
  const getSQLDefinitionAligmentObject = useSQLDefinitionStore((state) => state.getSQLDefinitionAligmentObject)
  const hasAligmentObject = useSQLDefinitionStore((state) => state.hasAligmentObject)

  const handleClick = (e) => {
    e.preventDefault()

    // buscar el objeto de alineación solo una vez
    if (id === null) getSQLDefinitionAligmentObject()

    updateDiffEditor(!onDiffEditor)
  }
  const text = !hasAligmentObject ? 'No existe objeto de alineación' : onDiffEditor ? 'Mostrar mi objeto' : 'Comparar con PRE-PRODUCCIÓN'

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            {hasAligmentObject ? (
              <button className={`rounded-sm p-1.5 hover:bg-black ${onDiffEditor ? 'bg-black' : 'bg-transparent'}`} onClick={handleClick}>
                <i className="text-white">
                  <GitCompare size={16} />
                </i>
              </button>
            ) : (
              <button className={`rounded-sm p-1.5`}>
                <i className="text-red-400">
                  <GitPullRequestClosed size={16} />
                </i>
              </button>
            )}
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
