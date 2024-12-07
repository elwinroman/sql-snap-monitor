import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { COMMON_ERROR_CODES, TYPE_ACTION, VALIDATION_ERROR } from '@/constants/'
import { Credentials, CredentialsFromEnv, MyCustomError, ResponseSQLDefinitionObjects, SQLDefinitionRecordObject } from '@/models'
import { LogService, SQLDefinitionService } from '@/services'

export class SQLDefinitionController {
  findSQLDefinition = async (req: Request, res: Response, next: NextFunction) => {
    const { search } = req.query
    const { credentials, isSessionActive } = req.session

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.notauthorized))

    // Validación
    try {
      const SearchSchema = z.object({
        search: z
          .string({ required_error: VALIDATION_ERROR.required })
          .trim()
          .min(3, { message: VALIDATION_ERROR.min })
          .max(128, { message: VALIDATION_ERROR.max }),
      })

      SearchSchema.parse({ search })
    } catch (err) {
      return next(err)
    }

    // Funcionalidad
    try {
      const sqlDefinitionService = new SQLDefinitionService(credentials as Credentials)
      const { data, meta } = (await sqlDefinitionService.findSQLDefinitionByName(search as string)) as ResponseSQLDefinitionObjects

      res.status(200).json({ status: 'success', statusCode: 200, data, meta })
    } catch (err) {
      next(err)
    }
  }

  getSQLDefinition = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params // id del objeto
    const { credentials, isSessionActive, idUsuario } = req.session

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.notauthorized))

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
      const sqlDefinitionService = new SQLDefinitionService(credentials as Credentials)
      const object = (await sqlDefinitionService.getSQLDefinitionById(parseInt(id))) as SQLDefinitionRecordObject

      // registrar el log de la búsqueda del objeto hecho por el usuario
      const logService = new LogService()
      logService.registrarBusqueda({
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
          .string({ required_error: VALIDATION_ERROR.required })
          .trim()
          .min(3, { message: VALIDATION_ERROR.min })
          .max(128, { message: VALIDATION_ERROR.max }),
        schemaName: z
          .string({ required_error: VALIDATION_ERROR.required })
          .trim()
          .min(1, { message: VALIDATION_ERROR.noempty })
          .max(64, { message: VALIDATION_ERROR.max }),
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

      const aligmentObject = (await new SQLDefinitionService(CredentialsFromEnv).getSQLDefinitionAligmentById(
        params.name,
        params.schemaName,
      )) as SQLDefinitionRecordObject

      // registrar el log de la búsqueda del objeto
      const logService = new LogService()
      // si el parámetro isComparisonMode es TRUE, se está realizando una comparación
      const actionType = params.isComparisonMode ? TYPE_ACTION.forcompare.id : TYPE_ACTION.sqldefinition.id

      logService.registrarBusqueda({
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
}
