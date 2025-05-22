import { NotProvidedTokenException } from '@auth/domain/exceptions'
import { TokenTypeEnum } from '@auth/domain/ports/drivens/for-token-management.port'
import { ForHttpAuthenticatingPort } from '@auth/domain/ports/drivers/for-http-authenticating.port'
import { NextFunction, Request, Response } from 'express'

export class RefreshTokenController {
  constructor(private readonly authenticatorService: ForHttpAuthenticatingPort) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies.refresh_token

    try {
      // para refrescar el access_token, solo es necesario el refreshToken
      if (!refreshToken) throw new NotProvidedTokenException(TokenTypeEnum.Refresh)

      const result = await this.authenticatorService.refreshToken(refreshToken)

      return res.status(200).json({ correlationId: req.correlationId, data: result })
    } catch (err) {
      next(err)
    }
  }
}
