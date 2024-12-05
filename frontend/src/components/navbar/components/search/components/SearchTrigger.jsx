import { Search as SearchIcon } from 'lucide-react'

export function SearchTrigger({ reset, updateOpen }) {
  // abre el buscador al hacer click
  const handleOpenDialog = () => {
    updateOpen((open) => !open)
    reset()
  }

  return (
    <button
      className="flex h-9 place-content-center items-center gap-2 rounded-sm px-3 transition-colors hover:bg-background"
      onClick={handleOpenDialog}
    >
      <SearchIcon size={16} />
      <kbd className="font-mono pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-card px-1.5 font-medium text-muted-foreground opacity-100">
        <span className="text-sm">⌘</span>
        <span className="text-[11px]">J</span>
      </kbd>
    </button>
  )
}
