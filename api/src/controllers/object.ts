import { NextFunction, Request, Response } from 'express'

import { COMMON_ERROR_CODES } from '@/constants/'
import { ObjectModel } from '@/models/object'
import {
  Credentials,
  MyCustomError,
  ResponseSQLDefinitionObjects,
  ResponseSQLDefinitionRecordObject,
  ResponseUserTableObjects,
  ResponseUserTableRecordObject,
} from '@/models/schemas'

export class ObjectController {
  findSQLDefinition = async (req: Request, res: Response, next: NextFunction) => {
    const { search } = req.query
    const { credentials, isSessionActive } = req.session

    try {
      if (!isSessionActive) throw new MyCustomError(COMMON_ERROR_CODES.NOTAUTHORIZED)
      //todo: validate query-param search

      const objectModel = await new ObjectModel(credentials as Credentials)
      const { data, meta } = (await objectModel.findSQLDefinitionByName(search as string)) as ResponseSQLDefinitionObjects
      res.status(200).json({ status: 'success', statusCode: 200, data, meta })
    } catch (err) {
      next(err)
    }
  }

  getSQLDefinition = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { credentials, isSessionActive } = req.session

    try {
      if (!isSessionActive) throw new MyCustomError(COMMON_ERROR_CODES.NOTAUTHORIZED)
      //todo: validate param id (required)

      const objectModel = await new ObjectModel(credentials as Credentials)
      const { data } = (await objectModel.getSQLDefinitionById(id)) as ResponseSQLDefinitionRecordObject
      res.status(200).json({ status: 'success', statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  findUserTable = async (req: Request, res: Response, next: NextFunction) => {
    const { search } = req.query
    const { credentials, isSessionActive } = req.session

    try {
      if (!isSessionActive) throw new MyCustomError(COMMON_ERROR_CODES.NOTAUTHORIZED)
      //todo: validate param-query search

      const objectModel = await new ObjectModel(credentials as Credentials)
      const { data, meta } = (await objectModel.findUserTableByName(search as string)) as ResponseUserTableObjects
      res.status(200).json({ status: 'success', statusCode: 200, data, meta })
    } catch (err) {
      next(err)
    }
  }

  getUserTable = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { credentials, isSessionActive } = req.session

    try {
      if (!isSessionActive) throw new MyCustomError(COMMON_ERROR_CODES.NOTAUTHORIZED)
      //todo: validate param id (required)

      const objectModel = await new ObjectModel(credentials as Credentials)
      const { data } = (await objectModel.getUserTableById(id)) as ResponseUserTableRecordObject
      res.status(200).json({ status: 'success', statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }
}
