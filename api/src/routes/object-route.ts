import { Router } from 'express'

import { BusquedaRecienteController, SearchController, SQLDefinitionController, UsertableController } from '@/controllers'

export function createObjectRouter() {
  const router = Router()

  const sqlDefinitionController = new SQLDefinitionController()
  const usertableController = new UsertableController()
  const searchController = new SearchController()
  const busquedaRecienteController = new BusquedaRecienteController()

  // busqueda
  router.get('/', searchController.obtenerSugerencias)

  // definiciones sql
  router.get('/sqldefinition', sqlDefinitionController.findSQLDefinition)
  router.get('/sqldefinition/:id', sqlDefinitionController.getSQLDefinition)
  router.get('/sqldefinition-aligment', sqlDefinitionController.getSQLDefinitionAligmentObject)

  // tablas de usuario
  router.get('/usertable', usertableController.buscarUsertableByName)
  router.get('/usertable/:id', usertableController.obtenerUsertableById)

  // busquedas recientes
  router.post('/busqueda-reciente', busquedaRecienteController.registrarBusquedaReciente)
  router.get('/busqueda-reciente', busquedaRecienteController.obtenerBusquedasRecientes)
  router.delete('/busqueda-reciente/:id', busquedaRecienteController.eliminarBusquedaReciente)

  return router
}
