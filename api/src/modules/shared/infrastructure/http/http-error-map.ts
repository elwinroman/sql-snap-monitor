export const httpErrorMap: Record<string, { status: number; errorCode: number }> = {
  // Auth
  InvalidCredentialsException: { status: 404, errorCode: 10009 },

  // Users
  UserNotFoundException: { status: 404, errorCode: 10001 },
  UserAlreadyExistsError: { status: 400, errorCode: 10002 },
  InternalServerErrorException: { status: 500, errorCode: 10003 },
  PermissionDenyException: { status: 502, errorCode: 10005 },

  // Commons
  ValidationException: { status: 404, errorCode: 10006 },
  RouteNotFoundException: { status: 404, errorCode: 10007 },

  // Cryptocode
  DecryptionException: { status: 504, errorCode: 10008 },
}
