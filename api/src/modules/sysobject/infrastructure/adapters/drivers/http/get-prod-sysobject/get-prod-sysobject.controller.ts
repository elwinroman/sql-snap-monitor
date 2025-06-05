import { ForProxyAuthenticatingPort } from '@auth/domain/ports/drivers/for-proxy-authenticating.port'
import { extractBearerToken } from '@shared/infrastructure/utils/extract-bearer-token.util'
import { SysObjectService } from '@sysobject/application/sysobject.service'
import { NextFunction, Request, Response } from 'express'

import { GetProdSysObjectHttpDto, GetProdSysObjectParamsSchema } from './get-prod-sysobject.http-dto'

export class GetProdSysObjectController {
  constructor(
    private readonly sysObjectService: SysObjectService,
    private readonly authenticatorProxyAdapter: ForProxyAuthenticatingPort,
  ) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const { name, schema, actionType } = req.query

    try {
      const getProdSysObjectDto: GetProdSysObjectHttpDto = GetProdSysObjectParamsSchema.parse({ name, schema, actionType })

      // obtiene le idUsuario desde el accessToken, si no existe se envía indefinido para el registro de logs
      let idUser
      const accessToken = extractBearerToken(req.headers.authorization)
      if (accessToken) {
        const decodedToken = await this.authenticatorProxyAdapter.verifyToken(accessToken)
        idUser = decodedToken.user_id
      }

      const result = await this.sysObjectService.getProdSysObject(
        getProdSysObjectDto.name,
        getProdSysObjectDto.schema,
        getProdSysObjectDto.actionType,
        idUser,
      )

      return res.status(200).json({ correlationId: req.correlationId, data: result })
    } catch (err) {
      next(err)
    }
  }
}
