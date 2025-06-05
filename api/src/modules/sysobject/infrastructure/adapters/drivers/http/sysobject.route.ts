import { verifyTokenMiddleware } from '@shared/infrastructure/middlewares'
import { Router } from 'express'

import {
  getProdSysObjectController,
  getSysObjectController,
  getSysUsertableController,
  searchSuggestionsController,
} from './composition-root'

export function sysObjectRouter() {
  const router = Router()

  router.get('/search', verifyTokenMiddleware, searchSuggestionsController.run.bind(searchSuggestionsController))

  router.get('/prod', getProdSysObjectController.run.bind(getProdSysObjectController))

  router.get('/:id', verifyTokenMiddleware, getSysObjectController.run.bind(getSysObjectController))

  router.get('/usertable/:id', verifyTokenMiddleware, getSysUsertableController.run.bind(getSysUsertableController))

  return router
}
