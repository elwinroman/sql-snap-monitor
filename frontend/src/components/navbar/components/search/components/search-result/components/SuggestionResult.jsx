import { useSearch } from '../../../hooks/useSearch'
import { Card } from './card'
import { ItemList } from './item-list'

export function SuggestionResult() {
  const { suggestions } = useSearch()
  const title = 'Sugerencias de búsqueda'

  return (
    <Card title={title}>
      {suggestions.map((data) => (
        <ItemList key={data.objectId} data={data}>
          <div className="flex w-full items-center justify-between gap-1 transition-colors">
            <p className="flex flex-col">
              <span className="overflow-hidden text-[0.75rem] text-secondary">{data.cSchema}</span>
              <span className="overflow-hidden text-primary group-hover:text-primary">{data.cNombreObjeto}</span>
            </p>
            <span className="bg-background-neutral overflow-hidden rounded-sm px-1 py-0.5 text-[0.65rem] font-bold text-secondary">
              {data.cTypeDesc}
            </span>
          </div>
        </ItemList>
      ))}
    </Card>
  )
}

// SquareChartGantt
