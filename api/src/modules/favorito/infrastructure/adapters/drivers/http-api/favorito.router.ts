import { verifyTokenMiddleware } from '@shared/infrastructure/middlewares'
import { Router } from 'express'

import { deleteFavoritoController, getAllFavoritosController, registerFavoritoController } from './composition-root'

export function favoritoRouter() {
  const router = Router()

  router.put('/upsert', verifyTokenMiddleware, registerFavoritoController.run.bind(registerFavoritoController))
  router.get('/', verifyTokenMiddleware, getAllFavoritosController.run.bind(getAllFavoritosController))
  router.delete('/:id', verifyTokenMiddleware, deleteFavoritoController.run.bind(deleteFavoritoController))

  return router
}
