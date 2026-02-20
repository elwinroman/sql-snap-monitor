import { buildStoreAuthContext } from '@core/utils'
import { ForFavoritoManagingPort } from '@favorito/domain/ports/drivers/for-favorito-managing.port'
import { NextFunction, Request, Response } from 'express'

import { DeleteFavoritoParams, DeleteFavoritoParamsSchema } from './delete-favorito-param.http-dto'

export class DeleteFavoritoController {
  constructor(private readonly service: ForFavoritoManagingPort) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      const dto: DeleteFavoritoParams = DeleteFavoritoParamsSchema.parse({ id })

      // idUser
      const { authContext } = await buildStoreAuthContext()

      const result = await this.service.deleteFavorito(dto.id, authContext.userId)

      return res.status(200).json({ correlationId: req.correlationId, data: { msg: result } })
    } catch (err) {
      next(err)
    }
  }
}
