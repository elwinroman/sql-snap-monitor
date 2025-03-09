import { Router } from 'express'

import { createUserController, getUserByIdController } from './dependencies'

export const userRouter = Router()

userRouter.post('/', createUserController.run.bind(createUserController))
userRouter.get('/:id', getUserByIdController.run.bind(getUserByIdController))
