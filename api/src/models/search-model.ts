export interface SuggestionSearch {
  id: number
  name: string
  schemaName: string
}

export interface SearchResponse {
  data: SuggestionSearch[]
  meta: {
    length: number
  }
}

export interface GetObjectId {
  schema_name: string
  object_name: string
}

export interface ForRetrievingSearch {
  obtenerSugerencias(name: string, type?: string): Promise<SearchResponse | undefined>
  getIdsInBulk(objects: GetObjectId[]): Promise<number[] | undefined>
  getObjectId(object: GetObjectId): Promise<number | undefined>
}
