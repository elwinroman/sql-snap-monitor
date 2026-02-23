import { dialogSearchContext } from '@sqldefinition/contexts/dialogSearchContext'
import { Search as SearchIcon } from 'lucide-react'
import { useEffect } from 'react'

import { Button } from '@/components/ui'

export function SearchTrigger() {
  const { open, updateOpen } = dialogSearchContext()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== '/') return

      const target = e.target as HTMLElement
      const isEditable = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
      if (isEditable) return

      e.preventDefault()
      updateOpen(true)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    updateOpen(!open)
  }

  return (
    <Button variant="myGhost" size="sm" className="flex w-full justify-between overflow-hidden" onClick={handleClick}>
      <div className="flex items-center gap-2">
        <SearchIcon size={16} className="text-muted" />
        <span className="text-xs text-ellipsis whitespace-nowrap">Buscar objeto</span>
      </div>

      <kbd className="bg-card text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono font-medium opacity-100 select-none">
        <span className="mt-0.5 text-xs">/</span>
      </kbd>
    </Button>
  )
}
