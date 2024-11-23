import { NextFunction, Request, Response } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

import { CredentialsInitialState } from '@/models/schemas'

interface TokenPayload extends JwtPayload {
  idUsuario: number
}

// Verifica el token de acceso, y almacena el usuario en la sesión
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.access_token

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET as string)
    const { idUsuario } = tokenDecoded as TokenPayload
    req.session.idUsuario = idUsuario
    req.session.isSessionActive = true
  } catch {
    req.session.isSessionActive = false
    req.session.idUsuario = -1
    req.session.credentials = { ...CredentialsInitialState }
  }
  next()
}
