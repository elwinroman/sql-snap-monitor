import { NextFunction, Request, Response } from 'express'
import z from 'zod'

import { COMMON_ERROR_CODES } from '@/constants'
import { BusquedaRecienteGetInput, BusquedaRecienteInput, MyCustomError, PaginationInput } from '@/models'
import { BusquedaRecienteService, SearchService } from '@/services'

export class BusquedaRecienteController {
  obtenerBusquedasRecientes = async (req: Request, res: Response, next: NextFunction) => {
    const { idTipoAccion, start, limit } = req.query
    const { isSessionActive, idUsuario, credentials } = req.session

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.sessionalreadyclosed))

    // Validación
    try {
      const busquedaRecienteSchema = z.object({
        idTipoAccion: z
          .string()
          .transform(val => Number(val))
          .pipe(z.number({ message: 'El campo debe ser un número' })),
        start: z
          .string()
          .transform(val => Number(val))
          .pipe(z.number({ message: 'El campo debe ser un número' }))
          .optional(),
        limit: z
          .string()
          .transform(val => Number(val))
          .pipe(z.number({ message: 'El campo debe ser un número' }))
          .optional(),
      })
      busquedaRecienteSchema.parse({ idTipoAccion, start, limit })
    } catch (err) {
      return next(err)
    }

    // Obtener registros de búsquedas recientes
    try {
      const data: BusquedaRecienteGetInput = {
        idUsuario: idUsuario as number,
        idTipoAccion: parseInt(idTipoAccion as string),
        cDatabase: credentials.dbname,
      }

      const pagination: PaginationInput = {
        start: parseInt(start as string) ?? undefined,
        limit: parseInt(limit as string) ?? undefined,
      }

      const busquedaRecienteService = new BusquedaRecienteService()
      const busquedasRecientes = await busquedaRecienteService.obtenerBusquedasRecientes(data, pagination)
      let formattedData = undefined

      if (busquedasRecientes) {
        // obtener id de los objetos
        const searchService = new SearchService(credentials)
        const objectForBulk = busquedasRecientes.data.map(object => ({ schema_name: object.cSchema, object_name: object.cNombreObjeto }))
        const idsFromBulk = await searchService.getIdsInBulk(objectForBulk)

        if (idsFromBulk) {
          // formatear los resultados añadiendo los object_ids de los objetos
          formattedData = busquedasRecientes?.data.map((object, index) => ({
            id: object.idBusquedaReciente,
            objectId: idsFromBulk[index],
            cSchema: object.cSchema,
            cNombreObjeto: object.cNombreObjeto,
            dFecha: object.dFecha,
          }))
        }

        res.status(200).json({ status: 'success', statusCode: 200, meta: busquedasRecientes.meta, data: formattedData })
      }
    } catch (err) {
      next(err)
    }
  }

  registrarBusquedaReciente = async (req: Request, res: Response, next: NextFunction) => {
    const { idTipoAccion, cSchema, cNombreObjeto } = req.body
    const { isSessionActive, idUsuario, credentials } = req.session

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.sessionalreadyclosed))

    // Validación
    try {
      const busquedaRecienteSchema = z.object({
        idTipoAccion: z.number().positive(),
        cSchema: z.string(),
        cNombreObjeto: z.string(),
      })

      busquedaRecienteSchema.parse({ idTipoAccion, cSchema, cNombreObjeto })
    } catch (err) {
      return next(err)
    }

    // Registrar búsqueda reciente
    try {
      // sanitizar datos
      const data: BusquedaRecienteInput = {
        idUsuario: idUsuario as number,
        idTipoAccion,
        cDatabase: credentials.dbname,
        cSchema: cSchema.trim(),
        cNombreObjeto: cNombreObjeto.trim(),
      }

      const busquedaRecienteService = new BusquedaRecienteService()
      const searchService = new SearchService(credentials)
      const busquedaRecienteId = await busquedaRecienteService.encontrarBusquedaReciente(data)

      let message = ''
      let busquedaReciente = undefined
      // si no se encuentra la búsqueda del objeto, se registra
      if (!busquedaRecienteId) {
        busquedaReciente = await busquedaRecienteService.registrarBusquedaReciente(data)
        message = 'Se ha registrado correctamente la nueva búsqueda reciente'

        const objectId = await searchService.getObjectId({
          schema_name: busquedaReciente?.cSchema as string,
          object_name: busquedaReciente?.cNombreObjeto as string,
        })

        res.status(200).json({
          status: 'success',
          statusCode: 200,
          message,
          action: 'Inserted',
          data: {
            id: busquedaReciente?.idBusquedaReciente,
            objectId: objectId,
            ...busquedaReciente,
          },
        })
      }
      // caso contrario, se actualiza la fecha de busqueda y su vigencia en caso de estar eliminado
      else {
        const busquedaReciente = await busquedaRecienteService.actualizarBusquedaRecienteById(busquedaRecienteId)
        message = 'Ya existe la búsqueda reciente, se ha actualizado la fecha y la vigencia'

        const objectId = await searchService.getObjectId({
          schema_name: busquedaReciente?.cSchema as string,
          object_name: busquedaReciente?.cNombreObjeto as string,
        })

        // const dFechaFormatted = format(busquedaReciente?.dFecha as Date, 'DD-MM-YYYY HH:mm:ss')

        res.status(200).json({
          status: 'success',
          statusCode: 200,
          message,
          action: 'Updated',
          data: {
            id: busquedaReciente?.idBusquedaReciente,
            objectId: objectId,
            ...busquedaReciente,
          },
        })
      }
    } catch (err) {
      next(err)
    }
  }

  eliminarBusquedaReciente = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { isSessionActive } = req.session

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.sessionalreadyclosed))

    // Validación
    try {
      const busquedaRecienteSchema = z.object({
        id: z
          .string()
          .transform(val => Number(val))
          .pipe(z.number({ message: 'El campo ruta [id] debe ser un número' })),
      })

      busquedaRecienteSchema.parse({ id })
    } catch (err) {
      return next(err)
    }

    // Eliminar registro
    try {
      const busquedaRecienteService = new BusquedaRecienteService()
      const response = await busquedaRecienteService.eliminarBusquedaReciente(parseInt(id))

      if (!response) return res.status(400).json({ status: 'error', statusCode: 400, message: 'No se ha encontrado el objeto a eliminar' })

      return res.status(200).json({ status: 'success', statusCode: 200, message: 'Se ha eliminado correctamente' })
    } catch (err) {
      next(err)
    }
  }

  eliminarTodoBusquedasRecientes = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    console.log(id)
    const { isSessionActive, idUsuario, credentials } = req.session

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.sessionalreadyclosed))

    // Validación
    try {
      const busquedaRecienteSchema = z.object({
        id: z
          .string()
          .transform(val => Number(val))
          .pipe(z.number({ message: 'El campo debe ser un número' })),
      })
      busquedaRecienteSchema.parse({ id })
    } catch (err) {
      return next(err)
    }

    // Eliminar todos los registro (lVigente = 0)
    try {
      const data = {
        idUsuario: idUsuario as number,
        idTipoAccion: parseInt(id),
        cDatabase: credentials.dbname,
      }
      const busquedaRecienteService = new BusquedaRecienteService()
      const response = await busquedaRecienteService.eliminarTodoBusquedasRecientes(data)

      if (!response) return res.status(400).json({ status: 'error', statusCode: 400, message: 'No existen registros para eliminar' })

      return res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Se ha eliminado correctamente todos los registros para el idTipoAccion: ' + id,
      })
    } catch (err) {
      next(err)
    }
  }
}
