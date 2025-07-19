export interface LoginApiResponse {
  correlationId: string
  data: {
    id: number
    user: string
    aliasHost: string
    token: {
      accessToken: string
      refreshToken: string
    }
    storeDetails: {
      name: string
      compatibily: string
      description: string
      server: string
      date: Date | string
      viewdefinitionPermission: boolean
    }
  }
}
