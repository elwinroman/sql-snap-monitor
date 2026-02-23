import { CircleDashed, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useSysObjectStore } from '@/zustand'

import type { Favorito } from '../../../../models/favorito.model'
import { CollapsibleSection } from './CollapsibleSection'

interface Props {
  favoritos: Favorito[]
  onDelete(id: number): void
}

export function FavoritosList({ favoritos, onDelete }: Props) {
  const sysobject = useSysObjectStore((state) => state.sysobject)
  const fetchSysObject = useSysObjectStore((state) => state.fetchSysObject)

  const isActive = (fav: Favorito) => sysobject?.name === fav.objectName && sysobject?.schemaName === fav.schema

  const handleClick = (objectId: number) => {
    fetchSysObject(objectId)
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation()
    onDelete(id)
  }

  if (favoritos.length === 0) {
    return (
      <CollapsibleSection title="Favoritos">
        <li className="text-secondary px-4 py-2 text-xs">Sin favoritos aún</li>
      </CollapsibleSection>
    )
  }

  return (
    <CollapsibleSection title="Favoritos">
      {favoritos.map((fav) => (
        <li key={fav.id} className={cn('group/fav relative mx-2 rounded-sm', isActive(fav) && 'bg-action-hover')}>
          <button
            type="button"
            className="hover:bg-action-hover flex w-full cursor-pointer items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm"
            onClick={() => handleClick(fav.objectId)}
          >
            <CircleDashed
              size={14}
              className={cn('shrink-0', isActive(fav) ? 'text-primary' : 'text-secondary group-hover/fav:text-primary')}
            />
            <span className={cn('truncate text-sm', isActive(fav) ? 'text-primary' : 'text-primary/60 group-hover/fav:text-primary')}>
              {fav.objectName}
            </span>
          </button>

          <button
            type="button"
            title="Quitar de favoritos"
            className="text-primary absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer opacity-0 transition-opacity group-hover/fav:opacity-100"
            onClick={(e) => handleDelete(e, fav.id)}
          >
            <X size={14} />
          </button>
        </li>
      ))}
    </CollapsibleSection>
  )
}
