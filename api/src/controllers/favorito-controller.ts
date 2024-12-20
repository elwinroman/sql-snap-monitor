import { NextFunction, Request, Response } from 'express'
import z from 'zod'

import { COMMON_ERROR_CODES } from '@/constants'
import { FavoritoGetInput, FavoritoInput, MyCustomError, PaginationInput } from '@/models'
import { FavoritoService, SearchService } from '@/services'

export class FavoritoController {
  obtenerFavoritos = async (req: Request, res: Response, next: NextFunction) => {
    const { idTipoAccion, start, limit } = req.query
    const { isSessionActive, idUsuario, credentials } = req.session

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.sessionalreadyclosed))

    // Validación
    try {
      const favoritoSchema = z.object({
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
      favoritoSchema.parse({ idTipoAccion, start, limit })
    } catch (err) {
      return next(err)
    }

    // Obtener registros de búsquedas favoritas
    try {
      const data: FavoritoGetInput = {
        idUsuario: idUsuario as number,
        idTipoAccion: parseInt(idTipoAccion as string),
        cDatabase: credentials.dbname,
      }

      const pagination: PaginationInput = {
        start: parseInt(start as string) ?? undefined,
        limit: parseInt(limit as string) ?? undefined,
      }

      const favoritoService = new FavoritoService()
      const favoritos = await favoritoService.obtenerFavoritos(data, pagination)
      let formattedData = undefined

      if (favoritos) {
        // obtener id de los objetos
        const searchService = new SearchService(credentials)
        const objectForBulk = favoritos.data.map(object => ({ schema_name: object.cSchema, object_name: object.cNombreObjeto }))
        const idsFromBulk = await searchService.getIdsInBulk(objectForBulk)

        if (idsFromBulk) {
          // formatear los resultados añadiendo los object_ids de los objetos
          formattedData = favoritos.data.map((object, index) => ({
            id: object.idFavorito,
            objectId: idsFromBulk[index],
            cSchema: object.cSchema,
            cNombreObjeto: object.cNombreObjeto,
            dFecha: object.dFecha,
          }))
        }

        res.status(200).json({ status: 'success', statusCode: 200, meta: favoritos.meta, data: formattedData })
      }
    } catch (err) {
      next(err)
    }
  }

  registrarFavorito = async (req: Request, res: Response, next: NextFunction) => {
    const { idTipoAccion, cSchema, cNombreObjeto } = req.body
    const { isSessionActive, idUsuario, credentials } = req.session

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.sessionalreadyclosed))

    // Validación
    try {
      const favoritoSchema = z.object({
        idTipoAccion: z.number().positive(),
        cSchema: z.string(),
        cNombreObjeto: z.string(),
      })

      favoritoSchema.parse({ idTipoAccion, cSchema, cNombreObjeto })
    } catch (err) {
      return next(err)
    }

    // Registrar búsqueda favorita
    try {
      // sanitizar datos
      const data: FavoritoInput = {
        idUsuario: idUsuario as number,
        idTipoAccion,
        cDatabase: credentials.dbname,
        cSchema: cSchema.trim(),
        cNombreObjeto: cNombreObjeto.trim(),
      }

      const favoritoService = new FavoritoService()
      const searchService = new SearchService(credentials)
      const favoritoId = await favoritoService.encontrarFavorito(data)

      let message = ''
      let favorito = undefined

      // si no se encuentra la búsqueda del objeto, se registra
      if (!favoritoId) {
        favorito = await favoritoService.registrarFavorito(data)
        message = 'Se ha registrado correctamente la nueva búsqueda favorita'

        const objectId = await searchService.getObjectId({
          schema_name: favorito?.cSchema as string,
          object_name: favorito?.cNombreObjeto as string,
        })

        res.status(200).json({
          status: 'success',
          statusCode: 200,
          message,
          action: 'Inserted',
          data: {
            id: favorito?.idFavorito,
            objectId: objectId,
            ...favorito,
          },
        })
      }
      // caso contrario, se actualiza la fecha de busqueda y su vigencia en caso de estar eliminado
      else {
        const favorito = await favoritoService.actualizarFavoritoById(favoritoId)
        message = 'Ya existe al búsqueda favorita, se ha actualizado la fecha y la vigencia'

        const objectId = await searchService.getObjectId({
          schema_name: favorito?.cSchema as string,
          object_name: favorito?.cNombreObjeto as string,
        })

        res.status(200).json({
          status: 'success',
          statusCode: 200,
          message,
          action: 'Updated',
          data: {
            id: favorito?.idFavorito,
            objectId: objectId,
            ...favorito,
          },
        })
      }
    } catch (err) {
      next(err)
    }
  }

  eliminarFavorito = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { isSessionActive } = req.session

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.sessionalreadyclosed))

    // Validación
    try {
      const favoritoSchema = z.object({
        id: z
          .string()
          .transform(val => Number(val))
          .pipe(z.number({ message: 'El campo ruta [id] debe ser un número' })),
      })

      favoritoSchema.parse({ id })
    } catch (err) {
      return next(err)
    }

    // Eliminar registro
    try {
      const favoritoService = new FavoritoService()
      const response = await favoritoService.eliminarFavorito(parseInt(id))

      if (!response) return res.status(400).json({ status: 'error', statusCode: 400, message: 'No se ha encontrado el objeto a eliminar' })

      return res.status(200).json({ status: 'success', statusCode: 200, message: 'Se ha eliminado correctamente' })
    } catch (err) {
      next(err)
    }
  }
}
