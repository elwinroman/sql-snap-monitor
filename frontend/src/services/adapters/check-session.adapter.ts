import { CheckSessionApiResponse } from '@/models/api'

export interface CheckSessionResponse {
  statusDatabaseConn: string
  statusViewDefinition: boolean
}

export const checkSessionAdapter = (apiResponse: CheckSessionApiResponse): CheckSessionResponse => {
  return {
    statusDatabaseConn: apiResponse.data.databaseConnection,
    statusViewDefinition: apiResponse.data.viewdefinitionPermission,
  }
}
