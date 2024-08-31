import { AuthController } from '../controllers/auth'
import { Router } from 'express'

export function createAuthRouter ({ authModel }) {
  const router = Router()

  const authController = new AuthController({ authModel })

  router.post('/login', authController.login)
  router.post('/logout', authController.logout)
  router.get('/check-session', authController.checkSession)

  return router
}
