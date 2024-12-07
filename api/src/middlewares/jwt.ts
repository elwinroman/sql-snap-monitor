import { NextFunction, Request, Response } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '@/config/enviroment'

interface TokenPayload extends JwtPayload {
  idUsuario: number
}

// Verifica el token de acceso, y almacena el usuario en la sesión
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.access_token

  try {
    const tokenDecoded = jwt.verify(token, JWT_SECRET)
    const { idUsuario } = tokenDecoded as TokenPayload

    // pequeño fix cada vez que se reinicia el servidor
    if (req.session.credentials) {
      req.session.idUsuario = idUsuario
      req.session.isSessionActive = true
    }
  } catch {
    req.session.isSessionActive = false
    req.session.idUsuario = undefined
    req.session.credentials = undefined
  }
  next()
}
