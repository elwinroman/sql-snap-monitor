import { ObjectController } from '../controllers/object.js'
import { Router } from 'express'

export function createObjectRouter ({ objectModel }) {
  const router = Router()

  const objectController = new ObjectController({ objectModel })

  // los parámetros se pasan internamente de forma automática por express mediante middlewares
  router.get('/test', objectController.getAnyQuery)
  router.get('/:name', objectController.getOneObject)
  router.get('/definition/:id', objectController.getObjectDefinition)
  router.get('/description/:name', objectController.getObjectDescription)

  return router
}
