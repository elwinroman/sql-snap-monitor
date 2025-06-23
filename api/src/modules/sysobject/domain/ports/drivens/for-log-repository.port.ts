export interface Type {
  id: number
  name: string
  active: boolean
}

export interface SearchLog {
  idUser: number | null
  actionType: number
  database: string
  schema: string
  search: string
  type: string
  isProduction: boolean
  createdAt: Date | string
}

export interface ForLogRepositoryPort {
  // getTypeById(id: number): Promise<Type | null>
  createSearchLog(logSearch: SearchLog): Promise<boolean>
}
