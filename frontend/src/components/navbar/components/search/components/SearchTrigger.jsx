import { Search as SearchIcon } from 'lucide-react'

export function SearchTrigger({ reset, updateOpen }) {
  // abre el buscador al hacer click
  const handleOpenDialog = () => {
    updateOpen((open) => !open)
    reset()
  }

  return (
    <button
      className="flex items-center gap-2 px-3 transition-colors rounded-sm hover:bg-action-hover h-9 place-content-center"
      onClick={handleOpenDialog}
    >
      <SearchIcon size={16} />
      <kbd className="font-mono pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-card px-1.5 font-medium text-muted-foreground opacity-100">
        <span className="text-[10px]">⌘</span>
        <span className="text-sm">J</span>
      </kbd>
    </button>
  )
}
