import { History } from 'lucide-react'

import { useAuthStore } from '@/zustand'

import { BusquedaReciente } from '../../../models'
import { CardWrapper } from './CardWrapper'
import { Item } from './Item'

interface Props {
  recents: BusquedaReciente[]
  updateOpen(state: boolean): void
}

export function Recents({ recents, updateOpen }: Props) {
  const authContext = useAuthStore((state) => state.authContext)

  return (
    <CardWrapper title={`Búsquedas recientes para '${authContext?.database}'`}>
      {recents.map((data) => (
        <Item key={data.objectId} objectId={data.objectId} updateOpen={updateOpen}>
          <History size={14} className="text-primary mt-0.5" />
          <div className="flex w-full items-center justify-between gap-1 transition-colors">
            <span className="text-primary overflow-hidden">{data.objectName}</span>
          </div>
        </Item>
      ))}
    </CardWrapper>
  )
}
