import { ChevronRight } from 'lucide-react'

import { ToggleFavoritoButton, useFavoritoContext } from '@/components/favoritos'

import { useUserTableStore } from '../store/usertable.store'

export function HeaderUsertable() {
  const object = useUserTableStore((state) => state.userTableObject)
  const { isFavorito, upsertFavorito, deleteFavorito } = useFavoritoContext()

  const hasObject = !!object?.name
  const currentFavorito = hasObject ? isFavorito(object.name, object.schemaName) : undefined

  const handleToggleFavorito = () => {
    if (!hasObject) return

    if (currentFavorito) {
      deleteFavorito(currentFavorito.id)
    } else {
      upsertFavorito(object.schemaName, object.name, object.type)
    }
  }

  return (
    <header className="bg-background flex h-10 items-center justify-between px-4">
      {/* Breadcrumb */}
      {hasObject ? (
        <ul className="text-secondary flex items-center gap-0.5 text-[13px] font-medium">
          <li>{object.schemaName}</li>
          <li>
            <ChevronRight size={14} className="place-self-center-safe" />
          </li>
          <li className="text-primary overflow-hidden">{object.name}</li>
        </ul>
      ) : (
        <div className="flex h-11 items-center text-[13px]"></div>
      )}

      {/* Acciones */}
      <div className="flex items-center gap-1">
        {hasObject && <ToggleFavoritoButton isFavorite={!!currentFavorito} onClick={handleToggleFavorito} />}
      </div>
    </header>
  )
}
