import { NextFunction, Request, Response } from 'express'

import { COMMON_ERROR_CODES } from '@/constants/'
import { ObjectModel } from '@/models/object'
import { Credentials, MyCustomError, ResponseSQLDefinitionObject } from '@/models/schemas'

export class ObjectController {
  getSQLDefinition = async (req: Request, res: Response, next: NextFunction) => {
    const { credentials, isSessionActive } = req.session
    if (!isSessionActive) throw new MyCustomError(COMMON_ERROR_CODES.NOTAUTHORIZED)

    const objectModel = new ObjectModel(credentials as Credentials)

    try {
      const { name } = await req.params
      const { data, meta } = (await objectModel.getSQLDefinitionByName(name)) as ResponseSQLDefinitionObject
      res.status(200).json({ status: 'success', statusCode: 200, data, meta })
    } catch (err) {
      next(err)
    }
  }

  getUserTable = async (req: Request, res: Response, next: NextFunction) => {
    const { credentials, isSessionActive } = req.session
    if (!isSessionActive) throw new MyCustomError(COMMON_ERROR_CODES.NOTAUTHORIZED)

    const objectModel = new ObjectModel(credentials as Credentials)

    try {
      const { name } = await req.params
      const { data, meta } = await objectModel.getUserTableByName(name)
      res.status(200).json({ status: 'success', statusCode: 200, data, meta })
    } catch (err) {
      next(err)
    }
  }
}
