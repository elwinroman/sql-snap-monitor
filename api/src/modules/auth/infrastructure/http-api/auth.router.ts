import { Router } from 'express'

import { loginController } from './dependencies'

export const authRouter = Router()

authRouter.post('/login', loginController.run.bind(loginController))
