import { verifyTokenMiddleware } from '@core/middlewares'
import { type Router as ExpressRouter, Router } from 'express'

import {
  checkSessionController,
  listDatabasesController,
  loginController,
  logoutController,
  refreshTokenController,
  switchDatabaseController,
} from './composition-root'

export function authRouter(): ExpressRouter {
  const router = Router()

  router.post('/login', loginController.run.bind(loginController))
  router.post('/logout', logoutController.run.bind(logoutController))
  router.post('/refresh-token', refreshTokenController.run.bind(refreshTokenController))
  router.get('/check-session', verifyTokenMiddleware, checkSessionController.run.bind(checkSessionController))
  router.post('/databases', listDatabasesController.run.bind(listDatabasesController))
  router.patch('/switch-database', verifyTokenMiddleware, switchDatabaseController.run.bind(switchDatabaseController))

  return router
}
