import { ForHttpManagingBusquedaRecientePort } from '@busqueda-reciente/domain/ports/drivers/for-http-managing-busqueda-reciente.port'
import { NextFunction, Request, Response } from 'express'

import { buildStoreAuthContext } from '@/modules/shared/infrastructure/utils'

import { DeleteBusquedaRecienteHttpDto, DeleteBusquedaRecienteParamsSchema } from './delete-busqueda-reciente.http-dto'

export class DeleteBusquedaRecienteController {
  constructor(private readonly service: ForHttpManagingBusquedaRecientePort) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      const dto: DeleteBusquedaRecienteHttpDto = DeleteBusquedaRecienteParamsSchema.parse({ id })

      // credenciales de usuario e idUser
      const {
        store: {
          credentials: { database },
        },
        authContext,
      } = await buildStoreAuthContext()

      const context = {
        idUser: authContext.userId,
        database,
      }

      const result = await this.service.deleteBusquedaReciente(dto.id, context)

      return res.status(200).json({ correlationId: req.correlationId, data: { msg: result } })
    } catch (err) {
      next(err)
    }
  }
}
