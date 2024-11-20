import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { COMMON_ERROR_CODES, TypeSearch, VALIDATION_ERROR_MSG } from '@/constants/'
import { ObjectModel } from '@/models/object'
import {
  Credentials,
  CredentialsFromEnv,
  MyCustomError,
  ResponseSQLDefinitionObjects,
  ResponseSQLDefinitionRecordObject,
  ResponseUserTableObjects,
  ResponseUserTableRecordObject,
  SearchResponse,
} from '@/models/schemas'

export class ObjectController {
  findSQLDefinition = async (req: Request, res: Response, next: NextFunction) => {
    const { search } = req.query
    const { credentials, isSessionActive } = req.session

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.NOTAUTHORIZED))

    // Validación
    try {
      const SearchSchema = z.object({
        search: z
          .string({ required_error: VALIDATION_ERROR_MSG.REQUIRED })
          .trim()
          .min(3, { message: VALIDATION_ERROR_MSG.MIN })
          .max(128, { message: VALIDATION_ERROR_MSG.MAX }),
      })

      SearchSchema.parse({ search })
    } catch (err) {
      return next(err)
    }

    // Funcionalidad
    try {
      const objectModel = await new ObjectModel(credentials as Credentials)
      const { data, meta } = (await objectModel.findSQLDefinitionByName(search as string)) as ResponseSQLDefinitionObjects

      res.status(200).json({ status: 'success', statusCode: 200, data, meta })
    } catch (err) {
      next(err)
    }
  }

  getSQLDefinition = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params // id del objeto
    const { credentials, isSessionActive } = req.session

    try {
      if (!isSessionActive) throw new MyCustomError(COMMON_ERROR_CODES.NOTAUTHORIZED)

      const idNumber = z.coerce.number().safeParse(id)
      if (!idNumber.success) throw new MyCustomError({ status: 'error', statusCode: 400, message: 'El parámetro Id debe ser un número' })

      const objectModel = await new ObjectModel(credentials as Credentials)
      const { data } = (await objectModel.getSQLDefinitionById(idNumber.data)) as ResponseSQLDefinitionRecordObject
      res.status(200).json({ status: 'success', statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  // Obtiene un objeto de alineación
  getSQLDefinitionAligmentObject = async (req: Request, res: Response, next: NextFunction) => {
    const { name, schemaName } = req.query

    // Validación
    try {
      const AligmentObjectSchema = z.object({
        name: z
          .string({ required_error: VALIDATION_ERROR_MSG.REQUIRED })
          .trim()
          .min(3, { message: VALIDATION_ERROR_MSG.MIN })
          .max(128, { message: VALIDATION_ERROR_MSG.MAX }),
        schemaName: z
          .string({ required_error: VALIDATION_ERROR_MSG.REQUIRED })
          .trim()
          .min(1, { message: VALIDATION_ERROR_MSG.NOEMPTY })
          .max(64, { message: VALIDATION_ERROR_MSG.MAX }),
      })

      AligmentObjectSchema.parse({ name, schemaName })
    } catch (err) {
      return next(err)
    }

    try {
      const { data } = (await new ObjectModel(CredentialsFromEnv).getSQLDefinitionAligmentById(
        name as string,
        schemaName as string,
      )) as ResponseSQLDefinitionRecordObject

      res.status(200).json({ status: 'success', statusCode: 200, data })
    } catch (err) {
      next(err)
    }
  }

  findUserTable = async (req: Request, res: Response, next: NextFunction) => {
    const { search } = req.query
    const { credentials, isSessionActive } = req.session

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.NOTAUTHORIZED))

    // Validación
    try {
      const SearchSchema = z.object({
        search: z
          .string({ required_error: VALIDATION_ERROR_MSG.REQUIRED })
          .trim()
          .min(3, { message: VALIDATION_ERROR_MSG.MIN })
          .max(128, { message: VALIDATION_ERROR_MSG.MAX }),
      })

      SearchSchema.parse({ search })
    } catch (err) {
      return next(err)
    }

    // Funcionalidad
    try {
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

  getSearchSuggestion = async (req: Request, res: Response, next: NextFunction) => {
    const { search, type } = req.query
    const { credentials, isSessionActive } = req.session

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.NOTAUTHORIZED))

    // Validación
    try {
      const SearchSuggestionSchema = z.object({
        search: z
          .string({ required_error: VALIDATION_ERROR_MSG.REQUIRED })
          .trim()
          .min(3, { message: VALIDATION_ERROR_MSG.MIN })
          .max(128, { message: VALIDATION_ERROR_MSG.MAX }),
        type: z
          .string({ required_error: VALIDATION_ERROR_MSG.REQUIRED })
          .transform(val => val.trim())
          .pipe(
            z.nativeEnum(TypeSearch, {
              message: `Se espera que este campo reciba 'sqldefinition' o 'usertable'`,
            }),
          ),
      })

      SearchSuggestionSchema.parse({ search, type })
    } catch (err) {
      return next(err)
    }

    // Funcionalidad
    try {
      const objectModel = await new ObjectModel(credentials as Credentials)
      const { data, meta } = (await objectModel.searchByName(search as string, type as string)) as SearchResponse

      res.status(200).json({ status: 'success', statusCode: 200, data, meta })
    } catch (err) {
      next(err)
    }
  }
}
