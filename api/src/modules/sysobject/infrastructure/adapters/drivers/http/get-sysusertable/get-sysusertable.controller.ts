import { buildStoreAuthContext } from '@core/utils'
import { SysObjectService } from '@sysobject/application/sysobject.service'
import { LogObjectContext } from '@sysobject/domain/schemas/log-object-context'
import { NextFunction, Request, Response } from 'express'

import { GetSysUsertableHttpDto, GetSysUsertableParamsSchema } from './get-sysusertable.http-dto'

export class GetSysUsertableController {
  constructor(private readonly sysObjectService: SysObjectService) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      const dto: GetSysUsertableHttpDto = GetSysUsertableParamsSchema.parse({ id })

      // credenciales de usuario e idUser para logs
      const { store, authContext } = await buildStoreAuthContext()
      const log: LogObjectContext = {
        databaseName: store.credentials.database,
        idUser: authContext.userId,
      }

      const result = await this.sysObjectService.getSysUsertable(dto.id, log)

      return res.status(200).json({ correlationId: req.correlationId, data: result })
    } catch (err) {
      next(err)
    }
  }
}
