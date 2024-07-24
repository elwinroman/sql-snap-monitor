import { ObjectController } from '../controllers/object.js'
import { Router } from 'express'

export function createObjectRouter ({ objectModel }) {
  const router = Router()

  const objectController = new ObjectController({ objectModel })

  // los parámetros se pasan internamente de forma automática por express mediante middlewares
  router.get('/:name', objectController.getOneObject)
  router.get('/definition/:name', objectController.getObjectDefinition)
  router.get('/description/:name', objectController.getObjectDescription)

  return router
}
