import { authenticatorProxyAdapter } from '@auth/infrastructure/adapters/drivers/proxies/composition-root'
import { setAuthContext } from '@auth/infrastructure/auth-context'
import { setLoggerRequestContext } from '@core/logger/logger-context'
import { extractBearerToken } from '@core/utils'
import { UnauthorizedException } from '@shared/application/exceptions'
import { NextFunction, Request, Response } from 'express'

/** Middleware que verifica la validez del token de acceso, que actúa como middleware intermediario. */
export async function verifyTokenMiddleware(req: Request, _res: Response, next: NextFunction) {
  // obtiene el access token desde el Bearer
  const accessToken = extractBearerToken(req.headers.authorization)

  if (!accessToken) return next(new UnauthorizedException())

  try {
    const decodedToken = await authenticatorProxyAdapter.verifyAccessToken(accessToken)

    // agregar userId en el contexto del logger y el request
    const user = {
      userId: decodedToken.user_id,
      role: decodedToken.role,
    }

    const session = {
      jti: decodedToken.jti,
      type: decodedToken.type,
      expirationCountdown: decodedToken.expirationCountdown,
    }

    setLoggerRequestContext({ user, session })
    req.userId = decodedToken.user_id

    // agregar también en el contexto de auth (para la recuperación de las credenciales del usuario desde la cache)
    setAuthContext({ userId: decodedToken.user_id })

    return next()
  } catch (err) {
    next(err)
  }
}
