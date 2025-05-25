import { verifyTokenMiddleware } from '@shared/infrastructure/middlewares/verify-token.middleware'
import { Router } from 'express'

import { getSysObjectController, searchSuggestionsController } from './composition-root'

export function sysObjectRouter() {
  const router = Router()

  router.get('/search', verifyTokenMiddleware, searchSuggestionsController.run.bind(searchSuggestionsController))

  router.get('/:id', verifyTokenMiddleware, getSysObjectController.run.bind(getSysObjectController))

  // router.get('/preprod', getSysObjectFromPreprod.run.bind(getSysObjectFromPreprod))

  return router
}
