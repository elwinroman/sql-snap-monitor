import { CustomError } from './custom-error-model'

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

export interface ForRetrievingSearch {
  obtenerSugerencias(name: string, type?: string): Promise<SearchResponse | CustomError | undefined>
}
