import { NextFunction, Request } from 'express'
import jwt from 'jsonwebtoken'

import { Credentials } from '@/models/schemas'
/**
 * Verifica el token de acceso, y almacena el usuario en la sesión
 * (si no existe el token, la sesión se mantiene en null)
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export function verifyToken(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies.access_token

  req.session.isSessionActive = false // no existe usuario por defecto
  try {
    const credentials = jwt.verify(token, process.env.JWT_SECRET as string) as Credentials
    req.session.isSessionActive = true
    req.session.credentials = { ...credentials } // se guarda el usuario en la sesión
  } catch {
    req.session.isSessionActive = false
    req.session.credentials = null
  }
  next()
}
