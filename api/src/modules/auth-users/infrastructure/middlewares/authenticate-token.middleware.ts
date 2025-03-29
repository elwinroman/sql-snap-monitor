import { ForbiddenException } from '@users/domain/exceptions/forbidden.exception'
import { UnauthorizedException } from '@users/domain/exceptions/unauthorized.exception'
import { NextFunction, Request, Response } from 'express'
import { type JwtPayload, verify } from 'jsonwebtoken'

import { JWT_SECRET } from '@/enviroment'

export function authenticateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]

  // no existe token
  if (!token) {
    throw ForbiddenException
  }

  // busca en la blacklist
  if (isRevokedToken(token)) {
    throw UnauthorizedException
  }

  verify(token, JWT_SECRET, (err, decoded) => {
    if (err) throw ForbiddenException
    // await client.set('user', decoded.user, { EX: 3600 })
    next()
  })
}

const isRevokeToken = (token: string) => {}

const revocarToken = () => {
  // await client.set('isSessionActive', 'false', { EX: 3600 })
}
