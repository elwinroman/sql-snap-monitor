import { Router } from 'express'

import { ObjectController } from '@/controllers/object'

export function createObjectRouter() {
  const router = Router()

  const objectController = new ObjectController()

  router.get('/sqldefinition/:name', objectController.getSQLDefinition)

  return router
}
