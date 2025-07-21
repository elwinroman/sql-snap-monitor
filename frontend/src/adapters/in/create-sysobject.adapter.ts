import { FullSysObjectApiResponse } from '@/models/api'
import { FullSysObject } from '@/models/sysobject'

export const createSysObjectAdapter = (apiResponse: FullSysObjectApiResponse): FullSysObject => {
  return apiResponse.data
}
