import { Router } from 'express'

import { createAuthRouter } from '@/routes/auth-route'
import { createObjectRouter } from '@/routes/object-route'

export function createAllRouter() {
  const router = Router()

  router.use('/auth', createAuthRouter())
  router.use('/objects/', createObjectRouter())

  return router
}
