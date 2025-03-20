import { GitCompare, GitPullRequestClosed } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useDiffEditorStore, useSQLDefinitionStore } from '@/stores'

export function DiffCompare() {
  const onDiffEditor = useDiffEditorStore((state) => state.onDiffEditor)
  const updateDiffEditor = useDiffEditorStore((state) => state.updateDiffEditor)
  const { id } = useSQLDefinitionStore((state) => state.SQLDefinitionAligmentObject)
  const { id: objectId } = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const getSQLDefinitionAligmentObject = useSQLDefinitionStore((state) => state.getSQLDefinitionAligmentObject)
  const hasAligmentObject = useSQLDefinitionStore((state) => state.hasAligmentObject)
  const loadingAligment = useSQLDefinitionStore((state) => state.loadingAligment)

  const handleClick = (e) => {
    e.preventDefault()

    if (loadingAligment) return

    // buscar el objeto de alineación solo una vez
    if (id === null) getSQLDefinitionAligmentObject()

    updateDiffEditor(!onDiffEditor)
  }

  return (
    <>
      {hasAligmentObject ? (
        <button
          className={`${loadingAligment ? 'cursor-not-allowed' : ''} h-7 w-auto rounded-sm border border-zinc-400/30 px-2 transition duration-200 ${onDiffEditor ? 'bg-indigo-700 hover:bg-indigo-600' : 'bg-pink-700 hover:bg-pink-600'}`}
          onClick={handleClick}
          disabled={!objectId}
        >
          <div className="flex items-center justify-center gap-1 flex-nowrap">
            <i className="text-white">
              <GitCompare size={14} />
            </i>
            <span className={`text-nowrap pt-[2px] text-xs font-semibold text-white transition duration-700`}>
              {onDiffEditor ? 'Mostrar solo local' : 'Comparar'}
            </span>
          </div>
        </button>
      ) : (
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <button
                className={`h-7 w-auto cursor-not-allowed rounded-sm border border-zinc-400/30 bg-gray-800 px-2 transition duration-200`}
              >
                <div className="flex items-center justify-center gap-1">
                  <i className="text-zinc-200">
                    <GitPullRequestClosed size={14} />
                  </i>
                  <span className={`pt-[2px] text-xs font-semibold text-zinc-200 transition duration-700`}>Comparar</span>
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>No se puede comparar, parece que tu objeto es nuevo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  )
}
