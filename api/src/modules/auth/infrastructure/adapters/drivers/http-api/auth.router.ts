import { NextFunction, Request, Response, Router } from 'express'

import { JwtTokenManagerAdapter } from '../../drivens/jwt-token-manager.adapter'
import { loginController } from './dependencies'

export function authRouter() {
  const router = Router()

  router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token

    try {
      if (token) {
        const tokenManager = new JwtTokenManagerAdapter()
        await tokenManager.throwIfUserAlreadyAuthenticated(req)
      }
      // controlador
      await loginController.run(req, res, next)
    } catch (err) {
      next(err)
    }
  })

  return router
}

// const bearerToken = this.tokenManager.getBearerToken(request)

// if (bearerToken && (await this.verifyToken(bearerToken))) {
//   throw new Error('Ya existe una sesión activa.')
// }
