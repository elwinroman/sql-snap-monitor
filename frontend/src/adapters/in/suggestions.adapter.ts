import { SysObjectSuggestionsApiResponse } from '@/models/api'
import { SysObjectSuggestion } from '@/models/sysobject'

export const suggestionsAdapter = (apiResponse: SysObjectSuggestionsApiResponse): SysObjectSuggestion[] => {
  return apiResponse.data.map((sugerencia) => ({
    id: sugerencia.id,
    name: sugerencia.name,
    schema: sugerencia.schemaName,
    typeDesc: sugerencia.typeDesc,
  }))
}
