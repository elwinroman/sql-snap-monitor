import { buildStoreAuthContext } from '@core/utils'
import { ForFavoritoManagingPort } from '@favorito/domain/ports/drivers/for-favorito-managing.port'
import { FavoritoInput } from '@favorito/domain/schemas/favorito'
import { ValidTypeSysObject } from '@sysobject/domain/schemas/sysobject'
import { NextFunction, Request, Response } from 'express'

import { RegisterFavoritoParams, RegisterFavoritoParamsSchema } from './register-favorito-params.http-dto'

export class RegisterFavoritoController {
  constructor(private readonly service: ForFavoritoManagingPort) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const { schema, objectName, type } = req.body

    try {
      const dto: RegisterFavoritoParams = RegisterFavoritoParamsSchema.parse({ schema, objectName, type })

      // credenciales de usuario e idUser
      const {
        store: {
          credentials: { database },
        },
        authContext,
      } = await buildStoreAuthContext()

      const input: FavoritoInput = {
        idUser: authContext.userId,
        database,
        schema: dto.schema,
        objectName: dto.objectName,
        type: dto.type as ValidTypeSysObject,
      }

      const result = await this.service.registerFavorito(input)

      const status = result.action === 'INSERT' ? 201 : 200

      return res.status(status).json({ correlationId: req.correlationId, message: result.message, data: result.data })
    } catch (err) {
      next(err)
    }
  }
}
