import { BaseSysObjectType } from '@/models/sysobject'

export interface BusquedaReciente {
  id: string
  schema: string
  objectName: string
  type: BaseSysObjectType
  date: string | Date
  objectId: number
}
