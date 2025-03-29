export const httpErrorMap: Record<string, { status: number; errorCode: number }> = {
  UserNotFoundException: { status: 404, errorCode: 10002 },
  UserAlreadyExistsError: { status: 400, errorCode: 10003 },
  InternalServerErrorException: { status: 500, errorCode: 10001 },
  PermissionDenyException: { status: 502, errorCode: 10002 },

  // Mapeo de errores de MSSQL Nodejs
  DatabaseConnectionErrorException: { status: 404, errorCode: 10002 },

  ValidationException: { status: 404, errorCode: 10000 },
  RouteNotFoundException: { status: 404, errorCode: 1000 },

  // Cryptocode
  DecryptionException: { status: 504, errorCode: 10001 },
}
