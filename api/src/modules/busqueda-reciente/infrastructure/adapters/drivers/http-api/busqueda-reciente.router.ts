import { verifyTokenMiddleware } from '@shared/infrastructure/middlewares'
import { Router } from 'express'

import { deleteBusquedaRecienteController } from './composition-root'

export function busquedaRecienteRouter() {
  const router = Router()

  router.delete('/:id', verifyTokenMiddleware, deleteBusquedaRecienteController.run.bind(deleteBusquedaRecienteController))

  return router
}
