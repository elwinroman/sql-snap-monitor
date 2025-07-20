export interface AuthenticatedUserApiResponse {
  correlationId: string
  data: {
    id: number
    user: string
    aliasHost: string
    storeDetails: {
      name: string
      compatibility: number
      description: string
      server: string
      date: Date | string
      viewDefinitionPermission: boolean
    }
    accessToken: string
  }
}
