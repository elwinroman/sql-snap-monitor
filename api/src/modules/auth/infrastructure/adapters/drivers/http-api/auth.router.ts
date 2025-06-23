import { verifyTokenMiddleware } from '@shared/infrastructure/middlewares'
import { Router } from 'express'

import { checkSessionController, loginController, logoutController, refreshTokenController } from './composition-root'

export function authRouter() {
  const router = Router()

  router.post('/login', loginController.run.bind(loginController))

  router.post('/logout', logoutController.run.bind(logoutController))

  router.post('/refresh-token', refreshTokenController.run.bind(refreshTokenController))

  router.get('/check-session', verifyTokenMiddleware, checkSessionController.run.bind(checkSessionController))

  return router
}
