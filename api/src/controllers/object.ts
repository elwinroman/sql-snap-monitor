import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { COMMON_ERROR_CODES } from '@/constants/'
import { ObjectModel } from '@/models/object'
import {
  Credentials,
  CredentialsFromEnv,
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
    const { id } = req.params // id del objeto
    const { fromAligment } = req.query // si es true, obtiene el objeto de la bd definida en los env variables
    let { credentials, isSessionActive } = req.session

    try {
      if (fromAligment) {
        const fromAligmentBool = (fromAligment as string).toLowerCase()
        if (fromAligmentBool !== 'true' && fromAligmentBool !== 'false')
          throw new MyCustomError({ status: 'error', statusCode: 400, message: 'El parámetro fromAligment debe ser un booleano' })

        if (fromAligmentBool === 'false') throw new MyCustomError(COMMON_ERROR_CODES.NOTAUTHORIZED)

        // si se requiere un objeto de alineación, el usuario no necesita estar autenticado
        credentials = { ...CredentialsFromEnv }
        isSessionActive = true
      }

      if (!isSessionActive) throw new MyCustomError(COMMON_ERROR_CODES.NOTAUTHORIZED)

      const idNumber = z.coerce.number().safeParse(id)
      if (!idNumber.success) throw new MyCustomError({ status: 'error', statusCode: 400, message: 'El parámetro Id debe ser un número' })

      const objectModel = await new ObjectModel(credentials as Credentials)
      const { data } = !fromAligment
        ? ((await objectModel.getSQLDefinitionById(idNumber.data)) as ResponseSQLDefinitionRecordObject)
        : ((await objectModel.getSQLDefinitionAligmentById(idNumber.data)) as ResponseSQLDefinitionRecordObject)
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

      const idNumber = z.coerce.number().safeParse(id)
      if (!idNumber.success) throw new MyCustomError({ status: 'error', statusCode: 400, message: 'El parámetro Id debe ser un número' })

      const objectModel = await new ObjectModel(credentials as Credentials)
      const { data } = (await objectModel.getUserTableById(idNumber.data)) as ResponseUserTableRecordObject
      res.status(200).json({ status: 'success', statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }
}
