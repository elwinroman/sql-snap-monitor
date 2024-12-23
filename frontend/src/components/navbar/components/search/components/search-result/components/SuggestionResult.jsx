import { Layers, Sheet, SquareActivity, SquareChartGantt, SquareFunction } from 'lucide-react'

import { useSearch } from '../../../hooks/useSearch'
import { Card } from './card'
import { ItemList } from './item-list'

export function SuggestionResult() {
  const { suggestions } = useSearch()
  const title = 'Sugerencias de búsqueda'

  const iconTypeMap = {
    SQL_STORED_PROCEDURE: <SquareChartGantt size={15} className="text-secondary group-hover:text-primary" />,
    SQL_TRIGGER: <SquareActivity size={15} className="text-secondary group-hover:text-primary" />,
    VIEW: <Layers size={14} className="text-secondary group-hover:text-primary" />,
    SQL_TABLE_VALUED_FUNCTION: <SquareFunction size={15} className="text-secondary group-hover:text-primary" />,
    SQL_SCALAR_FUNCTION: <SquareFunction size={15} className="text-secondary group-hover:text-primary" />,
    USER_TABLE: <Sheet size={14} className="text-secondary group-hover:text-primary" />,
  }

  return (
    <Card title={title}>
      {suggestions.map((data) => (
        <ItemList key={data.objectId} data={data}>
          {iconTypeMap[data.cTypeDesc]}

          <p className="flex w-full items-center justify-between gap-1 transition-colors">
            <span className="overflow-hidden text-secondary group-hover:text-primary">{data.cNombreObjeto}</span>
            <span className="overflow-hidden rounded-sm bg-background px-1 py-0.5 text-xs text-muted">{data.cSchema}</span>
          </p>
        </ItemList>
      ))}
    </Card>
  )
}

// SquareChartGantt
