import { SysObjectService } from '@sysobject/application/sysobject.service'
import { NextFunction, Request, Response } from 'express'

import { GetSysUsertableHttpDto, GetSysUsertableParamsSchema } from './get-sysusertable.http-dto'

export class GetSysUsertableController {
  constructor(private readonly sysObjectService: SysObjectService) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      const validateDate: GetSysUsertableHttpDto = GetSysUsertableParamsSchema.parse({ id })
      const result = await this.sysObjectService.getSysUsertable(validateDate.id)

      return res.status(200).json({ correlationId: req.correlationId, data: result })
    } catch (err) {
      next(err)
    }
  }
}
