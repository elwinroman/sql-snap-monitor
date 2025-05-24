import { authenticatorProxyAdapter } from '@auth/infrastructure/adapters/drivers/proxies/composition-root'
import { UnauthorizedException } from '@shared/domain/exceptions'
import { setLoggerRequestContext } from '@shared/infrastructure/logger/logger-context'
import { extractBearerToken } from '@shared/infrastructure/utils/extract-bearer-token.util'
import { NextFunction, Request, Response } from 'express'

/** Middleware que verifica la validez del token de acceso, que actúa como middleware intermediario. */
export async function verifyTokenMiddleware(req: Request, _res: Response, next: NextFunction) {
  // obtiene el access token desde el Bearer
  const accessToken = extractBearerToken(req.headers.authorization)

  if (!accessToken) throw new UnauthorizedException()

  try {
    const decodedToken = await authenticatorProxyAdapter.verifyToken(accessToken)
    // agregar userId en el contexto del logger y el request
    setLoggerRequestContext({ userId: decodedToken.user_id, role: decodedToken.role, jti: decodedToken.jti }, next)
    req.userId = decodedToken.user_id

    next()
  } catch (err) {
    next(err)
  }
}
