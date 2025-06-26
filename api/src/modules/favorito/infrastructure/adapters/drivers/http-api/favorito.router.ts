import { verifyTokenMiddleware } from '@shared/infrastructure/middlewares'
import { Router } from 'express'

import { registerFavoritoController } from './composition-root'

export function favoritoRouter() {
  const router = Router()

  router.put('/upsert', verifyTokenMiddleware, registerFavoritoController.run.bind(registerFavoritoController))

  return router
}
