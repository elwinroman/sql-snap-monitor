import { SysObjectService } from '@sysobject/application/sysobject.service'
import { LogObjectContext } from '@sysobject/domain/schemas/log-object-context'
import { NextFunction, Request, Response } from 'express'

import { buildStoreAuthContext } from '@/modules/shared/infrastructure/utils/build-store-auth-context.util'

import { GetSysObjectHttpDto, GetSysObjectParamsSchema } from './get-sysobject.http-dto'

export class GetSysObjectController {
  constructor(private readonly sysObjectService: SysObjectService) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      const dto: GetSysObjectHttpDto = GetSysObjectParamsSchema.parse({ id })

      // credenciales de usuario e idUser para logs
      const { store, authContext } = await buildStoreAuthContext()
      const log: LogObjectContext = {
        databaseName: store.credentials.database,
        idUser: authContext.userId,
      }

      const result = await this.sysObjectService.getSysObject(dto.id, log)

      return res.status(200).json({ correlationId: req.correlationId, data: result })
    } catch (err) {
      next(err)
    }
  }
}
