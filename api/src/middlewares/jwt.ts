import { NextFunction, Request, Response } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

import { Credentials, CredentialsInitialState } from '@/models/schemas'

interface TokenPayload extends JwtPayload {
  credentials: Credentials
}

// Verifica el token de acceso, y almacena el usuario en la sesión
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.access_token

  req.session.isSessionActive = false // no existe usuario por defecto
  req.session.credentials = { ...CredentialsInitialState }
  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET as string)

    if (typeof tokenDecoded === 'object' && tokenDecoded !== null && 'credentials' in tokenDecoded) {
      const { credentials }: { credentials: Credentials } = tokenDecoded as TokenPayload
      req.session.isSessionActive = true
      req.session.credentials = { ...credentials } // se guarda el usuario en la sesión
    }
  } catch {
    req.session.isSessionActive = false
    req.session.credentials = CredentialsInitialState
  }
  next()
}
