import { NotProvidedTokenException } from '@auth/application/exceptions'
import { TokenTypeEnum } from '@auth/domain/ports/drivens/for-token-management.port'
import { ForHttpAuthenticatingPort } from '@auth/domain/ports/drivers/for-http-authenticating.port'
import { extractBearerToken } from '@shared/infrastructure/utils'
import { NextFunction, Request, Response } from 'express'

export class LogoutController {
  constructor(private readonly authenticatorService: ForHttpAuthenticatingPort) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const accessToken = extractBearerToken(req.headers.authorization)
    const refreshToken = req.cookies.refresh_token

    try {
      // para desloguearse, se debe enviar ambos tokens, si no se valida no se podrá agregar en la blacklist los tokens que no han expirado
      if (!accessToken || !refreshToken) throw new NotProvidedTokenException(`${TokenTypeEnum.Access} y/o ${TokenTypeEnum.Refresh}`)

      const result = await this.authenticatorService.logout({
        accessToken,
        refreshToken,
      })

      return res.clearCookie(TokenTypeEnum.Refresh).status(200).json({ correlationId: req.correlationId, data: result })
    } catch (err) {
      next(err)
    }
  }
}
