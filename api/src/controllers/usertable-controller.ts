import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { COMMON_ERROR_CODES, TYPE_ACTION, VALIDATION_ERROR } from '@/constants/'
import { Credentials, MyCustomError, ResponseUsertableObjects, ResponseUsertableRecordObject } from '@/models'
import { LogService, UsertableService } from '@/services'

export class UsertableController {
  buscarUsertableByName = async (req: Request, res: Response, next: NextFunction) => {
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
      const usertableService = new UsertableService(credentials as Credentials)
      const { data, meta } = (await usertableService.buscarUsertableByName(search as string)) as ResponseUsertableObjects

      res.status(200).json({ status: 'success', statusCode: 200, data, meta })
    } catch (err) {
      next(err)
    }
  }

  obtenerUsertableById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
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
      const usertableService = new UsertableService(credentials as Credentials)
      const { data } = (await usertableService.obtenerUsertableById(parseInt(id))) as ResponseUsertableRecordObject

      // registrar el log de la búsqueda del objeto hecho por el usuario
      const logService = new LogService()
      logService.registrarBusqueda({
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
}
