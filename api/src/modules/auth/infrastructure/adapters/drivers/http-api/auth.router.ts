import { UserAlreadyAuthenticatedException } from '@auth/domain/exceptions'
import { JwtTokenManagerAdapter } from '@auth/infrastructure/adapters/drivens'
import { verifyTokenMiddleware } from '@shared/infrastructure/middlewares/verify-token.middleware'
import { NextFunction, Request, Response, Router } from 'express'

import { extractBearerToken } from '@/modules/shared/infrastructure/utils/extract-bearer-token.util'

import { checkSessionController, loginController, logoutController, refreshTokenController } from './composition-root'

export function authRouter() {
  const router = Router()

  router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const tokenManager = new JwtTokenManagerAdapter()
    const accessToken = extractBearerToken(req.headers.authorization)

    try {
      // si no existe el accessToken, es un inicio de sesión nuevo, pero si existe no debería permitir loguearse
      if (accessToken && tokenManager.checkIfUserIsAlreadyAuthenticated(accessToken)) {
        console.log('UserAlreadyAuthenticatedException should be throwed')
        throw new UserAlreadyAuthenticatedException()
      }
      // controlador
      await loginController.run(req, res, next)
    } catch (err) {
      next(err)
    }
  })

  router.post('/logout', logoutController.run.bind(logoutController))

  router.post('/refresh-token', refreshTokenController.run.bind(refreshTokenController))

  router.get('/check-session', verifyTokenMiddleware, checkSessionController.run.bind(checkSessionController))

  return router
}
