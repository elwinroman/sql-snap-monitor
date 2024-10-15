import { PackageSearch } from 'lucide-react'
import { forwardRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const SuggestionSearchCard = forwardRef(({ suggestions, isFocus, updateFocus, updateSearch }, ref) => {
  // Para manejar el preventDefault, es necesario añadir el evento y eliminarlo despues
  useEffect(() => {
    if (!isFocus || suggestions.length === 0) return

    // Manejar el evento de scroll para evitar la propagación hacia el body
    const handleWheel = (e) => {
      const isScrollingUp = e.deltaY < 0
      const isScrollingDown = e.deltaY > 0

      const { scrollTop, scrollHeight, clientHeight } = ref.current

      if (
        (isScrollingUp && scrollTop === 0) || // al inicio
        (isScrollingDown && scrollTop + clientHeight >= scrollHeight) // al final
      ) {
        e.preventDefault()
      }
    }

    const card = ref.current
    card.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      card.removeEventListener('wheel', handleWheel)
    }
  }, [isFocus, suggestions, ref])

  const handleClick = (e) => {
    e.preventDefault()
    updateFocus(false)
    updateSearch(e.currentTarget.dataset.name)
  }

  return (
    <article
      className="absolute z-50 h-auto max-h-80 w-full translate-y-1 overflow-y-auto overflow-x-hidden rounded-sm border bg-background shadow-md outline-none"
      ref={ref}
    >
      <ul className="flex flex-col py-1">
        <span className="px-4 py-1 text-[0.84rem] text-zinc-400">Sugerencias relacionadas a la búsqueda</span>
        {suggestions.map((data) => (
          <li key={uuidv4()}>
            <button
              data-name={data.name}
              className="pointer-events-auto flex w-full cursor-pointer items-center gap-2 px-4 py-1.5 text-left align-text-top text-sm text-zinc-200 hover:bg-accent"
              onClick={handleClick}
            >
              <i className="pb-0.5">
                <PackageSearch size={13} />
              </i>
              <span className="overflow-hidden">{data.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
})

SuggestionSearchCard.displayName = 'SuggestionSearchCard'
