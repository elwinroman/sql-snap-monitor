import { ForHttpAuthenticatingPort } from '@auth/domain/ports/drivers/for-http-authenticating.port'
import { buildStoreAuthContext } from '@shared/infrastructure/utils/build-store-auth-context.util'
import { NextFunction, Request, Response } from 'express'

import { StoreUserSchema } from '@/modules/shared/domain/store'

export class CheckSessionController {
  constructor(private readonly authenticatorService: ForHttpAuthenticatingPort) {}

  async run(req: Request, res: Response, next: NextFunction) {
    try {
      const { store } = await buildStoreAuthContext()
      const credentials: StoreUserSchema = { ...store.credentials }

      const result = await this.authenticatorService.checkSession(credentials)

      return res.status(200).json({ correlationId: req.correlationId, data: result })
    } catch (err) {
      next(err)
    }
  }
}
