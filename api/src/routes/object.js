import { ObjectController } from '../controllers/object.js'
import { Router } from 'express'

export function createObjectRouter ({ objectModel }) {
  const objectRouter = Router()

  const objectController = new ObjectController({ objectModel })

  // los parámetros se pasan internamente de forma automática por express mediante middlewares
  objectRouter.get('/:name', objectController.getObject)
  objectRouter.get('/definition/:name', objectController.getObjectDefinition)
  objectRouter.get('/description/:name', objectController.getObjectDescription)

  return objectRouter
}
