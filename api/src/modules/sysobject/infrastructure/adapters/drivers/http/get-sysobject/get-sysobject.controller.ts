import { SysObjectService } from '@sysobject/application/sysobject.service'
import { NextFunction, Request, Response } from 'express'

import { GetSysObjectHttpDto, GetSysObjectParamsSchema } from './get-sysobject.http-dto'

export class GetSysObjectController {
  constructor(private readonly sysObjectService: SysObjectService) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      const getSysObjectDto: GetSysObjectHttpDto = GetSysObjectParamsSchema.parse({ id })
      const result = await this.sysObjectService.getSysObject(getSysObjectDto.id)

      return res.status(200).json({ correlationId: req.correlationId, data: result })
    } catch (err) {
      next(err)
    }
  }
}
