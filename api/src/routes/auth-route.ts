import { Router } from 'express'

import { AuthController } from '../controllers/auth-controller'

export function createAuthRouter() {
  const router = Router()

  const authController = new AuthController()

  router.post('/login', authController.login)
  router.post('/logout', authController.logout)
  router.get('/health', authController.checkSession)

  return router
}
