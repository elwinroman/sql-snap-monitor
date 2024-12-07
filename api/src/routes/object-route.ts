import { Router } from 'express'

import { SearchController, SQLDefinitionController, UsertableController } from '@/controllers'

export function createObjectRouter() {
  const router = Router()

  const sqlDefinitionController = new SQLDefinitionController()
  const usertableController = new UsertableController()
  const searchController = new SearchController()

  // busqueda
  router.get('/', searchController.obtenerSugerencias)

  // definiciones sql
  router.get('/sqldefinition', sqlDefinitionController.findSQLDefinition)
  router.get('/sqldefinition/:id', sqlDefinitionController.getSQLDefinition)
  router.get('/sqldefinition-aligment', sqlDefinitionController.getSQLDefinitionAligmentObject)

  // tablas de usuario
  router.get('/usertable', usertableController.buscarUsertableByName)
  router.get('/usertable/:id', usertableController.obtenerUsertableById)

  return router
}
