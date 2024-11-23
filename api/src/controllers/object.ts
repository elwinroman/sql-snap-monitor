import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { COMMON_ERROR_CODES, TYPE_ACTION, VALIDATION_ERROR_MSG } from '@/constants/'
import { LogModel } from '@/models/log'
import { ObjectModel } from '@/models/object'
import {
  Credentials,
  CredentialsFromEnv,
  MyCustomError,
  ResponseSQLDefinitionObjects,
  ResponseUserTableObjects,
  ResponseUserTableRecordObject,
  SearchResponse,
  SQLDefinitionRecordObject,
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
    const { credentials, isSessionActive, idUsuario } = req.session

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.NOTAUTHORIZED))

    // Validación
    try {
      const FindSchema = z.object({
        id: z
          .string()
          .transform(val => Number(val))
          .pipe(z.number({ message: 'El campo ruta [id] debe ser un número' })),
      })

      FindSchema.parse({ id })
    } catch (err) {
      return next(err)
    }

    // Funcionalidad
    try {
      const objectModel = new ObjectModel(credentials as Credentials)
      const object = (await objectModel.getSQLDefinitionById(parseInt(id))) as SQLDefinitionRecordObject

      // registrar el log de la búsqueda del objeto hecho por el usuario
      const logModel = new LogModel()
      logModel.registrarBusqueda({
        idUsuario: idUsuario as number,
        idTipoAccion: TYPE_ACTION.sqldefinition.id,
        cDatabase: credentials?.dbname as string,
        cSchema: object.schema,
        cBusqueda: object.name,
        lProduccion: object.isAligmentObject,
      })

      res.status(200).json({ status: 'success', statusCode: 200, data: object })
    } catch (err) {
      next(err)
    }
  }

  // Obtiene un objeto de alineación
  getSQLDefinitionAligmentObject = async (req: Request, res: Response, next: NextFunction) => {
    const { name, schemaName, isComparisonMode } = req.query
    const { idUsuario } = req.session

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
        isComparisonMode: z
          .string()
          .optional()
          .transform(val => {
            if (val === 'true') return true
            if (val === 'false') return false
            return val // Si no es un valor "true" o "false", devolver el valor original
          })
          .refine(val => val === undefined || typeof val === 'boolean', {
            message: 'El parámetro debe ser un valor booleano (true o false) si se proporciona.',
          }),
      })

      AligmentObjectSchema.parse({ name, schemaName, isComparisonMode })
    } catch (err) {
      return next(err)
    }

    // Funcionalidad
    try {
      // sanitizar los datos
      const params = {
        name: (name as string).trim(),
        schemaName: (schemaName as string).trim(),
        isComparisonMode: isComparisonMode === 'true' ? true : undefined,
      }

      const aligmentObject = (await new ObjectModel(CredentialsFromEnv).getSQLDefinitionAligmentById(
        params.name,
        params.schemaName,
      )) as SQLDefinitionRecordObject

      // registrar el log de la búsqueda del objeto
      const logModel = new LogModel()
      // si el parámetro isComparisonMode es TRUE, se está realizando una comparación
      const actionType = params.isComparisonMode ? TYPE_ACTION.forcompare.id : TYPE_ACTION.sqldefinition.id

      logModel.registrarBusqueda({
        idUsuario: idUsuario ?? undefined,
        idTipoAccion: actionType,
        cDatabase: `${process.env.PREPROD_DB_NAME}_PROD` as string,
        cSchema: aligmentObject.schema,
        cBusqueda: aligmentObject.name,
        lProduccion: aligmentObject.isAligmentObject,
      })

      res.status(200).json({ status: 'success', statusCode: 200, data: aligmentObject })
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
    const { credentials, isSessionActive, idUsuario } = req.session

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.NOTAUTHORIZED))

    // Validación
    try {
      const FindSchema = z.object({
        id: z
          .string()
          .transform(val => Number(val))
          .pipe(z.number({ message: 'El campo ruta [id] debe ser un número' })),
      })

      FindSchema.parse({ id })
    } catch (err) {
      return next(err)
    }

    // Funcionalidad
    try {
      const objectModel = await new ObjectModel(credentials as Credentials)
      const { data } = (await objectModel.getUserTableById(parseInt(id))) as ResponseUserTableRecordObject

      // registrar el log de la búsqueda del objeto hecho por el usuario
      const logModel = new LogModel()
      logModel.registrarBusqueda({
        idUsuario: idUsuario as number,
        idTipoAccion: TYPE_ACTION.usertable.id,
        cDatabase: credentials?.dbname as string,
        cSchema: data.schema,
        cBusqueda: data.name,
        lProduccion: data.isAligmentObject,
      })

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
          .refine(val => Object.values(TYPE_ACTION).some(({ name }) => name === val), {
            message: `Se espera que este campo reciba 'sqldefinition' o 'usertable'`,
          }),
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
