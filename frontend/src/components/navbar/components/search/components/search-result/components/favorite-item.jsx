import { Star } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { useSearch } from '../../../hooks/useSearch'

export function FavoriteItem({ content, data }) {
  const { type, addFavorite } = useSearch()

  // registrar favorito
  const handleFavoriteAction = (e) => {
    e.stopPropagation()

    // si el objeto ya es favorito, no se hace nada
    if (data.lFavorito) return

    addFavorite({
      idTipoAccion: type.id,
      cSchema: data.cSchema,
      cNombreObjeto: data.cNombreObjeto,
    })

    // mostrar a nivel visula el icono favorito cuando se elije el objeto como favorito
    data.lFavorito = true
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100} disableHoverableContent={true}>
        <TooltipTrigger asChild>
          <a onClick={handleFavoriteAction} className="px-1 py-1 rounded-sm transition-color hover:bg-background-paper">
            {data.lFavorito ? (
              <Star fill="#EAC612" stroke={0} size={16} className="text-secondary hover:text-primary" />
            ) : (
              <Star size={16} className="text-secondary hover:text-primary" />
            )}
          </a>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
