export const httpErrorMap: Record<string, { status: number; errorCode: number }> = {
  // Global
  ValidationException: { status: 422, errorCode: 1000 },
  RouteNotFoundException: { status: 404, errorCode: 1001 },
  InternalServerErrorException: { status: 500, errorCode: 1002 },
  SafeInternalServerErrorException: { status: 500, errorCode: 1003 },
  UnauthorizedException: { status: 401, errorCode: 1004 },
  ForbiddenException: { status: 403, errorCode: 1005 },

  // Auth
  InvalidCredentialsException: { status: 401, errorCode: 2000 },
  UserAlreadyAuthenticatedException: { status: 409, errorCode: 2001 },
  TokenExpiredException: { status: 401, errorCode: 2003 },
  NotProvidedTokenException: { status: 401, errorCode: 2004 },
  PermissionDenyException: { status: 403, errorCode: 2005 },

  // Sysobject
  SysObjectNotFoundException: { status: 404, errorCode: 3000 },
  ProdSysObjectNotFoundException: { status: 404, errorCode: 3001 },

  // Busqueda Reciente
  BusquedaRecienteNotFoundException: { status: 404, errorCode: 4000 },

  // Favorito
  FavoritoNotFoundException: { status: 404, errorCode: 4001 },

  // FinLog
  FinLogNotFoundException: { status: 404, errorCode: 4000 },
}
