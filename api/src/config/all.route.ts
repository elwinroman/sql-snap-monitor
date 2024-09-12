import { Router } from 'express'

import { createAuthRouter } from '@/routes/auth'
import { createObjectRouter } from '@/routes/object'

export function createAllRouter() {
  const router = Router()

  router.use('/auth', createAuthRouter())
  router.use('/objects/', createObjectRouter())

  return router
}
