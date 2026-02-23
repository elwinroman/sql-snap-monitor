import type { BaseSysObjectType } from '@/models/sysobject'

export interface Favorito {
  id: number
  schema: string
  objectName: string
  type: BaseSysObjectType
  date: string | Date
  objectId: number | null
}

export interface FavoritoApiResponse {
  correlationId: string
  meta: { total: number }
  data: Favorito[]
}

export interface UpsertFavoritoBody {
  schema: string
  objectName: string
  type: string
}
