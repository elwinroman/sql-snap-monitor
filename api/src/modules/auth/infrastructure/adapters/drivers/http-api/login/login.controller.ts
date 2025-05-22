import { TokenTypeEnum } from '@auth/domain/ports/drivens/for-token-management.port'
import { ForHttpAuthenticatingPort } from '@auth/domain/ports/drivers/for-http-authenticating.port'
import { NextFunction, Request, Response } from 'express'

import { LoginUserHttpDto, LoginUserSchema } from './login.http-dto'

export class LoginController {
  constructor(private readonly authenticatorService: ForHttpAuthenticatingPort) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const { user, host, database, password } = req.body

    try {
      const validateData: LoginUserHttpDto = LoginUserSchema.parse({ host, database, user, password })

      const result = await this.authenticatorService.login(validateData)

      return res
        .status(200)
        .cookie(TokenTypeEnum.Refresh, result.token.refreshToken, {
          httpOnly: true, // cookie solo accesible por el servidor
          // secure: process.env.NODE_ENV === 'production', // cookie disponible solo en https
          secure: false,
          sameSite: 'strict', // cookie no disponible para otros sitios
          maxAge: 1000 * 60 * 60 * 24 * 30, // 30 días
        })
        .json({ correlationId: req.correlationId, data: result })
    } catch (err) {
      next(err)
    }
  }
}
