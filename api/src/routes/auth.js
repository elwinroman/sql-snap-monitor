import { AuthController } from '../controllers/auth.js'
import { Router } from 'express'

export function createAuthRouter ({ authModel }) {
  const router = Router()

  const authController = new AuthController({ authModel })

  router.post('/login', authController.login)
  router.post('/logout', authController.logout)

  return router
}
