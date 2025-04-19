import { Search as SearchIcon } from 'lucide-react'

export function SearchTrigger({ reset, updateOpen }) {
  // abre el buscador al hacer click
  const handleOpenDialog = () => {
    updateOpen((open) => !open)
    reset()
  }

  return (
    <button
      className="hover:bg-action-hover flex h-9 place-content-center items-center gap-2 rounded-sm px-3 transition-colors"
      onClick={handleOpenDialog}
    >
      <SearchIcon size={16} />
      <kbd className="bg-card text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono font-medium opacity-100 select-none">
        <span className="mt-0.5 text-base">⌘</span>
        <span className="text-sm">J</span>
      </kbd>
    </button>
  )
}
