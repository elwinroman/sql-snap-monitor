import { AArrowDown, AArrowUp } from 'lucide-react'

import { useEditorStore } from '@/stores'

export function FontSize() {
  const fontSize = useEditorStore((state) => state.fontSize)
  const updateFontSize = useEditorStore((state) => state.updateFontSize)

  const handleClickUp = (e) => {
    e.preventDefault()
    updateFontSize(fontSize + 1)
  }

  const handleClickDown = (e) => {
    e.preventDefault()
    updateFontSize(fontSize - 1)
  }

  return (
    <div className="flex flex-nowrap rounded-sm">
      <button
        className="group rounded-l-sm border-y border-l border-zinc-700 bg-background px-1.5 py-1.5 hover:bg-accent"
        onClick={handleClickDown}
      >
        <i className="text-white group-hover:text-zinc-400">
          <AArrowDown size={14} />
        </i>
      </button>

      <div className="border border-zinc-700/50 bg-background">
        <span className="px-1.5 text-xs">{fontSize}</span>
      </div>

      <button
        className="group rounded-r-sm border-y border-r border-zinc-700 bg-background px-1.5 py-1.5 hover:bg-accent"
        onClick={handleClickUp}
      >
        <i className="text-white group-hover:text-zinc-400">
          <AArrowUp size={14} />
        </i>
      </button>
    </div>
  )
}
