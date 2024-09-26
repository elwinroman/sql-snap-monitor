import { Request, Response } from 'express'

export function routeNotFound(_req: Request, res: Response) {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: 'Ruta no encontrada',
  })
}
