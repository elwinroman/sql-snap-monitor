import { type Router as ExpressRouter, Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import { generateOpenAPIDocument } from './swagger-config'

export function swaggerRouter(): ExpressRouter {
  const router = Router()
  const document = generateOpenAPIDocument()

  router.use('/', swaggerUi.serve)
  router.get('/', swaggerUi.setup(document))

  return router
}
