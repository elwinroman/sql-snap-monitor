import { verifyTokenMiddleware } from '@shared/infrastructure/middlewares'
import { Router } from 'express'

import { deleteBusquedaRecienteController, getAllBusquedaRecienteController } from './composition-root'

export function busquedaRecienteRouter() {
  const router = Router()

  router.get('/', verifyTokenMiddleware, getAllBusquedaRecienteController.run.bind(getAllBusquedaRecienteController))

  router.delete('/:id', verifyTokenMiddleware, deleteBusquedaRecienteController.run.bind(deleteBusquedaRecienteController))

  return router
}
