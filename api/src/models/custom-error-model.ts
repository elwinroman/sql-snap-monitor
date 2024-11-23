export interface OriginalError {
  code: string | undefined
  number: number | undefined
  message: string | undefined
}

export interface CustomError {
  status: string
  statusCode: number
  message: string
  originalError?: OriginalError
}

export class MyCustomError extends Error implements CustomError {
  status: string
  statusCode: number
  originalError?: OriginalError

  constructor(customError: CustomError) {
    super(customError.message)
    this.status = customError.status
    this.statusCode = customError.statusCode
    this.message = customError.message
    this.originalError = customError.originalError ?? undefined

    this.name = 'MyCustomError'
    Error.captureStackTrace(this, this.constructor)
  }
}
