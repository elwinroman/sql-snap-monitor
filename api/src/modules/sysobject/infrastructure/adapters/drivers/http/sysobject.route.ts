import { verifyTokenMiddleware } from '@shared/infrastructure/middlewares'
import { Router } from 'express'

import { getSysObjectController, getSysUsertableController, searchSuggestionsController } from './composition-root'

export function sysObjectRouter() {
  const router = Router()

  router.get('/search', verifyTokenMiddleware, searchSuggestionsController.run.bind(searchSuggestionsController))

  router.get('/:id', verifyTokenMiddleware, getSysObjectController.run.bind(getSysObjectController))

  router.get('/usertable/:id', verifyTokenMiddleware, getSysUsertableController.run.bind(getSysUsertableController))
  // router.get('/preprod', getSysObjectFromPreprod.run.bind(getSysObjectFromPreprod))

  return router
}
