import { authenticatorProxyAdapter } from '@auth/infrastructure/adapters/drivers/proxies/composition-root'
import { setAuthContext } from '@auth/infrastructure/auth-context'
import { UnauthorizedException } from '@shared/application/exceptions'
import { setLoggerRequestContext } from '@shared/infrastructure/logger/logger-context'
import { extractBearerToken } from '@shared/infrastructure/utils/extract-bearer-token.util'
import { NextFunction, Request, Response } from 'express'

/** Middleware que verifica la validez del token de acceso, que actúa como middleware intermediario. */
export async function verifyTokenMiddleware(req: Request, _res: Response, next: NextFunction) {
  // obtiene el access token desde el Bearer
  const accessToken = extractBearerToken(req.headers.authorization)

  if (!accessToken) return next(new UnauthorizedException())

  try {
    const decodedToken = await authenticatorProxyAdapter.verifyToken(accessToken)
    // agregar userId en el contexto del logger y el request
    setLoggerRequestContext({ userId: decodedToken.user_id, role: decodedToken.role, jti: decodedToken.jti })
    req.userId = decodedToken.user_id

    // agregar también en el contexto de auth (para la recuperación de las credenciales del usuario desde la cache)
    setAuthContext({ userId: decodedToken.user_id })
    return next()
  } catch (err) {
    next(err)
  }
}
