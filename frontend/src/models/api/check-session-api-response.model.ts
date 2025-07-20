export interface CheckSessionApiResponse {
  correlationId: string
  data: {
    databaseConnection: string
    viewdefinitionPermission: boolean
    createdAt: Date | string
  }
}
