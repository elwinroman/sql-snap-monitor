import { Router } from 'express'

import { ObjectController } from '@/controllers/object'

export function createObjectRouter() {
  const router = Router()

  const objectController = new ObjectController()

  router.get('/sqldefinition', objectController.findSQLDefinition)
  router.get('/sqldefinition/:id', objectController.getSQLDefinition)
  router.get('/usertable', objectController.findUserTable)
  router.get('/usertable/:id', objectController.getUserTable)
  router.get('/sqldefinition-aligment', objectController.getSQLDefinitionAligmentObject)

  return router
}
