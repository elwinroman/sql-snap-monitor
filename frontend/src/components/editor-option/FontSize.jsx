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
    <div className="flex h-7 flex-nowrap rounded-sm">
      <button
        className="bg-background-paperchanel group rounded-l-sm border-y border-l border-gray-500/20 px-1.5 hover:bg-white/[0.08]"
        onClick={handleClickDown}
      >
        <i className="text-primary group-hover:text-secondary">
          <AArrowDown size={14} />
        </i>
      </button>

      <div className="border border-gray-500/20 bg-background-neutral">
        <span className="px-1.5 text-xs">{fontSize}</span>
      </div>

      <button
        className="bg-background-paperchanel group rounded-r-sm border-y border-r border-gray-500/20 px-1.5 hover:bg-white/[0.08]"
        onClick={handleClickUp}
      >
        <i className="text-primary group-hover:text-secondary">
          <AArrowUp size={14} />
        </i>
      </button>
    </div>
  )
}
