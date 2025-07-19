export interface ErrorApiResponse {
  correlationId: string
  error: {
    type: string
    title: string
    status: number
    detail: string
    errorCode: number
    invalidParams?: []
  }
}
