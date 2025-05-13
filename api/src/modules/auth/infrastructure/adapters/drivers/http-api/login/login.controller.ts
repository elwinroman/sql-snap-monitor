import { InvalidCredentialsException } from '@auth/domain/exceptions/invalid-credentials.exception'
import { ForControlAuthenticatingPort } from '@auth/domain/ports/drivers/for-control-authenticating.port'
import { NextFunction, Request, Response } from 'express'
import sql from 'mssql'

import { LoginUserHttpDto, LoginUserSchema } from './login.http-dto'

export class LoginController {
  constructor(private readonly controlAuthenticatorService: ForControlAuthenticatingPort) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const { user, host, database, password } = req.body
    try {
      const validateData: LoginUserHttpDto = LoginUserSchema.parse({ host, database, user, password })

      const result = await this.controlAuthenticatorService.login(validateData)

      return res
        .status(200)
        .cookie('access_token', result.token.accessToken, {
          httpOnly: true, // cookie solo accesible por el servidor
          // secure: process.env.NODE_ENV === 'production', // cookie disponible solo en https
          secure: false,
          sameSite: 'strict', // cookie no disponible para otros sitios
          maxAge: 1000 * 60 * 60 * 24 * 14, // 14 días
        })
        .json({ correlationId: req.correlationId, data: result })
    } catch (err) {
      // caso especial, si no se loguea a la base de datos, devolver error de login
      if (err instanceof sql.ConnectionError) return next(new InvalidCredentialsException())
      next(err)
    }
  }
}
