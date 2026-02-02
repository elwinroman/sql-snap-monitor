import { verifyTokenMiddleware } from '@core/middlewares'
import { type Router as ExpressRouter, Router } from 'express'

import { deleteBusquedaRecienteController, getAllBusquedaRecienteController } from './composition-root'

export function busquedaRecienteRouter(): ExpressRouter {
  const router = Router()

  router.get('/', verifyTokenMiddleware, getAllBusquedaRecienteController.run.bind(getAllBusquedaRecienteController))
  router.delete('/:id', verifyTokenMiddleware, deleteBusquedaRecienteController.run.bind(deleteBusquedaRecienteController))

  return router
}
