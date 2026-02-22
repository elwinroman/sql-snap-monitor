import { BaseSysObjectType } from '@/models/sysobject'

export interface BusquedaReciente {
  id: number
  schema: string
  objectName: string
  type: BaseSysObjectType
  date: string | Date
  objectId: number
}
