import { History } from 'lucide-react'

import { AxiosCall } from '@/models'
import { FullSysObject } from '@/models/sysobject'

import { BusquedaReciente } from '../../../models'
import { CardWrapper } from './CardWrapper'
import { Item } from './Item'

interface Props {
  recents: BusquedaReciente[]
  getObject(id: number): AxiosCall<FullSysObject>
  updateOpen(state: boolean): void
}

export function Recents({ recents, getObject, updateOpen }: Props) {
  return (
    <CardWrapper title="Búsquedas recientes">
      {recents.map((data) => (
        <Item key={data.objectId} objectId={data.objectId} getObject={getObject} updateOpen={updateOpen}>
          <History size={14} className="text-primary mt-0.5" />
          <div className="flex w-full items-center justify-between gap-1 transition-colors">
            <span className="text-primary overflow-hidden">{data.objectName}</span>
          </div>
        </Item>
      ))}
    </CardWrapper>
  )
}
