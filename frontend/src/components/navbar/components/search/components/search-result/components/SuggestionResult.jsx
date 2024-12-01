import { PackageSearch } from 'lucide-react'

import { useSearch } from '../../../hooks/useSearch'
import { Card } from './card'
import { ItemList } from './item-list'

export function SuggestionResult() {
  const { suggestions } = useSearch()
  const title = 'Sugerencias de búsqueda'

  return (
    <Card title={title}>
      {suggestions.map((data) => (
        <ItemList key={data.id} data={data}>
          <PackageSearch size={13} className="text-secondary group-hover:text-primary" />

          <p className="flex w-full justify-between gap-1 transition-colors">
            <span className="overflow-hidden text-secondary group-hover:text-primary">{data.name}</span>
            <span className="overflow-hidden rounded-sm bg-background px-1 py-0.5 text-xs text-muted">{data.schemaName}</span>
          </p>
        </ItemList>
      ))}
    </Card>
  )
}
