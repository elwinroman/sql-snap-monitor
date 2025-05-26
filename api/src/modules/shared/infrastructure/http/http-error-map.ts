export const httpErrorMap: Record<string, { status: number; errorCode: number }> = {
  // Global
  ValidationException: { status: 422, errorCode: 1000 },
  RouteNotFoundException: { status: 404, errorCode: 1001 },
  InternalServerErrorException: { status: 500, errorCode: 1002 },
  UnauthorizedException: { status: 401, errorCode: 1003 },
  ForbiddenException: { status: 403, errorCode: 1004 },

  // Auth
  InvalidCredentialsException: { status: 401, errorCode: 2000 },
  UserAlreadyAuthenticatedException: { status: 409, errorCode: 2001 },
  TokenExpiredException: { status: 401, errorCode: 2003 },
  NotProvidedTokenException: { status: 401, errorCode: 2004 },
  PermissionDenyException: { status: 403, errorCode: 2005 },

  // FinLog
  FinLogNotFoundException: { status: 404, errorCode: 4000 },
}
