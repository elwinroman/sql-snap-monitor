import { UserAlreadyAuthenticatedException } from '@auth/application/exceptions'
import { TokenTypeEnum } from '@auth/domain/ports/drivens/for-token-management.port'
import { ForHttpAuthenticatingPort } from '@auth/domain/ports/drivers/for-http-authenticating.port'
import { JwtTokenManagerAdapter } from '@auth/infrastructure/adapters/drivens'
import { extractBearerToken } from '@core/utils'
import { NextFunction, Request, Response } from 'express'

import { LoginUserHttpDto, LoginUserSchema } from './login.http-dto'

export class LoginController {
  constructor(
    private readonly authenticatorService: ForHttpAuthenticatingPort,
    private readonly tokenManager: JwtTokenManagerAdapter,
  ) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const { user, host, database, password } = req.body
    const accessToken = extractBearerToken(req.headers.authorization)

    try {
      const dto: LoginUserHttpDto = LoginUserSchema.parse({ host, database, user, password })

      // si no existe el accessToken, es un inicio de sesión nuevo, pero si existe no debería permitir loguearse
      if (accessToken && this.tokenManager.checkIfUserIsAlreadyAuthenticated(accessToken)) throw new UserAlreadyAuthenticatedException()

      // extrae 'refresh-token' de los resultados
      const { token, ...resultWithoutTokens } = await this.authenticatorService.login(dto)
      const result = {
        ...resultWithoutTokens,
        accessToken: token.accessToken,
      }

      return res
        .status(200)
        .cookie(TokenTypeEnum.Refresh, token.refreshToken, {
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
