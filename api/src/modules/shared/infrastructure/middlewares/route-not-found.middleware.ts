import { RouteNotFoundException } from '@shared/application/exceptions'
import { NextFunction, Request, Response } from 'express'

export function routeNotFoundMiddleware(_req: Request, _res: Response, next: NextFunction) {
  next(new RouteNotFoundException())
}
