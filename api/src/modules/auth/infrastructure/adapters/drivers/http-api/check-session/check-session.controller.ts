import { ForHttpAuthenticatingPort } from '@auth/domain/ports/drivers/for-http-authenticating.port'
import { NextFunction, Request, Response } from 'express'

export class CheckSessionController {
  constructor(private readonly authenticatorService: ForHttpAuthenticatingPort) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const userId = req.userId
    if (!userId) throw new Error('Error al obtener "userId" del request: Request')

    try {
      const result = await this.authenticatorService.checkSession(userId)

      return res.status(200).json({ correlationId: req.correlationId, data: result })
    } catch (err) {
      next(err)
    }
  }
}
