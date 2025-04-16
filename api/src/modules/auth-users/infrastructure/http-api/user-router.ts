import { Router } from 'express'

import { getUserByIdController } from './dependencies'
import { testController } from './dependencies'

export const userRouter = Router()

// userRouter.post('/', createUserController.run.bind(createUserController))
userRouter.get('/:id', getUserByIdController.run.bind(getUserByIdController))
userRouter.post('/test', testController.run.bind(testController))
// userRouter.post('/login', loginUserController.run.bind(loginUserController))
