export const httpErrorMap: Record<string, { status: number; errorCode: number }> = {
  UserNotFoundException: { status: 404, errorCode: 10002 },
  UserAlreadyExistsError: { status: 400, errorCode: 10003 },
  InternalServerErrorException: { status: 500, errorCode: 10001 },

  // Mapeo de errores de MSSQL Nodejs
  EloginException: { status: 404, errorCode: 10002 },
  ErequestException: { status: 404, errorCode: 10000 },
  Etimeout: { status: 404, errorCode: 10000 },

  ValidationException: { status: 404, errorCode: 10000 },
  RouteNotFoundException: { status: 404, errorCode: 1000 },
}
