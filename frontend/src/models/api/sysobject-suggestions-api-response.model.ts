import { SysObjectSuggestion } from '../sysobject'

type SysObjectSuggestionApi = Pick<SysObjectSuggestion, 'id' | 'name' | 'typeDesc'> & { schemaName: string }

export interface SysObjectSuggestionsApiResponse {
  correlationId: string
  data: SysObjectSuggestionApi[]
}
