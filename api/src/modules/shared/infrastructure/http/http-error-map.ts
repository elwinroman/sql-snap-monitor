export const httpErrorMap: Record<string, { status: number; errorCode: number }> = {
  // Commons
  ValidationException: { status: 404, errorCode: 1000 },
  RouteNotFoundException: { status: 404, errorCode: 1001 },
  SessionExpiredException: { status: 403, errorCode: 1002 },

  // Auth
  InvalidCredentialsException: { status: 404, errorCode: 2000 },
  UserAlreadyAuthenticatedException: { status: 404, errorCode: 2001 },
  UnauthorizedException: { status: 401, errorCode: 2002 },
  TokenExpiredException: { status: 404, errorCode: 2003 },

  // Users
  UserNotFoundException: { status: 404, errorCode: 3000 },
  UserAlreadyExistsError: { status: 400, errorCode: 3001 },
  InternalServerErrorException: { status: 500, errorCode: 3002 },
  PermissionDenyException: { status: 502, errorCode: 3003 },

  // FinLog
  FinLogNotFoundException: { status: 404, errorCode: 4000 },
}
