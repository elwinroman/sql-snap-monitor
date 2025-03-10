export const httpErrorMap: Record<string, { status: number; errorCode: number }> = {
  UserNotFoundException: { status: 404, errorCode: 10002 },
  UserAlreadyExistsError: { status: 400, errorCode: 10003 },
  InternalServerErrorException: { status: 500, errorCode: 10001 },
}
